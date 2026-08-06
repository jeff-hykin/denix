#!/usr/bin/env deno test --allow-all
/**
 * Test translator against patterns from nixpkgs trivial.nix
 *
 * These tests extract pure functions from trivial.nix that don't require
 * file I/O or the module system, and run them through the real pipeline:
 * builtins.import → loadAndEvaluateSync → translated module evaluation.
 */

import { assertEquals } from "jsr:@std/assert"
import { builtins } from "../runtime.js"

// Evaluate an inline Nix snippet through the real import pipeline
const evalNix = (nixCode) => {
    const tmpPath = Deno.makeTempFileSync({ suffix: ".nix" })
    try {
        Deno.writeTextFileSync(tmpPath, nixCode)
        return builtins.import(tmpPath)
    } finally {
        Deno.removeSync(tmpPath)
    }
}

// Force lazy attrset getters into a plain object for deep comparison
const forced = (attrset) => ({ ...attrset })

Deno.test("trivial - id function", () => {
    const result = evalNix(`
        let id = x: x;
        in id 42
    `)
    assertEquals(result, 42n)
})

Deno.test("trivial - const function", () => {
    const result = evalNix(`
        let const = x: y: x;
            f = const 5;
        in f 10
    `)
    assertEquals(result, 5n)
})

Deno.test("trivial - pipe function (builtins.foldl')", () => {
    const result = evalNix(`
        let pipe = builtins.foldl' (x: f: f x);
        in pipe 2 [
            (x: x + 2)
            (x: x * 2)
        ]
    `)
    assertEquals(result, 8n)
})

Deno.test("trivial - concat function", () => {
    const result = evalNix(`
        let concat = x: y: x ++ y;
        in concat [ 1 2 ] [ 3 4 ]
    `)
    assertEquals(result, [1n, 2n, 3n, 4n])
})

Deno.test("trivial - or function", () => {
    const result = evalNix(`
        let or = x: y: x || y;
        in {
            t_t = or true true;
            t_f = or true false;
            f_t = or false true;
            f_f = or false false;
        }
    `)
    assertEquals(forced(result), { t_t: true, t_f: true, f_t: true, f_f: false })
})

Deno.test("trivial - and function", () => {
    const result = evalNix(`
        let and = x: y: x && y;
        in {
            t_t = and true true;
            t_f = and true false;
            f_t = and false true;
            f_f = and false false;
        }
    `)
    assertEquals(forced(result), { t_t: true, t_f: false, f_t: false, f_f: false })
})

Deno.test("trivial - xor function", () => {
    const result = evalNix(`
        let xor = x: y: (!x) != (!y);
        in {
            t_t = xor true true;
            t_f = xor true false;
            f_t = xor false true;
            f_f = xor false false;
        }
    `)
    assertEquals(forced(result), { t_t: false, t_f: true, f_t: true, f_f: false })
})

Deno.test("trivial - boolToString", () => {
    const result = evalNix(`
        let boolToString = b: if b then "true" else "false";
        in {
            t = boolToString true;
            f = boolToString false;
        }
    `)
    assertEquals(forced(result), { t: "true", f: "false" })
})

Deno.test("trivial - boolToYesNo", () => {
    const result = evalNix(`
        let boolToYesNo = b: if b then "yes" else "no";
        in {
            t = boolToYesNo true;
            f = boolToYesNo false;
        }
    `)
    assertEquals(forced(result), { t: "yes", f: "no" })
})

Deno.test("trivial - mergeAttrs (// operator)", () => {
    const result = evalNix(`
        let mergeAttrs = x: y: x // y;
        in mergeAttrs { a = 1; b = 2; } { b = 3; c = 4; }
    `)
    assertEquals(forced(result), { a: 1n, b: 3n, c: 4n })
})

Deno.test("trivial - flip function", () => {
    const result = evalNix(`
        let flip = f: a: b: f b a;
            concat = x: y: x ++ y;
        in flip concat [1] [2]
    `)
    assertEquals(result, [2n, 1n])
})

Deno.test("trivial - defaultTo function (null handling)", () => {
    const result = evalNix(`
        let defaultTo = default: maybeValue: if maybeValue != null then maybeValue else default;
        in {
            withNull = defaultTo "default" null;
            withValue = defaultTo "default" "foo";
            withFalse = defaultTo "default" false;
        }
    `)
    assertEquals(forced(result), { withNull: "default", withValue: "foo", withFalse: false })
})

Deno.test("trivial - mapNullable function", () => {
    const result = evalNix(`
        let mapNullable = f: a: if a == null then a else f a;
        in {
            withNull = mapNullable (x: x + 1) null;
            withValue = mapNullable (x: x + 1) 22;
        }
    `)
    assertEquals(forced(result), { withNull: null, withValue: 23n })
})

Deno.test("trivial - min function", () => {
    const result = evalNix(`
        let min = x: y: if x < y then x else y;
        in {
            a = min 5 3;
            b = min 2 8;
            c = min 4 4;
        }
    `)
    assertEquals(forced(result), { a: 3n, b: 2n, c: 4n })
})

Deno.test("trivial - max function", () => {
    const result = evalNix(`
        let max = x: y: if x > y then x else y;
        in {
            a = max 5 3;
            b = max 2 8;
            c = max 4 4;
        }
    `)
    assertEquals(forced(result), { a: 5n, b: 8n, c: 4n })
})

Deno.test("trivial - mod function", () => {
    const result = evalNix(`
        let mod = base: int: base - (int * (builtins.div base int));
        in {
            a = mod 11 10;
            b = mod 1 10;
            c = mod 25 7;
        }
    `)
    assertEquals(forced(result), { a: 1n, b: 1n, c: 4n })
})

Deno.test("trivial - compare function", () => {
    const result = evalNix(`
        let compare = a: b:
            if a < b then -1
            else if a > b then 1
            else 0;
        in {
            lt = compare 1 2;
            gt = compare 3 2;
            eq = compare 5 5;
        }
    `)
    assertEquals(forced(result), { lt: -1n, gt: 1n, eq: 0n })
})

Deno.test("trivial - toFunction", () => {
    const result = evalNix(`
        let isFunction = f: builtins.isFunction f;
            toFunction = v: if isFunction v then v else k: v;
        in {
            fromValue = toFunction 1 999;
            fromFunc = toFunction (x: x + 1) 2;
        }
    `)
    assertEquals(forced(result), { fromValue: 1n, fromFunc: 3n })
})

Deno.test("trivial - complex pipe", () => {
    const result = evalNix(`
        let pipe = builtins.foldl' (x: f: f x);
            double = x: x * 2;
            add3 = x: x + 3;
            square = x: x * x;
        in pipe 2 [ double add3 square ]
    `)
    // 2 -> double -> 4 -> add3 -> 7 -> square -> 49
    assertEquals(result, 49n)
})

Deno.test("trivial - splitByAndCompare", () => {
    const result = evalNix(`
        let compare = a: b: if a < b then -1 else if a > b then 1 else 0;
            hasPrefix = prefix: str:
                builtins.substring 0 (builtins.stringLength prefix) str == prefix;
            splitByAndCompare = p: yes: no: a: b:
                if p a then
                    if p b then yes a b else -1
                else if p b then 1
                else no a b;
            cmp = splitByAndCompare (hasPrefix "foo") compare compare;
        in {
            both_no_prefix = cmp "a" "z";
            both_with_prefix = cmp "fooa" "fooz";
            only_a_with_prefix = cmp "fooa" "a";
        }
    `)
    assertEquals(forced(result), { both_no_prefix: -1n, both_with_prefix: -1n, only_a_with_prefix: -1n })
})
