#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:92-94
// try2 md5 with symlink replacing hello — file type (symlink) matters

import { tryHashPath, withTempTree } from "../shared_tooling/index.js"

await withTempTree({ dirs: ["hash-path"], symlinks: { "hash-path/hello": "x" } }, async ({ root }) => {
    await tryHashPath({ algo: "md5", dirPath: `${root}/hash-path`, expected: "f78b733a68f5edbdf9413899339eaa4a", label: "try2 md5 symlink hello" })
})
