#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:53
// try sha512 "abcdbcdecdefdefg..." with FORMAT=sri

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", expected: "sha512-IEqPxt2oLwoM7XvrjgikFlfBbvRosiioJ5vjMacDwzWW/RXBOxsH+aodO+pXeJygMa2Fx6cd1wNU7GMSOMo0RQ==", format: "sri", label: "sha512 long string sri" })
