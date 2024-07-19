var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://esm.sh/v135/crypt@0.0.2/denonext/crypt.mjs
var crypt_exports = {};
__export(crypt_exports, {
  base64ToBytes: () => N,
  bytesToBase64: () => I,
  bytesToHex: () => W,
  bytesToWords: () => O,
  default: () => k,
  endian: () => M,
  hexToBytes: () => w,
  randomBytes: () => H,
  rotl: () => y,
  rotr: () => A,
  wordsToBytes: () => S
});
var T = Object.create;
var c = Object.defineProperty;
var g = Object.getOwnPropertyDescriptor;
var v = Object.getOwnPropertyNames;
var B = Object.getPrototypeOf;
var i = Object.prototype.hasOwnProperty;
var m = (e2, n) => () => (n || e2((n = { exports: {} }).exports, n), n.exports);
var _ = (e2, n) => {
  for (var r2 in n)
    c(e2, r2, { get: n[r2], enumerable: true });
};
var h = (e2, n, r2, t) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o3 of v(n))
      !i.call(e2, o3) && o3 !== r2 && c(e2, o3, { get: () => n[o3], enumerable: !(t = g(n, o3)) || t.enumerable });
  return e2;
};
var a = (e2, n, r2) => (h(e2, n, "default"), r2 && h(r2, n, "default"));
var p = (e2, n, r2) => (r2 = e2 != null ? T(B(e2)) : {}, h(n || !e2 || !e2.__esModule ? c(r2, "default", { value: e2, enumerable: true }) : r2, e2));
var l = m((z, d2) => {
  (function() {
    var e2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = { rotl: function(r2, t) {
      return r2 << t | r2 >>> 32 - t;
    }, rotr: function(r2, t) {
      return r2 << 32 - t | r2 >>> t;
    }, endian: function(r2) {
      if (r2.constructor == Number)
        return n.rotl(r2, 8) & 16711935 | n.rotl(r2, 24) & 4278255360;
      for (var t = 0; t < r2.length; t++)
        r2[t] = n.endian(r2[t]);
      return r2;
    }, randomBytes: function(r2) {
      for (var t = []; r2 > 0; r2--)
        t.push(Math.floor(Math.random() * 256));
      return t;
    }, bytesToWords: function(r2) {
      for (var t = [], o3 = 0, u2 = 0; o3 < r2.length; o3++, u2 += 8)
        t[u2 >>> 5] |= r2[o3] << 24 - u2 % 32;
      return t;
    }, wordsToBytes: function(r2) {
      for (var t = [], o3 = 0; o3 < r2.length * 32; o3 += 8)
        t.push(r2[o3 >>> 5] >>> 24 - o3 % 32 & 255);
      return t;
    }, bytesToHex: function(r2) {
      for (var t = [], o3 = 0; o3 < r2.length; o3++)
        t.push((r2[o3] >>> 4).toString(16)), t.push((r2[o3] & 15).toString(16));
      return t.join("");
    }, hexToBytes: function(r2) {
      for (var t = [], o3 = 0; o3 < r2.length; o3 += 2)
        t.push(parseInt(r2.substr(o3, 2), 16));
      return t;
    }, bytesToBase64: function(r2) {
      for (var t = [], o3 = 0; o3 < r2.length; o3 += 3)
        for (var u2 = r2[o3] << 16 | r2[o3 + 1] << 8 | r2[o3 + 2], s = 0; s < 4; s++)
          o3 * 8 + s * 6 <= r2.length * 8 ? t.push(e2.charAt(u2 >>> 6 * (3 - s) & 63)) : t.push("=");
      return t.join("");
    }, base64ToBytes: function(r2) {
      r2 = r2.replace(/[^A-Z0-9+\/]/ig, "");
      for (var t = [], o3 = 0, u2 = 0; o3 < r2.length; u2 = ++o3 % 4)
        u2 != 0 && t.push((e2.indexOf(r2.charAt(o3 - 1)) & Math.pow(2, -2 * u2 + 8) - 1) << u2 * 2 | e2.indexOf(r2.charAt(o3)) >>> 6 - u2 * 2);
      return t;
    } };
    d2.exports = n;
  })();
});
var f = {};
_(f, { base64ToBytes: () => N, bytesToBase64: () => I, bytesToHex: () => W, bytesToWords: () => O, default: () => k, endian: () => M, hexToBytes: () => w, randomBytes: () => H, rotl: () => y, rotr: () => A, wordsToBytes: () => S });
var F = p(l());
a(f, p(l()));
var { rotl: y, rotr: A, endian: M, randomBytes: H, bytesToWords: O, wordsToBytes: S, bytesToHex: W, hexToBytes: w, bytesToBase64: I, base64ToBytes: N } = F;
var { default: x, ...Z } = F;
var k = x !== void 0 ? x : Z;

