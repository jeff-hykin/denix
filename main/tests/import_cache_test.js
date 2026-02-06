import { ImportCache } from "../import_cache.js"

Deno.test("import cache", async (t) => {
    await t.step("get/set/has - basic operations", () => {
        const cache = new ImportCache()

        const path = "/path/to/file.nix"
        const result = { foo: 42 }

        if (cache.has(path)) {
            throw new Error("Cache should be empty initially")
        }

        cache.set(path, result)

        if (!cache.has(path)) {
            throw new Error("Cache should have the path after set")
        }

        const cached = cache.get(path)
        if (cached !== result) {
            throw new Error(`Expected cached result to be ${result}, got ${cached}`)
        }
    })

    await t.step("get - returns undefined for uncached path", () => {
        const cache = new ImportCache()
        const result = cache.get("/nonexistent.nix")

        if (result !== undefined) {
            throw new Error(`Expected undefined, got ${result}`)
        }
    })

    await t.step("set - overwrites existing cache", () => {
        const cache = new ImportCache()
        const path = "/file.nix"

        cache.set(path, "first")
        cache.set(path, "second")

        const result = cache.get(path)
        if (result !== "second") {
            throw new Error(`Expected "second", got ${result}`)
        }
    })

    await t.step("pushStack/popStack - basic operations", () => {
        const cache = new ImportCache()

        cache.pushStack("/a.nix")
        const stack1 = cache.getStack()
        if (stack1.length !== 1 || stack1[0] !== "/a.nix") {
            throw new Error(`Expected stack ["/a.nix"], got ${JSON.stringify(stack1)}`)
        }

        cache.pushStack("/b.nix")
        const stack2 = cache.getStack()
        if (stack2.length !== 2 || stack2[1] !== "/b.nix") {
            throw new Error(`Expected stack ["/a.nix", "/b.nix"], got ${JSON.stringify(stack2)}`)
        }

        cache.popStack()
        const stack3 = cache.getStack()
        if (stack3.length !== 1 || stack3[0] !== "/a.nix") {
            throw new Error(`Expected stack ["/a.nix"], got ${JSON.stringify(stack3)}`)
        }
    })

    await t.step("pushStack - detects direct circular import", () => {
        const cache = new ImportCache()

        cache.pushStack("/a.nix")

        let error = null
        try {
            cache.pushStack("/a.nix")
        } catch (e) {
            error = e
        }

        if (!error) {
            throw new Error("Expected circular import error")
        }

        if (!error.message.includes("Circular import")) {
            throw new Error(`Expected "Circular import" error, got: ${error.message}`)
        }

        if (!error.message.includes("/a.nix -> /a.nix")) {
            throw new Error(`Expected error to show stack, got: ${error.message}`)
        }
    })

    await t.step("pushStack - detects indirect circular import", () => {
        const cache = new ImportCache()

        cache.pushStack("/a.nix")
        cache.pushStack("/b.nix")
        cache.pushStack("/c.nix")

        let error = null
        try {
            cache.pushStack("/a.nix")
        } catch (e) {
            error = e
        }

        if (!error) {
            throw new Error("Expected circular import error")
        }

        if (!error.message.includes("/a.nix -> /b.nix -> /c.nix -> /a.nix")) {
            throw new Error(`Expected full stack in error, got: ${error.message}`)
        }
    })

    await t.step("formatStack - creates readable error message", () => {
        const cache = new ImportCache()

        cache.pushStack("/root.nix")
        cache.pushStack("/lib/helpers.nix")

        const formatted = cache.formatStack("/lib/data.nix")
        const expected = "/root.nix -> /lib/helpers.nix -> /lib/data.nix"

        if (formatted !== expected) {
            throw new Error(`Expected "${expected}", got "${formatted}"`)
        }
    })

    await t.step("getCurrentFile - returns top of stack", () => {
        const cache = new ImportCache()

        if (cache.getCurrentFile() !== null) {
            throw new Error("Expected null for empty stack")
        }

        cache.pushStack("/a.nix")
        if (cache.getCurrentFile() !== "/a.nix") {
            throw new Error(`Expected "/a.nix", got ${cache.getCurrentFile()}`)
        }

        cache.pushStack("/b.nix")
        if (cache.getCurrentFile() !== "/b.nix") {
            throw new Error(`Expected "/b.nix", got ${cache.getCurrentFile()}`)
        }

        cache.popStack()
        if (cache.getCurrentFile() !== "/a.nix") {
            throw new Error(`Expected "/a.nix", got ${cache.getCurrentFile()}`)
        }

        cache.popStack()
        if (cache.getCurrentFile() !== null) {
            throw new Error(`Expected null, got ${cache.getCurrentFile()}`)
        }
    })

    await t.step("clear - resets cache and stack", () => {
        const cache = new ImportCache()

        cache.set("/a.nix", "result")
        cache.pushStack("/a.nix")
        cache.pushStack("/b.nix")

        cache.clear()

        if (cache.has("/a.nix")) {
            throw new Error("Cache should be empty after clear")
        }

        if (cache.getStack().length !== 0) {
            throw new Error("Stack should be empty after clear")
        }

        if (cache.getCurrentFile() !== null) {
            throw new Error("Current file should be null after clear")
        }
    })

    await t.step("popStack - handles empty stack gracefully", () => {
        const cache = new ImportCache()

        // Should not throw
        cache.popStack()

        const stack = cache.getStack()
        if (stack.length !== 0) {
            throw new Error(`Expected empty stack, got ${JSON.stringify(stack)}`)
        }
    })

    await t.step("real-world scenario - nested imports with caching", () => {
        const cache = new ImportCache()

        // Import chain: main.nix -> lib.nix -> utils.nix
        cache.pushStack("/main.nix")
        cache.pushStack("/lib.nix")

        // Cache utils.nix result
        cache.set("/utils.nix", { helper: "function" })
        cache.pushStack("/utils.nix")
        cache.popStack()

        // Back to lib.nix
        cache.popStack()
        cache.set("/lib.nix", { lib: "data" })

        // Now lib.nix imports utils.nix again - should use cache
        if (!cache.has("/utils.nix")) {
            throw new Error("utils.nix should be cached")
        }

        // Complete main.nix
        cache.popStack()
        cache.set("/main.nix", { main: "result" })

        // Verify all are cached
        if (!cache.has("/main.nix") || !cache.has("/lib.nix") || !cache.has("/utils.nix")) {
            throw new Error("All files should be cached")
        }

        // Stack should be empty
        if (cache.getStack().length !== 0) {
            throw new Error("Stack should be empty after all imports complete")
        }
    })

    await t.step("multiple cache instances are independent", () => {
        const cache1 = new ImportCache()
        const cache2 = new ImportCache()

        cache1.set("/file.nix", "result1")
        cache2.set("/file.nix", "result2")

        if (cache1.get("/file.nix") !== "result1") {
            throw new Error("cache1 should have its own result")
        }

        if (cache2.get("/file.nix") !== "result2") {
            throw new Error("cache2 should have its own result")
        }

        cache1.pushStack("/a.nix")

        if (cache2.getCurrentFile() !== null) {
            throw new Error("cache2 should have independent stack")
        }
    })
})

console.log("✅ All import cache tests passed!")
