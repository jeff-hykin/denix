import { assertEquals, assertThrows } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

// List Operations Builtins Tests
// Testing 12 list operation functions: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith, foldl'
// Based on Nix 2.18 documentation: https://nix.dev/manual/nix/2.18/language/builtins

// ============================================================================
// map Tests - Most used list function in Nix
// ============================================================================

Deno.test("map - basic transformation", () => {
    const result = builtins.map((x) => x * 2n)([ 1n, 2n, 3n]);
    assertEquals(Array.from(result), [2n, 4n, 6n]);
});

Deno.test("map - empty list", () => {
    const result = builtins.map((x) => x * 2n)([]);
    assertEquals(Array.from(result), []);
});

Deno.test("map - string transformation", () => {
    const result = builtins.map((s) => s + "!")(["a", "b", "c"]);
    assertEquals(Array.from(result), ["a!", "b!", "c!"]);
});

Deno.test("map - with objects", () => {
    const result = builtins.map((obj) => obj.x)([{x: 1n}, {x: 2n}, {x: 3n}]);
    assertEquals(Array.from(result), [1n, 2n, 3n]);
});

Deno.test("map - nested function calls", () => {
    const result = builtins.map((x) => x + 1n)(builtins.map((x) => x * 2n)([1n, 2n, 3n]));
    assertEquals(Array.from(result), [3n, 5n, 7n]);
});

Deno.test("map - lazy evaluation via lazyMap proxy", () => {
    // map returns a lazyMap proxy that only evaluates when accessed
    let callCount = 0;
    const fn = (x) => { callCount++; return x * 2n; };
    const result = builtins.map(fn)([1n, 2n, 3n]);

    // Should not have called fn yet (lazy)
    assertEquals(callCount, 0);

    // Access first element
    assertEquals(result[0], 2n);
    assertEquals(callCount, 1); // Only one call

    // Access again - should use cached value
    assertEquals(result[0], 2n);
    assertEquals(callCount, 1); // Still only one call (cached)

    // Access all elements
    assertEquals(Array.from(result), [2n, 4n, 6n]);
    assertEquals(callCount, 3); // Now all three called
});

// ============================================================================
// filter Tests - Second most used list function
// ============================================================================

Deno.test("filter - basic filtering", () => {
    const result = builtins.filter((x) => x > 2n)([1n, 2n, 3n, 4n]);
    assertEquals(result, [3n, 4n]);
});

Deno.test("filter - empty list", () => {
    const result = builtins.filter((x) => x > 0n)([]);
    assertEquals(result, []);
});

Deno.test("filter - filter all out", () => {
    const result = builtins.filter((x) => x > 10n)([1n, 2n, 3n]);
    assertEquals(result, []);
});

Deno.test("filter - filter none out", () => {
    const result = builtins.filter((x) => true)([1n, 2n, 3n]);
    assertEquals(result, [1n, 2n, 3n]);
});

Deno.test("filter - with strings", () => {
    const result = builtins.filter((s) => s.length > 2)(["a", "abc", "ab", "abcd"]);
    assertEquals(result, ["abc", "abcd"]);
});

Deno.test("filter - with boolean values", () => {
    const result = builtins.filter((x) => x)([true, false, true, false]);
    assertEquals(result, [true, true]);
});

// ============================================================================
// all Tests - Check if all elements match predicate
// ============================================================================

Deno.test("all - all match", () => {
    const result = builtins.all((x) => x > 0n)([1n, 2n, 3n]);
    assertEquals(result, true);
});

Deno.test("all - some don't match", () => {
    const result = builtins.all((x) => x > 2n)([1n, 2n, 3n]);
    assertEquals(result, false);
});

Deno.test("all - empty list returns true", () => {
    // In Nix: builtins.all (x: x > 0) [] => true
    const result = builtins.all((x) => false)([]);
    assertEquals(result, true);
});

