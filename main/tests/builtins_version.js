import { builtins } from "../runtime.js"

const assertEquals = (actual, expected, msg) => {
    const actualStr = JSON.stringify(actual)
    const expectedStr = JSON.stringify(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}

console.log("Testing builtins.parseDrvName...")
{
    const result1 = builtins.parseDrvName("nix-0.12pre12876")
    assertEquals(result1, { name: "nix", version: "0.12pre12876" }, "parseDrvName basic case")

    const result2 = builtins.parseDrvName("hello-world")
    assertEquals(result2, { name: "hello", version: "world" }, "parseDrvName simple version")

    const result3 = builtins.parseDrvName("noversion")
    assertEquals(result3, { name: "noversion", version: "" }, "parseDrvName no version")
}

console.log("Testing builtins.compareVersions...")
{
    assertEquals(builtins.compareVersions("1.0")("2.0"), -1, "1.0 < 2.0")
    assertEquals(builtins.compareVersions("2.0")("1.0"), 1, "2.0 > 1.0")
    assertEquals(builtins.compareVersions("1.0")("1.0"), 0, "1.0 == 1.0")
    assertEquals(builtins.compareVersions("1.2.3")("1.2.4"), -1, "1.2.3 < 1.2.4")
    assertEquals(builtins.compareVersions("1.10")("1.9"), 1, "1.10 > 1.9 (numeric)")
}

console.log("✓ All version tests passed")
