import { assertEquals } from "jsr:@std/assert";
import { builtins, Path } from "../runtime.js";

// Type Checking Builtins Tests
// Testing all 10 type checking functions: isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf
// Based on Nix 2.18 documentation: https://nix.dev/manual/nix/2.18/language/builtins

// ============================================================================
// isNull Tests
// ============================================================================

Deno.test("isNull - returns true for null", () => {
    assertEquals(builtins.isNull(null), true);
});

Deno.test("isNull - returns false for 0", () => {
    assertEquals(builtins.isNull(0), false);
});

Deno.test("isNull - returns false for empty string", () => {
    assertEquals(builtins.isNull(""), false);
});

Deno.test("isNull - returns false for false", () => {
    assertEquals(builtins.isNull(false), false);
});

Deno.test("isNull - returns false for empty object", () => {
    assertEquals(builtins.isNull({}), false);
});

Deno.test("isNull - returns false for empty array", () => {
    assertEquals(builtins.isNull([]), false);
});

// ============================================================================
// isBool Tests
// ============================================================================

Deno.test("isBool - returns true for true", () => {
    assertEquals(builtins.isBool(true), true);
});

Deno.test("isBool - returns true for false", () => {
    assertEquals(builtins.isBool(false), true);
});

Deno.test("isBool - returns false for 1", () => {
    assertEquals(builtins.isBool(1), false);
});

Deno.test("isBool - returns false for 0", () => {
    assertEquals(builtins.isBool(0), false);
});

Deno.test("isBool - returns false for string 'true'", () => {
    assertEquals(builtins.isBool("true"), false);
});

Deno.test("isBool - returns false for null", () => {
    assertEquals(builtins.isBool(null), false);
});

// ============================================================================
// isInt Tests
// ============================================================================

Deno.test("isInt - returns true for BigInt 5", () => {
    assertEquals(builtins.isInt(5n), true);
});

Deno.test("isInt - returns true for BigInt 0", () => {
    assertEquals(builtins.isInt(0n), true);
});

Deno.test("isInt - returns true for negative BigInt", () => {
    assertEquals(builtins.isInt(-42n), true);
});

Deno.test("isInt - returns false for Number", () => {
    assertEquals(builtins.isInt(5), false);
});

Deno.test("isInt - returns false for float", () => {
    assertEquals(builtins.isInt(5.5), false);
});

Deno.test("isInt - returns false for string '5'", () => {
    assertEquals(builtins.isInt("5"), false);
});

Deno.test("isInt - returns false for null", () => {
    assertEquals(builtins.isInt(null), false);
});

// ============================================================================
// isFloat Tests
// ============================================================================

Deno.test("isFloat - returns true for Number 5.5", () => {
    assertEquals(builtins.isFloat(5.5), true);
});

Deno.test("isFloat - returns true for Number 0.0", () => {
    assertEquals(builtins.isFloat(0.0), true);
});

Deno.test("isFloat - returns true for negative float", () => {
    assertEquals(builtins.isFloat(-3.14), true);
});

Deno.test("isFloat - returns true for integer Number (5 without n)", () => {
    // In JavaScript, 5 is a Number, not BigInt. Nix treats all Numbers as floats.
    assertEquals(builtins.isFloat(5), true);
});

Deno.test("isFloat - returns false for BigInt", () => {
    assertEquals(builtins.isFloat(5n), false);
});

Deno.test("isFloat - returns false for string '5.5'", () => {
    assertEquals(builtins.isFloat("5.5"), false);
});

Deno.test("isFloat - returns false for null", () => {
    assertEquals(builtins.isFloat(null), false);
});

// ============================================================================
// isString Tests
// ============================================================================

Deno.test("isString - returns true for string", () => {
    assertEquals(builtins.isString("hello"), true);
});

Deno.test("isString - returns true for empty string", () => {
    assertEquals(builtins.isString(""), true);
});

Deno.test("isString - returns false for number", () => {
    assertEquals(builtins.isString(5), false);
});

Deno.test("isString - returns false for null", () => {
    assertEquals(builtins.isString(null), false);
});

Deno.test("isString - returns false for object", () => {
    assertEquals(builtins.isString({}), false);
});

Deno.test("isString - returns false for array", () => {
    assertEquals(builtins.isString([]), false);
});

// ============================================================================
// isList Tests
// ============================================================================

Deno.test("isList - returns true for array", () => {
    assertEquals(builtins.isList([1, 2, 3]), true);
});

Deno.test("isList - returns true for empty array", () => {
    assertEquals(builtins.isList([]), true);
});

Deno.test("isList - returns false for string", () => {
    assertEquals(builtins.isList("abc"), false);
});

Deno.test("isList - returns false for object", () => {
    assertEquals(builtins.isList({a: 1}), false);
});

