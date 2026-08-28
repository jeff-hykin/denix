# Denix - Nix to JavaScript Translator & Runtime

A Nix → JavaScript translator/runner with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-805%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Quick Start

Import your nix code ... inside JS

```javascript
import { createRuntime } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/runtime.js"
const nix = createRuntime()

// eval *any* nix code
const aFunction = await nix.evalNix(`x: x * 2`)
// true:
aFunction(10) == 20

// import flakes
const flake = nix.builtins.import("https://raw.githubusercontent.com/NixOS/templates/master/trivial/flake.nix")
flake.description // "my flake"
flake.outputs     // a callable JS function

// translate bits of nix to js
import { convertToJsSync } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/translator.js"
console.log(convertToJsSync(`
  let
    x = 1;
    y = 2;
  in
    x + y
`))

// becomes basically:
scope.let$({
    x: 1n,
    y: 2n,
}).in$(scope=>
    scope.operators$.add(scope.x, scope.y)
)
```

### CLI Translate

```sh
# Install from the web ...
deno install -g --allow-all --name denix "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/cli/denix.js"
# Translate Nix to readable JavaScript
denix translate default.nix                   # print translated JS to stdout
denix translate -E '{ a = 1; b = a + 1; }'    # translate an inline expression
denix translate default.nix -o default.js     # write JS to a file
denix translate default.nix -d ./out          # follow `import ./x.nix` and write the whole tree
denix translate ./lib -d ./out                # translate every .nix file under a directory
```

### Translation Examples

<table>
<tr><th>Nix</th><th>Translated JavaScript</th></tr>
<tr>
<td>

```nix
1.0 + 2
```

</td>
<td>

```javascript
scope.operators$.add(1.0, 2n)
// BigInt === NixInt (js doesn't have ints)
```

</td>
</tr>

<tr>
<td>

```nix
if builtins.isInt 42
  then "yes"
  else "no"
```

</td>
<td>

```javascript
scope.if$(scope.apply$(scope.builtins["isInt"], 42n))
  .then$("yes")
  .else$("no")
```

</td>
</tr>

<tr>
<td>

```nix
let
  x = 1;
  y = 2;
in x + y
```

</td>
<td>

```javascript
scope.let$({
  x: 1n,
  y: 2n,
}).in$((scope) => scope.operators$.add(scope.x, scope.y))
```

</td>
</tr>


<tr>
<td>

```nix
{
  name = "demo";
  greet = user: "hi ${user}";
  nested.value = 1;
}
```

</td>
<td>

```javascript
scope.attrSet$({
  name: "demo",
  greet: () =>
    scope.func$("user", (scope) =>
      scope.str$(() => ["hi ", scope.user])
    ),
  ...scope.deepSet$(["nested", "value"], 1n),
})
```

</td>
</tr>
</table>

Translated files only ever get one variable: `scope`. Nix bindings are plain
properties on it (`scope.x`), the language constructs are `$`-suffixed helpers
(`scope.let$`, `scope.attrSet$`, `scope.func$`, `scope.if$`, `scope.with$`,
`scope.str$`, `scope.deepSet$`), and everything else the runtime provides is
forwarded through the same `$` convention (`scope.apply$`, `scope.operators$`,
`scope.builtins$`, `scope.Path$`, `scope.nixArg$`, `scope.force$`, …). `$` is
not a legal character in Nix identifiers, so none of these can ever collide
with a name from the Nix source.

When you write JavaScript by hand rather than translating it, `scope.str$` also
works as a template tag: ``scope.str$`${pkgs.zsh}/bin/zsh` ``. Reach for it
instead of a plain template literal whenever a store path is interpolated — a
plain literal stringifies the derivation and silently drops the Nix string
context, so the result no longer records that it depends on that path.

Shell scripts built out of store paths are common enough to get their own tag,
`scope.shellStr$`. It joins like `str$` (so context survives) but quotes every
interpolated value the way `lib.escapeShellArg` does — only when the string
contains something a shell would treat specially. Pieces that are already
script rather than data go through `scope.shellStr$.raw(...)`:

```javascript
const { shellStr$ } = scope
const raw = shellStr$.raw

shellStr$`HOME=${homePath} PATH=${str$`${pkgs.nix}/bin`} ${raw(someScript)}`
```

Every translated file is one module with nothing but a header and an expression:

```javascript
import { nixFile } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/runtime.js"
import _nix_strings_1a2b3c4d from "./strings.js"   // was: import ./strings.nix

export default nixFile("/abs/path/to/default.nix", ({ scope }) => (
  /* the translated expression */
))
```