Deno.test("all - with booleans", () => {
    const result = builtins.all((x) => x)([true, true, true]);
    assertEquals(result, true);
});

Deno.test("all - with one false", () => {
    const result = builtins.all((x) => x)([true, false, true]);
    assertEquals(result, false);
});

// ============================================================================
// any Tests - Check if any element matches predicate
// ============================================================================

Deno.test("any - at least one matches", () => {
    const result = builtins.any((x) => x > 2n)([1n, 2n, 3n]);
    assertEquals(result, true);
});

Deno.test("any - none match", () => {
    const result = builtins.any((x) => x > 5n)([1n, 2n, 3n]);
    assertEquals(result, false);
});

Deno.test("any - empty list returns false", () => {
    // In Nix: builtins.any (x: x > 0) [] => false
    const result = builtins.any((x) => true)([]);
    assertEquals(result, false);
});

Deno.test("any - with booleans", () => {
    const result = builtins.any((x) => x)([false, false, true]);
    assertEquals(result, true);
});

Deno.test("any - all false", () => {
    const result = builtins.any((x) => x)([false, false, false]);
    assertEquals(result, false);
});

// ============================================================================
// elem Tests - Check if element is in list
// ============================================================================

Deno.test("elem - element exists", () => {
    const result = builtins.elem(2n)([1n, 2n, 3n]);
    assertEquals(result, true);
});

Deno.test("elem - element doesn't exist", () => {
    const result = builtins.elem(5n)([1n, 2n, 3n]);
    assertEquals(result, false);
});

Deno.test("elem - empty list", () => {
    const result = builtins.elem(1n)([]);
    assertEquals(result, false);
});

Deno.test("elem - with strings", () => {
    const result = builtins.elem("b")(["a", "b", "c"]);
    assertEquals(result, true);
});

Deno.test("elem - type matters (1 !== '1')", () => {
    const result = builtins.elem(1n)(["1", "2", "3"]);
    assertEquals(result, false);
});

Deno.test("elem - first element", () => {
    const result = builtins.elem(1n)([1n, 2n, 3n]);
    assertEquals(result, true);
});

Deno.test("elem - last element", () => {
    const result = builtins.elem(3n)([1n, 2n, 3n]);
    assertEquals(result, true);
});

// ============================================================================
// elemAt Tests - Get element at index
// ============================================================================

Deno.test("elemAt - first element", () => {
    const result = builtins.elemAt([1n, 2n, 3n])(0n);
    assertEquals(result, 1n);
});

Deno.test("elemAt - middle element", () => {
    const result = builtins.elemAt([1n, 2n, 3n])(1n);
    assertEquals(result, 2n);
});

Deno.test("elemAt - last element", () => {
    const result = builtins.elemAt([1n, 2n, 3n])(2n);
    assertEquals(result, 3n);
});

Deno.test("elemAt - out of bounds throws error", () => {
    assertThrows(
        () => builtins.elemAt([1n, 2n, 3n])(10n),
        Error,
        "list index 10 is out of bounds"
    );
});

Deno.test("elemAt - negative index throws error", () => {
    assertThrows(
        () => builtins.elemAt([1n, 2n, 3n])(-1n),
        Error
    );
});

Deno.test("elemAt - with strings", () => {
    const result = builtins.elemAt(["a", "b", "c"])(1n);
    assertEquals(result, "b");
});

// ============================================================================
// partition Tests - Split list into two groups
// ============================================================================

Deno.test("partition - basic partition", () => {
    const result = builtins.partition((x) => x > 2n)([1n, 2n, 3n, 4n]);
    assertEquals(result, {
        right: [3n, 4n],
        wrong: [1n, 2n]
    });
});

Deno.test("partition - all in right", () => {
    const result = builtins.partition((x) => true)([1n, 2n, 3n]);
    assertEquals(result, {
        right: [1n, 2n, 3n],
        wrong: []
    });
});

