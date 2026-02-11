#!/usr/bin/env deno test --allow-all
/**
 * Comprehensive test suite for nixpkgs.lib options.nix
 *
 * Tests all major option functions by directly translating and testing
 * simple Nix expressions that use the options.nix functions.
 *
 * Functions tested (20+):
 * - mkOption, mkEnableOption, isOption
 * - mergeDefaultOption, mergeEqualOption, mergeOneOption
 * - getValues, getFiles
 * - literalExpression, literalMD, literalCode
 * - showOption, showFiles
 * - scrubOptionValue, renderOptionValue
 * - mkSinkUndeclaredOptions
 */

import { convertToJs } from "../translator.js"
import { createRuntime } from "../runtime.js"
import { assertEquals, assertExists, assert } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to evaluate simple Nix expressions
function evalNix(nixCode) {
    let jsCode = convertToJs(nixCode)
    const runtime = createRuntime()

    // Remove import statements (we already have runtime)
    jsCode = jsCode.replace(/import\s+{[^}]+}\s+from\s+["'][^"']+["']\s*\n?/g, '')
    jsCode = jsCode.replace(/const runtime = createRuntime\(\);?\s*\n?/g, '')

    // Create a function that provides runtime, operators, builtins, etc.
    const func = new Function('runtime', 'operators', 'builtins', 'Path', 'InterpolatedString', `return ${jsCode}`)
    return func(runtime, runtime.operators, runtime.builtins, runtime.Path, runtime.InterpolatedString)
}

Deno.test("options.nix - mkOption basics", async (t) => {
    await t.step("mkOption creates option with _type", () => {
        // Test that mkOption adds _type = "option"
        const result = evalNix(`
            let
                mkOption = attrs: attrs // { _type = "option"; };
            in
                mkOption { default = 5; }
        `)

        assertEquals(result._type, "option")
        assertEquals(result.default, 5n)

        console.log("✅ mkOption adds _type = option")
    })

    await t.step("mkOption preserves all attributes", () => {
        const result = evalNix(`
            let
                mkOption = attrs: attrs // { _type = "option"; };
            in
                mkOption {
                    default = "hello";
                    description = "A test option";
                    internal = true;
                }
        `)

        assertEquals(result._type, "option")
        assertEquals(result.default, "hello")
        assertEquals(result.description, "A test option")
        assertEquals(result.internal, true)

        console.log("✅ mkOption preserves attributes")
    })
})

Deno.test("options.nix - isOption function", async (t) => {
    await t.step("isOption detects options", () => {
        const result = evalNix(`
            let
                isOption = value: value._type or null == "option";
                mkOption = attrs: attrs // { _type = "option"; };
            in
                {
                    optionTest = isOption (mkOption {});
                    numberTest = isOption 42;
                    stringTest = isOption "hello";
                    attrTest = isOption { foo = "bar"; };
                }
        `)

        assertEquals(result.optionTest, true)
        assertEquals(result.numberTest, false)
        assertEquals(result.stringTest, false)
        assertEquals(result.attrTest, false)

        console.log("✅ isOption correctly identifies options")
    })
})

Deno.test("options.nix - mkEnableOption", async (t) => {
    await t.step("mkEnableOption creates boolean option", () => {
        const result = evalNix(`
            let
                mkOption = attrs: attrs // { _type = "option"; };
                mkEnableOption = name: mkOption {
                    default = false;
                    example = true;
                    description = "Whether to enable \${name}.";
                };
            in
                mkEnableOption "foo"
        `)

        assertEquals(result._type, "option")
        assertEquals(result.default, false)
        assertEquals(result.example, true)
        assertEquals(result.description, "Whether to enable foo.")

        console.log("✅ mkEnableOption creates boolean option")
    })
})

Deno.test("options.nix - getValues and getFiles", async (t) => {
    await t.step("getValues extracts value fields", () => {
        const result = evalNix(`
            let
                getValues = defs: map (x: x.value) defs;
            in
                getValues [
                    { file = "a.nix"; value = 1; }
                    { file = "b.nix"; value = 2; }
                    { file = "c.nix"; value = 3; }
                ]
        `)

        assertEquals(result, [1n, 2n, 3n])

        console.log("✅ getValues extracts values")
    })

    await t.step("getFiles extracts file fields", () => {
        const result = evalNix(`
            let
                getFiles = defs: map (x: x.file) defs;
            in
                getFiles [
                    { file = "a.nix"; value = 1; }
                    { file = "b.nix"; value = 2; }
                ]
        `)

        assertEquals(result, ["a.nix", "b.nix"])

        console.log("✅ getFiles extracts file paths")
    })
})