Deno.test("isList - returns false for null", () => {
    assertEquals(builtins.isList(null), false);
});

Deno.test("isList - returns false for number", () => {
    assertEquals(builtins.isList(5), false);
});

// ============================================================================
// isAttrs Tests
// ============================================================================

Deno.test("isAttrs - returns true for object", () => {
    assertEquals(builtins.isAttrs({a: 1, b: 2}), true);
});

Deno.test("isAttrs - returns true for empty object", () => {
    assertEquals(builtins.isAttrs({}), true);
});

Deno.test("isAttrs - returns false for array", () => {
    assertEquals(builtins.isAttrs([1, 2, 3]), false);
});

Deno.test("isAttrs - returns false for null", () => {
    assertEquals(builtins.isAttrs(null), false);
});

Deno.test("isAttrs - returns false for undefined", () => {
    assertEquals(builtins.isAttrs(undefined), false);
});

Deno.test("isAttrs - returns false for string", () => {
    assertEquals(builtins.isAttrs("hello"), false);
});

Deno.test("isAttrs - returns false for number", () => {
    assertEquals(builtins.isAttrs(5), false);
});

// ============================================================================
// isFunction Tests
// ============================================================================

Deno.test("isFunction - returns true for function", () => {
    assertEquals(builtins.isFunction((x) => x), true);
});

Deno.test("isFunction - returns true for named function", () => {
    function testFn() { return 1; }
    assertEquals(builtins.isFunction(testFn), true);
});

Deno.test("isFunction - returns false for object", () => {
    assertEquals(builtins.isFunction({}), false);
});

Deno.test("isFunction - returns false for array", () => {
    assertEquals(builtins.isFunction([]), false);
});

Deno.test("isFunction - returns false for string", () => {
    assertEquals(builtins.isFunction("function"), false);
});

Deno.test("isFunction - returns false for null", () => {
    assertEquals(builtins.isFunction(null), false);
});

// ============================================================================
// isPath Tests
// ============================================================================

Deno.test("isPath - returns true for Path instance", () => {
    // Path is a class in runtime.js that extends InterpolatedString
    const path = new Path(["/tmp/test"]);
    assertEquals(builtins.isPath(path), true);
});

Deno.test("isPath - returns false for string path", () => {
    // Plain strings are not Path instances
    assertEquals(builtins.isPath("/tmp/test"), false);
});

Deno.test("isPath - returns false for object", () => {
    assertEquals(builtins.isPath({}), false);
});

Deno.test("isPath - returns false for null", () => {
    assertEquals(builtins.isPath(null), false);
});

Deno.test("isPath - returns false for number", () => {
    assertEquals(builtins.isPath(5), false);
});

// ============================================================================
// typeOf Tests - Comprehensive type detection
// ============================================================================

Deno.test("typeOf - returns 'int' for BigInt", () => {
    assertEquals(builtins.typeOf(5n), "int");
});

Deno.test("typeOf - returns 'int' for negative BigInt", () => {
    assertEquals(builtins.typeOf(-42n), "int");
});

Deno.test("typeOf - returns 'float' for Number", () => {
    assertEquals(builtins.typeOf(5.5), "float");
});

Deno.test("typeOf - returns 'float' for integer Number", () => {
    assertEquals(builtins.typeOf(5), "float");
});

Deno.test("typeOf - returns 'bool' for true", () => {
    assertEquals(builtins.typeOf(true), "bool");
});

Deno.test("typeOf - returns 'bool' for false", () => {
    assertEquals(builtins.typeOf(false), "bool");
});

Deno.test("typeOf - returns 'string' for string", () => {
    assertEquals(builtins.typeOf("hello"), "string");
});

Deno.test("typeOf - returns 'string' for empty string", () => {
    assertEquals(builtins.typeOf(""), "string");
});

Deno.test("typeOf - returns 'list' for array", () => {
    assertEquals(builtins.typeOf([1, 2, 3]), "list");
});

Deno.test("typeOf - returns 'list' for empty array", () => {
    assertEquals(builtins.typeOf([]), "list");
});

Deno.test("typeOf - returns 'set' for object", () => {
    assertEquals(builtins.typeOf({a: 1}), "set");
});

Deno.test("typeOf - returns 'set' for empty object", () => {
    assertEquals(builtins.typeOf({}), "set");
});

Deno.test("typeOf - returns 'lambda' for function", () => {
    assertEquals(builtins.typeOf((x) => x), "lambda");
});

Deno.test("typeOf - returns 'null' for null", () => {
    assertEquals(builtins.typeOf(null), "null");
});

Deno.test("typeOf - returns 'path' for Path instance", () => {
    const path = new Path(["/tmp/test"]);
    assertEquals(builtins.typeOf(path), "path");
});
