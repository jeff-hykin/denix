#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:35
// try sha1 "abcdbcdecdefdefg..." with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha1", content: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", expected: "84983e441c3bd26ebaae4aa1f95129e5e54670f1", format: "base16", label: "sha1 long string base16" })
