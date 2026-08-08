import { zip } from "https://deno.land/x/good@1.5.1.0/array.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

//  tools
import { toFloat } from "../tools/generic.js"
import { sha256Hex, md5Hex, sha1Hex, sha512Hex } from "../tools/hashing.js"
import { jsonParseWithBigInt } from "../tools/json_parse.js"
import { lazyMap } from "../tools/lazy_array.js"
// Removed prex dependency due to WASM initialization issues
// Replaced with custom POSIX regex converter below
import { parse as tomlParse } from "https://deno.land/std@0.224.0/toml/mod.ts"
import { serializeDerivation, computeDrvPath, computeOutputPath, encodeBase32, makeFixedOutputPath, fixedOutputModuloHash, normalizeHashToHex, getStoreDir } from "../tools/store_path.js"

// core stuff
import { NixError, NotImplemented } from "./errors.js"

// Deep lazy-evaluation call chains need long traces to be debuggable; the
// default of 10 frames hides the actual origin of most errors.
Error.stackTraceLimit = 100000

// import system
import { ImportCache } from "./import_cache.js"
import { resolveImportPath, isUrl } from "../tools/import_resolver.js"
import { loadAndEvaluateSync } from "./import_loader.js"

// fetcher system
import { downloadWithRetry, extractNameFromUrl, runFetchWorkerSync } from "./fetcher.js"
import { extractTarball } from "./tar.js"
import { hashDirectory, hashDirectorySync, hashPathSync, narHashToSRI } from "./nar_hash.js"
import { ensureStoreDirectory, ensureStoreDirectorySync, computeFetchStorePath, getCachedPath, getCachedPathSync, setCachedPath, setCachedPathSync, atomicMove, atomicMoveSync, exists, STORE_DIR } from "./store_manager.js"

// registry system
import { resolveIndirectReference } from "./registry.js"

// Evaluation-mode settings shared by every runtime instance in this process.
// `denix eval` defaults to pure evaluation (like `nix eval`); `--impure`
// clears it. In pure mode fetchers require a locked input (e.g. a rev).
export const evalSettings = { pureEval: false }

//
// Shared runtime (auto-created on first use)
//
    // createRuntime() registers the runtime it creates here; builtins that need
    // runtime context (import, scopedImport, getFlake) create one on demand so
    // `import { builtins } from "./runtime.js"` works with no setup.
    let currentRuntime = null
    // The scope-carrying half of the same runtime (what createRuntime() hands
    // back as `.runtime`). nixFile() falls back to this when no runtime is given.
    let currentScopedRuntime = null
    const requireRuntime = ()=>{
        if (!currentRuntime) { createRuntime() }
        return currentRuntime
    }

