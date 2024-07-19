import sha1Core from "./sha1.js"
import { sha512 } from "./sha_helpers.js"

// 
// sha1
// 
    export function sha1Hex(data) {
        return sha1Core.createHash().update(data).digest('hex')
    }
// 
// sha512
// 
    export function sha512Hex(data) {
        return sha1Core.createHash().update(data).digest('hex')
    }

//
// formatted and modified version of: https://github.com/6502/sha256/blob/main/sha256.js
//
    export function sha256Hex(data) {
        return sha256Bytes(data).hex()
    }

    // sha256(data) returns the digest
    // sha256() returns an object you can call .add(data) zero or more time and .digest() at the end
    // digest is a 32-byte Uint8Array instance with an added .hex() function.
    // Input should be either a string (that will be encoded as UTF-8) or an array-like object with values 0..255.
    export function sha256Bytes(data) {
        let h0 = 0x6a09e667,
            h1 = 0xbb67ae85,
            h2 = 0x3c6ef372,
            h3 = 0xa54ff53a,
            h4 = 0x510e527f,
            h5 = 0x9b05688c,
            h6 = 0x1f83d9ab,
            h7 = 0x5be0cd19,
            tsz = 0,
            bp = 0
        const k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2],
            rrot = (x, n) => (x >>> n) | (x << (32 - n)),
            w = new Uint32Array(64),
            buf = new Uint8Array(64),
            process = () => {
                for (let j = 0, r = 0; j < 16; j++, r += 4) {
                    w[j] = (buf[r] << 24) | (buf[r + 1] << 16) | (buf[r + 2] << 8) | buf[r + 3]
                }
                for (let j = 16; j < 64; j++) {
                    let s0 = rrot(w[j - 15], 7) ^ rrot(w[j - 15], 18) ^ (w[j - 15] >>> 3)
                    let s1 = rrot(w[j - 2], 17) ^ rrot(w[j - 2], 19) ^ (w[j - 2] >>> 10)
                    w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0
                }
                let a = h0,
                    b = h1,
                    c = h2,
                    d = h3,
                    e = h4,
                    f = h5,
                    g = h6,
                    h = h7
                for (let j = 0; j < 64; j++) {
                    let S1 = rrot(e, 6) ^ rrot(e, 11) ^ rrot(e, 25),
                        ch = (e & f) ^ (~e & g),
                        t1 = (h + S1 + ch + k[j] + w[j]) | 0,
                        S0 = rrot(a, 2) ^ rrot(a, 13) ^ rrot(a, 22),
                        maj = (a & b) ^ (a & c) ^ (b & c),
                        t2 = (S0 + maj) | 0
                    h = g
                    g = f
                    f = e
                    e = (d + t1) | 0
                    d = c
                    c = b
                    b = a
                    a = (t1 + t2) | 0
                }
                h0 = (h0 + a) | 0
                h1 = (h1 + b) | 0
                h2 = (h2 + c) | 0
                h3 = (h3 + d) | 0
                h4 = (h4 + e) | 0
                h5 = (h5 + f) | 0
                h6 = (h6 + g) | 0
                h7 = (h7 + h) | 0
                bp = 0
            },
            add = (data) => {
                if (typeof data === "string") {
                    data = typeof TextEncoder === "undefined" ? Buffer.from(data) : new TextEncoder().encode(data)
                }
                for (let i = 0; i < data.length; i++) {
                    buf[bp++] = data[i]
                    if (bp === 64) process()
                }
                tsz += data.length
            },
            digest = () => {
                buf[bp++] = 0x80
                if (bp == 64) process()
                if (bp + 8 > 64) {
                    while (bp < 64) buf[bp++] = 0x00
                    process()
                }
                while (bp < 58) buf[bp++] = 0x00
                // Max number of bytes is 35,184,372,088,831
                let L = tsz * 8
                buf[bp++] = (L / 1099511627776) & 255
                buf[bp++] = (L / 4294967296) & 255
                buf[bp++] = L >>> 24
                buf[bp++] = (L >>> 16) & 255
                buf[bp++] = (L >>> 8) & 255
                buf[bp++] = L & 255
                process()
                let reply = new Uint8Array(32)
                reply[0] = h0 >>> 24
                reply[1] = (h0 >>> 16) & 255
                reply[2] = (h0 >>> 8) & 255
                reply[3] = h0 & 255
                reply[4] = h1 >>> 24
                reply[5] = (h1 >>> 16) & 255
                reply[6] = (h1 >>> 8) & 255
                reply[7] = h1 & 255
                reply[8] = h2 >>> 24
                reply[9] = (h2 >>> 16) & 255
                reply[10] = (h2 >>> 8) & 255
                reply[11] = h2 & 255
                reply[12] = h3 >>> 24
                reply[13] = (h3 >>> 16) & 255
                reply[14] = (h3 >>> 8) & 255
                reply[15] = h3 & 255
                reply[16] = h4 >>> 24
                reply[17] = (h4 >>> 16) & 255
                reply[18] = (h4 >>> 8) & 255
                reply[19] = h4 & 255
                reply[20] = h5 >>> 24
                reply[21] = (h5 >>> 16) & 255
                reply[22] = (h5 >>> 8) & 255
                reply[23] = h5 & 255
                reply[24] = h6 >>> 24
                reply[25] = (h6 >>> 16) & 255
                reply[26] = (h6 >>> 8) & 255
                reply[27] = h6 & 255
                reply[28] = h7 >>> 24
                reply[29] = (h7 >>> 16) & 255
                reply[30] = (h7 >>> 8) & 255
                reply[31] = h7 & 255
                reply.hex = () => {
                    let res = ""
                    reply.forEach((x) => (res += ("0" + x.toString(16)).slice(-2)))
                    return res
                }
                return reply
            }
        if (data === undefined) return { add, digest }
        add(data)
        return digest().hex()
    }

    // HMAC-SHA256 implementation
    export function hmacSha256Bytes(key, message) {
        if (typeof key === "string") {
            key = typeof TextEncoder === "undefined" ? Buffer.from(key) : new TextEncoder().encode(key)
        }
        if (key.length > 64) key = sha256(key)
        let inner = new Uint8Array(64).fill(0x36)
        let outer = new Uint8Array(64).fill(0x5c)
        for (let i = 0; i < key.length; i++) {
            inner[i] ^= key[i]
            outer[i] ^= key[i]
        }
        let pass1 = sha256(),
            pass2 = sha256()
        pass1.add(inner)
        pass1.add(message)
        pass2.add(outer)
        pass2.add(pass1.digest())
        return pass2.digest()
    }

