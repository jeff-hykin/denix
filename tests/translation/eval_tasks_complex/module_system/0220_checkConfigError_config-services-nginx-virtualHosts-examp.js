#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:892
// checkConfigError "Did you mean .services\\.nginx\\.virtualHosts\\.\"example\\.com\"\\.ssl\\.certificate. or .services\\.nginx\\.virtualHosts\\.\"example\\.com\"\\.ssl\\.certificateKey.\\?" "config.services.nginx.virtu

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .services\.nginx\.virtualHosts\."example\.com"\.ssl\.certificate. or .services\.nginx\.virtualHosts\."example\.com"\.ssl\.certificateKey.\?/,
    attr:    `config.services.nginx.virtualHosts."example.com"`,
    modules: [`./error-typo-deeply-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.services.nginx.virtualHosts.\"example.com\" @ ./error-typo-deeply-nested.nix",
})
