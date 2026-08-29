import { sha1Hex, sha256Hex } from "../tools/hashing.js"
import { sha384 } from "../tools/sha_helpers.js"

// Mach-O + embedded-code-signature constants (see Apple's cctools loader.h and
// Security's CSCommon.h / codedirectory.h).
const MH_MAGIC_64 = 0xfeedfacf
const MH_CIGAM_64 = 0xcffaedfe
const MH_MAGIC_32 = 0xfeedface
const MH_CIGAM_32 = 0xcefaedfe
const FAT_MAGIC = 0xcafebabe
const FAT_MAGIC_64 = 0xcafebabf
const LC_CODE_SIGNATURE = 0x1d
const CSMAGIC_EMBEDDED_SIGNATURE = 0xfade0cc0
const CSMAGIC_CODEDIRECTORY = 0xfade0c02

const HASH_TYPE_SHA1 = 1
const HASH_TYPE_SHA256 = 2
const HASH_TYPE_SHA256_TRUNCATED = 3
const HASH_TYPE_SHA384 = 4

function hexToBytes(hex) {
    const out = new Uint8Array(hex.length / 2)
    for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16)
    }
    return out
}

function digestFor(hashType, data) {
    if (hashType === HASH_TYPE_SHA256 || hashType === HASH_TYPE_SHA256_TRUNCATED) {
        return hexToBytes(sha256Hex(data))
    }
    if (hashType === HASH_TYPE_SHA1) {
        return hexToBytes(sha1Hex(data))
    }
    if (hashType === HASH_TYPE_SHA384) {
        return hexToBytes(sha384(data))
    }
    throw new Error(`unsupported code-signature hash type ${hashType}`)
}

/** True if `bytes` starts with any thin or fat Mach-O magic. */
export function isMachO(bytes) {
    if (bytes.length < 8) { return false }
    const magic = new DataView(bytes.buffer, bytes.byteOffset).getUint32(0, false)
    return magic === MH_MAGIC_64 || magic === MH_CIGAM_64 ||
        magic === MH_MAGIC_32 || magic === MH_CIGAM_32 ||
        magic === FAT_MAGIC || magic === FAT_MAGIC_64
}

/**
 * Recompute the code-page hashes of every CodeDirectory in one Mach-O slice.
 * Returns the number of CodeDirectories updated (0 if the slice is unsigned).
 */
function resignSlice(bytes, view, sliceBase, sliceSize) {
    const magic = view.getUint32(sliceBase, false)
    const is64 = magic === MH_MAGIC_64 || magic === MH_CIGAM_64
    const littleEndian = magic === MH_CIGAM_64 || magic === MH_CIGAM_32
    const headerSize = is64 ? 32 : 28
    const commandCount = view.getUint32(sliceBase + 16, littleEndian)
    const commandsSize = view.getUint32(sliceBase + 20, littleEndian)
    if (commandsSize > sliceSize) {
        throw new Error("Mach-O load commands run past the end of the slice")
    }

    let signatureOffset = 0
    let signatureSize = 0
    let cursor = sliceBase + headerSize
    for (let i = 0; i < commandCount; i++) {
        const command = view.getUint32(cursor, littleEndian)
        const commandSize = view.getUint32(cursor + 4, littleEndian)
        if (commandSize < 8) {
            throw new Error("Mach-O load command with a nonsensical size")
        }
        if (command === LC_CODE_SIGNATURE) {
            signatureOffset = view.getUint32(cursor + 8, littleEndian)
            signatureSize = view.getUint32(cursor + 12, littleEndian)
        }
        cursor += commandSize
    }
    if (!signatureSize) { return 0 }

    // Every blob inside the signature is big-endian regardless of the Mach-O's.
    const superBlob = sliceBase + signatureOffset
    if (view.getUint32(superBlob, false) !== CSMAGIC_EMBEDDED_SIGNATURE) {
        throw new Error("LC_CODE_SIGNATURE does not point at an embedded signature")
    }
    const blobCount = view.getUint32(superBlob + 8, false)
    let updated = 0
    for (let i = 0; i < blobCount; i++) {
        const blob = superBlob + view.getUint32(superBlob + 12 + i * 8 + 4, false)
        if (view.getUint32(blob, false) !== CSMAGIC_CODEDIRECTORY) { continue }
        rehashCodeDirectory(bytes, view, sliceBase, blob)
        updated++
    }
    if (updated === 0) {
        throw new Error("code signature has no CodeDirectory to rehash")
    }
    return updated
}