Deno.test("partition - all in wrong", () => {
    const result = builtins.partition((x) => false)([1n, 2n, 3n]);
    assertEquals(result, {
        right: [],
        wrong: [1n, 2n, 3n]
    });
});

Deno.test("partition - empty list", () => {
    const result = builtins.partition((x) => x > 0n)([]);
    assertEquals(result, {
        right: [],
        wrong: []
    });
});

Deno.test("partition - with strings", () => {
    const result = builtins.partition((s) => s.length > 2)(["a", "abc", "ab", "abcd"]);
    assertEquals(result, {
        right: ["abc", "abcd"],
        wrong: ["a", "ab"]
    });
});

Deno.test("partition - lazy evaluation with cached getters", () => {
    let callCount = 0;
    const fn = (x) => { callCount++; return x > 2n; };
    const result = builtins.partition(fn)([1n, 2n, 3n, 4n]);

    // Should not have called fn yet (lazy)
    assertEquals(callCount, 0);

    // Access right
    assertEquals(result.right, [3n, 4n]);
    assertEquals(callCount, 4); // Called for all elements

    // Access again - should use cached value
    assertEquals(result.right, [3n, 4n]);
    assertEquals(callCount, 4); // Still 4 (cached)

    // Access wrong
    assertEquals(result.wrong, [1n, 2n]);
    assertEquals(callCount, 4); // Still 4 (cached)
});

// ============================================================================
// sort Tests - Sort list with comparator
// ============================================================================

Deno.test("sort - ascending numbers", () => {
    const result = builtins.sort((a) => (b) => a < b)([3n, 1n, 2n]);
    assertEquals(result, [1n, 2n, 3n]);
});

Deno.test("sort - descending numbers", () => {
    const result = builtins.sort((a) => (b) => a > b)([1n, 3n, 2n]);
    assertEquals(result, [3n, 2n, 1n]);
});

Deno.test("sort - empty list", () => {
    const result = builtins.sort((a, b) => a < b)([]);
    assertEquals(result, []);
});

Deno.test("sort - single element", () => {
    const result = builtins.sort((a, b) => a < b)([42n]);
    assertEquals(result, [42n]);
});

Deno.test("sort - strings alphabetically", () => {
    const result = builtins.sort((a) => (b) => a < b)(["zebra", "apple", "banana"]);
    assertEquals(result, ["apple", "banana", "zebra"]);
});

Deno.test("sort - already sorted", () => {
    const result = builtins.sort((a) => (b) => a < b)([1n, 2n, 3n]);
    assertEquals(result, [1n, 2n, 3n]);
});

Deno.test("sort - with duplicates", () => {
    const result = builtins.sort((a) => (b) => a < b)([3n, 1n, 2n, 1n, 3n]);
    assertEquals(result, [1n, 1n, 2n, 3n, 3n]);
});

// ============================================================================
// genList Tests - Generate list with function
// ============================================================================

Deno.test("genList - basic generation", () => {
    const result = builtins.genList((x) => x * 2n)(5n);
    assertEquals(result, [0n, 2n, 4n, 6n, 8n]);
});

Deno.test("genList - zero length", () => {
    const result = builtins.genList((x) => x)(0n);
    assertEquals(result, []);
});

Deno.test("genList - identity function", () => {
    const result = builtins.genList((x) => x)(5n);
    assertEquals(result, [0n, 1n, 2n, 3n, 4n]);
});

Deno.test("genList - constant function", () => {
    const result = builtins.genList((x) => "x")(3n);
    assertEquals(result, ["x", "x", "x"]);
});

Deno.test("genList - with strings", () => {
    const result = builtins.genList((x) => "item" + x)(3n);
    assertEquals(result, ["item0", "item1", "item2"]);
});

Deno.test("genList - single element", () => {
    const result = builtins.genList((x) => x * x)(1n);
    assertEquals(result, [0n]);
});

// ============================================================================
// concatLists Tests - Concatenate list of lists
// ============================================================================