// https://esm.sh/v135/charenc@0.0.2/denonext/charenc.mjs
var charenc_exports = {};
__export(charenc_exports, {
  bin: () => S2,
  default: () => B2,
  utf8: () => y2
});
var m2 = Object.create;
var i2 = Object.defineProperty;
var l2 = Object.getOwnPropertyDescriptor;
var T2 = Object.getOwnPropertyNames;
var _2 = Object.getPrototypeOf;
var b = Object.prototype.hasOwnProperty;
var x2 = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var C = (n, t) => {
  for (var e2 in t)
    i2(n, e2, { get: t[e2], enumerable: true });
};
var f2 = (n, t, e2, a3) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let u2 of T2(t))
      !b.call(n, u2) && u2 !== e2 && i2(n, u2, { get: () => t[u2], enumerable: !(a3 = l2(t, u2)) || a3.enumerable });
  return n;
};
var r = (n, t, e2) => (f2(n, t, "default"), e2 && f2(e2, t, "default"));
var d = (n, t, e2) => (e2 = n != null ? m2(_2(n)) : {}, f2(t || !n || !n.__esModule ? i2(e2, "default", { value: n, enumerable: true }) : e2, n));
var c2 = x2((I3, p2) => {
  var s = { utf8: { stringToBytes: function(n) {
    return s.bin.stringToBytes(unescape(encodeURIComponent(n)));
  }, bytesToString: function(n) {
    return decodeURIComponent(escape(s.bin.bytesToString(n)));
  } }, bin: { stringToBytes: function(n) {
    for (var t = [], e2 = 0; e2 < n.length; e2++)
      t.push(n.charCodeAt(e2) & 255);
    return t;
  }, bytesToString: function(n) {
    for (var t = [], e2 = 0; e2 < n.length; e2++)
      t.push(String.fromCharCode(n[e2]));
    return t.join("");
  } } };
  p2.exports = s;
});
var o = {};
C(o, { bin: () => S2, default: () => B2, utf8: () => y2 });
var h2 = d(c2());
r(o, d(c2()));
var { utf8: y2, bin: S2 } = h2;
var { default: g2, ...v2 } = h2;
var B2 = g2 !== void 0 ? g2 : v2;

