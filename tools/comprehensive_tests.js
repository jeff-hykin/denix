#!/usr/bin/env -S deno run --allow-all
/**
 * Comprehensive Translation Test Suite
 *
 * Hundreds of test cases covering all Nix language features
 */

import { runTestSuite } from "./translation_validator.js"

// Test categories
const tests = {
    literals: [
        { expr: "42", description: "Integer literal" },
        { expr: "-42", description: "Negative integer" },
        { expr: "0", description: "Zero" },
        { expr: "123456789", description: "Large integer" },
        { expr: "42.5", description: "Float literal" },
        { expr: "3.14159", description: "Pi approximation" },
        { expr: "-3.14", description: "Negative float" },
        { expr: "0.0", description: "Zero float" },
        { expr: "1e3", description: "Scientific notation positive" },
        { expr: "1e-3", description: "Scientific notation negative" },
        { expr: '"hello"', description: "Simple string" },
        { expr: '""', description: "Empty string" },
        { expr: '"hello world"', description: "String with space" },
        { expr: '"line1\\nline2"', description: "String with newline" },
        { expr: '"tab\\there"', description: "String with tab" },
        { expr: 'true', description: "Boolean true" },
        { expr: 'false', description: "Boolean false" },
        { expr: 'null', description: "Null value" },
    ],

    strings: [
        { expr: '"\${1 + 1}"', description: "String interpolation simple" },
        { expr: '"hello \${1 + 1} world"', description: "String interpolation in middle" },
        { expr: '"\${1} \${2} \${3}"', description: "Multiple interpolations" },
        { expr: '"prefix\${"nested"}"', description: "Nested string interpolation" },
        { expr: '"\${true}"', description: "Interpolate boolean" },
        { expr: '"\${[1 2 3]}"', description: "Interpolate list (should fail or convert)" },
    ],

    lists: [
        { expr: "[]", description: "Empty list" },
        { expr: "[1]", description: "Single element list" },
        { expr: "[1 2 3]", description: "Simple integer list" },
        { expr: "[1 2 3 4 5]", description: "Five element list" },
        { expr: '["a" "b" "c"]', description: "String list" },
        { expr: "[true false null]", description: "Mixed type list" },
        { expr: "[[1] [2] [3]]", description: "Nested lists" },
        { expr: "[1 [2 [3 [4]]]]", description: "Deeply nested lists" },
        { expr: '[ { a = 1; } { b = 2; } ]', description: "List of attrsets" },
    ],

    attrsets: [
        { expr: "{}", description: "Empty attrset" },
        { expr: "{ a = 1; }", description: "Single attribute" },
        { expr: "{ a = 1; b = 2; }", description: "Two attributes" },
        { expr: "{ a = 1; b = 2; c = 3; }", description: "Three attributes" },
        { expr: '{ x = "hello"; y = 42; z = true; }', description: "Mixed types attrset" },
        { expr: '{ a = { b = { c = 1; }; }; }', description: "Nested attrsets" },
        { expr: '{ "a b" = 1; }', description: "String key with space" },
        { expr: '{ inherit a; } // { a = 1; }', description: "Inherit with merge" },
    ],

    arithmetic: [
        { expr: "1 + 1", description: "Addition simple" },
        { expr: "10 + 20", description: "Addition larger" },
        { expr: "1 + 2 + 3", description: "Addition chain" },
        { expr: "10 - 5", description: "Subtraction simple" },
        { expr: "100 - 50 - 25", description: "Subtraction chain" },
        { expr: "3 * 4", description: "Multiplication simple" },
        { expr: "2 * 3 * 4", description: "Multiplication chain" },
        { expr: "20 / 4", description: "Division simple" },
        { expr: "100 / 10 / 2", description: "Division chain" },
        { expr: "1 + 2 * 3", description: "Mixed operators precedence" },
        { expr: "(1 + 2) * 3", description: "Parentheses precedence" },
        { expr: "10 - 2 * 3", description: "Subtraction with multiplication" },
    ],

    floatArithmetic: [
        { expr: "1.0 + 1.0", description: "Float addition" },
        { expr: "5.5 - 2.5", description: "Float subtraction" },
        { expr: "2.5 * 4.0", description: "Float multiplication" },
        { expr: "10.0 / 4.0", description: "Float division" },
        { expr: "1 + 1.0", description: "Int + Float" },
        { expr: "1.0 + 1", description: "Float + Int" },
    ],

    comparison: [
        { expr: "1 == 1", description: "Equal integers true" },
        { expr: "1 == 2", description: "Equal integers false" },
        { expr: "1 != 2", description: "Not equal true" },
        { expr: "1 != 1", description: "Not equal false" },
        { expr: "5 < 10", description: "Less than true" },
        { expr: "10 < 5", description: "Less than false" },
        { expr: "10 > 5", description: "Greater than true" },
        { expr: "5 > 10", description: "Greater than false" },
        { expr: "5 <= 5", description: "Less than or equal true" },
        { expr: "5 >= 5", description: "Greater than or equal true" },
        { expr: '"a" == "a"', description: "String equality true" },
        { expr: '"a" == "b"', description: "String equality false" },
    ],

    logical: [
        { expr: "true && true", description: "AND true true" },
        { expr: "true && false", description: "AND true false" },
        { expr: "false && false", description: "AND false false" },
        { expr: "true || false", description: "OR true false" },
        { expr: "false || false", description: "OR false false" },
        { expr: "true || true", description: "OR true true" },
        { expr: "!true", description: "NOT true" },
        { expr: "!false", description: "NOT false" },
        { expr: "true && true && true", description: "Multiple AND" },
        { expr: "false || false || true", description: "Multiple OR" },
    ],

    conditional: [
        { expr: 'if true then "yes" else "no"', description: "If true" },
        { expr: 'if false then "yes" else "no"', description: "If false" },
        { expr: 'if 1 == 1 then 42 else 0', description: "If with comparison" },
        { expr: 'if true then if true then 1 else 2 else 3', description: "Nested if true" },
        { expr: 'if false then 1 else if true then 2 else 3', description: "Nested if false" },
    ],

    letBindings: [
        { expr: 'let x = 5; in x', description: "Simple let binding" },
        { expr: 'let x = 5; y = 10; in x + y', description: "Multiple bindings" },
        { expr: 'let x = 5; in let y = 10; in x + y', description: "Nested let" },
        { expr: 'let x = 1; x = 2; in x', description: "Shadowing in let (last wins)" },
        { expr: 'let f = x: x + 1; in f 5', description: "Function in let" },
        { expr: 'let x = y; y = 5; in x', description: "Forward reference in let" },
        { expr: 'let inherit (builtins) add; in add 1 2', description: "Inherit from in let" },
    ],

    recAttrsets: [
        { expr: 'rec { a = 1; b = a + 1; }', description: "Rec simple" },
        { expr: 'rec { a = 1; b = a; c = b; }', description: "Rec chain" },
        { expr: 'rec { a = b; b = 1; }', description: "Rec forward reference" },
        { expr: 'rec { x = { y = 1; z = y + 1; }; }', description: "Rec with nested" },
    ],

    functions: [
        { expr: '(x: x)', description: "Identity function" },
        { expr: '(x: x + 1)', description: "Increment function" },
        { expr: '(x: y: x + y)', description: "Curried add" },
        { expr: '(x: x: x)', description: "Shadowing parameter" },
        { expr: '({ a, b }: a + b)', description: "Destructure pattern" },
        { expr: '({ a, b ? 10 }: a + b)', description: "Pattern with default" },
        { expr: '({ a, b, ... }: a + b)', description: "Pattern with ellipsis" },
        { expr: '(a@{ x, y }: a.x + a.y)', description: "Pattern with @" },
    ],

    functionCalls: [
        { expr: '(x: x) 42', description: "Call identity" },
        { expr: '(x: x + 1) 5', description: "Call increment" },
        { expr: '(x: y: x + y) 5 10', description: "Call curried" },
        { expr: '(f: x: f (f x)) (x: x + 1) 0', description: "Higher order function" },
        { expr: '({ a, b }: a + b) { a = 5; b = 10; }', description: "Call with attrset" },
    ],

    builtins: [
        { expr: 'builtins.add 1 2', description: "builtins.add" },
        { expr: 'builtins.sub 10 3', description: "builtins.sub" },
        { expr: 'builtins.mul 4 5', description: "builtins.mul" },
        { expr: 'builtins.div 20 4', description: "builtins.div" },
        { expr: 'builtins.head [1 2 3]', description: "builtins.head" },
        { expr: 'builtins.tail [1 2 3]', description: "builtins.tail" },
        { expr: 'builtins.length [1 2 3]', description: "builtins.length" },
        { expr: 'builtins.elem 2 [1 2 3]', description: "builtins.elem true" },
        { expr: 'builtins.elem 5 [1 2 3]', description: "builtins.elem false" },
        { expr: 'builtins.attrNames { a = 1; b = 2; }', description: "builtins.attrNames" },
        { expr: 'builtins.attrValues { a = 1; b = 2; }', description: "builtins.attrValues" },
        { expr: 'builtins.hasAttr "a" { a = 1; }', description: "builtins.hasAttr true" },
        { expr: 'builtins.hasAttr "b" { a = 1; }', description: "builtins.hasAttr false" },
        { expr: 'builtins.isInt 42', description: "builtins.isInt true" },
        { expr: 'builtins.isInt 42.0', description: "builtins.isInt false" },
        { expr: 'builtins.isFloat 42.0', description: "builtins.isFloat true" },
        { expr: 'builtins.isBool true', description: "builtins.isBool true" },
        { expr: 'builtins.isString "hello"', description: "builtins.isString true" },
        { expr: 'builtins.isList [1 2 3]', description: "builtins.isList true" },
        { expr: 'builtins.isAttrs { a = 1; }', description: "builtins.isAttrs true" },
        { expr: 'builtins.isNull null', description: "builtins.isNull true" },
        { expr: 'builtins.isFunction (x: x)', description: "builtins.isFunction true" },
    ],

    listOperations: [
        { expr: '[1 2] ++ [3 4]', description: "List concatenation" },
        { expr: '[] ++ [1 2]', description: "Concat with empty left" },
        { expr: '[1 2] ++ []', description: "Concat with empty right" },
        { expr: 'builtins.map (x: x + 1) [1 2 3]', description: "builtins.map" },
        { expr: 'builtins.filter (x: x > 2) [1 2 3 4]', description: "builtins.filter" },
        { expr: 'builtins.foldl\' (a: b: a + b) 0 [1 2 3]', description: "builtins.foldl'" },
        { expr: 'builtins.all (x: x > 0) [1 2 3]', description: "builtins.all true" },
        { expr: 'builtins.all (x: x > 2) [1 2 3]', description: "builtins.all false" },
        { expr: 'builtins.any (x: x > 2) [1 2 3]', description: "builtins.any true" },
        { expr: 'builtins.any (x: x > 5) [1 2 3]', description: "builtins.any false" },
    ],

    attrsetOperations: [
        { expr: '{ a = 1; } // { b = 2; }', description: "Attrset merge" },
        { expr: '{ a = 1; } // { a = 2; }', description: "Attrset merge override" },
        { expr: '{ a = 1; b = 2; } // { b = 3; c = 4; }', description: "Attrset merge multiple" },
        { expr: 'builtins.mapAttrs (k: v: v + 1) { a = 1; b = 2; }', description: "builtins.mapAttrs" },
        { expr: 'builtins.listToAttrs [ { name = "a"; value = 1; } ]', description: "builtins.listToAttrs" },
        { expr: 'builtins.removeAttrs { a = 1; b = 2; c = 3; } ["b"]', description: "builtins.removeAttrs" },
    ],

    stringOperations: [
        { expr: 'builtins.substring 0 5 "hello world"', description: "builtins.substring" },
        { expr: 'builtins.stringLength "hello"', description: "builtins.stringLength" },
        { expr: 'builtins.concatStrings ["hello" " " "world"]', description: "builtins.concatStrings" },
        { expr: 'builtins.concatStringsSep ", " ["a" "b" "c"]', description: "builtins.concatStringsSep" },
        { expr: 'builtins.replaceStrings ["old"] ["new"] "old text"', description: "builtins.replaceStrings" },
    ],

    withExpressions: [
        { expr: 'with { a = 1; b = 2; }; a + b', description: "With simple" },
        { expr: 'with { x = 10; }; with { y = 20; }; x + y', description: "Nested with" },
        { expr: 'let a = 1; in with { a = 2; }; a', description: "With shadowing" },
    ],

    assert: [
        { expr: 'assert true; 42', description: "Assert true" },
        { expr: 'assert 1 == 1; "success"', description: "Assert with comparison" },
        { expr: 'let x = 5; in assert x > 0; x * 2', description: "Assert with let" },
    ],

    complexExpressions: [
        {
            expr: 'let mkSum = list: builtins.foldl\' (a: b: a + b) 0 list; in mkSum [1 2 3 4 5]',
            description: "Sum function",
        },
        {
            expr: 'let double = x: x * 2; triple = x: x * 3; in double (triple 5)',
            description: "Function composition",
        },
        {
            expr: 'rec { factorial = n: if n == 0 then 1 else n * factorial (n - 1); result = factorial 5; }',
            description: "Recursive factorial",
        },
        {
            expr: 'let range = from: to: if from >= to then [] else [from] ++ range (from + 1) to; in range 1 5',
            description: "Range function",
        },
        {
            expr: `
                let
                    person = {
                        name = "Alice";
                        age = 30;
                        greet = name: "Hello \${name}!";
                    };
                in
                    person.greet person.name
            `,
            description: "Object with methods",
        },
    ],
}