Deno.test("concatLists - basic concatenation", () => {
    const result = builtins.concatLists([[1n, 2n], [3n, 4n]]);
    assertEquals(result, [1n, 2n, 3n, 4n]);
});

Deno.test("concatLists - empty list of lists", () => {
    const result = builtins.concatLists([]);
    assertEquals(result, []);
});

Deno.test("concatLists - with empty sublists", () => {
    const result = builtins.concatLists([[1n], [], [2n, 3n], []]);
    assertEquals(result, [1n, 2n, 3n]);
});

Deno.test("concatLists - single list", () => {
    const result = builtins.concatLists([[1n, 2n, 3n]]);
    assertEquals(result, [1n, 2n, 3n]);
});

Deno.test("concatLists - with strings", () => {
    const result = builtins.concatLists([["a", "b"], ["c", "d"]]);
    assertEquals(result, ["a", "b", "c", "d"]);
});

Deno.test("concatLists - three lists", () => {
    const result = builtins.concatLists([[1n], [2n], [3n]]);
    assertEquals(result, [1n, 2n, 3n]);
});

// ============================================================================
// zipAttrsWith Tests - Merge list of attrsets with function
// ============================================================================

Deno.test("zipAttrsWith - basic merge with sum", () => {
    const result = builtins.zipAttrsWith((name) => (values) => {
        return values.reduce((acc, v) => acc + v, 0n);
    })([{a: 1n}, {a: 2n}, {a: 3n}]);
    assertEquals(result, {a: 6n});
});

Deno.test("zipAttrsWith - multiple attributes", () => {
    const result = builtins.zipAttrsWith((name) => (values) => values)([
        {a: 1n, b: 2n},
        {a: 3n, b: 4n}
    ]);
    assertEquals(result, {
        a: [1n, 3n],
        b: [2n, 4n]
    });
});

Deno.test("zipAttrsWith - empty list", () => {
    const result = builtins.zipAttrsWith((name) => (values) => values)([]);
    assertEquals(result, {});
});

Deno.test("zipAttrsWith - with missing keys", () => {
    const result = builtins.zipAttrsWith((name) => (values) => values)([
        {a: 1n, b: 2n},
        {a: 3n},
        {b: 4n, c: 5n}
    ]);
    assertEquals(result, {
        a: [1n, 3n],
        b: [2n, 4n],
        c: [5n]
    });
});

Deno.test("zipAttrsWith - concatenate strings", () => {
    const result = builtins.zipAttrsWith((name) => (values) => values.join(","))([
        {a: "x", b: "y"},
        {a: "z", b: "w"}
    ]);
    assertEquals(result, {
        a: "x,z",
        b: "y,w"
    });
});

// ============================================================================
// foldl' Tests - Strict left fold
// ============================================================================

Deno.test("foldl' - sum numbers", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc + x)(0n)([1n, 2n, 3n, 4n]);
    assertEquals(result, 10n);
});

Deno.test("foldl' - empty list returns initial", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc + x)(42n)([]);
    assertEquals(result, 42n);
});

Deno.test("foldl' - multiply numbers", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc * x)(1n)([2n, 3n, 4n]);
    assertEquals(result, 24n);
});

Deno.test("foldl' - concatenate strings", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc + x)("")(["a", "b", "c"]);
    assertEquals(result, "abc");
});

Deno.test("foldl' - build list in reverse", () => {
    const result = builtins["foldl'"]((acc) => (x) => [x, ...acc])([])([1n, 2n, 3n]);
    assertEquals(result, [3n, 2n, 1n]);
});

Deno.test("foldl' - count elements", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc + 1n)(0n)([1n, 2n, 3n, 4n, 5n]);
    assertEquals(result, 5n);
});

Deno.test("foldl' - single element", () => {
    const result = builtins["foldl'"]((acc) => (x) => acc + x)(10n)([5n]);
    assertEquals(result, 15n);
});
