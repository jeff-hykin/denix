#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:42
// try sha512 "abc" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "abc", expected: "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f", format: "base16", label: "sha512 'abc' base16" })
