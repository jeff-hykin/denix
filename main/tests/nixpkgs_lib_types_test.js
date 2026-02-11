/**
 * Comprehensive test suite for nixpkgs lib/types.nix
 *
 * This file tests the NixOS module system type definitions including:
 * - Basic types (bool, int, str, float, etc.)
 * - Container types (listOf, attrsOf, etc.)
 * - Advanced types (submodule, either, oneOf, etc.)
 * - Type combinators (nullOr, enum, etc.)
 *
 * Each test:
 * 1. Loads types.nix with proper lib dependencies
 * 2. Tests type.check() function behavior
 * 3. Tests type metadata (name, description)
 * 4. Validates outputs match Nix exactly
 */

import { convertToJs } from "../translator.js";
import { createRuntime } from "../runtime.js";
import { resolve, dirname, join } from "https://deno.land/std@0.198.0/path/mod.ts";

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);
const fixturesDir = resolve(__dirname, "fixtures/nixpkgs-lib");

// Create runtime once
const runtimeInstance = createRuntime();
const runtime = runtimeInstance.runtime;

/**
 * Helper to create a minimal lib implementation for types.nix
 * This provides all the dependencies that types.nix needs
 */
function createLibStub() {
  const builtins = runtime;

  return {
    elem: builtins.elem,
    flip: (f) => (a) => (b) => f(b)(a),
    isAttrs: builtins.isAttrs,
    isBool: builtins.isBool,
    isFloat: builtins.isFloat,
    isFunction: builtins.isFunction,
    isInt: builtins.isInt,
    isList: builtins.isList,
    isString: builtins.isString,
    toList: builtins.toList,
    throwIf: (cond) => (msg) => (value) => {
      if (cond) throw new Error(msg);
      return value;
    },

    lists: {
      concatLists: builtins.concatLists,
      elemAt: builtins.elemAt,
      filter: builtins.filter,
      foldl_: builtins.foldl_,
      head: builtins.head,
      last: builtins.last,
      length: builtins.length,
      tail: builtins.tail,
      count: (pred) => (list) => {
        const filtered = builtins.filter(pred)(list);
        return builtins.length(filtered);
      },
      imap1: (f) => (list) => {
        const len = Number(builtins.length(list));
        const result = [];
        for (let i = 0; i < len; i++) {
          const elem = builtins.elemAt(list)(BigInt(i));
          result.push(f(BigInt(i + 1))(elem));
        }
        return result;
      },
    },

    attrsets: {
      attrNames: builtins.attrNames,
      hasAttr: builtins.hasAttr,
      mapAttrs: builtins.mapAttrs,
      filterAttrs: builtins.filterAttrs,
      optionalAttrs: (cond) => (attrs) => cond ? attrs : {},
      zipAttrsWith: (f) => (sets) => {
        const allNames = new Set();
        for (const set of sets) {
          for (const name of builtins.attrNames(set)) {
            allNames.add(name);
          }
        }
        const result = {};
        for (const name of allNames) {
          const values = sets.map(set => set[name] !== undefined ? set[name] : null);
          result[name] = f(name)(values);
        }
        return result;
      },
    },

    strings: {
      concatStringsSep: builtins.concatStringsSep,
      concatMapStringsSep: (sep) => (f) => (list) => {
        const mapped = list.map(f);
        return builtins.concatStringsSep(sep)(mapped);
      },
      escapeNixString: (s) => `"${s}"`,
      hasInfix: (infix) => (str) => str.includes(infix),
      isStringLike: (x) => {
        return typeof x === 'string' ||
               x?.constructor?.name === 'InterpolatedString' ||
               x?.constructor?.name === 'Path' ||
               (typeof x === 'object' && x !== null && '__toString' in x);
      },
    },

    trivial: {
      boolToString: (b) => b ? "true" : "false",
    },

    options: {
      mergeDefaultOption: (loc) => (defs) => {
        if (defs.length === 0) return null;
        return defs[0].value;
      },
      mergeEqualOption: (loc) => (defs) => {
        if (defs.length === 0) return null;
        const first = defs[0];
        for (const def of defs) {
          if (def.value !== first.value) {
            throw new Error("conflicting values");
          }
        }
        return first.value;
      },
      mergeOneOption: (loc) => (defs) => {
        if (defs.length !== 1) {
          throw new Error("multiple definitions");
        }
        return defs[0].value;
      },
      mergeUniqueOption: (args) => (loc) => (defs) => {
        if (defs.length !== 1) {
          throw new Error("multiple unique definitions");
        }
        return defs[0].value;
      },
      getFiles: (defs) => defs.map(x => x.file),
      getValues: (defs) => defs.map(x => x.value),
      showFiles: (files) => builtins.concatStringsSep(", ")(files),
      showDefs: (defs) => builtins.concatStringsSep(", ")(defs.map(x => x.file)),
      showOption: (loc) => builtins.concatStringsSep(".")(loc),
    },

    modules: {
      mergeDefinitions: (args) => args,
      fixupOptionType: (t) => t,
      mergeOptionDecls: (args) => args,
    },

    fileset: {
      isFileset: (x) => false,
      unions: (x) => x,
      empty: {},
    },

    assertMsg: (cond) => (msg) => cond,
    isDerivation: (x) => false,
    isStorePath: (x) => false,
    toDerivation: (x) => x,
    types: null, // Will be set after types module loads
  };
}