The file never creates a runtime — it exports a function that *takes* one, so
the caller decides which store and scope it evaluates against (and the result is
memoized per runtime, like Nix's import cache):

```javascript
import { createRuntime } from ".../main/runtime.js"
import myLib from "./out/lib/default.js"

const lib = myLib(createRuntime())
```

`denix translate -d <dir>` follows `import ./x.nix` (including the `./dir` →
`./dir/default.nix` rule) and rewrites each one into a static JS import, named
by hashing the file's absolute path so the name is stable across runs. Imports
whose target isn't a literal path — `import file`, `import <nixpkgs>`,
`import ./${name}.nix` — can't be resolved ahead of time, so they stay runtime
imports and translate prints a warning naming the file and line.

Two flags matter when the output is going to be published rather than used in
place: `--runtime-path <url>` sets what the emitted files `import { nixFile }
from`, and `--relocate-from <dir>` emits every path under that directory as
`new URL("./x", import.meta.url).pathname` instead of an absolute path, so the
tree works on any machine (it defaults to the directory being translated). Nix
files that read data next to themselves — `builtins.readFile ./.version` — then
need that data copied alongside the JS.

```bash
# Install from the web ...
deno install -g --allow-all --name denix "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/cli/denix.js"

denix --help                                  # colorized help for all subcommands

# Translate Nix to readable JavaScript
denix translate default.nix                   # print translated JS to stdout
denix translate -E '{ a = 1; b = a + 1; }'    # translate an inline expression
denix translate default.nix -o default.js     # write JS to a file
denix translate default.nix -d ./out          # follow `import ./x.nix` and write the whole tree
denix translate ./lib -d ./out                # translate every .nix file under a directory

# Evaluate Nix and print the result (pure by default, like `nix eval`)
denix eval -E '1 + 2'                         # 3
denix eval default.nix -A version             # select an attribute path
denix eval -E '{ a = [ 1 2 ]; }' --json       # JSON output (--xml and --raw work too)
denix eval shell.nix --impure --arg 'pkgs=import <nixpkgs> {}'

# Build derivations (writes to ~/.cache/denix/store, symlinks ./result)
denix build default.nix
denix build -E '(import <nixpkgs> {}).cowsay'
denix build ./my-flake#packages.aarch64-darwin.default
denix build default.nix --dry-run             # print the .drv path only
```

## Running the Test Suite

```bash
# Unit tests
deno test --allow-all main/tests/
./test.sh types        # or by category: types, lists, translator, derivation, ...

# Conformance suites (compare against a real nix-instantiate install)
./run/tests            # pure_setup + complex eval tasks (see --help for filters)
```

## Features

- ✅ **Pure Deno** - And Zero npm/jsr dependencies, URL imports only (as God intended 🚀), bundlable
- ✅ **`denix` CLI** - translate, eval, and build from the command line
- ✅ **All Nix builtins** - every Nix 2.18 builtin implemented and covered by tests (805 passing)
- ✅ **Import system** - `builtins.import` and `builtins.scopedImport` fully working

## Using the Runtime

```javascript
import { createRuntime } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/runtime.js"

const { builtins, operators, apply, evalNix } = createRuntime()

// Type checking
builtins.isAttrs({a: 1})       // true
builtins.typeOf(42n)            // "int"
builtins.typeOf(3.14)           // "float"

// List operations
builtins.length([1n, 2n, 3n])   // 3n
builtins.head([1n, 2n, 3n])     // 1n
builtins.map(x => x * 2n)([1n, 2n, 3n])  // [2n, 4n, 6n]

// Operators
operators.add(1n, 2n)           // 3n
operators.divide(10n, 3n)       // 3n (integer division)

// Evaluate Nix source strings (functions come back as callable JS values)
const inc = await evalNix(`x: x + 1`)
apply(inc, 41n)                 // 42n
```

## Importing Nix Code

`builtins.import` evaluates real Nix files — local paths or URLs — and returns them as JavaScript values (Nix ints become BigInts, attrsets become objects, functions become functions):

```javascript
import { createRuntime } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/main/runtime.js"

const { builtins } = createRuntime()

// Import a local .nix file
const flake = builtins.import("/path/to/project/flake.nix")
flake.description                  // "my flake"
flake.outputs                      // a callable JS function

// Import Nix code straight from a URL
const remoteFlake = builtins.import(
    "https://raw.githubusercontent.com/jeff-hykin/denix/claude3/examples/flake-a/flake.nix"
)
// Relative imports inside a URL-imported file resolve against that URL,
// so `import ./lib/helper.nix` inside it fetches the sibling URL.

// .json files work too (Nix semantics: numbers become BigInts)
const data = builtins.import("/path/to/data.json")

// Flakes with inputs: builtins.getFlake resolves inputs recursively.
// It's synchronous, so nix source can call it too (`let f = builtins.getFlake "…";`)
const resolved = builtins.getFlake("path:/path/to/project")
resolved.outputs                   // outputs called with resolved inputs
resolved.lastModifiedDate          // shaped like real Nix: outputs // sourceInfo // { inputs, outputs, sourceInfo, _type }
                                   // so there is no `description` — that stays inside flake.nix
```

## Using the Translator

```javascript
import { convertToJsSync } from "https://raw.esm.sh/gh/jeff-hykin/denix@master/translator.js"

const nixCode = `
  let
    x = 1;
    y = 2;
  in x + y
`

const jsCode = convertToJsSync(nixCode)  // readable JS that maps 1-to-1 to the Nix
```

## Project Structure

```
denix/
├── denix                   # CLI launcher (translate / eval / build)
├── translator.js           # Nix → JS translator (tree-sitter-nix based)
├── main/
│   ├── cli/denix.js        # CLI implementation (cliffy)
│   ├── runtime.js          # All Nix builtins + operators + eval settings
│   ├── builder.js          # Derivation builder (local build + cache substitution)
│   ├── substituter.js      # Binary-cache substitution (cache.nixos.org)
│   ├── import_loader.js    # Nix file loading & evaluation
│   ├── import_cache.js     # Import caching & circular detection
│   ├── registry.js         # Flake registry resolution
│   ├── fetcher.js          # HTTP downloads with retry logic
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing (byte-identical to `nix hash path`)
│   ├── store_manager.js    # Store path management (~/.cache/denix/store)
│   ├── errors.js           # Nix error types
│   ├── internal_repl.js    # REPL helper
│   ├── corepkgs/           # Embedded corepkgs (fetchurl.nix)
│   └── tests/              # Unit test suite (52 files, 805 tests)
├── tests/translation/      # Conformance suites (denix vs real nix-instantiate)
│   ├── eval_tasks_pure_setup/  # Upstream Nix eval tests (eval-okay-*/eval-fail-*)
│   └── eval_tasks_complex/     # Scripted end-to-end tests (fetchers, flakes, ...)
├── run/
│   └── tests               # Conformance suite runner (see --help)
├── tools/                  # Utilities (hashing, store paths, parsing)
├── examples/               # Example flakes used by tests and docs
├── docs/                   # Design notes
└── test.sh                 # Unit test runner shortcuts
```

## Testing

**Current coverage:** 805 unit tests passing across 52 files (`main/tests/`, ~8 min — several hit the network), plus conformance suites under `tests/translation/` (fetchers 47/47, upstream Nix eval tests, derivation byte-fidelity vs real Nix)

**Unit tests:**
```bash
./test.sh              # all unit tests
./test.sh math         # by category (math, lists, translator, derivation, integration, ...)
./test.sh fetchGit     # by pattern
deno test --allow-all --filter="import" main/tests/
```

**Conformance suites** (need a real `nix-instantiate` on PATH for comparison):
```bash
./run/tests                 # everything
./run/tests --pure-only     # upstream eval-okay/eval-fail tasks only
./run/tests --complex-only  # scripted end-to-end tests only
```

## Implementation Status

### Implemented Builtins

✅ All Nix 2.18 builtins implemented and exercised by the test suites

**Categories:**
- Type checking: isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf
- Lists: map, filter, foldl', all, any, elem, head, tail, length, etc.
- Attrsets: hasAttr, getAttr, mapAttrs, removeAttrs, intersectAttrs, etc.
- Strings: substring, stringLength, split, match, replaceStrings, etc.
- Math: add, sub, mul, div, lessThan, ceil, floor, bitwise ops
- Derivations: derivation, toPath, storePath, path, etc.
- Fetchers: fetchGit, fetchTarball, fetchurl, fetchTree, fetchMercurial, getFlake, filterSource
- Import: import, scopedImport
- Control: throw, trace, seq, deepSeq, tryEval
- And more...

See [main/runtime.js](main/runtime.js) for complete implementation.

## Development Status

Working today: byte-identical derivations vs real Nix (515/515 across the stdenv closure), binary-cache substitution, local builds (cowsay end-to-end), flakes, and a green main test suite (805 tests) plus the fetchers conformance suite (47/47).

Remaining work (aspirational conformance suites): nix-hash CLI emulation, nixpkgs module system, and parts of the upstream nix_lang/network suites.

## Key Design Decisions

1. **BigInt for integers** - Correct integer division (1/2 = 0, not 0.5)
2. **Object.create() for scopes** - Preserves lazy evaluation getters
3. **~/.cache/denix/store/** - No root permissions needed
4. **URL imports only** - Zero npm/jsr dependencies

## Dependencies

- Deno standard library (URL imports)
- tree-sitter-nix (parser, via esm.sh)
- @std/assert (testing)

## License

MIT
