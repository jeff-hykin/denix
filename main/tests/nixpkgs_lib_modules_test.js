/**
 * Tests for nixpkgs lib/modules.nix
 *
 * This file tests the NixOS module system functions from lib/modules.nix.
 * Focus on testable pure functions that create/manipulate module structures.
 */

import { assertEquals, assertExists } from "jsr:@std/assert@1"
import { convertToJs } from "../translator.js"

// Helper: Convert BigInt or number to float
const toFloat = (value) => typeof value == "bigint" ? `${value}` - 0 : value

// Minimal builtins for tests (matching runtime.js signatures - curried)
const builtins = {
    concatMap: (fn) => (list) => {
        const result = []
        for (const item of list) {
            const mapped = fn(item)
            if (Array.isArray(mapped)) {
                result.push(...mapped)
            } else {
                result.push(mapped)
            }
        }
        return result
    },
    mapAttrs: (fn) => (obj) => {
        const result = {}
        for (const [key, value] of Object.entries(obj)) {
            result[key] = fn(key)(value)
        }
        return result
    },
    map: (fn) => (list) => list.map(fn),
    filter: (fn) => (list) => list.filter(fn),
    "foldl'": (op) => (nul) => (list) => list.reduce((acc, each) => op(acc)(each), nul),
    sort: (cmp) => (list) => [...list].sort((a, b) => cmp(a)(b) ? -1 : 1),
    isBool: (v) => typeof v === "boolean",
    throw: (msg) => { throw new Error(msg) },
}

const operators = {
    add: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a + b : toFloat(a) + toFloat(b),
    subtract: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a - b : toFloat(a) - toFloat(b),
    multiply: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a * b : toFloat(a) * toFloat(b),
    divide: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a / b : toFloat(a) / toFloat(b),
    lessThan: (a, b) => a < b,
    greaterThan: (a, b) => a > b,
    update: (a, b) => ({ ...a, ...b }),
    equal: (a, b) => {
        if (a === b) return true
        if (typeof a !== typeof b) return false
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false
            return a.every((v, i) => operators.equal(v, b[i]))
        }
        if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
            const aKeys = Object.keys(a).sort()
            const bKeys = Object.keys(b).sort()
            if (aKeys.length !== bKeys.length) return false
            if (!aKeys.every((k, i) => k === bKeys[i])) return false
            return aKeys.every(k => operators.equal(a[k], b[k]))
        }
        return false
    },
    notEqual: (a, b) => !operators.equal(a, b),
    and: (a, b) => a && b,
    or: (a, b) => a || b,
    negate: (a) => !a,
    hasAttr: (obj, attr) => obj && Object.prototype.hasOwnProperty.call(obj, attr),
    ifThenElse: (condition, thenFn, elseFn) => {
        if (typeof condition !== "boolean") {
            throw new Error(`error: expected a Boolean but found ${typeof condition}`)
        }
        return condition ? thenFn() : elseFn()
    },
    selectOrDefault: (obj, path, defaultValue) => {
        let current = obj
        for (const key of path) {
            if (current == null || typeof current !== "object" || !(key in current)) {
                return defaultValue
            }
            current = current[key]
        }
        return current
    },
}

// Test harness for evaluating Nix code through translator
function evalNixCode(nixCode) {
    let jsCode = convertToJs(nixCode)

    // Create runtime context with builtins in initial scope
    // Need both individual builtins AND the builtins object for `inherit (builtins)` to work
    const runtime = {
        scopeStack: [{ ...builtins, builtins, operators }],
    }

    // Strip import statement if present (it imports Path, InterpolatedString, operators, createRuntime)
    if (jsCode.includes('import {')) {
        jsCode = jsCode.replace(/^import \{[^}]*\} from [^\n]*\n/m, '')
        jsCode = jsCode.replace(/^const runtime = createRuntime\(\)[;\n]*/mg, '')
    }

    // Use eval with runtime in scope
    return eval(jsCode)
}

