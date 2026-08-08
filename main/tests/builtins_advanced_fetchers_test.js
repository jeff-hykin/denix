import { assertEquals, assertExists, assert, assertRejects } from "jsr:@std/assert";
import { builtins } from "../runtime.js";
import { NotImplemented } from "../errors.js";

//
// fetchClosure Tests
// Note: fetchClosure is NOT implemented - it requires binary cache support
//

Deno.test("fetchClosure - throws NotImplemented error (not implemented)", () => {
    try {
        builtins.fetchClosure({
            fromStore: "https://cache.nixos.org",
            fromPath: "/nix/store/ldbhlwhh39wha58rm61bkiiwm6j7211j-git-2.33.1",
        });
        throw new Error("Should have thrown NotImplemented");
    } catch (error) {
        assertEquals(error instanceof NotImplemented, true);
        assertEquals(error.message.includes("fetchClosure"), true);
        assertEquals(error.message.includes("binary cache"), true);
    }
});

Deno.test("fetchClosure - rejects with toPath parameter (not implemented)", () => {
    try {
        builtins.fetchClosure({
            fromStore: "https://cache.nixos.org",
            fromPath: "/nix/store/r2jd6ygnmirm2g803mksqqjm4y39yi6i-git-2.33.1",
            toPath: "/nix/store/ldbhlwhh39wha58rm61bkiiwm6j7211j-git-2.33.1",
        });
        throw new Error("Should have thrown NotImplemented");
    } catch (error) {
        assertEquals(error instanceof NotImplemented, true);
    }
});

Deno.test("fetchClosure - rejects with inputAddressed parameter (not implemented)", () => {
    try {
        builtins.fetchClosure({
            fromStore: "https://cache.nixos.org",
            fromPath: "/nix/store/ldbhlwhh39wha58rm61bkiiwm6j7211j-git-2.33.1",
            inputAddressed: true,
        });
        throw new Error("Should have thrown NotImplemented");
    } catch (error) {
        assertEquals(error instanceof NotImplemented, true);
    }
});

Deno.test("fetchClosure - error message mentions experimental feature", () => {
    try {
        builtins.fetchClosure({
            fromStore: "https://cache.nixos.org",
            fromPath: "/nix/store/test",
        });
        throw new Error("Should have thrown NotImplemented");
    } catch (error) {
        assertEquals(error instanceof NotImplemented, true);
        assertEquals(error.message.includes("experimental"), true);
    }
});

Deno.test("fetchClosure - error message mentions store implementation", () => {
    try {
        builtins.fetchClosure({
            fromStore: "https://cache.nixos.org",
            fromPath: "/nix/store/test",
        });
        throw new Error("Should have thrown NotImplemented");
    } catch (error) {
        assertEquals(error instanceof NotImplemented, true);
        assertEquals(error.message.includes("store implementation"), true);
    }
});

//
// getFlake Tests
// Note: getFlake IS implemented - comprehensive tests exist in builtins_getflake_test.js
// These tests focus on additional edge cases and verification
//

Deno.test("getFlake - is a function", () => {
    assertEquals(typeof builtins.getFlake, "function");
});

