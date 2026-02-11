import { zip } from "https://deno.land/x/good@1.5.1.0/array.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

//  tools
// Helper: Convert BigInt or number to float
const toFloat = (value) => typeof value == "bigint" ? `${value}` - 0 : value
import { sha256Hex, md5Hex, sha1Hex, sha512Hex } from "../tools/hashing.js"
import { jsonParseWithBigInt } from "../tools/json_parse.js"
import { lazyMap } from "../tools/lazy_array.js"
// Removed prex dependency due to WASM initialization issues
// Replaced with custom POSIX regex converter below
import { parse as tomlParse } from "https://deno.land/std@0.224.0/toml/mod.ts"
import { serializeDerivation, computeDrvPath, computeOutputPath, encodeBase32 } from "../tools/store_path.js"

// core stuff (errors inlined from errors.js)
export class NixError extends Error {}
export class NotImplemented extends Error {}

// import system
import { ImportCache } from "./import_cache.js"
import { resolveImportPath } from "../tools/import_resolver.js"
import { loadAndEvaluateSync } from "./import_loader.js"

// fetcher system
import { downloadWithRetry, extractNameFromUrl } from "./fetcher.js"
import { extractTarball } from "./tar.js"
import { hashDirectory } from "./nar_hash.js"
import { ensureStoreDirectory, computeFetchStorePath, getCachedPath, setCachedPath, atomicMove, exists } from "./store_manager.js"

// registry system
import { resolveIndirectReference } from "./registry.js"

//
// Import state (shared across runtime instances)
//
    // Global state for import functions (gets set by createRuntime)
    const globalImportState = {
        importFn: null,
        scopedImportFn: null,
        runtime: null, // Store runtime for use by getFlake
    }

