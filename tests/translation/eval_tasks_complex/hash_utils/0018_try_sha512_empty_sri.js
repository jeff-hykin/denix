#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:51
// try sha512 "" with FORMAT=sri

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "", expected: "sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==", format: "sri", label: "empty sha512 sri" })