// https://esm.sh/v135/is-buffer@1.1.6/denonext/is-buffer.mjs
var is_buffer_exports = {};
__export(is_buffer_exports, {
  default: () => g3
});
var a2 = Object.create;
var c3 = Object.defineProperty;
var B3 = Object.getOwnPropertyDescriptor;
var m3 = Object.getOwnPropertyNames;
var x3 = Object.getPrototypeOf;
var y3 = Object.prototype.hasOwnProperty;
var w2 = (t, f3) => () => (f3 || t((f3 = { exports: {} }).exports, f3), f3.exports);
var E = (t, f3) => {
  for (var r2 in f3)
    c3(t, r2, { get: f3[r2], enumerable: true });
};
var o2 = (t, f3, r2, s) => {
  if (f3 && typeof f3 == "object" || typeof f3 == "function")
    for (let n of m3(f3))
      !y3.call(t, n) && n !== r2 && c3(t, n, { get: () => f3[n], enumerable: !(s = B3(f3, n)) || s.enumerable });
  return t;
};
var u = (t, f3, r2) => (o2(t, f3, "default"), r2 && o2(r2, f3, "default"));
var l3 = (t, f3, r2) => (r2 = t != null ? a2(x3(t)) : {}, o2(f3 || !t || !t.__esModule ? c3(r2, "default", { value: t, enumerable: true }) : r2, t));
var i3 = w2((k3, p2) => {
  p2.exports = function(t) {
    return t != null && (d2(t) || F2(t) || !!t._isBuffer);
  };
  function d2(t) {
    return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
  }
  function F2(t) {
    return typeof t.readFloatLE == "function" && typeof t.slice == "function" && d2(t.slice(0, 0));
  }
});
var e = {};
E(e, { default: () => g3 });
var L = l3(i3());
u(e, l3(i3()));
var { default: _3, ...S3 } = L;
var g3 = _3 !== void 0 ? _3 : S3;

