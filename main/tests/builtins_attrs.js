import { builtins } from "../runtime.js"

const assertEquals = (actual, expected, msg) => {
    const actualStr = JSON.stringify(actual)
    const expectedStr = JSON.stringify(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}

console.log("Testing builtins.mapAttrs...")
{
    const input = { a: 1, b: 2, c: 3 }
    const result = builtins.mapAttrs((name) => (value) => value * 10)(input)
    assertEquals(result, { a: 10, b: 20, c: 30 }, "mapAttrs should multiply values")
}

console.log("Testing builtins.removeAttrs...")
{
    const input = { x: 1, y: 2, z: 3 }
    const result = builtins.removeAttrs(input)(["a", "x", "z"])
    assertEquals(result, { y: 2 }, "removeAttrs should remove specified attrs")
}

console.log("Testing builtins.listToAttrs...")
{
    const input = [
        { name: "a", value: 1 },
        { name: "b", value: 2 },
        { name: "a", value: 999 }  // duplicate, should be ignored
    ]
    const result = builtins.listToAttrs(input)
    assertEquals(result, { a: 1, b: 2 }, "listToAttrs should convert list to attrs, first wins")
}

console.log("Testing builtins.intersectAttrs...")
{
    const e1 = { x: 1, y: 2 }
    const e2 = { x: 10, z: 30 }
    const result = builtins.intersectAttrs(e1)(e2)
    assertEquals(result, { x: 10 }, "intersectAttrs should keep only matching names")
}

console.log("Testing builtins.concatMap...")
{
    const input = [1, 2, 3]
    const result = builtins.concatMap((x) => [x, x * 10])(input)
    assertEquals(result, [1, 10, 2, 20, 3, 30], "concatMap should map and flatten")
}

console.log("✓ All attribute set tests passed")
