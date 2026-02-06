/**
 * GENERATED JavaScript from operators.nix
 * Shows how Nix operators become function calls in JavaScript
 */

// All Nix operators become calls to `operators.*` functions
// This ensures correct behavior for mixed types (BigInt, Number, String, etc.)
({
    // Arithmetic: operators.add(), subtract(), multiply(), divide()
    // Note: These handle both BigInt (42n) and Number (42.0) correctly
    "addition": operators.add(5n, 3n),  // 5n + 3n = 8n
    "subtraction": operators.subtract(10n, 4n),  // 10n - 4n = 6n
    "multiplication": operators.multiply(6n, 7n),  // 6n * 7n = 42n

    // Division: operators.divide() handles integer vs float division
    "division": operators.divide(15n, 3n),  // Integer division: 15n / 3n = 5n
    "floatDivision": 15.0 / 3.0,  // Float division: can use native JS (no BigInt)

    // CRITICAL: Integer division truncates!
    "integerDivisionTruncates": operators.divide(7n, 2n),  // 7n / 2n = 3n (not 3.5!)

    // Comparison operators: greaterThan(), lessThan(), etc.
    "greater": operators.greaterThan(5n, 3n),  // 5 > 3 = true
    "less": operators.lessThan(2n, 10n),  // 2 < 10 = true
    "greaterEqual": operators.greaterThanOrEqual(5n, 5n),  // 5 >= 5 = true
    "lessEqual": operators.lessThanOrEqual(3n, 4n),  // 3 <= 4 = true
    "equal": operators.equal(42n, 42n),  // 42 == 42 = true
    "notEqual": operators.notEqual(1n, 2n),  // 1 != 2 = true

    // Logical operators
    "andOp": operators.and(true, true),  // true && true = true
    "orOp": operators.or(false, true),  // false || true = true
    "notOp": operators.negate(false),  // !false = true

    // Implication: unique to Nix! (false -> x) is always true
    "implies": operators.implication(false, true),  // false -> true = true

    // String concatenation: operators.add() is overloaded for strings
    "stringConcat": operators.add("Hello, ", "World!"),  // "Hello, " + "World!"

    // List concatenation: operators.listConcat() (NOT operators.add!)
    "listConcat": operators.listConcat([1n, 2n], [3n, 4n]),  // [1 2] ++ [3 4]

    // Attribute set merge: operators.merge() is right-biased
    // Keys from right override keys from left
    "attrMerge": operators.merge(
        ({"a": 1n, "b": 2n}),
        ({"b": 3n, "c": 4n})
    ),  // Result: {a: 1, b: 3, c: 4} (b overwritten!)

    // Attribute existence: operators.hasAttr(obj, key)
    "hasAttr": operators.hasAttr(({"a": 1n}), "a"),  // true
    "noAttr": operators.hasAttr(({"a": 1n}), "b"),  // false

    // Operator precedence: multiplication before addition (like math!)
    "precedence": operators.add(2n, operators.multiply(3n, 4n))  // 2 + (3 * 4) = 14
})
