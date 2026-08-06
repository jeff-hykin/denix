# Design: string context, multi-output derivations & non-default output refs, recursive flake inputs

Status: design (2026-06). Drives the work toward **multi-output derivations + non-default output references**, with **recursive flake inputs (flakes referencing other flakes)** as a parallel high-priority track.

## Why these are one design

All three are really about the same question: *when a value flows from one place to another, what does it carry along?*
- A derivation output (`pkg.dev`) flowing into another derivation's attrs must carry "I am output `dev` of drv X" so `inputDrvs` records `[X.drvPath, ["dev"]]`.
- A string built from a store path (`"${pkg.dev}/lib"`) must carry the same — that's **string context**.
- A flake input must carry the recursively-evaluated *other flake*, not a stub.

So: model "references" once, use them everywhere.

---

## Part 1 — Derivation outputs as objects (the core of the goal)

### Problem
Today `derivation()` sets `drv[outputName] = "/nix/store/…"` (a string). Referencing `pkg.dev` yields a bare string; `collectDeps` can't tell it came from `pkg`, and even if it could, it can't tell *which output*. So `inputDrvs` always uses the default output.

### Nix's model (what we'll mirror)
In Nix, a multi-output derivation's `pkg.outputs = ["out" "dev"]`, and **each of `pkg.out`, `pkg.dev` is itself a derivation value** — an attrset with `type = "derivation"`, the same `drvPath`, but `outputName`/`outPath` specific to that output. `pkg` itself is `pkg.${builtins.head outputs}` (the default output). Referencing `pkg.dev` therefore yields a derivation value tagged with `outputName = "dev"`.

### denix design
`derivation()` returns a base derivation object (default output). Additionally, for each output name `o`, define `drv[o]` as a **derivation-output object**:
```
{ type: "derivation",
  drvPath,                      // same drv
  outPath: outputPaths[o],      // THIS output's path
  outputName: o,
  outputs, all, name, system,   // shared metadata
  drvAttrs, inputDrvObjects, moduloHashUnmasked, fixedOutputInfo,
  toString/Symbol.toPrimitive → outPath,
}
```
- The base `drv` keeps `outputName = outputs[0]` (default) and `drv.out`/`drv.dev`/… each point at their output-object.
- `drv.outPath === drv[outputs[0]].outPath`.
- Coercion (`toString`, interpolation) still yields `outPath` (so existing string behavior is unchanged).

### Effect on `collectDeps` / `inputDrvs`
`collectDeps` already recognizes `v.type === "derivation"`. Now when it finds an output-object it records the SPECIFIC output:
```
inputDrvObjects entries become { drv, outputName }   // not just drv
```
Then `moduloInputDrvs`/`finalInputDrvs` group by `drvPath`, collecting the *set* of referenced output names per input (sorted), e.g. `[X.drvPath, ["dev","out"]]`. This is what Nix puts in the `.drv` and is required for byte-exact multi-output drvPaths.

### Builder impact
`build()` must realize the dep once and expose all referenced outputs; the relocatable-store rewrite already maps each `/nix/store/<base>` independently, so multiple outputs of one drv Just Work as long as each output path is materialized.

### Open question
A reference reachable only through a *string* (`"${pkg.dev}/x"`) loses the object once coerced — that's where **string context** (Part 2) is needed for full correctness. Part 1 alone covers direct `pkg.dev` attr/list references, which is the bulk of nixpkgs and the stated goal.

---

## Part 2 — String context (the general mechanism)

### Problem
A Nix string secretly carries a **context**: the set of store paths / drv-outputs it references. `"${pkg.dev}/lib"` has context `{ pkg.drvPath: ["dev"] }`. `mkDerivation` reads this context to compute `inputDrvs`/`inputSrcs`; reference scanning of built outputs reads it for the runtime closure. denix currently throws all context away.

### Representation options
JS strings can't carry metadata, and they're used pervasively (`typeof x === "string"` everywhere). Options:
1. **`NixString` wrapper class** (`{ value: string, context: Map }`). Most correct, most invasive — every string-consuming builtin/operator must `force`-and-unwrap.
2. **Context-only-when-needed**: plain strings stay plain (empty context); only strings that *acquire* context (via derivation interpolation, `toFile`, `path`, `getContext`/`appendContext`) become `NixString`. Most code paths untouched; the require/force layer normalizes.
3. **Side table**: impossible for primitives (no identity).

**Decision: option 2.** Introduce `NixString { value, context }`. `requireString`/`force`/string coercion return the underlying `.value`; a new `asNixString(x)` exposes context when a builtin needs it. `InterpolatedString.toString()` accumulates context from any derivation-output / NixString parts and yields a `NixString` when context is non-empty (else a plain string, to keep the common path cheap).

