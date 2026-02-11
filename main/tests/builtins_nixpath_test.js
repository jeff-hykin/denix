import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.nixPath - empty NIX_PATH returns empty array", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.delete("NIX_PATH")
        const result = builtins.nixPath()
        assertEquals(result, [])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        }
    }
})

Deno.test("builtins.nixPath - single prefix=path entry", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "nixpkgs=/path/to/nixpkgs")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "nixpkgs", path: "/path/to/nixpkgs" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - single path-only entry (no prefix)", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "/plain/path")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "", path: "/plain/path" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - multiple mixed entries", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "nixpkgs=/nix/pkgs:home-manager=/nix/hm:/plain/path")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "nixpkgs", path: "/nix/pkgs" },
            { prefix: "home-manager", path: "/nix/hm" },
            { prefix: "", path: "/plain/path" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - multiple entries with same prefix", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "nixpkgs=/path1:nixpkgs=/path2")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "nixpkgs", path: "/path1" },
            { prefix: "nixpkgs", path: "/path2" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - relative paths", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "home=~/config:./local")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "home", path: "~/config" },
            { prefix: "", path: "./local" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - paths with = character in path", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        // Only the first = is treated as separator
        Deno.env.set("NIX_PATH", "prefix=/path/with=equals")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "prefix", path: "/path/with=equals" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - empty string in NIX_PATH", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        Deno.env.set("NIX_PATH", "")
        const result = builtins.nixPath()
        // Empty string should result in empty array
        assertEquals(result, [])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - whitespace handling", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        // Nix preserves whitespace in paths
        Deno.env.set("NIX_PATH", "prefix=/path with spaces:  /path/with/leading/space")
        const result = builtins.nixPath()
        assertEquals(result, [
            { prefix: "prefix", path: "/path with spaces" },
            { prefix: "", path: "  /path/with/leading/space" }
        ])
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})

Deno.test("builtins.nixPath - integration with findFile", () => {
    const originalNixPath = Deno.env.get("NIX_PATH")
    try {
        // Set up a known NIX_PATH
        Deno.env.set("NIX_PATH", "test=/tmp/test-nixpath")

        const nixPath = builtins.nixPath()
        assertEquals(nixPath.length, 1)
        assertEquals(nixPath[0].prefix, "test")
        assertEquals(nixPath[0].path, "/tmp/test-nixpath")

        // Verify structure matches what findFile expects
        // findFile uses nixPath as a list of {prefix, path} objects
        assertEquals(typeof nixPath[0].prefix, "string")
        assertEquals(typeof nixPath[0].path, "string")
    } finally {
        if (originalNixPath !== undefined) {
            Deno.env.set("NIX_PATH", originalNixPath)
        } else {
            Deno.env.delete("NIX_PATH")
        }
    }
})