//
// Helper functions
//
    // Define a memoized, lazily-computed property on a scope/attrset object.
    // Reading it the first time runs `getValue()`; afterwards the cached value
    // is returned. Used to bind function parameters and let/rec bindings without
    // forcing them until demanded.
    const defineLazy = (obj, key, getValue) => {
        let computed = false
        let computing = false
        let cached
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (!computed) {
                    // Blackholing, like real Nix: re-entering a binding while it
                    // is being computed is infinite recursion, not undefined.
                    if (computing) { throw new NixError("error: infinite recursion encountered") }
                    computing = true
                    try {
                        cached = getValue()
                        computed = true
                    } finally {
                        computing = false
                    }
                }
                return cached
            },
        })
    }

    function createCreateFunc(runtime) {
        return function createFunc(defaulters, allArgsName, metadata, definitionScope, func) {
            // `definitionScope` is the LEXICAL scope where the function literal
            // appears, passed explicitly by the generated code. New call scopes
            // inherit from it via the prototype chain (Object.create), NOT by
            // spreading — spreading would force every lazy binding in the parent,
            // breaking laziness and re-entering in-progress fixed points like
            // lib.makeExtensible's `self = rattrs self // …`. Passing it
            // explicitly (rather than reading runtime.scopeStack) keeps scoping
            // correct even when the function value is created lazily.
            const isSimpleFunction = typeof defaulters == "string"
            let lambda
            if (isSimpleFunction) {
                const argName = defaulters
                lambda = function (arg) {
                    const nixScope = Object.create(definitionScope)
                    // The argument is passed lazily (a Thunk via apply); bind it
                    // so the body only forces it when it actually reads the param.
                    defineLazy(nixScope, argName, () => force(arg))

                    runtime.scopeStack.push(nixScope)
                    try {
                        return func(nixScope)
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }
            } else {
                // function with "named" arguments: { a, b ? default, ... }@args
                lambda = function (arg) {
                    const nixScope = Object.create(definitionScope)
                    // Destructuring forces the argument to an attrset, but its
                    // FIELDS stay lazy: copy property descriptors (getters) rather
                    // than reading values.
                    const argSet = force(arg)
                    // Strict formals, like real Nix: without `...`, unexpected
                    // arguments are an error, and formals without defaults
                    // must be supplied.
                    if (metadata && metadata.args) {
                        if (!builtins.isAttrs(argSet)) {
                            throw new NixError(`error: value is ${builtins.typeOf(argSet)} while a set was expected`)
                        }
                        if (!metadata.ellipsis) {
                            for (const k of Object.keys(argSet)) {
                                if (!Object.hasOwn(metadata.args, k)) {
                                    throw new NixError(`error: function called with unexpected argument '${k}'`)
                                }
                            }
                        }
                        for (const [k, hasDefault] of Object.entries(metadata.args)) {
                            if (!hasDefault && !Object.hasOwn(argSet, k)) {
                                throw new NixError(`error: function called without required argument '${k}'`)
                            }
                        }
                    }
                    if (builtins.isAttrs(argSet)) {
                        for (const k of Object.keys(argSet)) {
                            Object.defineProperty(nixScope, k, Object.getOwnPropertyDescriptor(argSet, k))
                        }
                    }

                    // The `@args` binding captures the entire argument attrset.
                    // defineProperty (not assignment): a getter-only binding of
                    // the same name on the lexical scope chain would make plain
                    // assignment throw instead of shadowing.
                    if (typeof allArgsName === 'string') {
                        Object.defineProperty(nixScope, allArgsName, { value: argSet, writable: true, enumerable: true, configurable: true })
                    }

                    // Defaults for params not supplied; computed lazily and able
                    // to reference the other arguments.
                    const providedKeys = builtins.isAttrs(argSet) ? new Set(Object.keys(argSet)) : new Set()
                    for (const [key, value] of Object.entries(defaulters)) {
                        if (providedKeys.has(key)) continue
                        if (typeof value === 'function') {
                            defineLazy(nixScope, key, () => value(nixScope))
                        } else {
                            Object.defineProperty(nixScope, key, { value, writable: true, enumerable: true, configurable: true })
                        }
                    }

                    runtime.scopeStack.push(nixScope)
                    try {
                        return func(nixScope)
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }
            }
            // Mark as a denix-created Nix lambda so `apply` knows to pass the
            // argument lazily (builtins, by contrast, receive forced values).
            lambda.__nixLambda = true
            if (metadata && metadata.args) {
                lambda.__functionArgs = metadata.args
            }
            return lambda
        }
    }
    
    function createCreateScope(runtime) {
        return function createScope(parentScope, func) {
            // Inherit the LEXICAL parent scope via the prototype chain. The
            // parent is passed explicitly by the generated code (rather than read
            // from runtime.scopeStack) because under lazy evaluation a scope may
            // be built long after the dynamic stack has moved on — the lexical
            // scope is the correct one. Own bindings (let/rec) are added by
            // `func` and shadow inherited ones.
            const nixScope = Object.create(parentScope)

            runtime.scopeStack.push(nixScope)
            // args are now setup
            try {
                return func(nixScope)
            } finally {
                runtime.scopeStack.pop()
            }
        }
    }

    // Assign a value at attribute path `path` (array of keys) within `obj`,
    // creating intermediate attrsets as needed. The compiled form of a nested
    // Nix binding like `{ a.b.c = v; }`, emitted as `set(obj,["a","b","c"], thunk)`
    // where `thunk` is `() => v` so the leaf value stays lazy. A null path
    // element (a dynamic `${null}` attribute name) silently drops the whole
    // binding, matching Nix.
    const setAttrPath = (obj, path, getValue) => {
        for (const k of path) {
            if (k === null) { return obj }
        }
        let cur = obj
        for (let i = 0; i < path.length - 1; i++) {
            const k = path[i]
            if (cur[k] === undefined) { cur[k] = {} }
            cur = cur[k]
        }
        defineLazy(cur, path[path.length - 1], getValue)
        return obj
    }

    function createDefGetter(runtime) {
        return function defGetter(obj, key, fn) {
            // Simplified helper for defining lazy getters in recursive attribute sets
            // Computes once on first access, then replaces getter with cached value
            let cached = undefined
            let computed = false
            let computing = false
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get() {
                    if (!computed) {
                        // Blackholing, like real Nix: re-entering while computing
                        // is infinite recursion (previously this returned the
                        // stale `cached` = undefined, which surfaced as opaque
                        // "cannot read properties of undefined" errors).
                        if (computing) { throw new NixError("error: infinite recursion encountered") }
                        computing = true
                        try {
                            cached = fn(obj)
                            computed = true
                        } finally {
                            computing = false
                        }
                        // Replace getter with plain value for subsequent accesses
                        Object.defineProperty(obj, key, {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: cached,
                        })
                    }
                    return cached
                },
            })
        }
    }

    // Safely convert any value to a string for error messages
    function safeToString(value) {
        try {
            if (value === null) return "null"
            if (value === undefined) return "undefined"
            if (typeof value === "string") return JSON.stringify(value)
            if (typeof value === "function") return "[Function]"
            if (typeof value === "symbol") return value.toString()
            if (typeof value === "bigint") return value.toString()
            return JSON.stringify(value)
        } catch {
            return String(value)
        }
    }

    // Escape special regex characters in a string for use in RegExp
    function escapeRegexMatch(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

//
// classes
//


    export class Interpolater {
        constructor(strings, getters) {
            this.strings = strings
            this.getters = getters
            this.cached = null
        }
        toString() {
            if (this.cached == null) {
                const chunks = []
                for (const [string,getter] of zip(this.strings,this.getters)) {
                    if (string) {
                        chunks.push(string)
                    }
                    if (getter) {
                        let value = getter()
                        // A derivation coerces to its default output path. The
                        // object is kept in `deps` so derivations that use this
                        // string AFTER it's flattened (getters deleted) still
                        // record it in inputDrvs.
                        if (value && typeof value === "object" && value.type === "derivation") {
                            ;(this.deps ||= []).push(value)
                            value = value.outPath
                        }
                        // A path interpolated into a STRING is copied to the
                        // store (real Nix semantics); the resulting store path
                        // is recorded as context so dependent derivations pick
                        // it up as an inputSrc. Paths nested in a path
                        // expression just splice their text.
                        if (value instanceof Path && this instanceof InterpolatedString) {
                            if (value.context instanceof Map) {
                                this.context ||= new Map()
                                for (const [k, e] of value.context) { this.context.set(k, e) }
                                value = value.toString()
                            } else {
                                const storePath = copyPathToStore(value.toString())
                                this.context ||= new Map()
                                this.context.set(storePath, { outputs: new Set(), path: true, allOutputs: false })
                                value = storePath
                            }
                        } else if (value instanceof Interpolater) {
                            const nested = value
                            value = nested.toString()
                            // Bubble up any context/deps the nested string collected
                            if (nested.context instanceof Map) {
                                this.context ||= new Map()
                                for (const [k, e] of nested.context) { this.context.set(k, e) }
                            }
                            if (nested.deps) {
                                ;(this.deps ||= []).push(...nested.deps)
                            }
                        } else if (value instanceof NixString) {
                            // Keep context from context-carrying strings (toFile, …)
                            if (value.context instanceof Map) {
                                this.context ||= new Map()
                                for (const [k, e] of value.context) { this.context.set(k, e) }
                            }
                        } else if (value && (typeof value === "object" || isFunctorSet(value)) && value.outPath) {
                            value = value.outPath
                        } else if (value && (typeof value === "object" || isFunctorSet(value)) && typeof force(value.__toString) === "function") {
                            // Sets with __toString coerce in interpolations (real Nix)
                            value = builtins.toString(value)
                            if (value instanceof NixString && value.context instanceof Map) {
                                this.context ||= new Map()
                                for (const [k, e] of value.context) { this.context.set(k, e) }
                            }
                        }
                        if (!builtins.isString(value)) {
                            throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
                        }
                        chunks.push(
                            value.toString()
                        )
                    }
                }
                // free up memory
                delete this.strings
                delete this.getters
                this.cached = chunks.join("")
            }
            return this.cached
        }
    }

    export class InterpolatedString extends Interpolater {
    }

    export class Path extends Interpolater {
    }

    // Real Nix copies a path into the store whenever it's coerced to a string
    // (string interpolation, derivation attrs, toJSON): the file/dir is
    // NAR-hashed and gets a content-addressed "source" store path. We compute
    // the same /nix/store path (so drvs match real Nix byte-for-byte) but
    // materialize the copy under the denix cache store for builders to read.
    const sourcePathCache = new Map() // fs path -> store path
    export const sourcePathOrigins = new Map() // store path -> fs path
    export const copyPathToStore = (fsPath) => {
        fsPath = FileSystem.makeAbsolutePath(fsPath.toString())
        // Already a (virtual) store path, nothing to copy
        if (fsPath.startsWith(getStoreDir() + "/")) { return fsPath }
        const cached = sourcePathCache.get(fsPath)
        if (cached) { return cached }
        const storeRoot = Deno.env.get("DENIX_STORE_ROOT") ||
            ((Deno.env.get("HOME") || "") + "/.cache/denix/store")
        // The root of a store entry we already materialized (e.g. a fetched
        // tarball) keeps its identity instead of being re-copied.
        if (FileSystem.parentPath(fsPath) === storeRoot) {
            return `${getStoreDir()}/${FileSystem.basename(fsPath)}`
        }
        const name = FileSystem.basename(fsPath)
        const hex = hashPathSync(fsPath).replace(/^sha256:/, "")
        const storePath = makeFixedOutputPath(name, { algo: "sha256", hex, recursive: true })
        sourcePathCache.set(fsPath, storePath)
        sourcePathOrigins.set(storePath, fsPath)
        return storePath
    }

    // Marks a scope.shellStr$ interpolation as already-shell-script, so it is
    // spliced in without quoting. Symbol.for so separately-loaded copies agree.
    export const SHELL_RAW = Symbol.for("denix.shellStr.raw")

    // String-context plumbing: deps (derivation objects) and context (source
    // store paths) must survive every string-producing operation — `+`,
    // toString, concatStringsSep, replaceStrings — so derivations built from
    // the results record their inputDrvs/inputSrcs like real Nix.
    export const depsOf = (v)=>(v instanceof Interpolater && v.deps) ? v.deps : []
    export const contextOf = (v)=>(v && v.context instanceof Map) ? v.context : null
    export const flatString = (str, deps, context)=>{
        if (!deps.length && !context) { return str }
        const s = new InterpolatedString([], [])
        s.cached = str
        if (deps.length) { s.deps = deps }
        if (context) { s.context = context }
        return s
    }
    export const mergedContext = (...values)=>{
        let merged = null
        for (const v of values) {
            const c = contextOf(v)
            if (c) {
                merged ||= new Map()
                for (const [k, e] of c) { merged.set(k, e) }
            }
        }
        return merged
    }

    // A string that carries Nix "context" — the store paths / derivation outputs
    // it references. Produced by builtins.toFile / builtins.path (source paths)
    // and anywhere a context must outlive flattening to a plain string. It
    // coerces to its plain value in every JS string position (toString/valueOf/
    // Symbol.toPrimitive), and the string layer (isString/typeOf/requireString)
    // treats it as a string, so it stays transparent. `context` is a Map of
    // storePath -> { outputs:Set, path:bool, allOutputs:bool }.
    // Extending String gives it every string method (startsWith, replace, …)
    // for free, so it stays transparent wherever a plain string is expected.
    export class NixString extends String {
        constructor(value, context) {
            super(value)
            this.context = context || new Map()
        }
        get value() { return this.toString() }
    }

    // A deferred (lazy) computation. Nix is a lazy language: function arguments,
    // attribute values, and list elements are all unevaluated until demanded.
    // denix represents that deferral with a Thunk — a memoized `() => value`.
    // `force` drives a value to weak head normal form (resolving nested thunks)
    // and is a no-op on already-evaluated (non-Thunk) values, so it's safe to
    // sprinkle wherever a real value is required.
    export class Thunk {
        constructor(fn) {
            this.fn = fn
            this.evaluated = false
            this.value = undefined
        }
    }
    export const mkThunk = (fn) => new Thunk(fn)

    // Argument-spec markers for scope.func$({ x: nixArg.NoDefault, ... }, fn).
    // NoDefault = required formal (no default), AllArgs = the `@args` binding,
    // Ellipsis = the `...` in `{ a, ... }:`.
    export const nixArg = {
        NoDefault: Symbol("nixArg.NoDefault"),
        AllArgs: Symbol("nixArg.AllArgs"),
        Ellipsis: Symbol("nixArg.Ellipsis"),
    }
    export const NoDefault = nixArg.NoDefault
    export const AllArgs = nixArg.AllArgs

    // Marker for nested-path assignments inside scope.attrSet$ / scope.let$
    // specs: `...scope.deepSet$(["a","b"], value)` spreads to a symbol-keyed
    // entry holding one of these.
    class DeepSetEntry {
        constructor(path, value) {
            this.path = path
            this.value = value
        }
    }
    // apply: function application that handles __functor attrsets (callable
    // attrsets in Nix). Variadic: apply(f, a, b) is ((f a) b), so curried Nix
    // calls read as one flat call. A JS-function argument is a lazy getter
    // (the translator's convention — eager-safe expressions never evaluate to
    // functions) and is thunked here, so call sites need no explicit mkThunk.
    export function apply(fn, ...args) {
        for (let arg of args) {
            // The callee itself may be a thunk (e.g. a lazily-bound variable).
            fn = force(fn)
            // A functor-set arg is a VALUE (callable attrset), not a getter.
            if (typeof arg === "function" && !isFunctorSet(arg)) { arg = mkThunk(arg) }
            if (typeof fn === "function") {
                // A denix-created Nix lambda accepts the argument lazily (as a
                // thunk) — this is what makes Nix's lazy argument passing work,
                // e.g. the `rattrs self` fixed point in lib.makeExtensible.
                // A few builtins (tryEval, …) also want the unforced thunk so
                // they can control evaluation. Everything else (builtins /
                // curried JS helpers) wants a real value.
                fn = (fn.__nixLambda || lazyArgFns.has(fn)) ? fn(arg) : fn(force(arg))
            } else if (fn && typeof fn === "object" && "__functor" in fn) {
                fn = apply(apply(fn.__functor, fn), arg)
            } else {
                throw new NixError(`error: attempt to call something which is not a function but ${builtins.typeOf(fn)}`)
            }
        }
        return fn
    }
    // Builtins that must receive their argument UNFORCED (as a Thunk) so they
    // can control evaluation themselves — e.g. builtins.tryEval needs to force
    // inside a try/catch. `apply` checks this set and skips forcing for them.
    const lazyArgFns = new WeakSet()

    // Functor attrsets ({ __functor = self: arg: …; }) are represented as
    // CALLABLE JS functions carrying their attrs as properties, so Nix-level
    // "call it" and "read its attrs" both work naturally. The Symbol marker
    // lets every type check distinguish them from real lambdas (Nix says a
    // functor set is a "set", NOT a "lambda"). Creation-time wrapping happens
    // in attrSet$/recAttrSet$/merge; attrsets built by other paths (e.g.
    // listToAttrs) stay plain objects and are handled by apply's fallback.
    const FUNCTOR_SET = Symbol("functorSet")
    export const isFunctorSet = (value) => typeof value === "function" && FUNCTOR_SET in value
    export const makeFunctorTarget = () => {
        // Self is passed pre-thunked so apply doesn't mistake the callable
        // target for a lazy getter and re-wrap it.
        const fn = (arg) => apply(apply(fn.__functor, mkThunk(() => fn)), arg instanceof Thunk ? arg : mkThunk(() => arg))
        // A function's built-in own props would pollute attrNames/hasAttr.
        delete fn.name
        delete fn.length
        fn[FUNCTOR_SET] = true
        lazyArgFns.add(fn) // receive args unforced; the wrapper normalizes
        return fn
    }

    // Flake resolution caches (process-lifetime). `flakeEvalCache` dedupes
    // fully-resolved flakes by reference string (so a shared input like nixpkgs
    // is fetched+evaluated once). `flakeInProgress` holds partially-built flake
    // results so a dependency cycle resolves to the in-progress object instead
    // of recursing forever.
    const flakeEvalCache = new Map()
    const flakeInProgress = new Map()
    export const force = (value) => {
        while (value instanceof Thunk) {
            if (!value.evaluated) {
                const fn = value.fn
                value.fn = undefined
                value.value = fn()
                value.evaluated = true
            }
            value = value.value
        }
        return value
    }

    // `with attrs; body` scope. Nix's `with` must be LAZY: the attrset is only
    // evaluated when an identifier actually falls through to it (evaluating it
    // eagerly re-enters in-progress fixed points, e.g. all-packages.nix's
    // `with self;` where self is the pkgs fixed point being computed).
    // Precedence must match Nix: lexical bindings (at any depth) win over any
    // `with`, and an inner `with` wins over an outer one. `withProbe` lets an
    // inner scope ask the prototype chain "is this bound lexically?" — while
    // set, with-layers hide their attrs so only real bindings answer.
    let withProbe = false
    export function createWithScope(parentScope, getAttrs) {
        let cached, computed = false
        const attrs = ()=>{
            if (!computed) { computed = true; cached = force(getAttrs()) }
            return cached
        }
        const base = Object.create(parentScope)
        return new Proxy(base, {
            get(target, key, receiver) {
                if (typeof key !== "string") { return Reflect.get(target, key, receiver) }
                withProbe = true
                let boundLexically
                try { boundLexically = key in target } finally { withProbe = false }
                if (boundLexically) { return Reflect.get(target, key, receiver) }
                const a = attrs()
                if (a != null && key in a) { return a[key] }
                // Fall through to outer with-layers on the chain.
                return Reflect.get(target, key, receiver)
            },
            has(target, key) {
                if (withProbe) { return Reflect.has(target, key) }
                if (Reflect.has(target, key)) { return true }
                const a = attrs()
                return a != null && typeof key === "string" && key in a
            },
        })
    }

//
// helpers (mostly arg checking tools)
//
    const requireInt = (value)=>{
        value = force(value)
        if (typeof value!='bigint') {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while an integer was expected`)
        }
        return value
    }
    const requireAttrSet = (value)=>{
        value = force(value)
        if (!builtins.isAttrs(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a set was expected`)
        }
        return value
    }
    const requireString = (value)=>{
        value = force(value)
        if (!builtins.isString(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a string was expected`)
        }
        // Unwrap a context-carrying NixString to its plain value so existing
        // callers (which do `.toString()` or use it as a JS string) are
        // unaffected; context is collected structurally where it matters.
        if (value instanceof NixString) { return value.value }
        return value
    }
    const requireList = (value)=>{
        value = force(value)
        if (!builtins.isList(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a list was expected`)
        }
        return value
    }

    // ---- string context (partial; see docs/design-outputs-context-flakes.md) ---
    // Nix strings carry a "context": the store paths / derivation outputs they
    // reference. denix recovers it STRUCTURALLY from a value that still holds the
    // references (a derivation-output object, or an InterpolatedString whose
    // getters yield such objects) — e.g. `"${pkg.dev}"`. Once a value has been
    // flattened to a plain JS string the references are gone, so context is only
    // recoverable while the value retains its structure. This is additive: it
    // does not change string coercion or any hot path.
    //   Returns a Map: storePathOrDrvPath -> { outputs:Set, path:bool, allOutputs:bool }
    const computeStringContext = (value, depth = 0) => {
        const ctx = new Map()
        const entryFor = (key) => {
            if (!ctx.has(key)) { ctx.set(key, { outputs: new Set(), path: false, allOutputs: false }) }
            return ctx.get(key)
        }
        const walk = (v, d) => {
            if (v == null || d > 30) { return }
            // A flattened Interpolater keeps its derivation references in
            // `deps` (its getters are deleted after toString), so walk those
            // too — otherwise context is lost once a string is flattened.
            if (typeof v === "object" && v.deps instanceof Array) {
                for (const dep of v.deps) { walk(dep, d + 1) }
            }
            // Any context-carrying value (NixString, or a Path tagged by
            // builtins.path) merges its context.
            if (v && v.context instanceof Map) {
                for (const [k, e] of v.context) {
                    const dst = entryFor(k)
                    for (const o of e.outputs) { dst.outputs.add(o) }
                    if (e.path) { dst.path = true }
                    if (e.allOutputs) { dst.allOutputs = true }
                }
                return
            }
            if (typeof v !== "object") { return }
            if (v.type === "derivation") {
                const on = v.outputName || (v.outputs && v.outputs[0]) || "out"
                if (v.drvPath) { entryFor(v.drvPath).outputs.add(on) }
                return
            }
            if (v instanceof Interpolater) {
                if (v.getters) {
                    for (const g of v.getters) {
                        if (g) { try { walk(g(), d + 1) } catch { /* lazy errors surface elsewhere */ } }
                    }
                }
                return
            }
        }
        walk(value, depth)
        return ctx
    }
    // Convert a context Map into the attrset shape Nix's builtins.getContext returns.
    const contextToAttrset = (ctx) => {
        const out = {}
        for (const [key, e] of ctx) {
            const entry = {}
            if (e.outputs.size) { entry.outputs = [...e.outputs].sort() }
            if (e.allOutputs) { entry.allOutputs = true }
            if (e.path) { entry.path = true }
            out[key] = entry
        }
        return out
    }
    // Text representation matching `nix-instantiate --eval --strict` output,
    // byte-for-byte where practical. Used by error messages and by the
    // serial_eval harness to diff against real nix.
    export const nixRepr = (value)=>{
        if (value === null) return "null"
        if (value === true) return "true"
        if (value === false) return "false"
        if (typeof value === "bigint") return value.toString()
        if (typeof value === "number") return String(value)
        if (value instanceof InterpolatedString) return nixRepr(value.toString())
        if (typeof value === "string") {
            return '"' + value
                .replace(/\\/g, "\\\\")
                .replace(/"/g, '\\"')
                .replace(/\n/g, "\\n")
                .replace(/\t/g, "\\t")
                .replace(/\r/g, "\\r")
                + '"'
        }
        if (value instanceof Path) return value.toString()
        if (typeof value === "function" && !isFunctorSet(value)) return "<LAMBDA>"
        if (Array.isArray(value)) {
            if (value.length === 0) return "[ ]"
            return "[ " + value.map(nixRepr).join(" ") + " ]"
        }
        if (typeof value === "object" || isFunctorSet(value)) {
            const keys = Object.keys(value).sort()
            if (keys.length === 0) return "{ }"
            return "{ " + keys.map(k => `${k} = ${nixRepr(value[k])};`).join(" ") + " }"
        }
        return String(value)
    }

    // XML representation matching `nix-instantiate --xml --no-location` output
    // (with the outer `<expr>` wrapper, unlike `builtins.toXML` which does
    // not wrap). Used by the serial_eval harness for XML-mode diffs.
    export const nixReprXml = (value)=>{
        const xmlEscape = (s) => s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
        const inner = (v) => {
            if (v === null) return "<null />"
            if (v === true || v === false) return `<bool value="${v}" />`
            if (typeof v === "bigint") return `<int value="${v.toString()}" />`
            if (typeof v === "number") return `<float value="${v}" />`
            if (v instanceof InterpolatedString) return inner(v.toString())
            if (typeof v === "string") return `<string value="${xmlEscape(v)}" />`
            if (v instanceof Path) return `<path value="${xmlEscape(v.toString())}" />`
            if (typeof v === "function" && !isFunctorSet(v)) return "<function />"
            if (Array.isArray(v)) return `<list>${v.map(inner).join("")}</list>`
            if (typeof v === "object" || isFunctorSet(v)) {
                const keys = Object.keys(v).sort()
                return `<attrs>${keys.map(k => `<attr name="${xmlEscape(k)}">${inner(v[k])}</attr>`).join("")}</attrs>`
            }
            return "<unknown />"
        }
        return `<?xml version='1.0' encoding='utf-8'?>\n<expr>\n  ${inner(value)}\n</expr>`
    }

    // Convert POSIX regex patterns to JavaScript-compatible regex
    // Nix uses POSIX extended regex which includes character classes like [[:space:]], [[:upper:]], etc.
    const posixToJsRegex = (posixPattern) => {
        // Map POSIX character classes to JavaScript equivalents
        const posixClasses = {
            'alnum': 'a-zA-Z0-9',
            'alpha': 'a-zA-Z',
            'blank': ' \\t',
            'cntrl': '\\x00-\\x1F\\x7F',
            'digit': '0-9',
            'graph': '\\x21-\\x7E',
            'lower': 'a-z',
            'print': '\\x20-\\x7E',
            'punct': '\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E',
            'space': ' \\t\\r\\n\\v\\f',
            'upper': 'A-Z',
            'xdigit': '0-9A-Fa-f',
        }

        let jsPattern = posixPattern
        for (const [className, jsClass] of Object.entries(posixClasses)) {
            // Replace the inner [:xxx:] token so classes work both standalone ("[[:alnum:]]")
            // and embedded in a larger bracket expression ("[[:alnum:],._-]")
            jsPattern = jsPattern.replace(new RegExp(`\\[:${className}:\\]`, 'g'), jsClass)
        }

        return jsPattern
    }

// 
// actual runtime stuff
// 
    export const builtins = {
        // constants
            "null": null,
            "false": false,
            "true": true,
            "builtins": undefined,
            "langVersion": 6,
            "nixVersion": "2.18.1",
            // impure
            "currentSystem": `${Deno.build.arch}-${Deno.build.os}`, // for sure works on mac and linux, but probably not anything more exotic
            "currentTime": BigInt(Math.round((new Date().getTime())/1000)), // time program started (not dynamic in nix, even in the repl)
        
        // 
        // checker functions
        // 
            "isNull": (value)=>force(value) === null,
            "isBool": (value)=>{value=force(value); return value===true||value===false},
            "isInt": (value)=>typeof force(value) == "bigint",
            "isFloat": (value)=>typeof force(value) == "number",
            "isPath": (value)=>force(value) instanceof Path,
            "isString": (value)=>{value=force(value); return value instanceof InterpolatedString || value instanceof NixString || typeof value == "string"},
            "isList": (value)=>force(value) instanceof Array,
            "isAttrs": (value)=>{value=force(value); return value != null && (Object.getPrototypeOf({}) == Object.getPrototypeOf(value) || isFunctorSet(value))},
            "isFunction": (value)=>{value=force(value); return value instanceof Function && !isFunctorSet(value)},
            "typeOf": (value)=>{
                value = force(value)
                switch (typeof value) {
                    case "boolean":  return "bool"  ; break;
                    case "bigint":   return "int"   ; break;
                    case "number":   return "float" ; break;
                    case "string":   return "string"; break;
                    case "function": return isFunctorSet(value) ? "set" : "lambda"; break;
                    case "object":
                        if (value == null) {
                            return "null"
                        } else if (value instanceof InterpolatedString || value instanceof NixString) {
                            return "string"
                        } else if (value instanceof Path) {
                            return "path"
                        } else if (value instanceof Array) {
                            return "list"
                        } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                            return "set"
                        } else {
                            throw Error(`Called builtins.typeOf, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                        }
                        break;
                    default:
                        throw Error(`Called builtins.typeOf, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                }
            },
        
        // 
        // math
        // 
            "lessThan": (value1)=>(value2)=>value1<value2,
            "add": (value1)=>(value2)=>{
                if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                    return value1+value2
                } else {
                    return toFloat(value1)+toFloat(value2)
                }
            },
            "sub": (value1)=>(value2)=>{
                if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                    return value1-value2
                } else {
                    return toFloat(value1)-toFloat(value2)
                }
            },
            "div": (value1)=>(value2)=>{
                if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                    return value1/value2
                } else {
                    return toFloat(value1)/toFloat(value2)
                }
            },
            "mul": (value1)=>(value2)=>{
                if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                    return value1*value2
                } else {
                    return toFloat(value1)*toFloat(value2)
                }
            },
            "ceil": (value)=>typeof value == "bigint"?value:BigInt(Math.ceil(value)),
            "floor": (value)=>typeof value == "bigint"?value:BigInt(Math.floor(value)),
        
        // 
        // bitwise
        // 
            "bitAnd": (value1)=>(value2)=>requireInt(value1)&requireInt(value2),
            "bitOr": (value1)=>(value2)=>requireInt(value1)|requireInt(value2),
            "bitXor": (value1)=>(value2)=>requireInt(value1)^requireInt(value2),
        
        // to-value functions
            "toString": (value)=>{
                switch (typeof value) {
                    case "boolean":
                        if (value) {
                            return "1"
                        } else {
                            return ""
                        }
                    case "string":
                        return value
                    case "number":
                        const output = `${value}`
                        // need to add a decimal if one is missing
                        if (output.match(/\./)) {
                            return output
                        } else {
                            return output+".0"
                        }
                    case "bigint":
                        return `${value}` 
                    case "function":
                        if (!isFunctorSet(value)) {
                            throw new NixError(`error: cannot coerce a function to a string`)
                        }
                        // falls through: functor sets coerce like sets
                    case "object":
                        if (value == null) {
                            return ""
                        } else if (value instanceof InterpolatedString) {
                            // Flatten but keep the string's context/deps alive
                            return flatString(value.toString(), depsOf(value), mergedContext(value))
                        } else if (value instanceof NixString) {
                            return value
                        } else if (value instanceof Array) {
                            const parts = value.flat(Infinity).map(each=>builtins.toString(force(each)))
                            return flatString(
                                parts.map(p=>p.toString()).join(" "),
                                parts.flatMap(depsOf),
                                mergedContext(...parts),
                            )
                        } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value) || isFunctorSet(value)) {
                            // Sets coerce like real Nix: __toString first, then outPath
                            const toStr = force(value.__toString)
                            if (typeof toStr === "function") {
                                return builtins.toString(apply(toStr, value))
                            }
                            if (value.outPath !== undefined) {
                                const s = builtins.toString(force(value.outPath))
                                if (value.type === "derivation") {
                                    // toString drv carries the drv as context
                                    return flatString(s.toString(), [value, ...depsOf(s)], mergedContext(s))
                                }
                                return s
                            }
                            throw new NixError(`error: cannot coerce a set to a string`)
                        } else if (value instanceof Path) {
                            // No store copy (real Nix toString), but a store-path
                            // Path (from builtins.path) keeps its context
                            return flatString(FileSystem.makeAbsolutePath(value.toString()), depsOf(value), mergedContext(value))
                        } else {
                            throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                        }
                        break;
                    default:
                        throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                }
            },
            "toJSON": (value)=>{
                switch (typeof value) {
                    case "boolean":
                    case "string":
                        return JSON.stringify(value);
                    case "number":
                        const output = JSON.stringify(value)
                        // need to add a decimal if one is missing
                        if (output.match(/\./)) {
                            return output
                        } else {
                            return output+".0"
                        }
                        break;
                    case "bigint":
                        return JSON.stringify(`${value}`-0)
                    case "function":
                        // CRITICAL: Derivations may appear as functions due to callable properties
                        // but should serialize to their outPath string
                        if (value && typeof value === "object" && value.type === "derivation") {
                            return JSON.stringify(value.outPath)
                        }
                        if (isFunctorSet(value)) {
                            // serializes as a set; errors on the __functor lambda
                            // inside, exactly like real Nix
                            const keys = Object.getOwnPropertyNames(value).sort()
                            const entries = keys.map((each)=>`${JSON.stringify(each)}:${builtins.toJSON(force(value[each]))}`)
                            return `{${entries.join(",")}}`
                        }
                        throw new NixError(`error: cannot convert a function to JSON`)
                    case "object":
                        if (value == null) {
                            return "null"
                        } else if (value instanceof InterpolatedString || value instanceof NixString) {
                            return JSON.stringify(value.toString())
                        } else if (value instanceof Array) {
                            const items = value.map((each)=>builtins.toJSON(force(each)))
                            return `[${items.join(",")}]`
                        } else if (value.type === "derivation") {
                            // CRITICAL: Check derivation BEFORE plain object check
                            // Derivations have toString() functions that would cause errors
                            return JSON.stringify(value.outPath)
                        } else if (
                            Object.getPrototypeOf({}) == Object.getPrototypeOf(value) ||
                            // Handle objects created with Object.create(parent) - used by rec attrsets
                            (Object.getOwnPropertyNames(value).length > 0 && value.constructor === Object)
                        ) {
                            // Handle plain objects and objects created with Object.create(parent)
                            // (rec attrsets use Object.create for scope inheritance)
                            // Nix sorts object keys alphabetically (lexicographic order)
                            const keys = Object.getOwnPropertyNames(value).sort()
                            const entries = []
                            for (const each of keys) {
                                const jsonValue = builtins.toJSON(force(value[each]))
                                entries.push(`${JSON.stringify(each)}:${jsonValue}`)
                            }
                            return `{${entries.join(",")}}`
                        } else if (value instanceof Path) {
                            // Paths serialize as their store-copied path (real Nix)
                            return JSON.stringify(copyPathToStore(value.toString()))
                        } else {
                            throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                        }
                        break;
                    default:
                        throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                }
            },
            "toPath": (value)=>{
                // NOTE: nix has deprecated this, which is good cause its stupid
                // it returns a string not a path

                // derivations can be converted to a string
                if (value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    return FileSystem.makeAbsolutePath(value.toString())
                }
                if (!builtins.isString(value)) {
                    throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
                }
                value = value.toString()

                if (!FileSystem.isAbsolutePath(value)) {
                    throw Error(`error: string ${nixRepr(value)} doesn't represent an absolute path`)
                }
                // yup all that work for nuthin
                return value
            },
            "toXML": (e)=>{
                const toXml = (value) => {
                    switch (typeof value) {
                        case "boolean":
                            return `<bool value="${value ? 'true' : 'false'}" />`
                        case "string":
                            return `<string value="${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}" />`
                        case "number":
                            return `<float value="${value}" />`
                        case "bigint":
                            return `<int value="${value}" />`
                        case "function":
                            return `<function />`
                        case "object":
                            if (value === null) {
                                return `<null />`
                            } else if (value instanceof InterpolatedString) {
                                return toXml(value.toString())
                            } else if (value instanceof Path) {
                                return toXml(FileSystem.makeAbsolutePath(value.toString()))
                            } else if (value instanceof Array) {
                                return `<list>${value.map(toXml).join('')}</list>`
                            } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value) || isFunctorSet(value)) {
                                const attrs = Object.keys(value).map(key =>
                                    `<attr name="${key.replace(/"/g, '&quot;')}">${toXml(value[key])}</attr>`
                                ).join('')
                                return `<attrs>${attrs}</attrs>`
                            }
                    }
                    return `<unknown />`
                }
                return `<?xml version='1.0' encoding='utf-8'?>\n${toXml(e)}\n`
            },
        
        // 
        // value generators
        //
            "fromJSON": jsonParseWithBigInt, // can't be JSON.parse because plain int values need to become BigInts
            "fromTOML": (tomlString)=>{
                const parsed = tomlParse(requireString(tomlString).toString())
                // recursively convert all integer numbers to BigInts to match Nix behavior
                const convertIntsToBigInt = (value) => {
                    if (typeof value === "number" && Number.isInteger(value)) {
                        return BigInt(value)
                    } else if (Array.isArray(value)) {
                        return value.map(convertIntsToBigInt)
                    } else if (value && typeof value === "object") {
                        const result = {}
                        for (const [k, v] of Object.entries(value)) {
                            result[k] = convertIntsToBigInt(v)
                        }
                        return result
                    }
                    return value
                }
                return convertIntsToBigInt(parsed)
            },

        // 
        // string helpers
        // 
            // (concatStringsSep "/" ["usr" "local" "bin"]) == "usr/local/bin".
            "concatStringsSep": (separator)=>(list)=>{
                requireString(separator)
                requireList(list)
                const parts = list.map(
                    each => {
                        each = force(each)
                        // Sets coerce like real Nix (__toString, then outPath)
                        if (each != null && (Object.getPrototypeOf({}) == Object.getPrototypeOf(each) || isFunctorSet(each))) {
                            return builtins.toString(each)
                        }
                        requireString(each)
                        return each
                    }
                )
                return flatString(
                    parts.map(p=>p.toString()).join(separator.toString()),
                    [...depsOf(separator), ...parts.flatMap(depsOf)],
                    mergedContext(separator, ...parts),
                )
            },
            // (builtins.replaceStrings ["oo" "a"] ["a" "i"] "foobar") == "fabir"
            "replaceStrings": (from)=>(to)=>(str)=>{
                requireString(str)
                requireList(from)
                requireList(to)
                if (from.length != to.length) {
                    throw new NixError(`error: 'from' and 'to' arguments passed to builtins.replaceStrings have different lengths`)
                }
                const pattern = new RegExp(
                    from.map(each=>escapeRegexMatch(each.toString())).join("|"),
                    "g"
                )
                // Real Nix adds the context of replacement strings that were used
                const usedReplacements = []
                const result = str.toString().replace(
                    pattern,
                    // TODO: note there is slightly different behavior here
                    // if the replacement is not a string, this converts it to a string (for some things)
                    // nix lazily throws an error if the replacement is not a string
                    stringMatch=>{
                        const replacement = force(to[from.indexOf(stringMatch)])
                        usedReplacements.push(replacement)
                        return replacement.toString()
                    }
                )
                return flatString(
                    result,
                    [...depsOf(str), ...usedReplacements.flatMap(depsOf)],
                    mergedContext(str, ...usedReplacements),
                )
            },
            "match": (regex)=>(str)=>{
                // builtins.match "ab" "abc" => null.
                // builtins.match "abc" "abc" => [ ].
                // builtins.match "a(b)(c)" "abc" => [ "b" "c" ].
                // builtins.match "[[:space:]]+([[:upper:]]+)[[:space:]]+" "  FOO   " => [ "FOO" ].
                const regexStr = requireString(regex).toString()
                const stringStr = requireString(str).toString()

                // Convert POSIX regex to JavaScript regex
                const jsRegexStr = posixToJsRegex(regexStr)

                try {
                    const re = new RegExp(`^(?:${jsRegexStr})$`)
                    const match = stringStr.match(re)

                    if (!match) {
                        return null
                    }

                    // Return capture groups (exclude full match at index 0)
                    // In Nix, unmatched groups are null, not undefined
                    const captureGroups = match.slice(1).map(g => g === undefined ? null : g)
                    return captureGroups
                } catch (error) {
                    throw new NixError(`error: invalid regular expression '${regexStr}'`)
                }
            },
            "split": (regex)=>(str)=>{
                const regexStr = requireString(regex).toString()
                const string = requireString(str).toString()
                const re = new RegExp(regexStr, 'g')
                const result = []
                let lastIndex = 0
                let match

                while ((match = re.exec(string)) !== null) {
                    result.push(string.slice(lastIndex, match.index))
                    const groups = []
                    for (let i = 1; i < match.length; i++) {
                        groups.push(match[i] === undefined ? null : match[i])
                    }
                    result.push(groups)
                    lastIndex = re.lastIndex
                }
                result.push(string.slice(lastIndex))
                return result
            },
            // (builtins.splitVersion ""                       ) == [ ]
            // (builtins.splitVersion "1.1.3.4.4.43.a.a"       ) == [ "1" "1" "3" "4" "4" "43" "a" "a" ]
            // (builtins.splitVersion "1.1.3.4.4.43.aa"        ) == [ "1" "1" "3" "4" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.4.4.43aa"         ) == [ "1" "1" "3" "4" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.4a.4.43aa"        ) == [ "1" "1" "3" "4" "a" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa"       ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$I"  ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$I" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$Ia" ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$Ia" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$Ia4") == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$Ia" "4" ]
            // (builtins.splitVersion "1.1.3.a4a.4.+43aa$()$@@@@@(#*@!$^(@!*$%^/-><*(I|a4") == [ "1" "1" "3" "a" "4" "a" "4" "+" "43" "aa$()$@@@@@(#*@!$^(@!*$%^/" "><*(I|a" "4" ]
            // TODO: there may be edgecases I'm missing for splitVersion
            "splitVersion": (s)=>(   s.length == 0   ?    []    :     s.toString().split(/\.|(?<=\d)(?=\D)|(?<=\D)(?=\d)/g)   ),
            "stringLength": (s)=>{
                // BigInt: Nix ints are bigint in denix (JS number would be a float)
                if (typeof s == 'string') {
                    return BigInt(s.length)
                } else if (s instanceof InterpolatedString) {
                    return BigInt(s.toString().length)
                }
            },
            "substring": (start)=>(len)=>(s)=>{
                // Convert BigInt to number for slice
                const startNum = typeof start === 'bigint' ? Number(start) : start
                const lenNum = typeof len === 'bigint' ? Number(len) : len
                // In Nix, a negative length means "rest of the string from start"
                const end = lenNum < 0 ? undefined : startNum + lenNum
                if (typeof s == 'string') {
                    return s.slice(startNum, end)
                } else if (s instanceof InterpolatedString || s instanceof NixString) {
                    // be lazy for InterpolatedStrings; NixString carries string
                    // context (returning undefined here broke lib.addContextFrom).
                    // Real Nix keeps the WHOLE context of the source string even
                    // when the slice is empty (context is per-string, not
                    // per-character), so wrap the slice in a NixString carrying it.
                    return new InterpolatedString([""], [()=>new NixString(s.toString().slice(startNum, end), computeStringContext(s))])
                } else if (s instanceof Path || (s && typeof s == "object" && (s.outPath !== undefined || force(s.__toString) !== undefined))) {
                    // real Nix coerces paths and derivations here (lib.addContextFrom
                    // relies on `substring 0 0 someDerivation` keeping the context)
                    return builtins.substring(start)(len)(builtins.toString(s))
                } else {
                    throw new NixError(`error: value is a ${builtins.typeOf(s)} while a string was expected`)
                }
            },
        
        // 
        // list helpers
        // 
            // BigInt: Nix ints are bigint in denix; a JS number here would be a
            // Nix float (breaks e.g. `{ "2" = …; }.${toString (length l)}` in
            // lib/systems/parse.nix, since toString 2.0 is "2.0").
            "length": (value)=>BigInt(requireList(value).length),
            "all": (func)=>(list)=>list.length==0||list.every(func), 
            "any": (func)=>(list)=>list.some(func),                  
            "filter": (func)=>(list)=>list.filter(func),             
            "concatLists": (lists)=>requireList(lists)&&lists.flat(1),
            "elem": (value)=>(list)=>requireList(list)&&list.some((each)=>operators.equal(each, value)),
            "elemAt": (list)=>(index)=>{
                requireList(list)
                if (index>=list.length) {
                    throw new NixError(`error: list index ${index} is out of bounds`)
                }
                // NOTE: this is actually not what nix does: nix throws an error that is almost certainly a bug:
                //        error: value is the partially applied built-in function 'elemAt' while an integer was expected
                if (index < 0) {
                    throw new NixError(`error: list index ${index} is out of bounds (index cannot be negative)`)
                }
                return list[index]
            },
            "head": (list)=>list[0],
            "tail": (list)=>list.slice(1),
            "map": (f)=>(list)=>lazyMap(list, f), // its lazy but behaves like a real array (proxy object)
            // (builtins.partition (x: x > 10) [1 23 9 3 42]) == { right = [ 23 42 ]; wrong = [ 1 9 3 ]; }
            "partition": (pred)=>(list)=>{
                let computed = false
                const right = []
                const wrong = []
                const compute = ()=>{
                    computed = true
                    for (const each of list) {
                        if (pred(each)) {
                            right.push(each)
                        } else {
                            wrong.push(each)
                        }
                    }
                }
                return {
                    get right() {
                        !computed && compute()
                        return right
                    },
                    get wrong() {
                        !computed && compute()
                        return wrong
                    },
                }
            },
            // builtins.genList (x: x * x) 0 => [ ]
            // builtins.genList (x: x * x) 5 => [ 0 1 4 9 16 ]
            "genList": (func)=>(index)=>{
                if (index < 0) {
                    throw new NixError(`error: genList index ${index} cannot be negative`)
                }
                if (index == 0) {
                    return []
                }
                let output = [...new Array(index)]
                while (index > 0) {
                    output[--index] = func(index)
                }
                return output
            },
            // builtins.foldl' (x: y: x + y) "a" ["b" "c" "d"]  => "abcd"
            // builtins.foldl' (x: y: x + y) 0 [1 2 3] => 6
            "foldl'": (op)=>(nul)=>(list)=>list.reduce((acc,each)=>op(acc)(each),nul), // TODO: check more edgecases on this
            "sort": (comparator)=>(list)=>{
                requireList(list)
                return [...list].sort((a, b) => comparator(a)(b) ? -1 : (comparator(b)(a) ? 1 : 0))
            },
            "groupBy": (f)=>(list)=>{
                requireList(list)
                const result = {}
                for (const item of list) {
                    const key = requireString(f(item)).toString()
                    if (!result[key]) {
                        result[key] = []
                    }
                    result[key].push(item)
                }
                return result
            },
        
        // 
        // attr helpers
        // 
            "hasAttr": (attr)=>(attrSet)=>Object.getOwnPropertyNames(requireAttrSet(attrSet)).includes(requireString(attr)),
            "getAttr": (attr)=>(attrSet)=>{
                if (!Object.getOwnPropertyNames(requireAttrSet(attrSet)).includes(requireString(attr))) {
                    throw new NixError(`error: attribute ${nixRepr(attr)} missing`)
                }
                return attrSet[attr]
            },
            "attrNames": (value)=>Object.getOwnPropertyNames(value).sort(),
            "attrValues": (value)=>builtins.attrNames(value).map(each=>value[each]),
            "catAttrs": (attr)=>(list)=>{
                const attrName = requireString(attr).toString()
                requireList(list)
                const result = []
                for (const each of list) {
                    requireAttrSet(each)
                    if (each.hasOwnProperty(attrName)) {
                        result.push(each[attrName])
                    }
                }
                return result
            },
            "concatMap": (f)=>(list)=>{
                requireList(list)
                const result = []
                for (const item of list) {
                    const mapped = f(item)
                    requireList(mapped)
                    result.push(...mapped)
                }
                return result
            },
            "zipAttrsWith": (f)=>(list)=>{
                requireList(list)
                // Lazy like real Nix: gather keys WITHOUT forcing any values
                // (Object.entries would run every getter — this forced every
                // module's config values during lib/modules.nix mergeModules,
                // causing bogus infinite recursion), and only collect + merge a
                // key's values when that key is actually demanded.
                const keys = new Set()
                for (const attrset of list) {
                    requireAttrSet(attrset)
                    for (const key of Object.keys(attrset)) { keys.add(key) }
                }
                const result = {}
                for (const key of keys) {
                    defineLazy(result, key, () => {
                        const values = []
                        for (const attrset of list) {
                            if (Object.prototype.hasOwnProperty.call(attrset, key)) {
                                values.push(attrset[key])
                            }
                        }
                        const merger = force(f(key))
                        if (typeof merger !== "function") {
                            throw new NixError(`error: attempt to call something which is not a function but ${builtins.typeOf(merger)}`)
                        }
                        const merged = (merger.__nixLambda || lazyArgFns.has(merger)) ? merger(mkThunk(() => values)) : merger(values)
                        return force(merged)
                    })
                }
                return result
            },
            "intersectAttrs": (e1)=>(e2)=>{
                requireAttrSet(e1)
                requireAttrSet(e2)
                const result = {}
                for (const key of Object.keys(e1)) {
                    // Lazy in values, like real Nix: copy descriptors (getters)
                    // instead of reading values. callPackage's
                    // `intersectAttrs fargs pkgs` must not force every package.
                    const desc = Object.getOwnPropertyDescriptor(e2, key)
                    if (desc) {
                        Object.defineProperty(result, key, desc)
                    }
                }
                return result
            },
            "listToAttrs": (list)=>{
                requireList(list)
                const result = {}
                for (const item of list) {
                    requireAttrSet(item)
                    const name = requireString(item.name).toString()
                    if (!result.hasOwnProperty(name)) {
                        // Lazy in values, like real Nix: only the list and each
                        // element's `name` are forced here.
                        defineLazy(result, name, ()=>item.value)
                    }
                }
                return result
            },
            "mapAttrs": (f)=>(attrset)=>{
                requireAttrSet(attrset)
                // Lazy in values, like real Nix: iterate keys without forcing the
                // input's value getters, and defer computing each mapped value
                // until it is demanded. Nixpkgs relies on this for fixed points
                // like lib.systems.elaborate's
                //     final = { … } // mapAttrs (n: v: v final.parsed) predicates;
                // where eager mapping would re-enter `final` mid-computation.
                const result = {}
                for (const name of Object.keys(attrset)) {
                    defineLazy(result, name, () => {
                        const mapper = force(f(name))
                        const arg = mkThunk(() => attrset[name])
                        if (typeof mapper !== "function") {
                            throw new NixError(`error: attempt to call something which is not a function but ${builtins.typeOf(mapper)}`)
                        }
                        const mapped = (mapper.__nixLambda || lazyArgFns.has(mapper)) ? mapper(arg) : mapper(force(arg))
                        return force(mapped)
                    })
                }
                return result
            },
            "optionalAttrs": (cond)=>(attrset)=>{
                // Returns attrset if cond is true, otherwise returns empty set
                return cond ? attrset : {}
            },
            "removeAttrs": (set)=>(list)=>{
                requireAttrSet(set)
                requireList(list)
                const result = {}
                for (const key of Object.keys(set)) {
                    if (!list.includes(key)) {
                        // Lazy in values, like real Nix (copy getters, don't read)
                        Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(set, key))
                    }
                }
                return result
            },
        
        // 
        // hashers
        // 
            "hashString": (hashFuncName)=>(stringContent)=>{ // example (builtins.hashString "sha256" "hello") => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
                if (hashFuncName == "sha256") {
                    return sha256Hex(stringContent)
                } else if (hashFuncName == "md5") {
                    return md5Hex(stringContent)
                } else if (hashFuncName == "sha1") {
                    return sha1Hex(stringContent)
                } else if (hashFuncName == "sha512") {
                    return sha512Hex(stringContent)
                } else {
                    throw new NixError(`error: unknown hash algorithm ${nixRepr(hashFuncName)}`)
                }
            },
            "hashFile": (hashFuncName)=>(path)=>{ // only hashes the file contents
                return builtins.hashString(hashFuncName)(FileSystem.sync.readBytes(path))
            },
        
        // fetchers
            // Synchronous on purpose (like fetchGit below): Nix evaluation is
            // synchronous, so an async fetcher would leak a Promise into
            // translated code like `import (builtins.fetchTarball url)` where
            // nothing can await it. The actual (async) download/extract work
            // happens in fetch_worker.js via a sync subprocess.
            "fetchurl": (args) => {
                // Parse arguments: can be string URL or {url, sha256?, name?}
                let url, sha256, name;
                if (typeof args === "string" || args instanceof InterpolatedString) {
                    url = requireString(args);
                    name = extractNameFromUrl(url);
                } else {
                    url = requireString(args["url"]);
                    sha256 = args["sha256"] ? requireString(args["sha256"]) : null;
                    name = args["name"] ? requireString(args["name"]) : extractNameFromUrl(url);
                }
                const cacheKey = `fetchurl:${url}:${sha256 || ""}:${name}`;
                const cached = getCachedPathSync(cacheKey);
                if (cached) {
                    return new Path(cached);
                }
                return new Path(runFetchWorkerSync({ kind: "fetchurl", url: `${url}`, sha256: sha256 && `${sha256}`, name: `${name}`, cacheKey }).storePath);
            },
            "fetchTarball": (args) => {
                // Parse arguments: can be string URL or {url, sha256?, name?}
                // Default name is "source" (real Nix semantics) — NOT derived
                // from the URL. Getting this wrong changes the source store
                // path and therefore every downstream derivation hash, which
                // breaks binary-cache substitution of e.g. pinned nixpkgs.
                let url, sha256, name;
                if (typeof args === "string" || args instanceof InterpolatedString) {
                    url = requireString(args);
                    name = "source";
                } else {
                    url = requireString(args["url"]);
                    sha256 = args["sha256"] ? requireString(args["sha256"]) : null;
                    name = args["name"] ? requireString(args["name"]) : "source";
                }
                const cacheKey = `fetchTarball:${url}:${sha256 || ""}:${name}`;
                const cached = getCachedPathSync(cacheKey);
                if (cached) {
                    return new Path(cached);
                }
                return new Path(runFetchWorkerSync({ kind: "fetchTarball", url: `${url}`, sha256: sha256 && `${sha256}`, name: `${name}`, cacheKey }).storePath);
            },
            // Synchronous on purpose: Nix evaluation is synchronous, so an async
            // fetchGit would leak a Promise into translated code like
            // `(builtins.fetchGit x).revCount` where nothing can await it.
            "fetchGit": (args) => {
                // Coerce a url/name/rev value that may be a string, an
                // InterpolatedString, or a Path (path literals are valid urls)
                const asStr = (v) => {
                    v = force(v)
                    if (v instanceof Path) { return v.toString() }
                    return requireString(v).toString()
                }
                // Parse arguments: can be string URL, path, or {url, name?, rev?, ref?, submodules?, shallow?, allRefs?}
                let url, name, rev, ref, refGiven, submodules, shallow, allRefs;
                let publicKeys = [], verifyCommit = false;
                if (typeof args === "string" || args instanceof InterpolatedString || args instanceof Path) {
                    url = asStr(args);
                    name = "source"; // Nix's fetchGit default, regardless of URL
                    rev = null;
                    ref = "HEAD";
                    refGiven = false;
                    submodules = false;
                    shallow = false;
                    allRefs = false;
                } else {
                    url = asStr(args["url"]);
                    name = args["name"] ? requireString(args["name"]).toString() : "source";
                    rev = args["rev"] ? requireString(args["rev"]).toString() : null;
                    refGiven = args["ref"] != null;
                    ref = refGiven ? requireString(args["ref"]).toString() : "HEAD";
                    submodules = args["submodules"] === true;
                    shallow = args["shallow"] === true;
                    allRefs = args["allRefs"] === true;
                    // Signature verification args (Nix: publicKey/keytype,
                    // publicKeys = [{key, type}], verifyCommit defaults on
                    // when any key is given)
                    if (args["publicKey"] != null) {
                        publicKeys.push({
                            key: requireString(args["publicKey"]).toString(),
                            type: args["keytype"] != null ? requireString(args["keytype"]).toString() : "ssh-ed25519",
                        });
                    }
                    if (args["publicKeys"] != null) {
                        for (const entry of requireList(args["publicKeys"])) {
                            const e = force(entry);
                            publicKeys.push({
                                key: requireString(e["key"]).toString(),
                                type: e["type"] != null ? requireString(e["type"]).toString() : "ssh-ed25519",
                            });
                        }
                    }
                    verifyCommit = args["verifyCommit"] != null ? force(args["verifyCommit"]) === true : publicKeys.length > 0;
                }

                if (evalSettings.pureEval && !rev) {
                    throw new NixError(`error: in pure evaluation mode, 'fetchGit' requires a locked input (specify a 'rev')`)
                }

                // Normalize ref: add refs/heads/ prefix unless ref starts with refs/ or is HEAD
                let normalizedRef = ref;
                if (ref && ref !== "HEAD" && !ref.startsWith("refs/")) {
                    normalizedRef = `refs/heads/${ref}`;
                }

                ensureStoreDirectorySync();

                const gitDecoder = new TextDecoder();
                const runGit = (gitArgs, { check = true } = {}) => {
                    let out;
                    try {
                        out = new Deno.Command("git", { args: gitArgs, stdout: "piped", stderr: "piped" }).outputSync();
                    } catch (error) {
                        throw new Error(
                            `builtins.fetchGit requires git binary to be installed\n` +
                            `Error: ${error.message}`
                        );
                    }
                    const result = { code: out.code, stdout: gitDecoder.decode(out.stdout).trim(), stderr: gitDecoder.decode(out.stderr) };
                    if (check && out.code !== 0) {
                        throw new Error(`git ${gitArgs.join(" ")} failed: ${result.stderr}`);
                    }
                    return result;
                };

                // Nix rejects malformed ref names (same rules as git check-ref-format)
                if (refGiven && ref !== "HEAD") {
                    const refCheck = runGit(["check-ref-format", "--allow-onelevel", ref], { check: false });
                    if (refCheck.code !== 0) {
                        throw new NixError(`error: invalid Git branch/tag name '${ref}'`);
                    }
                }

                const fmtLastModifiedDate = (epoch) => {
                    const d = new Date(Number(epoch) * 1000);
                    const p = (n) => String(n).padStart(2, "0");
                    return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}`;
                };

                // Real Nix returns an attrset (so hasAttr/removeAttrs work on
                // it); the non-enumerable toString keeps JS-side callers that
                // treat the result like a path working.
                const finishResult = (storePath, meta) => {
                    const result = { outPath: storePath, ...meta };
                    Object.defineProperty(result, "toString", { value: () => storePath, enumerable: false });
                    return result;
                };

                const localPath = url.startsWith("/") ? url
                    : url.startsWith("file://") ? url.slice("file://".length)
                    : null;

                // Nix refuses to fetch from shallow repositories unless shallow = true
                if (localPath != null && !shallow) {
                    const probe = runGit(["-C", localPath, "rev-parse", "--is-shallow-repository"], { check: false });
                    if (probe.code === 0 && probe.stdout === "true") {
                        throw new NixError(`error: '${url}' is a shallow Git repository, but fetching from a shallow repository requires 'shallow = true'`);
                    }
                }

                // Check cache
                // TODO: Store and retrieve metadata with cached paths
                // For now, skip cache to ensure metadata is always available
                const cacheKey = `fetchgit:${url}:${normalizedRef}:${rev || "tip"}`;

                // Workdir semantics (plain local paths, no rev/ref requested):
                // a dirty or headless worktree is copied from `git ls-files`
                // instead of fetched, with rev reported as all zeros.
                if (url.startsWith("/") && !rev && !refGiven) {
                    const headProbe = runGit(["-C", url, "rev-parse", "HEAD"], { check: false });
                    const hasHead = headProbe.code === 0;
                    let dirty = false;
                    if (hasHead) {
                        const status = runGit(["-C", url, "status", "--porcelain"], { check: false });
                        // untracked files ("??") do not make a worktree dirty
                        dirty = status.code === 0 && status.stdout.split("\n").some((l) => l && !l.startsWith("??"));
                    }
                    if (!hasHead || dirty) {
                        const files = runGit(["-C", url, "ls-files", "-z"]).stdout.split("\0").filter(Boolean);
                        const tempDir = Deno.makeTempDirSync();
                        for (const f of files) {
                            const src = `${url}/${f}`;
                            let st;
                            try { st = Deno.lstatSync(src) } catch { continue }
                            const dest = `${tempDir}/${f}`;
                            Deno.mkdirSync(dest.slice(0, dest.lastIndexOf("/")), { recursive: true });
                            if (st.isSymlink) {
                                Deno.symlinkSync(Deno.readLinkSync(src), dest);
                            } else {
                                Deno.copyFileSync(src, dest);
                            }
                        }
                        const narHash = hashPathSync(tempDir);
                        const storePath = computeFetchStorePath(narHash, name);
                        atomicMoveSync(tempDir, storePath);
                        const meta = {
                            rev: "0".repeat(40),
                            shortRev: "0000000",
                            revCount: 0n,
                            lastModified: 0n,
                            lastModifiedDate: "19700101000000",
                            narHash: narHashToSRI(narHash),
                            submodules,
                        };
                        if (hasHead) {
                            meta.dirtyRev = `${headProbe.stdout}-dirty`;
                            meta.dirtyShortRev = `${runGit(["-C", url, "rev-parse", "--short", "HEAD"]).stdout}-dirty`;
                        }
                        return finishResult(storePath, meta);
                    }
                    // clean worktree: fall through to a normal fetch
                }

                // Normal fetch: init + fetch + checkout FETCH_HEAD. Unlike
                // `clone --branch`, an explicit refspec handles branches, tags,
                // and fully-qualified refs (refs/tags/x, refs/heads/x) uniformly.
                const tempDir = Deno.makeTempDirSync();
                try {
                    runGit(["init", "-q", tempDir]);
                    runGit(["-C", tempDir, "remote", "add", "origin", url]);
                    const depthArgs = shallow ? ["--depth", "1"] : [];
                    if (rev) {
                        // Try fetching the rev directly (works for local repos and
                        // servers with allowAnySHA1InWant); fall back to all refs.
                        const direct = runGit(["-C", tempDir, "fetch", "-q", ...depthArgs, "origin", rev], { check: false });
                        if (direct.code !== 0) {
                            runGit(["-C", tempDir, "fetch", "-q", ...depthArgs, "origin", "+refs/*:refs/remotes/origin/*"]);
                        }
                        const co = runGit(["-C", tempDir, "checkout", "-q", rev], { check: false });
                        if (co.code !== 0) {
                            throw new Error(`git checkout ${rev} failed: ${co.stderr}`);
                        }
                    } else {
                        const refspec = ref === "HEAD" ? "HEAD" : normalizedRef;
                        const fetched = runGit(["-C", tempDir, "fetch", "-q", ...depthArgs, "origin", refspec], { check: false });
                        if (fetched.code !== 0) {
                            throw new Error(`git clone failed: fetching '${refspec}' from '${url}':\n${fetched.stderr}`);
                        }
                        runGit(["-C", tempDir, "checkout", "-q", "FETCH_HEAD"]);
                    }
                    if (allRefs) {
                        runGit(["-C", tempDir, "fetch", "-q", "origin", "+refs/*:refs/*"], { check: false });
                    }
                    if (submodules) {
                        // protocol.file.allow: git blocks file-protocol submodule
                        // clones by default (CVE-2022-39253); Nix allows them
                        runGit(["-C", tempDir, "-c", "protocol.file.allow=always", "submodule", "update", "--init", "--recursive", "--quiet"]);
                    }

                    // Commit signature verification (ssh keys, like Nix's
                    // verifyCommit): build an allowed-signers file and let git
                    // check HEAD's signature against it.
                    if (verifyCommit) {
                        const signersFile = Deno.makeTempFileSync();
                        try {
                            Deno.writeTextFileSync(signersFile, publicKeys.map((k) => `* ${k.type} ${k.key}`).join("\n") + "\n");
                            const verify = runGit(["-C", tempDir, "-c", `gpg.ssh.allowedSignersFile=${signersFile}`, "verify-commit", "HEAD"], { check: false });
                            if (verify.code !== 0) {
                                throw new NixError(`error: Commit signature verification on commit HEAD failed: ${verify.stderr}`);
                            }
                        } finally {
                            try { Deno.removeSync(signersFile); } catch {}
                        }
                    }

                    // Extract metadata
                    const fullRev = runGit(["-C", tempDir, "rev-parse", "HEAD"]).stdout;
                    const shortRev = runGit(["-C", tempDir, "rev-parse", "--short", "HEAD"]).stdout;
                    const lastModified = BigInt(runGit(["-C", tempDir, "log", "-1", "--format=%ct", "HEAD"]).stdout);
                    // A shallow fetch cannot know the true commit count, so like
                    // Nix the revCount attribute is omitted entirely.
                    const revCount = shallow ? null : BigInt(runGit(["-C", tempDir, "rev-list", "--count", "HEAD"]).stdout);

                    // Remove .git entries (recursively — submodule checkouts leave
                    // .git files behind) for determinism
                    const removeGitDirs = (dir) => {
                        for (const e of Deno.readDirSync(dir)) {
                            if (e.name === ".git") {
                                Deno.removeSync(`${dir}/${e.name}`, { recursive: true });
                            } else if (e.isDirectory) {
                                removeGitDirs(`${dir}/${e.name}`);
                            }
                        }
                    };
                    removeGitDirs(tempDir);

                    const narHash = hashPathSync(tempDir);
                    const storePath = computeFetchStorePath(narHash, name);
                    atomicMoveSync(tempDir, storePath);
                    setCachedPathSync(cacheKey, storePath);

                    const meta = {
                        rev: fullRev,
                        shortRev,
                        lastModified,
                        lastModifiedDate: fmtLastModifiedDate(lastModified),
                        narHash: narHashToSRI(narHash),
                        submodules,
                    };
                    if (revCount != null) {
                        meta.revCount = revCount;
                    }
                    return finishResult(storePath, meta);
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        Deno.removeSync(tempDir, { recursive: true });
                    } catch {
                        // Ignore cleanup errors
                    }
                    throw error;
                }
            },
            "fetchMercurial": (args) => {
                // Parse arguments: can be string URL or {url, name?, rev?, ref?}
                let url, name, rev, ref;
                if (typeof args === "string" || args instanceof InterpolatedString) {
                    url = requireString(args);
                    name = extractNameFromUrl(url) || "source";
                    rev = null;
                    ref = "default"; // Mercurial's default branch
                } else {
                    url = requireString(args["url"]);
                    name = args["name"] ? requireString(args["name"]) : (extractNameFromUrl(url) || "source");
                    rev = args["rev"] ? requireString(args["rev"]) : null;
                    ref = args["ref"] ? requireString(args["ref"]) : "default";
                }

                // Ensure store directory exists
                ensureStoreDirectorySync();

                // Check cache
                const cacheKey = `fetchhg:${url}:${ref}:${rev || "tip"}`;
                // deliberately not read back from cache, so metadata is always available

                // Validate hg binary exists
                try {
                    const hgVersion = new Deno.Command("hg", {
                        args: ["--version"],
                        stdout: "piped",
                        stderr: "piped",
                    });
                    const { code } = hgVersion.outputSync();
                    if (code !== 0) {
                        throw new Error("hg command failed");
                    }
                } catch (error) {
                    throw new Error(
                        `builtins.fetchMercurial requires hg binary to be installed\n` +
                        `Error: ${error.message}`
                    );
                }

                // Create temp directory for cloning
                const tempDir = Deno.makeTempDirSync();

                try {
                    // Build hg clone command
                    const cloneArgs = ["clone"];

                    // If we have a specific ref (branch), clone that branch
                    if (ref && ref !== "default") {
                        cloneArgs.push("--branch", ref);
                    }

                    cloneArgs.push(url, tempDir);

                    // Execute hg clone
                    const cloneCmd = new Deno.Command("hg", {
                        args: cloneArgs,
                        stdout: "piped",
                        stderr: "piped",
                    });

                    const cloneResult = cloneCmd.outputSync();
                    if (cloneResult.code !== 0) {
                        const errorText = new TextDecoder().decode(cloneResult.stderr);
                        throw new Error(`hg clone failed: ${errorText}`);
                    }

                    // If specific revision requested, update to that revision
                    if (rev) {
                        const updateCmd = new Deno.Command("hg", {
                            args: ["-R", tempDir, "update", "-r", rev],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        const updateResult = updateCmd.outputSync();
                        if (updateResult.code !== 0) {
                            const errorText = new TextDecoder().decode(updateResult.stderr);
                            throw new Error(`hg update -r ${rev} failed: ${errorText}`);
                        }
                    }

                    // Helper function to run hg command and get output
                    function hgOutput(args) {
                        const cmd = new Deno.Command("hg", {
                            args: ["-R", tempDir, ...args],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        const { code, stdout } = cmd.outputSync();
                        if (code !== 0) {
                            throw new Error(`hg ${args.join(" ")} failed`);
                        }
                        return new TextDecoder().decode(stdout).trim();
                    }

                    // Extract metadata using hg log with template
                    // Mercurial template fields: {node} = full hash, {date} = timestamp, {rev} = revision number
                    const logOutput = hgOutput([
                        "log",
                        "-r", ".",
                        "--template", "{node}\\n{date|hgdate}\\n{rev}\\n"
                    ]);

                    const [fullRev, dateInfo, revNumStr] = logOutput.split("\n");

                    // Parse date (format: "timestamp timezone")
                    const timestamp = dateInfo.split(" ")[0];
                    const lastModified = BigInt(Math.floor(parseFloat(timestamp)));

                    // Parse revision number (Mercurial's sequential revision number)
                    const revCount = BigInt(revNumStr) + 1n; // +1 because revs are 0-indexed

                    // Short rev is first 12 characters (Mercurial convention)
                    const shortRev = fullRev.substring(0, 12);

                    // Remove .hg directory for determinism
                    try {
                        Deno.removeSync(`${tempDir}/.hg`, { recursive: true });
                    } catch {
                        // Ignore errors if .hg doesn't exist or can't be removed
                    }

                    // Compute NAR hash of directory
                    const narHash = hashDirectorySync(tempDir);

                    // Compute store path
                    const storePath = computeFetchStorePath(narHash, name);

                    // Move to store
                    atomicMoveSync(tempDir, storePath);

                    // Cache the result
                    setCachedPathSync(cacheKey, storePath);

                    // Return Path object with metadata as properties
                    const result = new Path(storePath);
                    result.outPath = storePath;
                    result.rev = fullRev;
                    result.shortRev = shortRev;
                    result.revCount = revCount;
                    result.lastModified = lastModified;
                    result.narHash = narHashToSRI(narHash);
                    result.branch = ref;
                    return result;
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        Deno.removeSync(tempDir, { recursive: true });
                    } catch {
                        // Ignore cleanup errors
                    }
                    throw error;
                }
            },
            "fetchTree": (args) => {
                // fetchTree is a unified interface for fetching from different source types
                // It accepts either:
                //   1. An attribute set with {type, ...other params}
                //   2. A URL-like string (requires flakes experimental feature)
                // Synchronous on purpose: Nix evaluation is synchronous, so an
                // async fetchTree would leak a Promise into translated code
                // (e.g. `(fetchTree x).outPath`).

                let attrs;

                // Parse input argument
                if (typeof args === "string" || args instanceof InterpolatedString) {
                    const urlString = requireString(args);

                    // Parse URL-like syntax into attribute set
                    // Supported formats:
                    //   - github:owner/repo[/rev]
                    //   - gitlab:owner/repo[/rev]
                    //   - git+https://...
                    //   - https://.../.tar.gz (tarball)
                    //   - https://... (file)

                    // GitHub shorthand: github:owner/repo or github:owner/repo/rev
                    if (urlString.startsWith("github:")) {
                        const parts = urlString.slice(7).split("/");
                        attrs = {
                            type: "github",
                            owner: parts[0],
                            repo: parts[1],
                        };
                        if (parts[2]) {
                            attrs.rev = parts[2];
                        }
                    }
                    // GitLab shorthand: gitlab:owner/repo or gitlab:owner/repo/rev
                    else if (urlString.startsWith("gitlab:")) {
                        const parts = urlString.slice(7).split("/");
                        attrs = {
                            type: "gitlab",
                            owner: parts[0],
                            repo: parts[1],
                        };
                        if (parts[2]) {
                            attrs.rev = parts[2];
                        }
                    }
                    // Path scheme: path:///abs/path or path:/abs/path
                    else if (urlString.startsWith("path:")) {
                        attrs = {
                            type: "path",
                            path: urlString.replace(/^path:\/\/(?=\/)/, "").replace(/^path:/, ""),
                        };
                    }
                    // Git URLs: git+https://, git+ssh://, git://
                    else if (urlString.match(/^git(\+https?|\+ssh)?:\/\//)) {
                        attrs = {
                            type: "git",
                            url: urlString.replace(/^git\+/, ""), // Strip git+ prefix
                        };
                    }
                    // Tarball detection: ends with .tar.gz, .tar.bz2, .tar.xz, .tgz, .tar
                    else if (urlString.match(/\.(tar\.gz|tar\.bz2|tar\.xz|tgz|tar)$/)) {
                        attrs = {
                            type: "tarball",
                            url: urlString,
                        };
                    }
                    // Default to file type for other URLs
                    else {
                        attrs = {
                            type: "file",
                            url: urlString,
                        };
                    }
                } else {
                    // Attribute set input - use as-is
                    attrs = args;
                }

                // Validate that type is specified
                if (!attrs.type) {
                    throw new Error("builtins.fetchTree: attribute 'type' is required");
                }

                const type = requireString(attrs.type);

                // Delegate to appropriate fetcher based on type
                switch (type) {
                    case "git":
                        // Delegate to fetchGit
                        // Extract git-specific parameters
                        const gitArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) gitArgs.name = attrs.name;
                        if (attrs.rev) gitArgs.rev = attrs.rev;
                        if (attrs.ref) gitArgs.ref = attrs.ref;
                        if (attrs.submodules !== undefined) gitArgs.submodules = attrs.submodules;
                        if (attrs.shallow !== undefined) gitArgs.shallow = attrs.shallow;
                        if (attrs.allRefs !== undefined) gitArgs.allRefs = attrs.allRefs;

                        const gitResult = builtins.fetchGit(gitArgs);

                        // Return result with additional metadata if provided
                        if (attrs.lastModified !== undefined) {
                            gitResult.lastModified = BigInt(attrs.lastModified);
                        }
                        if (attrs.revCount !== undefined) {
                            gitResult.revCount = BigInt(attrs.revCount);
                        }

                        return gitResult;

                    case "tarball":
                        // Delegate to fetchTarball
                        const tarballArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) tarballArgs.name = attrs.name;
                        if (attrs.sha256) tarballArgs.sha256 = attrs.sha256;

                        return builtins.fetchTarball(tarballArgs);

                    case "file":
                        // Delegate to fetchurl
                        const fileArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) fileArgs.name = attrs.name;
                        if (attrs.sha256) fileArgs.sha256 = attrs.sha256;

                        return builtins.fetchurl(fileArgs);

                    case "github":
                        // Transform GitHub shorthand to git URL
                        if (!attrs.owner || !attrs.repo) {
                            throw new Error("builtins.fetchTree: type 'github' requires 'owner' and 'repo' attributes");
                        }

                        const owner = requireString(attrs.owner);
                        const repo = requireString(attrs.repo);
                        const rev = attrs.rev ? requireString(attrs.rev) : null;
                        const ref = attrs.ref ? requireString(attrs.ref) : null;

                        // Build GitHub git URL
                        const githubUrl = `https://github.com/${owner}/${repo}.git`;

                        const githubArgs = {
                            url: githubUrl,
                            name: attrs.name || `${repo}-source`,
                        };

                        if (rev) {
                            githubArgs.rev = rev;
                        } else if (ref) {
                            githubArgs.ref = ref;
                        }

                        if (attrs.submodules !== undefined) githubArgs.submodules = attrs.submodules;
                        if (attrs.shallow !== undefined) githubArgs.shallow = attrs.shallow;
                        if (attrs.allRefs !== undefined) githubArgs.allRefs = attrs.allRefs;

                        const githubResult = builtins.fetchGit(githubArgs);

                        // Add shortRev if not already present
                        if (!githubResult.shortRev && githubResult.rev) {
                            githubResult.shortRev = githubResult.rev.slice(0, 7);
                        }

                        return githubResult;

                    case "gitlab":
                        // Transform GitLab shorthand to git URL
                        if (!attrs.owner || !attrs.repo) {
                            throw new Error("builtins.fetchTree: type 'gitlab' requires 'owner' and 'repo' attributes");
                        }

                        const glOwner = requireString(attrs.owner);
                        const glRepo = requireString(attrs.repo);
                        const glRev = attrs.rev ? requireString(attrs.rev) : null;
                        const glRef = attrs.ref ? requireString(attrs.ref) : null;
                        const glHost = attrs.host ? requireString(attrs.host) : "gitlab.com";

                        // Build GitLab git URL
                        const gitlabUrl = `https://${glHost}/${glOwner}/${glRepo}.git`;

                        const gitlabArgs = {
                            url: gitlabUrl,
                            name: attrs.name || `${glRepo}-source`,
                        };

                        if (glRev) {
                            gitlabArgs.rev = glRev;
                        } else if (glRef) {
                            gitlabArgs.ref = glRef;
                        }

                        if (attrs.submodules !== undefined) gitlabArgs.submodules = attrs.submodules;
                        if (attrs.shallow !== undefined) gitlabArgs.shallow = attrs.shallow;
                        if (attrs.allRefs !== undefined) gitlabArgs.allRefs = attrs.allRefs;

                        return builtins.fetchGit(gitlabArgs);

                    case "sourcehut":
                        // Transform SourceHut shorthand to git URL
                        if (!attrs.owner || !attrs.repo) {
                            throw new Error("builtins.fetchTree: type 'sourcehut' requires 'owner' and 'repo' attributes");
                        }

                        const shOwner = requireString(attrs.owner);
                        const shRepo = requireString(attrs.repo);
                        const shRev = attrs.rev ? requireString(attrs.rev) : null;
                        const shRef = attrs.ref ? requireString(attrs.ref) : null;
                        const shHost = attrs.host ? requireString(attrs.host) : "git.sr.ht";

                        // Build SourceHut git URL
                        const sourcehutUrl = `https://${shHost}/~${shOwner}/${shRepo}`;

                        const sourcehutArgs = {
                            url: sourcehutUrl,
                            name: attrs.name || `${shRepo}-source`,
                        };

                        if (shRev) {
                            sourcehutArgs.rev = shRev;
                        } else if (shRef) {
                            sourcehutArgs.ref = shRef;
                        }

                        if (attrs.submodules !== undefined) sourcehutArgs.submodules = attrs.submodules;
                        if (attrs.shallow !== undefined) sourcehutArgs.shallow = attrs.shallow;
                        if (attrs.allRefs !== undefined) sourcehutArgs.allRefs = attrs.allRefs;

                        return builtins.fetchGit(sourcehutArgs);

                    case "mercurial":
                    case "hg":
                        // Delegate to fetchMercurial
                        const hgArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) hgArgs.name = attrs.name;
                        if (attrs.rev) hgArgs.rev = attrs.rev;
                        if (attrs.ref) hgArgs.ref = attrs.ref;

                        // Return unified fetchTree format (same as git)
                        const hgResult = builtins.fetchMercurial(hgArgs);
                        return {
                            outPath: hgResult.toString(),
                            rev: hgResult.rev,
                            shortRev: hgResult.shortRev,
                            revCount: hgResult.revCount,
                            lastModified: hgResult.lastModified,
                            narHash: hgResult.narHash,
                        };

                    case "path":
                        // Delegate to builtins.path
                        // Implementation based on https://noogle.dev/f/builtins/fetchTree
                        // type='path' accepts: path (required), name (optional)
                        if (!attrs.path) {
                            throw new Error("builtins.fetchTree: type 'path' requires 'path' attribute");
                        }

                        const pathArgs = {
                            path: attrs.path,
                        };
                        if (attrs.name) pathArgs.name = attrs.name;
                        if (attrs.filter) pathArgs.filter = attrs.filter;
                        if (attrs.recursive !== undefined) pathArgs.recursive = attrs.recursive;
                        if (attrs.sha256) pathArgs.sha256 = attrs.sha256;

                        const pathStorePath = builtins.path(pathArgs).toString();
                        const materialized = `${STORE_DIR}/${pathStorePath.split("/").pop()}`;

                        // Nix's path fetcher reports the source's mtime as
                        // lastModified, unless explicitly overridden in attrs
                        const srcStat = Deno.statSync(requireString(attrs.path).toString());
                        const pathLastModified = attrs.lastModified !== undefined
                            ? BigInt(force(attrs.lastModified))
                            : BigInt(Math.floor((srcStat.mtime?.getTime() ?? 0) / 1000));
                        const lmDate = new Date(Number(pathLastModified) * 1000);
                        const pad2 = (n) => String(n).padStart(2, "0");
                        const pathResult = {
                            outPath: pathStorePath,
                            narHash: narHashToSRI(hashPathSync(materialized)),
                            lastModified: pathLastModified,
                            lastModifiedDate: `${lmDate.getUTCFullYear()}${pad2(lmDate.getUTCMonth() + 1)}${pad2(lmDate.getUTCDate())}${pad2(lmDate.getUTCHours())}${pad2(lmDate.getUTCMinutes())}${pad2(lmDate.getUTCSeconds())}`,
                        };
                        Object.defineProperty(pathResult, "toString", { value: () => pathStorePath, enumerable: false });
                        return pathResult;

                    case "indirect":
                        // Flake registry indirection - resolve via registry
                        const indirectId = requireString(attrs.id || attrs.ref).toString();

                        // Resolve the indirect reference via registry
                        const resolvedRef = resolveIndirectReference(indirectId);
                        if (!resolvedRef) {
                            throw new Error(
                                `builtins.fetchTree: indirect flake reference "${indirectId}" not found in registry.\n` +
                                `Available registries:\n` +
                                `  - User: ~/.config/nix/registry.json\n` +
                                `  - System: /etc/nix/registry.json\n` +
                                `  - Global: https://channels.nixos.org/flake-registry.json\n` +
                                `\n` +
                                `You can also use explicit references like "github:owner/repo" instead.`
                            );
                        }
                        // Recursively call fetchTree with the resolved reference
                        return builtins.fetchTree(resolvedRef);

                    default:
                        throw new Error(`builtins.fetchTree: unsupported type '${type}'`);
                }
            },
            "fetchClosure": (args)=>{
                throw new NotImplemented(`builtins.fetchClosure requires binary cache support and store implementation (experimental feature)`)
            },

        // misc
            "import": (path)=>importFile(requireRuntime(), path),
            "scopedImport": (scope)=>(path)=>scopedImportFile(requireRuntime(), scope, path),
            "functionArgs": (f)=>{
                if (!builtins.isFunction(f)) {
                    throw new NixError(`error: 'functionArgs' requires a function, got ${builtins.typeOf(f)}`)
                }
                // If function has __functionArgs metadata (set during parsing/evaluation), return it
                if (f.__functionArgs) {
                    return f.__functionArgs
                }
                // Otherwise return empty set (no formal args or not tracked)
                return {}
            },
        
        // evaluation control
            "break": (value)=>value, // NOTE: we just ignore the debugging aspect
            "trace": (e1)=>(e2)=>{
                console.error(builtins.toString(e1))
                return e2
            },
            "traceVerbose": (e1)=>(e2)=>{
                if (Deno.env.get("NIX_TRACE_VERBOSE")) {
                    console.error(builtins.toString(e1))
                }
                return e2
            },
            "tryEval": (e)=>{
                // `e` arrives as a Thunk (tryEval is registered as a lazy-arg
                // builtin), so the evaluation — and any NixError it raises —
                // happens INSIDE this try. Nix forces only to WHNF here.
                try {
                    return { success: true, value: force(e) }
                } catch (error) {
                    if (error instanceof NixError) {
                        return { success: false, value: false }
                    }
                    throw error
                }
            },
            "seq": (e1)=>(e2)=>{
                e1
                return e2
            },
            "deepSeq": (e1)=>(e2)=>{
                // Nix's forceValueDeep tracks visited lists/attrsets, so
                // self-referential structures (as.y = as) terminate instead
                // of overflowing the call stack.
                const seen = new WeakSet()
                const deepEval = (val) => {
                    if (val instanceof Array) {
                        if (seen.has(val)) {
                            return
                        }
                        seen.add(val)
                        for (const item of val) {
                            deepEval(item)
                        }
                    } else if (builtins.isAttrs(val)) {
                        if (seen.has(val)) {
                            return
                        }
                        seen.add(val)
                        for (const key of Object.keys(val)) {
                            deepEval(val[key])
                        }
                    }
                }
                deepEval(e1)
                return e2
            },
            "abort": (value)=>{ throw new NixError(`error: evaluation aborted with the following error message: ${nixRepr(value)}`) },
            "throw": (s)=>{ throw new NixError(requireString(s).toString()) },
        
        // file system
            "getEnv": (string)=>Deno.env.get(requireString(string)) || "",
            "readFile": (value)=>Deno.readTextFileSync(value.toString()),
            "baseNameOf": (value)=>{
                if (value && value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    return FileSystem.basename(value.toString())
                }
                if (builtins.isString(value)) {
                    // Nix baseNameOf for strings: strip one trailing '/', then everything after last '/'
                    let s = value.toString()
                    if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1)
                    const i = s.lastIndexOf("/")
                    return i < 0 ? s : s.slice(i + 1)
                }
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            },
            "dirOf": (value)=>{
                if (value && value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    // dirOf on a path returns a path
                    const dir = FileSystem.dirname(value.toString())
                    return new Path([dir], [])
                }
                if (builtins.isString(value)) {
                    // Nix dirOf for strings: everything before the last '/'
                    const s = value.toString()
                    const i = s.lastIndexOf("/")
                    if (i < 0) return "."
                    if (i === 0) return "/"
                    return s.slice(0, i)
                }
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            },
            "pathExists": (path)=>FileSystem.sync.info(path).exists,
            "toFile": (name)=>(content)=>{
                // In real Nix, this writes content to /nix/store/<hash>-<name>
                // For now, we'll compute the correct store path but not actually write it
                const nameStr = requireString(name).toString()
                const contentStr = requireString(content).toString()

                // Validate name (no slashes allowed)
                if (nameStr.includes("/")) {
                    throw new NixError(`error: 'toFile' name cannot contain '/'`)
                }

                // Compute store path using text method (similar to .drv files)
                // Fingerprint: "text:sha256:<content-hash>:/nix/store:<name>"
                const contentHash = sha256Hex(contentStr)
                const fingerprint = `text:sha256:${contentHash}:${getStoreDir()}:${nameStr}`
                const fingerprintHash = sha256Hex(fingerprint)

                // Convert to bytes and XOR-fold to 20 bytes
                const hashBytes = new Uint8Array(32)
                for (let i = 0; i < 32; i++) {
                    hashBytes[i] = parseInt(fingerprintHash.slice(i * 2, i * 2 + 2), 16)
                }
                const compressed = new Uint8Array(20)
                for (let i = 0; i < 32; i++) {
                    compressed[i % 20] ^= hashBytes[i]
                }

                // Reverse bytes for Nix base-32 encoding
                const reversed = new Uint8Array(compressed.length)
                for (let i = 0; i < compressed.length; i++) {
                    reversed[i] = compressed[compressed.length - 1 - i]
                }

                // Nix base-32 alphabet
                const alphabet = "0123456789abcdfghijklmnpqrsvwxyz"
                let hash32 = ""
                let bits = 0n
                for (const byte of reversed) {
                    bits = (bits << 8n) | BigInt(byte)
                }
                while (bits > 0n) {
                    hash32 = alphabet[Number(bits % 32n)] + hash32
                    bits = bits / 32n
                }
                hash32 = hash32.padStart(32, "0")

                const storePath = `${getStoreDir()}/${hash32}-${nameStr}`

                // Materialize the file in the relocatable store so builders that
                // use it as a source can actually read it.
                try {
                    const storeRoot = Deno.env.get("DENIX_STORE_ROOT") ||
                        ((Deno.env.get("HOME") || "") + "/.cache/denix/store")
                    Deno.mkdirSync(storeRoot, { recursive: true })
                    Deno.writeTextFileSync(`${storeRoot}/${hash32}-${nameStr}`, contentStr)
                } catch { /* best-effort; eval correctness doesn't require it */ }

                // Return a context-carrying string: the path is a SOURCE, which a
                // dependent derivation records in inputSrcs.
                return new NixString(storePath, new Map([
                    [storePath, { outputs: new Set(), path: true, allOutputs: false }],
                ]))
            },
            "readFileType": (p)=>{
                const absolutePath = FileSystem.makeAbsolutePath(p.toString())
                try {
                    // Use lstatSync to detect symlinks without following them
                    const stat = Deno.lstatSync(absolutePath)
                    if (stat.isSymlink) return "symlink"
                    if (stat.isFile) return "regular"
                    if (stat.isDirectory) return "directory"
                    return "unknown"
                } catch (e) {
                    throw new NixError(`error: getting status of '${absolutePath}': ${e.message}`)
                }
            },
            "path": (args) => {
                // Parse arguments
                requireAttrSet(args);
                const rawPath = force(args["path"])
                const sourcePath = (rawPath instanceof Path ? rawPath : requireString(rawPath)).toString();

                // Get optional parameters
                const name = args["name"]
                    ? requireString(args["name"]).toString()
                    : FileSystem.basename(sourcePath);
                const filter = args["filter"] || null; // Optional predicate function
                const recursive = args["recursive"] !== false; // Default true
                const expectedSha256 = args["sha256"]
                    ? requireString(args["sha256"]).toString()
                    : null;

                // Ensure store directory exists
                ensureStoreDirectorySync();

                // Resolve to absolute path
                const absPath = FileSystem.makeAbsolutePath(sourcePath);

                // Check if source exists
                const sourceInfo = FileSystem.sync.info(absPath);
                if (!sourceInfo.exists) {
                    throw new NixError(`error: path '${sourcePath}' does not exist`);
                }

                // Create temp directory for copying
                const tempDir = Deno.makeTempDirSync();
                const tempPath = `${tempDir}/${name}`;

                try {
                    // Helper to determine file type string
                    const getFileType = (stat) => {
                        if (stat.isFile) return "regular";
                        if (stat.isDirectory) return "directory";
                        if (stat.isSymlink) return "symlink";
                        return "unknown";
                    };

                    // Recursive copy function with filtering
                    const copyFiltered = (src, dest) => {
                        const stat = Deno.statSync(src);
                        const type = getFileType(stat);

                        // Apply filter if provided
                        // Filter signature: (path, type) => boolean
                        if (filter) {
                            const shouldInclude = filter(src)(type);
                            if (!shouldInclude) {
                                return; // Skip this file
                            }
                        }

                        if (stat.isFile) {
                            // Copy file
                            Deno.copyFileSync(src, dest);
                            // Preserve executable bit
                            if (stat.mode && (stat.mode & 0o111)) {
                                Deno.chmodSync(dest, stat.mode);
                            }
                        } else if (stat.isDirectory) {
                            // Create directory
                            Deno.mkdirSync(dest, { recursive: true });

                            // If recursive, copy contents
                            if (recursive) {
                                for (const entry of Deno.readDirSync(src)) {
                                    copyFiltered(
                                        `${src}/${entry.name}`,
                                        `${dest}/${entry.name}`
                                    );
                                }
                            }
                        } else if (stat.isSymlink) {
                            // Copy symlink
                            const target = Deno.readLinkSync(src);
                            Deno.symlinkSync(target, dest);
                        }
                    };

                    // Copy source to temp location
                    copyFiltered(absPath, tempPath);

                    // NAR-hash the (possibly filtered) copy — files, dirs and
                    // symlinks all use NAR for source store paths (real Nix)
                    const narHash = hashPathSync(tempPath);

                    // Validate sha256 if provided
                    if (expectedSha256) {
                        const normalizedExpected = expectedSha256.replace(/^sha256[:-]/, '');
                        const normalizedActual = narHash.replace(/^sha256[:-]/, '');
                        if (normalizedExpected !== normalizedActual) {
                            throw new Error(
                                `Hash mismatch for ${sourcePath}:\n` +
                                `  Expected: ${normalizedExpected}\n` +
                                `  Actual:   ${normalizedActual}`
                            );
                        }
                    }

                    // Store path uses /nix/store (matches real Nix drvs); the
                    // copy is materialized in the denix cache store
                    const hex = narHash.replace(/^sha256:/, '');
                    const storePath = makeFixedOutputPath(name, { algo: "sha256", hex, recursive: true });
                    const materializedPath = `${STORE_DIR}/${storePath.split("/").pop()}`;
                    atomicMoveSync(tempPath, materializedPath);
                    sourcePathOrigins.set(storePath, materializedPath);

                    // Return a Path carrying source context, so a dependent
                    // derivation records this path in inputSrcs.
                    const result = new Path([storePath], []);
                    result.context = new Map([
                        [storePath, { outputs: new Set(), path: true, allOutputs: false }],
                    ]);
                    return result;
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        Deno.removeSync(tempDir, { recursive: true });
                    } catch {}
                    throw error;
                }
            },
            
            "readDir": (path)=>{
                const absolutePath = FileSystem.makeAbsolutePath(path.toString())
                const result = {}
                for (const entry of Deno.readDirSync(absolutePath)) {
                    if (entry.isFile) {
                        result[entry.name] = "regular"
                    } else if (entry.isDirectory) {
                        result[entry.name] = "directory"
                    } else if (entry.isSymlink) {
                        result[entry.name] = "symlink"
                    } else {
                        result[entry.name] = "unknown"
                    }
                }
                return result
            },
            
            "findFile": (searchPath)=>(lookup)=>{
                // https://nix-community.github.io/docnix/reference/builtins/builtins-findfile/
                // searchPath is a list like [{ path = "/some/path"; prefix = ""; }]
                // lookup is a string like "nixpkgs" or "nixpkgs/pkgs"
                requireList(searchPath)
                const lookupStr = requireString(lookup).toString()

                for (const entry of searchPath) {
                    requireAttrSet(entry)
                    const prefix = requireString(entry.prefix || "").toString()
                    const path = requireString(entry.path).toString()

                    // Check if lookup starts with this prefix
                    if (prefix) {
                        if (lookupStr === prefix || lookupStr.startsWith(prefix + "/")) {
                            // Remove prefix from lookup and check in path
                            const suffix = lookupStr.slice(prefix.length).replace(/^\//, "")
                            const fullPath = suffix ? FileSystem.join(path, suffix) : path

                            if (FileSystem.sync.info(fullPath).exists) {
                                return new Path([""], [()=>FileSystem.makeAbsolutePath(fullPath)])
                            }
                        }
                    } else {
                        // No prefix, just check directly
                        const fullPath = FileSystem.join(path, lookupStr)
                        if (FileSystem.sync.info(fullPath).exists) {
                            return new Path([""], [()=>FileSystem.makeAbsolutePath(fullPath)])
                        }
                    }
                }

                // Real Nix implicitly appends `nix=<corepkgs>` to the search
                // path (e.g. `<nix/fetchurl.nix>` used by stdenv bootstrap).
                // We bundle those files in main/corepkgs/.
                if (lookupStr === "nix" || lookupStr.startsWith("nix/")) {
                    const suffix = lookupStr.slice(3).replace(/^\//, "")
                    const corepkgsDir = new URL("./corepkgs", import.meta.url).pathname
                    const fullPath = suffix ? FileSystem.join(corepkgsDir, suffix) : corepkgsDir
                    if (FileSystem.sync.info(fullPath).exists) {
                        return new Path([""], [()=>FileSystem.makeAbsolutePath(fullPath)])
                    }
                }

                throw new NixError(`error: file '${lookupStr}' was not found in the Nix search path`)
            },
        
        // nix-y derivation-y stuff
            // Constants in real Nix (not functions)
            get "nixPath"() {
                // NIX_PATH as a list of attrsets
                const nixPath = Deno.env.get("NIX_PATH") || ""
                if (!nixPath) { return [] }

                return nixPath.split(":").map(entry => {
                    if (!entry.includes("=")) {
                        return { prefix: "", path: entry }
                    }
                    const idx = entry.indexOf("=")
                    const prefix = entry.slice(0, idx)
                    const path = entry.slice(idx + 1)
                    return { prefix, path }
                })
            },
            get "storeDir"() { return getStoreDir() },
            "storePath": (path)=>{
                const pathStr = requireString(path).toString()
                const storeDir = getStoreDir()

                // Check if path is in store
                if (!pathStr.startsWith(storeDir + "/")) {
                    throw new NixError(`error: path '${pathStr}' is not in the Nix store`)
                }

                // Validate store path format: /nix/store/<hash>-<name>
                const storePath = pathStr.slice(storeDir.length + 1)
                const parts = storePath.split("/")[0] // Get first component
                if (!parts.match(/^[a-z0-9]{32}-.+$/)) {
                    throw new NixError(`error: path '${pathStr}' is not a valid store path`)
                }

                return pathStr
            },
            "derivation": (attrs)=>{
                // https://nix.dev/manual/nix/2.18/language/derivations.html
                //
                // Laziness mirrors real Nix (corepkgs derivation.nix): only
                // `outputs` is forced when the result attrset is built. The
                // heavy work — coercing every env attr, collecting deps,
                // hashing, computing outPath/drvPath — is `derivationStrict`,
                // which real Nix runs lazily the first time outPath/drvPath is
                // read. Doing it eagerly caused infinite recursion in nixpkgs'
                // stdenv bootstrap: merely checking `pkg.passthru.…` must not
                // force the whole env.

                // Outputs default to ["out"]
                const outputNames = attrs.outputs ? requireList(attrs.outputs).map(o => requireString(o).toString()) : ["out"]

                let strictCache = null
                let strictComputing = false
                const strict = () => {
                    if (strictCache) { return strictCache }
                    // Blackholing, like real Nix
                    if (strictComputing) { throw new NixError("error: infinite recursion encountered") }
                    strictComputing = true
                    try {
                        strictCache = computeStrict()
                        return strictCache
                    } finally {
                        strictComputing = false
                    }
                }
                const computeStrict = () => {
                    // Validate required attributes
                    if (!attrs.name) { throw new NixError("derivation requires 'name' attribute") }
                    if (!attrs.system) { throw new NixError("derivation requires 'system' attribute") }
                    if (!attrs.builder) { throw new NixError("derivation requires 'builder' attribute") }

                    const name = requireString(attrs.name).toString()
                    const system = requireString(attrs.system).toString()

                    // Collect the derivation objects this derivation depends on, so
                    // the builder can realize them first. Dependencies appear either
                    // directly (attr/list values that are derivations) or embedded in
                    // interpolated strings like "${dep}/bin/foo" (captured in the
                    // Interpolater's getters). We scan before env coercion so the
                    // getters are still present.
                    // Collect dependency references as {drv, outputName} so that a
                    // reference to a NON-default output (e.g. `pkg.dev`) records that
                    // specific output. `pkg.dev` is itself a derivation-output object
                    // tagged with outputName="dev" (see the output-objects section
                    // below); the base derivation defaults to its first output.
                    const inputDrvObjects = [] // entries: { drv, outputName }
                    const inputSrcsSet = new Set() // source store paths (from NixString path-context)
                    {
                        const seenRef = new Set() // key: drvPath + "!" + outputName
                        const collectDeps = (v, depth) => {
                            if (v == null || depth > 40) return
                            // A context-carrying value (NixString, an already
                            // flattened InterpolatedString, or a Path from
                            // builtins.path) contributes source paths → inputSrcs.
                            if (v && v.context instanceof Map) {
                                for (const [k, e] of v.context) {
                                    if (e.path) { inputSrcsSet.add(k) }
                                }
                                if (!(v instanceof Interpolater)) { return }
                            }
                            if (typeof v !== "object") return
                            if (v.type === "derivation") {
                                const outName = v.outputName || (v.outputs && v.outputs[0]) || "out"
                                const key = v.drvPath + "!" + outName
                                if (!seenRef.has(key)) {
                                    seenRef.add(key)
                                    inputDrvObjects.push({ drv: v, outputName: outName })
                                }
                                return // don't descend into a derivation's own internals
                            }
                            if (Array.isArray(v)) {
                                for (const e of v) collectDeps(e, depth + 1)
                                return
                            }
                            if (v instanceof Path) {
                                // A path used in a derivation is copied to the
                                // store and becomes an inputSrc (real Nix).
                                if (!(v.context instanceof Map)) {
                                    inputSrcsSet.add(copyPathToStore(v.toString()))
                                }
                                return
                            }
                            if (v instanceof Interpolater) {
                                if (v.deps) {
                                    for (const d of v.deps) { collectDeps(d, depth + 1) }
                                }
                                if (v.getters) {
                                    for (const g of v.getters) {
                                        if (g) { try { collectDeps(g(), depth + 1) } catch { /* lazy errors surface elsewhere */ } }
                                    }
                                }
                                return
                            }
                            for (const e of Object.values(v)) collectDeps(e, depth + 1)
                        }
                        for (const v of Object.values(attrs)) collectDeps(v, 0)
                    }
                    // inputSrcs sorted (Nix requirement).
                    const inputSrcs = [...inputSrcsSet].sort()

                    // Builder can be a string or derivation
                    let builder
                    if (typeof attrs.builder === "string") {
                        builder = attrs.builder
                    } else if (attrs.builder?.type === "derivation") {
                        builder = attrs.builder.outPath
                    } else {
                        builder = requireString(attrs.builder).toString()
                    }

                    // Coerce a value to the string form Nix uses for builder args
                    // and env vars: derivations/attrsets coerce via outPath or
                    // __toString, paths/strings via toString.
                    const coerceForDrv = (v)=>{
                        // Mirrors Nix's coerceToString with coerceMore=true (the
                        // rules for derivation env/args values).
                        v = force(v)
                        if (v === null) { return "" }
                        if (v === true) { return "1" }
                        if (v === false) { return "" }
                        if (typeof v === "bigint") { return String(v) }
                        if (typeof v === "number") { return builtins.toString(v) }
                        if (v instanceof Array) {
                            return v.map(coerceForDrv).join(" ")
                        }
                        if (v?.type === "derivation" || (v && (typeof v === "object" || isFunctorSet(v)) && !(v instanceof Interpolater) && v.outPath !== undefined)) {
                            return force(v.outPath).toString()
                        }
                        if (v && (typeof v === "object" || isFunctorSet(v)) && !(v instanceof Interpolater) && typeof v.__toString === "function") {
                            return requireString(apply(v.__toString, v)).toString()
                        }
                        if (v instanceof Path) {
                            if (v.context instanceof Map) { return v.toString() }
                            return copyPathToStore(v.toString())
                        }
                        return requireString(v).toString()
                    }

                    // Args default to empty list
                    const builderArgs = attrs.args ? requireList(attrs.args).map(coerceForDrv) : []

                    // Special attrs (verified against real nix):
                    //   __ignoreNulls     — never serialized; true drops null attrs
                    //   __structuredAttrs — true switches env to a single __json
                    //                       entry (JSON of all attrs except args and
                    //                       __structuredAttrs itself); false stays a
                    //                       normal env var ("")
                    const structuredAttrs = force(attrs.__structuredAttrs) === true
                    const ignoreNulls = force(attrs.__ignoreNulls) === true

                    const env = {}
                    if (structuredAttrs) {
                        const jsonAttrs = {}
                        for (const [key, value] of Object.entries(attrs)) {
                            if (key === "__structuredAttrs" || key === "__ignoreNulls" || key === "args") { continue }
                            const v = force(value)
                            if (ignoreNulls && v === null) { continue }
                            jsonAttrs[key] = v
                        }
                        env.__json = builtins.toJSON(jsonAttrs)
                    } else {
                        // Reserved attributes that don't become env vars
                        const reserved = new Set(["name", "system", "builder", "args", "outputs", "__ignoreNulls"])

                        // Build environment variables from all attributes
                        for (const [key, rawValue] of Object.entries(attrs)) {
                            if (reserved.has(key)) { continue }
                            const value = force(rawValue)

                            // Convert value to environment variable string
                            if (value === null) {
                                if (ignoreNulls) { continue }
                                env[key] = ""
                            } else if (value === true) {
                                env[key] = "1"
                            } else if (value === false) {
                                env[key] = ""
                            } else if (typeof value === "string") {
                                env[key] = value
                            } else if (typeof value === "number" || typeof value === "bigint") {
                                env[key] = String(value)
                            } else if (Array.isArray(value)) {
                                env[key] = value.map(coerceForDrv).join(" ")
                            } else if (value?.type === "derivation") {
                                env[key] = value.outPath
                            } else {
                                env[key] = coerceForDrv(value)
                            }
                        }

                        // Add required env vars
                        env.name = name
                        env.builder = builder
                        env.system = system

                        // The outputs env var exists iff an `outputs` attr was
                        // passed (every attr becomes an env var in real Nix)
                        if (attrs.outputs !== undefined) {
                            env.outputs = outputNames.join(" ")
                        }
                    }

                    // CRITICAL: For non-fixed-output derivations, Nix uses EMPTY STRINGS
                    // during hash computation (both in outputs array AND env vars)
                    // Placeholders are only used at runtime during execution, not during hash computation
                    for (const outputName of outputNames) {
                        env[outputName] = ""
                    }

                    const storeDir = getStoreDir()

                    // ---- input derivations (hashDerivationModulo) --------------
                    // Nix computes output paths from `hashDerivationModulo`, where
                    // every input derivation's drvPath is replaced by that input's
                    // own modulo hash. Crucially there are TWO modulo hashes per
                    // derivation (verified against real Nix):
                    //   • masked   (output paths blanked) — gives a derivation its
                    //               OWN output paths.
                    //   • unmasked (real output paths)    — the value used as the
                    //               key when this derivation is an INPUT to another.
                    // Both are computed with input keys set to the inputs' UNMASKED
                    // modulo hashes. The final .drv instead lists real drvPaths.
                    //
                    // Group references by input derivation, collecting the SET of
                    // referenced output names per input (sorted) — this is what Nix
                    // records in the .drv and is required for byte-exact multi-output
                    // drvPaths. `dep.dev` and `dep.out` of the same drv collapse to
                    // one entry with outputs ["dev","out"].
                    const groupInputDrvs = (keyOf) => {
                        const byKey = new Map() // key -> Set(outputNames)
                        for (const { drv, outputName } of inputDrvObjects) {
                            const key = keyOf(drv)
                            if (!byKey.has(key)) { byKey.set(key, new Set()) }
                            byKey.get(key).add(outputName)
                        }
                        return [...byKey.entries()]
                            .map(([key, outs]) => [key, [...outs].sort()])
                            .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
                    }
                    const moduloInputDrvs = groupInputDrvs((d) => d.moduloHashUnmasked)
                    const finalInputDrvs = groupInputDrvs((d) => d.drvPath)

                    // Outputs sorted alphabetically (Nix requirement).
                    const sortedOutputNames = [...outputNames].sort()

                    const outputPaths = {}
                    let moduloHashUnmasked
                    let finalStructure
                    let fixedOutputInfo = null

                    const isFixedOutput = attrs.outputHash != null
                    if (isFixedOutput) {
                        // ---- fixed-output derivation ---------------------------
                        // Content-addressed: the output path comes from the declared
                        // hash (not the build steps), and the .drv outputs tuple
                        // carries the hash algo + value. The build is verified
                        // against this hash. outputHash/Algo/Mode stay as env vars.
                        const rawHash = requireString(attrs.outputHash).toString()
                        const modeStr = attrs.outputHashMode
                            ? requireString(attrs.outputHashMode).toString()
                            : "flat"
                        const recursive = modeStr === "recursive" || modeStr === "nar"
                        const algoHint = attrs.outputHashAlgo
                            ? requireString(attrs.outputHashAlgo).toString()
                            : null
                        const { algo, hex } = normalizeHashToHex(rawHash, algoHint)
                        fixedOutputInfo = { algo, hex, recursive }

                        const outPath = makeFixedOutputPath(name, fixedOutputInfo, storeDir)
                        outputPaths["out"] = outPath
                        env["out"] = outPath
                        moduloHashUnmasked = fixedOutputModuloHash(fixedOutputInfo, outPath)

                        const hashAlgoField = (recursive ? "r:" : "") + algo
                        finalStructure = {
                            outputs: [["out", outPath, hashAlgoField, hex]],
                            inputDrvs: finalInputDrvs,
                            inputSrcs: inputSrcs,
                            system: system,
                            builder: builder,
                            args: builderArgs,
                            env: env,
                        }
                    } else {
                        // ---- input-addressed derivation ------------------------
                        // Masked modulo serialization → this derivation's output paths.
                        const maskedStructure = {
                            outputs: sortedOutputNames.map(o => [o, "", "", ""]),
                            inputDrvs: moduloInputDrvs,
                            inputSrcs: inputSrcs,
                            system: system,
                            builder: builder,
                            args: builderArgs,
                            env: { ...env }, // env output vars already blanked above
                        }
                        const maskedSerialized = serializeDerivation(maskedStructure)

                        for (const outputName of outputNames) {
                            // Non-default outputs use the path name `${name}-${output}`
                            // (Nix's outputPathName), which also feeds the hash.
                            const outName = outputName === "out" ? name : `${name}-${outputName}`
                            const outputPath = computeOutputPath(maskedSerialized, outputName, outName, storeDir)
                            outputPaths[outputName] = outputPath
                            env[outputName] = outputPath
                        }

                        // Unmasked modulo serialization (real output paths) → the modulo
                        // hash other derivations use when they depend on THIS one.
                        const unmaskedStructure = {
                            outputs: sortedOutputNames.map(o => [o, outputPaths[o], "", ""]),
                            inputDrvs: moduloInputDrvs,
                            inputSrcs: inputSrcs,
                            system: system,
                            builder: builder,
                            args: builderArgs,
                            env: env,
                        }
                        moduloHashUnmasked = sha256Hex(serializeDerivation(unmaskedStructure))

                        // Final .drv structure: real output paths + real input drvPaths.
                        finalStructure = {
                            outputs: sortedOutputNames.map(o => [o, outputPaths[o], "", ""]),
                            inputDrvs: finalInputDrvs,
                            inputSrcs: inputSrcs,
                            system: system,
                            builder: builder,
                            args: builderArgs,
                            env: env,
                        }
                    }

                    // drvPath via the text method, whose fingerprint references every
                    // input derivation's drvPath (deduped) and input sources.
                    const drvSerializedFinal = serializeDerivation(finalStructure)
                    const drvReferences = [
                        ...new Set(inputDrvObjects.map((d) => d.drv.drvPath)),
                        ...inputSrcs,
                    ]
                    const drvPath = computeDrvPath(drvSerializedFinal, name, storeDir, drvReferences)

                    // Debug aid: DENIX_DUMP_DRV=<dir> writes every serialized
                    // .drv so it can be diffed against real Nix's store copy.
                    const dumpDir = globalThis.Deno?.env.get("DENIX_DUMP_DRV")
                    if (dumpDir) {
                        Deno.mkdirSync(dumpDir, { recursive: true })
                        Deno.writeTextFileSync(`${dumpDir}/${drvPath.split("/").pop()}`, drvSerializedFinal)
                    }

                    return {
                        name: name,
                        system: system,
                        builder: builder,
                        args: builderArgs,
                        outputPaths: outputPaths,
                        drvPath: drvPath,
                        all: outputNames.map(o => outputPaths[o]),
                        // The references this derivation depends on ({drv, outputName})
                        // — for the builder to realize first. denix-internal.
                        inputDrvObjects: inputDrvObjects,
                        // Unmasked hashDerivationModulo (hex), the key dependents use.
                        moduloHashUnmasked: moduloHashUnmasked,
                        // Fixed-output {algo,hex,recursive} for the builder to verify.
                        fixedOutputInfo: fixedOutputInfo,
                        // Exact serialized env + input sources, for the builder.
                        env: env,
                        inputSrcs: inputSrcs,
                    }
                }

                // drvAttrs = the raw input attrs (descriptor copy → laziness kept).
                const drvAttrs = {}
                for (const k of Object.keys(attrs)) {
                    Object.defineProperty(drvAttrs, k, Object.getOwnPropertyDescriptor(attrs, k))
                }

                // Each output is its OWN derivation value, tagged with outputName
                // and that output's path. This is how Nix models multi-output
                // derivations: `pkg.dev` is a derivation whose outputName="dev".
                // Referencing it therefore records the "dev" output in inputDrvs.
                const outputObjs = {}
                for (const o of outputNames) {
                    // Real Nix: the result is `drvAttrs // outputs // { outPath,
                    // drvPath, type, outputName, … }` (see corepkgs
                    // derivation.nix), so every INPUT attr is readable on the
                    // result — e.g. stdenv's `shell` via `stdenv.shell`. Copy
                    // descriptors to keep laziness; anything that needs
                    // derivationStrict is a lazy getter on `strict()`.
                    const obj = {}
                    for (const k of Object.keys(attrs)) {
                        Object.defineProperty(obj, k, Object.getOwnPropertyDescriptor(attrs, k))
                    }
                    for (const [k, v] of Object.entries({ type: "derivation", outputs: outputNames, outputName: o, drvAttrs: drvAttrs })) {
                        Object.defineProperty(obj, k, { value: v, writable: true, enumerable: true, configurable: true })
                    }
                    defineLazy(obj, "name", () => requireString(attrs.name).toString())
                    defineLazy(obj, "system", () => requireString(attrs.system).toString())
                    defineLazy(obj, "outPath", () => strict().outputPaths[o])
                    defineLazy(obj, "drvPath", () => strict().drvPath)
                    defineLazy(obj, "builder", () => strict().builder)
                    defineLazy(obj, "args", () => strict().args)
                    defineLazy(obj, "all", () => strict().all)
                    defineLazy(obj, "inputDrvObjects", () => strict().inputDrvObjects)
                    defineLazy(obj, "moduloHashUnmasked", () => strict().moduloHashUnmasked)
                    defineLazy(obj, "fixedOutputInfo", () => strict().fixedOutputInfo)
                    defineLazy(obj, "drvEnv", () => strict().env)
                    defineLazy(obj, "inputSrcs", () => strict().inputSrcs)
                    obj.toString = () => obj.outPath
                    obj[Symbol.toPrimitive] = () => obj.outPath
                    outputObjs[o] = obj
                }
                // Cross-link: every output value exposes all sibling outputs
                // (so `pkg.dev.out`, `pkg.out.dev` resolve, matching Nix).
                for (const o of outputNames) {
                    for (const o2 of outputNames) {
                        Object.defineProperty(outputObjs[o], o2, { value: outputObjs[o2], writable: true, enumerable: true, configurable: true })
                    }
                }

                // The base derivation value IS its default (first) output.
                return outputObjs[outputNames[0]]
            },
            "derivationStrict": (attrs)=>{
                const result = builtins.derivation(attrs)
                // Unlike `derivation`, this primop hashes immediately.
                void result.drvPath
                return result
            },
            "parseDrvName": (s)=>{
                const str = requireString(s).toString()
                // Version starts at the FIRST dash not followed by a letter
                const match = str.match(/^(.*?)-([^a-zA-Z].*)$/)
                if (match) {
                    return { name: match[1], version: match[2] }
                } else {
                    return { name: str, version: "" }
                }
            },
            "compareVersions": (s1)=>(s2)=>{
                const v1 = builtins.splitVersion(requireString(s1))
                const v2 = builtins.splitVersion(requireString(s2))
                // Real Nix component rules: "pre" < everything, and any
                // non-numeric component < any numeric one (so "2.3a" < "2.3.1"
                // and "boot" < "21")
                const isNum = (s)=>/^[0-9]+$/.test(s)
                const maxLen = Math.max(v1.length, v2.length)
                for (let i = 0; i < maxLen; i++) {
                    const p1 = (v1[i] || "").toString()
                    const p2 = (v2[i] || "").toString()
                    if (p1 === p2) { continue }
                    if (p1 === "pre") { return -1n }
                    if (p2 === "pre") { return 1n }
                    const n1 = isNum(p1)
                    const n2 = isNum(p2)
                    if (n1 && n2) {
                        return BigInt(p1) < BigInt(p2) ? -1n : 1n
                    }
                    if (n2) { return -1n }
                    if (n1) { return 1n }
                    return p1 < p2 ? -1n : 1n
                }
                return 0n
            },
            "getFlake": (flakeRef, presetInputs = null) => {
                // getFlake fetches a flake and returns its output attributes and metadata
                // Usage: builtins.getFlake "github:owner/repo" or builtins.getFlake "/path/to/flake"
                // presetInputs (internal): inputs already resolved by a parent
                // flake's lock graph (cross-flake `follows` overrides) — such
                // calls bypass the eval cache since the same ref can resolve
                // differently under different parents.

                const refString = requireString(flakeRef).toString();
                const hasPreset = presetInputs != null && Object.keys(presetInputs).length > 0;

                // Dedup fully-resolved flakes, and break input cycles by
                // returning the in-progress flake object.
                if (!hasPreset && flakeEvalCache.has(refString)) { return flakeEvalCache.get(refString); }
                if (flakeInProgress.has(refString)) { return flakeInProgress.get(refString); }

                // Parse the flake reference
                const parsedRef = builtins.parseFlakeRef(refString);

                // Fetch the flake source based on reference type
                let sourcePath;
                let sourceInfo = {};

                switch (parsedRef.type) {
                    case "path":
                        // Local path flake
                        sourcePath = parsedRef.path;
                        // Resolve relative paths
                        if (!sourcePath.startsWith("/")) {
                            sourcePath = Deno.realPathSync(sourcePath);
                        }
                        sourceInfo = {
                            type: "path",
                            path: sourcePath,
                            narHash: narHashToSRI(hashDirectorySync(sourcePath)),
                        };
                        break;

                    case "github":
                        // Fetch from GitHub using fetchTree
                        const githubResult = builtins.fetchTree({
                            type: "github",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = githubResult.outPath || githubResult.toString();
                        sourceInfo = {
                            type: "github",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: githubResult.rev,
                            shortRev: githubResult.shortRev,
                            narHash: githubResult.narHash,
                            lastModified: githubResult.lastModified,
                        };
                        break;

                    case "gitlab":
                        // Fetch from GitLab using fetchTree
                        const gitlabResult = builtins.fetchTree({
                            type: "gitlab",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = gitlabResult.outPath || gitlabResult.toString();
                        sourceInfo = {
                            type: "gitlab",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: gitlabResult.rev,
                            shortRev: gitlabResult.shortRev,
                            narHash: gitlabResult.narHash,
                            lastModified: gitlabResult.lastModified,
                        };
                        break;

                    case "git":
                        // Fetch from Git repository
                        const gitResult = builtins.fetchGit({
                            url: parsedRef.url,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = gitResult.toString();
                        sourceInfo = {
                            type: "git",
                            url: parsedRef.url,
                            rev: gitResult.rev,
                            shortRev: gitResult.shortRev,
                            narHash: gitResult.narHash,
                            revCount: gitResult.revCount,
                            lastModified: gitResult.lastModified,
                        };
                        break;

                    case "mercurial":
                    case "hg":
                        // Fetch from Mercurial repository
                        const hgResult = builtins.fetchMercurial({
                            url: parsedRef.url,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = hgResult.toString();
                        sourceInfo = {
                            type: "mercurial",
                            url: parsedRef.url,
                            rev: hgResult.rev,
                            shortRev: hgResult.shortRev,
                            narHash: hgResult.narHash,
                            revCount: hgResult.revCount,
                            lastModified: hgResult.lastModified,
                        };
                        break;

                    case "file":
                        // A URL to a bare .nix file (e.g. a raw flake.nix on
                        // GitHub): stage the file in a directory as flake.nix
                        // so it evaluates like a flake.
                        if (!parsedRef.url.split(/[?#]/)[0].endsWith(".nix")) {
                            throw new Error(
                                `builtins.getFlake: '${parsedRef.url}' is a plain file, not a flake (only usable as an input with flake = false)`
                            );
                        }
                        const filePath = force(builtins.fetchurl(parsedRef.url)).toString();
                        const fileFlakeDir = `${filePath}-flake`;
                        Deno.mkdirSync(fileFlakeDir, { recursive: true });
                        Deno.copyFileSync(filePath, `${fileFlakeDir}/flake.nix`);
                        sourcePath = fileFlakeDir;
                        sourceInfo = {
                            type: "file",
                            url: parsedRef.url,
                            narHash: narHashToSRI(hashDirectorySync(fileFlakeDir)),
                        };
                        break;

                    case "tarball":
                        // Fetch tarball
                        const tarballResult = builtins.fetchTarball({
                            url: parsedRef.url,
                        });
                        sourcePath = tarballResult.toString();
                        sourceInfo = {
                            type: "tarball",
                            url: parsedRef.url,
                            narHash: tarballResult.narHash,
                        };
                        break;

                    case "indirect":
                        // Indirect references (registry lookup)
                        const resolvedFlakeRef = resolveIndirectReference(parsedRef.id);

                        if (!resolvedFlakeRef) {
                            throw new Error(
                                `builtins.getFlake: indirect flake reference "${parsedRef.id}" not found in registry.\n` +
                                `Available registries:\n` +
                                `  - User: ~/.config/nix/registry.json\n` +
                                `  - System: /etc/nix/registry.json\n` +
                                `  - Global: https://channels.nixos.org/flake-registry.json\n` +
                                `\n` +
                                `You can also use explicit references like "github:owner/repo" or "path:/path/to/flake" instead.`
                            );
                        }

                        // Recursively call getFlake with the resolved reference
                        return builtins.getFlake(resolvedFlakeRef);

                    default:
                        throw new Error(`builtins.getFlake: unsupported flake reference type: ${parsedRef.type}`);
                }

                // Read flake.nix from the source
                const flakePath = `${sourcePath}/flake.nix`;
                let flakeNixExists = false;
                try {
                    Deno.statSync(flakePath);
                    flakeNixExists = true;
                } catch {
                    throw new Error(
                        `builtins.getFlake: no flake.nix found at ${sourcePath}\n` +
                        `Expected file: ${flakePath}`
                    );
                }

                // Load and evaluate the flake.nix file
                // flake.nix should export an attribute set with:
                // - description (optional string)
                // - inputs (attribute set of flake references)
                // - outputs (function taking inputs as arguments)

                const flakeExpr = loadAndEvaluateSync(flakePath, requireRuntime());

                // Validate flake structure
                if (!builtins.isAttrs(flakeExpr)) {
                    throw new Error(`builtins.getFlake: flake.nix must evaluate to an attribute set`);
                }

                // Extract flake components
                const description = flakeExpr.description ? requireString(flakeExpr.description).toString() : "";
                const inputsSpec = flakeExpr.inputs || {};
                const outputsFn = flakeExpr.outputs;

                if (!builtins.isFunction(outputsFn)) {
                    throw new Error(`builtins.getFlake: flake.nix must have an 'outputs' attribute that is a function`);
                }

                // Read flake.lock if it exists (for locked input versions)
                const lockPath = `${sourcePath}/flake.lock`;
                let lockData = null;
                try {
                    const lockContent = Deno.readTextFileSync(lockPath);
                    lockData = JSON.parse(lockContent);
                } catch {
                    // No lock file or invalid JSON - that's okay, we'll use unlocked inputs
                }

                const inputs = {
                    self: null, // Will be set after we create the flake object
                };

                // Build the initial flake result
                // Real Nix exposes the source store path as outPath on both the
                // flake itself and its sourceInfo (this is what makes
                // `import nixpkgs {}` work — import coerces via outPath).
                sourceInfo.outPath = sourcePath;
                const flakeResult = {
                    _type: "flake",
                    description: description,
                    sourceInfo: sourceInfo,
                    outPath: sourcePath,
                    inputs: inputs,
                    outputs: null, // Will be set after calling outputs function
                };

                // Set self reference and register as in-progress so a cyclic
                // input (e.g. A→B→A) resolves to this object instead of looping.
                inputs.self = flakeResult;
                flakeInProgress.set(refString, flakeResult);

                // Resolve each input by RECURSIVELY evaluating it as a flake
                // (reusing the real fetchers: github/git/tarball/registry/path).
                // Honors flake.lock (reproducible, pinned revs), `inputs.X.follows`
                // (dedupe to a sibling), and `flake = false` (source only).
                try {
                    // Determine an input's reference string from its spec.
                    const inputRefOf = (inputSpec) => {
                        if (typeof inputSpec === "string" || inputSpec instanceof InterpolatedString) {
                            return requireString(inputSpec).toString();
                        }
                        if (builtins.isAttrs(inputSpec) && inputSpec.url != null) {
                            return requireString(inputSpec.url).toString();
                        }
                        return null;
                    };

                    // Build a flake ref string from a flake.lock node's `locked`.
                    const refFromLocked = (locked) => {
                        if (!locked) { return null; }
                        const rev = locked.rev || locked.ref || "";
                        switch (locked.type) {
                            case "github": return `github:${locked.owner}/${locked.repo}${rev ? "/" + rev : ""}`;
                            case "gitlab": return `gitlab:${locked.owner}/${locked.repo}${rev ? "/" + rev : ""}`;
                            case "git": return `git+${locked.url}${locked.rev ? `?rev=${locked.rev}` : ""}`;
                            case "tarball": return locked.url || null;
                            case "file": return locked.url ? `file+${locked.url}` : null;
                            case "path": return `path:${locked.path}`;
                            case "indirect": return locked.id || null;
                            default: return locked.url || null;
                        }
                    };
                    // Resolve a lock-graph node reference: node.inputs values
                    // are either a node key (string) or a `follows` path
                    // (array) walked from the lock root.
                    const resolveNodeKey = (keyOrPath) => {
                        if (typeof keyOrPath === "string") { return keyOrPath; }
                        if (!Array.isArray(keyOrPath)) { return null; }
                        let key = lockData.root;
                        for (const seg of keyOrPath) {
                            const next = lockData.nodes[key]?.inputs?.[seg];
                            if (next == null) { return null; }
                            key = resolveNodeKey(next);
                            if (key == null) { return null; }
                        }
                        return key;
                    };

                    // Fetch + evaluate a lock node once, resolving ITS inputs
                    // from this lock graph too. Real Nix: the root flake.lock
                    // governs the whole input tree — e.g. with
                    // `fenix.inputs.nixpkgs.follows = "nixpkgs"`, fenix must
                    // get the ROOT's nixpkgs, not the one in its own lock.
                    const lockNodeCache = new Map();
                    const lockNodeInProgress = new Set();
                    const resolveLockNode = (nodeKey) => {
                        if (lockNodeCache.has(nodeKey)) { return lockNodeCache.get(nodeKey); }
                        const node = lockData.nodes[nodeKey];
                        let ref = node && refFromLocked(node.locked);
                        if (ref == null) { return null; }
                        ref = resolveRelativePath(ref);
                        if (node.flake === false) {
                            const source = builtins.fetchTree(builtins.parseFlakeRef(ref));
                            lockNodeCache.set(nodeKey, source);
                            return source;
                        }
                        const preset = {};
                        lockNodeInProgress.add(nodeKey);
                        try {
                            for (const [childName, childKeyOrPath] of Object.entries(node.inputs || {})) {
                                const childKey = resolveNodeKey(childKeyOrPath);
                                // on a graph cycle, let the child flake resolve itself
                                if (childKey == null || lockNodeInProgress.has(childKey)) { continue; }
                                const childValue = resolveLockNode(childKey);
                                if (childValue != null) { preset[childName] = childValue; }
                            }
                        } finally {
                            lockNodeInProgress.delete(nodeKey);
                        }
                        const result = builtins.getFlake(ref, preset);
                        lockNodeCache.set(nodeKey, result);
                        return result;
                    };

                    // Resolve a (possibly relative) path ref against this flake.
                    const resolveRelativePath = (ref) => {
                        const pr = builtins.parseFlakeRef(ref);
                        if (pr.type === "path" && !pr.path.startsWith("/")) {
                            const joined = (sourcePath + "/" + pr.path).split("/");
                            const norm = [];
                            for (const seg of joined) {
                                if (seg === "" || seg === ".") { continue; }
                                if (seg === "..") { norm.pop(); } else { norm.push(seg); }
                            }
                            return "path:/" + norm.join("/");
                        }
                        return ref;
                    };

                    // Pass 1: resolve all non-`follows` inputs.
                    const followsInputs = [];
                    for (const [inputName, inputSpec] of Object.entries(inputsSpec)) {
                        // A parent flake's lock graph already pinned this input
                        // (cross-flake `follows` override).
                        if (presetInputs && inputName in presetInputs) {
                            inputs[inputName] = presetInputs[inputName];
                            continue;
                        }

                        // Lock-graph resolution: flake.lock pins this input AND
                        // its transitive inputs (including follows edges).
                        const rootKeyOrPath = lockData?.nodes?.[lockData.root]?.inputs?.[inputName];
                        if (rootKeyOrPath != null) {
                            const nodeKey = resolveNodeKey(rootKeyOrPath);
                            if (nodeKey != null) {
                                let resolved;
                                try {
                                    resolved = resolveLockNode(nodeKey);
                                } catch (error) {
                                    throw new Error(
                                        `builtins.getFlake: failed to resolve locked input '${inputName}': ${error.message}`
                                    );
                                }
                                if (resolved != null) { inputs[inputName] = resolved; continue; }
                            }
                        }

                        // `inputs.X.follows = "Y"`: defer to pass 2 (point at sibling).
                        if (builtins.isAttrs(inputSpec) && inputSpec.follows != null) {
                            followsInputs.push([inputName, requireString(inputSpec.follows).toString()]);
                            continue;
                        }

                        let inputRef = inputRefOf(inputSpec);
                        if (inputRef == null) { continue; }
                        inputRef = resolveRelativePath(inputRef);

                        const isFlake = !(builtins.isAttrs(inputSpec) && inputSpec.flake === false);
                        try {
                            inputs[inputName] = isFlake
                                ? builtins.getFlake(inputRef)
                                : builtins.fetchTree(builtins.parseFlakeRef(inputRef));
                        } catch (error) {
                            throw new Error(
                                `builtins.getFlake: failed to resolve input '${inputName}' from ${inputRef}: ${error.message}`
                            );
                        }
                    }

                    // Pass 2: `follows` inputs point at the already-resolved sibling.
                    for (const [inputName, followsTarget] of followsInputs) {
                        // follows may be a path ("a/b"); top-level uses the first segment.
                        const sibling = followsTarget.split("/")[0];
                        if (sibling in inputs) {
                            inputs[inputName] = inputs[sibling];
                        }
                    }
                } finally {
                    flakeInProgress.delete(refString);
                }

                // Call the outputs function with inputs
                // The outputs function takes all inputs as arguments
                try {
                    flakeResult.outputs = outputsFn(inputs);
                } catch (error) {
                    throw new Error(
                        `builtins.getFlake: error evaluating flake outputs: ${error.message}`,
                        { cause: error }
                    );
                }

                // Nix exposes a flake's outputs at the TOP level too (so a
                // consumer writes `nixpkgs.lib`, not just `nixpkgs.outputs.lib`).
                // Copy descriptors so lazy output values stay lazy.
                const outs = force(flakeResult.outputs);
                if (outs && typeof outs === "object") {
                    for (const k of Object.keys(outs)) {
                        if (k in flakeResult) { continue } // keep _type/inputs/outputs/etc.
                        Object.defineProperty(flakeResult, k, Object.getOwnPropertyDescriptor(outs, k));
                    }
                }

                if (!hasPreset) { flakeEvalCache.set(refString, flakeResult); }
                return flakeResult;
            },
            "parseFlakeRef": (flakeRef)=>{
                // Parse flake reference string into structured form
                // Examples:
                //   "nixpkgs" -> { type: "indirect", id: "nixpkgs" }
                //   "github:NixOS/nixpkgs" -> { type: "github", owner: "NixOS", repo: "nixpkgs" }
                //   "path:/path/to/flake" -> { type: "path", path: "/path/to/flake" }
                //   "git+https://..." -> { type: "git", url: "https://..." }

                const ref = requireString(flakeRef).toString()

                // Git URL with explicit git+ prefix
                if (ref.startsWith("git+")) {
                    const url = ref.slice(4)
                    return { type: "git", url }
                }

                // Plain file with explicit file+ prefix
                if (ref.startsWith("file+")) {
                    return { type: "file", url: ref.slice(5) }
                }

                // GitHub shorthand: github:owner/repo[/ref-or-rev]
                if (ref.startsWith("github:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "github", owner: parts[0], repo: parts[1] }
                    if (parts[2]) {
                        // a 40-hex third segment is a commit, not a branch/tag
                        if (/^[0-9a-f]{40}$/.test(parts[2])) { result.rev = parts[2] }
                        else { result.ref = parts[2] }
                    }
                    return result
                }

                // GitLab shorthand: gitlab:owner/repo[/ref-or-rev]
                if (ref.startsWith("gitlab:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "gitlab", owner: parts[0], repo: parts[1] }
                    if (parts[2]) {
                        if (/^[0-9a-f]{40}$/.test(parts[2])) { result.rev = parts[2] }
                        else { result.ref = parts[2] }
                    }
                    return result
                }

                // Path reference: path:/absolute/path or /absolute/path
                if (ref.startsWith("path:")) {
                    return { type: "path", path: ref.slice(5) }
                }
                if (ref.startsWith("/")) {
                    return { type: "path", path: ref }
                }
                if (ref.startsWith("./") || ref.startsWith("../")) {
                    return { type: "path", path: ref }
                }

                // Plain URL: archive extensions are tarballs, anything else is
                // a single file (real Nix rule)
                if (ref.startsWith("http://") || ref.startsWith("https://")) {
                    const urlPath = ref.split(/[?#]/)[0]
                    if (/\.(tar\.gz|tar\.bz2|tar\.xz|tar\.zst|tar\.lz|tgz|tar|zip)$/.test(urlPath)) {
                        return { type: "tarball", url: ref }
                    }
                    return { type: "file", url: ref }
                }

                // Indirect reference (registry lookup)
                return { type: "indirect", id: ref }
            },
            "placeholder": (outputName)=>{
                const name = requireString(outputName).toString()
                // Returns a placeholder string for use in derivation env vars
                // Nix algorithm: hash "nix-output:{name}" then encode full 32 bytes
                const clearText = `nix-output:${name}`
                const digest = sha256Hex(clearText)

                // Convert hex to bytes (32 bytes)
                const digestBytes = new Uint8Array(digest.match(/.{2}/g).map(b => parseInt(b, 16)))

                // Encode in Nix base32 and prepend with "/"
                return "/" + encodeBase32(digestBytes)
            },
            "outputOf": (derivationReference)=>(outputName)=>{
                // Returns output path of a derivation
                // derivationReference is a string (store path or placeholder)
                // outputName is the output to reference (e.g., "out")
                const drvRef = requireString(derivationReference).toString()
                const output = requireString(outputName).toString()

                // In full Nix with dynamic-derivations, this would:
                // - Parse the derivation reference
                // - Look up the actual derivation
                // - Return the specified output path or placeholder
                // For now, we return a placeholder since we don't have full store support
                const hash = sha256Hex(drvRef + ":" + output).slice(0, 32)
                return `/${hash}`
            },
        
        // context (these are going to be a pain)
            "addErrorContext": (context)=>(value)=>{
                // In full Nix, this adds context to error messages
                // For now, we just return the value (context is lost)
                return value
            },
            "appendContext": (s)=>(context)=>{
                requireString(s)
                requireAttrSet(context)
                // In full Nix, this attaches context metadata to strings
                // For now, just return the string (contexts not tracked)
                return s.toString()
            },
            "getContext": (s)=>{
                // Recover the string's context. Operate on the RAW value (NOT
                // via requireString, which unwraps a NixString and drops its
                // context). Returns the Nix attrset shape:
                //   { "<drvPath>" = { outputs = ["dev"]; }; "<src>" = { path = true; }; }
                const v = force(s)
                if (!builtins.isString(v)) { requireString(v) } // type error if not a string
                return contextToAttrset(computeStringContext(v))
            },
            "hasContext": (s)=>{
                const v = force(s)
                if (!builtins.isString(v)) { requireString(v) }
                return computeStringContext(v).size > 0
            },
            "unsafeDiscardStringContext": (s)=>{
                // Return the plain string value, dropping context.
                return requireString(s).toString()
            },
        
        // complicated to explain functionality
            "filterSource": (filter) => async (path) => {
                // filterSource is just a wrapper around builtins.path with a filter
                // Signature: filterSource :: (path -> type -> bool) -> path -> storePath
                return await builtins.path({
                    path: path,
                    filter: filter,
                    recursive: true
                });
            },
            "flakeRefToString": (attrs)=>{
                // Convert structured flake reference to string
                requireAttrSet(attrs)
                const type = requireString(attrs.type || "indirect").toString()

                switch (type) {
                    case "github":
                        const owner = requireString(attrs.owner).toString()
                        const repo = requireString(attrs.repo).toString()
                        let result = `github:${owner}/${repo}`
                        if (attrs.ref) {
                            result += `/${requireString(attrs.ref).toString()}`
                        }
                        return result

                    case "gitlab":
                        const glOwner = requireString(attrs.owner).toString()
                        const glRepo = requireString(attrs.repo).toString()
                        let glResult = `gitlab:${glOwner}/${glRepo}`
                        if (attrs.ref) {
                            glResult += `/${requireString(attrs.ref).toString()}`
                        }
                        return glResult

                    case "git":
                        const url = requireString(attrs.url).toString()
                        return `git+${url}`

                    case "path":
                        const path = requireString(attrs.path).toString()
                        return `path:${path}`

                    case "tarball":
                        return requireString(attrs.url).toString()

                    case "indirect":
                        return requireString(attrs.id).toString()

                    default:
                        throw new NixError(`error: unknown flake reference type: ${type}`)
                }
            },
            "genericClosure": (attrset)=>{
                requireAttrSet(attrset)

                const startSet = requireList(attrset.startSet)
                const operatorFn = attrset.operator
                if (!builtins.isFunction(operatorFn)) {
                    throw new NixError(`error: 'operator' attribute must be a function`)
                }

                const result = []
                const seen = new Set() // Track by normalized key to avoid duplicates
                const queue = [...startSet]

                // Nix compares keys with CompareValues: numbers (int/float) are
                // mutually comparable; strings and paths each only compare with
                // their own type; mismatched types throw. We mirror that: a key's
                // "class" is number | string | path, and two different classes are
                // incomparable.
                const keyClass = (k) => {
                    if (typeof k === "bigint" || typeof k === "number") return "number"
                    if (typeof k === "string" || k instanceof InterpolatedString) return "string"
                    if (k instanceof Path) return "path"
                    return builtins.typeOf(k)
                }
                const normalizeKey = (k) => {
                    const cls = keyClass(k)
                    if (cls === "number") return `number:${k}`
                    return `${cls}:${k.toString()}`
                }
                let seenClass = null

                while (queue.length > 0) {
                    const item = queue.shift()
                    requireAttrSet(item)

                    if (!item.hasOwnProperty('key')) {
                        throw new NixError(`error: attribute 'key' required in genericClosure item`)
                    }

                    const cls = keyClass(item.key)
                    // Nix's CompareValues only supports numbers, strings, and
                    // paths as keys — anything else (sets, lists, …) errors.
                    if (cls !== "number" && cls !== "string" && cls !== "path") {
                        throw new NixError(`error: cannot compare a ${cls} with a ${cls}`)
                    }
                    if (seenClass !== null && seenClass !== cls) {
                        throw new NixError(`error: cannot compare a ${seenClass} with a ${cls}`)
                    }
                    seenClass = cls

                    const key = normalizeKey(item.key)

                    if (!seen.has(key)) {
                        seen.add(key)
                        result.push(item)

                        const newItems = operatorFn(item)
                        requireList(newItems)
                        queue.push(...newItems)
                    }
                }

                return result
            },
            "unsafeDiscardOutputDependency": (s)=>{
                requireString(s)
                // In full Nix, removes output dependency from string context
                // For now, just return the string (no context tracking)
                return s.toString()
            },
            "unsafeGetAttrPos": (attr)=>(attrset)=>{
                requireString(attr)
                requireAttrSet(attrset)
                // In full Nix, returns source position of attribute
                // Would require AST tracking during evaluation
                // Return null (position unknown)
                return null
            },
    }
    builtins.builtins = builtins
    // tryEval must receive its argument unforced so it can catch evaluation
    // errors. (Adding to the WeakSet doesn't mutate the frozen builtins.)
    lazyArgFns.add(builtins.tryEval)
    Object.freeze(builtins)

    export const operators = {
        ifThenElse: (condition, thenFn, elseFn)=>{
            // Nix requires strict boolean values in if conditions
            if (typeof condition !== "boolean") {
                throw new NixError(`error: expected a Boolean but found ${builtins.typeOf(condition)}: ${nixRepr(condition)}`)
            }
            // Branches are usually thunks, but the translator passes eager-safe
            // literals (which are never JS functions) directly.
            const branch = condition ? thenFn : elseFn
            return typeof branch === "function" && !isFunctorSet(branch) ? branch() : branch
        },
        negative: (value)=>typeof value == "bigint"?-value:-toFloat(value),
        listConcat: (value, other)=>{
            requireList(value)
            requireList(other)
            return value.concat(other)
        },
        add: (value, other)=>{
            // Nix's `+` coerces attrsets that have outPath (derivations) or
            // __toString to strings, e.g. `"PATH=" + coreutils`.
            const coerceSet = (v)=>{
                if (v && (typeof v === "object" || isFunctorSet(v)) && !(v instanceof Interpolater) && !(v instanceof Array)) {
                    if (v.type === "derivation") {
                        return flatString(force(v.outPath).toString(), [v], null)
                    }
                    if (v.outPath !== undefined) {
                        return force(v.outPath)
                    }
                    if (typeof v.__toString === "function") {
                        return requireString(apply(v.__toString, v))
                    }
                }
                return v
            }
            value = coerceSet(value)
            other = coerceSet(other)
            const vType = builtins.typeOf(value)
            const oType = builtins.typeOf(other)

            if ((vType === "int" || vType === "float") && (oType === "int" || oType === "float")) {
                if (typeof value == "bigint" && typeof other == "bigint") {
                    return value + other
                } else {
                    return toFloat(value) + toFloat(other)
                }
            } else if (vType === "string" && oType === "string") {
                return flatString(
                    value.toString() + other.toString(),
                    [...depsOf(value), ...depsOf(other)],
                    mergedContext(value, other),
                )
            } else if (vType === "path" && oType === "path") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "path" && oType === "string") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "string" && oType === "path") {
                // A path appended to a string is copied to the store (real Nix)
                const storePath = (other.context instanceof Map) ? other.toString() : copyPathToStore(other.toString())
                const context = mergedContext(value, null) || new Map()
                context.set(storePath, { outputs: new Set(), path: true, allOutputs: false })
                return flatString(value.toString() + storePath, depsOf(value), context)
            } else {
                throw new NixError(`error: cannot add ${vType} to ${oType}`)
            }
        },
        subtract: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value - other
            } else {
                return toFloat(value) - toFloat(other)
            }
        },
        divide: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value/other
            } else {
                return toFloat(value)/toFloat(other)
            }
        },
        multiply: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value*other
            } else {
                return toFloat(value)*toFloat(other)
            }
        },
        negate: (value)=>!value,
        merge: (value, other)=>{
            value = requireAttrSet(value)
            other = requireAttrSet(other)
            // Merge WITHOUT forcing field values: copy property descriptors so
            // lazy getters survive. Spreading ({...value}) would evaluate every
            // field, which breaks `self = rattrs self // {…}` (it would force the
            // not-yet-defined fields mid-fixed-point). `other` wins on conflicts.
            // A merge result containing __functor is itself callable.
            // `in` checks key existence without triggering lazy getters.
            const result = ("__functor" in value || "__functor" in other) ? makeFunctorTarget() : {}
            Object.defineProperties(result, Object.getOwnPropertyDescriptors(value))
            Object.defineProperties(result, Object.getOwnPropertyDescriptors(other))
            return result
        },
        equal: (value, other)=>{
            // Functions are never equal when compared directly in Nix
            // (functor SETS compare as attrsets, though)
            if ((typeof value === "function" && !isFunctorSet(value)) || (typeof other === "function" && !isFunctorSet(other))) return false
            if (value === other) return true
            // Nix strings come in several wrappers (InterpolatedString,
            // context-carrying NixString) — `==` compares their text.
            // Paths stay distinct: `/foo == "/foo"` is false in Nix.
            const isStr = (v)=>typeof v === "string" || v instanceof InterpolatedString || v instanceof NixString
            if (isStr(value) && isStr(other)) {
                return value.toString() === other.toString()
            }
            // Nix special-cases derivations: two attrsets with type == "derivation"
            // compare by outPath alone (lambdas inside would otherwise make them
            // unequal).
            if (value?.type === "derivation" && other?.type === "derivation") {
                return force(value.outPath).toString() === force(other.outPath).toString()
            }
            if (typeof value !== typeof other && !(builtins.isAttrs(value) && builtins.isAttrs(other))) return false
            if (value instanceof Array && other instanceof Array) {
                if (value.length !== other.length) return false
                for (let i = 0; i < value.length; i++) {
                    // Value identity optimization: same reference means equal (even for functions inside compounds)
                    if (value[i] === other[i]) continue
                    if (!operators.equal(value[i], other[i])) return false
                }
                return true
            }
            if (builtins.isAttrs(value) && builtins.isAttrs(other)) {
                const keys1 = Object.keys(value).sort()
                const keys2 = Object.keys(other).sort()
                if (keys1.length !== keys2.length) return false
                for (let i = 0; i < keys1.length; i++) {
                    if (keys1[i] !== keys2[i]) return false
                    // Value identity optimization: same reference means equal (even for functions inside compounds)
                    if (value[keys1[i]] === other[keys2[i]]) continue
                    if (!operators.equal(value[keys1[i]], other[keys2[i]])) return false
                }
                return true
            }
            return false
        },
        notEqual: (value, other)=>!operators.equal(value, other),
        greaterThan: (value, other)=>value>other,
        greaterThanOrEqual: (value, other)=>value>=other,
        lessThan: (value, other)=>value<other,
        lessThanOrEqual: (value, other)=>value<=other,
        and: (value, other)=>value&&other,
        or: (value, other)=>value||other,
        implication: (value, other)=>!value||other,
        hasAttr: (attrset, attr)=>{
            // The `?` operator returns false for non-attrsets (unlike
            // builtins.hasAttr, which errors) — e.g. `1 ? a` is false in Nix,
            // and nixpkgs lib.isFunction does `f ? __functor` on arbitrary values.
            attrset = force(attrset)
            requireString(attr)
            if (!builtins.isAttrs(attrset)) { return false }
            return attrset.hasOwnProperty(attr.toString())
        },
        hasAttrPath: (attrset, ...attrPath)=>{
            // Check if a nested attribute path exists
            // e.g., hasAttrPath({a: {b: {c: 1}}}, "a", "b", "c") => true
            let current = attrset
            for (const attr of attrPath) {
                if ((typeof current !== "object" && !isFunctorSet(current)) || current === null || Array.isArray(current)) {
                    return false
                }
                const attrStr = requireString(attr).toString()
                if (!current.hasOwnProperty(attrStr)) {
                    return false
                }
                current = current[attrStr]
            }
            return true
        },
        selectOrDefault: (attrset, attrPath, defaultValue)=>{
            // Select a nested attribute with a default value if it doesn't exist
            // e.g., selectOrDefault({a: {b: 1}}, ["a", "b"], "default") => 1
            // e.g., selectOrDefault({a: {}}, ["a", "b"], "default") => "default"
            // The translator passes a non-eager-safe default as a lazy getter
            // so `x.y or (throw …)` only evaluates the default on a miss.
            // Older call sites pass a Thunk or plain value; force() handles both.
            const useDefault = () => force(typeof defaultValue === "function" && !isFunctorSet(defaultValue) ? defaultValue() : defaultValue)
            let current = force(attrset)
            for (const attr of attrPath) {
                if ((typeof current !== "object" && !isFunctorSet(current)) || current === null || Array.isArray(current)) {
                    return useDefault()
                }
                const attrStr = requireString(attr).toString()
                if (!current.hasOwnProperty(attrStr)) {
                    return useDefault()
                }
                current = force(current[attrStr])
            }
            return current
        },
    }
    
    const resolveImportTarget = (runtime, path)=>{
        let target = force(path)
        // Real Nix coerces importable sets to paths (__toString, then outPath),
        // e.g. `import nixpkgs {}` where nixpkgs is a flake input attrset.
        if (target !== null && !(target instanceof Path) && !Array.isArray(target) &&
            (Object.getPrototypeOf({}) == Object.getPrototypeOf(target) || isFunctorSet(target))) {
            const toStr = force(target.__toString)
            if (typeof toStr === "function") {
                target = apply(toStr, target)
            } else if (target.outPath !== undefined) {
                target = force(target.outPath)
            }
        }
        const pathStr = target instanceof Path ? target.toString() : requireString(target).toString()
        if (isUrl(pathStr)) {
            return pathStr
        }
        return runtime.currentFile
            ? resolveImportPath(runtime.currentFile, pathStr)
            : FileSystem.makeAbsolutePath(pathStr)
    }

    const importFile = (runtime, path)=>{
        const absPath = resolveImportTarget(runtime, path)
        const { importCache } = runtime
        if (importCache.has(absPath)) {
            return importCache.get(absPath)
        }
        // An already-translated tree can hand the runtime a map of nix path ->
        // nixFile module. Imports that couldn't be resolved statically (nixpkgs
        // lib's `callLibs = file: import file {...}` is the classic one) find
        // the translated module here instead of re-reading the .nix.
        const preTranslated = runtime.nixModules?.[absPath]
        if (preTranslated) {
            const result = preTranslated(runtime.scopedHandle ?? runtime)
            importCache.set(absPath, result)
            return result
        }
        // Track import stack for circular detection
        importCache.pushStack(absPath)
        const prevFile = runtime.currentFile
        try {
            runtime.currentFile = absPath
            const result = loadAndEvaluateSync(absPath, runtime)
            importCache.set(absPath, result)
            return result
        } finally {
            runtime.currentFile = prevFile
            importCache.popStack()
        }
    }

    // Like import, but evaluated with a custom scope overriding builtins.
    // Not cached (Nix behavior): each call evaluates fresh with the new scope.
    const scopedImportFile = (runtime, scope, path)=>{
        requireAttrSet(scope)
        const absPath = resolveImportTarget(runtime, path)
        runtime.importCache.pushStack(absPath)
        const prevFile = runtime.currentFile
        try {
            runtime.currentFile = absPath
            const scopedRuntime = {
                ...runtime,
                builtins: { ...runtime.builtins, ...scope },
            }
            return loadAndEvaluateSync(absPath, scopedRuntime)
        } finally {
            runtime.currentFile = prevFile
            runtime.importCache.popStack()
        }
    }

    // A translated Nix file is emitted as a module whose whole body is:
    //     export default nixFile("/path/to/it.nix", ({ scope }) => <expression>)
    // The result is a function that takes a nix runtime and evaluates the file
    // against it, so the caller — not the file — picks the store/scope it runs
    // in. Results are memoized per runtime, matching nix's import cache.
    export const nixFile = (source, body)=>{
        const filePath = typeof source === "string"
            ? source
            : source?.filename ?? (source?.url ? new URL(source.url).pathname : null)
        const resultPerRuntime = new WeakMap()
        const evaluate = (given)=>{
            const runtime = given?.rootScope ? given : (given?.runtime ?? currentScopedRuntime ?? createRuntime({ currentFile: filePath }).runtime)
            if (resultPerRuntime.has(runtime)) { return resultPerRuntime.get(runtime) }
            const previousFile = runtime.currentFile
            runtime.currentFile = filePath
            try {
                const value = body({
                    scope: runtime.rootScope,
                    builtins: runtime.builtins,
                    operators: runtime.operators,
                    nixArg: runtime.nixArg,
                    runtime,
                })
                resultPerRuntime.set(runtime, value)
                return value
            } finally {
                runtime.currentFile = previousFile
            }
        }
        evaluate.nixFilePath = filePath
        return evaluate
    }

    export const createRuntime = (options = {})=>{
        // Create import cache for this runtime instance
        const importCache = new ImportCache()

        // Create runtime object that will be passed to builtins
        const runtime = {
            builtins,
            operators,
            InterpolatedString,
            Path,
            importCache,
            withScope: createWithScope,
            currentFile: options.currentFile || null, // Track current file for relative imports
            // nix path -> nixFile module, for trees that were translated ahead
            // of time (see importFile)
            nixModules: options.nixModules || null,
        }

        const rootScope = {
            builtins,
            true: builtins.true,
            false: builtins.false,
            null: builtins.null,

            // https://nixos.org/manual/nix/stable/language/builtins.html
            // These builtins are available at the top-level scope in Nix
            // (without the builtins. prefix).
            derivation: builtins.derivation,
            import: builtins.import,
            abort: builtins.abort,
            throw: builtins.throw,
            baseNameOf: builtins.baseNameOf,
            dirOf: builtins.dirOf,
            fetchGit: builtins.fetchGit,
            fetchTarball: builtins.fetchTarball,
            fromTOML: builtins.fromTOML,
            isNull: builtins.isNull,
            map: builtins.map,
            placeholder: builtins.placeholder,
            removeAttrs: builtins.removeAttrs,
            scopedImport: builtins.scopedImport,
            toString: builtins.toString,
        }

        // Register as the shared runtime used by import/scopedImport/getFlake
        currentRuntime = runtime

        const runtimeWithScope = {
            scopeStack: [rootScope],
            rootScope: rootScope,
            runtime, // Expose runtime for use by import system
            importCache,
            operators,
            withScope: createWithScope,
            // Mirror currentFile onto the inner runtime (which is what
            // importFile checks) so that generated code which does
            // `runtime.currentFile = "..."` on the outer handle just works.
            get currentFile() { return runtime.currentFile },
            set currentFile(v) { runtime.currentFile = v },
        }
        currentScopedRuntime = runtimeWithScope
        // importFile only ever sees the inner runtime, but a pre-translated
        // module needs the scope-carrying half to evaluate against.
        runtime.scopedHandle = runtimeWithScope
        runtimeWithScope.createFunc = createCreateFunc(runtimeWithScope)
        runtimeWithScope.createScope = createCreateScope(runtimeWithScope)
        runtimeWithScope.defGetter = createDefGetter(runtimeWithScope)
        // Everything a translated file could ever need lives on the runtime, so
        // that the scope (the single user-facing handle) can forward all of it
        // through `name$` members.
        runtimeWithScope.builtins = builtins
        runtimeWithScope.InterpolatedString = InterpolatedString
        runtimeWithScope.Path = Path
        runtimeWithScope.nixArg = nixArg
        runtimeWithScope.apply = apply
        runtimeWithScope.set = setAttrPath
        runtimeWithScope.force = force
        runtimeWithScope.mkThunk = mkThunk

        //
        // scope.* helper API — what the translator emits. Every scope object
        // (rootScope and children created via Object.create) carries these as
        // non-enumerable methods; `$`-suffixed names can never collide with Nix
        // identifiers ($ is not legal in them).
        //
        // Convention used throughout: in a spec object, a FUNCTION value is a
        // lazy getter (called with the relevant scope); any other value is an
        // eager, already-safe literal. The translator guarantees eager values
        // are never JS functions (a Nix lambda is always emitted as a getter).
        //
        const buildAttrsInto = (scope, target, spec) => {
            for (const key of Object.keys(spec)) {
                const value = spec[key]
                if (typeof value === "function" && !isFunctorSet(value)) {
                    runtimeWithScope.defGetter(target, key, () => value(scope))
                } else {
                    Object.defineProperty(target, key, { value, writable: true, enumerable: true, configurable: true })
                }
            }
            for (const sym of Object.getOwnPropertySymbols(spec)) {
                const entry = spec[sym]
                if (entry instanceof DeepSetEntry) {
                    const value = entry.value
                    setAttrPath(target, entry.path, typeof value === "function" && !isFunctorSet(value) ? () => value(scope) : () => value)
                }
            }
            return target
        }
        // if$/then$/elseIf$/else$ chain. Conditions and branches follow the
        // raw-or-getter convention; nothing evaluates until else$() runs, so
        // elseIf$ conditions stay lazy exactly like nested Nix `else if`s.
        const evalIfCond = (c) => {
            if (typeof c === "function" && !c.__nixLambda && !isFunctorSet(c)) { c = c() }
            c = force(c)
            if (typeof c !== "boolean") {
                throw new NixError(`error: expected a Boolean but found ${builtins.typeOf(c)}: ${nixRepr(c)}`)
            }
            return c
        }
        const makeIfChain = (pairs) => ({
            elseIf$(condition) {
                return { then$: (v) => makeIfChain([...pairs, [condition, v]]) }
            },
            else$(elseValue) {
                for (const [c, v] of pairs) {
                    if (evalIfCond(c)) { return typeof v === "function" && !isFunctorSet(v) ? v() : v }
                }
                return typeof elseValue === "function" && !isFunctorSet(elseValue) ? elseValue() : elseValue
            },
        })
        const scopeHelpers = {
            // Child scope with no own bindings (mainly for hand-written code;
            // the translator flattens these away when they add nothing).
            newScope$(fn) {
                const scope = Object.create(this)
                runtimeWithScope.scopeStack.push(scope)
                try { return fn(scope) } finally { runtimeWithScope.scopeStack.pop() }
            },
            // Non-recursive attrset. Getters resolve against the CALLING scope.
            attrSet$(spec) {
                return buildAttrsInto(this, ("__functor" in spec) ? makeFunctorTarget() : {}, spec)
            },
            // Recursive attrset: bindings live on a child scope so they can see
            // one another; returns a clean result object proxying its own keys.
            recAttrSet$(spec) {
                const scope = Object.create(this)
                buildAttrsInto(scope, scope, spec)
                const result = ("__functor" in spec) ? makeFunctorTarget() : {}
                for (const key of Object.keys(scope)) {
                    Object.defineProperty(result, key, { enumerable: true, configurable: true, get() { return scope[key] } })
                }
                return result
            },
            // let ... in: scope.let$({bindings}).in$((scope)=>body)
            let$(spec) {
                const parent = this
                return {
                    in$: (fn) => {
                        const scope = Object.create(parent)
                        buildAttrsInto(scope, scope, spec)
                        runtimeWithScope.scopeStack.push(scope)
                        try { return fn(scope) } finally { runtimeWithScope.scopeStack.pop() }
                    },
                }
            },
            // Lambdas. Simple: func$("x", (scope)=>body). Formals:
            // func$({ a: nixArg.NoDefault, b: (scope)=>default, c: eagerDefault,
            //         args: nixArg.AllArgs, "...": nixArg.Ellipsis }, (scope)=>body)
            func$(argSpec, fn) {
                if (typeof argSpec === "string") {
                    return runtimeWithScope.createFunc(argSpec, null, {}, this, fn)
                }
                let allArgsName = null
                let ellipsis = false
                const defaulters = {}
                const args = {}
                for (const key of Object.keys(argSpec)) {
                    const value = argSpec[key]
                    if (value === nixArg.AllArgs) { allArgsName = key; continue }
                    if (value === nixArg.Ellipsis) { ellipsis = true; continue }
                    if (value === nixArg.NoDefault) { args[key] = false; continue }
                    args[key] = true
                    defaulters[key] = value
                }
                const metadata = ellipsis ? { args, ellipsis: true } : { args }
                return runtimeWithScope.createFunc(defaulters, allArgsName, metadata, this, fn)
            },
            // if cond then a else b:
            //   scope.if$(cond).then$(a).elseIf$(cond2).then$(b).else$(c)
            if$(condition) {
                return { then$: (thenValue) => makeIfChain([[condition, thenValue]]) }
            },
            // with attrs; body — attrs stays lazy (see createWithScope).
            with$(getAttrs, fn) {
                const scope = createWithScope(this, getAttrs)
                runtimeWithScope.scopeStack.push(scope)
                try { return fn(scope) } finally { runtimeWithScope.scopeStack.pop() }
            },
            // Nested-path assignment marker: spread into attrSet$/let$ specs.
            deepSet$(path, value) {
                return { [Symbol("deepSet$")]: new DeepSetEntry(path, value) }
            },
            // Lazy interpolated string: str$(()=>["a ", scope.x, " b"]).
            // Nothing in the parts array is evaluated until the string is
            // forced; string parts are literal chunks, everything else is
            // coerced like an interpolation (derivations, paths, context…).
            str$(partsFn, ...taggedValues) {
                // Also usable as a template tag: str$`${pkgs.zsh}/bin/zsh`.
                // A plain template literal would stringify the parts and drop
                // their nix string context; tagging sees the values first.
                if (Array.isArray(partsFn) && Array.isArray(partsFn.raw)) {
                    const literals = partsFn
                    partsFn = () => literals.flatMap((literal, index) => index < taggedValues.length ? [literal, taggedValues[index]] : [literal])
                }
                const s = new InterpolatedString([], [])
                let mat = null
                const materialize = () => {
                    if (!mat) {
                        const strings = []
                        const getters = []
                        let current = ""
                        for (const part of partsFn()) {
                            if (typeof part === "string") {
                                current += part
                            } else {
                                strings.push(current)
                                current = ""
                                getters.push(() => part)
                            }
                        }
                        strings.push(current)
                        mat = { strings, getters }
                    }
                    return mat
                }
                const lazyProp = (name) => Object.defineProperty(s, name, {
                    configurable: true,
                    get() { return materialize()[name] },
                    set(v) { Object.defineProperty(s, name, { value: v, writable: true, enumerable: true, configurable: true }) },
                })
                lazyProp("strings")
                lazyProp("getters")
                return s
            },
            // Shell-quoting template tag, for the very common case of building a
            // script out of store paths:
            //     shellStr$`HOME=${homePath} PATH=${pkgs.nix}/bin ${shellStr$.raw(script)}`
            // Joins exactly like str$ (so string context survives), but every
            // interpolated value is quoted the way lib.escapeShellArg does it.
            // shellStr$.raw(x) splices x in untouched, for pieces that are
            // already script rather than data.
            shellStr$(literals, ...values) {
                return scopeHelpers.str$(literals, ...values.map((each) => {
                    if (each && typeof each === "object" && SHELL_RAW in each) {
                        return each[SHELL_RAW]
                    }
                    const text = builtins.toString(force(each))
                    // only quote when the string holds something a shell would treat specially
                    if (builtins.match("[[:alnum:],._+:@%/-]+")(text) != null) {
                        return text
                    }
                    return scopeHelpers.str$(() => ["'", builtins.replaceStrings(["'"])(["'\\''"])(text), "'"])
                }))
            },
        }
        scopeHelpers.shellStr$.raw = (value) => ({ [SHELL_RAW]: value })
        const attachScopeHelpers = (scopeObj) => {
            for (const key of Object.keys(scopeHelpers)) {
                Object.defineProperty(scopeObj, key, { value: scopeHelpers[key], enumerable: false, writable: true, configurable: true })
            }
            // The scope is the only handle translated code is given; every
            // runtime attribute/method is reachable from it as `name$`
            // (scope.apply$, scope.operators$, scope.Path$, …).
            for (const key of Object.keys(runtimeWithScope)) {
                Object.defineProperty(scopeObj, `${key}$`, {
                    enumerable: false,
                    configurable: true,
                    get() { return runtimeWithScope[key] },
                    set(value) { runtimeWithScope[key] = value },
                })
            }
            return scopeObj
        }
        attachScopeHelpers(rootScope)
        runtime.attachScopeHelpers = attachScopeHelpers
        runtimeWithScope.attachScopeHelpers = attachScopeHelpers
        // The inner `runtime` object (the shared currentRuntime) is what
        // loadAndEvaluateSync receives from both `import` and `getFlake`. It
        // needs createFunc/createScope/defGetter so that imported/flake files
        // containing lambdas (e.g. a flake's `outputs = { ... }: ...`) can be
        // evaluated. Without these, loadNixFileSync throws "createFunc is not
        // a function" for any imported file that defines a function.
        runtime.createFunc = runtimeWithScope.createFunc
        runtime.createScope = runtimeWithScope.createScope
        runtime.defGetter = runtimeWithScope.defGetter
        runtime.set = setAttrPath
        runtime.force = force
        runtime.mkThunk = mkThunk
        // Expose apply on the inner runtime too, so loadNixFileSync (used by
        // `import` and `getFlake`) can inject it when evaluating files whose
        // generated code calls apply() for function application / __functor.
        runtime.apply = apply

        return {
            createFunc: runtimeWithScope.createFunc,
            createScope: runtimeWithScope.createScope,
            defGetter: runtimeWithScope.defGetter,
            apply,
            set: setAttrPath,
            force,
            mkThunk,
            nixArg,
            Path,
            InterpolatedString,
            builtins,
            operators,
            scope: rootScope,
            runtime: runtimeWithScope,
            // Evaluate a Nix source string against this runtime and return the
            // resulting JS value. Async because the translator (tree-sitter)
            // is loaded lazily on first use.
            evalNix: async (nixCode) => {
                const { convertToJsSync } = await import("../translator.js")
                // The translator emits a full module (runtime preamble +
                // `export default <expr>`); we already have the runtime, so
                // evaluate just the trailing expression.
                const jsCode = convertToJsSync(nixCode, { bare: true })
                const marker = "export default "
                const markerIdx = jsCode.lastIndexOf(marker)
                const cleanCode = (markerIdx >= 0 ? jsCode.slice(markerIdx + marker.length) : jsCode).trim()
                const scope = runtimeWithScope.scopeStack[runtimeWithScope.scopeStack.length - 1]
                const fn = new Function(
                    "runtime", "operators", "builtins", "scope", "nixScope",
                    "nixArg", "InterpolatedString", "Path",
                    "createFunc", "createScope", "defGetter",
                    "apply", "set", "force", "mkThunk",
                    `return (${cleanCode}\n)`
                )
                return fn(
                    runtimeWithScope, operators, builtins, scope, scope,
                    nixArg, InterpolatedString, Path,
                    runtimeWithScope.createFunc, runtimeWithScope.createScope, runtimeWithScope.defGetter,
                    apply, setAttrPath, force, mkThunk,
                )
            },
        }
    }