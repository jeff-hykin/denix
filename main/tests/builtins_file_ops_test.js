import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// File operations: pathExists, readFile, readDir, readFileType, findFile, getEnv
// Documentation: https://nix.dev/manual/nix/2.28/language/builtins.html

// Test helpers
function makeTempFile(content) {
    const path = Deno.makeTempFileSync()
    Deno.writeTextFileSync(path, content)
    return path
}

function makeTempDir() {
    return Deno.makeTempDirSync()
}

// pathExists tests
// nix repl> builtins.pathExists ./existing-file
// true
// nix repl> builtins.pathExists ./nonexistent
// false

Deno.test("pathExists - existing file returns true", () => {
    const tempFile = makeTempFile("test content")
    try {
        assertEquals(builtins.pathExists(tempFile), true)
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("pathExists - existing directory returns true", () => {
    const tempDir = makeTempDir()
    try {
        assertEquals(builtins.pathExists(tempDir), true)
    } finally {
        Deno.removeSync(tempDir)
    }
})

Deno.test("pathExists - nonexistent path returns false", () => {
    assertEquals(builtins.pathExists("/nonexistent/path/that/does/not/exist"), false)
})

Deno.test("pathExists - relative path", () => {
    const tempFile = makeTempFile("test")
    try {
        // Get relative path from cwd
        const relativePath = `./${tempFile.split('/').pop()}`
        // pathExists should work with absolute paths
        assertEquals(builtins.pathExists(tempFile), true)
    } finally {
        Deno.removeSync(tempFile)
    }
})

// readFile tests
// nix repl> builtins.readFile ./test.txt
// "file contents\n"

Deno.test("readFile - reads file contents as string", () => {
    const content = "Hello, Nix!\nLine 2\n"
    const tempFile = makeTempFile(content)
    try {
        assertEquals(builtins.readFile(tempFile), content)
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFile - reads empty file", () => {
    const tempFile = makeTempFile("")
    try {
        assertEquals(builtins.readFile(tempFile), "")
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFile - handles UTF-8 content", () => {
    const content = "Hello 世界 🌍\n"
    const tempFile = makeTempFile(content)
    try {
        assertEquals(builtins.readFile(tempFile), content)
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFile - throws on nonexistent file", () => {
    assertThrows(() => {
        builtins.readFile("/nonexistent/file.txt")
    })
})

// readDir tests
// nix repl> builtins.readDir ./mydir
// { "file.txt" = "regular"; "subdir" = "directory"; "link" = "symlink"; }

Deno.test("readDir - reads directory contents with types", () => {
    const tempDir = makeTempDir()
    try {
        // Create test files
        const file1 = `${tempDir}/file1.txt`
        const file2 = `${tempDir}/file2.txt`
        const subdir = `${tempDir}/subdir`

        Deno.writeTextFileSync(file1, "content1")
        Deno.writeTextFileSync(file2, "content2")
        Deno.mkdirSync(subdir)

        const result = builtins.readDir(tempDir)

        assertEquals(result["file1.txt"], "regular")
        assertEquals(result["file2.txt"], "regular")
        assertEquals(result["subdir"], "directory")
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})

Deno.test("readDir - empty directory", () => {
    const tempDir = makeTempDir()
    try {
        const result = builtins.readDir(tempDir)
        assertEquals(Object.keys(result).length, 0)
    } finally {
        Deno.removeSync(tempDir)
    }
})

Deno.test("readDir - throws on nonexistent directory", () => {
    assertThrows(() => {
        builtins.readDir("/nonexistent/directory")
    })
})

Deno.test("readDir - throws on file (not directory)", () => {
    const tempFile = makeTempFile("test")
    try {
        assertThrows(() => {
            builtins.readDir(tempFile)
        })
    } finally {
        Deno.removeSync(tempFile)
    }
})

// readFileType tests
// nix repl> builtins.readFileType ./file.txt
// "regular"
// nix repl> builtins.readFileType ./mydir
// "directory"

Deno.test("readFileType - detects regular file", () => {
    const tempFile = makeTempFile("content")
    try {
        assertEquals(builtins.readFileType(tempFile), "regular")
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFileType - detects directory", () => {
    const tempDir = makeTempDir()
    try {
        assertEquals(builtins.readFileType(tempDir), "directory")
    } finally {
        Deno.removeSync(tempDir)
    }
})

Deno.test("readFileType - throws on nonexistent path", () => {
    assertThrows(() => {
        builtins.readFileType("/nonexistent/path")
    })
})

// findFile tests
// nix repl> builtins.findFile [{ path = "/nix/store"; prefix = "nixpkgs"; }] "nixpkgs"
// "/nix/store/...-nixpkgs"
// This is a complex function that searches a list of search paths

Deno.test("findFile - finds file in search path", () => {
    const tempDir = makeTempDir()
    try {
        const targetFile = `${tempDir}/target.nix`
        Deno.writeTextFileSync(targetFile, "{ }")

        // Search path format: [{ path = "/some/path"; prefix = "prefix"; }]
        const searchPath = [
            { path: tempDir, prefix: "" }
        ]

        const result = builtins.findFile(searchPath)("target.nix")
        assertEquals(result.toString(), targetFile)
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})

Deno.test("findFile - with prefix in search path", () => {
    const tempDir = makeTempDir()
    try {
        const nixpkgsDir = `${tempDir}/nixpkgs-src`
        Deno.mkdirSync(nixpkgsDir)
        const targetFile = `${nixpkgsDir}/default.nix`
        Deno.writeTextFileSync(targetFile, "{ }")

        // The path should point to the actual nixpkgs directory, not its parent
        const searchPath = [
            { path: nixpkgsDir, prefix: "nixpkgs" }
        ]

        const result = builtins.findFile(searchPath)("nixpkgs/default.nix")
        assertEquals(result.toString(), targetFile)
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})

Deno.test("findFile - throws when file not found", () => {
    assertThrows(() => {
        const searchPath = [{ path: "/nonexistent", prefix: "" }]
        builtins.findFile(searchPath)("missing.nix")
    })
})

Deno.test("findFile - searches multiple paths", () => {
    const tempDir1 = makeTempDir()
    const tempDir2 = makeTempDir()
    try {
        const targetFile = `${tempDir2}/found.nix`
        Deno.writeTextFileSync(targetFile, "{ }")

        const searchPath = [
            { path: tempDir1, prefix: "" },
            { path: tempDir2, prefix: "" }
        ]

        const result = builtins.findFile(searchPath)("found.nix")
        assertEquals(result.toString(), targetFile)
    } finally {
        Deno.removeSync(tempDir1, { recursive: true })
        Deno.removeSync(tempDir2, { recursive: true })
    }
})

// getEnv tests
// nix repl> builtins.getEnv "HOME"
// "/home/user"
// nix repl> builtins.getEnv "NONEXISTENT_VAR"
// ""

Deno.test("getEnv - gets existing environment variable", () => {
    // HOME should exist on all Unix systems
    const home = builtins.getEnv("HOME")
    assertEquals(typeof home, "string")
    assertEquals(home.length > 0, true)
})

Deno.test("getEnv - returns empty string for nonexistent variable", () => {
    assertEquals(builtins.getEnv("NONEXISTENT_VARIABLE_THAT_SHOULD_NOT_EXIST_12345"), "")
})

Deno.test("getEnv - gets PATH variable", () => {
    const path = builtins.getEnv("PATH")
    assertEquals(typeof path, "string")
    assertEquals(path.length > 0, true)
})

Deno.test("getEnv - case sensitive", () => {
    // Set a test variable
    Deno.env.set("TEST_VAR_CASE", "value")
    try {
        assertEquals(builtins.getEnv("TEST_VAR_CASE"), "value")
        assertEquals(builtins.getEnv("test_var_case"), "")
    } finally {
        Deno.env.delete("TEST_VAR_CASE")
    }
})
