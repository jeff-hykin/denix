#!/usr/bin/env -S deno run --allow-all
// Standalone flake reference tests

console.log("Testing Flake Reference Functions\n")

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

// Mock parseFlakeRef function
function parseFlakeRef(ref) {
    if (ref.startsWith("git+")) {
        const url = ref.slice(4)
        return { type: "git", url }
    }

    if (ref.startsWith("github:")) {
        const parts = ref.slice(7).split("/")
        const result = { type: "github", owner: parts[0], repo: parts[1] }
        if (parts[2]) result.ref = parts[2]
        return result
    }

    if (ref.startsWith("gitlab:")) {
        const parts = ref.slice(7).split("/")
        const result = { type: "gitlab", owner: parts[0], repo: parts[1] }
        if (parts[2]) result.ref = parts[2]
        return result
    }

    if (ref.startsWith("path:")) {
        return { type: "path", path: ref.slice(5) }
    }
    if (ref.startsWith("/")) {
        return { type: "path", path: ref }
    }
    if (ref.startsWith("./") || ref.startsWith("../")) {
        return { type: "path", path: ref }
    }

    if (ref.startsWith("http://") || ref.startsWith("https://")) {
        return { type: "tarball", url: ref }
    }

    return { type: "indirect", id: ref }
}

// Mock flakeRefToString function
function flakeRefToString(attrs) {
    const type = attrs.type || "indirect"

    switch (type) {
        case "github":
            let result = `github:${attrs.owner}/${attrs.repo}`
            if (attrs.ref) result += `/${attrs.ref}`
            return result

        case "gitlab":
            let glResult = `gitlab:${attrs.owner}/${attrs.repo}`
            if (attrs.ref) glResult += `/${attrs.ref}`
            return glResult

        case "git":
            return `git+${attrs.url}`

        case "path":
            return `path:${attrs.path}`

        case "tarball":
            return attrs.url

        case "indirect":
            return attrs.id

        default:
            throw new Error(`Unknown flake reference type: ${type}`)
    }
}

console.log("=== Testing parseFlakeRef ===\n")

test("parseFlakeRef: indirect reference", () => {
    const result = parseFlakeRef("nixpkgs")
    if (result.type !== "indirect") throw new Error(`Expected type indirect, got ${result.type}`)
    if (result.id !== "nixpkgs") throw new Error(`Expected id nixpkgs, got ${result.id}`)
})

test("parseFlakeRef: github reference", () => {
    const result = parseFlakeRef("github:NixOS/nixpkgs")
    if (result.type !== "github") throw new Error(`Expected type github, got ${result.type}`)
    if (result.owner !== "NixOS") throw new Error(`Expected owner NixOS, got ${result.owner}`)
    if (result.repo !== "nixpkgs") throw new Error(`Expected repo nixpkgs, got ${result.repo}`)
})

test("parseFlakeRef: github with ref", () => {
    const result = parseFlakeRef("github:NixOS/nixpkgs/nixos-23.05")
    if (result.type !== "github") throw new Error(`Expected type github`)
    if (result.ref !== "nixos-23.05") throw new Error(`Expected ref nixos-23.05, got ${result.ref}`)
})

test("parseFlakeRef: gitlab reference", () => {
    const result = parseFlakeRef("gitlab:user/repo")
    if (result.type !== "gitlab") throw new Error(`Expected type gitlab`)
    if (result.owner !== "user") throw new Error(`Expected owner user`)
    if (result.repo !== "repo") throw new Error(`Expected repo repo`)
})

test("parseFlakeRef: git URL", () => {
    const result = parseFlakeRef("git+https://github.com/NixOS/nixpkgs.git")
    if (result.type !== "git") throw new Error(`Expected type git`)
    if (result.url !== "https://github.com/NixOS/nixpkgs.git") {
        throw new Error(`Expected url https://github.com/NixOS/nixpkgs.git, got ${result.url}`)
    }
})

test("parseFlakeRef: path with prefix", () => {
    const result = parseFlakeRef("path:/path/to/flake")
    if (result.type !== "path") throw new Error(`Expected type path`)
    if (result.path !== "/path/to/flake") throw new Error(`Expected path /path/to/flake`)
})