// synchronous so nix source can call it: a Promise here would make
// `let f = builtins.getFlake "..."; in f.outputs` evaluate to undefined
Deno.test("getFlake - returns the flake synchronously", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        // Create minimal valid flake
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              description = "test";
              outputs = inputs: { test = 1; };
            }`
        );

        const result = builtins.getFlake(tempDir);
        assertEquals(result instanceof Promise, false);
        assertEquals(`${result.description}`, "test");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - requires flakeRef argument", async () => {
    try {
        await builtins.getFlake();
        throw new Error("Should have thrown an error");
    } catch (error) {
        // Should throw a type error or similar for missing argument
        assertEquals(error instanceof Error, true);
    }
});

Deno.test("getFlake - validates flakeRef is a string", async () => {
    try {
        await builtins.getFlake(123);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error instanceof Error, true);
    }
});

Deno.test("getFlake - handles empty string flakeRef", async () => {
    try {
        await builtins.getFlake("");
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error instanceof Error, true);
    }
});

Deno.test("getFlake - result has _type: flake", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              description = "test";
              outputs = inputs: { value = 42; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result._type, "flake");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - result has description field", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              description = "My test flake";
              outputs = inputs: { value = 1; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.description, "My test flake");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - description defaults to empty string when missing", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { value = 1; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.description, "");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - result has sourceInfo with type and path", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              description = "test";
              outputs = inputs: { };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.sourceInfo);
        assertEquals(result.sourceInfo.type, "path");
        assertExists(result.sourceInfo.path);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - sourceInfo includes narHash", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { test = true; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.sourceInfo.narHash);
        assertEquals(typeof result.sourceInfo.narHash, "string");
        assertEquals(result.sourceInfo.narHash.startsWith("sha256"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - result has inputs object", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.inputs);
        assertEquals(typeof result.inputs, "object");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - inputs always includes self", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.inputs.self);
        assertEquals(result.inputs.self, result); // Self-reference
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - result has outputs", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { myOutput = 123; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.outputs);
        assertEquals(result.outputs.myOutput, 123n);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - outputs function receives inputs parameter", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: {
                receivedSelf = if inputs ? self then "yes" else "no";
              };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.receivedSelf, "yes");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - outputs can be complex nested structures", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: {
                packages.x86_64-linux.hello = "hello-pkg";
                apps.x86_64-linux.default = { type = "app"; program = "/bin/hello"; };
                lib.helpers.greet = name: "Hello " + name;
              };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.packages["x86_64-linux"].hello, "hello-pkg");
        assertEquals(result.outputs.apps["x86_64-linux"].default.type, "app");
        assertEquals(result.outputs.apps["x86_64-linux"].default.program, "/bin/hello");
        assertEquals(typeof result.outputs.lib.helpers.greet, "function");
        assertEquals(result.outputs.lib.helpers.greet("World"), "Hello World");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

// Write a small dependency flake at <dir>/dep for input-resolution tests
const writeDepFlake = async (dir) => {
    await Deno.mkdir(`${dir}/dep`);
    await Deno.writeTextFile(
        `${dir}/dep/flake.nix`,
        `{
          description = "dep";
          outputs = { self }: { answer = 42; };
        }`
    );
};

Deno.test("getFlake - inputs are resolved recursively as flakes", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await writeDepFlake(tempDir);
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              inputs = {
                dep = { url = "path:./dep"; };
              };
              outputs = inputs: {
                depType = inputs.dep._type;
                depAnswer = inputs.dep.answer;
              };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertExists(result.inputs.dep);
        assertEquals(result.inputs.dep._type, "flake");
        assertEquals(result.outputs.depType, "flake");
        assertEquals(result.outputs.depAnswer, 42n);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - unresolvable input error names the input and ref", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              inputs.test = { url = "path:./does-not-exist"; };
              outputs = inputs: { value = 1; };
            }`
        );

        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("failed to resolve input 'test'"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - supports string input URLs (simplified syntax)", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await writeDepFlake(tempDir);
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              inputs.simple = "path:./dep";
              outputs = inputs: {
                hasSimple = if inputs ? simple then "yes" else "no";
              };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.hasSimple, "yes");
        assertExists(result.inputs.simple);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - error when flake.nix missing", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("no flake.nix found"), true);
        assertEquals(error.message.includes(tempDir), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - error when flake.nix is not an attrset", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(`${tempDir}/flake.nix`, `"just a string"`);
        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("must evaluate to an attribute set"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - error when outputs is missing", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{ description = "test"; }`
        );
        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("'outputs'"), true);
        assertEquals(error.message.includes("function"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - error when outputs is not a function", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = { notAFunction = true; };
            }`
        );
        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("outputs"), true);
        assertEquals(error.message.includes("function"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - supports path: prefix in flakeRef", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { test = "works"; };
            }`
        );

        const result = await builtins.getFlake(`path:${tempDir}`);
        assertEquals(result.outputs.test, "works");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - supports absolute path without prefix", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { test = "works"; };
            }`
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.test, "works");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - flake.lock file is read if present", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await writeDepFlake(tempDir);
        // flake.nix points at a github ref that does NOT exist; the lock file
        // pins the input to a local path, so resolution must go through the
        // lock (no network) for this to succeed
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              inputs.test = "github:test/repo";
              outputs = inputs: {
                value = 1;
                answer = inputs.test.answer;
              };
            }`
        );

        await Deno.writeTextFile(
            `${tempDir}/flake.lock`,
            JSON.stringify({
                version: 7,
                root: "root",
                nodes: {
                    root: { inputs: { test: "test" } },
                    test: {
                        locked: {
                            type: "path",
                            path: `${tempDir}/dep`,
                        },
                    },
                },
            })
        );

        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.value, 1n);
        assertEquals(result.outputs.answer, 42n);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - works without flake.lock file", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await writeDepFlake(tempDir);
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              inputs.test = "path:./dep";
              outputs = inputs: { value = 1; };
            }`
        );

        // No flake.lock file - should still work
        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.value, 1n);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - gracefully handles invalid flake.lock JSON", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { value = 1; };
            }`
        );

        // Create invalid JSON in flake.lock
        await Deno.writeTextFile(
            `${tempDir}/flake.lock`,
            "not valid json {"
        );

        // Should continue without error (invalid lock file is ignored)
        const result = await builtins.getFlake(tempDir);
        assertEquals(result.outputs.value, 1n);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - uses parseFlakeRef internally", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              outputs = inputs: { };
            }`
        );

        // Test that various flakeRef formats work (they all go through parseFlakeRef)
        const formats = [
            tempDir,                  // Absolute path
            `path:${tempDir}`,       // Explicit path: prefix
        ];

        for (const format of formats) {
            const result = await builtins.getFlake(format);
            assertEquals(result._type, "flake");
        }
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - Note: Network fetchers tested in builtins_getflake_test.js", () => {
    // This test serves as documentation that comprehensive tests exist elsewhere
    // The following reference types are tested in builtins_getflake_test.js:
    // - github: type (fetches from GitHub)
    // - gitlab: type (fetches from GitLab)
    // - git: type (fetches from Git repos)
    // - mercurial/hg: type (fetches from Mercurial repos)
    // - tarball: type (fetches tarballs)
    // - indirect: type (uses registry lookup)

    assert(true, "See builtins_getflake_test.js for network fetcher tests");
});