### Context shape
Mirror Nix: a map from store path → element. Elements:
- `{ kind: "output", drvPath, outputs: Set<string> }` — from a derivation output.
- `{ kind: "path" }` — a plain source store path (from `builtins.path`/`toFile`/source).
- `{ kind: "allOutputs"/"drvDeep" }` — from `addDrvOutputDependencies` (rare; can defer).

### Builtins to implement (currently stubs)
- `getContext s` → attrset form Nix uses: `{ "<storePath>" = { outputs=[…]; allOutputs=…; path=…; }; }`.
- `hasContext s` → context non-empty.
- `unsafeDiscardStringContext s` → `.value` with empty context.
- `appendContext s ctx` → merge.
- `unsafeDiscardOutputDependency`, `addDrvOutputDependencies`, `addErrorContext` (error-context is orthogonal; keep as value pass-through but don't drop).
- Context propagation through `+`, `concatStrings*`, `replaceStrings`, `substring`, `toString`, string interpolation.

### How `derivation()` consumes it
When building env/args, for each attr value: `force`, then collect context from (a) derivation-output objects (Part 1) and (b) `NixString` context. Union → `inputDrvs` (output kind, grouped by drvPath) and `inputSrcs` (path kind). This finally makes `inputSrcs` real and lets context-via-strings contribute to `inputDrvs`.

### Sequencing
Part 1 (output objects) lands first and independently. Part 2 (string context) builds on it; ship `getContext`/`hasContext`/`unsafeDiscardStringContext` + interpolation propagation first (covers most nixpkgs lib usage), defer the exotic `addDrvOutputDependencies`.

---

## Part 3 — Recursive flake inputs (flakes referencing flakes)

### Problem
`getFlake` stubs inputs: `inputs.nixpkgs = {_type:"flake-input-stub", url}`. So `outputs = { self, nixpkgs }: …` gets a stub, not the real nixpkgs flake. Flakes can't reference other flakes.

### Design
Make `getFlake` (and the flake entry path in `denix_build`) recursively resolve inputs:
1. Parse `inputs` spec: each input has `url` (or nested `{ url, inputs.X.follows, flake=false }`). Normalize to a flake ref.
2. For each input, `resolvedInput = await getFlake(inputUrl)` — reusing the existing real fetchers (github/git/tarball/registry). `flake = false` inputs are fetched as plain sources (fetchTree), not evaluated.
3. Handle `inputs.X.follows = "Y"` (dedupe a transitive input to a sibling).
4. Pass the resolved inputs (each with its `outputs`, `sourceInfo`, etc.) plus `self` to `outputsFn`.
5. **Cycle/dedup**: cache by locked ref (a flake may appear many times — nixpkgs especially). Detect cycles via an in-progress set.

### flake.lock
- If `flake.lock` exists, use its **locked** node revs/narHashes to fetch *exact* inputs (reproducible), instead of the floating `url`. Parse the `nodes`/`root`/`inputs` graph; resolve each input to its locked node.
- If absent, fetch floating (current behavior for source) and optionally synthesize a lock in-memory.
- This is what makes "flake references another flake" reproducible and is the correct path for `github:owner/repo` inputs.

### Networking concerns (user priority)
- Fetchers already hit the network and cache to the store; reuse them. Add caching keyed by locked ref so a big input (nixpkgs) is fetched once.
- Respect `DENIX_STORE_ROOT`. Surface clear errors on network failure (don't silently stub).
- `github:` flakes: fetch the tarball of the locked rev (fast, no full clone) — fetchTree already does this.

### Sequencing
This track is largely independent of Parts 1–2 and is high user priority. Order within it: (a) recursive eval of path/github inputs without lock → (b) flake.lock-driven locking → (c) `follows`/`flake=false` edge cases.

---

## Overall order of work
1. **Part 1**: derivation outputs as objects + `collectDeps`/`inputDrvs` grouping by output → unlocks multi-output + non-default refs (the goal). Verify drvPath byte-match vs Nix for a multi-output derivation.
2. **Part 3a**: recursive flake inputs (path + github, no lock) so a flake can reference another flake; then 3b flake.lock.
3. **Part 2**: string context (`NixString` + interpolation propagation + the context builtins), then wire into `derivation()` for `inputSrcs` and context-via-string `inputDrvs`.

Each step is gated on: full non-network test suite stays green, and drvPath/outPath stay byte-exact vs real `nix` for the relevant cases.