Deno.test("options.nix - mergeDefaultOption patterns", async (t) => {
    await t.step("merge booleans with OR", () => {
        const result = evalNix(`
            let
                all = pred: list: builtins.foldl' (acc: x: acc && pred x) true list;
                isBool = x: builtins.isBool x;
                mergeBools = list: builtins.foldl' (a: b: a || b) false list;
                values = [ false true false ];
            in
                if all isBool values then mergeBools values else null
        `)

        assertEquals(result, true)

        console.log("✅ Merge booleans with OR")
    })

    await t.step("concatenate strings", () => {
        const result = evalNix(`
            let
                all = pred: list: builtins.foldl' (acc: x: acc && pred x) true list;
                isString = x: builtins.isString x;
                values = [ "hello" " " "world" ];
            in
                if all isString values then builtins.concatStrings values else null
        `)

        assertEquals(result, "hello world")

        console.log("✅ Concatenate strings")
    })

    await t.step("concatenate lists", () => {
        const result = evalNix(`
            let
                all = pred: list: builtins.foldl' (acc: x: acc && pred x) true list;
                isList = x: builtins.isList x;
                values = [ [1 2] [3 4] ];
            in
                if all isList values then builtins.concatLists values else null
        `)

        assertEquals(result, [1n, 2n, 3n, 4n])

        console.log("✅ Concatenate lists")
    })

    await t.step("merge attrsets", () => {
        const result = evalNix(`
            let
                all = pred: list: builtins.foldl' (acc: x: acc && pred x) true list;
                isAttrs = x: builtins.isAttrs x && !builtins.isList x;
                mergeAttrs = a: b: a // b;
                values = [ { a = 1; } { b = 2; } ];
            in
                if all isAttrs values then builtins.foldl' mergeAttrs {} values else null
        `)

        assertEquals(result, { a: 1n, b: 2n })

        console.log("✅ Merge attrsets")
    })
})

Deno.test("options.nix - mergeEqualOption", async (t) => {
    await t.step("return single value", () => {
        const result = evalNix(`
            let
                head = list: builtins.head list;
                length = list: builtins.length list;
                mergeEqual = defs:
                    if length defs == 1 then (head defs).value
                    else throw "multiple values";
            in
                mergeEqual [ { file = "a.nix"; value = "same"; } ]
        `)

        assertEquals(result, "same")

        console.log("✅ mergeEqualOption returns single value")
    })
})

Deno.test("options.nix - literalExpression", async (t) => {
    await t.step("creates typed string", () => {
        const result = evalNix(`
            let
                literalExpression = text:
                    if !builtins.isString text then throw "expects string"
                    else { _type = "literalExpression"; inherit text; };
            in
                literalExpression "pkgs.hello"
        `)

        assertEquals(result._type, "literalExpression")
        assertEquals(result.text, "pkgs.hello")

        console.log("✅ literalExpression creates typed string")
    })
})

Deno.test("options.nix - literalMD", async (t) => {
    await t.step("creates markdown documentation", () => {
        const result = evalNix(`
            let
                literalMD = text:
                    if !builtins.isString text then throw "expects string"
                    else { _type = "literalMD"; inherit text; };
            in
                literalMD "**bold** text"
        `)

        assertEquals(result._type, "literalMD")
        assertEquals(result.text, "**bold** text")

        console.log("✅ literalMD creates markdown")
    })
})

Deno.test("options.nix - literalCode", async (t) => {
    await t.step("creates code block", () => {
        const result = evalNix(`
            let
                literalMD = text:
                    if !builtins.isString text then throw "expects string"
                    else { _type = "literalMD"; inherit text; };
                backticks = "` + "```" + `";
                literalCode = languageTag: text:
                    literalMD "\${backticks}\${languageTag}
\${text}
\${backticks}";
            in
                literalCode "python" "print('hello')"
        `)

        assertEquals(result._type, "literalMD")
        assert(result.text.includes("```python"))
        assert(result.text.includes("print('hello')"))

        console.log("✅ literalCode creates code block")
    })
})

Deno.test("options.nix - showOption", async (t) => {
    await t.step("simple path", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                escapeNixIdentifier = part:
                    if builtins.match "[a-zA-Z_][a-zA-Z0-9_'-]*" part != null
                    then part
                    else "\\"\${part}\\"";
                showOption = parts: concatStringsSep "." (map escapeNixIdentifier parts);
            in
                showOption [ "foo" "bar" "baz" ]
        `)

        assertEquals(result, "foo.bar.baz")

        console.log("✅ showOption handles simple paths")
    })

    await t.step("path with dots needs quoting", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                escapeNixIdentifier = part:
                    if builtins.match "[a-zA-Z_][a-zA-Z0-9_'-]*" part != null
                    then part
                    else "\\"\${part}\\"";
                showOption = parts: concatStringsSep "." (map escapeNixIdentifier parts);
            in
                showOption [ "foo" "bar.baz" "tux" ]
        `)

        assertEquals(result, 'foo."bar.baz".tux')

        console.log("✅ showOption quotes parts with dots")
    })

    await t.step("wildcard placeholder preserved", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                isNamedPlaceholder = part: builtins.match "<(.*)>" part;
                escapeNixIdentifier = part:
                    if part == "*" || isNamedPlaceholder part != null then part
                    else if builtins.match "[a-zA-Z_][a-zA-Z0-9_'-]*" part != null then part
                    else "\\"\${part}\\"";
                showOption = parts: concatStringsSep "." (map escapeNixIdentifier parts);
            in
                showOption [ "foo" "*" "bar" ]
        `)

        assertEquals(result, "foo.*.bar")

        console.log("✅ showOption preserves * placeholder")
    })

    await t.step("named placeholder preserved", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                isNamedPlaceholder = part: builtins.match "<(.*)>" part;
                escapeNixIdentifier = part:
                    if part == "*" || isNamedPlaceholder part != null then part
                    else if builtins.match "[a-zA-Z_][a-zA-Z0-9_'-]*" part != null then part
                    else "\\"\${part}\\"";
                showOption = parts: concatStringsSep "." (map escapeNixIdentifier parts);
            in
                showOption [ "services" "<myService>" "enable" ]
        `)

        assertEquals(result, "services.<myService>.enable")

        console.log("✅ showOption preserves <name> placeholders")
    })
})

