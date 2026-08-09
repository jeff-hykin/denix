import { assertEquals, assertExists, assert } from "jsr:@std/assert";
import { createRuntime, builtins } from "../runtime.js";

// Initialize the runtime once so globalImportState (used by getFlake) is wired.
createRuntime();

Deno.test("getFlake - load local flake with path reference", async () => {
    // Use path: prefix for explicit path reference
    const flakePath = new URL("./fixtures/test-flake", import.meta.url).pathname;
    const result = await builtins.getFlake(`path:${flakePath}`);

    // Verify flake structure
    assertEquals(result._type, "flake");
    // real Nix does NOT expose `description` on the flake result
    assertEquals(result.description, undefined);

    // Verify sourceInfo (same attrs real Nix's fetchTree result has)
    assertExists(result.sourceInfo);
    assertEquals(result.sourceInfo.outPath, flakePath);
    assertExists(result.sourceInfo.narHash);
    assertExists(result.sourceInfo.lastModified);
    assertExists(result.sourceInfo.lastModifiedDate);

    // Verify inputs (should have self)
    assertExists(result.inputs);
    assertExists(result.inputs.self);
    assertEquals(result.inputs.self, result); // self-reference

    // Verify outputs
    assertExists(result.outputs);
    assertEquals(result.outputs.testString, "Hello from test flake!");
    assertEquals(result.outputs.testNumber, 42n);
    assertEquals(result.outputs.testAttrSet.foo, "bar");
    assertEquals(result.outputs.testAttrSet.nested.value, 123n);

    // Verify function output
    assertEquals(typeof result.outputs.testFunction, "function");
    assertEquals(result.outputs.testFunction(10n), 11n);

    // Note: selfReference test skipped - requires lazy evaluation of recursive outputs
    // In real Nix, self can reference outputs, but that requires more complex lazy evaluation
    // For now, self only contains flake metadata (sourceInfo, inputs)
});

Deno.test("getFlake - load flake with absolute path", async () => {
    const flakePath = new URL("./fixtures/test-flake", import.meta.url).pathname;
    const result = await builtins.getFlake(flakePath);

    assertEquals(result._type, "flake");
    assertExists(result.outputs);
});

Deno.test("getFlake - load flake with relative path", async () => {
    // Change to test directory
    const originalCwd = Deno.cwd();
    try {
        const testDir = new URL("./fixtures", import.meta.url).pathname;
        Deno.chdir(testDir);

        const result = await builtins.getFlake("./test-flake");

        assertEquals(result._type, "flake");
        assertExists(result.outputs);
    } finally {
        Deno.chdir(originalCwd);
    }
});

Deno.test("getFlake - flake with inputs (recursively resolved)", async () => {
    const flakePath = new URL("./fixtures/test-flake-with-inputs", import.meta.url).pathname;
    const result = await builtins.getFlake(`path:${flakePath}`);

    // Verify basic structure
    assertEquals(result._type, "flake");

    // The `dep` input is recursively resolved to a real flake (a local sibling
    // via a relative path input), NOT a stub.
    assertExists(result.inputs.self);
    assertExists(result.inputs.dep);
    assertEquals(result.inputs.dep._type, "flake");

    // Outputs can reference self and the resolved input's outputs (values + fns).
    const greetingStr = result.outputs.greeting.toString();
    assertEquals(greetingStr.includes("test-flake-with-inputs"), true);
    assertEquals(result.outputs.depAnswer, 42n);
    assertEquals(result.outputs.depDoubled, 42n);

    // inputs: self, dep = 2
    assertEquals(result.outputs.inputCount, 2n);
});

