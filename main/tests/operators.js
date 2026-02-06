import { operators, builtins } from "../runtime.js"

const assertEquals = (actual, expected, msg) => {
    const actualStr = JSON.stringify(actual)
    const expectedStr = JSON.stringify(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}

console.log("Testing operators.negative...")
{
    assertEquals(operators.negative(5n), -5n, "negative should negate bigint")
    assertEquals(operators.negative(5.5), -5.5, "negative should negate float")
}

console.log("Testing operators.negate...")
{
    assertEquals(operators.negate(true), false, "negate should invert true")
    assertEquals(operators.negate(false), true, "negate should invert false")
}

console.log("Testing operators.listConcat...")
{
    const result = operators.listConcat([1, 2], [3, 4])
    assertEquals(result, [1, 2, 3, 4], "listConcat should concatenate lists")
}

console.log("Testing operators.divide...")
{
    assertEquals(operators.divide(10n, 2n), 5n, "divide should divide bigints")
    assertEquals(operators.divide(10.0, 2.0), 5.0, "divide should divide floats")
}

console.log("Testing operators.multiply...")
{
    assertEquals(operators.multiply(5n, 3n), 15n, "multiply should multiply bigints")
    assertEquals(operators.multiply(2.5, 4.0), 10.0, "multiply should multiply floats")
}

console.log("Testing operators.merge...")
{
    const a = { x: 1, y: 2 }
    const b = { y: 20, z: 30 }
    const result = operators.merge(a, b)
    assertEquals(result, { x: 1, y: 20, z: 30 }, "merge should merge attrsets, right wins")
}

console.log("Testing operators.and...")
{
    assertEquals(operators.and(true, true), true, "and should work with true/true")
    assertEquals(operators.and(true, false), false, "and should work with true/false")
    assertEquals(operators.and(false, true), false, "and should work with false/true")
    assertEquals(operators.and(false, false), false, "and should work with false/false")
}

console.log("Testing operators.or...")
{
    assertEquals(operators.or(true, true), true, "or should work with true/true")
    assertEquals(operators.or(true, false), true, "or should work with true/false")
    assertEquals(operators.or(false, true), true, "or should work with false/true")
    assertEquals(operators.or(false, false), false, "or should work with false/false")
}

console.log("Testing operators.implication...")
{
    assertEquals(operators.implication(false, false), true, "false -> false = true")
    assertEquals(operators.implication(false, true), true, "false -> true = true")
    assertEquals(operators.implication(true, false), false, "true -> false = false")
    assertEquals(operators.implication(true, true), true, "true -> true = true")
}

console.log("Testing operators.greaterThan...")
{
    assertEquals(operators.greaterThan(5, 3), true, "5 > 3")
    assertEquals(operators.greaterThan(3, 5), false, "3 > 5")
    assertEquals(operators.greaterThan(5, 5), false, "5 > 5")
}

console.log("Testing operators.lessThan...")
{
    assertEquals(operators.lessThan(3, 5), true, "3 < 5")
    assertEquals(operators.lessThan(5, 3), false, "5 < 3")
    assertEquals(operators.lessThan(5, 5), false, "5 < 5")
}

console.log("Testing operators.greaterThanOrEqual...")
{
    assertEquals(operators.greaterThanOrEqual(5, 3), true, "5 >= 3")
    assertEquals(operators.greaterThanOrEqual(5, 5), true, "5 >= 5")
    assertEquals(operators.greaterThanOrEqual(3, 5), false, "3 >= 5")
}

console.log("Testing operators.lessThanOrEqual...")
{
    assertEquals(operators.lessThanOrEqual(3, 5), true, "3 <= 5")
    assertEquals(operators.lessThanOrEqual(5, 5), true, "5 <= 5")
    assertEquals(operators.lessThanOrEqual(5, 3), false, "5 <= 3")
}

console.log("Testing operators.hasAttr...")
{
    const obj = { x: 1, y: 2 }
    assertEquals(operators.hasAttr(obj, "x"), true, "hasAttr should find existing attr")
    assertEquals(operators.hasAttr(obj, "z"), false, "hasAttr should not find missing attr")
}

console.log("✓ All operator tests passed")
