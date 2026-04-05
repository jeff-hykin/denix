#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:829
// checkConfigError "Cannot merge definitions.*\\n\\s*- In .file.*\\n\\s*- In .other.*" "config.conflict" "./mkDefinition.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Cannot merge definitions.*\n\s*- In .file.*\n\s*- In .other.*/,
    attr:    `config.conflict`,
    modules: [`./mkDefinition.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conflict @ ./mkDefinition.nix",
})