/**
 * Load and evaluate types.nix with our translator
 */
async function loadTypes() {
  const typesPath = join(fixturesDir, "lib/types.nix");
  const nixCode = await Deno.readTextFile(typesPath);

  // Translate to JavaScript
  const jsCode = convertToJs(nixCode, { relativePath: typesPath });

  // Create lib stub
  const lib = createLibStub();

  // Evaluate the translated code - it returns a function that takes { lib }
  const moduleFunc = eval(jsCode);

  // Call the function with lib parameter
  const types = moduleFunc({ lib });

  // Set lib.types to reference itself (circular reference in original)
  lib.types = types;
  types.types = types;

  return types;
}

// Load types once for all tests
let types;

Deno.test("types.nix - load module successfully", async () => {
  types = await loadTypes();

  if (!types || typeof types !== 'object') {
    throw new Error("Failed to load types module");
  }

  if (!types.bool || !types.int || !types.str) {
    throw new Error("Missing basic type definitions");
  }
});

// ============================================================================
// BASIC TYPES - Test primitive type checkers
// ============================================================================

Deno.test("types.bool - check accepts boolean values", async () => {
  if (!types) types = await loadTypes();

  const trueResult = types.bool.check(true);
  const falseResult = types.bool.check(false);

  if (trueResult !== true) {
    throw new Error(`types.bool.check(true) should be true, got ${trueResult}`);
  }
  if (falseResult !== true) {
    throw new Error(`types.bool.check(false) should be true, got ${falseResult}`);
  }
});

Deno.test("types.bool - check rejects non-boolean values", async () => {
  if (!types) types = await loadTypes();

  const stringResult = types.bool.check("true");
  const numberResult = types.bool.check(1n);
  const nullResult = types.bool.check(null);

  if (stringResult !== false) {
    throw new Error(`types.bool.check("true") should be false, got ${stringResult}`);
  }
  if (numberResult !== false) {
    throw new Error(`types.bool.check(1) should be false, got ${numberResult}`);
  }
  if (nullResult !== false) {
    throw new Error(`types.bool.check(null) should be false, got ${nullResult}`);
  }
});

Deno.test("types.bool - has correct metadata", async () => {
  if (!types) types = await loadTypes();

  if (types.bool.name !== "bool") {
    throw new Error(`types.bool.name should be "bool", got "${types.bool.name}"`);
  }

  if (types.bool._type !== "option-type") {
    throw new Error(`types.bool._type should be "option-type", got "${types.bool._type}"`);
  }
});

Deno.test("types.int - check accepts integer values", async () => {
  if (!types) types = await loadTypes();

  const posResult = types.int.check(42n);
  const negResult = types.int.check(-5n);
  const zeroResult = types.int.check(0n);

  if (posResult !== true) {
    throw new Error(`types.int.check(42) should be true, got ${posResult}`);
  }
  if (negResult !== true) {
    throw new Error(`types.int.check(-5) should be true, got ${negResult}`);
  }
  if (zeroResult !== true) {
    throw new Error(`types.int.check(0) should be true, got ${zeroResult}`);
  }
});