// Flatten all test categories into a single array
const allTests = []
for (const [category, categoryTests] of Object.entries(tests)) {
    for (const test of categoryTests) {
        allTests.push({
            ...test,
            category,
        })
    }
}

// Run tests if executed directly
if (import.meta.main) {
    console.log(`\n📊 Comprehensive Translation Test Suite\n`)
    console.log(`Testing ${allTests.length} expressions across ${Object.keys(tests).length} categories\n`)

    const results = await runTestSuite(allTests, {
        verbose: Deno.args.includes("--verbose") || Deno.args.includes("-v"),
        stopOnFail: Deno.args.includes("--stop-on-fail"),
    })

    // Print category breakdown
    console.log(`\n\n📈 Category Breakdown:\n`)

    for (const [category, categoryTests] of Object.entries(tests)) {
        const categoryResults = results.results.filter(r => r.description === categoryTests.find(t => t.description === r.description)?.description)
        const passed = categoryResults.filter(r => r.passed).length
        const total = categoryTests.length

        const percentage = ((passed / total) * 100).toFixed(0)
        const bar = "█".repeat(Math.floor(passed / total * 20)) + "░".repeat(20 - Math.floor(passed / total * 20))

        console.log(`  ${category.padEnd(25)} ${bar} ${passed}/${total} (${percentage}%)`)
    }

    // Exit with error code if tests failed
    if (results.failed > 0) {
        Deno.exit(1)
    }
}

export { tests, allTests }
