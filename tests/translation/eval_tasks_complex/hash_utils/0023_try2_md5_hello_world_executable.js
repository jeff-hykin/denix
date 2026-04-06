#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:83-84
// try2 md5 after chmod +x on hash-path/hello — execute bit matters

import { tryHashPath, withTempTree } from "../shared_tooling/index.js"

await withTempTree({ files: { "hash-path/hello": "Hello World\n" } }, async ({ root }) => {
    await Deno.chmod(`${root}/hash-path/hello`, 0o755)
    await tryHashPath({ algo: "md5", dirPath: `${root}/hash-path`, expected: "20f3ffe011d4cfa7d72bfabef7882836", label: "try2 md5 executable hello" })
})
