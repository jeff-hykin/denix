#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:528
// checkConfigError "The deprecated `.*functor.wrapped` attribute .*is accessed, use `.*nestedTypes.elemType` instead." "options.mergedAttrsWith.type.nestedTypes.elemType.functor.wrapped" "./deprecated-wrapped.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The deprecated `.*functor.wrapped` attribute .*is accessed, use `.*nestedTypes.elemType` instead./,
    attr:    `options.mergedAttrsWith.type.nestedTypes.elemType.functor.wrapped`,
    modules: [`./deprecated-wrapped.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.mergedAttrsWith.type.nestedTypes.elemType.functor.wrapped @ ./deprecated-wrapped.nix",
})
