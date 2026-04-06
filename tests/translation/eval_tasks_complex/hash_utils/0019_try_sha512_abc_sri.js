#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:52
// try sha512 "abc" with FORMAT=sri

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "abc", expected: "sha512-3a81oZNherrMQXNJriBBMRLm+k6JqX6iCp7u5ktV05ohkpkqJ0/BqDa6PCOj/uu9RU1EI2Q86A4qmslPpUyknw==", format: "sri", label: "sha512 'abc' sri" })
