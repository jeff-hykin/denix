#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:47
// try sha256 "abc" with FORMAT=base32

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha256", content: "abc", expected: "1b8m03r63zqhnjf7l5wnldhh7c134ap5vpj0850ymkq1iyzicy5s", format: "base32", label: "sha256 'abc' base32" })
