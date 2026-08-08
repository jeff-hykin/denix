/**
 * Tests for lazy self-referential fixed points, the pattern nixpkgs
 * lib/systems/default.nix uses for `final`:
 *
 *     final = { ... } // mapAttrs (n: v: v final.parsed) inspect.predicates
 *
 * mapAttrs must be lazy in its produced values (and must not force the input
 * attrset's values just to iterate keys), or evaluating `final` re-enters
 * `final`'s own getter mid-computation.
 */

import { loadAndEvaluateSync } from "../import_loader.js"
import { createRuntime, builtins, operators, InterpolatedString, Path, mkThunk, force } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"

const _rt = createRuntime()
const runtime = {
    builtins,
    operators,
    InterpolatedString,
    Path,
    createFunc: _rt.createFunc,
    createScope: _rt.createScope,
    defGetter: _rt.defGetter,
    apply: _rt.apply,
    set: _rt.set,
    force,
    mkThunk,
    scopeStack: _rt.runtime.scopeStack,
    attachScopeHelpers: _rt.runtime.attachScopeHelpers,
}

function evalNix(source) {
    const tmp = Deno.makeTempFileSync({ suffix: ".nix" })
    try {
        Deno.writeTextFileSync(tmp, source)
        return loadAndEvaluateSync(tmp, runtime)
    } finally {
        Deno.removeSync(tmp)
    }
}

Deno.test("mapAttrs values are lazy (self-referential fixed point)", () => {
    const result = evalNix(`
        let
          final = { a = 1; } // builtins.mapAttrs (n: v: v final.a) { p = (x: x + 1); };
        in final.p
    `)
    assertEquals(force(result), 2n)
})

Deno.test("mapAttrs does not force input attr values when iterating keys", () => {
    const result = evalNix(`
        let
          input = { good = 1; bad = builtins.throw "should not be forced"; };
          mapped = builtins.mapAttrs (n: v: v) input;
        in mapped.good
    `)
    assertEquals(force(result), 1n)
})

Deno.test("`or` default is lazy (throw not evaluated on hit)", () => {
    const result = evalNix(`
        let
          set = { "2" = "two"; };
        in [
          (set."2" or (builtins.throw "should not evaluate"))
          (set.missing or "fallback")
          ({ a.b = 1; }.a.c or 9)
        ]
    `)
    const forced = force(result).map(force)
    assertEquals(forced, ["two", "fallback", 9n])
})

Deno.test("nixpkgs mkSkeletonFromList-style dispatch on toString length", () => {
    const result = evalNix(`
        let
          l = builtins.filter builtins.isString (builtins.split "-" "aarch64-darwin");
        in { "1" = "one"; "2" = "two"; }.\${builtins.toString (builtins.length l)}
          or (builtins.throw "invalid number of components")
    `)
    assertEquals(force(result), "two")
})

Deno.test("nixpkgs elaborate-style predicate fixed point", () => {
    // Shape of lib.systems.elaborate: predicates applied to final.parsed
    const result = evalNix(`
        let
          predicates = { isFoo = parsed: parsed.cpu == "foo"; isBar = parsed: parsed.cpu == "bar"; };
          final = { parsed = { cpu = "foo"; }; }
            // builtins.mapAttrs (n: v: v final.parsed) predicates;
        in [ final.isFoo final.isBar ]
    `)
    const forced = force(result).map(force)
    assertEquals(forced, [true, false])
})
