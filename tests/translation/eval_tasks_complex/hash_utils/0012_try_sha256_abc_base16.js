#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:38
// try sha256 "abc" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha256", content: "abc", expected: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad", format: "base16", label: "sha256 'abc' base16" })
