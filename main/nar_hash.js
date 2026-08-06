/**
 * NAR (Nix ARchive) serialization + hashing.
 * Format reference: Figure 5.2 of Eelco Dolstra's thesis / nix/src/libutil/archive.cc
 *
 *   serialise(fso)  = str("nix-archive-1") + serialise1(fso)
 *   serialise1(fso) = str("(") + serialise2(fso) + str(")")
 *   regular:   str("type") str("regular") [str("executable") str("")] str("contents") str(contents)
 *   symlink:   str("type") str("symlink") str("target") str(target)
 *   directory: str("type") str("directory")
 *              for each entry (sorted byte-wise by name):
 *                  str("entry") str("(") str("name") str(name) str("node") serialise1(entry) str(")")
 *   str(s) = little-endian uint64 length, then bytes, zero-padded to 8-byte boundary
 */

import { sha256Hex } from "../tools/hashing.js"

export function serializeNARSync(path) {
    const parts = [encodeString("nix-archive-1")]
    pushNodeParts(parts, path)
    return concatUint8Arrays(parts)
}

/** Hash a file/directory/symlink in NAR format. Returns "sha256:<hex>". */
export function hashPathSync(path) {
    return `sha256:${sha256Hex(serializeNARSync(path))}`
}

/** Convert "sha256:<hex>" to SRI "sha256-<base64>" — the format real Nix uses
 *  for exposed narHash metadata (fetchTree/fetchGit results, flake.lock). */
export function narHashToSRI(narHash) {
    if (narHash.startsWith("sha256-")) {
        return narHash
    }
    const hex = narHash.replace(/^sha256:/, "")
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
    }
    let bin = ""
    for (const b of bytes) {
        bin += String.fromCharCode(b)
    }
    return `sha256-${btoa(bin)}`
}

// Kept names used by existing callers
export const hashDirectorySync = hashPathSync
export async function hashDirectory(path) {
    return hashPathSync(path)
}

// Accumulates into a shared array; returning per-node arrays and spreading them
// into push() overflows the call stack on large trees (e.g. nixpkgs)
function pushNodeParts(parts, path) {
    const stat = Deno.lstatSync(path)
    parts.push(encodeString("("))
    if (stat.isSymlink) {
        parts.push(encodeString("type"), encodeString("symlink"))
        parts.push(encodeString("target"), encodeString(Deno.readLinkSync(path)))
    } else if (stat.isFile) {
        parts.push(encodeString("type"), encodeString("regular"))
        if ((stat.mode & 0o111) !== 0) {
            parts.push(encodeString("executable"), encodeString(""))
        }
        parts.push(encodeString("contents"), encodeData(Deno.readFileSync(path)))
    } else if (stat.isDirectory) {
        parts.push(encodeString("type"), encodeString("directory"))
        const names = [...Deno.readDirSync(path)].map((e) => e.name)
        names.sort(compareBytes)
        for (const name of names) {
            parts.push(encodeString("entry"), encodeString("("))
            parts.push(encodeString("name"), encodeString(name))
            parts.push(encodeString("node"))
            pushNodeParts(parts, `${path}/${name}`)
            parts.push(encodeString(")"))
        }
    } else {
        throw new Error(`NAR: unsupported file type at ${path}`)
    }
    parts.push(encodeString(")"))
}

// Nix sorts directory entries by raw byte value, not locale
const textEncoder = new TextEncoder()
function compareBytes(a, b) {
    const ab = textEncoder.encode(a)
    const bb = textEncoder.encode(b)
    const len = Math.min(ab.length, bb.length)
    for (let i = 0; i < len; i++) {
        if (ab[i] !== bb[i]) {
            return ab[i] - bb[i]
        }
    }
    return ab.length - bb.length
}

function encodeString(str) {
    return encodeData(textEncoder.encode(str))
}

function encodeData(data) {
    const padding = (8 - (data.length % 8)) % 8
    const result = new Uint8Array(8 + data.length + padding)
    new DataView(result.buffer).setBigUint64(0, BigInt(data.length), true)
    result.set(data, 8)
    return result
}

function concatUint8Arrays(arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    for (const arr of arrays) {
        result.set(arr, offset)
        offset += arr.length
    }
    return result
}