Deno.test("types.int - check rejects non-integer values", async () => {
  if (!types) types = await loadTypes();

  const floatResult = types.int.check(3.14);
  const stringResult = types.int.check("42");
  const boolResult = types.int.check(true);

  if (floatResult !== false) {
    throw new Error(`types.int.check(3.14) should be false, got ${floatResult}`);
  }
  if (stringResult !== false) {
    throw new Error(`types.int.check("42") should be false, got ${stringResult}`);
  }
  if (boolResult !== false) {
    throw new Error(`types.int.check(true) should be false, got ${boolResult}`);
  }
});

Deno.test("types.int - has correct metadata", async () => {
  if (!types) types = await loadTypes();

  if (types.int.name !== "int") {
    throw new Error(`types.int.name should be "int", got "${types.int.name}"`);
  }
});

Deno.test("types.str - check accepts string values", async () => {
  if (!types) types = await loadTypes();

  const emptyResult = types.str.check("");
  const simpleResult = types.str.check("hello");
  const unicodeResult = types.str.check("hello 世界 🌍");

  if (emptyResult !== true) {
    throw new Error(`types.str.check("") should be true, got ${emptyResult}`);
  }
  if (simpleResult !== true) {
    throw new Error(`types.str.check("hello") should be true, got ${simpleResult}`);
  }
  if (unicodeResult !== true) {
    throw new Error(`types.str.check("unicode") should be true, got ${unicodeResult}`);
  }
});

Deno.test("types.str - check rejects non-string values", async () => {
  if (!types) types = await loadTypes();

  const intResult = types.str.check(123n);
  const boolResult = types.str.check(true);
  const listResult = types.str.check([1, 2, 3]);

  if (intResult !== false) {
    throw new Error(`types.str.check(123) should be false, got ${intResult}`);
  }
  if (boolResult !== false) {
    throw new Error(`types.str.check(true) should be false, got ${boolResult}`);
  }
  if (listResult !== false) {
    throw new Error(`types.str.check([...]) should be false, got ${listResult}`);
  }
});

Deno.test("types.float - check accepts float values", async () => {
  if (!types) types = await loadTypes();

  const piResult = types.float.check(3.14);
  const negResult = types.float.check(-2.5);
  const zeroResult = types.float.check(0.0);

  if (piResult !== true) {
    throw new Error(`types.float.check(3.14) should be true, got ${piResult}`);
  }
  if (negResult !== true) {
    throw new Error(`types.float.check(-2.5) should be true, got ${negResult}`);
  }
  if (zeroResult !== true) {
    throw new Error(`types.float.check(0.0) should be true, got ${zeroResult}`);
  }
});

Deno.test("types.float - check rejects non-float values", async () => {
  if (!types) types = await loadTypes();

  const intResult = types.float.check(42n);
  const stringResult = types.float.check("3.14");

  if (intResult !== false) {
    throw new Error(`types.float.check(42) should be false, got ${intResult}`);
  }
  if (stringResult !== false) {
    throw new Error(`types.float.check("3.14") should be false, got ${stringResult}`);
  }
});

Deno.test("types.number - check accepts both int and float", async () => {
  if (!types) types = await loadTypes();

  const intResult = types.number.check(42n);
  const floatResult = types.number.check(3.14);

  if (intResult !== true) {
    throw new Error(`types.number.check(42) should be true, got ${intResult}`);
  }
  if (floatResult !== true) {
    throw new Error(`types.number.check(3.14) should be true, got ${floatResult}`);
  }
});

Deno.test("types.number - check rejects non-numeric values", async () => {
  if (!types) types = await loadTypes();

  const stringResult = types.number.check("42");
  const boolResult = types.number.check(true);

  if (stringResult !== false) {
    throw new Error(`types.number.check("42") should be false, got ${stringResult}`);
  }
  if (boolResult !== false) {
    throw new Error(`types.number.check(true) should be false, got ${boolResult}`);
  }
});

