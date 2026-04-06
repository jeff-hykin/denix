#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:30
// try md5 "ABC...xyz0...9" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", expected: "d174ab98d277d9f5a5611c2c9f419d9f", format: "base16", label: "md5 alphanumeric base16" })
