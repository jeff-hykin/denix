#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:80
// try2 md5 with directory containing "Hello World\n" in hash-path/hello

import { tryHashPath, withTempTree } from "../shared_tooling/index.js"

await withTempTree({ files: { "hash-path/hello": "Hello World\n" } }, async ({ root }) => {
    await tryHashPath({ algo: "md5", dirPath: `${root}/hash-path`, expected: "ea9b55537dd4c7e104515b2ccfaf4100", label: "try2 md5 Hello World dir" })
})