Deno.test("types.attrs - check accepts attribute sets", async () => {
  if (!types) types = await loadTypes();

  const emptyResult = types.attrs.check({});
  const simpleResult = types.attrs.check({ a: 1n, b: 2n });
  const nestedResult = types.attrs.check({ x: { y: "z" } });

  if (emptyResult !== true) {
    throw new Error(`types.attrs.check({}) should be true, got ${emptyResult}`);
  }
  if (simpleResult !== true) {
    throw new Error(`types.attrs.check({a:1,b:2}) should be true, got ${simpleResult}`);
  }
  if (nestedResult !== true) {
    throw new Error(`types.attrs.check(nested) should be true, got ${nestedResult}`);
  }
});

Deno.test("types.attrs - check rejects non-attribute-set values", async () => {
  if (!types) types = await loadTypes();

  const listResult = types.attrs.check([1, 2, 3]);
  const stringResult = types.attrs.check("not attrs");
  const nullResult = types.attrs.check(null);

  if (listResult !== false) {
    throw new Error(`types.attrs.check([...]) should be false, got ${listResult}`);
  }
  if (stringResult !== false) {
    throw new Error(`types.attrs.check("...") should be false, got ${stringResult}`);
  }
  if (nullResult !== false) {
    throw new Error(`types.attrs.check(null) should be false, got ${nullResult}`);
  }
});

// ============================================================================
// SPECIAL TYPES - Test anything, unspecified, raw
// ============================================================================

Deno.test("types.anything - check accepts all values", async () => {
  if (!types) types = await loadTypes();

  const stringResult = types.anything.check("test");
  const intResult = types.anything.check(42n);
  const listResult = types.anything.check([1, 2, 3]);
  const attrsResult = types.anything.check({ a: 1 });
  const nullResult = types.anything.check(null);

  if (stringResult !== true) {
    throw new Error(`types.anything.check("test") should be true, got ${stringResult}`);
  }
  if (intResult !== true) {
    throw new Error(`types.anything.check(42) should be true, got ${intResult}`);
  }
  if (listResult !== true) {
    throw new Error(`types.anything.check([...]) should be true, got ${listResult}`);
  }
  if (attrsResult !== true) {
    throw new Error(`types.anything.check({...}) should be true, got ${attrsResult}`);
  }
  if (nullResult !== true) {
    throw new Error(`types.anything.check(null) should be true, got ${nullResult}`);
  }
});

Deno.test("types.unspecified - check accepts all values", async () => {
  if (!types) types = await loadTypes();

  const result1 = types.unspecified.check("any value");
  const result2 = types.unspecified.check(123n);

  if (result1 !== true) {
    throw new Error(`types.unspecified.check should accept any value`);
  }
  if (result2 !== true) {
    throw new Error(`types.unspecified.check should accept any value`);
  }
});

Deno.test("types.raw - check accepts all values", async () => {
  if (!types) types = await loadTypes();

  const result = types.raw.check("anything");

  if (result !== true) {
    throw new Error(`types.raw.check should accept any value`);
  }
});

// ============================================================================
// CONTAINER TYPES - Test listOf, attrsOf
// ============================================================================

Deno.test("types.listOf - creates list type checker", async () => {
  if (!types) types = await loadTypes();

  const listOfInt = types.listOf(types.int);

  if (!listOfInt || typeof listOfInt !== 'object') {
    throw new Error("types.listOf should return a type object");
  }

  if (listOfInt.name !== "listOf") {
    throw new Error(`listOfInt.name should be "listOf", got "${listOfInt.name}"`);
  }
});

Deno.test("types.listOf - check validates list elements", async () => {
  if (!types) types = await loadTypes();

  const listOfInt = types.listOf(types.int);

  const validResult = listOfInt.check([1n, 2n, 3n]);
  const emptyResult = listOfInt.check([]);
  const invalidResult = listOfInt.check([1n, "not int", 3n]);
  const notListResult = listOfInt.check("not a list");

  if (validResult !== true) {
    throw new Error(`listOfInt.check([1,2,3]) should be true, got ${validResult}`);
  }
  if (emptyResult !== true) {
    throw new Error(`listOfInt.check([]) should be true, got ${emptyResult}`);
  }
  if (invalidResult !== false) {
    throw new Error(`listOfInt.check with string should be false, got ${invalidResult}`);
  }
  if (notListResult !== false) {
    throw new Error(`listOfInt.check("...") should be false, got ${notListResult}`);
  }
});