function rehashCodeDirectory(bytes, view, sliceBase, codeDirectory) {
    const hashOffset = view.getUint32(codeDirectory + 16, false)
    const codeSlotCount = view.getUint32(codeDirectory + 28, false)
    const hashSize = view.getUint8(codeDirectory + 36)
    const hashType = view.getUint8(codeDirectory + 37)
    const pageShift = view.getUint8(codeDirectory + 39)
    let codeLimit = view.getUint32(codeDirectory + 32, false)
    const version = view.getUint32(codeDirectory + 8, false)
    if (codeLimit === 0 && version >= 0x20300) {
        codeLimit = Number(view.getBigUint64(codeDirectory + 56, false))
    }

    // pageShift 0 means "one slot covering the whole signed range".
    const pageBytes = pageShift === 0 ? codeLimit : 1 << pageShift
    const expectedSlots = pageBytes === 0 ? 0 : Math.ceil(codeLimit / pageBytes)
    if (expectedSlots !== codeSlotCount) {
        throw new Error(`CodeDirectory covers ${codeSlotCount} pages but ${codeLimit} bytes at ${pageBytes}/page needs ${expectedSlots}`)
    }

    for (let slot = 0; slot < codeSlotCount; slot++) {
        const start = sliceBase + slot * pageBytes
        const end = Math.min(start + pageBytes, sliceBase + codeLimit)
        const digest = digestFor(hashType, bytes.subarray(start, end))
        bytes.set(digest.subarray(0, hashSize), codeDirectory + hashOffset + slot * hashSize)
    }
}

/**
 * Refresh the embedded code signature of an already-signed Mach-O after its
 * bytes were edited in place.
 *
 * Only the CodeDirectory page hashes are recomputed, which is valid precisely
 * because the edit did not move anything: every offset, the identifier, the
 * requirements and the special slots stay as the original signer left them.
 *
 * Mutates `bytes`. Returns the number of CodeDirectories updated; 0 means the
 * file carried no signature and needs none.
 */
export function resignMachO(bytes) {
    if (!isMachO(bytes)) { return 0 }
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    const magic = view.getUint32(0, false)
    if (magic !== FAT_MAGIC && magic !== FAT_MAGIC_64) {
        return resignSlice(bytes, view, 0, bytes.length)
    }

    // Fat headers are always big-endian. 0xcafebabe is also the Java class-file
    // magic, so every slice is checked for a Mach-O magic before touching it.
    const wide = magic === FAT_MAGIC_64
    const archCount = view.getUint32(4, false)
    const recordSize = wide ? 32 : 20
    if (8 + archCount * recordSize > bytes.length) { return 0 }
    const slices = []
    for (let i = 0; i < archCount; i++) {
        const record = 8 + i * recordSize
        const offset = wide ? Number(view.getBigUint64(record + 8, false)) : view.getUint32(record + 8, false)
        const size = wide ? Number(view.getBigUint64(record + 16, false)) : view.getUint32(record + 12, false)
        if (offset + size > bytes.length || size < 8) { return 0 }
        const sliceMagic = view.getUint32(offset, false)
        if (sliceMagic !== MH_MAGIC_64 && sliceMagic !== MH_CIGAM_64 &&
            sliceMagic !== MH_MAGIC_32 && sliceMagic !== MH_CIGAM_32) {
            return 0
        }
        slices.push({ offset, size })
    }
    let updated = 0
    for (const { offset, size } of slices) {
        updated += resignSlice(bytes, view, offset, size)
    }
    return updated
}
