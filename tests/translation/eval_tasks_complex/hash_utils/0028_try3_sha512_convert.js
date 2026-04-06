#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-convert.sh:107
// try3 sha512 — round-trip hash conversion between base16, base32, base64

import { tryHashConvert } from "../shared_tooling/index.js"

await tryHashConvert({
    algo: "sha512",
    base16: "204a8fc6dda82f0a0ced7beb8e08a41657c16ef468b228a8279be331a703c33596fd15c13b1b07f9aa1d3bea57789ca031ad85c7a71dd70354ec631238ca3445",
    base32: "12k9jiq29iyqm03swfsgiw5mlqs173qazm3n7daz43infy12pyrcdf30fkk3qwv4yl2ick8yipc2mqnlh48xsvvxl60lbx8vp38yji0",
    base64: "IEqPxt2oLwoM7XvrjgikFlfBbvRosiioJ5vjMacDwzWW/RXBOxsH+aodO+pXeJygMa2Fx6cd1wNU7GMSOMo0RQ==",
    label: "sha512 hash convert round-trip",
})