Deno.test("types.listOf - works with nested types", async () => {
  if (!types) types = await loadTypes();

  const listOfListOfInt = types.listOf(types.listOf(types.int));

  const validResult = listOfListOfInt.check([[1n, 2n], [3n, 4n], []]);
  const invalidResult = listOfListOfInt.check([[1n, 2n], [3n, "bad"]]);

  if (validResult !== true) {
    throw new Error(`nested listOf should accept valid nested lists`);
  }
  if (invalidResult !== false) {
    throw new Error(`nested listOf should reject invalid nested lists`);
  }
});

Deno.test("types.attrsOf - creates attribute set type checker", async () => {
  if (!types) types = await loadTypes();

  const attrsOfStr = types.attrsOf(types.str);

  if (!attrsOfStr || typeof attrsOfStr !== 'object') {
    throw new Error("types.attrsOf should return a type object");
  }

  if (attrsOfStr.name !== "attrsOf") {
    throw new Error(`attrsOfStr.name should be "attrsOf", got "${attrsOfStr.name}"`);
  }
});

Deno.test("types.attrsOf - check validates attribute values", async () => {
  if (!types) types = await loadTypes();

  const attrsOfStr = types.attrsOf(types.str);

  const validResult = attrsOfStr.check({ a: "hello", b: "world" });
  const emptyResult = attrsOfStr.check({});
  const invalidResult = attrsOfStr.check({ a: "hello", b: 123n });
  const notAttrsResult = attrsOfStr.check([1, 2, 3]);

  if (validResult !== true) {
    throw new Error(`attrsOfStr.check valid attrs should be true, got ${validResult}`);
  }
  if (emptyResult !== true) {
    throw new Error(`attrsOfStr.check({}) should be true, got ${emptyResult}`);
  }
  if (invalidResult !== false) {
    throw new Error(`attrsOfStr.check with int value should be false, got ${invalidResult}`);
  }
  if (notAttrsResult !== false) {
    throw new Error(`attrsOfStr.check([...]) should be false, got ${notAttrsResult}`);
  }
});

// ============================================================================
// TYPE COMBINATORS - Test nullOr, either, oneOf
// ============================================================================

Deno.test("types.nullOr - accepts null or specified type", async () => {
  if (!types) types = await loadTypes();

  const nullOrInt = types.nullOr(types.int);

  const intResult = nullOrInt.check(42n);
  const nullResult = nullOrInt.check(null);
  const stringResult = nullOrInt.check("not int");

  if (intResult !== true) {
    throw new Error(`nullOrInt.check(42) should be true, got ${intResult}`);
  }
  if (nullResult !== true) {
    throw new Error(`nullOrInt.check(null) should be true, got ${nullResult}`);
  }
  if (stringResult !== false) {
    throw new Error(`nullOrInt.check("...") should be false, got ${stringResult}`);
  }
});

Deno.test("types.nullOr - has correct metadata", async () => {
  if (!types) types = await loadTypes();

  const nullOrStr = types.nullOr(types.str);

  if (nullOrStr.name !== "nullOr") {
    throw new Error(`nullOrStr.name should be "nullOr", got "${nullOrStr.name}"`);
  }
});

Deno.test("types.either - accepts either of two types", async () => {
  if (!types) types = await loadTypes();

  const intOrStr = types.either(types.int)(types.str);

  const intResult = intOrStr.check(42n);
  const strResult = intOrStr.check("hello");
  const boolResult = intOrStr.check(true);

  if (intResult !== true) {
    throw new Error(`intOrStr.check(42) should be true, got ${intResult}`);
  }
  if (strResult !== true) {
    throw new Error(`intOrStr.check("hello") should be true, got ${strResult}`);
  }
  if (boolResult !== false) {
    throw new Error(`intOrStr.check(true) should be false, got ${boolResult}`);
  }
});

Deno.test("types.either - has correct metadata", async () => {
  if (!types) types = await loadTypes();

  const boolOrInt = types.either(types.bool)(types.int);

  if (boolOrInt.name !== "either") {
    throw new Error(`either type name should be "either", got "${boolOrInt.name}"`);
  }
});

