import { builtins, operators } from "../runtime.js"
import { NixError } from "../errors.js"

const assertEquals = (actual, expected, msg) => {
    const actualStr = JSON.stringify(actual)
    const expectedStr = JSON.stringify(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}

const assertThrows = (fn, errorType, msg) => {
    try {
        fn()
        throw new Error(`${msg} - Expected to throw but didn't`)
    } catch (e) {
        if (errorType && !(e instanceof errorType)) {
            throw new Error(`${msg} - Wrong error type: ${e.constructor.name}`)
        }
    }
}

console.log("Testing builtins.trace...")
{
    const result = builtins.trace("debug message")(42)
    assertEquals(result, 42, "trace should return second argument")
}

console.log("Testing builtins.throw...")
{
    assertThrows(
        () => builtins.throw("test error"),
        NixError,
        "throw should throw NixError"
    )
}

console.log("Testing builtins.seq...")
{
    let evaluated = false
    const e1 = (() => { evaluated = true; return 1 })()
    const result = builtins.seq(e1)(42)
    assertEquals(result, 42, "seq should return second argument")
}

console.log("Testing builtins.deepSeq...")
{
    const nested = { a: { b: { c: 1 } } }
    const result = builtins.deepSeq(nested)(42)
    assertEquals(result, 42, "deepSeq should return second argument")
}

console.log("Testing builtins.tryEval with success...")
{
    const result = builtins.tryEval(42)
    assertEquals(result.success, true, "tryEval should succeed for normal values")
    assertEquals(result.value, 42, "tryEval should return the value on success")
}

// Note: In Nix, tryEval works with lazy evaluation to catch errors.
// In JavaScript, errors are eager, so tryEval can only catch errors that
// occur during property access (getters) or toString(), not during
// immediate evaluation. See main/tests/builtins/tryEval/001_basic.js for
// proper tests that work with lazy getters.

console.log("✓ All evaluation control tests passed")