//
// Helper functions
//

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


    export class InterpolatedString {
        constructor(strings, getters) {
            this.strings = strings
            this.getters = getters
            this.cached = null
            this.isPath = false
        }
        toString() {
            if (this.cached == null) {
                const chunks = []
                for (const [string,getter] of zip(this.strings,this.getters)) {
                    if (string) {
                        chunks.push(string)
                    }
                    if (getter) {
                        const value = getter()
                        // if its a derivation
                        if (value.outPath) {
                            value = value.outPath
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

    export class Path extends InterpolatedString {
        constructor(strings, getters) {
            super(strings, getters)
            this.isPath = true
        }
    }

// 
// helpers (mostly arg checking tools)
// 
    const requireInt = (value)=>{
        if (typeof value!='bigint') {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while an integer was expected`)
        }
        return value
    }
    const requireAttrSet = (value)=>{
        if (!builtins.isAttrs(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a set was expected`)
        }
        return value
    }
    const requireString = (value)=>{
        if (!builtins.isString(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a string was expected`)
        }
        return value
    }
    const requireList = (value)=>{
        if (!builtins.isList(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a list was expected`)
        }
        return value
    }
    export const nixRepr = (value)=>{
        if (typeof value === 'string') {
            return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`
        }
        if (typeof value === 'bigint') {
            return value.toString()
        }
        if (typeof value === 'boolean' || value === null) {
            return String(value)
        }
        try {
            return JSON.stringify(value)
        } catch {
            return String(value)
        }
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
            // Replace [[:xxx:]] with the JavaScript equivalent
            jsPattern = jsPattern.replace(new RegExp(`\\[\\[:${className}:\\]\\]`, 'g'), `[${jsClass}]`)
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
            "isNull": (value)=>value === null,
            "isBool": (value)=>value===true||value===false,
            "isInt": (value)=>typeof value == "bigint",
            "isFloat": (value)=>typeof value == "number",
            "isPath": (value)=>value instanceof Path,
            "isString": (value)=> value instanceof InterpolatedString || typeof value == "string",
            "isList": (value)=>value instanceof Array,
            "isAttrs": (value)=>value != null && Object.getPrototypeOf({}) == Object.getPrototypeOf(value),
            "isFunction": (value)=>value instanceof Function,
            "typeOf": (value)=>{
                switch (typeof value) {
                    case "boolean":  return "bool"  ; break;
                    case "bigint":   return "int"   ; break;
                    case "number":   return "float" ; break;
                    case "string":   return "string"; break;
                    case "function": return "lambda"; break;
                    case "object":
                        if (value == null) {
                            return "null"
                        } else if (value instanceof Path) {
                            return "path"
                        } else if (value instanceof InterpolatedString) {
                            return "string"
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
                        throw new NixError(`error: cannot coerce a function to a string`)
                    case "object":
                        if (value == null) {
                            return ""
                        } else if (value instanceof InterpolatedString) {
                            // TODO: its unclear if there's a case when this should return value instead of value.toString()
                            return value.toString()
                        } else if (value instanceof Array) {
                            return value.flat(Infinity).map(each=>builtins.toString(each)).join(" ")
                        } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                            throw new NixError(`error: cannot coerce a set to a string`)
                        } else if (value instanceof Path) {
                            return FileSystem.makeAbsolutePath(value.toString())
                        } else {
                            throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                        }
                        break;
                    default:
                        throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                }
            },
            "toJSON": async (value)=>{
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
                        throw new NixError(`error: cannot convert a function to JSON`)
                    case "object":
                        if (value == null) {
                            return "null"
                        } else if (value instanceof InterpolatedString) {
                            return value.toString()
                        } else if (value instanceof Array) {
                            const items = await Promise.all(value.map(builtins.toJSON))
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
                                const jsonValue = await builtins.toJSON(value[each])
                                entries.push(`${JSON.stringify(each)}:${jsonValue}`)
                            }
                            return `{${entries.join(",")}}`
                        } else if (value instanceof Path) {
                            const pathString = value.toString()

                            // If the path is already in the store (e.g., from fetchTarball), use it directly
                            if (pathString.includes('/store/') || pathString.includes('/.cache/denix/store/')) {
                                return JSON.stringify(pathString)
                            }

                            // For local paths, copy to store using builtins.path
                            const storeResult = await builtins.path({
                                path: pathString,
                                recursive: true
                            })

                            return JSON.stringify(storeResult.toString())
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
                            } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
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
                // .toString is to handle interpolated strings
                return list.map(
                    each => {
                        requireString(each)
                        return each.toString()
                    }
                ).join(separator.toString())
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
                return str.replace(
                    pattern,
                    // TODO: note there is slightly different behavior here 
                    // if the replacement is not a string, this converts it to a string (for some things)
                    // nix lazily throws an error if the replacement is not a string
                    stringMatch=>to[from.indexOf(stringMatch)].toString()
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
                    const captureGroups = match.slice(1)
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
                if (typeof s == 'string') {
                    return s.length
                } else if (s instanceof InterpolatedString) {
                    return s.toString().length
                }
            },
            "substring": (start)=>(len)=>(s)=>{
                // Convert BigInt to number for slice
                const startNum = typeof start === 'bigint' ? Number(start) : start
                const lenNum = typeof len === 'bigint' ? Number(len) : len
                if (typeof s == 'string') {
                    return s.slice(startNum, startNum + lenNum)
                } else if (s instanceof InterpolatedString) {
                    // be lazy for InterpolatedStrings
                    return new InterpolatedString([""], [()=>s.toString().slice(startNum, startNum + lenNum)])
                }
            },
        
        // 
        // list helpers
        // 
            "length": (value)=>value.length,
            "all": (func)=>(list)=>list.length==0||list.every(func), 
            "any": (func)=>(list)=>list.some(func),                  
            "filter": (func)=>(list)=>list.filter(func),             
            "concatLists": (lists)=>requireList(lists)&&lists.flat(1),
            "elem": (value)=>(list)=>requireList(list)&&list.includes(value),
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
                const collected = {}
                for (const attrset of list) {
                    requireAttrSet(attrset)
                    for (const [key, value] of Object.entries(attrset)) {
                        if (!collected[key]) {
                            collected[key] = []
                        }
                        collected[key].push(value)
                    }
                }
                const result = {}
                for (const [key, values] of Object.entries(collected)) {
                    result[key] = f(key)(values)
                }
                return result
            },
            "intersectAttrs": (e1)=>(e2)=>{
                requireAttrSet(e1)
                requireAttrSet(e2)
                const result = {}
                for (const key of Object.keys(e1)) {
                    if (e2.hasOwnProperty(key)) {
                        result[key] = e2[key]
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
                        result[name] = item.value
                    }
                }
                return result
            },
            "mapAttrs": (f)=>(attrset)=>{
                requireAttrSet(attrset)
                const result = {}
                for (const [name, value] of Object.entries(attrset)) {
                    result[name] = f(name)(value)
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
                        result[key] = set[key]
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
            "fetchurl": async (args) => {
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

                // Ensure store directory exists
                await ensureStoreDirectory();

                // Check cache
                const cacheKey = `fetchurl:${url}:${sha256 || ""}`;
                const cached = await getCachedPath(cacheKey);
                if (cached && await exists(cached)) {
                    return new Path(cached);
                }

                // Download file
                const tempFile = `${await Deno.makeTempDir()}/download`;
                await downloadWithRetry(url, tempFile);

                // Validate SHA256 if provided (before moving to store)
                if (sha256) {
                    const fileBytes = await Deno.readFile(tempFile);
                    const actualHash = sha256Hex(fileBytes);
                    const normalizedExpected = sha256.replace(/^sha256[:-]/, '');
                    if (actualHash !== normalizedExpected) {
                        // Clean up temp file
                        try { await Deno.remove(tempFile); } catch {}
                        throw new Error(
                            `Hash mismatch for ${url}:\n` +
                            `  Expected: ${normalizedExpected}\n` +
                            `  Actual:   ${actualHash}`
                        );
                    }
                }

                // Compute hash of file for store path
                const fileBytes = await Deno.readFile(tempFile);
                const fileHash = "sha256:" + sha256Hex(fileBytes);

                // Compute store path
                const storePath = computeFetchStorePath(fileHash, name);

                // Create store directory and move file into it
                await Deno.mkdir(storePath, { recursive: true });
                const finalPath = `${storePath}/${name}`;
                await atomicMove(tempFile, finalPath);

                // Cache the result
                await setCachedPath(cacheKey, storePath);

                // Return Path object pointing to the directory (Nix convention)
                return new Path(storePath);
            },
            "fetchTarball": async (args) => {
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

                // Ensure store directory exists
                await ensureStoreDirectory();

                // Check cache
                const cacheKey = `${url}:${sha256 || ""}`;
                const cached = await getCachedPath(cacheKey);
                if (cached && await exists(cached)) {
                    return new Path(cached);
                }

                // Download tarball
                const tempTar = `${await Deno.makeTempDir()}/download.tar.gz`;
                await downloadWithRetry(url, tempTar);

                // Validate SHA256 if provided (before extraction)
                if (sha256) {
                    const { validateSha256 } = await import("./fetcher.js");
                    await validateSha256(tempTar, sha256);
                }

                // Extract tarball
                const tempExtract = `${await Deno.makeTempDir()}/extracted`;
                await extractTarball(tempTar, tempExtract);

                // Clean up tarball
                try {
                    await Deno.remove(tempTar);
                } catch {}

                // Compute NAR hash of extracted directory
                const narHash = await hashDirectory(tempExtract);

                // Verify sha256 matches NAR hash if provided
                if (sha256) {
                    const normalizedExpected = sha256.replace(/^sha256[:-]/, '');
                    const normalizedActual = narHash.replace(/^sha256[:-]/, '');
                    if (normalizedActual !== normalizedExpected) {
                        throw new Error(
                            `Hash mismatch for ${url}:\n` +
                            `  Expected: ${normalizedExpected}\n` +
                            `  Actual:   ${normalizedActual}`
                        );
                    }
                }

                // Compute store path
                const storePath = computeFetchStorePath(narHash, name);

                // Move to store
                await atomicMove(tempExtract, storePath);

                // Cache the result
                await setCachedPath(cacheKey, storePath);

                // Return Path object
                return new Path(storePath);
            },
            "fetchGit": async (args) => {
                // Parse arguments: can be string URL or {url, name?, rev?, ref?, submodules?, shallow?, allRefs?}
                let url, name, rev, ref, submodules, shallow, allRefs;
                if (typeof args === "string" || args instanceof InterpolatedString) {
                    url = requireString(args);
                    name = extractNameFromUrl(url) || "source";
                    rev = null;
                    ref = "HEAD";
                    submodules = false;
                    shallow = false;
                    allRefs = false;
                } else {
                    url = requireString(args["url"]);
                    name = args["name"] ? requireString(args["name"]) : (extractNameFromUrl(url) || "source");
                    rev = args["rev"] ? requireString(args["rev"]) : null;
                    ref = args["ref"] ? requireString(args["ref"]) : "HEAD";
                    submodules = args["submodules"] === true;
                    shallow = args["shallow"] === true;
                    allRefs = args["allRefs"] === true;
                }

                // Normalize ref: add refs/heads/ prefix unless ref starts with refs/ or is HEAD
                let normalizedRef = ref;
                if (ref && ref !== "HEAD" && !ref.startsWith("refs/")) {
                    normalizedRef = `refs/heads/${ref}`;
                }

                // Ensure store directory exists
                await ensureStoreDirectory();

                // Check cache
                // TODO: Store and retrieve metadata with cached paths
                // For now, skip cache to ensure metadata is always available
                const cacheKey = `fetchgit:${url}:${normalizedRef}:${rev || "tip"}`;
                // const cached = await getCachedPath(cacheKey);
                // if (cached && await exists(cached)) {
                //     const result = new Path(cached);
                //     return result;
                // }

                // Validate git binary exists
                try {
                    const gitVersion = new Deno.Command("git", {
                        args: ["--version"],
                        stdout: "piped",
                        stderr: "piped",
                    });
                    const { code } = await gitVersion.output();
                    if (code !== 0) {
                        throw new Error("git command failed");
                    }
                } catch (error) {
                    throw new Error(
                        `builtins.fetchGit requires git binary to be installed\n` +
                        `Error: ${error.message}`
                    );
                }

                // Create temp directory for cloning
                const tempDir = await Deno.makeTempDir();

                try {
                    // Build git clone command
                    const cloneArgs = ["clone"];
                    if (shallow) {
                        cloneArgs.push("--depth", "1");
                    }
                    if (submodules) {
                        cloneArgs.push("--recurse-submodules");
                    }
                    // Note: Only specify branch if not HEAD and not using rev
                    // If rev is specified, we'll checkout after clone
                    // Use the original ref for --branch (git expects branch name, not refs/heads/...)
                    if (!rev && ref && ref !== "HEAD") {
                        cloneArgs.push("--branch", ref);
                    }
                    cloneArgs.push(url, tempDir);

                    // Execute git clone
                    const cloneCmd = new Deno.Command("git", {
                        args: cloneArgs,
                        stdout: "piped",
                        stderr: "piped",
                    });

                    const cloneResult = await cloneCmd.output();
                    if (cloneResult.code !== 0) {
                        const errorText = new TextDecoder().decode(cloneResult.stderr);
                        throw new Error(`git clone failed: ${errorText}`);
                    }

                    // If allRefs is true, fetch all refs
                    if (allRefs) {
                        const fetchCmd = new Deno.Command("git", {
                            args: ["-C", tempDir, "fetch", "--all"],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        await fetchCmd.output(); // Ignore errors on fetch --all
                    }

                    // If specific revision requested, checkout that revision
                    if (rev) {
                        const checkoutCmd = new Deno.Command("git", {
                            args: ["-C", tempDir, "checkout", rev],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        const checkoutResult = await checkoutCmd.output();
                        if (checkoutResult.code !== 0) {
                            const errorText = new TextDecoder().decode(checkoutResult.stderr);
                            throw new Error(`git checkout ${rev} failed: ${errorText}`);
                        }
                    }

                    // Helper function to run git command and get output
                    async function gitOutput(args) {
                        const cmd = new Deno.Command("git", {
                            args: ["-C", tempDir, ...args],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        const { code, stdout } = await cmd.output();
                        if (code !== 0) {
                            throw new Error(`git ${args.join(" ")} failed`);
                        }
                        return new TextDecoder().decode(stdout).trim();
                    }

                    // Extract metadata
                    const fullRev = await gitOutput(["rev-parse", "HEAD"]);
                    const shortRev = await gitOutput(["rev-parse", "--short", "HEAD"]);
                    const revCountStr = await gitOutput(["rev-list", "--count", "HEAD"]);
                    const revCount = BigInt(revCountStr);
                    const lastModifiedStr = await gitOutput(["log", "-1", "--format=%ct", "HEAD"]);
                    const lastModified = BigInt(lastModifiedStr);

                    // Remove .git directory for determinism
                    try {
                        await Deno.remove(`${tempDir}/.git`, { recursive: true });
                    } catch {
                        // Ignore errors if .git doesn't exist or can't be removed
                    }

                    // Compute NAR hash of directory
                    const narHash = await hashDirectory(tempDir);

                    // Compute store path
                    const storePath = computeFetchStorePath(narHash, name);

                    // Move to store
                    await atomicMove(tempDir, storePath);

                    // Cache the result
                    await setCachedPath(cacheKey, storePath);

                    // Return Path object with metadata as properties
                    const result = new Path(storePath);
                    result.rev = fullRev;
                    result.shortRev = shortRev;
                    result.revCount = revCount;
                    result.lastModified = lastModified;
                    result.narHash = narHash;
                    result.submodules = submodules;
                    return result;
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        await Deno.remove(tempDir, { recursive: true });
                    } catch {
                        // Ignore cleanup errors
                    }
                    throw error;
                }
            },
            "fetchMercurial": async (args) => {
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
                await ensureStoreDirectory();

                // Check cache
                const cacheKey = `fetchhg:${url}:${ref}:${rev || "tip"}`;
                // Skip cache for now to ensure metadata is always available
                // const cached = await getCachedPath(cacheKey);
                // if (cached && await exists(cached)) {
                //     const result = new Path(cached);
                //     return result;
                // }

                // Validate hg binary exists
                try {
                    const hgVersion = new Deno.Command("hg", {
                        args: ["--version"],
                        stdout: "piped",
                        stderr: "piped",
                    });
                    const { code } = await hgVersion.output();
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
                const tempDir = await Deno.makeTempDir();

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

                    const cloneResult = await cloneCmd.output();
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
                        const updateResult = await updateCmd.output();
                        if (updateResult.code !== 0) {
                            const errorText = new TextDecoder().decode(updateResult.stderr);
                            throw new Error(`hg update -r ${rev} failed: ${errorText}`);
                        }
                    }

                    // Helper function to run hg command and get output
                    async function hgOutput(args) {
                        const cmd = new Deno.Command("hg", {
                            args: ["-R", tempDir, ...args],
                            stdout: "piped",
                            stderr: "piped",
                        });
                        const { code, stdout } = await cmd.output();
                        if (code !== 0) {
                            throw new Error(`hg ${args.join(" ")} failed`);
                        }
                        return new TextDecoder().decode(stdout).trim();
                    }

                    // Extract metadata using hg log with template
                    // Mercurial template fields: {node} = full hash, {date} = timestamp, {rev} = revision number
                    const logOutput = await hgOutput([
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
                        await Deno.remove(`${tempDir}/.hg`, { recursive: true });
                    } catch {
                        // Ignore errors if .hg doesn't exist or can't be removed
                    }

                    // Compute NAR hash of directory
                    const narHash = await hashDirectory(tempDir);

                    // Compute store path
                    const storePath = computeFetchStorePath(narHash, name);

                    // Move to store
                    await atomicMove(tempDir, storePath);

                    // Cache the result
                    await setCachedPath(cacheKey, storePath);

                    // Return Path object with metadata as properties
                    const result = new Path(storePath);
                    result.rev = fullRev;
                    result.shortRev = shortRev;
                    result.revCount = revCount;
                    result.lastModified = lastModified;
                    result.narHash = narHash;
                    result.branch = ref;
                    return result;
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        await Deno.remove(tempDir, { recursive: true });
                    } catch {
                        // Ignore cleanup errors
                    }
                    throw error;
                }
            },
            "fetchTree": async (args) => {
                // fetchTree is a unified interface for fetching from different source types
                // It accepts either:
                //   1. An attribute set with {type, ...other params}
                //   2. A URL-like string (requires flakes experimental feature)

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

                        const gitResult = await builtins.fetchGit(gitArgs);

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

                        return await builtins.fetchTarball(tarballArgs);

                    case "file":
                        // Delegate to fetchurl
                        const fileArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) fileArgs.name = attrs.name;
                        if (attrs.sha256) fileArgs.sha256 = attrs.sha256;

                        return await builtins.fetchurl(fileArgs);

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

                        const githubResult = await builtins.fetchGit(githubArgs);

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

                        return await builtins.fetchGit(gitlabArgs);

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

                        return await builtins.fetchGit(sourcehutArgs);

                    case "mercurial":
                    case "hg":
                        // Delegate to fetchMercurial
                        const hgArgs = {
                            url: attrs.url,
                        };
                        if (attrs.name) hgArgs.name = attrs.name;
                        if (attrs.rev) hgArgs.rev = attrs.rev;
                        if (attrs.ref) hgArgs.ref = attrs.ref;

                        const hgResult = await builtins.fetchMercurial(hgArgs);

                        // Return unified fetchTree format (same as git)
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

                        return await builtins.path(pathArgs);

                    case "indirect":
                        // Flake registry indirection - resolve via registry
                        const indirectId = requireString(attrs.id || attrs.ref).toString();

                        // Resolve the indirect reference via registry
                        const resolvedRef = await resolveIndirectReference(indirectId);

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
                        return await builtins.fetchTree(resolvedRef);

                    default:
                        throw new Error(`builtins.fetchTree: unsupported type '${type}'`);
                }
            },
            "fetchClosure": (args)=>{
                throw new NotImplemented(`builtins.fetchClosure requires binary cache support and store implementation (experimental feature)`)
            },

        // misc
            // Note: import and scopedImport delegate to runtime-initialized versions
            // We use a shared state object that gets initialized by createRuntime()
            "import": (path)=>{
                if (!globalImportState.importFn) {
                    throw new NixError(`builtins.import called before runtime initialization`)
                }
                return globalImportState.importFn(path)
            },
            "scopedImport": (scope)=>(path)=>{
                if (!globalImportState.scopedImportFn) {
                    throw new NixError(`builtins.scopedImport called before runtime initialization`)
                }
                return globalImportState.scopedImportFn(scope)(path)
            },
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
                try {
                    return { success: true, value: e }
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
                const deepEval = (val) => {
                    if (val instanceof Array) {
                        for (const item of val) {
                            deepEval(item)
                        }
                    } else if (builtins.isAttrs(val)) {
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
                    return FileSystem.basename(value.toString())
                }
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            },
            "dirOf": (value)=>{
                if (value && value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    return FileSystem.dirname(value.toString())
                }
                if (builtins.isString(value)) {
                    return FileSystem.dirname(value.toString())
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
                const fingerprint = `text:sha256:${contentHash}:/nix/store:${nameStr}`
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

                const storePath = `/nix/store/${hash32}-${nameStr}`

                // Return path (note: file not actually written in this implementation)
                return storePath
            },
            "readFileType": (p)=>{
                const absolutePath = FileSystem.makeAbsolutePath(p.toString())
                try {
                    const stat = Deno.statSync(absolutePath)
                    if (stat.isFile) return "regular"
                    if (stat.isDirectory) return "directory"
                    if (stat.isSymlink) return "symlink"
                    return "unknown"
                } catch (e) {
                    throw new NixError(`error: getting status of '${absolutePath}': ${e.message}`)
                }
            },
            "path": async (args) => {
                // Parse arguments
                requireAttrSet(args);
                const sourcePath = requireString(args["path"]).toString();

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
                await ensureStoreDirectory();

                // Resolve to absolute path
                const absPath = FileSystem.makeAbsolutePath(sourcePath);

                // Check if source exists
                const sourceInfo = FileSystem.sync.info(absPath);
                if (!sourceInfo.exists) {
                    throw new NixError(`error: path '${sourcePath}' does not exist`);
                }

                // Create temp directory for copying
                const tempDir = await Deno.makeTempDir();
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
                    const copyFiltered = async (src, dest) => {
                        const stat = await Deno.stat(src);
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
                            await Deno.copyFile(src, dest);
                            // Preserve executable bit
                            if (stat.mode && (stat.mode & 0o111)) {
                                await Deno.chmod(dest, stat.mode);
                            }
                        } else if (stat.isDirectory) {
                            // Create directory
                            await Deno.mkdir(dest, { recursive: true });

                            // If recursive, copy contents
                            if (recursive) {
                                for await (const entry of Deno.readDir(src)) {
                                    await copyFiltered(
                                        `${src}/${entry.name}`,
                                        `${dest}/${entry.name}`
                                    );
                                }
                            }
                        } else if (stat.isSymlink) {
                            // Copy symlink
                            const target = await Deno.readLink(src);
                            await Deno.symlink(target, dest);
                        }
                    };

                    // Copy source to temp location
                    await copyFiltered(absPath, tempPath);

                    // Hash the copied directory/file with NAR
                    let narHash;
                    if (recursive && (await Deno.stat(tempPath)).isDirectory) {
                        // Use NAR hash for directories
                        narHash = await hashDirectory(tempPath);
                    } else if ((await Deno.stat(tempPath)).isFile) {
                        // For single files, use direct file hash
                        const fileBytes = await Deno.readFile(tempPath);
                        narHash = "sha256:" + sha256Hex(fileBytes);
                    } else {
                        // For directories when recursive=false, still use NAR
                        narHash = await hashDirectory(tempPath);
                    }

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

                    // Compute store path
                    const storePath = computeFetchStorePath(narHash, name);

                    // Move to store (atomic operation)
                    await atomicMove(tempPath, storePath);

                    // Return Path object
                    return new Path(storePath);
                } catch (error) {
                    // Clean up temp directory on error
                    try {
                        await Deno.remove(tempDir, { recursive: true });
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

                throw new NixError(`error: file '${lookupStr}' was not found in the Nix search path`)
            },
        
        // nix-y derivation-y stuff
            "nixPath": ()=>{
                // Returns NIX_PATH as a list of attrsets
                const nixPath = Deno.env.get("NIX_PATH") || ""
                if (!nixPath) return []

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
            "storeDir": ()=>"/nix/store",
            "storePath": (path)=>{
                const pathStr = requireString(path).toString()
                const storeDir = "/nix/store"

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

                // Validate required attributes
                if (!attrs.name) throw new NixError("derivation requires 'name' attribute")
                if (!attrs.system) throw new NixError("derivation requires 'system' attribute")
                if (!attrs.builder) throw new NixError("derivation requires 'builder' attribute")

                const name = requireString(attrs.name).toString()
                const system = requireString(attrs.system).toString()

                // Builder can be a string or derivation
                let builder
                if (typeof attrs.builder === "string") {
                    builder = attrs.builder
                } else if (attrs.builder?.type === "derivation") {
                    builder = attrs.builder.outPath
                } else {
                    builder = requireString(attrs.builder).toString()
                }

                // Args default to empty list
                const builderArgs = attrs.args ? requireList(attrs.args).map(a => requireString(a).toString()) : []

                // Outputs default to ["out"]
                const outputNames = attrs.outputs ? requireList(attrs.outputs).map(o => requireString(o).toString()) : ["out"]

                // Reserved attributes that don't become env vars
                const reserved = new Set(["name", "system", "builder", "args", "outputs"])

                // Build environment variables from all attributes
                const env = {}
                for (const [key, value] of Object.entries(attrs)) {
                    if (reserved.has(key)) continue

                    // Convert value to environment variable string
                    if (value === null) {
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
                        env[key] = value.map(v => requireString(v).toString()).join(" ")
                    } else if (value?.type === "derivation") {
                        env[key] = value.outPath
                    } else if (value?.constructor?.name === "Path") {
                        // TODO: copy path to store
                        env[key] = value.toString()
                    } else {
                        env[key] = requireString(value).toString()
                    }
                }

                // Add required env vars
                env.name = name
                env.builder = builder
                env.system = system

                // CRITICAL: Nix adds "outputs" env var with space-separated output names
                // This is required for multi-output derivations
                if (outputNames.length > 1 || (outputNames.length === 1 && outputNames[0] !== "out")) {
                    env.outputs = outputNames.join(" ")
                }

                // CRITICAL: For non-fixed-output derivations, Nix uses EMPTY STRINGS
                // during hash computation (both in outputs array AND env vars)
                // Placeholders are only used at runtime during execution, not during hash computation
                for (const outputName of outputNames) {
                    env[outputName] = ""
                }

                // Create derivation structure for serialization (phase 1: empty output paths in outputs array)
                // NOTE: For non-fixed-output derivations, outputs array uses "" not placeholders!
                // CRITICAL: Outputs must be sorted alphabetically (Nix requirement)
                const sortedOutputNames = [...outputNames].sort()
                const drvStructure = {
                    outputs: sortedOutputNames.map(o => [o, "", "", ""]),
                    inputDrvs: [],
                    inputSrcs: [],
                    system: system,
                    builder: builder,
                    args: builderArgs,
                    env: { ...env }
                }

                // Serialize to compute paths (with empty output paths)
                const drvSerializedForHash = serializeDerivation(drvStructure)
                const storeDir = "/nix/store"

                // Compute output paths based on the serialization
                const outputPaths = {}
                for (const outputName of outputNames) {
                    const outputPath = computeOutputPath(drvSerializedForHash, outputName, name, storeDir)
                    outputPaths[outputName] = outputPath
                    env[outputName] = outputPath
                }

                // Update derivation structure with actual output paths for final .drv
                // Use sorted output names to match Nix's ordering
                drvStructure.outputs = sortedOutputNames.map(o => [o, outputPaths[o], "", ""])
                drvStructure.env = env

                // Now compute drvPath from the complete serialization (with filled paths!)
                const drvSerializedFinal = serializeDerivation(drvStructure)
                const drvPath = computeDrvPath(drvSerializedFinal, name, storeDir)

                // Build the return value
                const derivation = {
                    type: "derivation",
                    name: name,
                    system: system,
                    builder: builder,
                    args: builderArgs,
                    outputs: outputNames,
                    outputName: outputNames[0], // default output
                    drvPath: drvPath,
                    outPath: outputPaths[outputNames[0]],
                }

                // Add each output as a property
                for (const outputName of outputNames) {
                    derivation[outputName] = outputPaths[outputName]
                }

                // 'all' attribute contains all outputs
                derivation.all = outputNames.map(o => outputPaths[o])

                // 'drvAttrs' contains the attributes that went into the derivation
                derivation.drvAttrs = { ...attrs }

                // Make derivation coerce to string (return outPath)
                derivation.toString = () => derivation.outPath
                derivation[Symbol.toPrimitive] = () => derivation.outPath

                return derivation
            },
            "derivationStrict": (attrs)=>{
                // derivationStrict is identical to derivation in modern Nix
                // The "strict" version was historical - both now strictly evaluate all attributes before building
                return builtins.derivation(attrs)
            },
            "parseDrvName": (s)=>{
                const str = requireString(s).toString()
                const match = str.match(/^(.*?)-([^-]*(?:-[^a-zA-Z].*)?)$/)
                if (match) {
                    return { name: match[1], version: match[2] }
                } else {
                    return { name: str, version: "" }
                }
            },
            "compareVersions": (s1)=>(s2)=>{
                const v1 = builtins.splitVersion(requireString(s1))
                const v2 = builtins.splitVersion(requireString(s2))
                const maxLen = Math.max(v1.length, v2.length)
                for (let i = 0; i < maxLen; i++) {
                    const p1 = v1[i] || ""
                    const p2 = v2[i] || ""
                    const n1 = parseInt(p1)
                    const n2 = parseInt(p2)
                    if (!isNaN(n1) && !isNaN(n2)) {
                        if (n1 < n2) return -1
                        if (n1 > n2) return 1
                    } else {
                        if (p1 < p2) return -1
                        if (p1 > p2) return 1
                    }
                }
                return 0
            },
            "getFlake": async (flakeRef) => {
                // getFlake fetches a flake and returns its output attributes and metadata
                // Usage: builtins.getFlake "github:owner/repo" or builtins.getFlake "/path/to/flake"

                const refString = requireString(flakeRef).toString();

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
                            sourcePath = await Deno.realPath(sourcePath);
                        }
                        sourceInfo = {
                            type: "path",
                            path: sourcePath,
                            narHash: await hashDirectory(sourcePath),
                        };
                        break;

                    case "github":
                        // Fetch from GitHub using fetchTree
                        const githubResult = await builtins.fetchTree({
                            type: "github",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = githubResult.outPath;
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
                        const gitlabResult = await builtins.fetchTree({
                            type: "gitlab",
                            owner: parsedRef.owner,
                            repo: parsedRef.repo,
                            rev: parsedRef.rev,
                            ref: parsedRef.ref,
                        });
                        sourcePath = gitlabResult.outPath;
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
                        const gitResult = await builtins.fetchGit({
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
                        const hgResult = await builtins.fetchMercurial({
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

                    case "tarball":
                        // Fetch tarball
                        const tarballResult = await builtins.fetchTarball({
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
                        const resolvedFlakeRef = await resolveIndirectReference(parsedRef.id);

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
                        return await builtins.getFlake(resolvedFlakeRef);

                    default:
                        throw new Error(`builtins.getFlake: unsupported flake reference type: ${parsedRef.type}`);
                }

                // Read flake.nix from the source
                const flakePath = `${sourcePath}/flake.nix`;
                let flakeNixExists = false;
                try {
                    await Deno.stat(flakePath);
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

                if (!globalImportState.runtime) {
                    throw new Error(`builtins.getFlake called before runtime initialization`);
                }

                const flakeExpr = await loadAndEvaluateSync(flakePath, globalImportState.runtime);

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
                    const lockContent = await Deno.readTextFile(lockPath);
                    lockData = JSON.parse(lockContent);
                } catch {
                    // No lock file or invalid JSON - that's okay, we'll use unlocked inputs
                }

                // Recursively fetch and evaluate inputs
                // For now, we'll create a simplified inputs object with just 'self'
                // Full implementation would recursively call getFlake on each input
                const inputs = {
                    self: null, // Will be set after we create the flake object
                };

                // Build the initial flake result
                const flakeResult = {
                    _type: "flake",
                    description: description,
                    sourceInfo: sourceInfo,
                    inputs: inputs,
                    outputs: null, // Will be set after calling outputs function
                };

                // Set self reference
                inputs.self = flakeResult;

                // Evaluate each input (simplified - in real Nix this would recursively fetch)
                for (const [inputName, inputSpec] of Object.entries(inputsSpec)) {
                    if (builtins.isAttrs(inputSpec) && inputSpec.url) {
                        // Input specification with URL
                        const inputUrl = requireString(inputSpec.url).toString();
                        try {
                            // For now, just mark that the input exists but don't recursively fetch
                            // Full implementation would do: inputs[inputName] = await builtins.getFlake(inputUrl)
                            // This would require handling circular dependencies and lock files properly
                            inputs[inputName] = {
                                _type: "flake-input-stub",
                                url: inputUrl,
                                // Note: Real implementation would fetch and evaluate recursively
                            };
                        } catch (error) {
                            throw new Error(
                                `builtins.getFlake: failed to fetch input '${inputName}' from ${inputUrl}: ${error.message}`
                            );
                        }
                    } else if (typeof inputSpec === "string" || inputSpec instanceof InterpolatedString) {
                        // Direct string URL
                        const inputUrl = requireString(inputSpec).toString();
                        inputs[inputName] = {
                            _type: "flake-input-stub",
                            url: inputUrl,
                        };
                    }
                }

                // Call the outputs function with inputs
                // The outputs function takes all inputs as arguments
                try {
                    flakeResult.outputs = outputsFn(inputs);
                } catch (error) {
                    throw new Error(
                        `builtins.getFlake: error evaluating flake outputs: ${error.message}`
                    );
                }

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

                // GitHub shorthand: github:owner/repo[/ref]
                if (ref.startsWith("github:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "github", owner: parts[0], repo: parts[1] }
                    if (parts[2]) result.ref = parts[2]
                    return result
                }

                // GitLab shorthand: gitlab:owner/repo[/ref]
                if (ref.startsWith("gitlab:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "gitlab", owner: parts[0], repo: parts[1] }
                    if (parts[2]) result.ref = parts[2]
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

                // Tarball URL
                if (ref.startsWith("http://") || ref.startsWith("https://")) {
                    return { type: "tarball", url: ref }
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
                requireString(s)
                // In full Nix, returns an attrset describing the string's context
                // For now, return empty set (no context tracking)
                return {}
            },
            "hasContext": (s)=>{
                requireString(s)
                // In full Nix, returns true if string has context
                // For now, always return false (no context tracking)
                return false
            },
            "unsafeDiscardStringContext": (s)=>{
                requireString(s)
                // Remove context from string (for now, just return the string)
                return s.toString()
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
                const seen = new Map() // Track by key to avoid duplicates
                const queue = [...startSet]

                while (queue.length > 0) {
                    const item = queue.shift()
                    requireAttrSet(item)

                    if (!item.hasOwnProperty('key')) {
                        throw new NixError(`error: attribute 'key' required in genericClosure item`)
                    }

                    const key = builtins.toString(item.key)

                    if (!seen.has(key)) {
                        seen.set(key, true)
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
    Object.freeze(builtins)

    export const operators = {
        ifThenElse: (condition, thenFn, elseFn)=>{
            // Nix requires strict boolean values in if conditions
            if (typeof condition !== "boolean") {
                throw new NixError(`error: expected a Boolean but found ${builtins.typeOf(condition)}: ${nixRepr(condition)}`)
            }
            return condition ? thenFn() : elseFn()
        },
        negative: (value)=>typeof value == "bigint"?-value:-toFloat(value),
        listConcat: (value, other)=>{
            requireList(value)
            requireList(other)
            return value.concat(other)
        },
        add: (value, other)=>{
            const vType = builtins.typeOf(value)
            const oType = builtins.typeOf(other)

            if ((vType === "int" || vType === "float") && (oType === "int" || oType === "float")) {
                if (typeof value == "bigint" && typeof other == "bigint") {
                    return value + other
                } else {
                    return toFloat(value) + toFloat(other)
                }
            } else if (vType === "string" && oType === "string") {
                return value.toString() + other.toString()
            } else if (vType === "path" && oType === "path") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "path" && oType === "string") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "string" && oType === "path") {
                return value.toString() + other.toString()
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
            requireAttrSet(value)
            requireAttrSet(other)
            return {...value, ...other}
        },
        equal: (value, other)=>{
            if (value === other) return true
            if (typeof value !== typeof other) return false
            if (value instanceof Array && other instanceof Array) {
                if (value.length !== other.length) return false
                for (let i = 0; i < value.length; i++) {
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
            requireAttrSet(attrset)
            requireString(attr)
            return attrset.hasOwnProperty(attr.toString())
        },
        hasAttrPath: (attrset, ...attrPath)=>{
            // Check if a nested attribute path exists
            // e.g., hasAttrPath({a: {b: {c: 1}}}, "a", "b", "c") => true
            let current = attrset
            for (const attr of attrPath) {
                if (typeof current !== "object" || current === null || Array.isArray(current)) {
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
            let current = attrset
            for (const attr of attrPath) {
                if (typeof current !== "object" || current === null || Array.isArray(current)) {
                    return defaultValue
                }
                const attrStr = requireString(attr).toString()
                if (!current.hasOwnProperty(attrStr)) {
                    return defaultValue
                }
                current = current[attrStr]
            }
            return current
        },
    }
    
    export const createRuntime = ()=>{
        // Create import cache for this runtime instance
        const importCache = new ImportCache()

        // Create runtime object that will be passed to builtins
        const runtime = {
            builtins,
            operators,
            InterpolatedString,
            Path,
            importCache,
            currentFile: null, // Track current file for relative imports
        }

        // Initialize import functions with runtime context
        globalImportState.importFn = (path) => {
            // Convert Path object to string if needed
            const pathStr = path instanceof Path ? path.toString() : requireString(path).toString()

            // Resolve path relative to current file
            const absPath = runtime.currentFile
                ? resolveImportPath(runtime.currentFile, pathStr)
                : FileSystem.makeAbsolutePath(pathStr)

            // Check cache first
            if (importCache.has(absPath)) {
                return importCache.get(absPath)
            }

            // Track import stack for circular detection
            importCache.pushStack(absPath)

            try {
                // Save current file context
                const prevFile = runtime.currentFile
                runtime.currentFile = absPath

                // Load and evaluate the file
                const result = loadAndEvaluateSync(absPath, runtime)

                // Cache result
                importCache.set(absPath, result)

                // Restore previous file context
                runtime.currentFile = prevFile

                return result
            } finally {
                importCache.popStack()
            }
        }

        globalImportState.scopedImportFn = (scope) => (path) => {
            // scopedImport is like import but with a custom scope
            // This allows overriding builtins and other values
            requireAttrSet(scope)

            // Convert Path object to string if needed
            const pathStr = path instanceof Path ? path.toString() : requireString(path).toString()

            // Resolve path relative to current file
            const absPath = runtime.currentFile
                ? resolveImportPath(runtime.currentFile, pathStr)
                : FileSystem.makeAbsolutePath(pathStr)

            // Note: scopedImport does NOT use cache (Nix behavior)
            // Each call evaluates fresh with the new scope

            // Track import stack for circular detection
            importCache.pushStack(absPath)

            try {
                // Save current file context
                const prevFile = runtime.currentFile
                runtime.currentFile = absPath

                // Create a modified runtime with custom scope
                const scopedRuntime = {
                    ...runtime,
                    builtins: {
                        ...runtime.builtins,
                        ...scope, // Override with custom scope
                    },
                }

                // Load and evaluate the file with scoped runtime
                const result = loadAndEvaluateSync(absPath, scopedRuntime)

                // Restore previous file context
                runtime.currentFile = prevFile

                return result
            } finally {
                importCache.popStack()
            }
        }

        const rootScope = {
            builtins,
            true: builtins.true,
            false: builtins.false,
            null: builtins.null,

            // https://nixos.org/manual/nix/stable/language/builtins.html
            derivation: builtins.derivation,
            import: builtins.import,
            abort: builtins.abort,
            throw: builtins.throw,
        }

        // Store runtime globally for use by getFlake
        globalImportState.runtime = runtime

        return {
            scopeStack: [rootScope],
            rootScope: rootScope,
            runtime, // Expose runtime for use by import system
            importCache,
        }
    }