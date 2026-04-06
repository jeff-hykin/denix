#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:39
// try sha256 "abcdbcdecdefdefg..." with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha256", content: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", expected: "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1", format: "base16", label: "sha256 long string base16" })