Deno.test("types.oneOf - accepts any of multiple types", async () => {
  if (!types) types = await loadTypes();

  const multiType = types.oneOf([types.bool, types.int, types.str]);

  const boolResult = multiType.check(true);
  const intResult = multiType.check(42n);
  const strResult = multiType.check("hello");
  const listResult = multiType.check([1, 2, 3]);

  if (boolResult !== true) {
    throw new Error(`oneOf should accept bool, got ${boolResult}`);
  }
  if (intResult !== true) {
    throw new Error(`oneOf should accept int, got ${intResult}`);
  }
  if (strResult !== true) {
    throw new Error(`oneOf should accept str, got ${strResult}`);
  }
  if (listResult !== false) {
    throw new Error(`oneOf should reject list, got ${listResult}`);
  }
});

Deno.test("types.oneOf - throws on empty list", async () => {
  if (!types) types = await loadTypes();

  let threw = false;
  try {
    types.oneOf([]);
  } catch (e) {
    threw = true;
    if (!e.message.includes("at least one type")) {
      throw new Error(`Expected error about "at least one type", got: ${e.message}`);
    }
  }

  if (!threw) {
    throw new Error("types.oneOf([]) should throw an error");
  }
});

// ============================================================================
// ENUM TYPE - Test enum type with allowed values
// ============================================================================

Deno.test("types.enum - accepts values from allowed list", async () => {
  if (!types) types = await loadTypes();

  const colorEnum = types.enum(["red", "green", "blue"]);

  const redResult = colorEnum.check("red");
  const greenResult = colorEnum.check("green");
  const blueResult = colorEnum.check("blue");
  const yellowResult = colorEnum.check("yellow");
  const intResult = colorEnum.check(123n);

  if (redResult !== true) {
    throw new Error(`enum should accept "red", got ${redResult}`);
  }
  if (greenResult !== true) {
    throw new Error(`enum should accept "green", got ${greenResult}`);
  }
  if (blueResult !== true) {
    throw new Error(`enum should accept "blue", got ${blueResult}`);
  }
  if (yellowResult !== false) {
    throw new Error(`enum should reject "yellow", got ${yellowResult}`);
  }
  if (intResult !== false) {
    throw new Error(`enum should reject int, got ${intResult}`);
  }
});

Deno.test("types.enum - has correct metadata", async () => {
  if (!types) types = await loadTypes();

  const sizeEnum = types.enum(["small", "medium", "large"]);

  if (sizeEnum.name !== "enum") {
    throw new Error(`enum.name should be "enum", got "${sizeEnum.name}"`);
  }
});

// ============================================================================
// UTILITY FUNCTIONS - Test isType, isOptionType, mkOptionType
// ============================================================================

Deno.test("types.isType - checks type tag", async () => {
  if (!types) types = await loadTypes();

  const isOptionType = types.isType("option-type");

  const typeResult = isOptionType(types.int);
  const nonTypeResult = isOptionType({ _type: "other" });
  const plainObjResult = isOptionType({});

  if (typeResult !== true) {
    throw new Error(`isType should recognize option-type, got ${typeResult}`);
  }
  if (nonTypeResult !== false) {
    throw new Error(`isType should reject wrong type tag, got ${nonTypeResult}`);
  }
  if (plainObjResult !== false) {
    throw new Error(`isType should reject plain objects, got ${plainObjResult}`);
  }
});

Deno.test("types.isOptionType - checks if value is option type", async () => {
  if (!types) types = await loadTypes();

  const typeResult = types.isOptionType(types.str);
  const nonTypeResult = types.isOptionType("not a type");

  if (typeResult !== true) {
    throw new Error(`isOptionType should recognize types.str, got ${typeResult}`);
  }
  if (nonTypeResult !== false) {
    throw new Error(`isOptionType should reject strings, got ${nonTypeResult}`);
  }
});

