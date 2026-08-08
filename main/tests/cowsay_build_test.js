#!/usr/bin/env deno run --allow-all
/**
 * End-to-end: build the real cowsay from a pinned nixpkgs, both as a raw
 * expression and as a flake. Network + full nixpkgs eval (fast once the
 * tarball and outputs are cached, ~10min cold on first ever run).
 *
 * The expected drvPath below was verified byte-identical against real Nix
 * (`nix eval --impure --expr '(...).cowsay.drvPath'`) on aarch64-darwin;
 * on other systems we only check the name since the hash is system-specific.
 */

import { assert, assertEquals, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts"

const NIXPKGS_URL = "https://github.com/NixOS/nixpkgs/archive/b7c2ada94fe99c15b0dbcf4d11fd7850b957a436.tar.gz"
const EXPECTED_DRV_AARCH64_DARWIN = "/nix/store/2m1bmh02qv1wa599x7a8bymvan22ddrz-cowsay-3.8.4.drv"

const repoRoot = new URL("../../", import.meta.url).pathname
const denix = (args, cwd) => {
    const out = new Deno.Command(Deno.execPath(), {
        args: ["run", "--quiet", "--no-lock", "--allow-all", `${repoRoot}denix`, ...args],
        cwd,
        stdout: "piped",
        stderr: "piped",
    }).outputSync()
    return {
        code: out.code,
        stdout: new TextDecoder().decode(out.stdout).trim(),
        stderr: new TextDecoder().decode(out.stderr).trim(),
    }
}

Deno.test("cowsay from pinned nixpkgs: drvPath matches real Nix (expression)", () => {
    const expr = `(import (builtins.fetchTarball "${NIXPKGS_URL}") {}).cowsay`
    const { code, stdout, stderr } = denix(["build", "-E", expr, "--dry-run"])
    assertEquals(code, 0, `dry-run failed:\n${stderr}`)
    const drvPath = stdout.split("\n").pop()
    assert(drvPath.endsWith("-cowsay-3.8.4.drv"), `unexpected drvPath: ${drvPath}`)
    if (Deno.build.os === "darwin" && Deno.build.arch === "aarch64") {
        assertEquals(drvPath, EXPECTED_DRV_AARCH64_DARWIN)
    }
})

Deno.test("cowsay flake with pinned nixpkgs input builds and runs", async () => {
    const flakeDir = await Deno.makeTempDir({ prefix: "denix_cowsay_flake_" })
    await Deno.writeTextFile(`${flakeDir}/flake.nix`, `{
        description = "cowsay from pinned nixpkgs";
        inputs.nixpkgs.url = "${NIXPKGS_URL}";
        outputs = { self, nixpkgs }:
            let pkgs = import nixpkgs { };
            in {
                packages.\${pkgs.stdenv.hostPlatform.system}.default = pkgs.cowsay;
            };
    }`)

    const { code, stdout, stderr } = denix(["build", flakeDir, "--quiet", "--no-link"], flakeDir)
    assertEquals(code, 0, `build failed:\n${stderr}\n${stdout}`)
    const outPath = stdout.split("\n").filter((l) => l.includes("-cowsay-"))[0]
    assert(outPath, `no cowsay output path in:\n${stdout}`)

    const run = new Deno.Command(`${outPath}/bin/cowsay`, { args: ["moo"], stdout: "piped" }).outputSync()
    assertEquals(run.code, 0)
    assertStringIncludes(new TextDecoder().decode(run.stdout), "moo")

    await Deno.remove(flakeDir, { recursive: true })
})
