// https://esm.sh/v135/rusha@0.8.14/denonext/rusha.mjs
var j = Object.create;
var O = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var D = Object.getOwnPropertyNames;
var W = Object.getPrototypeOf;
var I = Object.prototype.hasOwnProperty;
var F = (w, _) => () => (_ || w((_ = { exports: {} }).exports, _), _.exports);
var z = (w, _) => {
  for (var v in _)
    O(w, v, { get: _[v], enumerable: true });
};
var R = (w, _, v, y) => {
  if (_ && typeof _ == "object" || typeof _ == "function")
    for (let p of D(_))
      !I.call(w, p) && p !== v && O(w, p, { get: () => _[p], enumerable: !(y = B(_, p)) || y.enumerable });
  return w;
};
var L = (w, _, v) => (R(w, _, "default"), v && R(v, _, "default"));
var E = (w, _, v) => (v = w != null ? j(W(w)) : {}, R(_ || !w || !w.__esModule ? O(v, "default", { value: w, enumerable: true }) : v, w));
var m = F((k, M) => {
  (function(_, v) {
    typeof k == "object" && typeof M == "object" ? M.exports = v() : typeof define == "function" && define.amd ? define([], v) : typeof k == "object" ? k.Rusha = v() : _.Rusha = v();
  })(typeof self < "u" ? self : k, function() {
    return function(w) {
      var _ = {};
      function v(y) {
        if (_[y])
          return _[y].exports;
        var p = _[y] = { i: y, l: false, exports: {} };
        return w[y].call(p.exports, p, p.exports, v), p.l = true, p.exports;
      }
      return v.m = w, v.c = _, v.d = function(y, p, g) {
        v.o(y, p) || Object.defineProperty(y, p, { configurable: false, enumerable: true, get: g });
      }, v.n = function(y) {
        var p = y && y.__esModule ? function() {
          return y.default;
        } : function() {
          return y;
        };
        return v.d(p, "a", p), p;
      }, v.o = function(y, p) {
        return Object.prototype.hasOwnProperty.call(y, p);
      }, v.p = "", v(v.s = 3);
    }([function(w, _, v) {
      function y(e, o) {
        if (!(e instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }
      var p = v(5), g = v(1), u = g.toHex, f = g.ceilHeapSize, h = v(6), l = function(e) {
        for (e += 9; e % 64 > 0; e += 1)
          ;
        return e;
      }, i = function(e, o) {
        var n = new Uint8Array(e.buffer), c = o % 4, a = o - c;
        switch (c) {
          case 0:
            n[a + 3] = 0;
          case 1:
            n[a + 2] = 0;
          case 2:
            n[a + 1] = 0;
          case 3:
            n[a + 0] = 0;
        }
        for (var d = (o >> 2) + 1; d < e.length; d++)
          e[d] = 0;
      }, t = function(e, o, n) {
        e[o >> 2] |= 128 << 24 - (o % 4 << 3), e[((o >> 2) + 2 & -16) + 14] = n / (1 << 29) | 0, e[((o >> 2) + 2 & -16) + 15] = n << 3;
      }, r = function(e, o) {
        var n = new Int32Array(e, o + 320, 5), c = new Int32Array(5), a = new DataView(c.buffer);
        return a.setInt32(0, n[0], false), a.setInt32(4, n[1], false), a.setInt32(8, n[2], false), a.setInt32(12, n[3], false), a.setInt32(16, n[4], false), c;
      }, s = function() {
        function e(o) {
          if (y(this, e), o = o || 64 * 1024, o % 64 > 0)
            throw new Error("Chunk size must be a multiple of 128 bit");
          this._offset = 0, this._maxChunkLen = o, this._padMaxChunkLen = l(o), this._heap = new ArrayBuffer(f(this._padMaxChunkLen + 320 + 20)), this._h32 = new Int32Array(this._heap), this._h8 = new Int8Array(this._heap), this._core = new p({ Int32Array }, {}, this._heap);
        }
        return e.prototype._initState = function(n, c) {
          this._offset = 0;
          var a = new Int32Array(n, c + 320, 5);
          a[0] = 1732584193, a[1] = -271733879, a[2] = -1732584194, a[3] = 271733878, a[4] = -1009589776;
        }, e.prototype._padChunk = function(n, c) {
          var a = l(n), d = new Int32Array(this._heap, 0, a >> 2);
          return i(d, n), t(d, n, c), a;
        }, e.prototype._write = function(n, c, a, d) {
          h(n, this._h8, this._h32, c, a, d || 0);
        }, e.prototype._coreCall = function(n, c, a, d, x) {
          var b = a;
          this._write(n, c, a), x && (b = this._padChunk(a, d)), this._core.hash(b, this._padMaxChunkLen);
        }, e.prototype.rawDigest = function(n) {
          var c = n.byteLength || n.length || n.size || 0;
          this._initState(this._heap, this._padMaxChunkLen);
          var a = 0, d = this._maxChunkLen;
          for (a = 0; c > a + d; a += d)
            this._coreCall(n, a, d, c, false);
          return this._coreCall(n, a, c - a, c, true), r(this._heap, this._padMaxChunkLen);
        }, e.prototype.digest = function(n) {
          return u(this.rawDigest(n).buffer);
        }, e.prototype.digestFromString = function(n) {
          return this.digest(n);
        }, e.prototype.digestFromBuffer = function(n) {
          return this.digest(n);
        }, e.prototype.digestFromArrayBuffer = function(n) {
          return this.digest(n);
        }, e.prototype.resetState = function() {
          return this._initState(this._heap, this._padMaxChunkLen), this;
        }, e.prototype.append = function(n) {
          var c = 0, a = n.byteLength || n.length || n.size || 0, d = this._offset % this._maxChunkLen, x = void 0;
          for (this._offset += a; c < a; )
            x = Math.min(a - c, this._maxChunkLen - d), this._write(n, c, x, d), d += x, c += x, d === this._maxChunkLen && (this._core.hash(this._maxChunkLen, this._padMaxChunkLen), d = 0);
          return this;
        }, e.prototype.getState = function() {
          var n = this._offset % this._maxChunkLen, c = void 0;
          if (n)
            c = this._heap.slice(0);
          else {
            var a = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
            c = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength);
          }
          return { offset: this._offset, heap: c };
        }, e.prototype.setState = function(n) {
          if (this._offset = n.offset, n.heap.byteLength === 20) {
            var c = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
            c.set(new Int32Array(n.heap));
          } else
            this._h32.set(new Int32Array(n.heap));
          return this;
        }, e.prototype.rawEnd = function() {
          var n = this._offset, c = n % this._maxChunkLen, a = this._padChunk(c, n);
          this._core.hash(a, this._padMaxChunkLen);
          var d = r(this._heap, this._padMaxChunkLen);
          return this._initState(this._heap, this._padMaxChunkLen), d;
        }, e.prototype.end = function() {
          return u(this.rawEnd().buffer);
        }, e;
      }();
      w.exports = s, w.exports._core = p;
    }, function(w, _) {
      for (var v = new Array(256), y = 0; y < 256; y++)
        v[y] = (y < 16 ? "0" : "") + y.toString(16);
      w.exports.toHex = function(p) {
        for (var g = new Uint8Array(p), u = new Array(p.byteLength), f = 0; f < u.length; f++)
          u[f] = v[g[f]];
        return u.join("");
      }, w.exports.ceilHeapSize = function(p) {
        var g = 0;
        if (p <= 65536)
          return 65536;
        if (p < 16777216)
          for (g = 1; g < p; g = g << 1)
            ;
        else
          for (g = 16777216; g < p; g += 16777216)
            ;
        return g;
      }, w.exports.isDedicatedWorkerScope = function(p) {
        var g = "WorkerGlobalScope" in p && p instanceof p.WorkerGlobalScope, u = "SharedWorkerGlobalScope" in p && p instanceof p.SharedWorkerGlobalScope, f = "ServiceWorkerGlobalScope" in p && p instanceof p.ServiceWorkerGlobalScope;
        return g && !u && !f;
      };
    }, function(w, _, v) {
      w.exports = function() {
        var y = v(0), p = function(f, h, l) {
          try {
            return l(null, f.digest(h));
          } catch (i) {
            return l(i);
          }
        }, g = function(f, h, l, i, t) {
          var r = new self.FileReader();
          r.onloadend = function() {
            if (r.error)
              return t(r.error);
            var e = r.result;
            h += r.result.byteLength;
            try {
              f.append(e);
            } catch (o) {
              t(o);
              return;
            }
            h < i.size ? g(f, h, l, i, t) : t(null, f.end());
          }, r.readAsArrayBuffer(i.slice(h, h + l));
        }, u = true;
        return self.onmessage = function(f) {
          if (u) {
            var h = f.data.data, l = f.data.file, i = f.data.id;
            if (!(typeof i > "u") && !(!l && !h)) {
              var t = f.data.blockSize || 4 * 1024 * 1024, r = new y(t);
              r.resetState();
              var s = function(e, o) {
                e ? self.postMessage({ id: i, error: e.name }) : self.postMessage({ id: i, hash: o });
              };
              h && p(r, h, s), l && g(r, 0, t, l, s);
            }
          }
        }, function() {
          u = false;
        };
      };
    }, function(w, _, v) {
      var y = v(4), p = v(0), g = v(7), u = v(2), f = v(1), h = f.isDedicatedWorkerScope, l = typeof self < "u" && h(self);
      p.disableWorkerBehaviour = l ? u() : function() {
      }, p.createWorker = function() {
        var i = y(2), t = i.terminate;
        return i.terminate = function() {
          URL.revokeObjectURL(i.objectURL), t.call(i);
        }, i;
      }, p.createHash = g, w.exports = p;
    }, function(w, _, v) {
      function y(i) {
        var t = {};
        function r(e) {
          if (t[e])
            return t[e].exports;
          var o = t[e] = { i: e, l: false, exports: {} };
          return i[e].call(o.exports, o, o.exports, r), o.l = true, o.exports;
        }
        r.m = i, r.c = t, r.i = function(e) {
          return e;
        }, r.d = function(e, o, n) {
          r.o(e, o) || Object.defineProperty(e, o, { configurable: false, enumerable: true, get: n });
        }, r.r = function(e) {
          Object.defineProperty(e, "__esModule", { value: true });
        }, r.n = function(e) {
          var o = e && e.__esModule ? function() {
            return e.default;
          } : function() {
            return e;
          };
          return r.d(o, "a", o), o;
        }, r.o = function(e, o) {
          return Object.prototype.hasOwnProperty.call(e, o);
        }, r.p = "/", r.oe = function(e) {
          throw console.error(e), e;
        };
        var s = r(r.s = ENTRY_MODULE);
        return s.default || s;
      }
      var p = "[\\.|\\-|\\+|\\w|/|@]+", g = "\\((/\\*.*?\\*/)?s?.*?(" + p + ").*?\\)";
      function u(i) {
        return (i + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
      }
      function f(i, t, r) {
        var s = {};
        s[r] = [];
        var e = t.toString(), o = e.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
        if (!o)
          return s;
        for (var n = o[1], c = new RegExp("(\\\\n|\\W)" + u(n) + g, "g"), a; a = c.exec(e); )
          a[3] !== "dll-reference" && s[r].push(a[3]);
        for (c = new RegExp("\\(" + u(n) + '\\("(dll-reference\\s(' + p + '))"\\)\\)' + g, "g"); a = c.exec(e); )
          i[a[2]] || (s[r].push(a[1]), i[a[2]] = v(a[1]).m), s[a[2]] = s[a[2]] || [], s[a[2]].push(a[4]);
        return s;
      }
      function h(i) {
        var t = Object.keys(i);
        return t.reduce(function(r, s) {
          return r || i[s].length > 0;
        }, false);
      }
      function l(i, t) {
        for (var r = { main: [t] }, s = { main: [] }, e = { main: {} }; h(r); )
          for (var o = Object.keys(r), n = 0; n < o.length; n++) {
            var c = o[n], a = r[c], d = a.pop();
            if (e[c] = e[c] || {}, !(e[c][d] || !i[c][d])) {
              e[c][d] = true, s[c] = s[c] || [], s[c].push(d);
              for (var x = f(i, i[c][d], c), b = Object.keys(x), S = 0; S < b.length; S++)
                r[b[S]] = r[b[S]] || [], r[b[S]] = r[b[S]].concat(x[b[S]]);
            }
          }
        return s;
      }
      w.exports = function(i, t) {
        t = t || {};
        var r = { main: v.m }, s = t.all ? { main: Object.keys(r) } : l(r, i), e = "";
        Object.keys(s).filter(function(d) {
          return d !== "main";
        }).forEach(function(d) {
          for (var x = 0; s[d][x]; )
            x++;
          s[d].push(x), r[d][x] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", e = e + "var " + d + " = (" + y.toString().replace("ENTRY_MODULE", JSON.stringify(x)) + ")({" + s[d].map(function(b) {
            return "" + JSON.stringify(b) + ": " + r[d][b].toString();
          }).join(",") + `});
`;
        }), e = e + "(" + y.toString().replace("ENTRY_MODULE", JSON.stringify(i)) + ")({" + s.main.map(function(d) {
          return "" + JSON.stringify(d) + ": " + r.main[d].toString();
        }).join(",") + "})(self);";
        var o = new window.Blob([e], { type: "text/javascript" });
        if (t.bare)
          return o;
        var n = window.URL || window.webkitURL || window.mozURL || window.msURL, c = n.createObjectURL(o), a = new window.Worker(c);
        return a.objectURL = c, a;
      };
    }, function(w, _) {
      w.exports = function(y, p, g) {
        var u = new y.Int32Array(g);
        function f(h, l) {
          h = h | 0, l = l | 0;
          var i = 0, t = 0, r = 0, s = 0, e = 0, o = 0, n = 0, c = 0, a = 0, d = 0, x = 0, b = 0, S = 0, C = 0;
          for (r = u[l + 320 >> 2] | 0, e = u[l + 324 >> 2] | 0, n = u[l + 328 >> 2] | 0, a = u[l + 332 >> 2] | 0, x = u[l + 336 >> 2] | 0, i = 0; (i | 0) < (h | 0); i = i + 64 | 0) {
            for (s = r, o = e, c = n, d = a, b = x, t = 0; (t | 0) < 64; t = t + 4 | 0)
              C = u[i + t >> 2] | 0, S = ((r << 5 | r >>> 27) + (e & n | ~e & a) | 0) + ((C + x | 0) + 1518500249 | 0) | 0, x = a, a = n, n = e << 30 | e >>> 2, e = r, r = S, u[h + t >> 2] = C;
            for (t = h + 64 | 0; (t | 0) < (h + 80 | 0); t = t + 4 | 0)
              C = (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) << 1 | (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) >>> 31, S = ((r << 5 | r >>> 27) + (e & n | ~e & a) | 0) + ((C + x | 0) + 1518500249 | 0) | 0, x = a, a = n, n = e << 30 | e >>> 2, e = r, r = S, u[t >> 2] = C;
            for (t = h + 80 | 0; (t | 0) < (h + 160 | 0); t = t + 4 | 0)
              C = (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) << 1 | (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) >>> 31, S = ((r << 5 | r >>> 27) + (e ^ n ^ a) | 0) + ((C + x | 0) + 1859775393 | 0) | 0, x = a, a = n, n = e << 30 | e >>> 2, e = r, r = S, u[t >> 2] = C;
            for (t = h + 160 | 0; (t | 0) < (h + 240 | 0); t = t + 4 | 0)
              C = (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) << 1 | (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) >>> 31, S = ((r << 5 | r >>> 27) + (e & n | e & a | n & a) | 0) + ((C + x | 0) - 1894007588 | 0) | 0, x = a, a = n, n = e << 30 | e >>> 2, e = r, r = S, u[t >> 2] = C;
            for (t = h + 240 | 0; (t | 0) < (h + 320 | 0); t = t + 4 | 0)
              C = (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) << 1 | (u[t - 12 >> 2] ^ u[t - 32 >> 2] ^ u[t - 56 >> 2] ^ u[t - 64 >> 2]) >>> 31, S = ((r << 5 | r >>> 27) + (e ^ n ^ a) | 0) + ((C + x | 0) - 899497514 | 0) | 0, x = a, a = n, n = e << 30 | e >>> 2, e = r, r = S, u[t >> 2] = C;
            r = r + s | 0, e = e + o | 0, n = n + c | 0, a = a + d | 0, x = x + b | 0;
          }
          u[l + 320 >> 2] = r, u[l + 324 >> 2] = e, u[l + 328 >> 2] = n, u[l + 332 >> 2] = a, u[l + 336 >> 2] = x;
        }
        return { hash: f };
      };
    }, function(w, _) {
      var v = this, y = void 0;
      typeof self < "u" && typeof self.FileReaderSync < "u" && (y = new self.FileReaderSync());
      var p = function(f, h, l, i, t, r) {
        var s = void 0, e = r % 4, o = (t + e) % 4, n = t - o;
        switch (e) {
          case 0:
            h[r] = f.charCodeAt(i + 3);
          case 1:
            h[r + 1 - (e << 1) | 0] = f.charCodeAt(i + 2);
          case 2:
            h[r + 2 - (e << 1) | 0] = f.charCodeAt(i + 1);
          case 3:
            h[r + 3 - (e << 1) | 0] = f.charCodeAt(i);
        }
        if (!(t < o + (4 - e))) {
          for (s = 4 - e; s < n; s = s + 4 | 0)
            l[r + s >> 2] = f.charCodeAt(i + s) << 24 | f.charCodeAt(i + s + 1) << 16 | f.charCodeAt(i + s + 2) << 8 | f.charCodeAt(i + s + 3);
          switch (o) {
            case 3:
              h[r + n + 1 | 0] = f.charCodeAt(i + n + 2);
            case 2:
              h[r + n + 2 | 0] = f.charCodeAt(i + n + 1);
            case 1:
              h[r + n + 3 | 0] = f.charCodeAt(i + n);
          }
        }
      }, g = function(f, h, l, i, t, r) {
        var s = void 0, e = r % 4, o = (t + e) % 4, n = t - o;
        switch (e) {
          case 0:
            h[r] = f[i + 3];
          case 1:
            h[r + 1 - (e << 1) | 0] = f[i + 2];
          case 2:
            h[r + 2 - (e << 1) | 0] = f[i + 1];
          case 3:
            h[r + 3 - (e << 1) | 0] = f[i];
        }
        if (!(t < o + (4 - e))) {
          for (s = 4 - e; s < n; s = s + 4 | 0)
            l[r + s >> 2 | 0] = f[i + s] << 24 | f[i + s + 1] << 16 | f[i + s + 2] << 8 | f[i + s + 3];
          switch (o) {
            case 3:
              h[r + n + 1 | 0] = f[i + n + 2];
            case 2:
              h[r + n + 2 | 0] = f[i + n + 1];
            case 1:
              h[r + n + 3 | 0] = f[i + n];
          }
        }
      }, u = function(f, h, l, i, t, r) {
        var s = void 0, e = r % 4, o = (t + e) % 4, n = t - o, c = new Uint8Array(y.readAsArrayBuffer(f.slice(i, i + t)));
        switch (e) {
          case 0:
            h[r] = c[3];
          case 1:
            h[r + 1 - (e << 1) | 0] = c[2];
          case 2:
            h[r + 2 - (e << 1) | 0] = c[1];
          case 3:
            h[r + 3 - (e << 1) | 0] = c[0];
        }
        if (!(t < o + (4 - e))) {
          for (s = 4 - e; s < n; s = s + 4 | 0)
            l[r + s >> 2 | 0] = c[s] << 24 | c[s + 1] << 16 | c[s + 2] << 8 | c[s + 3];
          switch (o) {
            case 3:
              h[r + n + 1 | 0] = c[n + 2];
            case 2:
              h[r + n + 2 | 0] = c[n + 1];
            case 1:
              h[r + n + 3 | 0] = c[n];
          }
        }
      };
      w.exports = function(f, h, l, i, t, r) {
        if (typeof f == "string")
          return p(f, h, l, i, t, r);
        if (f instanceof Array || v && v.Buffer && v.Buffer.isBuffer(f))
          return g(f, h, l, i, t, r);
        if (f instanceof ArrayBuffer)
          return g(new Uint8Array(f), h, l, i, t, r);
        if (f.buffer instanceof ArrayBuffer)
          return g(new Uint8Array(f.buffer, f.byteOffset, f.byteLength), h, l, i, t, r);
        if (f instanceof Blob)
          return u(f, h, l, i, t, r);
        throw new Error("Unsupported data type.");
      };
    }, function(w, _, v) {
      var y = function() {
        function l(i, t) {
          for (var r = 0; r < t.length; r++) {
            var s = t[r];
            s.enumerable = s.enumerable || false, s.configurable = true, "value" in s && (s.writable = true), Object.defineProperty(i, s.key, s);
          }
        }
        return function(i, t, r) {
          return t && l(i.prototype, t), r && l(i, r), i;
        };
      }();
      function p(l, i) {
        if (!(l instanceof i))
          throw new TypeError("Cannot call a class as a function");
      }
      var g = v(0), u = v(1), f = u.toHex, h = function() {
        function l() {
          p(this, l), this._rusha = new g(), this._rusha.resetState();
        }
        return l.prototype.update = function(t) {
          return this._rusha.append(t), this;
        }, l.prototype.digest = function(t) {
          var r = this._rusha.rawEnd().buffer;
          if (!t)
            return r;
          if (t === "hex")
            return f(r);
          throw new Error("unsupported digest encoding");
        }, y(l, [{ key: "state", get: function() {
          return this._rusha.getState();
        }, set: function(i) {
          this._rusha.setState(i);
        } }]), l;
      }();
      w.exports = function() {
        return new h();
      };
    }]);
  });
});
var A = {};
z(A, { default: () => J });
var G = E(m());
L(A, E(m()));
var { default: U, ...P } = G;
var J = U !== void 0 ? U : P;
export {
  J as default
};