Deno.test("modules.nix - mkIf with true condition", () => {
    const nixCode = `
        let
            mkIf = condition: content: {
                _type = "if";
                inherit condition content;
            };
        in
        mkIf true "content"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "if")
    assertEquals(result.condition, true)
    assertEquals(result.content, "content")
})

Deno.test("modules.nix - mkIf with false condition", () => {
    const nixCode = `
        let
            mkIf = condition: content: {
                _type = "if";
                inherit condition content;
            };
        in
        mkIf false "content"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "if")
    assertEquals(result.condition, false)
    assertEquals(result.content, "content")
})

Deno.test("modules.nix - mkMerge with list of values", () => {
    const nixCode = `
        let
            mkMerge = contents: {
                _type = "merge";
                inherit contents;
            };
        in
        mkMerge [ 1 2 3 ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "merge")
    assertEquals(result.contents, [1n, 2n, 3n])
})

Deno.test("modules.nix - mkMerge with attrsets", () => {
    const nixCode = `
        let
            mkMerge = contents: {
                _type = "merge";
                inherit contents;
            };
        in
        mkMerge [ { a = 1; } { b = 2; } ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "merge")
    assertEquals(result.contents.length, 2)
    assertEquals(result.contents[0].a, 1n)
    assertEquals(result.contents[1].b, 2n)
})

Deno.test("modules.nix - mkOverride with custom priority", () => {
    const nixCode = `
        let
            mkOverride = priority: content: {
                _type = "override";
                inherit priority content;
            };
        in
        mkOverride 50 "forced"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "override")
    assertEquals(result.priority, 50n)
    assertEquals(result.content, "forced")
})

Deno.test("modules.nix - mkDefault (priority 1000)", () => {
    const nixCode = `
        let
            mkOverride = priority: content: {
                _type = "override";
                inherit priority content;
            };
            mkDefault = mkOverride 1000;
        in
        mkDefault "default"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "override")
    assertEquals(result.priority, 1000n)
    assertEquals(result.content, "default")
})

Deno.test("modules.nix - mkForce (priority 50)", () => {
    const nixCode = `
        let
            mkOverride = priority: content: {
                _type = "override";
                inherit priority content;
            };
            mkForce = mkOverride 50;
        in
        mkForce "forced"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "override")
    assertEquals(result.priority, 50n)
    assertEquals(result.content, "forced")
})

Deno.test("modules.nix - mkOrder with custom priority", () => {
    const nixCode = `
        let
            mkOrder = priority: content: {
                _type = "order";
                inherit priority content;
            };
        in
        mkOrder 100 "early"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "order")
    assertEquals(result.priority, 100n)
    assertEquals(result.content, "early")
})

Deno.test("modules.nix - mkBefore (priority 500)", () => {
    const nixCode = `
        let
            mkOrder = priority: content: {
                _type = "order";
                inherit priority content;
            };
            mkBefore = mkOrder 500;
        in
        mkBefore "before"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "order")
    assertEquals(result.priority, 500n)
    assertEquals(result.content, "before")
})

Deno.test("modules.nix - mkAfter (priority 1500)", () => {
    const nixCode = `
        let
            mkOrder = priority: content: {
                _type = "order";
                inherit priority content;
            };
            mkAfter = mkOrder 1500;
        in
        mkAfter "after"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "order")
    assertEquals(result.priority, 1500n)
    assertEquals(result.content, "after")
})

Deno.test("modules.nix - defaultOrderPriority constant", () => {
    const nixCode = `
        let
            defaultOrderPriority = 1000;
        in
        defaultOrderPriority
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, 1000n)
})

Deno.test("modules.nix - defaultOverridePriority constant", () => {
    const nixCode = `
        let
            defaultOverridePriority = 100;
        in
        defaultOverridePriority
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, 100n)
})

Deno.test("modules.nix - pushDownProperties with plain attrset", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap mapAttrs map;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };
            mkOverride = priority: content: { _type = "override"; inherit priority content; };

            pushDownProperties = cfg:
                if cfg._type or "" == "merge" then
                    concatMap pushDownProperties cfg.contents
                else if cfg._type or "" == "if" then
                    map (mapAttrs (n: v: mkIf cfg.condition v)) (pushDownProperties cfg.content)
                else if cfg._type or "" == "override" then
                    map (mapAttrs (n: v: mkOverride cfg.priority v)) (pushDownProperties cfg.content)
                else
                    [ cfg ];
        in
        pushDownProperties { a = 1; b = 2; }
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 1)
    assertEquals(result[0].a, 1n)
    assertEquals(result[0].b, 2n)
})

