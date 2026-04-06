#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-convert.sh:106
// try3 sha256 — round-trip hash conversion between base16, base32, base64

import { tryHashConvert } from "../shared_tooling/index.js"

await tryHashConvert({
    algo: "sha256",
    base16: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    base32: "1b8m03r63zqhnjf7l5wnldhh7c134ap5vpj0850ymkq1iyzicy5s",
    base64: "ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=",
    label: "sha256 hash convert round-trip",
})
