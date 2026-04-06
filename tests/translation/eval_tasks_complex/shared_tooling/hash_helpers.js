// hash_helpers.js — helpers for testing nix-hash and nix hash convert
// commands via denix_eval.
//
// Ported from the bash helpers in hash-path.sh (try, try2) and
// hash-convert.sh (try3).

import { runDenix } from "./run_denix.js"
import { AssertionError } from "./compare.js"

/**
 * tryHash — write `content` to a temp file, then run the equivalent of
 *   nix-hash --flat [--FORMAT] --type ALGO file
 * and assert the trimmed output equals `expected`.
 *
 * @param {object} opts
 * @param {string} opts.algo      hash algorithm (md5, sha1, sha256, sha512)
 * @param {string} opts.content   data to hash
 * @param {string} opts.expected  expected hash string
 * @param {string} [opts.format]  optional output format flag (e.g. "base32")
 * @param {string} [opts.label]   human-readable label for error messages
 */
export async function tryHash({ algo, content, expected, format, label }) {
    const tmpFile = await Deno.makeTempFile({ prefix: "denix_hash_" })
    try {
        await Deno.writeTextFile(tmpFile, content)

        const args = ["--flat"]
        if (format) args.push(`--${format}`)
        args.push("--type", algo, tmpFile)

        const res = await runDenix(["nix-hash", ...args])
        const hash = (res.stdout || "").trim()

        if (hash !== expected) {
            throw new AssertionError(
                `tryHash: hash ${algo}, expected ${expected}, got ${hash}${label ? ` -- ${label}` : ""}`,
                { algo, content, expected, actual: hash, format, exitCode: res.code, stderr: res.stderr },
            )
        }
    } finally {
        try { await Deno.remove(tmpFile) } catch {}
    }
}

/**
 * tryHashPath — run the equivalent of
 *   nix-hash --type ALGO dirpath
 * and assert the trimmed output equals `expected`.
 *
 * @param {object} opts
 * @param {string} opts.algo      hash algorithm
 * @param {string} opts.dirPath   path to hash (directory or file)
 * @param {string} opts.expected  expected hash string
 * @param {string} [opts.label]   human-readable label for error messages
 */
export async function tryHashPath({ algo, dirPath, expected, label }) {
    const res = await runDenix(["nix-hash", "--type", algo, dirPath])
    const hash = (res.stdout || "").trim()

    if (hash !== expected) {
        throw new AssertionError(
            `tryHashPath: hash ${algo}, expected ${expected}, got ${hash}${label ? ` -- ${label}` : ""}`,
            { algo, dirPath, expected, actual: hash, exitCode: res.code, stderr: res.stderr },
        )
    }
}

/**
 * tryHashConvert — run a series of hash-convert round-trips and assert
 * consistency between base16, base32, base64, and SRI representations.
 *
 * Equivalent to try3 in hash-convert.sh:
 *   base16 -> base64, check
 *   base16 -> sri,    check
 *   base16 -> base32, check
 *   base32 -> base16, check  (via nix-hash --to-base16)
 *   base64 -> base16, check  (via nix hash convert --to base16)
 *
 * @param {object} opts
 * @param {string} opts.algo    hash algorithm
 * @param {string} opts.base16  hex encoding
 * @param {string} opts.base32  nix base32 encoding
 * @param {string} opts.base64  base64 encoding
 * @param {string} [opts.label] human-readable label for error messages
 */
export async function tryHashConvert({ algo, base16, base32, base64, label }) {
    const tag = label ? ` -- ${label}` : ""

    // base16 -> base64
    const r1 = await runDenix(["hash", "convert", "--hash-algo", algo, "--to", "base64", base16])
    const h64 = (r1.stdout || "").trim()
    if (h64 !== base64) {
        throw new AssertionError(
            `tryHashConvert: base16->base64 expected ${base64}, got ${h64}${tag}`,
            { algo, base16, base32, base64, step: "base16->base64", actual: h64, exitCode: r1.code, stderr: r1.stderr },
        )
    }

    // base16 -> sri
    const r2 = await runDenix(["hash", "convert", "--hash-algo", algo, "--to", "sri", base16])
    const sri = (r2.stdout || "").trim()
    const expectedSri = `${algo}-${base64}`
    if (sri !== expectedSri) {
        throw new AssertionError(
            `tryHashConvert: base16->sri expected ${expectedSri}, got ${sri}${tag}`,
            { algo, base16, base32, base64, step: "base16->sri", actual: sri, exitCode: r2.code, stderr: r2.stderr },
        )
    }

    // base16 -> base32
    const r3 = await runDenix(["hash", "convert", "--hash-algo", algo, "--to", "base32", base16])
    const h32 = (r3.stdout || "").trim()
    if (h32 !== base32) {
        throw new AssertionError(
            `tryHashConvert: base16->base32 expected ${base32}, got ${h32}${tag}`,
            { algo, base16, base32, base64, step: "base16->base32", actual: h32, exitCode: r3.code, stderr: r3.stderr },
        )
    }

    // base32 -> base16 (via nix-hash --to-base16)
    const r4 = await runDenix(["nix-hash", "--type", algo, "--to-base16", h32])
    const h16a = (r4.stdout || "").trim()
    if (h16a !== base16) {
        throw new AssertionError(
            `tryHashConvert: base32->base16 expected ${base16}, got ${h16a}${tag}`,
            { algo, base16, base32, base64, step: "base32->base16", actual: h16a, exitCode: r4.code, stderr: r4.stderr },
        )
    }

    // base64 -> base16 (via nix hash convert --to base16)
    const r5 = await runDenix(["hash", "convert", "--hash-algo", algo, "--to", "base16", h64])
    const h16b = (r5.stdout || "").trim()
    if (h16b !== base16) {
        throw new AssertionError(
            `tryHashConvert: base64->base16 expected ${base16}, got ${h16b}${tag}`,
            { algo, base16, base32, base64, step: "base64->base16", actual: h16b, exitCode: r5.code, stderr: r5.stderr },
        )
    }
}
