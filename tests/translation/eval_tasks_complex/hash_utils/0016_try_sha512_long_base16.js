#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:43
// try sha512 "abcdbcdecdefdefg..." with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", expected: "204a8fc6dda82f0a0ced7beb8e08a41657c16ef468b228a8279be331a703c33596fd15c13b1b07f9aa1d3bea57789ca031ad85c7a71dd70354ec631238ca3445", format: "base16", label: "sha512 long string base16" })
