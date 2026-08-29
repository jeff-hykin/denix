import { assertEquals, assertNotEquals, assertThrows } from "jsr:@std/assert"
import { isMachO, resignMachO } from "../macho_sign.js"
import { relocateTree, RELOC_PREFIX } from "../substituter.js"
import { sha256Hex } from "../../tools/hashing.js"

const PAGE_SHIFT = 12
const PAGE_BYTES = 1 << PAGE_SHIFT
const CD_HEADER_BYTES = 88 // CodeDirectory version 0x20400
const IDENTIFIER = "denix-test\0"

/**
 * Build a minimal but structurally faithful signed arm64 Mach-O: a header, an
 * LC_CODE_SIGNATURE load command, `codeBytes` of payload, then an embedded
 * signature holding one SHA-256 CodeDirectory.
 */
function buildSignedMachO({ codeBytes = PAGE_BYTES * 2 + 100, hashSize = 32, hashType = 2, extraCodeDirectories = 0 } = {}) {
    const codeLimit = codeBytes
    const slotCount = Math.ceil(codeLimit / PAGE_BYTES)
    const identifierOffset = CD_HEADER_BYTES
    const hashOffset = identifierOffset + IDENTIFIER.length
    const codeDirectoryLength = hashOffset + slotCount * hashSize
    const directoryCount = 1 + extraCodeDirectories
    const superBlobHeader = 12 + directoryCount * 8
    const signatureLength = superBlobHeader + directoryCount * codeDirectoryLength

    const bytes = new Uint8Array(codeLimit + signatureLength)
    const view = new DataView(bytes.buffer)

    view.setUint32(0, 0xfeedfacf, true) // MH_MAGIC_64
    view.setUint32(4, 0x0100000c, true) // CPU_TYPE_ARM64
    view.setUint32(8, 0, true)
    view.setUint32(12, 2, true) // MH_EXECUTE
    view.setUint32(16, 1, true) // ncmds
    view.setUint32(20, 16, true) // sizeofcmds
    view.setUint32(24, 0, true)
    view.setUint32(28, 0, true)
    view.setUint32(32, 0x1d, true) // LC_CODE_SIGNATURE
    view.setUint32(36, 16, true)
    view.setUint32(40, codeLimit, true) // dataoff
    view.setUint32(44, signatureLength, true) // datasize

    // Deterministic filler so a mutation is guaranteed to change a page hash.
    for (let i = 48; i < codeLimit; i++) {
        bytes[i] = (i * 31) & 0xff
    }

    view.setUint32(codeLimit, 0xfade0cc0, false) // CSMAGIC_EMBEDDED_SIGNATURE
    view.setUint32(codeLimit + 4, signatureLength, false)
    view.setUint32(codeLimit + 8, directoryCount, false)
    for (let i = 0; i < directoryCount; i++) {
        const directory = superBlobHeader + i * codeDirectoryLength
        view.setUint32(codeLimit + 12 + i * 8, i === 0 ? 0 : 0x1000 + i, false)
        view.setUint32(codeLimit + 12 + i * 8 + 4, directory, false)

        const base = codeLimit + directory
        view.setUint32(base, 0xfade0c02, false) // CSMAGIC_CODEDIRECTORY
        view.setUint32(base + 4, codeDirectoryLength, false)
        view.setUint32(base + 8, 0x20400, false) // version
        view.setUint32(base + 12, 0x2, false) // CS_ADHOC
        view.setUint32(base + 16, hashOffset, false)
        view.setUint32(base + 20, identifierOffset, false)
        view.setUint32(base + 24, 0, false) // nSpecialSlots
        view.setUint32(base + 28, slotCount, false)
        view.setUint32(base + 32, codeLimit, false)
        view.setUint8(base + 36, hashSize)
        view.setUint8(base + 37, hashType)
        view.setUint8(base + 38, 0)
        view.setUint8(base + 39, PAGE_SHIFT)
        for (let c = 0; c < IDENTIFIER.length; c++) {
            bytes[base + identifierOffset + c] = IDENTIFIER.charCodeAt(c)
        }
    }
    return { bytes, codeLimit, slotCount, hashOffset, hashSize, codeDirectoryLength, superBlobHeader }
}

function hexToBytes(hex) {
    const out = new Uint8Array(hex.length / 2)
    for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16)
    }
    return out
}

/** Recompute the expected page hashes independently of macho_sign.js. */
function expectedSlotHashes(bytes, sliceBase, codeLimit, slotCount) {
    const hashes = []
    for (let slot = 0; slot < slotCount; slot++) {
        const start = sliceBase + slot * PAGE_BYTES
        const end = Math.min(start + PAGE_BYTES, sliceBase + codeLimit)
        hashes.push(sha256Hex(bytes.subarray(start, end)))
    }
    return hashes
}