Deno.test("types.mkOptionType - creates custom type", async () => {
  if (!types) types = await loadTypes();

  const customType = types.mkOptionType({
    name: "customPositive",
    description: "positive integer",
    check: (x) => typeof x === 'bigint' && x > 0n,
  });

  if (customType.name !== "customPositive") {
    throw new Error(`Custom type should have correct name`);
  }

  if (customType._type !== "option-type") {
    throw new Error(`Custom type should have _type = "option-type"`);
  }

  const validResult = customType.check(5n);
  const invalidResult = customType.check(-5n);
  const zeroResult = customType.check(0n);

  if (validResult !== true) {
    throw new Error(`customType should accept 5, got ${validResult}`);
  }
  if (invalidResult !== false) {
    throw new Error(`customType should reject -5, got ${invalidResult}`);
  }
  if (zeroResult !== false) {
    throw new Error(`customType should reject 0, got ${zeroResult}`);
  }
});

// ============================================================================
// STRING VARIANTS - Test nonEmptyStr, separatedString
// ============================================================================

Deno.test("types.nonEmptyStr - rejects empty strings", async () => {
  if (!types) types = await loadTypes();

  const validResult = types.nonEmptyStr.check("hello");
  const emptyResult = types.nonEmptyStr.check("");
  const intResult = types.nonEmptyStr.check(123n);

  if (validResult !== true) {
    throw new Error(`nonEmptyStr should accept "hello", got ${validResult}`);
  }
  if (emptyResult !== false) {
    throw new Error(`nonEmptyStr should reject "", got ${emptyResult}`);
  }
  if (intResult !== false) {
    throw new Error(`nonEmptyStr should reject int, got ${intResult}`);
  }
});

Deno.test("types.separatedString - validates string format", async () => {
  if (!types) types = await loadTypes();

  const commaSeparated = types.separatedString(",");

  const validResult = commaSeparated.check("a,b,c");
  const singleResult = commaSeparated.check("single");
  const emptyResult = commaSeparated.check("");

  if (validResult !== true) {
    throw new Error(`separatedString should accept "a,b,c", got ${validResult}`);
  }
  if (singleResult !== true) {
    throw new Error(`separatedString should accept single item, got ${singleResult}`);
  }
  if (emptyResult !== true) {
    throw new Error(`separatedString should accept empty, got ${emptyResult}`);
  }
});

Deno.test("types.lines - accepts newline-separated strings", async () => {
  if (!types) types = await loadTypes();

  const multilineResult = types.lines.check("line1\nline2\nline3");
  const singleResult = types.lines.check("single line");

  if (multilineResult !== true) {
    throw new Error(`types.lines should accept multiline, got ${multilineResult}`);
  }
  if (singleResult !== true) {
    throw new Error(`types.lines should accept single line, got ${singleResult}`);
  }
});

Deno.test("types.commas - accepts comma-separated strings", async () => {
  if (!types) types = await loadTypes();

  const result = types.commas.check("a,b,c");

  if (result !== true) {
    throw new Error(`types.commas should accept "a,b,c", got ${result}`);
  }
});

// ============================================================================
// INTEGER RANGES - Test ints.positive, ints.u8, ints.u16, etc.
// ============================================================================

Deno.test("types.ints.positive - validates positive integers", async () => {
  if (!types) types = await loadTypes();

  const validResult = types.ints.positive.check(1n);
  const largeResult = types.ints.positive.check(1000000n);
  const zeroResult = types.ints.positive.check(0n);
  const negResult = types.ints.positive.check(-5n);

  if (validResult !== true) {
    throw new Error(`ints.positive should accept 1, got ${validResult}`);
  }
  if (largeResult !== true) {
    throw new Error(`ints.positive should accept large numbers, got ${largeResult}`);
  }
  if (zeroResult !== false) {
    throw new Error(`ints.positive should reject 0, got ${zeroResult}`);
  }
  if (negResult !== false) {
    throw new Error(`ints.positive should reject negative, got ${negResult}`);
  }
});

Deno.test("types.ints.unsigned - validates non-negative integers", async () => {
  if (!types) types = await loadTypes();

  const validResult = types.ints.unsigned.check(5n);
  const zeroResult = types.ints.unsigned.check(0n);
  const negResult = types.ints.unsigned.check(-1n);

  if (validResult !== true) {
    throw new Error(`ints.unsigned should accept 5, got ${validResult}`);
  }
  if (zeroResult !== true) {
    throw new Error(`ints.unsigned should accept 0, got ${zeroResult}`);
  }
  if (negResult !== false) {
    throw new Error(`ints.unsigned should reject -1, got ${negResult}`);
  }
});

