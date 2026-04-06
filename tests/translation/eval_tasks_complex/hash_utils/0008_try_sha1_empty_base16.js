#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:33
// try sha1 "" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha1", content: "", expected: "da39a3ee5e6b4b0d3255bfef95601890afd80709", format: "base16", label: "empty sha1 base16" })
