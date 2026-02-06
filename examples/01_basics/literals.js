/**
 * GENERATED JavaScript from literals.nix
 * This shows how Nix's basic data types translate to JavaScript
 */

// The entire Nix attribute set becomes a JavaScript object
({
    // Integers: Nix `42` → JavaScript `42n` (BigInt)
    // Why BigInt? To preserve integer division: 1/2 = 0 (not 0.5)
    "myInt": 42n,

    // Floats: Nix `3.14` → JavaScript `3.14` (Number)
    "myFloat": 3.14,

    // Strings: Direct mapping
    "myString": "hello world",

    // Booleans: Direct mapping
    "myTrue": true,
    "myFalse": false,

    // Null: Direct mapping
    "myNull": null,

    // Lists: Nix `[1 2 3]` → JavaScript `[1n, 2n, 3n]` (array of BigInts)
    "myList": [1n, 2n, 3n],

    // Mixed-type lists work as expected
    "mixedList": [1n, "hello", 3.14, true],

    // Nested attribute sets: Nix `{ inner = { value = 99; }; }`
    // becomes nested JavaScript objects
    // Note: Wrapped in parentheses `({...})` to make it a valid expression
    "nested": ({
        "inner": ({
            "value": 99n
        })
    })
})
