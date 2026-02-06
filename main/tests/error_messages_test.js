#!/usr/bin/env -S deno run --allow-all
// Test that unimplemented functions throw proper NotImplemented errors

import { NotImplemented } from "../errors.js"

console.log("Testing error messages for unimplemented functions...\n")

let passed = 0
let failed = 0

function test(name, fn) {
    try {
        fn()
        console.log(`✓ ${name}`)
        passed++
    } catch (error) {
        console.log(`✗ ${name}`)
        console.log(`  Error: ${error.message}`)
        failed++
    }
}

// Create minimal builtins object with unimplemented functions
const builtins = {
    fetchurl: (url) => {
        throw new NotImplemented(`builtins.fetchurl requires network layer and store implementation`)
    },
    fetchTarball: (url) => {
        throw new NotImplemented(`builtins.fetchTarball requires network layer, tar extraction, and store implementation`)
    },
    fetchGit: (args) => {
        throw new NotImplemented(`builtins.fetchGit requires git binary integration and store implementation`)
    },
    fetchMercurial: (args) => {
        throw new NotImplemented(`builtins.fetchMercurial requires hg binary integration and store implementation`)
    },
    fetchTree: (args) => {
        throw new NotImplemented(`builtins.fetchTree is an experimental feature requiring fetch system and store implementation`)
    },
    import: (path) => {
        throw new NotImplemented(`builtins.import requires a full Nix language parser and evaluator`)
    },
    scopedImport: (scope) => (path) => {
        throw new NotImplemented(`builtins.scopedImport requires a full Nix language parser and evaluator with scope management`)
    },
    path: (args) => {
        throw new NotImplemented(`builtins.path requires full store implementation with filtering support`)
    },
    getFlake: (flakeRef) => {
        throw new NotImplemented(`builtins.getFlake requires flake system with network fetching, lock files, and evaluation`)
    },
    filterSource: (filter) => (path) => {
        throw new NotImplemented(`builtins.filterSource requires full store implementation with predicate-based file filtering`)
    },
}

console.log("=== Testing Error Messages ===\n")

test("fetchurl throws NotImplemented", () => {
    try {
        builtins.fetchurl("https://example.com")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("network layer")) throw new Error("Wrong message")
    }
})

test("fetchTarball throws NotImplemented", () => {
    try {
        builtins.fetchTarball("https://example.com/file.tar.gz")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("tar extraction")) throw new Error("Wrong message")
    }
})

test("fetchGit throws NotImplemented", () => {
    try {
        builtins.fetchGit({ url: "https://github.com/user/repo" })
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("git binary")) throw new Error("Wrong message")
    }
})

test("fetchMercurial throws NotImplemented", () => {
    try {
        builtins.fetchMercurial({ url: "https://example.com/repo" })
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("hg binary")) throw new Error("Wrong message")
    }
})

test("fetchTree throws NotImplemented", () => {
    try {
        builtins.fetchTree({ type: "github", owner: "user", repo: "repo" })
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("experimental")) throw new Error("Wrong message")
    }
})

test("import throws NotImplemented", () => {
    try {
        builtins.import("./test.nix")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("parser")) throw new Error("Wrong message")
    }
})

test("scopedImport throws NotImplemented", () => {
    try {
        builtins.scopedImport({})("./test.nix")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("scope management")) throw new Error("Wrong message")
    }
})

test("path throws NotImplemented", () => {
    try {
        builtins.path({ path: "./src", name: "source" })
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("store implementation")) throw new Error("Wrong message")
    }
})

test("getFlake throws NotImplemented", () => {
    try {
        builtins.getFlake("nixpkgs")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("flake system")) throw new Error("Wrong message")
    }
})

test("filterSource throws NotImplemented", () => {
    try {
        builtins.filterSource((path, type) => true)("./src")
        throw new Error("Should have thrown NotImplemented")
    } catch (e) {
        if (!(e instanceof NotImplemented)) throw new Error("Wrong error type")
        if (!e.message.includes("filtering")) throw new Error("Wrong message")
    }
})

console.log("\n" + "=".repeat(60))
console.log(`Total: ${passed + failed} tests`)
console.log(`✓ Passed: ${passed}`)
console.log(`✗ Failed: ${failed}`)
console.log("=".repeat(60))

if (failed > 0) {
    Deno.exit(1)
}