test("parseFlakeRef: absolute path", () => {
    const result = parseFlakeRef("/path/to/flake")
    if (result.type !== "path") throw new Error(`Expected type path`)
    if (result.path !== "/path/to/flake") throw new Error(`Expected path /path/to/flake`)
})

test("parseFlakeRef: relative path", () => {
    const result = parseFlakeRef("./flake")
    if (result.type !== "path") throw new Error(`Expected type path`)
    if (result.path !== "./flake") throw new Error(`Expected path ./flake`)
})

test("parseFlakeRef: tarball URL", () => {
    const result = parseFlakeRef("https://example.com/flake.tar.gz")
    if (result.type !== "tarball") throw new Error(`Expected type tarball`)
    if (result.url !== "https://example.com/flake.tar.gz") {
        throw new Error(`Expected url https://example.com/flake.tar.gz`)
    }
})

console.log("\n=== Testing flakeRefToString ===\n")

test("flakeRefToString: indirect", () => {
    const result = flakeRefToString({ type: "indirect", id: "nixpkgs" })
    if (result !== "nixpkgs") throw new Error(`Expected nixpkgs, got ${result}`)
})

test("flakeRefToString: github", () => {
    const result = flakeRefToString({ type: "github", owner: "NixOS", repo: "nixpkgs" })
    if (result !== "github:NixOS/nixpkgs") throw new Error(`Expected github:NixOS/nixpkgs, got ${result}`)
})

test("flakeRefToString: github with ref", () => {
    const result = flakeRefToString({ type: "github", owner: "NixOS", repo: "nixpkgs", ref: "nixos-23.05" })
    if (result !== "github:NixOS/nixpkgs/nixos-23.05") {
        throw new Error(`Expected github:NixOS/nixpkgs/nixos-23.05, got ${result}`)
    }
})

test("flakeRefToString: gitlab", () => {
    const result = flakeRefToString({ type: "gitlab", owner: "user", repo: "repo" })
    if (result !== "gitlab:user/repo") throw new Error(`Expected gitlab:user/repo, got ${result}`)
})

test("flakeRefToString: git", () => {
    const result = flakeRefToString({ type: "git", url: "https://github.com/NixOS/nixpkgs.git" })
    if (result !== "git+https://github.com/NixOS/nixpkgs.git") {
        throw new Error(`Expected git+https://github.com/NixOS/nixpkgs.git, got ${result}`)
    }
})

test("flakeRefToString: path", () => {
    const result = flakeRefToString({ type: "path", path: "/path/to/flake" })
    if (result !== "path:/path/to/flake") throw new Error(`Expected path:/path/to/flake, got ${result}`)
})

test("flakeRefToString: tarball", () => {
    const result = flakeRefToString({ type: "tarball", url: "https://example.com/flake.tar.gz" })
    if (result !== "https://example.com/flake.tar.gz") {
        throw new Error(`Expected https://example.com/flake.tar.gz, got ${result}`)
    }
})

console.log("\n=== Testing Round-trip Conversion ===\n")

test("round-trip: github", () => {
    const original = "github:NixOS/nixpkgs/nixos-23.05"
    const parsed = parseFlakeRef(original)
    const stringified = flakeRefToString(parsed)
    if (stringified !== original) {
        throw new Error(`Round-trip failed: ${original} -> ${stringified}`)
    }
})

test("round-trip: git URL", () => {
    const original = "git+https://github.com/NixOS/nixpkgs.git"
    const parsed = parseFlakeRef(original)
    const stringified = flakeRefToString(parsed)
    if (stringified !== original) {
        throw new Error(`Round-trip failed: ${original} -> ${stringified}`)
    }
})

test("round-trip: path", () => {
    const original = "path:/path/to/flake"
    const parsed = parseFlakeRef(original)
    const stringified = flakeRefToString(parsed)
    if (stringified !== original) {
        throw new Error(`Round-trip failed: ${original} -> ${stringified}`)
    }
})

test("round-trip: indirect", () => {
    const original = "nixpkgs"
    const parsed = parseFlakeRef(original)
    const stringified = flakeRefToString(parsed)
    if (stringified !== original) {
        throw new Error(`Round-trip failed: ${original} -> ${stringified}`)
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
