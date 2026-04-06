#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:54
// try sha256 "abcdbcdecdefdefg..." with FORMAT=sri

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha256", content: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", expected: "sha256-JI1qYdIGOLjlwCaTDD5gOaM85Flk/yFn9uzt1BnbBsE=", format: "sri", label: "sha256 long string sri" })
