import { builtins } from "../runtime.js"

const assertEquals = (actual, expected, msg) => {
    const actualStr = JSON.stringify(actual)
    const expectedStr = JSON.stringify(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}

console.log("Testing builtins.groupBy...")
{
    const input = ["foo", "bar", "baz", "fan"]
    const result = builtins.groupBy((s) => s[0])(input)
    assertEquals(result.f, ["foo", "fan"], "groupBy should group by first char - f")
    assertEquals(result.b, ["bar", "baz"], "groupBy should group by first char - b")
}

console.log("Testing builtins.groupBy with substring...")
{
    const input = ["foo", "bar", "baz"]
    const result = builtins.groupBy((s) => builtins.substring(0)(1)(s))(input)
    const expected = { b: ["bar", "baz"], f: ["foo"] }
    assertEquals(result, expected, "groupBy should work with substring")
}

console.log("✓ All list helper tests passed")