//
// modified version of: https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-hash-from-a-string-in-javascript-node-js
//
    export var md5Hex = (d) => {
        var r = M(V(Y(X(d), 8 * d.length)))
        return r.toLowerCase()
    }
    function M(d) {
        for (var a, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) {
            a = d.charCodeAt(r)
            f += m.charAt((a >>> 4) & 15) + m.charAt(15 & a)
        }
        return f
    }
    function X(d) {
        for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) {
            _[m] = 0
        }
        for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32
        return _
    }
    function V(d) {
        for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255)
        return _
    }
    function Y(d, _) {
        d[_ >> 5] |= 128 << _ % 32
        d[14 + (((_ + 64) >>> 9) << 4)] = _
        for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m,
                t = f,
                g = r,
                e = i
            ;(f = md5Ii((f = md5Ii((f = md5Ii((f = md5Ii((f = md5Hh((f = md5Hh((f = md5Hh((f = md5Hh((f = md5Gg((f = md5Gg((f = md5Gg((f = md5Gg((f = md5Ff((f = md5Ff((f = md5Ff((f = md5Ff(f, (r = md5Ff(r, (i = md5Ff(i, (m = md5Ff(m, f, r, i, d[n + 0], 7, -680876936)), f, r, d[n + 1], 12, -389564586)), m, f, d[n + 2], 17, 606105819)), i, m, d[n + 3], 22, -1044525330)), (r = md5Ff(r, (i = md5Ff(i, (m = md5Ff(m, f, r, i, d[n + 4], 7, -176418897)), f, r, d[n + 5], 12, 1200080426)), m, f, d[n + 6], 17, -1473231341)), i, m, d[n + 7], 22, -45705983)), (r = md5Ff(r, (i = md5Ff(i, (m = md5Ff(m, f, r, i, d[n + 8], 7, 1770035416)), f, r, d[n + 9], 12, -1958414417)), m, f, d[n + 10], 17, -42063)), i, m, d[n + 11], 22, -1990404162)), (r = md5Ff(r, (i = md5Ff(i, (m = md5Ff(m, f, r, i, d[n + 12], 7, 1804603682)), f, r, d[n + 13], 12, -40341101)), m, f, d[n + 14], 17, -1502002290)), i, m, d[n + 15], 22, 1236535329)), (r = md5Gg(r, (i = md5Gg(i, (m = md5Gg(m, f, r, i, d[n + 1], 5, -165796510)), f, r, d[n + 6], 9, -1069501632)), m, f, d[n + 11], 14, 643717713)), i, m, d[n + 0], 20, -373897302)), (r = md5Gg(r, (i = md5Gg(i, (m = md5Gg(m, f, r, i, d[n + 5], 5, -701558691)), f, r, d[n + 10], 9, 38016083)), m, f, d[n + 15], 14, -660478335)), i, m, d[n + 4], 20, -405537848)), (r = md5Gg(r, (i = md5Gg(i, (m = md5Gg(m, f, r, i, d[n + 9], 5, 568446438)), f, r, d[n + 14], 9, -1019803690)), m, f, d[n + 3], 14, -187363961)), i, m, d[n + 8], 20, 1163531501)), (r = md5Gg(r, (i = md5Gg(i, (m = md5Gg(m, f, r, i, d[n + 13], 5, -1444681467)), f, r, d[n + 2], 9, -51403784)), m, f, d[n + 7], 14, 1735328473)), i, m, d[n + 12], 20, -1926607734)), (r = md5Hh(r, (i = md5Hh(i, (m = md5Hh(m, f, r, i, d[n + 5], 4, -378558)), f, r, d[n + 8], 11, -2022574463)), m, f, d[n + 11], 16, 1839030562)), i, m, d[n + 14], 23, -35309556)), (r = md5Hh(r, (i = md5Hh(i, (m = md5Hh(m, f, r, i, d[n + 1], 4, -1530992060)), f, r, d[n + 4], 11, 1272893353)), m, f, d[n + 7], 16, -155497632)), i, m, d[n + 10], 23, -1094730640)), (r = md5Hh(r, (i = md5Hh(i, (m = md5Hh(m, f, r, i, d[n + 13], 4, 681279174)), f, r, d[n + 0], 11, -358537222)), m, f, d[n + 3], 16, -722521979)), i, m, d[n + 6], 23, 76029189)), (r = md5Hh(r, (i = md5Hh(i, (m = md5Hh(m, f, r, i, d[n + 9], 4, -640364487)), f, r, d[n + 12], 11, -421815835)), m, f, d[n + 15], 16, 530742520)), i, m, d[n + 2], 23, -995338651)), (r = md5Ii(r, (i = md5Ii(i, (m = md5Ii(m, f, r, i, d[n + 0], 6, -198630844)), f, r, d[n + 7], 10, 1126891415)), m, f, d[n + 14], 15, -1416354905)), i, m, d[n + 5], 21, -57434055)), (r = md5Ii(r, (i = md5Ii(i, (m = md5Ii(m, f, r, i, d[n + 12], 6, 1700485571)), f, r, d[n + 3], 10, -1894986606)), m, f, d[n + 10], 15, -1051523)), i, m, d[n + 1], 21, -2054922799)), (r = md5Ii(r, (i = md5Ii(i, (m = md5Ii(m, f, r, i, d[n + 8], 6, 1873313359)), f, r, d[n + 15], 10, -30611744)), m, f, d[n + 6], 15, -1560198380)), i, m, d[n + 13], 21, 1309151649)), (r = md5Ii(r, (i = md5Ii(i, (m = md5Ii(m, f, r, i, d[n + 4], 6, -145523070)), f, r, d[n + 11], 10, -1120210379)), m, f, d[n + 2], 15, 718787259)), i, m, d[n + 9], 21, -343485551)), (m = safeAdd(m, h)), (f = safeAdd(f, t)), (r = safeAdd(r, g)), (i = safeAdd(i, e))
        }
        return Array(m, f, r, i)
    }
    function md5Cmn(d, _, m, f, r, i) {
        return safeAdd(bitRol(safeAdd(safeAdd(_, d), safeAdd(f, i)), r), m)
    }
    function md5Ff(d, _, m, f, r, i, n) {
        return md5Cmn((_ & m) | (~_ & f), d, _, r, i, n)
    }
    function md5Gg(d, _, m, f, r, i, n) {
        return md5Cmn((_ & f) | (m & ~f), d, _, r, i, n)
    }
    function md5Hh(d, _, m, f, r, i, n) {
        return md5Cmn(_ ^ m ^ f, d, _, r, i, n)
    }
    function md5Ii(d, _, m, f, r, i, n) {
        return md5Cmn(m ^ (_ | ~f), d, _, r, i, n)
    }
    function safeAdd(d, _) {
        var m = (65535 & d) + (65535 & _)
        return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m)
    }
    function bitRol(d, _) {
        return (d << _) | (d >>> (32 - _))
    }
