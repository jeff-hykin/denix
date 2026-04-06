#!/usr/bin/env -S deno run --allow-all
// Test: Compare nix-build vs denix_build output for a simple derivation.
// If nix-build is available, both should produce the same file content.

import { compareBuild } from "../shared_tooling/index.js"
import { withTempTree } from "../shared_tooling/index.js"

await withTempTree({
    files: {
        "default.nix": `
            derivation {
                name = "compare-test";
                system = "x86_64-linux";
                builder = "/bin/sh";
                args = [ "-c" "echo hello > $out/greeting; echo 42 > $out/number" ];
            }
        `
    }
}, async ({ root: dir }) => {
    const result = await compareBuild([`${dir}/default.nix`, "--no-out-link"], { cwd: dir })

    if (result.nixResult.missing) {
        console.log("SKIP: nix-build not available, cannot compare")
        // Still check denix succeeded
        if (result.denixResult.code !== 0) {
            console.error("FAIL: denix_build failed:", result.denixResult.stderr.trimEnd())
            Deno.exit(1)
        }
        Deno.exit(0)
    }

    if (!result.ok) {
        console.error("FAIL: nix-build vs denix_build output differs:")
        for (const d of result.diffs) {
            console.error("  ", d)
        }
        console.error("  nix paths:", result.nixResult.outputPaths)
        console.error("  denix paths:", result.denixResult.outputPaths)
        Deno.exit(1)
    }
})