function slotHashesInFile(bytes, sliceBase, layout, directoryIndex = 0) {
    const directory = sliceBase + layout.codeLimit + layout.superBlobHeader + directoryIndex * layout.codeDirectoryLength
    const hashes = []
    for (let slot = 0; slot < layout.slotCount; slot++) {
        const at = directory + layout.hashOffset + slot * layout.hashSize
        let hex = ""
        for (const byte of bytes.subarray(at, at + layout.hashSize)) {
            hex += byte.toString(16).padStart(2, "0")
        }
        hashes.push(hex)
    }
    return hashes
}

Deno.test("macho_sign - isMachO recognizes thin and fat magics, rejects others", () => {
    const magics = [0xfeedfacf, 0xcffaedfe, 0xfeedface, 0xcefaedfe, 0xcafebabe, 0xcafebabf]
    for (const magic of magics) {
        const bytes = new Uint8Array(8)
        new DataView(bytes.buffer).setUint32(0, magic, false)
        assertEquals(isMachO(bytes), true, `magic 0x${magic.toString(16)}`)
    }
    assertEquals(isMachO(new TextEncoder().encode("#!/bin/sh\n")), false)
    assertEquals(isMachO(new Uint8Array([0xfe, 0xed])), false)
})

Deno.test("macho_sign - rehashes every page of a thin binary after an edit", () => {
    const layout = buildSignedMachO()
    const { bytes } = layout
    assertEquals(layout.slotCount, 3)

    const before = slotHashesInFile(bytes, 0, layout)
    bytes[100] ^= 0xff // an edit inside page 0
    bytes[PAGE_BYTES + 7] ^= 0xff // and one inside page 1

    assertEquals(resignMachO(bytes), 1)

    const after = slotHashesInFile(bytes, 0, layout)
    assertEquals(after, expectedSlotHashes(bytes, 0, layout.codeLimit, layout.slotCount))
    assertNotEquals(after[0], before[0])
    assertNotEquals(after[1], before[1])
})

Deno.test("macho_sign - updates every CodeDirectory in the superblob", () => {
    const layout = buildSignedMachO({ extraCodeDirectories: 1 })
    const { bytes } = layout
    bytes[64] ^= 0xff

    assertEquals(resignMachO(bytes), 2)

    for (const index of [0, 1]) {
        assertEquals(
            slotHashesInFile(bytes, 0, layout, index),
            expectedSlotHashes(bytes, 0, layout.codeLimit, layout.slotCount),
            `CodeDirectory ${index}`,
        )
    }
})

Deno.test("macho_sign - a Mach-O without a signature is left untouched", () => {
    const bytes = new Uint8Array(256)
    const view = new DataView(bytes.buffer)
    view.setUint32(0, 0xfeedfacf, true)
    view.setUint32(4, 0x0100000c, true)
    view.setUint32(12, 2, true)
    view.setUint32(16, 0, true) // ncmds = 0
    view.setUint32(20, 0, true)
    const copy = bytes.slice()

    assertEquals(resignMachO(bytes), 0)
    assertEquals(bytes, copy)
})

Deno.test("macho_sign - non-Mach-O input is ignored", () => {
    const script = new TextEncoder().encode("#!/tmp/dnixs/abc/bin/sh\necho hi\n")
    assertEquals(resignMachO(script), 0)
})

Deno.test("macho_sign - signs both slices of a fat binary", () => {
    const first = buildSignedMachO({ codeBytes: PAGE_BYTES * 2 })
    const second = buildSignedMachO({ codeBytes: PAGE_BYTES * 3 })
    const headerBytes = 8 + 2 * 20
    const firstOffset = PAGE_BYTES // fat slices are page aligned
    const secondOffset = firstOffset + Math.ceil(first.bytes.length / PAGE_BYTES) * PAGE_BYTES

    const bytes = new Uint8Array(secondOffset + second.bytes.length)
    const view = new DataView(bytes.buffer)
    view.setUint32(0, 0xcafebabe, false)
    view.setUint32(4, 2, false)
    view.setUint32(8, 0x0100000c, false)
    view.setUint32(8 + 8, firstOffset, false)
    view.setUint32(8 + 12, first.bytes.length, false)
    view.setUint32(8 + 20, 0x01000007, false)
    view.setUint32(8 + 28, secondOffset, false)
    view.setUint32(8 + 32, second.bytes.length, false)
    assertEquals(headerBytes <= firstOffset, true)
    bytes.set(first.bytes, firstOffset)
    bytes.set(second.bytes, secondOffset)

    bytes[firstOffset + 200] ^= 0xff
    bytes[secondOffset + 200] ^= 0xff

    assertEquals(resignMachO(bytes), 2)

    assertEquals(
        slotHashesInFile(bytes, firstOffset, first),
        expectedSlotHashes(bytes, firstOffset, first.codeLimit, first.slotCount),
    )
    assertEquals(
        slotHashesInFile(bytes, secondOffset, second),
        expectedSlotHashes(bytes, secondOffset, second.codeLimit, second.slotCount),
    )
})