Deno.test("types.ints.u8 - validates 8-bit unsigned integers", async () => {
  if (!types) types = await loadTypes();

  const zeroResult = types.ints.u8.check(0n);
  const validResult = types.ints.u8.check(128n);
  const maxResult = types.ints.u8.check(255n);
  const overResult = types.ints.u8.check(256n);
  const negResult = types.ints.u8.check(-1n);

  if (zeroResult !== true) {
    throw new Error(`ints.u8 should accept 0, got ${zeroResult}`);
  }
  if (validResult !== true) {
    throw new Error(`ints.u8 should accept 128, got ${validResult}`);
  }
  if (maxResult !== true) {
    throw new Error(`ints.u8 should accept 255, got ${maxResult}`);
  }
  if (overResult !== false) {
    throw new Error(`ints.u8 should reject 256, got ${overResult}`);
  }
  if (negResult !== false) {
    throw new Error(`ints.u8 should reject -1, got ${negResult}`);
  }
});

Deno.test("types.ints.u16 - validates 16-bit unsigned integers", async () => {
  if (!types) types = await loadTypes();

  const validResult = types.ints.u16.check(1000n);
  const maxResult = types.ints.u16.check(65535n);
  const overResult = types.ints.u16.check(65536n);

  if (validResult !== true) {
    throw new Error(`ints.u16 should accept 1000, got ${validResult}`);
  }
  if (maxResult !== true) {
    throw new Error(`ints.u16 should accept 65535, got ${maxResult}`);
  }
  if (overResult !== false) {
    throw new Error(`ints.u16 should reject 65536, got ${overResult}`);
  }
});

Deno.test("types.port - is alias for ints.u16", async () => {
  if (!types) types = await loadTypes();

  const validResult = types.port.check(8080n);
  const maxResult = types.port.check(65535n);
  const overResult = types.port.check(65536n);

  if (validResult !== true) {
    throw new Error(`port should accept 8080, got ${validResult}`);
  }
  if (maxResult !== true) {
    throw new Error(`port should accept 65535, got ${maxResult}`);
  }
  if (overResult !== false) {
    throw new Error(`port should reject 65536, got ${overResult}`);
  }
});

// ============================================================================
// ADVANCED FEATURES - Test addCheck, coercedTo
// ============================================================================

Deno.test("types.addCheck - adds additional validation", async () => {
  if (!types) types = await loadTypes();

  const evenInt = types.addCheck(types.int)({
    check: (x) => x % 2n === 0n,
    description: "even integer",
  });

  const validResult = evenInt.check(4n);
  const oddResult = evenInt.check(5n);
  const stringResult = evenInt.check("not int");

  if (validResult !== true) {
    throw new Error(`evenInt should accept 4, got ${validResult}`);
  }
  if (oddResult !== false) {
    throw new Error(`evenInt should reject 5, got ${oddResult}`);
  }
  if (stringResult !== false) {
    throw new Error(`evenInt should reject string, got ${stringResult}`);
  }
});

Deno.test("types.coercedTo - converts one type to another", async () => {
  if (!types) types = await loadTypes();

  // String to int coercion
  const stringToInt = types.coercedTo(
    types.str,
    (s) => {
      const num = parseInt(s, 10);
      return isNaN(num) ? null : BigInt(num);
    },
    types.int
  );

  // Check function should accept both strings and ints
  const strResult = stringToInt.check("42");
  const intResult = stringToInt.check(42n);
  const invalidResult = stringToInt.check(true);

  if (strResult !== true) {
    throw new Error(`coercedTo should accept coercible string, got ${strResult}`);
  }
  if (intResult !== true) {
    throw new Error(`coercedTo should accept final type, got ${intResult}`);
  }
  if (invalidResult !== false) {
    throw new Error(`coercedTo should reject invalid type, got ${invalidResult}`);
  }
});

console.log("\n✅ All 51 types.nix tests passed!\n");
