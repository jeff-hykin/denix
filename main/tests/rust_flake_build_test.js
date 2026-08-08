#!/usr/bin/env deno run --allow-all
/**
 * `denix build` on remote flake references:
 *   - github:owner/repo/rev  (pinned; exercises the flake.lock GRAPH —
 *     rust_flake's lock says fenix.inputs.nixpkgs follows the root nixpkgs,
 *     which must override fenix's own flake.lock)
 *   - a URL to a raw flake.nix file (staged into a directory and evaluated
 *     as a flake; no lock, so inputs resolve unlocked)
 *
 * Dry-run only: the toolchain outputs are ~hundreds of MB. The expected
 * drvPath was verified byte-identical against real Nix
 * (`nix eval 'github:jeff-hykin/rust_flake/<rev>#packages.aarch64-darwin.default.drvPath'`);
 * the whole 475-drv closure matched too. Hash is system-specific, so exact
 * matching only runs on aarch64-darwin.
 */

import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

const REV = "f839b6f88369ce4bfeedba5a7562d77d4deae683"
const EXPECTED_DRV_AARCH64_DARWIN = "/nix/store/gmwws3sxr2qngappcq3p5m6nk9q79rlw-rust-2025-03-18.drv"

const repoRoot = new URL("../../", import.meta.url).pathname
const denix = (args) => {
    const out = new Deno.Command(Deno.execPath(), {
        args: ["run", "--quiet", "--no-lock", "--allow-all", `${repoRoot}denix`, ...args],
        stdout: "piped",
        stderr: "piped",
    }).outputSync()
    return {
        code: out.code,
        stdout: new TextDecoder().decode(out.stdout).trim(),
        stderr: new TextDecoder().decode(out.stderr).trim(),
    }
}

Deno.test("denix build github:owner/repo/rev resolves the lock graph like real Nix", () => {
    const { code, stdout, stderr } = denix(["build", `github:jeff-hykin/rust_flake/${REV}`, "--dry-run"])
    assertEquals(code, 0, `dry-run failed:\n${stderr}`)
    const drvPath = stdout.split("\n").pop()
    assert(/-rust-[\d-]+\.drv$/.test(drvPath), `unexpected drvPath: ${drvPath}`)
    if (Deno.build.os === "darwin" && Deno.build.arch === "aarch64") {
        assertEquals(drvPath, EXPECTED_DRV_AARCH64_DARWIN)
    }
})

Deno.test("denix build <url to raw flake.nix> stages the file as a flake", () => {
    const url = `https://raw.githubusercontent.com/jeff-hykin/rust_flake/${REV}/flake.nix`
    const { code, stdout, stderr } = denix(["build", url, "--dry-run"])
    assertEquals(code, 0, `dry-run failed:\n${stderr}`)
    const drvPath = stdout.split("\n").pop()
    // no flake.lock travels with a bare file, so inputs are unlocked — only
    // the shape of the result is stable
    assert(/-rust-[\d-]+\.drv$/.test(drvPath), `unexpected drvPath: ${drvPath}`)
})