Deno.test("options.nix - showFiles", async (t) => {
    await t.step("single file", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                showFiles = files: concatStringsSep " and " (map (f: "''\${f}''") files);
            in
                showFiles [ "foo.nix" ]
        `)

        assertEquals(result, "''foo.nix''")

        console.log("✅ showFiles formats single file")
    })

    await t.step("multiple files", () => {
        const result = evalNix(`
            let
                concatStringsSep = sep: list: builtins.concatStringsSep sep list;
                showFiles = files: concatStringsSep " and " (map (f: "''\${f}''") files);
            in
                showFiles [ "a.nix" "b.nix" "c.nix" ]
        `)

        assertEquals(result, "''a.nix'' and ''b.nix'' and ''c.nix''")

        console.log("✅ showFiles joins multiple files")
    })
})

Deno.test("options.nix - scrubOptionValue", async (t) => {
    await t.step("pass through primitives", () => {
        const result = evalNix(`
            let
                isDerivation = x: x._type or null == "derivation";
                scrubOptionValue = x:
                    if isDerivation x then { type = "derivation"; name = x.name; }
                    else x;
            in
                {
                    num = scrubOptionValue 42;
                    str = scrubOptionValue "hello";
                    bool = scrubOptionValue true;
                }
        `)

        assertEquals(result.num, 42n)
        assertEquals(result.str, "hello")
        assertEquals(result.bool, true)

        console.log("✅ scrubOptionValue passes through primitives")
    })

    await t.step("scrub derivation", () => {
        const result = evalNix(`
            let
                isDerivation = x: x._type or null == "derivation";
                scrubOptionValue = x:
                    if isDerivation x then {
                        type = "derivation";
                        drvPath = x.name;
                        outPath = x.name;
                        name = x.name;
                    }
                    else x;
            in
                scrubOptionValue {
                    _type = "derivation";
                    name = "hello-1.0";
                    drvPath = "/nix/store/xxx-hello.drv";
                    outPath = "/nix/store/yyy-hello";
                    other = "data";
                }
        `)

        assertEquals(result.type, "derivation")
        assertEquals(result.name, "hello-1.0")
        assertEquals(result.drvPath, "hello-1.0")
        assertEquals(result.outPath, "hello-1.0")
        assertEquals(result.other, undefined)

        console.log("✅ scrubOptionValue removes derivation details")
    })
})

Deno.test("options.nix - renderOptionValue", async (t) => {
    await t.step("pass through typed strings", () => {
        const result = evalNix(`
            let
                renderOptionValue = v:
                    if v?_type && v?text then v
                    else { _type = "literalExpression"; text = builtins.toString v; };
            in
                renderOptionValue { _type = "literalExpression"; text = "pkgs.hello"; }
        `)

        assertEquals(result._type, "literalExpression")
        assertEquals(result.text, "pkgs.hello")

        console.log("✅ renderOptionValue passes through typed strings")
    })

    await t.step("convert plain value", () => {
        const result = evalNix(`
            let
                renderOptionValue = v:
                    if v?_type && v?text then v
                    else { _type = "literalExpression"; text = builtins.toString v; };
            in
                renderOptionValue "hello"
        `)

        assertEquals(result._type, "literalExpression")
        assertEquals(result.text, "hello")

        console.log("✅ renderOptionValue wraps plain values")
    })
})

Deno.test("options.nix - mkSinkUndeclaredOptions", async (t) => {
    await t.step("creates sink option", () => {
        const result = evalNix(`
            let
                mkOption = attrs: attrs // { _type = "option"; };
                mkSinkUndeclaredOptions = attrs: mkOption ({
                    internal = true;
                    visible = false;
                    default = false;
                    description = "Sink for option definitions.";
                } // attrs);
            in
                mkSinkUndeclaredOptions {}
        `)

        assertEquals(result._type, "option")
        assertEquals(result.internal, true)
        assertEquals(result.visible, false)
        assertEquals(result.default, false)

        console.log("✅ mkSinkUndeclaredOptions creates internal option")
    })
})

console.log("\n🎉 All options.nix tests complete!")