Deno.test("macho_sign - a fat header whose slices are not Mach-O is ignored", () => {
    // 0xcafebabe is also the Java class-file magic.
    const bytes = new Uint8Array(512)
    const view = new DataView(bytes.buffer)
    view.setUint32(0, 0xcafebabe, false)
    view.setUint32(4, 1, false)
    view.setUint32(8 + 8, 64, false)
    view.setUint32(8 + 12, 64, false)
    const copy = bytes.slice()

    assertEquals(resignMachO(bytes), 0)
    assertEquals(bytes, copy)
})

Deno.test("macho_sign - a slot count that disagrees with codeLimit is rejected", () => {
    const { bytes, codeLimit, superBlobHeader } = buildSignedMachO()
    const directory = codeLimit + superBlobHeader
    new DataView(bytes.buffer).setUint32(directory + 28, 99, false) // nCodeSlots

    assertThrows(() => resignMachO(bytes), Error, "CodeDirectory covers")
})

// The synthetic cases above prove the arithmetic; this one proves the result is
// what the macOS kernel and Apple's own verifier accept.
/** Any signed Mach-O in the real nix store that still names /nix/store. */
function findSignedStoreBinary() {
    let looked = 0
    for (const entry of Deno.readDirSync("/nix/store")) {
        if (looked++ > 3000) { return null }
        let names
        try {
            names = [...Deno.readDirSync(`/nix/store/${entry.name}/bin`)]
        } catch {
            continue
        }
        for (const name of names) {
            const path = `/nix/store/${entry.name}/bin/${name.name}`
            let bytes
            try {
                bytes = Deno.readFileSync(path)
            } catch {
                continue
            }
            if (!isMachO(bytes)) { continue }
            if (!new TextDecoder().decode(bytes).includes("/nix/store")) { continue }
            if (resignMachO(bytes) === 0) { continue } // unsigned, nothing to prove
            return path
        }
    }
    return null
}

const realBinary = (() => {
    if (Deno.build.os !== "darwin") { return null }
    try {
        Deno.statSync("/usr/bin/codesign")
        Deno.statSync("/nix/store")
    } catch {
        return null
    }
    return findSignedStoreBinary()
})()
const haveRealBinary = realBinary !== null

Deno.test({
    name: "macho_sign - relocateTree keeps a real signed binary valid to Apple's verifier",
    ignore: !haveRealBinary,
    fn: () => {
        const directory = Deno.makeTempDirSync({ prefix: "denix_sign_" })
        try {
            const relocated = `${directory}/relocated`
            const control = `${directory}/control`
            Deno.copyFileSync(realBinary, relocated)
            Deno.chmodSync(relocated, 0o755)

            relocateTree(relocated)
            const rewritten = Deno.readFileSync(relocated)
            assertEquals(new TextDecoder().decode(rewritten).includes(RELOC_PREFIX), true)

            const verify = (path) => new Deno.Command("/usr/bin/codesign", {
                args: ["--verify", "--verbose", path],
            }).outputSync().code
            assertEquals(verify(relocated), 0, "re-signed binary must verify")

            // Same edit, no re-signing: Apple must reject it, proving the check bites.
            const stale = Deno.readFileSync(realBinary)
            const needle = new TextEncoder().encode("/nix/store")
            const replacement = new TextEncoder().encode(RELOC_PREFIX)
            for (let i = 0; i <= stale.length - needle.length; i++) {
                let matched = true
                for (let j = 0; j < needle.length; j++) {
                    if (stale[i + j] !== needle[j]) { matched = false; break }
                }
                if (matched) { stale.set(replacement, i) }
            }
            Deno.writeFileSync(control, stale)
            Deno.chmodSync(control, 0o755)
            assertNotEquals(verify(control), 0, "un-re-signed binary must fail to verify")
        } finally {
            Deno.removeSync(directory, { recursive: true })
        }
    },
})