Deno.test("getFlake - missing flake.nix throws error", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("no flake.nix found"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - invalid flake.nix (not an attrset) throws error", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        // Create invalid flake.nix that evaluates to a string
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `"this is not an attribute set"`
        );

        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("must evaluate to an attribute set"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - flake without outputs function throws error", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        // Create flake.nix without outputs function
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{ description = "test"; inputs = {}; outputs = "not a function"; }`
        );

        await builtins.getFlake(tempDir);
        throw new Error("Should have thrown an error");
    } catch (error) {
        assertEquals(error.message.includes("'outputs' attribute that is a function"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("getFlake - indirect reference uses registry", async () => {
    try {
        // Try to resolve "nixpkgs" via registry
        // This will fetch from the global registry at https://channels.nixos.org/flake-registry.json
        const result = await builtins.getFlake("nixpkgs");

        // If it succeeds, verify it's a valid flake
        assertEquals(result._type, "flake");
        assertExists(result.sourceInfo);
        assertExists(result.outputs);

        // Resolved to github:NixOS/nixpkgs, so the source is a git rev
        assertExists(result.sourceInfo.rev);
        assertExists(result.sourceInfo.shortRev);
    } catch (error) {
        // Network failures are acceptable
        if (error.message.includes("not found in registry") ||
            error.message.includes("fetch") ||
            error.message.includes("network")) {
            console.warn("Skipping test due to registry/network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("getFlake - metadata in sourceInfo", async () => {
    const flakePath = new URL("./fixtures/test-flake", import.meta.url).pathname;
    const result = await builtins.getFlake(flakePath);

    // Verify sourceInfo has required fields
    assertEquals(result.sourceInfo.outPath, flakePath);
    assertExists(result.sourceInfo.lastModifiedDate);
    assertExists(result.sourceInfo.narHash);
    assertEquals(result.sourceInfo.narHash.startsWith("sha256"), true);
});

Deno.test("getFlake - parseFlakeRef integration", async () => {
    // Test that getFlake uses parseFlakeRef correctly
    const flakePath = new URL("./fixtures/test-flake", import.meta.url).pathname;

    // Test different reference formats that should work
    const formats = [
        `path:${flakePath}`,  // Explicit path: prefix
        flakePath,             // Absolute path
    ];

    for (const format of formats) {
        const result = await builtins.getFlake(format);
        assertEquals(result._type, "flake");
        assertExists(result.outputs);
    }

    // Test relative path format (requires changing cwd)
    const originalCwd = Deno.cwd();
    try {
        const testDir = new URL("./fixtures", import.meta.url).pathname;
        Deno.chdir(testDir);
        const result = await builtins.getFlake("./test-flake");
        assertEquals(result._type, "flake");
        assertExists(result.outputs);
    } finally {
        Deno.chdir(originalCwd);
    }
});

Deno.test("getFlake - outputs function receives correct inputs", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        // Create flake that inspects its inputs (dep is a real local flake
        // since inputs are recursively resolved, not stubbed)
        await Deno.mkdir(`${tempDir}/dep`);
        await Deno.writeTextFile(
            `${tempDir}/dep/flake.nix`,
            `{ description = "dep"; outputs = { self }: { answer = 42; }; }`
        );
        await Deno.writeTextFile(
            `${tempDir}/flake.nix`,
            `{
              description = "Input inspector";
              inputs = { test = { url = "path:./dep"; }; };
              outputs = inputs: {
                # Return information about received inputs
                hasInputs = builtins.isAttrs inputs;
                hasSelf = builtins.hasAttr "self" inputs;
                hasTest = builtins.hasAttr "test" inputs;
                inputNames = builtins.attrNames inputs;
              };
            }`
        );

        const result = await builtins.getFlake(tempDir);

        // Verify outputs received correct inputs
        assertEquals(result.outputs.hasInputs, true);
        assertEquals(result.outputs.hasSelf, true);
        assertEquals(result.outputs.hasTest, true);

        // Check input names (should have self and test)
        const inputNames = result.outputs.inputNames.sort();
        assertEquals(inputNames.length, 2);
        assertEquals(inputNames[0], "self");
        assertEquals(inputNames[1], "test");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

// `github:o/r?ref=main` used to fall through to a `git clone` subprocess
Deno.test("parseFlakeRef - reads flake-ref query params", async () => {
    assertEquals(
        builtins.parseFlakeRef("github:nixos/nixpkgs?ref=nixos-unstable"),
        { type: "github", owner: "nixos", repo: "nixpkgs", ref: "nixos-unstable" }
    );
    assertEquals(
        builtins.parseFlakeRef("github:NixOS/templates?dir=trivial"),
        { type: "github", owner: "NixOS", repo: "templates", dir: "trivial" }
    );
    assertEquals(
        builtins.parseFlakeRef("git+https://example.com/x.git?ref=main&rev=abc"),
        { type: "git", url: "https://example.com/x.git", ref: "main", rev: "abc" }
    );
    assertEquals(
        builtins.parseFlakeRef("path:/tmp/x?dir=sub"),
        { type: "path", path: "/tmp/x", dir: "sub" }
    );
});

// real Nix: sourceInfo.outPath stays at the fetched tree root, the flake's own
// outPath points at the subdirectory
Deno.test("getFlake - ?dir= evaluates the flake in a subdirectory", async () => {
    const tempDir = await Deno.makeTempDir();
    try {
        await Deno.mkdir(`${tempDir}/sub`);
        await Deno.writeTextFile(
            `${tempDir}/sub/flake.nix`,
            `{ outputs = { self }: { here = "sub"; }; }`
        );

        const result = await builtins.getFlake(`path:${tempDir}?dir=sub`);
        assertEquals(result.outputs.here, "sub");
        assertEquals(`${result.outPath}`, `${tempDir}/sub`);
        assertEquals(`${result.sourceInfo.outPath}`, tempDir);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});