Deno.test("modules.nix - pushDownProperties with mkMerge", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap mapAttrs map;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };
            mkOverride = priority: content: { _type = "override"; inherit priority content; };

            pushDownProperties = cfg:
                if cfg._type or "" == "merge" then
                    concatMap pushDownProperties cfg.contents
                else if cfg._type or "" == "if" then
                    map (mapAttrs (n: v: mkIf cfg.condition v)) (pushDownProperties cfg.content)
                else if cfg._type or "" == "override" then
                    map (mapAttrs (n: v: mkOverride cfg.priority v)) (pushDownProperties cfg.content)
                else
                    [ cfg ];
        in
        pushDownProperties (mkMerge [ { a = 1; } { b = 2; } ])
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 2)
    assertEquals(result[0].a, 1n)
    assertEquals(result[1].b, 2n)
})

Deno.test("modules.nix - pushDownProperties with mkIf", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap mapAttrs map;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };
            mkOverride = priority: content: { _type = "override"; inherit priority content; };

            pushDownProperties = cfg:
                if cfg._type or "" == "merge" then
                    concatMap pushDownProperties cfg.contents
                else if cfg._type or "" == "if" then
                    map (mapAttrs (n: v: mkIf cfg.condition v)) (pushDownProperties cfg.content)
                else if cfg._type or "" == "override" then
                    map (mapAttrs (n: v: mkOverride cfg.priority v)) (pushDownProperties cfg.content)
                else
                    [ cfg ];
        in
        pushDownProperties (mkIf true { a = 1; b = 2; })
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 1)
    assertEquals(result[0].a._type, "if")
    assertEquals(result[0].a.condition, true)
    assertEquals(result[0].a.content, 1n)
    assertEquals(result[0].b._type, "if")
    assertEquals(result[0].b.condition, true)
    assertEquals(result[0].b.content, 2n)
})

Deno.test("modules.nix - pushDownProperties with mkOverride", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap mapAttrs map;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };
            mkOverride = priority: content: { _type = "override"; inherit priority content; };

            pushDownProperties = cfg:
                if cfg._type or "" == "merge" then
                    concatMap pushDownProperties cfg.contents
                else if cfg._type or "" == "if" then
                    map (mapAttrs (n: v: mkIf cfg.condition v)) (pushDownProperties cfg.content)
                else if cfg._type or "" == "override" then
                    map (mapAttrs (n: v: mkOverride cfg.priority v)) (pushDownProperties cfg.content)
                else
                    [ cfg ];
        in
        pushDownProperties (mkOverride 50 { a = 1; b = 2; })
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 1)
    assertEquals(result[0].a._type, "override")
    assertEquals(result[0].a.priority, 50n)
    assertEquals(result[0].a.content, 1n)
    assertEquals(result[0].b._type, "override")
    assertEquals(result[0].b.priority, 50n)
    assertEquals(result[0].b.content, 2n)
})

Deno.test("modules.nix - dischargeProperties with plain value", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties { a = 1; }
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 1)
    assertEquals(result[0].a, 1n)
})

Deno.test("modules.nix - dischargeProperties with mkMerge", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;
            mkMerge = contents: { _type = "merge"; inherit contents; };

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties (mkMerge [ 1 2 3 ])
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, [1n, 2n, 3n])
})

Deno.test("modules.nix - dischargeProperties with mkIf true", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;
            mkIf = condition: content: { _type = "if"; inherit condition content; };

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties (mkIf true "content")
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, ["content"])
})

Deno.test("modules.nix - dischargeProperties with mkIf false", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;
            mkIf = condition: content: { _type = "if"; inherit condition content; };

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties (mkIf false "content")
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, [])
})

Deno.test("modules.nix - dischargeProperties nested mkMerge with mkIf", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties (mkMerge [ 1 (mkIf true 2) (mkIf false 3) ])
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, [1n, 2n])
})

