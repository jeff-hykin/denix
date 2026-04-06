#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:87-89
// try2 md5 after chmod 744 — mtime and other bits don't matter, only exec bit

import { tryHashPath, withTempTree } from "../shared_tooling/index.js"

await withTempTree({ files: { "hash-path/hello": "Hello World\n" } }, async ({ root }) => {
    await Deno.chmod(`${root}/hash-path/hello`, 0o744)
    await tryHashPath({ algo: "md5", dirPath: `${root}/hash-path`, expected: "20f3ffe011d4cfa7d72bfabef7882836", label: "try2 md5 chmod 744 hello" })
})
