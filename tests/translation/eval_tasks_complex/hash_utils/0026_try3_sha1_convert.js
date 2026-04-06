#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-convert.sh:105
// try3 sha1 — round-trip hash conversion between base16, base32, base64

import { tryHashConvert } from "../shared_tooling/index.js"

await tryHashConvert({
    algo: "sha1",
    base16: "800d59cfcd3c05e900cb4e214be48f6b886a08df",
    base32: "vw46m23bizj4n8afrc0fj19wrp7mj3c0",
    base64: "gA1Zz808BekAy04hS+SPa4hqCN8=",
    label: "sha1 hash convert round-trip",
})