Deno.test("modules.nix - filterOverrides with mixed priorities", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap foldl';
            min = a: b: if a < b then a else b;
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            defaultOverridePriority = 100;

            filterOverrides = defs: (filterOverrides' defs).values;
            filterOverrides' = defs:
                let
                    getPrio = def: if def.value._type or "" == "override" then def.value.priority else defaultOverridePriority;
                    highestPrio = foldl' (prio: def: min (getPrio def) prio) 9999 defs;
                    strip = def: if def.value._type or "" == "override" then def // { value = def.value.content; } else def;
                in
                {
                    values = concatMap (def: if getPrio def == highestPrio then [ (strip def) ] else []) defs;
                    inherit highestPrio;
                };
        in
        filterOverrides [
            { file = "/1"; value = mkOverride 10 "a"; }
            { file = "/2"; value = mkOverride 20 "b"; }
            { file = "/3"; value = "z"; }
            { file = "/4"; value = mkOverride 10 "d"; }
        ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 2)
    assertEquals(result[0].file, "/1")
    assertEquals(result[0].value, "a")
    assertEquals(result[1].file, "/4")
    assertEquals(result[1].value, "d")
})

Deno.test("modules.nix - filterOverrides with all default priority", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap foldl';
            min = a: b: if a < b then a else b;
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            defaultOverridePriority = 100;

            filterOverrides = defs: (filterOverrides' defs).values;
            filterOverrides' = defs:
                let
                    getPrio = def: if def.value._type or "" == "override" then def.value.priority else defaultOverridePriority;
                    highestPrio = foldl' (prio: def: min (getPrio def) prio) 9999 defs;
                    strip = def: if def.value._type or "" == "override" then def // { value = def.value.content; } else def;
                in
                {
                    values = concatMap (def: if getPrio def == highestPrio then [ (strip def) ] else []) defs;
                    inherit highestPrio;
                };
        in
        filterOverrides [
            { file = "/1"; value = "a"; }
            { file = "/2"; value = "b"; }
            { file = "/3"; value = "c"; }
        ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 3)
    assertEquals(result[0].value, "a")
    assertEquals(result[1].value, "b")
    assertEquals(result[2].value, "c")
})

Deno.test("modules.nix - sortProperties with mixed priorities", () => {
    const nixCode = `
        let
            inherit (builtins) map sort;
            mkOrder = priority: content: { _type = "order"; inherit priority content; };
            defaultOrderPriority = 1000;

            sortProperties = defs:
                let
                    strip = def:
                        if def.value._type or "" == "order" then
                            def // {
                                value = def.value.content;
                                inherit (def.value) priority;
                            }
                        else
                            def;
                    defs' = map strip defs;
                    compare = a: b: (a.priority or defaultOrderPriority) < (b.priority or defaultOrderPriority);
                in
                sort compare defs';
        in
        sortProperties [
            { file = "/1"; value = mkOrder 1500 "last"; }
            { file = "/2"; value = mkOrder 500 "first"; }
            { file = "/3"; value = "middle"; }
        ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 3)
    assertEquals(result[0].file, "/2")
    assertEquals(result[0].value, "first")
    assertEquals(result[0].priority, 500n)
    assertEquals(result[1].file, "/3")
    assertEquals(result[1].value, "middle")
    assertEquals(result[2].file, "/1")
    assertEquals(result[2].value, "last")
    assertEquals(result[2].priority, 1500n)
})

Deno.test("modules.nix - sortProperties with all default priority", () => {
    const nixCode = `
        let
            inherit (builtins) map sort;
            mkOrder = priority: content: { _type = "order"; inherit priority content; };
            defaultOrderPriority = 1000;

            sortProperties = defs:
                let
                    strip = def:
                        if def.value._type or "" == "order" then
                            def // {
                                value = def.value.content;
                                inherit (def.value) priority;
                            }
                        else
                            def;
                    defs' = map strip defs;
                    compare = a: b: (a.priority or defaultOrderPriority) < (b.priority or defaultOrderPriority);
                in
                sort compare defs';
        in
        sortProperties [
            { file = "/1"; value = "a"; }
            { file = "/2"; value = "b"; }
            { file = "/3"; value = "c"; }
        ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.length, 3)
    // When all have same priority, sort is stable (maintains original order)
    assertEquals(result[0].file, "/1")
    assertEquals(result[1].file, "/2")
    assertEquals(result[2].file, "/3")
})

