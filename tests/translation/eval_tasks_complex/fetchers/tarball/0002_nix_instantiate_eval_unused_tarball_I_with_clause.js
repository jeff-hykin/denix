#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tarball.sh:45
// nix-instantiate --eval -E 'with <fnord/xyzzy>; 1 + 2' with nonexistent tarball -I path
// succeeds because lazy evaluation means the path is never forced

import { bashAssert } from "../../shared_tooling/index.js"

await bashAssert({
    args: [
        "--eval", "--expr", "with <fnord/xyzzy>; 1 + 2",
        "-I", "fnord=file:///no-such-tarball.tar",
    ],
    expected: "3",
    label: "eval with <fnord/xyzzy> 1+2 using unused -I tarball succeeds",
})
