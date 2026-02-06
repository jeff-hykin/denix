#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.groupBy - Intermediate tests\n")

// Test 1: Group with complex key function
await test(
    1,
    "group using multiple conditions",
    'builtins.groupBy (x: if x < 3 then "small" else if x < 7 then "medium" else "large") [1 5 2 8 3 9 6 4]',
    builtins.groupBy((x) => x < 3n ? "small" : x < 7n ? "medium" : "large")([1n, 5n, 2n, 8n, 3n, 9n, 6n, 4n])
)

// Test 2: Group by computed property
await test(
    2,
    "group by sum of digits concept (simplified)",
    'builtins.groupBy (x: builtins.toString (builtins.mod x 2)) [10 21 32 43 54 65]',
    builtins.groupBy((x) => builtins.toString(builtins.mod(x)(2n)))([10n, 21n, 32n, 43n, 54n, 65n])
)

// Test 3: Group strings by complex criteria
await test(
    3,
    "group strings by multiple criteria",
    'builtins.groupBy (s: if builtins.stringLength s > 5 then "long" else if builtins.substring 0 1 s == "a" then "starts-a" else "other") ["apple" "ant" "banana" "apricot" "cat"]',
    builtins.groupBy((s) =>
        builtins.stringLength(s) > 5 ? "long" :
        builtins.substring(0)(1)(s) == "a" ? "starts-a" :
        "other"
    )(["apple", "ant", "banana", "apricot", "cat"])
)

// Test 4: Group by nested attribute access
await test(
    4,
    "group by nested attribute",
    'builtins.groupBy (x: x.location.country) [{name = "Alice"; location = {country = "US"; city = "NYC";}; } {name = "Bob"; location = {country = "UK"; city = "London";}; } {name = "Charlie"; location = {country = "US"; city = "LA";}; }]',
    builtins.groupBy((x) => x.location.country)([
        { name: "Alice", location: { country: "US", city: "NYC" } },
        { name: "Bob", location: { country: "UK", city: "London" } },
        { name: "Charlie", location: { country: "US", city: "LA" } }
    ])
)

// Test 5: Group with string manipulation
await test(
    5,
    "group by transformed string key",
    'builtins.groupBy (s: builtins.substring 0 2 s) ["apple" "apricot" "banana" "blueberry" "cherry" "blackberry"]',
    builtins.groupBy((s) => builtins.substring(0)(2)(s))(["apple", "apricot", "banana", "blueberry", "cherry", "blackberry"])
)

// Test 6: Group with boolean logic
await test(
    6,
    "group by combined boolean conditions",
    'builtins.groupBy (x: if x > 5 && builtins.mod x 2 == 0 then "large-even" else if x > 5 then "large-odd" else if builtins.mod x 2 == 0 then "small-even" else "small-odd") [1 2 3 4 5 6 7 8 9 10]',
    builtins.groupBy((x) =>
        x > 5n && builtins.mod(x)(2n) == 0n ? "large-even" :
        x > 5n ? "large-odd" :
        builtins.mod(x)(2n) == 0n ? "small-even" :
        "small-odd"
    )([1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n])
)

// Test 7: Group with list length
await test(
    7,
    "group lists by their length",
    'builtins.groupBy (lst: builtins.toString (builtins.length lst)) [[1] [2 3] [4 5 6] [7] [8 9]]',
    builtins.groupBy((lst) => builtins.toString(BigInt(builtins.length(lst))))([[1n], [2n, 3n], [4n, 5n, 6n], [7n], [8n, 9n]])
)

// Test 8: Group by range buckets
await test(
    8,
    "group numbers into range buckets",
    'builtins.groupBy (x: builtins.toString (x / 10)) [5 15 25 35 8 18 28 3 13 23]',
    builtins.groupBy((x) => builtins.toString(x / 10n))([5n, 15n, 25n, 35n, 8n, 18n, 28n, 3n, 13n, 23n])
)

// Test 9: Group with attribute presence check
await test(
    9,
    "group by whether attribute exists",
    'builtins.groupBy (x: if x ? optional then "has-optional" else "no-optional") [{id = 1; optional = true;} {id = 2;} {id = 3; optional = false;}]',
    builtins.groupBy((x) => x.hasOwnProperty("optional") ? "has-optional" : "no-optional")([
        { id: 1n, optional: true },
        { id: 2n },
        { id: 3n, optional: false }
    ])
)

// Test 10: Group with type-based keys
await test(
    10,
    "group by value comparison type",
    'builtins.groupBy (x: if builtins.typeOf x == "int" then "number" else builtins.typeOf x) [1 "hello" 2 true 3 "world"]',
    builtins.groupBy((x) => builtins.typeOf(x) == "int" ? "number" : builtins.typeOf(x))([1n, "hello", 2n, true, 3n, "world"])
)

printSummary()