Deno.test("modules.nix - mkAssert with true assertion", () => {
    const nixCode = `
        let
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkAssert = assertion: message: content:
                mkIf (if assertion then true else throw "Failed assertion: \${message}") content;
        in
        mkAssert true "test message" "content"
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "if")
    assertEquals(result.condition, true)
    assertEquals(result.content, "content")
})

Deno.test("modules.nix - mkDefinition creates definition structure", () => {
    const nixCode = `
        let
            mkDefinition = args@{ file, value, ... }: args // { _type = "definition"; };
        in
        mkDefinition { file = "/test.nix"; value = "test"; }
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "definition")
    assertEquals(result.file, "/test.nix")
    assertEquals(result.value, "test")
})

Deno.test("modules.nix - mkDerivedConfig with opt value", () => {
    const nixCode = `
        let
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            defaultOverridePriority = 100;
            mkDerivedConfig = opt: f: mkOverride (opt.highestPrio or defaultOverridePriority) (f opt.value);
        in
        mkDerivedConfig { value = 42; } (x: x * 2)
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "override")
    assertEquals(result.priority, 100n)
    assertEquals(result.content, 84n)
})

Deno.test("modules.nix - mkDerivedConfig with custom priority", () => {
    const nixCode = `
        let
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            defaultOverridePriority = 100;
            mkDerivedConfig = opt: f: mkOverride (opt.highestPrio or defaultOverridePriority) (f opt.value);
        in
        mkDerivedConfig { value = 10; highestPrio = 50; } (x: x + 5)
    `
    const result = evalNixCode(nixCode)
    assertEquals(result._type, "override")
    assertEquals(result.priority, 50n)
    assertEquals(result.content, 15n)
})

Deno.test("modules.nix - complex nested properties", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap isBool;
            mkIf = condition: content: { _type = "if"; inherit condition content; };
            mkMerge = contents: { _type = "merge"; inherit contents; };

            dischargeProperties = def:
                if def._type or "" == "merge" then
                    concatMap dischargeProperties def.contents
                else if def._type or "" == "if" then
                    if isBool def.condition then
                        if def.condition then dischargeProperties def.content else []
                    else
                        throw "mkIf called with a non-Boolean condition"
                else
                    [ def ];
        in
        dischargeProperties (mkMerge [
            1
            (mkIf true 2)
            (mkIf true (mkIf false 3))
            (mkMerge [ 4 5 ])
        ])
    `
    const result = evalNixCode(nixCode)
    assertEquals(result, [1n, 2n, 4n, 5n])
})

Deno.test("modules.nix - filterOverrides' returns both values and highestPrio", () => {
    const nixCode = `
        let
            inherit (builtins) concatMap foldl';
            min = a: b: if a < b then a else b;
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            defaultOverridePriority = 100;

            filterOverrides' = defs:
                let
                    getPrio = def: if def.value._type or "" == "override" then def.value.priority else defaultOverridePriority;
                    highestPrio = foldl' (prio: def: min (getPrio def) prio) 9999 defs;
                    strip = def: if def.value._type or "" == "override" then def // { value = def.value.content; } else def;
                in
                {
                    values = concatMap (def: if getPrio def == highestPrio then [ (strip def) ] else []) defs;
                    inherit highestPrio;
                };
        in
        filterOverrides' [
            { file = "/1"; value = mkOverride 10 "a"; }
            { file = "/2"; value = mkOverride 20 "b"; }
        ]
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.highestPrio, 10n)
    assertEquals(result.values.length, 1)
    assertEquals(result.values[0].value, "a")
})

Deno.test("modules.nix - multiple mkOverride priorities", () => {
    const nixCode = `
        let
            mkOverride = priority: content: { _type = "override"; inherit priority content; };
            mkDefault = mkOverride 1000;
            mkForce = mkOverride 50;
            mkVMOverride = mkOverride 10;
        in
        {
            default = mkDefault "default";
            force = mkForce "force";
            vm = mkVMOverride "vm";
        }
    `
    const result = evalNixCode(nixCode)
    assertEquals(result.default.priority, 1000n)
    assertEquals(result.force.priority, 50n)
    assertEquals(result.vm.priority, 10n)
})
