#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tarball.sh:44
// nix-instantiate --eval -E '1 + 2' with a nonexistent tarball -I path succeeds
// because the -I path is never used

import { bashAssert } from "../../shared_tooling/index.js"

await bashAssert({
    args: [
        "--eval", "--expr", "1 + 2",
        "-I", "fnord=file:///no-such-tarball.tar",
    ],
    expected: "3",
    label: "eval 1+2 with unused -I tarball path succeeds",
})