// https://esm.sh/v135/md5@2.3.0/denonext/md5.mjs
var require2 = (n) => {
  const e2 = (m4) => typeof m4.default < "u" ? m4.default : m4, c4 = (m4) => Object.assign({}, m4);
  switch (n) {
    case "crypt":
      return e2(crypt_exports);
    case "charenc":
      return e2(charenc_exports);
    case "is-buffer":
      return e2(is_buffer_exports);
    default:
      throw new Error('module "' + n + '" not found');
  }
};
var k2 = Object.create;
var A2 = Object.defineProperty;
var E2 = Object.getOwnPropertyDescriptor;
var U = Object.getOwnPropertyNames;
var W2 = Object.getPrototypeOf;
var j = Object.prototype.hasOwnProperty;
var b2 = ((e2) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(e2, { get: (l4, F2) => (typeof require2 < "u" ? require2 : l4)[F2] }) : e2)(function(e2) {
  if (typeof require2 < "u")
    return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + e2 + '" is not supported');
});
var C2 = (e2, l4) => () => (l4 || e2((l4 = { exports: {} }).exports, l4), l4.exports);
var D = (e2, l4) => {
  for (var F2 in l4)
    A2(e2, F2, { get: l4[F2], enumerable: true });
};
var q = (e2, l4, F2, B4) => {
  if (l4 && typeof l4 == "object" || typeof l4 == "function")
    for (let _4 of U(l4))
      !j.call(e2, _4) && _4 !== F2 && A2(e2, _4, { get: () => l4[_4], enumerable: !(B4 = E2(l4, _4)) || B4.enumerable });
  return e2;
};
var T3 = (e2, l4, F2) => (q(e2, l4, "default"), F2 && q(F2, l4, "default"));
var w3 = (e2, l4, F2) => (F2 = e2 != null ? k2(W2(e2)) : {}, q(l4 || !e2 || !e2.__esModule ? A2(F2, "default", { value: e2, enumerable: true }) : F2, e2));
var S4 = C2((N2, H2) => {
  (function() {
    var e2 = b2("crypt"), l4 = b2("charenc").utf8, F2 = b2("is-buffer"), B4 = b2("charenc").bin, _4 = function(o3, c4) {
      o3.constructor == String ? c4 && c4.encoding === "binary" ? o3 = B4.stringToBytes(o3) : o3 = l4.stringToBytes(o3) : F2(o3) ? o3 = Array.prototype.slice.call(o3, 0) : !Array.isArray(o3) && o3.constructor !== Uint8Array && (o3 = o3.toString());
      for (var u2 = e2.bytesToWords(o3), h3 = o3.length * 8, n = 1732584193, r2 = -271733879, i4 = -1732584194, t = 271733878, f3 = 0; f3 < u2.length; f3++)
        u2[f3] = (u2[f3] << 8 | u2[f3] >>> 24) & 16711935 | (u2[f3] << 24 | u2[f3] >>> 8) & 4278255360;
      u2[h3 >>> 5] |= 128 << h3 % 32, u2[(h3 + 64 >>> 9 << 4) + 14] = h3;
      for (var d2 = _4._ff, y4 = _4._gg, a3 = _4._hh, v3 = _4._ii, f3 = 0; f3 < u2.length; f3 += 16) {
        var g4 = n, p2 = r2, z = i4, G = t;
        n = d2(n, r2, i4, t, u2[f3 + 0], 7, -680876936), t = d2(t, n, r2, i4, u2[f3 + 1], 12, -389564586), i4 = d2(i4, t, n, r2, u2[f3 + 2], 17, 606105819), r2 = d2(r2, i4, t, n, u2[f3 + 3], 22, -1044525330), n = d2(n, r2, i4, t, u2[f3 + 4], 7, -176418897), t = d2(t, n, r2, i4, u2[f3 + 5], 12, 1200080426), i4 = d2(i4, t, n, r2, u2[f3 + 6], 17, -1473231341), r2 = d2(r2, i4, t, n, u2[f3 + 7], 22, -45705983), n = d2(n, r2, i4, t, u2[f3 + 8], 7, 1770035416), t = d2(t, n, r2, i4, u2[f3 + 9], 12, -1958414417), i4 = d2(i4, t, n, r2, u2[f3 + 10], 17, -42063), r2 = d2(r2, i4, t, n, u2[f3 + 11], 22, -1990404162), n = d2(n, r2, i4, t, u2[f3 + 12], 7, 1804603682), t = d2(t, n, r2, i4, u2[f3 + 13], 12, -40341101), i4 = d2(i4, t, n, r2, u2[f3 + 14], 17, -1502002290), r2 = d2(r2, i4, t, n, u2[f3 + 15], 22, 1236535329), n = y4(n, r2, i4, t, u2[f3 + 1], 5, -165796510), t = y4(t, n, r2, i4, u2[f3 + 6], 9, -1069501632), i4 = y4(i4, t, n, r2, u2[f3 + 11], 14, 643717713), r2 = y4(r2, i4, t, n, u2[f3 + 0], 20, -373897302), n = y4(n, r2, i4, t, u2[f3 + 5], 5, -701558691), t = y4(t, n, r2, i4, u2[f3 + 10], 9, 38016083), i4 = y4(i4, t, n, r2, u2[f3 + 15], 14, -660478335), r2 = y4(r2, i4, t, n, u2[f3 + 4], 20, -405537848), n = y4(n, r2, i4, t, u2[f3 + 9], 5, 568446438), t = y4(t, n, r2, i4, u2[f3 + 14], 9, -1019803690), i4 = y4(i4, t, n, r2, u2[f3 + 3], 14, -187363961), r2 = y4(r2, i4, t, n, u2[f3 + 8], 20, 1163531501), n = y4(n, r2, i4, t, u2[f3 + 13], 5, -1444681467), t = y4(t, n, r2, i4, u2[f3 + 2], 9, -51403784), i4 = y4(i4, t, n, r2, u2[f3 + 7], 14, 1735328473), r2 = y4(r2, i4, t, n, u2[f3 + 12], 20, -1926607734), n = a3(n, r2, i4, t, u2[f3 + 5], 4, -378558), t = a3(t, n, r2, i4, u2[f3 + 8], 11, -2022574463), i4 = a3(i4, t, n, r2, u2[f3 + 11], 16, 1839030562), r2 = a3(r2, i4, t, n, u2[f3 + 14], 23, -35309556), n = a3(n, r2, i4, t, u2[f3 + 1], 4, -1530992060), t = a3(t, n, r2, i4, u2[f3 + 4], 11, 1272893353), i4 = a3(i4, t, n, r2, u2[f3 + 7], 16, -155497632), r2 = a3(r2, i4, t, n, u2[f3 + 10], 23, -1094730640), n = a3(n, r2, i4, t, u2[f3 + 13], 4, 681279174), t = a3(t, n, r2, i4, u2[f3 + 0], 11, -358537222), i4 = a3(i4, t, n, r2, u2[f3 + 3], 16, -722521979), r2 = a3(r2, i4, t, n, u2[f3 + 6], 23, 76029189), n = a3(n, r2, i4, t, u2[f3 + 9], 4, -640364487), t = a3(t, n, r2, i4, u2[f3 + 12], 11, -421815835), i4 = a3(i4, t, n, r2, u2[f3 + 15], 16, 530742520), r2 = a3(r2, i4, t, n, u2[f3 + 2], 23, -995338651), n = v3(n, r2, i4, t, u2[f3 + 0], 6, -198630844), t = v3(t, n, r2, i4, u2[f3 + 7], 10, 1126891415), i4 = v3(i4, t, n, r2, u2[f3 + 14], 15, -1416354905), r2 = v3(r2, i4, t, n, u2[f3 + 5], 21, -57434055), n = v3(n, r2, i4, t, u2[f3 + 12], 6, 1700485571), t = v3(t, n, r2, i4, u2[f3 + 3], 10, -1894986606), i4 = v3(i4, t, n, r2, u2[f3 + 10], 15, -1051523), r2 = v3(r2, i4, t, n, u2[f3 + 1], 21, -2054922799), n = v3(n, r2, i4, t, u2[f3 + 8], 6, 1873313359), t = v3(t, n, r2, i4, u2[f3 + 15], 10, -30611744), i4 = v3(i4, t, n, r2, u2[f3 + 6], 15, -1560198380), r2 = v3(r2, i4, t, n, u2[f3 + 13], 21, 1309151649), n = v3(n, r2, i4, t, u2[f3 + 4], 6, -145523070), t = v3(t, n, r2, i4, u2[f3 + 11], 10, -1120210379), i4 = v3(i4, t, n, r2, u2[f3 + 2], 15, 718787259), r2 = v3(r2, i4, t, n, u2[f3 + 9], 21, -343485551), n = n + g4 >>> 0, r2 = r2 + p2 >>> 0, i4 = i4 + z >>> 0, t = t + G >>> 0;
      }
      return e2.endian([n, r2, i4, t]);
    };
    _4._ff = function(o3, c4, u2, h3, n, r2, i4) {
      var t = o3 + (c4 & u2 | ~c4 & h3) + (n >>> 0) + i4;
      return (t << r2 | t >>> 32 - r2) + c4;
    }, _4._gg = function(o3, c4, u2, h3, n, r2, i4) {
      var t = o3 + (c4 & h3 | u2 & ~h3) + (n >>> 0) + i4;
      return (t << r2 | t >>> 32 - r2) + c4;
    }, _4._hh = function(o3, c4, u2, h3, n, r2, i4) {
      var t = o3 + (c4 ^ u2 ^ h3) + (n >>> 0) + i4;
      return (t << r2 | t >>> 32 - r2) + c4;
    }, _4._ii = function(o3, c4, u2, h3, n, r2, i4) {
      var t = o3 + (u2 ^ (c4 | ~h3)) + (n >>> 0) + i4;
      return (t << r2 | t >>> 32 - r2) + c4;
    }, _4._blocksize = 16, _4._digestsize = 16, H2.exports = function(o3, c4) {
      if (o3 == null)
        throw new Error("Illegal argument " + o3);
      var u2 = e2.wordsToBytes(_4(o3, c4));
      return c4 && c4.asBytes ? u2 : c4 && c4.asString ? B4.bytesToString(u2) : e2.bytesToHex(u2);
    };
  })();
});
var x4 = {};
D(x4, { default: () => L2 });
var J = w3(S4());
T3(x4, w3(S4()));
var { default: I2, ...K } = J;
var L2 = I2 !== void 0 ? I2 : K;
export {
  L2 as default
};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
