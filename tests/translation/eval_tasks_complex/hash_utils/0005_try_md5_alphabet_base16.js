#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:29
// try md5 "abcdefghijklmnopqrstuvwxyz" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "abcdefghijklmnopqrstuvwxyz", expected: "c3fcd3d76192e4007dfb496cca67e13b", format: "base16", label: "md5 lowercase alphabet base16" })
