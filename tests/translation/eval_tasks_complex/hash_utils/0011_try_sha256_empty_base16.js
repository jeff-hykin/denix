#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:37
// try sha256 "" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha256", content: "", expected: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", format: "base16", label: "empty sha256 base16" })
