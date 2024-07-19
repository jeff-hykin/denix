var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://deno.land/std@0.177.0/node/_fs/_fs_constants.ts
var fs_constants_exports = {};
__export(fs_constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYMLINK: () => O_SYMLINK,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});

// https://deno.land/std@0.177.0/node/internal_binding/constants.ts
var constants_exports = {};
__export(constants_exports, {
  crypto: () => crypto,
  fs: () => fs,
  os: () => os,
  trace: () => trace,
  zlib: () => zlib
});
var os;
if (Deno.build.os === "darwin") {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 8,
      RTLD_LOCAL: 4
    },
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 48,
      EADDRNOTAVAIL: 49,
      EAFNOSUPPORT: 47,
      EAGAIN: 35,
      EALREADY: 37,
      EBADF: 9,
      EBADMSG: 94,
      EBUSY: 16,
      ECANCELED: 89,
      ECHILD: 10,
      ECONNABORTED: 53,
      ECONNREFUSED: 61,
      ECONNRESET: 54,
      EDEADLK: 11,
      EDESTADDRREQ: 39,
      EDOM: 33,
      EDQUOT: 69,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 65,
      EIDRM: 90,
      EILSEQ: 92,
      EINPROGRESS: 36,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 56,
      EISDIR: 21,
      ELOOP: 62,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 40,
      EMULTIHOP: 95,
      ENAMETOOLONG: 63,
      ENETDOWN: 50,
      ENETRESET: 52,
      ENETUNREACH: 51,
      ENFILE: 23,
      ENOBUFS: 55,
      ENODATA: 96,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 77,
      ENOLINK: 97,
      ENOMEM: 12,
      ENOMSG: 91,
      ENOPROTOOPT: 42,
      ENOSPC: 28,
      ENOSR: 98,
      ENOSTR: 99,
      ENOSYS: 78,
      ENOTCONN: 57,
      ENOTDIR: 20,
      ENOTEMPTY: 66,
      ENOTSOCK: 38,
      ENOTSUP: 45,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 102,
      EOVERFLOW: 84,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 100,
      EPROTONOSUPPORT: 43,
      EPROTOTYPE: 41,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 70,
      ETIME: 101,
      ETIMEDOUT: 60,
      ETXTBSY: 26,
      EWOULDBLOCK: 35,
      EXDEV: 18
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 10,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 30,
      SIGSEGV: 11,
      SIGUSR2: 31,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 20,
      SIGCONT: 19,
      SIGSTOP: 17,
      SIGTSTP: 18,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 16,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 23,
      SIGINFO: 29,
      SIGSYS: 12
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    }
  };
} else if (Deno.build.os === "linux") {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    },
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31,
      SIGUNUSED: 31
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    }
  };
} else {
  os = {
    UV_UDP_REUSEADDR: 4,
    dlopen: {},
    errno: {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 100,
      EADDRNOTAVAIL: 101,
      EAFNOSUPPORT: 102,
      EAGAIN: 11,
      EALREADY: 103,
      EBADF: 9,
      EBADMSG: 104,
      EBUSY: 16,
      ECANCELED: 105,
      ECHILD: 10,
      ECONNABORTED: 106,
      ECONNREFUSED: 107,
      ECONNRESET: 108,
      EDEADLK: 36,
      EDESTADDRREQ: 109,
      EDOM: 33,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 110,
      EIDRM: 111,
      EILSEQ: 42,
      EINPROGRESS: 112,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 113,
      EISDIR: 21,
      ELOOP: 114,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 115,
      ENAMETOOLONG: 38,
      ENETDOWN: 116,
      ENETRESET: 117,
      ENETUNREACH: 118,
      ENFILE: 23,
      ENOBUFS: 119,
      ENODATA: 120,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 39,
      ENOLINK: 121,
      ENOMEM: 12,
      ENOMSG: 122,
      ENOPROTOOPT: 123,
      ENOSPC: 28,
      ENOSR: 124,
      ENOSTR: 125,
      ENOSYS: 40,
      ENOTCONN: 126,
      ENOTDIR: 20,
      ENOTEMPTY: 41,
      ENOTSOCK: 128,
      ENOTSUP: 129,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 130,
      EOVERFLOW: 132,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 134,
      EPROTONOSUPPORT: 135,
      EPROTOTYPE: 136,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ETIME: 137,
      ETIMEDOUT: 138,
      ETXTBSY: 139,
      EWOULDBLOCK: 140,
      EXDEV: 18,
      WSAEINTR: 10004,
      WSAEBADF: 10009,
      WSAEACCES: 10013,
      WSAEFAULT: 10014,
      WSAEINVAL: 10022,
      WSAEMFILE: 10024,
      WSAEWOULDBLOCK: 10035,
      WSAEINPROGRESS: 10036,
      WSAEALREADY: 10037,
      WSAENOTSOCK: 10038,
      WSAEDESTADDRREQ: 10039,
      WSAEMSGSIZE: 10040,
      WSAEPROTOTYPE: 10041,
      WSAENOPROTOOPT: 10042,
      WSAEPROTONOSUPPORT: 10043,
      WSAESOCKTNOSUPPORT: 10044,
      WSAEOPNOTSUPP: 10045,
      WSAEPFNOSUPPORT: 10046,
      WSAEAFNOSUPPORT: 10047,
      WSAEADDRINUSE: 10048,
      WSAEADDRNOTAVAIL: 10049,
      WSAENETDOWN: 10050,
      WSAENETUNREACH: 10051,
      WSAENETRESET: 10052,
      WSAECONNABORTED: 10053,
      WSAECONNRESET: 10054,
      WSAENOBUFS: 10055,
      WSAEISCONN: 10056,
      WSAENOTCONN: 10057,
      WSAESHUTDOWN: 10058,
      WSAETOOMANYREFS: 10059,
      WSAETIMEDOUT: 10060,
      WSAECONNREFUSED: 10061,
      WSAELOOP: 10062,
      WSAENAMETOOLONG: 10063,
      WSAEHOSTDOWN: 10064,
      WSAEHOSTUNREACH: 10065,
      WSAENOTEMPTY: 10066,
      WSAEPROCLIM: 10067,
      WSAEUSERS: 10068,
      WSAEDQUOT: 10069,
      WSAESTALE: 10070,
      WSAEREMOTE: 10071,
      WSASYSNOTREADY: 10091,
      WSAVERNOTSUPPORTED: 10092,
      WSANOTINITIALISED: 10093,
      WSAEDISCON: 10101,
      WSAENOMORE: 10102,
      WSAECANCELLED: 10103,
      WSAEINVALIDPROCTABLE: 10104,
      WSAEINVALIDPROVIDER: 10105,
      WSAEPROVIDERFAILEDINIT: 10106,
      WSASYSCALLFAILURE: 10107,
      WSASERVICE_NOT_FOUND: 10108,
      WSATYPE_NOT_FOUND: 10109,
      WSA_E_NO_MORE: 10110,
      WSA_E_CANCELLED: 10111,
      WSAEREFUSED: 10112
    },
    signals: {
      SIGHUP: 1,
      SIGINT: 2,
      SIGILL: 4,
      SIGABRT: 22,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGSEGV: 11,
      SIGTERM: 15,
      SIGBREAK: 21,
      SIGWINCH: 28
    },
    priority: {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    }
  };
}
var fs = {
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  UV_DIRENT_UNKNOWN: 0,
  UV_DIRENT_FILE: 1,
  UV_DIRENT_DIR: 2,
  UV_DIRENT_LINK: 3,
  UV_DIRENT_FIFO: 4,
  UV_DIRENT_SOCKET: 5,
  UV_DIRENT_CHAR: 6,
  UV_DIRENT_BLOCK: 7,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFBLK: 24576,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IFSOCK: 49152,
  O_CREAT: 512,
  O_EXCL: 2048,
  UV_FS_O_FILEMAP: 0,
  O_NOCTTY: 131072,
  O_TRUNC: 1024,
  O_APPEND: 8,
  O_DIRECTORY: 1048576,
  O_NOFOLLOW: 256,
  O_SYNC: 128,
  O_DSYNC: 4194304,
  O_SYMLINK: 2097152,
  O_NONBLOCK: 4,
  S_IRWXU: 448,
  S_IRUSR: 256,
  S_IWUSR: 128,
  S_IXUSR: 64,
  S_IRWXG: 56,
  S_IRGRP: 32,
  S_IWGRP: 16,
  S_IXGRP: 8,
  S_IRWXO: 7,
  S_IROTH: 4,
  S_IWOTH: 2,
  S_IXOTH: 1,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  UV_FS_COPYFILE_EXCL: 1,
  COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  COPYFILE_FICLONE_FORCE: 4
};
var crypto = {
  OPENSSL_VERSION_NUMBER: 269488319,
  SSL_OP_ALL: 2147485780,
  SSL_OP_ALLOW_NO_DHE_KEX: 1024,
  SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
  SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
  SSL_OP_CISCO_ANYCONNECT: 32768,
  SSL_OP_COOKIE_EXCHANGE: 8192,
  SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
  SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
  SSL_OP_EPHEMERAL_RSA: 0,
  SSL_OP_LEGACY_SERVER_CONNECT: 4,
  SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 0,
  SSL_OP_MICROSOFT_SESS_ID_BUG: 0,
  SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
  SSL_OP_NETSCAPE_CA_DN_BUG: 0,
  SSL_OP_NETSCAPE_CHALLENGE_BUG: 0,
  SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 0,
  SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 0,
  SSL_OP_NO_COMPRESSION: 131072,
  SSL_OP_NO_ENCRYPT_THEN_MAC: 524288,
  SSL_OP_NO_QUERY_MTU: 4096,
  SSL_OP_NO_RENEGOTIATION: 1073741824,
  SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
  SSL_OP_NO_SSLv2: 0,
  SSL_OP_NO_SSLv3: 33554432,
  SSL_OP_NO_TICKET: 16384,
  SSL_OP_NO_TLSv1: 67108864,
  SSL_OP_NO_TLSv1_1: 268435456,
  SSL_OP_NO_TLSv1_2: 134217728,
  SSL_OP_NO_TLSv1_3: 536870912,
  SSL_OP_PKCS1_CHECK_1: 0,
  SSL_OP_PKCS1_CHECK_2: 0,
  SSL_OP_PRIORITIZE_CHACHA: 2097152,
  SSL_OP_SINGLE_DH_USE: 0,
  SSL_OP_SINGLE_ECDH_USE: 0,
  SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 0,
  SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
  SSL_OP_TLS_BLOCK_PADDING_BUG: 0,
  SSL_OP_TLS_D5_BUG: 0,
  SSL_OP_TLS_ROLLBACK_BUG: 8388608,
  ENGINE_METHOD_RSA: 1,
  ENGINE_METHOD_DSA: 2,
  ENGINE_METHOD_DH: 4,
  ENGINE_METHOD_RAND: 8,
  ENGINE_METHOD_EC: 2048,
  ENGINE_METHOD_CIPHERS: 64,
  ENGINE_METHOD_DIGESTS: 128,
  ENGINE_METHOD_PKEY_METHS: 512,
  ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
  ENGINE_METHOD_ALL: 65535,
  ENGINE_METHOD_NONE: 0,
  DH_CHECK_P_NOT_SAFE_PRIME: 2,
  DH_CHECK_P_NOT_PRIME: 1,
  DH_UNABLE_TO_CHECK_GENERATOR: 4,
  DH_NOT_SUITABLE_GENERATOR: 8,
  ALPN_ENABLED: 1,
  RSA_PKCS1_PADDING: 1,
  RSA_SSLV23_PADDING: 2,
  RSA_NO_PADDING: 3,
  RSA_PKCS1_OAEP_PADDING: 4,
  RSA_X931_PADDING: 5,
  RSA_PKCS1_PSS_PADDING: 6,
  RSA_PSS_SALTLEN_DIGEST: -1,
  RSA_PSS_SALTLEN_MAX_SIGN: -2,
  RSA_PSS_SALTLEN_AUTO: -2,
  defaultCoreCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
  TLS1_VERSION: 769,
  TLS1_1_VERSION: 770,
  TLS1_2_VERSION: 771,
  TLS1_3_VERSION: 772,
  POINT_CONVERSION_COMPRESSED: 2,
  POINT_CONVERSION_UNCOMPRESSED: 4,
  POINT_CONVERSION_HYBRID: 6
};
var zlib = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  ZLIB_VERNUM: 4784,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_PARAM_MODE: 0,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31
};
var trace = {
  TRACE_EVENT_PHASE_BEGIN: 66,
  TRACE_EVENT_PHASE_END: 69,
  TRACE_EVENT_PHASE_COMPLETE: 88,
  TRACE_EVENT_PHASE_INSTANT: 73,
  TRACE_EVENT_PHASE_ASYNC_BEGIN: 83,
  TRACE_EVENT_PHASE_ASYNC_STEP_INTO: 84,
  TRACE_EVENT_PHASE_ASYNC_STEP_PAST: 112,
  TRACE_EVENT_PHASE_ASYNC_END: 70,
  TRACE_EVENT_PHASE_NESTABLE_ASYNC_BEGIN: 98,
  TRACE_EVENT_PHASE_NESTABLE_ASYNC_END: 101,
  TRACE_EVENT_PHASE_NESTABLE_ASYNC_INSTANT: 110,
  TRACE_EVENT_PHASE_FLOW_BEGIN: 115,
  TRACE_EVENT_PHASE_FLOW_STEP: 116,
  TRACE_EVENT_PHASE_FLOW_END: 102,
  TRACE_EVENT_PHASE_METADATA: 77,
  TRACE_EVENT_PHASE_COUNTER: 67,
  TRACE_EVENT_PHASE_SAMPLE: 80,
  TRACE_EVENT_PHASE_CREATE_OBJECT: 78,
  TRACE_EVENT_PHASE_SNAPSHOT_OBJECT: 79,
  TRACE_EVENT_PHASE_DELETE_OBJECT: 68,
  TRACE_EVENT_PHASE_MEMORY_DUMP: 118,
  TRACE_EVENT_PHASE_MARK: 82,
  TRACE_EVENT_PHASE_CLOCK_SYNC: 99,
  TRACE_EVENT_PHASE_ENTER_CONTEXT: 40,
  TRACE_EVENT_PHASE_LEAVE_CONTEXT: 41,
  TRACE_EVENT_PHASE_LINK_IDS: 61
};

// https://deno.land/std@0.177.0/node/_fs/_fs_constants.ts
var {
  F_OK,
  R_OK,
  W_OK,
  X_OK,
  S_IRUSR,
  S_IWUSR,
  S_IXUSR,
  S_IRGRP,
  S_IWGRP,
  S_IXGRP,
  S_IROTH,
  S_IWOTH,
  S_IXOTH,
  COPYFILE_EXCL,
  COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE,
  UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE,
  O_RDONLY,
  O_WRONLY,
  O_RDWR,
  O_NOCTTY,
  O_TRUNC,
  O_APPEND,
  O_DIRECTORY,
  O_NOFOLLOW,
  O_SYNC,
  O_DSYNC,
  O_SYMLINK,
  O_NONBLOCK,
  O_CREAT,
  O_EXCL
} = fs;

// https://deno.land/std@0.177.0/node/internal/error_codes.ts
var codes = {};

// https://deno.land/std@0.177.0/node/internal/hide_stack_frames.ts
function hideStackFrames(fn) {
  const hidden = "__node_internal_" + fn.name;
  Object.defineProperty(fn, "name", { value: hidden });
  return fn;
}

// https://deno.land/std@0.177.0/node/internal/util/types.ts
var types_exports2 = {};
__export(types_exports2, {
  isAnyArrayBuffer: () => isAnyArrayBuffer2,
  isArgumentsObject: () => isArgumentsObject2,
  isArrayBuffer: () => isArrayBuffer2,
  isArrayBufferView: () => isArrayBufferView,
  isAsyncFunction: () => isAsyncFunction2,
  isBigInt64Array: () => isBigInt64Array,
  isBigIntObject: () => isBigIntObject2,
  isBigUint64Array: () => isBigUint64Array,
  isBooleanObject: () => isBooleanObject2,
  isBoxedPrimitive: () => isBoxedPrimitive2,
  isCryptoKey: () => isCryptoKey,
  isDataView: () => isDataView2,
  isDate: () => isDate2,
  isFloat32Array: () => isFloat32Array,
  isFloat64Array: () => isFloat64Array,
  isGeneratorFunction: () => isGeneratorFunction2,
  isGeneratorObject: () => isGeneratorObject2,
  isInt16Array: () => isInt16Array,
  isInt32Array: () => isInt32Array,
  isInt8Array: () => isInt8Array,
  isKeyObject: () => isKeyObject,
  isMap: () => isMap2,
  isMapIterator: () => isMapIterator2,
  isModuleNamespaceObject: () => isModuleNamespaceObject2,
  isNativeError: () => isNativeError2,
  isNumberObject: () => isNumberObject2,
  isPromise: () => isPromise2,
  isProxy: () => isProxy2,
  isRegExp: () => isRegExp2,
  isSet: () => isSet2,
  isSetIterator: () => isSetIterator2,
  isSharedArrayBuffer: () => isSharedArrayBuffer2,
  isStringObject: () => isStringObject2,
  isSymbolObject: () => isSymbolObject2,
  isTypedArray: () => isTypedArray,
  isUint16Array: () => isUint16Array,
  isUint32Array: () => isUint32Array,
  isUint8Array: () => isUint8Array,
  isUint8ClampedArray: () => isUint8ClampedArray,
  isWeakMap: () => isWeakMap2,
  isWeakSet: () => isWeakSet2
});

// https://deno.land/std@0.177.0/node/internal_binding/types.ts
var types_exports = {};
__export(types_exports, {
  default: () => types_default,
  isAnyArrayBuffer: () => isAnyArrayBuffer,
  isArgumentsObject: () => isArgumentsObject,
  isArrayBuffer: () => isArrayBuffer,
  isAsyncFunction: () => isAsyncFunction,
  isBigIntObject: () => isBigIntObject,
  isBooleanObject: () => isBooleanObject,
  isBoxedPrimitive: () => isBoxedPrimitive,
  isDataView: () => isDataView,
  isDate: () => isDate,
  isGeneratorFunction: () => isGeneratorFunction,
  isGeneratorObject: () => isGeneratorObject,
  isMap: () => isMap,
  isMapIterator: () => isMapIterator,
  isModuleNamespaceObject: () => isModuleNamespaceObject,
  isNativeError: () => isNativeError,
  isNumberObject: () => isNumberObject,
  isPromise: () => isPromise,
  isProxy: () => isProxy,
  isRegExp: () => isRegExp,
  isSet: () => isSet,
  isSetIterator: () => isSetIterator,
  isSharedArrayBuffer: () => isSharedArrayBuffer,
  isStringObject: () => isStringObject,
  isSymbolObject: () => isSymbolObject,
  isWeakMap: () => isWeakMap,
  isWeakSet: () => isWeakSet
});

// https://deno.land/std@0.177.0/node/_core.ts
var DenoCore;
var { Deno: Deno2 } = globalThis;
if (Deno2?.[Deno2.internal]?.core) {
  DenoCore = Deno2[Deno2.internal].core;
} else if (Deno2?.core) {
  DenoCore = Deno2.core;
} else {
  DenoCore = {};
}
var core = {
  runMicrotasks: DenoCore.runMicrotasks ?? function() {
    throw new Error(
      "Deno.core.runMicrotasks() is not supported in this environment"
    );
  },
  setHasTickScheduled: DenoCore.setHasTickScheduled ?? function() {
    throw new Error(
      "Deno.core.setHasTickScheduled() is not supported in this environment"
    );
  },
  hasTickScheduled: DenoCore.hasTickScheduled ?? function() {
    throw new Error(
      "Deno.core.hasTickScheduled() is not supported in this environment"
    );
  },
  setNextTickCallback: DenoCore.setNextTickCallback ?? void 0,
  setMacrotaskCallback: DenoCore.setMacrotaskCallback ?? function() {
    throw new Error(
      "Deno.core.setNextTickCallback() is not supported in this environment"
    );
  },
  evalContext: DenoCore.evalContext ?? function(_code, _filename) {
    throw new Error(
      "Deno.core.evalContext is not supported in this environment"
    );
  },
  encode: DenoCore.encode ?? function(chunk) {
    return new TextEncoder().encode(chunk);
  },
  eventLoopHasMoreWork: DenoCore.eventLoopHasMoreWork ?? function() {
    return false;
  },
  isProxy: DenoCore.isProxy ?? function() {
    return false;
  },
  getPromiseDetails: DenoCore.getPromiseDetails ?? function(_promise) {
    throw new Error(
      "Deno.core.getPromiseDetails is not supported in this environment"
    );
  },
  setPromiseHooks: DenoCore.setPromiseHooks ?? function() {
    throw new Error(
      "Deno.core.setPromiseHooks is not supported in this environment"
    );
  },
  ops: DenoCore.ops ?? {
    op_napi_open(_filename) {
      throw new Error(
        "Node API is not supported in this environment"
      );
    }
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/types.ts
var _toString = Object.prototype.toString;
var _bigIntValueOf = BigInt.prototype.valueOf;
var _booleanValueOf = Boolean.prototype.valueOf;
var _dateValueOf = Date.prototype.valueOf;
var _numberValueOf = Number.prototype.valueOf;
var _stringValueOf = String.prototype.valueOf;
var _symbolValueOf = Symbol.prototype.valueOf;
var _weakMapHas = WeakMap.prototype.has;
var _weakSetHas = WeakSet.prototype.has;
var _getArrayBufferByteLength = Object.getOwnPropertyDescriptor(
  ArrayBuffer.prototype,
  "byteLength"
).get;
var _getSharedArrayBufferByteLength = globalThis.SharedArrayBuffer ? Object.getOwnPropertyDescriptor(
  SharedArrayBuffer.prototype,
  "byteLength"
).get : void 0;
var _getTypedArrayToStringTag = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array).prototype,
  Symbol.toStringTag
).get;
var _getSetSize = Object.getOwnPropertyDescriptor(
  Set.prototype,
  "size"
).get;
var _getMapSize = Object.getOwnPropertyDescriptor(
  Map.prototype,
  "size"
).get;
function isObjectLike(value) {
  return value !== null && typeof value === "object";
}
function isAnyArrayBuffer(value) {
  return isArrayBuffer(value) || isSharedArrayBuffer(value);
}
function isArgumentsObject(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === void 0 && _toString.call(value) === "[object Arguments]";
}
function isArrayBuffer(value) {
  try {
    _getArrayBufferByteLength.call(value);
    return true;
  } catch {
    return false;
  }
}
function isAsyncFunction(value) {
  return typeof value === "function" && // @ts-ignore: function is a kind of object
  value[Symbol.toStringTag] === "AsyncFunction";
}
function isBooleanObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _booleanValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isBoxedPrimitive(value) {
  return isBooleanObject(value) || isStringObject(value) || isNumberObject(value) || isSymbolObject(value) || isBigIntObject(value);
}
function isDataView(value) {
  return ArrayBuffer.isView(value) && _getTypedArrayToStringTag.call(value) === void 0;
}
function isDate(value) {
  try {
    _dateValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isGeneratorFunction(value) {
  return typeof value === "function" && // @ts-ignore: function is a kind of object
  value[Symbol.toStringTag] === "GeneratorFunction";
}
function isGeneratorObject(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Generator";
}
function isMap(value) {
  try {
    _getMapSize.call(value);
    return true;
  } catch {
    return false;
  }
}
function isMapIterator(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Map Iterator";
}
function isModuleNamespaceObject(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Module";
}
function isNativeError(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === void 0 && _toString.call(value) === "[object Error]";
}
function isNumberObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _numberValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isBigIntObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _bigIntValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isPromise(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Promise";
}
function isProxy(value) {
  return core.isProxy(value);
}
function isRegExp(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === void 0 && _toString.call(value) === "[object RegExp]";
}
function isSet(value) {
  try {
    _getSetSize.call(value);
    return true;
  } catch {
    return false;
  }
}
function isSetIterator(value) {
  return isObjectLike(value) && value[Symbol.toStringTag] === "Set Iterator";
}
function isSharedArrayBuffer(value) {
  if (_getSharedArrayBufferByteLength === void 0) {
    return false;
  }
  try {
    _getSharedArrayBufferByteLength.call(value);
    return true;
  } catch {
    return false;
  }
}
function isStringObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _stringValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isSymbolObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  try {
    _symbolValueOf.call(value);
    return true;
  } catch {
    return false;
  }
}
function isWeakMap(value) {
  try {
    _weakMapHas.call(value, null);
    return true;
  } catch {
    return false;
  }
}
function isWeakSet(value) {
  try {
    _weakSetHas.call(value, null);
    return true;
  } catch {
    return false;
  }
}
var types_default = {
  isAsyncFunction,
  isGeneratorFunction,
  isAnyArrayBuffer,
  isArrayBuffer,
  isArgumentsObject,
  isBoxedPrimitive,
  isDataView,
  // isExternal,
  isMap,
  isMapIterator,
  isModuleNamespaceObject,
  isNativeError,
  isPromise,
  isSet,
  isSetIterator,
  isWeakMap,
  isWeakSet,
  isRegExp,
  isDate,
  isStringObject,
  isNumberObject,
  isBooleanObject,
  isBigIntObject
};

// https://deno.land/std@0.177.0/node/internal/crypto/constants.ts
var kHandle = Symbol("kHandle");
var kKeyObject = Symbol("kKeyObject");

// https://deno.land/std@0.177.0/node/internal/crypto/_keys.ts
var kKeyType = Symbol("kKeyType");
function isKeyObject(obj) {
  return obj != null && obj[kKeyType] !== void 0;
}
function isCryptoKey(obj) {
  return obj != null && obj[kKeyObject] !== void 0;
}

// https://deno.land/std@0.177.0/node/internal/util/types.ts
var _getTypedArrayToStringTag2 = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Uint8Array).prototype,
  Symbol.toStringTag
).get;
function isArrayBufferView(value) {
  return ArrayBuffer.isView(value);
}
function isBigInt64Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "BigInt64Array";
}
function isBigUint64Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "BigUint64Array";
}
function isFloat32Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Float32Array";
}
function isFloat64Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Float64Array";
}
function isInt8Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Int8Array";
}
function isInt16Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Int16Array";
}
function isInt32Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Int32Array";
}
function isTypedArray(value) {
  return _getTypedArrayToStringTag2.call(value) !== void 0;
}
function isUint8Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Uint8Array";
}
function isUint8ClampedArray(value) {
  return _getTypedArrayToStringTag2.call(value) === "Uint8ClampedArray";
}
function isUint16Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Uint16Array";
}
function isUint32Array(value) {
  return _getTypedArrayToStringTag2.call(value) === "Uint32Array";
}
var {
  // isExternal,
  isDate: isDate2,
  isArgumentsObject: isArgumentsObject2,
  isBigIntObject: isBigIntObject2,
  isBooleanObject: isBooleanObject2,
  isNumberObject: isNumberObject2,
  isStringObject: isStringObject2,
  isSymbolObject: isSymbolObject2,
  isNativeError: isNativeError2,
  isRegExp: isRegExp2,
  isAsyncFunction: isAsyncFunction2,
  isGeneratorFunction: isGeneratorFunction2,
  isGeneratorObject: isGeneratorObject2,
  isPromise: isPromise2,
  isMap: isMap2,
  isSet: isSet2,
  isMapIterator: isMapIterator2,
  isSetIterator: isSetIterator2,
  isWeakMap: isWeakMap2,
  isWeakSet: isWeakSet2,
  isArrayBuffer: isArrayBuffer2,
  isDataView: isDataView2,
  isSharedArrayBuffer: isSharedArrayBuffer2,
  isProxy: isProxy2,
  isModuleNamespaceObject: isModuleNamespaceObject2,
  isAnyArrayBuffer: isAnyArrayBuffer2,
  isBoxedPrimitive: isBoxedPrimitive2
} = types_exports;

// https://deno.land/std@0.177.0/node/internal/normalize_encoding.mjs
function normalizeEncoding(enc) {
  if (enc == null || enc === "utf8" || enc === "utf-8")
    return "utf8";
  return slowCases(enc);
}
function slowCases(enc) {
  switch (enc.length) {
    case 4:
      if (enc === "UTF8")
        return "utf8";
      if (enc === "ucs2" || enc === "UCS2")
        return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf8")
        return "utf8";
      if (enc === "ucs2")
        return "utf16le";
      break;
    case 3:
      if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
        return "hex";
      }
      break;
    case 5:
      if (enc === "ascii")
        return "ascii";
      if (enc === "ucs-2")
        return "utf16le";
      if (enc === "UTF-8")
        return "utf8";
      if (enc === "ASCII")
        return "ascii";
      if (enc === "UCS-2")
        return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf-8")
        return "utf8";
      if (enc === "ascii")
        return "ascii";
      if (enc === "ucs-2")
        return "utf16le";
      break;
    case 6:
      if (enc === "base64")
        return "base64";
      if (enc === "latin1" || enc === "binary")
        return "latin1";
      if (enc === "BASE64")
        return "base64";
      if (enc === "LATIN1" || enc === "BINARY")
        return "latin1";
      enc = `${enc}`.toLowerCase();
      if (enc === "base64")
        return "base64";
      if (enc === "latin1" || enc === "binary")
        return "latin1";
      break;
    case 7:
      if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
        return "utf16le";
      }
      break;
    case 8:
      if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
        return "utf16le";
      }
      break;
    case 9:
      if (enc === "base64url" || enc === "BASE64URL" || `${enc}`.toLowerCase() === "base64url") {
        return "base64url";
      }
      break;
    default:
      if (enc === "")
        return "utf8";
  }
}

// https://deno.land/std@0.177.0/node/internal/validators.mjs
function isInt32(value) {
  return value === (value | 0);
}
function isUint32(value) {
  return value === value >>> 0;
}
var octalReg = /^[0-7]+$/;
var modeDesc = "must be a 32-bit unsigned integer or an octal string";
function parseFileMode(value, name, def) {
  value ??= def;
  if (typeof value === "string") {
    if (!octalReg.test(value)) {
      throw new codes.ERR_INVALID_ARG_VALUE(name, value, modeDesc);
    }
    value = Number.parseInt(value, 8);
  }
  validateInt32(value, name, 0, 2 ** 32 - 1);
  return value;
}
var validateBuffer = hideStackFrames((buffer, name = "buffer") => {
  if (!isArrayBufferView(buffer)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      name,
      ["Buffer", "TypedArray", "DataView"],
      buffer
    );
  }
});
var validateInteger = hideStackFrames(
  (value, name, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
    if (typeof value !== "number") {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!Number.isInteger(value)) {
      throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    if (value < min || value > max) {
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  }
);
var validateObject = hideStackFrames((value, name, options) => {
  const useDefaultOptions = options == null;
  const allowArray = useDefaultOptions ? false : options.allowArray;
  const allowFunction = useDefaultOptions ? false : options.allowFunction;
  const nullable = useDefaultOptions ? false : options.nullable;
  if (!nullable && value === null || !allowArray && Array.isArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "Object", value);
  }
});
var validateInt32 = hideStackFrames(
  (value, name, min = -2147483648, max = 2147483647) => {
    if (!isInt32(value)) {
      if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
    if (value < min || value > max) {
      throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  }
);
var validateUint32 = hideStackFrames(
  (value, name, positive) => {
    if (!isUint32(value)) {
      if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      const min = positive ? 1 : 0;
      throw new codes.ERR_OUT_OF_RANGE(
        name,
        `>= ${min} && < 4294967296`,
        value
      );
    }
    if (positive && value === 0) {
      throw new codes.ERR_OUT_OF_RANGE(name, ">= 1 && < 4294967296", value);
    }
  }
);
function validateString(value, name) {
  if (typeof value !== "string") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "string", value);
  }
}
function validateBoolean(value, name) {
  if (typeof value !== "boolean") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "boolean", value);
  }
}
var validateOneOf = hideStackFrames(
  (value, name, oneOf) => {
    if (!Array.prototype.includes.call(oneOf, value)) {
      const allowed = Array.prototype.join.call(
        Array.prototype.map.call(
          oneOf,
          (v2) => typeof v2 === "string" ? `'${v2}'` : String(v2)
        ),
        ", "
      );
      const reason = "must be one of: " + allowed;
      throw new codes.ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  }
);
function validateEncoding(data, encoding) {
  const normalizedEncoding = normalizeEncoding(encoding);
  const length = data.length;
  if (normalizedEncoding === "hex" && length % 2 !== 0) {
    throw new codes.ERR_INVALID_ARG_VALUE(
      "encoding",
      encoding,
      `is invalid for data of length ${length}`
    );
  }
}
var validateAbortSignal = hideStackFrames(
  (signal, name) => {
    if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
    }
  }
);
var validateFunction = hideStackFrames(
  (value, name) => {
    if (typeof value !== "function") {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "Function", value);
    }
  }
);
var validateArray = hideStackFrames(
  (value, name, minLength = 0) => {
    if (!Array.isArray(value)) {
      throw new codes.ERR_INVALID_ARG_TYPE(name, "Array", value);
    }
    if (value.length < minLength) {
      const reason = `must be longer than ${minLength}`;
      throw new codes.ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  }
);

// https://deno.land/std@0.177.0/node/internal_binding/uv.ts
var uv_exports = {};
__export(uv_exports, {
  UV_EAI_MEMORY: () => UV_EAI_MEMORY,
  UV_EBADF: () => UV_EBADF,
  UV_EEXIST: () => UV_EEXIST,
  UV_EINVAL: () => UV_EINVAL,
  UV_ENOENT: () => UV_ENOENT,
  UV_ENOTSOCK: () => UV_ENOTSOCK,
  UV_UNKNOWN: () => UV_UNKNOWN,
  codeMap: () => codeMap,
  errorMap: () => errorMap,
  mapSysErrnoToUvErrno: () => mapSysErrnoToUvErrno
});

// https://deno.land/std@0.177.0/_util/asserts.ts
var DenoStdInternalError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }
};
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}
function unreachable() {
  throw new DenoStdInternalError("unreachable");
}

// https://deno.land/std@0.177.0/_util/os.ts
var osType = (() => {
  const { Deno: Deno3 } = globalThis;
  if (typeof Deno3?.build?.os === "string") {
    return Deno3.build.os;
  }
  const { navigator } = globalThis;
  if (navigator?.appVersion?.includes?.("Win")) {
    return "windows";
  }
  return "linux";
})();
var isWindows = osType === "windows";
var isLinux = osType === "linux";

// https://deno.land/std@0.177.0/node/internal_binding/_winerror.ts
var ERROR_INVALID_FUNCTION = 1;
var ERROR_FILE_NOT_FOUND = 2;
var ERROR_PATH_NOT_FOUND = 3;
var ERROR_TOO_MANY_OPEN_FILES = 4;
var ERROR_ACCESS_DENIED = 5;
var ERROR_INVALID_HANDLE = 6;
var ERROR_NOT_ENOUGH_MEMORY = 8;
var ERROR_INVALID_DATA = 13;
var ERROR_OUTOFMEMORY = 14;
var ERROR_INVALID_DRIVE = 15;
var ERROR_NOT_SAME_DEVICE = 17;
var ERROR_WRITE_PROTECT = 19;
var ERROR_CRC = 23;
var ERROR_GEN_FAILURE = 31;
var ERROR_SHARING_VIOLATION = 32;
var ERROR_LOCK_VIOLATION = 33;
var ERROR_HANDLE_DISK_FULL = 39;
var ERROR_NOT_SUPPORTED = 50;
var ERROR_NETNAME_DELETED = 64;
var ERROR_FILE_EXISTS = 80;
var ERROR_CANNOT_MAKE = 82;
var ERROR_INVALID_PARAMETER = 87;
var ERROR_BROKEN_PIPE = 109;
var ERROR_OPEN_FAILED = 110;
var ERROR_BUFFER_OVERFLOW = 111;
var ERROR_DISK_FULL = 112;
var ERROR_SEM_TIMEOUT = 121;
var ERROR_INSUFFICIENT_BUFFER = 122;
var ERROR_INVALID_NAME = 123;
var ERROR_MOD_NOT_FOUND = 126;
var ERROR_DIR_NOT_EMPTY = 145;
var ERROR_SIGNAL_REFUSED = 156;
var ERROR_BAD_PATHNAME = 161;
var ERROR_ALREADY_EXISTS = 183;
var ERROR_ENVVAR_NOT_FOUND = 203;
var ERROR_NO_SIGNAL_SENT = 205;
var ERROR_FILENAME_EXCED_RANGE = 206;
var ERROR_META_EXPANSION_TOO_LONG = 208;
var ERROR_BAD_PIPE = 230;
var ERROR_PIPE_BUSY = 231;
var ERROR_NO_DATA = 232;
var ERROR_PIPE_NOT_CONNECTED = 233;
var ERROR_DIRECTORY = 267;
var ERROR_EA_TABLE_FULL = 277;
var ERROR_OPERATION_ABORTED = 995;
var ERROR_NOACCESS = 998;
var ERROR_INVALID_FLAGS = 1004;
var ERROR_END_OF_MEDIA = 1100;
var ERROR_FILEMARK_DETECTED = 1101;
var ERROR_BEGINNING_OF_MEDIA = 1102;
var ERROR_SETMARK_DETECTED = 1103;
var ERROR_NO_DATA_DETECTED = 1104;
var ERROR_INVALID_BLOCK_LENGTH = 1106;
var ERROR_BUS_RESET = 1111;
var ERROR_NO_UNICODE_TRANSLATION = 1113;
var ERROR_IO_DEVICE = 1117;
var ERROR_EOM_OVERFLOW = 1129;
var ERROR_DEVICE_REQUIRES_CLEANING = 1165;
var ERROR_DEVICE_DOOR_OPEN = 1166;
var ERROR_CONNECTION_REFUSED = 1225;
var ERROR_ADDRESS_ALREADY_ASSOCIATED = 1227;
var ERROR_NETWORK_UNREACHABLE = 1231;
var ERROR_HOST_UNREACHABLE = 1232;
var ERROR_CONNECTION_ABORTED = 1236;
var ERROR_PRIVILEGE_NOT_HELD = 1314;
var ERROR_DISK_CORRUPT = 1393;
var ERROR_CANT_ACCESS_FILE = 1920;
var ERROR_CANT_RESOLVE_FILENAME = 1921;
var ERROR_NOT_CONNECTED = 2250;
var ERROR_INVALID_REPARSE_DATA = 4392;
var WSAEINTR = 10004;
var WSAEACCES = 10013;
var WSAEFAULT = 10014;
var WSAEINVAL = 10022;
var WSAEMFILE = 10024;
var WSAEWOULDBLOCK = 10035;
var WSAEALREADY = 10037;
var WSAENOTSOCK = 10038;
var WSAEMSGSIZE = 10040;
var WSAEPROTONOSUPPORT = 10043;
var WSAESOCKTNOSUPPORT = 10044;
var WSAEPFNOSUPPORT = 10046;
var WSAEAFNOSUPPORT = 10047;
var WSAEADDRINUSE = 10048;
var WSAEADDRNOTAVAIL = 10049;
var WSAENETUNREACH = 10051;
var WSAECONNABORTED = 10053;
var WSAECONNRESET = 10054;
var WSAENOBUFS = 10055;
var WSAEISCONN = 10056;
var WSAENOTCONN = 10057;
var WSAESHUTDOWN = 10058;
var WSAETIMEDOUT = 10060;
var WSAECONNREFUSED = 10061;
var WSAEHOSTUNREACH = 10065;
var WSAHOST_NOT_FOUND = 11001;
var WSANO_DATA = 11004;

// https://deno.land/std@0.177.0/node/internal_binding/_libuv_winerror.ts
function uvTranslateSysError(sysErrno) {
  switch (sysErrno) {
    case ERROR_ACCESS_DENIED:
      return "EACCES";
    case ERROR_NOACCESS:
      return "EACCES";
    case WSAEACCES:
      return "EACCES";
    case ERROR_CANT_ACCESS_FILE:
      return "EACCES";
    case ERROR_ADDRESS_ALREADY_ASSOCIATED:
      return "EADDRINUSE";
    case WSAEADDRINUSE:
      return "EADDRINUSE";
    case WSAEADDRNOTAVAIL:
      return "EADDRNOTAVAIL";
    case WSAEAFNOSUPPORT:
      return "EAFNOSUPPORT";
    case WSAEWOULDBLOCK:
      return "EAGAIN";
    case WSAEALREADY:
      return "EALREADY";
    case ERROR_INVALID_FLAGS:
      return "EBADF";
    case ERROR_INVALID_HANDLE:
      return "EBADF";
    case ERROR_LOCK_VIOLATION:
      return "EBUSY";
    case ERROR_PIPE_BUSY:
      return "EBUSY";
    case ERROR_SHARING_VIOLATION:
      return "EBUSY";
    case ERROR_OPERATION_ABORTED:
      return "ECANCELED";
    case WSAEINTR:
      return "ECANCELED";
    case ERROR_NO_UNICODE_TRANSLATION:
      return "ECHARSET";
    case ERROR_CONNECTION_ABORTED:
      return "ECONNABORTED";
    case WSAECONNABORTED:
      return "ECONNABORTED";
    case ERROR_CONNECTION_REFUSED:
      return "ECONNREFUSED";
    case WSAECONNREFUSED:
      return "ECONNREFUSED";
    case ERROR_NETNAME_DELETED:
      return "ECONNRESET";
    case WSAECONNRESET:
      return "ECONNRESET";
    case ERROR_ALREADY_EXISTS:
      return "EEXIST";
    case ERROR_FILE_EXISTS:
      return "EEXIST";
    case ERROR_BUFFER_OVERFLOW:
      return "EFAULT";
    case WSAEFAULT:
      return "EFAULT";
    case ERROR_HOST_UNREACHABLE:
      return "EHOSTUNREACH";
    case WSAEHOSTUNREACH:
      return "EHOSTUNREACH";
    case ERROR_INSUFFICIENT_BUFFER:
      return "EINVAL";
    case ERROR_INVALID_DATA:
      return "EINVAL";
    case ERROR_INVALID_NAME:
      return "EINVAL";
    case ERROR_INVALID_PARAMETER:
      return "EINVAL";
    case WSAEINVAL:
      return "EINVAL";
    case WSAEPFNOSUPPORT:
      return "EINVAL";
    case ERROR_BEGINNING_OF_MEDIA:
      return "EIO";
    case ERROR_BUS_RESET:
      return "EIO";
    case ERROR_CRC:
      return "EIO";
    case ERROR_DEVICE_DOOR_OPEN:
      return "EIO";
    case ERROR_DEVICE_REQUIRES_CLEANING:
      return "EIO";
    case ERROR_DISK_CORRUPT:
      return "EIO";
    case ERROR_EOM_OVERFLOW:
      return "EIO";
    case ERROR_FILEMARK_DETECTED:
      return "EIO";
    case ERROR_GEN_FAILURE:
      return "EIO";
    case ERROR_INVALID_BLOCK_LENGTH:
      return "EIO";
    case ERROR_IO_DEVICE:
      return "EIO";
    case ERROR_NO_DATA_DETECTED:
      return "EIO";
    case ERROR_NO_SIGNAL_SENT:
      return "EIO";
    case ERROR_OPEN_FAILED:
      return "EIO";
    case ERROR_SETMARK_DETECTED:
      return "EIO";
    case ERROR_SIGNAL_REFUSED:
      return "EIO";
    case WSAEISCONN:
      return "EISCONN";
    case ERROR_CANT_RESOLVE_FILENAME:
      return "ELOOP";
    case ERROR_TOO_MANY_OPEN_FILES:
      return "EMFILE";
    case WSAEMFILE:
      return "EMFILE";
    case WSAEMSGSIZE:
      return "EMSGSIZE";
    case ERROR_FILENAME_EXCED_RANGE:
      return "ENAMETOOLONG";
    case ERROR_NETWORK_UNREACHABLE:
      return "ENETUNREACH";
    case WSAENETUNREACH:
      return "ENETUNREACH";
    case WSAENOBUFS:
      return "ENOBUFS";
    case ERROR_BAD_PATHNAME:
      return "ENOENT";
    case ERROR_DIRECTORY:
      return "ENOTDIR";
    case ERROR_ENVVAR_NOT_FOUND:
      return "ENOENT";
    case ERROR_FILE_NOT_FOUND:
      return "ENOENT";
    case ERROR_INVALID_DRIVE:
      return "ENOENT";
    case ERROR_INVALID_REPARSE_DATA:
      return "ENOENT";
    case ERROR_MOD_NOT_FOUND:
      return "ENOENT";
    case ERROR_PATH_NOT_FOUND:
      return "ENOENT";
    case WSAHOST_NOT_FOUND:
      return "ENOENT";
    case WSANO_DATA:
      return "ENOENT";
    case ERROR_NOT_ENOUGH_MEMORY:
      return "ENOMEM";
    case ERROR_OUTOFMEMORY:
      return "ENOMEM";
    case ERROR_CANNOT_MAKE:
      return "ENOSPC";
    case ERROR_DISK_FULL:
      return "ENOSPC";
    case ERROR_EA_TABLE_FULL:
      return "ENOSPC";
    case ERROR_END_OF_MEDIA:
      return "ENOSPC";
    case ERROR_HANDLE_DISK_FULL:
      return "ENOSPC";
    case ERROR_NOT_CONNECTED:
      return "ENOTCONN";
    case WSAENOTCONN:
      return "ENOTCONN";
    case ERROR_DIR_NOT_EMPTY:
      return "ENOTEMPTY";
    case WSAENOTSOCK:
      return "ENOTSOCK";
    case ERROR_NOT_SUPPORTED:
      return "ENOTSUP";
    case ERROR_BROKEN_PIPE:
      return "EOF";
    case ERROR_PRIVILEGE_NOT_HELD:
      return "EPERM";
    case ERROR_BAD_PIPE:
      return "EPIPE";
    case ERROR_NO_DATA:
      return "EPIPE";
    case ERROR_PIPE_NOT_CONNECTED:
      return "EPIPE";
    case WSAESHUTDOWN:
      return "EPIPE";
    case WSAEPROTONOSUPPORT:
      return "EPROTONOSUPPORT";
    case ERROR_WRITE_PROTECT:
      return "EROFS";
    case ERROR_SEM_TIMEOUT:
      return "ETIMEDOUT";
    case WSAETIMEDOUT:
      return "ETIMEDOUT";
    case ERROR_NOT_SAME_DEVICE:
      return "EXDEV";
    case ERROR_INVALID_FUNCTION:
      return "EISDIR";
    case ERROR_META_EXPANSION_TOO_LONG:
      return "E2BIG";
    case WSAESOCKTNOSUPPORT:
      return "ESOCKTNOSUPPORT";
    default:
      return "UNKNOWN";
  }
}

// https://deno.land/std@0.177.0/node/internal_binding/uv.ts
var codeToErrorWindows = [
  [-4093, ["E2BIG", "argument list too long"]],
  [-4092, ["EACCES", "permission denied"]],
  [-4091, ["EADDRINUSE", "address already in use"]],
  [-4090, ["EADDRNOTAVAIL", "address not available"]],
  [-4089, ["EAFNOSUPPORT", "address family not supported"]],
  [-4088, ["EAGAIN", "resource temporarily unavailable"]],
  [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-4084, ["EALREADY", "connection already in progress"]],
  [-4083, ["EBADF", "bad file descriptor"]],
  [-4082, ["EBUSY", "resource busy or locked"]],
  [-4081, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-4079, ["ECONNABORTED", "software caused connection abort"]],
  [-4078, ["ECONNREFUSED", "connection refused"]],
  [-4077, ["ECONNRESET", "connection reset by peer"]],
  [-4076, ["EDESTADDRREQ", "destination address required"]],
  [-4075, ["EEXIST", "file already exists"]],
  [-4074, ["EFAULT", "bad address in system call argument"]],
  [-4036, ["EFBIG", "file too large"]],
  [-4073, ["EHOSTUNREACH", "host is unreachable"]],
  [-4072, ["EINTR", "interrupted system call"]],
  [-4071, ["EINVAL", "invalid argument"]],
  [-4070, ["EIO", "i/o error"]],
  [-4069, ["EISCONN", "socket is already connected"]],
  [-4068, ["EISDIR", "illegal operation on a directory"]],
  [-4067, ["ELOOP", "too many symbolic links encountered"]],
  [-4066, ["EMFILE", "too many open files"]],
  [-4065, ["EMSGSIZE", "message too long"]],
  [-4064, ["ENAMETOOLONG", "name too long"]],
  [-4063, ["ENETDOWN", "network is down"]],
  [-4062, ["ENETUNREACH", "network is unreachable"]],
  [-4061, ["ENFILE", "file table overflow"]],
  [-4060, ["ENOBUFS", "no buffer space available"]],
  [-4059, ["ENODEV", "no such device"]],
  [-4058, ["ENOENT", "no such file or directory"]],
  [-4057, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-4035, ["ENOPROTOOPT", "protocol not available"]],
  [-4055, ["ENOSPC", "no space left on device"]],
  [-4054, ["ENOSYS", "function not implemented"]],
  [-4053, ["ENOTCONN", "socket is not connected"]],
  [-4052, ["ENOTDIR", "not a directory"]],
  [-4051, ["ENOTEMPTY", "directory not empty"]],
  [-4050, ["ENOTSOCK", "socket operation on non-socket"]],
  [-4049, ["ENOTSUP", "operation not supported on socket"]],
  [-4048, ["EPERM", "operation not permitted"]],
  [-4047, ["EPIPE", "broken pipe"]],
  [-4046, ["EPROTO", "protocol error"]],
  [-4045, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-4044, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-4034, ["ERANGE", "result too large"]],
  [-4043, ["EROFS", "read-only file system"]],
  [-4042, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-4041, ["ESPIPE", "invalid seek"]],
  [-4040, ["ESRCH", "no such process"]],
  [-4039, ["ETIMEDOUT", "connection timed out"]],
  [-4038, ["ETXTBSY", "text file is busy"]],
  [-4037, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-4033, ["ENXIO", "no such device or address"]],
  [-4032, ["EMLINK", "too many links"]],
  [-4031, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-4029, ["ENOTTY", "inappropriate ioctl for device"]],
  [-4028, ["EFTYPE", "inappropriate file type or format"]],
  [-4027, ["EILSEQ", "illegal byte sequence"]]
];
var errorToCodeWindows = codeToErrorWindows.map(([status, [error]]) => [error, status]);
var codeToErrorDarwin = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-48, ["EADDRINUSE", "address already in use"]],
  [-49, ["EADDRNOTAVAIL", "address not available"]],
  [-47, ["EAFNOSUPPORT", "address family not supported"]],
  [-35, ["EAGAIN", "resource temporarily unavailable"]],
  [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-37, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-89, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-53, ["ECONNABORTED", "software caused connection abort"]],
  [-61, ["ECONNREFUSED", "connection refused"]],
  [-54, ["ECONNRESET", "connection reset by peer"]],
  [-39, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-65, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-56, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-62, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-40, ["EMSGSIZE", "message too long"]],
  [-63, ["ENAMETOOLONG", "name too long"]],
  [-50, ["ENETDOWN", "network is down"]],
  [-51, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-55, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-42, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-78, ["ENOSYS", "function not implemented"]],
  [-57, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-66, ["ENOTEMPTY", "directory not empty"]],
  [-38, ["ENOTSOCK", "socket operation on non-socket"]],
  [-45, ["ENOTSUP", "operation not supported on socket"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-100, ["EPROTO", "protocol error"]],
  [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-60, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-64, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-79, ["EFTYPE", "inappropriate file type or format"]],
  [-92, ["EILSEQ", "illegal byte sequence"]]
];
var errorToCodeDarwin = codeToErrorDarwin.map(([status, [code]]) => [code, status]);
var codeToErrorLinux = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-98, ["EADDRINUSE", "address already in use"]],
  [-99, ["EADDRNOTAVAIL", "address not available"]],
  [-97, ["EAFNOSUPPORT", "address family not supported"]],
  [-11, ["EAGAIN", "resource temporarily unavailable"]],
  [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-114, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-125, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-103, ["ECONNABORTED", "software caused connection abort"]],
  [-111, ["ECONNREFUSED", "connection refused"]],
  [-104, ["ECONNRESET", "connection reset by peer"]],
  [-89, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-113, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-106, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-40, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-90, ["EMSGSIZE", "message too long"]],
  [-36, ["ENAMETOOLONG", "name too long"]],
  [-100, ["ENETDOWN", "network is down"]],
  [-101, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-105, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-64, ["ENONET", "machine is not on the network"]],
  [-92, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-38, ["ENOSYS", "function not implemented"]],
  [-107, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-39, ["ENOTEMPTY", "directory not empty"]],
  [-88, ["ENOTSOCK", "socket operation on non-socket"]],
  [-95, ["ENOTSUP", "operation not supported on socket"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-71, ["EPROTO", "protocol error"]],
  [-93, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-91, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-108, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-110, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-112, ["EHOSTDOWN", "host is down"]],
  [-121, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-4028, ["EFTYPE", "inappropriate file type or format"]],
  [-84, ["EILSEQ", "illegal byte sequence"]]
];
var errorToCodeLinux = codeToErrorLinux.map(([status, [code]]) => [code, status]);
var codeToErrorFreebsd = [
  [-7, ["E2BIG", "argument list too long"]],
  [-13, ["EACCES", "permission denied"]],
  [-48, ["EADDRINUSE", "address already in use"]],
  [-49, ["EADDRNOTAVAIL", "address not available"]],
  [-47, ["EAFNOSUPPORT", "address family not supported"]],
  [-35, ["EAGAIN", "resource temporarily unavailable"]],
  [-3e3, ["EAI_ADDRFAMILY", "address family not supported"]],
  [-3001, ["EAI_AGAIN", "temporary failure"]],
  [-3002, ["EAI_BADFLAGS", "bad ai_flags value"]],
  [-3013, ["EAI_BADHINTS", "invalid value for hints"]],
  [-3003, ["EAI_CANCELED", "request canceled"]],
  [-3004, ["EAI_FAIL", "permanent failure"]],
  [-3005, ["EAI_FAMILY", "ai_family not supported"]],
  [-3006, ["EAI_MEMORY", "out of memory"]],
  [-3007, ["EAI_NODATA", "no address"]],
  [-3008, ["EAI_NONAME", "unknown node or service"]],
  [-3009, ["EAI_OVERFLOW", "argument buffer overflow"]],
  [-3014, ["EAI_PROTOCOL", "resolved protocol is unknown"]],
  [-3010, ["EAI_SERVICE", "service not available for socket type"]],
  [-3011, ["EAI_SOCKTYPE", "socket type not supported"]],
  [-37, ["EALREADY", "connection already in progress"]],
  [-9, ["EBADF", "bad file descriptor"]],
  [-16, ["EBUSY", "resource busy or locked"]],
  [-85, ["ECANCELED", "operation canceled"]],
  [-4080, ["ECHARSET", "invalid Unicode character"]],
  [-53, ["ECONNABORTED", "software caused connection abort"]],
  [-61, ["ECONNREFUSED", "connection refused"]],
  [-54, ["ECONNRESET", "connection reset by peer"]],
  [-39, ["EDESTADDRREQ", "destination address required"]],
  [-17, ["EEXIST", "file already exists"]],
  [-14, ["EFAULT", "bad address in system call argument"]],
  [-27, ["EFBIG", "file too large"]],
  [-65, ["EHOSTUNREACH", "host is unreachable"]],
  [-4, ["EINTR", "interrupted system call"]],
  [-22, ["EINVAL", "invalid argument"]],
  [-5, ["EIO", "i/o error"]],
  [-56, ["EISCONN", "socket is already connected"]],
  [-21, ["EISDIR", "illegal operation on a directory"]],
  [-62, ["ELOOP", "too many symbolic links encountered"]],
  [-24, ["EMFILE", "too many open files"]],
  [-40, ["EMSGSIZE", "message too long"]],
  [-63, ["ENAMETOOLONG", "name too long"]],
  [-50, ["ENETDOWN", "network is down"]],
  [-51, ["ENETUNREACH", "network is unreachable"]],
  [-23, ["ENFILE", "file table overflow"]],
  [-55, ["ENOBUFS", "no buffer space available"]],
  [-19, ["ENODEV", "no such device"]],
  [-2, ["ENOENT", "no such file or directory"]],
  [-12, ["ENOMEM", "not enough memory"]],
  [-4056, ["ENONET", "machine is not on the network"]],
  [-42, ["ENOPROTOOPT", "protocol not available"]],
  [-28, ["ENOSPC", "no space left on device"]],
  [-78, ["ENOSYS", "function not implemented"]],
  [-57, ["ENOTCONN", "socket is not connected"]],
  [-20, ["ENOTDIR", "not a directory"]],
  [-66, ["ENOTEMPTY", "directory not empty"]],
  [-38, ["ENOTSOCK", "socket operation on non-socket"]],
  [-45, ["ENOTSUP", "operation not supported on socket"]],
  [-84, ["EOVERFLOW", "value too large for defined data type"]],
  [-1, ["EPERM", "operation not permitted"]],
  [-32, ["EPIPE", "broken pipe"]],
  [-92, ["EPROTO", "protocol error"]],
  [-43, ["EPROTONOSUPPORT", "protocol not supported"]],
  [-41, ["EPROTOTYPE", "protocol wrong type for socket"]],
  [-34, ["ERANGE", "result too large"]],
  [-30, ["EROFS", "read-only file system"]],
  [-58, ["ESHUTDOWN", "cannot send after transport endpoint shutdown"]],
  [-29, ["ESPIPE", "invalid seek"]],
  [-3, ["ESRCH", "no such process"]],
  [-60, ["ETIMEDOUT", "connection timed out"]],
  [-26, ["ETXTBSY", "text file is busy"]],
  [-18, ["EXDEV", "cross-device link not permitted"]],
  [-4094, ["UNKNOWN", "unknown error"]],
  [-4095, ["EOF", "end of file"]],
  [-6, ["ENXIO", "no such device or address"]],
  [-31, ["EMLINK", "too many links"]],
  [-64, ["EHOSTDOWN", "host is down"]],
  [-4030, ["EREMOTEIO", "remote I/O error"]],
  [-25, ["ENOTTY", "inappropriate ioctl for device"]],
  [-79, ["EFTYPE", "inappropriate file type or format"]],
  [-86, ["EILSEQ", "illegal byte sequence"]],
  [-44, ["ESOCKTNOSUPPORT", "socket type not supported"]]
];
var errorToCodeFreebsd = codeToErrorFreebsd.map(([status, [code]]) => [code, status]);
var errorMap = new Map(
  osType === "windows" ? codeToErrorWindows : osType === "darwin" ? codeToErrorDarwin : osType === "linux" ? codeToErrorLinux : osType === "freebsd" ? codeToErrorFreebsd : unreachable()
);
var codeMap = new Map(
  osType === "windows" ? errorToCodeWindows : osType === "darwin" ? errorToCodeDarwin : osType === "linux" ? errorToCodeLinux : osType === "freebsd" ? errorToCodeFreebsd : unreachable()
);
function mapSysErrnoToUvErrno(sysErrno) {
  if (osType === "windows") {
    const code = uvTranslateSysError(sysErrno);
    return codeMap.get(code) ?? -sysErrno;
  } else {
    return -sysErrno;
  }
}
var UV_EAI_MEMORY = codeMap.get("EAI_MEMORY");
var UV_EBADF = codeMap.get("EBADF");
var UV_EEXIST = codeMap.get("EEXIST");
var UV_EINVAL = codeMap.get("EINVAL");
var UV_ENOENT = codeMap.get("ENOENT");
var UV_ENOTSOCK = codeMap.get("ENOTSOCK");
var UV_UNKNOWN = codeMap.get("UNKNOWN");

// https://deno.land/std@0.177.0/node/_utils.ts
function notImplemented(msg) {
  const message = msg ? `Not implemented: ${msg}` : "Not implemented";
  throw new Error(message);
}
function warnNotImplemented(msg) {
  const message = msg ? `Warning: Not implemented: ${msg}` : "Warning: Not implemented";
  console.warn(message);
}
function intoCallbackAPIWithIntercept(func, interceptor, cb, ...args) {
  func(...args).then(
    (value) => cb && cb(null, interceptor(value)),
    (err) => cb && cb(err)
  );
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}
function normalizeEncoding2(enc) {
  if (enc == null || enc === "utf8" || enc === "utf-8")
    return "utf8";
  return slowCases2(enc);
}
function slowCases2(enc) {
  switch (enc.length) {
    case 4:
      if (enc === "UTF8")
        return "utf8";
      if (enc === "ucs2" || enc === "UCS2")
        return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf8")
        return "utf8";
      if (enc === "ucs2")
        return "utf16le";
      break;
    case 3:
      if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
        return "hex";
      }
      break;
    case 5:
      if (enc === "ascii")
        return "ascii";
      if (enc === "ucs-2")
        return "utf16le";
      if (enc === "UTF-8")
        return "utf8";
      if (enc === "ASCII")
        return "ascii";
      if (enc === "UCS-2")
        return "utf16le";
      enc = `${enc}`.toLowerCase();
      if (enc === "utf-8")
        return "utf8";
      if (enc === "ascii")
        return "ascii";
      if (enc === "ucs-2")
        return "utf16le";
      break;
    case 6:
      if (enc === "base64")
        return "base64";
      if (enc === "latin1" || enc === "binary")
        return "latin1";
      if (enc === "BASE64")
        return "base64";
      if (enc === "LATIN1" || enc === "BINARY")
        return "latin1";
      enc = `${enc}`.toLowerCase();
      if (enc === "base64")
        return "base64";
      if (enc === "latin1" || enc === "binary")
        return "latin1";
      break;
    case 7:
      if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
        return "utf16le";
      }
      break;
    case 8:
      if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
        return "utf16le";
      }
      break;
    default:
      if (enc === "")
        return "utf8";
  }
}
var NumberIsSafeInteger = Number.isSafeInteger;
function getSystemErrorName(code) {
  if (typeof code !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE("err", "number", code);
  }
  if (code >= 0 || !NumberIsSafeInteger(code)) {
    throw new codes.ERR_OUT_OF_RANGE("err", "a negative integer", code);
  }
  return errorMap.get(code)?.[0];
}

// https://deno.land/std@0.177.0/node/_fs/_fs_common.ts
function isFileOptions(fileOptions) {
  if (!fileOptions)
    return false;
  return fileOptions.encoding != void 0 || fileOptions.flag != void 0 || fileOptions.signal != void 0 || fileOptions.mode != void 0;
}
function getEncoding(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  }
  const encoding = typeof optOrCallback === "string" ? optOrCallback : optOrCallback.encoding;
  if (!encoding)
    return null;
  return encoding;
}
function checkEncoding(encoding) {
  if (!encoding)
    return null;
  encoding = encoding.toLowerCase();
  if (["utf8", "hex", "base64"].includes(encoding))
    return encoding;
  if (encoding === "utf-8") {
    return "utf8";
  }
  if (encoding === "binary") {
    return "binary";
  }
  const notImplementedEncodings = ["utf16le", "latin1", "ascii", "ucs2"];
  if (notImplementedEncodings.includes(encoding)) {
    notImplemented(`"${encoding}" encoding`);
  }
  throw new Error(`The value "${encoding}" is invalid for option "encoding"`);
}
function getOpenOptions(flag) {
  if (!flag) {
    return { create: true, append: true };
  }
  let openOptions = {};
  if (typeof flag === "string") {
    switch (flag) {
      case "a": {
        openOptions = { create: true, append: true };
        break;
      }
      case "ax":
      case "xa": {
        openOptions = { createNew: true, write: true, append: true };
        break;
      }
      case "a+": {
        openOptions = { read: true, create: true, append: true };
        break;
      }
      case "ax+":
      case "xa+": {
        openOptions = { read: true, createNew: true, append: true };
        break;
      }
      case "r": {
        openOptions = { read: true };
        break;
      }
      case "r+": {
        openOptions = { read: true, write: true };
        break;
      }
      case "w": {
        openOptions = { create: true, write: true, truncate: true };
        break;
      }
      case "wx":
      case "xw": {
        openOptions = { createNew: true, write: true };
        break;
      }
      case "w+": {
        openOptions = { create: true, write: true, truncate: true, read: true };
        break;
      }
      case "wx+":
      case "xw+": {
        openOptions = { createNew: true, write: true, read: true };
        break;
      }
      case "as":
      case "sa": {
        openOptions = { create: true, append: true };
        break;
      }
      case "as+":
      case "sa+": {
        openOptions = { create: true, read: true, append: true };
        break;
      }
      case "rs+":
      case "sr+": {
        openOptions = { create: true, read: true, write: true };
        break;
      }
      default: {
        throw new Error(`Unrecognized file system flag: ${flag}`);
      }
    }
  } else if (typeof flag === "number") {
    if ((flag & O_APPEND) === O_APPEND) {
      openOptions.append = true;
    }
    if ((flag & O_CREAT) === O_CREAT) {
      openOptions.create = true;
      openOptions.write = true;
    }
    if ((flag & O_EXCL) === O_EXCL) {
      openOptions.createNew = true;
      openOptions.read = true;
      openOptions.write = true;
    }
    if ((flag & O_TRUNC) === O_TRUNC) {
      openOptions.truncate = true;
    }
    if ((flag & O_RDONLY) === O_RDONLY) {
      openOptions.read = true;
    }
    if ((flag & O_WRONLY) === O_WRONLY) {
      openOptions.write = true;
    }
    if ((flag & O_RDWR) === O_RDWR) {
      openOptions.read = true;
      openOptions.write = true;
    }
  }
  return openOptions;
}
function maybeCallback(cb) {
  validateFunction(cb, "cb");
  return cb;
}
function makeCallback(cb) {
  validateFunction(cb, "cb");
  return (...args) => Reflect.apply(cb, this, args);
}

// https://deno.land/std@0.177.0/node/internal_binding/string_decoder.ts
var string_decoder_exports = {};
__export(string_decoder_exports, {
  default: () => string_decoder_default,
  encodings: () => encodings
});

// https://deno.land/std@0.177.0/node/internal_binding/_node.ts
var Encodings2 = /* @__PURE__ */ ((Encodings3) => {
  Encodings3[Encodings3["ASCII"] = 0] = "ASCII";
  Encodings3[Encodings3["UTF8"] = 1] = "UTF8";
  Encodings3[Encodings3["BASE64"] = 2] = "BASE64";
  Encodings3[Encodings3["UCS2"] = 3] = "UCS2";
  Encodings3[Encodings3["BINARY"] = 4] = "BINARY";
  Encodings3[Encodings3["HEX"] = 5] = "HEX";
  Encodings3[Encodings3["BUFFER"] = 6] = "BUFFER";
  Encodings3[Encodings3["BASE64URL"] = 7] = "BASE64URL";
  Encodings3[Encodings3["LATIN1"] = 4] = "LATIN1";
  return Encodings3;
})(Encodings2 || {});

// https://deno.land/std@0.177.0/node/internal_binding/string_decoder.ts
var encodings = [];
encodings[0 /* ASCII */] = "ascii";
encodings[2 /* BASE64 */] = "base64";
encodings[7 /* BASE64URL */] = "base64url";
encodings[6 /* BUFFER */] = "buffer";
encodings[5 /* HEX */] = "hex";
encodings[4 /* LATIN1 */] = "latin1";
encodings[3 /* UCS2 */] = "utf16le";
encodings[1 /* UTF8 */] = "utf8";
var string_decoder_default = { encodings };

// https://deno.land/std@0.177.0/node/internal_binding/buffer.ts
var buffer_exports = {};
__export(buffer_exports, {
  default: () => buffer_default,
  indexOfBuffer: () => indexOfBuffer,
  indexOfNumber: () => indexOfNumber,
  numberToBytes: () => numberToBytes
});

// https://deno.land/std@0.177.0/bytes/index_of_needle.ts
function indexOfNeedle(source, needle, start = 0) {
  if (start >= source.length) {
    return -1;
  }
  if (start < 0) {
    start = Math.max(0, source.length + start);
  }
  const s = needle[0];
  for (let i = start; i < source.length; i++) {
    if (source[i] !== s)
      continue;
    const pin = i;
    let matched = 1;
    let j2 = i;
    while (matched < needle.length) {
      j2++;
      if (source[j2] !== needle[j2 - pin]) {
        break;
      }
      matched++;
    }
    if (matched === needle.length) {
      return pin;
    }
  }
  return -1;
}

// https://deno.land/std@0.177.0/node/internal_binding/buffer.ts
function numberToBytes(n) {
  if (n === 0)
    return new Uint8Array([0]);
  const bytes = [];
  bytes.unshift(n & 255);
  while (n >= 256) {
    n = n >>> 8;
    bytes.unshift(n & 255);
  }
  return new Uint8Array(bytes);
}
function findLastIndex(targetBuffer, buffer, offset) {
  offset = offset > targetBuffer.length ? targetBuffer.length : offset;
  const searchableBuffer = targetBuffer.slice(0, offset + buffer.length);
  const searchableBufferLastIndex = searchableBuffer.length - 1;
  const bufferLastIndex = buffer.length - 1;
  let lastMatchIndex = -1;
  let matches = 0;
  let index = -1;
  for (let x = 0; x <= searchableBufferLastIndex; x++) {
    if (searchableBuffer[searchableBufferLastIndex - x] === buffer[bufferLastIndex - matches]) {
      if (lastMatchIndex === -1) {
        lastMatchIndex = x;
      }
      matches++;
    } else {
      matches = 0;
      if (lastMatchIndex !== -1) {
        x = lastMatchIndex + 1;
        lastMatchIndex = -1;
      }
      continue;
    }
    if (matches === buffer.length) {
      index = x;
      break;
    }
  }
  if (index === -1)
    return index;
  return searchableBufferLastIndex - index;
}
function indexOfBuffer(targetBuffer, buffer, byteOffset, encoding, forwardDirection) {
  if (!Encodings2[encoding] === void 0) {
    throw new Error(`Unknown encoding code ${encoding}`);
  }
  if (!forwardDirection) {
    if (byteOffset < 0) {
      byteOffset = targetBuffer.length + byteOffset;
    }
    if (buffer.length === 0) {
      return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
    }
    return findLastIndex(targetBuffer, buffer, byteOffset);
  }
  if (buffer.length === 0) {
    return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
  }
  return indexOfNeedle(targetBuffer, buffer, byteOffset);
}
function indexOfNumber(targetBuffer, number, byteOffset, forwardDirection) {
  const bytes = numberToBytes(number);
  if (bytes.length > 1) {
    throw new Error("Multi byte number search is not supported");
  }
  return indexOfBuffer(
    targetBuffer,
    numberToBytes(number),
    byteOffset,
    1 /* UTF8 */,
    forwardDirection
  );
}
var buffer_default = { indexOfBuffer, indexOfNumber };

// https://deno.land/std@0.177.0/encoding/base64.ts
var base64abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/"
];
function encode(data) {
  const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
  let result = "", i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 3) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 15) << 2 | uint8[i] >> 6];
    result += base64abc[uint8[i] & 63];
  }
  if (i === l + 1) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 3) << 4 | uint8[i - 1] >> 4];
    result += base64abc[(uint8[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
function decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

// https://deno.land/std@0.177.0/encoding/base64url.ts
function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2)
    return base64url + "==";
  if (base64url.length % 4 === 3)
    return base64url + "=";
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string!");
  }
  return base64url;
}
function convertBase64urlToBase64(b64url) {
  if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
    throw new TypeError("Failed to decode base64url: invalid character");
  }
  return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(b64) {
  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function encode2(data) {
  return convertBase64ToBase64url(encode(data));
}
function decode2(b64url) {
  return decode(convertBase64urlToBase64(b64url));
}

// https://deno.land/std@0.177.0/node/internal_binding/_utils.ts
function asciiToBytes(str) {
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    byteArray.push(str.charCodeAt(i) & 255);
  }
  return new Uint8Array(byteArray);
}
function base64ToBytes(str) {
  str = base64clean(str);
  str = str.replaceAll("-", "+").replaceAll("_", "/");
  return decode(str);
}
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
  str = str.split("=")[0];
  str = str.trim().replace(INVALID_BASE64_RE, "");
  if (str.length < 2)
    return "";
  while (str.length % 4 !== 0) {
    str = str + "=";
  }
  return str;
}
function base64UrlToBytes(str) {
  str = base64clean(str);
  str = str.replaceAll("+", "-").replaceAll("/", "_");
  return decode2(str);
}
function hexToBytes(str) {
  const byteArray = new Uint8Array(Math.floor((str || "").length / 2));
  let i;
  for (i = 0; i < byteArray.length; i++) {
    const a = Number.parseInt(str[i * 2], 16);
    const b = Number.parseInt(str[i * 2 + 1], 16);
    if (Number.isNaN(a) && Number.isNaN(b)) {
      break;
    }
    byteArray[i] = a << 4 | b;
  }
  return new Uint8Array(
    i === byteArray.length ? byteArray : byteArray.slice(0, i)
  );
}
function utf16leToBytes(str, units) {
  let c, hi2, lo;
  const byteArray = [];
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) {
      break;
    }
    c = str.charCodeAt(i);
    hi2 = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi2);
  }
  return new Uint8Array(byteArray);
}
function bytesToAscii(bytes) {
  let ret = "";
  for (let i = 0; i < bytes.length; ++i) {
    ret += String.fromCharCode(bytes[i] & 127);
  }
  return ret;
}
function bytesToUtf16le(bytes) {
  let res = "";
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

// https://deno.land/std@0.177.0/node/internal/primordials.mjs
var ArrayIsArray = Array.isArray;
var ObjectPrototypeHasOwnProperty = Object.hasOwn;
var RegExpPrototypeExec = RegExp.prototype.exec;
var StringFromCharCode = String.fromCharCode;

// https://deno.land/std@0.177.0/node/internal_binding/util.ts
var util_exports = {};
__export(util_exports, {
  ALL_PROPERTIES: () => ALL_PROPERTIES,
  ONLY_CONFIGURABLE: () => ONLY_CONFIGURABLE,
  ONLY_ENUMERABLE: () => ONLY_ENUMERABLE,
  ONLY_ENUM_WRITABLE: () => ONLY_ENUM_WRITABLE,
  ONLY_WRITABLE: () => ONLY_WRITABLE,
  SKIP_STRINGS: () => SKIP_STRINGS,
  SKIP_SYMBOLS: () => SKIP_SYMBOLS,
  getOwnNonIndexProperties: () => getOwnNonIndexProperties,
  guessHandleType: () => guessHandleType,
  isArrayIndex: () => isArrayIndex
});
function guessHandleType(_fd) {
  notImplemented("util.guessHandleType");
}
var ALL_PROPERTIES = 0;
var ONLY_WRITABLE = 1;
var ONLY_ENUMERABLE = 2;
var ONLY_CONFIGURABLE = 4;
var ONLY_ENUM_WRITABLE = 6;
var SKIP_STRINGS = 8;
var SKIP_SYMBOLS = 16;
var isNumericLookup = {};
function isArrayIndex(value) {
  switch (typeof value) {
    case "number":
      return value >= 0 && (value | 0) === value;
    case "string": {
      const result = isNumericLookup[value];
      if (result !== void 0) {
        return result;
      }
      const length = value.length;
      if (length === 0) {
        return isNumericLookup[value] = false;
      }
      let ch = 0;
      let i = 0;
      for (; i < length; ++i) {
        ch = value.charCodeAt(i);
        if (i === 0 && ch === 48 && length > 1 || ch < 48 || ch > 57) {
          return isNumericLookup[value] = false;
        }
      }
      return isNumericLookup[value] = true;
    }
    default:
      return false;
  }
}
function getOwnNonIndexProperties(obj, filter) {
  let allProperties = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];
  if (Array.isArray(obj)) {
    allProperties = allProperties.filter((k) => !isArrayIndex(k));
  }
  if (filter === ALL_PROPERTIES) {
    return allProperties;
  }
  const result = [];
  for (const key of allProperties) {
    const desc = Object.getOwnPropertyDescriptor(obj, key);
    if (desc === void 0) {
      continue;
    }
    if (filter & ONLY_WRITABLE && !desc.writable) {
      continue;
    }
    if (filter & ONLY_ENUMERABLE && !desc.enumerable) {
      continue;
    }
    if (filter & ONLY_CONFIGURABLE && !desc.configurable) {
      continue;
    }
    if (filter & SKIP_STRINGS && typeof key === "string") {
      continue;
    }
    if (filter & SKIP_SYMBOLS && typeof key === "symbol") {
      continue;
    }
    result.push(key);
  }
  return result;
}

// https://deno.land/std@0.177.0/node/internal/util/inspect.mjs
var kObjectType = 0;
var kArrayType = 1;
var kArrayExtrasType = 2;
var kMinLineLength = 16;
var kWeak = 0;
var kIterator = 1;
var kMapEntries = 2;
var kPending = 0;
var kRejected = 2;
var meta = [
  "\\x00",
  "\\x01",
  "\\x02",
  "\\x03",
  "\\x04",
  "\\x05",
  "\\x06",
  "\\x07",
  // x07
  "\\b",
  "\\t",
  "\\n",
  "\\x0B",
  "\\f",
  "\\r",
  "\\x0E",
  "\\x0F",
  // x0F
  "\\x10",
  "\\x11",
  "\\x12",
  "\\x13",
  "\\x14",
  "\\x15",
  "\\x16",
  "\\x17",
  // x17
  "\\x18",
  "\\x19",
  "\\x1A",
  "\\x1B",
  "\\x1C",
  "\\x1D",
  "\\x1E",
  "\\x1F",
  // x1F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\'",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // x2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // x3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // x4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // x5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // x6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\x7F",
  // x7F
  "\\x80",
  "\\x81",
  "\\x82",
  "\\x83",
  "\\x84",
  "\\x85",
  "\\x86",
  "\\x87",
  // x87
  "\\x88",
  "\\x89",
  "\\x8A",
  "\\x8B",
  "\\x8C",
  "\\x8D",
  "\\x8E",
  "\\x8F",
  // x8F
  "\\x90",
  "\\x91",
  "\\x92",
  "\\x93",
  "\\x94",
  "\\x95",
  "\\x96",
  "\\x97",
  // x97
  "\\x98",
  "\\x99",
  "\\x9A",
  "\\x9B",
  "\\x9C",
  "\\x9D",
  "\\x9E",
  "\\x9F"
  // x9F
];
var isUndetectableObject = (v2) => typeof v2 === "undefined" && v2 !== void 0;
var strEscapeSequencesRegExp = /[\x00-\x1f\x27\x5c\x7f-\x9f]/;
var strEscapeSequencesReplacer = /[\x00-\x1f\x27\x5c\x7f-\x9f]/g;
var strEscapeSequencesRegExpSingle = /[\x00-\x1f\x5c\x7f-\x9f]/;
var strEscapeSequencesReplacerSingle = /[\x00-\x1f\x5c\x7f-\x9f]/g;
var keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
var numberRegExp = /^(0|[1-9][0-9]*)$/;
var nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
var classRegExp = /^(\s+[^(]*?)\s*{/;
var stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;
var inspectDefaultOptions = {
  showHidden: false,
  depth: 2,
  colors: false,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  maxStringLength: 1e4,
  breakLength: 80,
  compact: 3,
  sorted: false,
  getters: false
};
function getUserOptions(ctx, isCrossContext) {
  const ret = {
    stylize: ctx.stylize,
    showHidden: ctx.showHidden,
    depth: ctx.depth,
    colors: ctx.colors,
    customInspect: ctx.customInspect,
    showProxy: ctx.showProxy,
    maxArrayLength: ctx.maxArrayLength,
    maxStringLength: ctx.maxStringLength,
    breakLength: ctx.breakLength,
    compact: ctx.compact,
    sorted: ctx.sorted,
    getters: ctx.getters,
    ...ctx.userOptions
  };
  if (isCrossContext) {
    Object.setPrototypeOf(ret, null);
    for (const key of Object.keys(ret)) {
      if ((typeof ret[key] === "object" || typeof ret[key] === "function") && ret[key] !== null) {
        delete ret[key];
      }
    }
    ret.stylize = Object.setPrototypeOf((value, flavour) => {
      let stylized;
      try {
        stylized = `${ctx.stylize(value, flavour)}`;
      } catch {
      }
      if (typeof stylized !== "string")
        return value;
      return stylized;
    }, null);
  }
  return ret;
}
function inspect(value, opts) {
  const ctx = {
    budget: {},
    indentationLvl: 0,
    seen: [],
    currentDepth: 0,
    stylize: stylizeNoColor,
    showHidden: inspectDefaultOptions.showHidden,
    depth: inspectDefaultOptions.depth,
    colors: inspectDefaultOptions.colors,
    customInspect: inspectDefaultOptions.customInspect,
    showProxy: inspectDefaultOptions.showProxy,
    maxArrayLength: inspectDefaultOptions.maxArrayLength,
    maxStringLength: inspectDefaultOptions.maxStringLength,
    breakLength: inspectDefaultOptions.breakLength,
    compact: inspectDefaultOptions.compact,
    sorted: inspectDefaultOptions.sorted,
    getters: inspectDefaultOptions.getters
  };
  if (arguments.length > 1) {
    if (arguments.length > 2) {
      if (arguments[2] !== void 0) {
        ctx.depth = arguments[2];
      }
      if (arguments.length > 3 && arguments[3] !== void 0) {
        ctx.colors = arguments[3];
      }
    }
    if (typeof opts === "boolean") {
      ctx.showHidden = opts;
    } else if (opts) {
      const optKeys = Object.keys(opts);
      for (let i = 0; i < optKeys.length; ++i) {
        const key = optKeys[i];
        if (
          // deno-lint-ignore no-prototype-builtins
          inspectDefaultOptions.hasOwnProperty(key) || key === "stylize"
        ) {
          ctx[key] = opts[key];
        } else if (ctx.userOptions === void 0) {
          ctx.userOptions = opts;
        }
      }
    }
  }
  if (ctx.colors)
    ctx.stylize = stylizeWithColor;
  if (ctx.maxArrayLength === null)
    ctx.maxArrayLength = Infinity;
  if (ctx.maxStringLength === null)
    ctx.maxStringLength = Infinity;
  return formatValue(ctx, value, 0);
}
var customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
inspect.custom = customInspectSymbol;
Object.defineProperty(inspect, "defaultOptions", {
  get() {
    return inspectDefaultOptions;
  },
  set(options) {
    validateObject(options, "options");
    return Object.assign(inspectDefaultOptions, options);
  }
});
var defaultFG = 39;
var defaultBG = 49;
inspect.colors = Object.assign(/* @__PURE__ */ Object.create(null), {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  // Alias: faint
  italic: [3, 23],
  underline: [4, 24],
  blink: [5, 25],
  // Swap foreground and background colors
  inverse: [7, 27],
  // Alias: swapcolors, swapColors
  hidden: [8, 28],
  // Alias: conceal
  strikethrough: [9, 29],
  // Alias: strikeThrough, crossedout, crossedOut
  doubleunderline: [21, 24],
  // Alias: doubleUnderline
  black: [30, defaultFG],
  red: [31, defaultFG],
  green: [32, defaultFG],
  yellow: [33, defaultFG],
  blue: [34, defaultFG],
  magenta: [35, defaultFG],
  cyan: [36, defaultFG],
  white: [37, defaultFG],
  bgBlack: [40, defaultBG],
  bgRed: [41, defaultBG],
  bgGreen: [42, defaultBG],
  bgYellow: [43, defaultBG],
  bgBlue: [44, defaultBG],
  bgMagenta: [45, defaultBG],
  bgCyan: [46, defaultBG],
  bgWhite: [47, defaultBG],
  framed: [51, 54],
  overlined: [53, 55],
  gray: [90, defaultFG],
  // Alias: grey, blackBright
  redBright: [91, defaultFG],
  greenBright: [92, defaultFG],
  yellowBright: [93, defaultFG],
  blueBright: [94, defaultFG],
  magentaBright: [95, defaultFG],
  cyanBright: [96, defaultFG],
  whiteBright: [97, defaultFG],
  bgGray: [100, defaultBG],
  // Alias: bgGrey, bgBlackBright
  bgRedBright: [101, defaultBG],
  bgGreenBright: [102, defaultBG],
  bgYellowBright: [103, defaultBG],
  bgBlueBright: [104, defaultBG],
  bgMagentaBright: [105, defaultBG],
  bgCyanBright: [106, defaultBG],
  bgWhiteBright: [107, defaultBG]
});
function defineColorAlias(target, alias) {
  Object.defineProperty(inspect.colors, alias, {
    get() {
      return this[target];
    },
    set(value) {
      this[target] = value;
    },
    configurable: true,
    enumerable: false
  });
}
defineColorAlias("gray", "grey");
defineColorAlias("gray", "blackBright");
defineColorAlias("bgGray", "bgGrey");
defineColorAlias("bgGray", "bgBlackBright");
defineColorAlias("dim", "faint");
defineColorAlias("strikethrough", "crossedout");
defineColorAlias("strikethrough", "strikeThrough");
defineColorAlias("strikethrough", "crossedOut");
defineColorAlias("hidden", "conceal");
defineColorAlias("inverse", "swapColors");
defineColorAlias("inverse", "swapcolors");
defineColorAlias("doubleunderline", "doubleUnderline");
inspect.styles = Object.assign(/* @__PURE__ */ Object.create(null), {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  // "name": intentionally not styling
  // TODO(BridgeAR): Highlight regular expressions properly.
  regexp: "red",
  module: "underline"
});
function addQuotes(str, quotes) {
  if (quotes === -1) {
    return `"${str}"`;
  }
  if (quotes === -2) {
    return `\`${str}\``;
  }
  return `'${str}'`;
}
var escapeFn = (str) => meta[str.charCodeAt(0)];
function strEscape(str) {
  let escapeTest = strEscapeSequencesRegExp;
  let escapeReplace = strEscapeSequencesReplacer;
  let singleQuote = 39;
  if (str.includes("'")) {
    if (!str.includes('"')) {
      singleQuote = -1;
    } else if (!str.includes("`") && !str.includes("${")) {
      singleQuote = -2;
    }
    if (singleQuote !== 39) {
      escapeTest = strEscapeSequencesRegExpSingle;
      escapeReplace = strEscapeSequencesReplacerSingle;
    }
  }
  if (str.length < 5e3 && !escapeTest.test(str)) {
    return addQuotes(str, singleQuote);
  }
  if (str.length > 100) {
    str = str.replace(escapeReplace, escapeFn);
    return addQuotes(str, singleQuote);
  }
  let result = "";
  let last = 0;
  const lastIndex = str.length;
  for (let i = 0; i < lastIndex; i++) {
    const point = str.charCodeAt(i);
    if (point === singleQuote || point === 92 || point < 32 || point > 126 && point < 160) {
      if (last === i) {
        result += meta[point];
      } else {
        result += `${str.slice(last, i)}${meta[point]}`;
      }
      last = i + 1;
    }
  }
  if (last !== lastIndex) {
    result += str.slice(last);
  }
  return addQuotes(result, singleQuote);
}
function stylizeWithColor(str, styleType) {
  const style = inspect.styles[styleType];
  if (style !== void 0) {
    const color = inspect.colors[style];
    if (color !== void 0) {
      return `\x1B[${color[0]}m${str}\x1B[${color[1]}m`;
    }
  }
  return str;
}
function stylizeNoColor(str) {
  return str;
}
function formatValue(ctx, value, recurseTimes, typedArray) {
  if (typeof value !== "object" && typeof value !== "function" && !isUndetectableObject(value)) {
    return formatPrimitive(ctx.stylize, value, ctx);
  }
  if (value === null) {
    return ctx.stylize("null", "null");
  }
  const context = value;
  const proxy = void 0;
  if (ctx.customInspect) {
    const maybeCustom = value[customInspectSymbol];
    if (typeof maybeCustom === "function" && // Filter out the util module, its inspect function is special.
    maybeCustom !== inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
      const isCrossContext = proxy !== void 0 || !(context instanceof Object);
      const ret = maybeCustom.call(
        context,
        depth,
        getUserOptions(ctx, isCrossContext)
      );
      if (ret !== context) {
        if (typeof ret !== "string") {
          return formatValue(ctx, ret, recurseTimes);
        }
        return ret.replace(/\n/g, `
${" ".repeat(ctx.indentationLvl)}`);
      }
    }
  }
  if (ctx.seen.includes(value)) {
    let index = 1;
    if (ctx.circular === void 0) {
      ctx.circular = /* @__PURE__ */ new Map();
      ctx.circular.set(value, index);
    } else {
      index = ctx.circular.get(value);
      if (index === void 0) {
        index = ctx.circular.size + 1;
        ctx.circular.set(value, index);
      }
    }
    return ctx.stylize(`[Circular *${index}]`, "special");
  }
  return formatRaw(ctx, value, recurseTimes, typedArray);
}
function formatRaw(ctx, value, recurseTimes, typedArray) {
  let keys;
  let protoProps;
  if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
    protoProps = [];
  }
  const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
  if (protoProps !== void 0 && protoProps.length === 0) {
    protoProps = void 0;
  }
  let tag = value[Symbol.toStringTag];
  if (typeof tag !== "string") {
    tag = "";
  }
  let base2 = "";
  let formatter = getEmptyFormatArray;
  let braces;
  let noIterator = true;
  let i = 0;
  const filter = ctx.showHidden ? ALL_PROPERTIES : ONLY_ENUMERABLE;
  let extrasType = kObjectType;
  if (value[Symbol.iterator] || constructor === null) {
    noIterator = false;
    if (Array.isArray(value)) {
      const prefix = constructor !== "Array" || tag !== "" ? getPrefix(constructor, tag, "Array", `(${value.length})`) : "";
      keys = getOwnNonIndexProperties(value, filter);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && protoProps === void 0) {
        return `${braces[0]}]`;
      }
      extrasType = kArrayExtrasType;
      formatter = formatArray;
    } else if (isSet2(value)) {
      const size = value.size;
      const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter = constructor !== null ? formatSet.bind(null, value) : formatSet.bind(null, value.values());
      if (size === 0 && keys.length === 0 && protoProps === void 0) {
        return `${prefix}{}`;
      }
      braces = [`${prefix}{`, "}"];
    } else if (isMap2(value)) {
      const size = value.size;
      const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
      keys = getKeys(value, ctx.showHidden);
      formatter = constructor !== null ? formatMap.bind(null, value) : formatMap.bind(null, value.entries());
      if (size === 0 && keys.length === 0 && protoProps === void 0) {
        return `${prefix}{}`;
      }
      braces = [`${prefix}{`, "}"];
    } else if (isTypedArray(value)) {
      keys = getOwnNonIndexProperties(value, filter);
      const bound = value;
      const fallback = "";
      if (constructor === null) {
      }
      const size = value.length;
      const prefix = getPrefix(constructor, tag, fallback, `(${size})`);
      braces = [`${prefix}[`, "]"];
      if (value.length === 0 && keys.length === 0 && !ctx.showHidden) {
        return `${braces[0]}]`;
      }
      formatter = formatTypedArray.bind(null, bound, size);
      extrasType = kArrayExtrasType;
    } else if (isMapIterator2(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Map", tag);
      formatter = formatIterator.bind(null, braces);
    } else if (isSetIterator2(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces("Set", tag);
      formatter = formatIterator.bind(null, braces);
    } else {
      noIterator = true;
    }
  }
  if (noIterator) {
    keys = getKeys(value, ctx.showHidden);
    braces = ["{", "}"];
    if (constructor === "Object") {
      if (isArgumentsObject2(value)) {
        braces[0] = "[Arguments] {";
      } else if (tag !== "") {
        braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
      }
      if (keys.length === 0 && protoProps === void 0) {
        return `${braces[0]}}`;
      }
    } else if (typeof value === "function") {
      base2 = getFunctionBase(value, constructor, tag);
      if (keys.length === 0 && protoProps === void 0) {
        return ctx.stylize(base2, "special");
      }
    } else if (isRegExp2(value)) {
      base2 = RegExp(constructor !== null ? value : new RegExp(value)).toString();
      const prefix = getPrefix(constructor, tag, "RegExp");
      if (prefix !== "RegExp ") {
        base2 = `${prefix}${base2}`;
      }
      if (keys.length === 0 && protoProps === void 0 || recurseTimes > ctx.depth && ctx.depth !== null) {
        return ctx.stylize(base2, "regexp");
      }
    } else if (isDate2(value)) {
      base2 = Number.isNaN(value.getTime()) ? value.toString() : value.toISOString();
      const prefix = getPrefix(constructor, tag, "Date");
      if (prefix !== "Date ") {
        base2 = `${prefix}${base2}`;
      }
      if (keys.length === 0 && protoProps === void 0) {
        return ctx.stylize(base2, "date");
      }
    } else if (value instanceof Error) {
      base2 = formatError(value, constructor, tag, ctx, keys);
      if (keys.length === 0 && protoProps === void 0) {
        return base2;
      }
    } else if (isAnyArrayBuffer2(value)) {
      const arrayType = isArrayBuffer2(value) ? "ArrayBuffer" : "SharedArrayBuffer";
      const prefix = getPrefix(constructor, tag, arrayType);
      if (typedArray === void 0) {
        formatter = formatArrayBuffer;
      } else if (keys.length === 0 && protoProps === void 0) {
        return prefix + `{ byteLength: ${formatNumber(ctx.stylize, value.byteLength)} }`;
      }
      braces[0] = `${prefix}{`;
      Array.prototype.unshift.call(keys, "byteLength");
    } else if (isDataView2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
      Array.prototype.unshift.call(keys, "byteLength", "byteOffset", "buffer");
    } else if (isPromise2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
      formatter = formatPromise;
    } else if (isWeakSet2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
      formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
    } else if (isWeakMap2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
      formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
    } else if (isModuleNamespaceObject2(value)) {
      braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
      formatter = formatNamespaceObject.bind(null, keys);
    } else if (isBoxedPrimitive2(value)) {
      base2 = getBoxedBase(value, ctx, keys, constructor, tag);
      if (keys.length === 0 && protoProps === void 0) {
        return base2;
      }
    } else {
      if (keys.length === 0 && protoProps === void 0) {
        return `${getCtxStyle(value, constructor, tag)}{}`;
      }
      braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
    }
  }
  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    let constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
    if (constructor !== null) {
      constructorName = `[${constructorName}]`;
    }
    return ctx.stylize(constructorName, "special");
  }
  recurseTimes += 1;
  ctx.seen.push(value);
  ctx.currentDepth = recurseTimes;
  let output;
  const indentationLvl = ctx.indentationLvl;
  try {
    output = formatter(ctx, value, recurseTimes);
    for (i = 0; i < keys.length; i++) {
      output.push(
        formatProperty(ctx, value, recurseTimes, keys[i], extrasType)
      );
    }
    if (protoProps !== void 0) {
      output.push(...protoProps);
    }
  } catch (err) {
    const constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
    return handleMaxCallStackSize(ctx, err, constructorName, indentationLvl);
  }
  if (ctx.circular !== void 0) {
    const index = ctx.circular.get(value);
    if (index !== void 0) {
      const reference = ctx.stylize(`<ref *${index}>`, "special");
      if (ctx.compact !== true) {
        base2 = base2 === "" ? reference : `${reference} ${base2}`;
      } else {
        braces[0] = `${reference} ${braces[0]}`;
      }
    }
  }
  ctx.seen.pop();
  if (ctx.sorted) {
    const comparator = ctx.sorted === true ? void 0 : ctx.sorted;
    if (extrasType === kObjectType) {
      output = output.sort(comparator);
    } else if (keys.length > 1) {
      const sorted = output.slice(output.length - keys.length).sort(comparator);
      output.splice(output.length - keys.length, keys.length, ...sorted);
    }
  }
  const res = reduceToSingleString(
    ctx,
    output,
    base2,
    braces,
    extrasType,
    recurseTimes,
    value
  );
  const budget = ctx.budget[ctx.indentationLvl] || 0;
  const newLength = budget + res.length;
  ctx.budget[ctx.indentationLvl] = newLength;
  if (newLength > 2 ** 27) {
    ctx.depth = -1;
  }
  return res;
}
var builtInObjects = new Set(
  Object.getOwnPropertyNames(globalThis).filter(
    (e) => /^[A-Z][a-zA-Z0-9]+$/.test(e)
  )
);
function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
  let depth = 0;
  let keys;
  let keySet;
  do {
    if (depth !== 0 || main === obj) {
      obj = Object.getPrototypeOf(obj);
      if (obj === null) {
        return;
      }
      const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
      if (descriptor !== void 0 && typeof descriptor.value === "function" && builtInObjects.has(descriptor.value.name)) {
        return;
      }
    }
    if (depth === 0) {
      keySet = /* @__PURE__ */ new Set();
    } else {
      Array.prototype.forEach.call(keys, (key) => keySet.add(key));
    }
    keys = Reflect.ownKeys(obj);
    Array.prototype.push.call(ctx.seen, main);
    for (const key of keys) {
      if (key === "constructor" || // deno-lint-ignore no-prototype-builtins
      main.hasOwnProperty(key) || depth !== 0 && keySet.has(key)) {
        continue;
      }
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (typeof desc.value === "function") {
        continue;
      }
      const value = formatProperty(
        ctx,
        obj,
        recurseTimes,
        key,
        kObjectType,
        desc,
        main
      );
      if (ctx.colors) {
        Array.prototype.push.call(output, `\x1B[2m${value}\x1B[22m`);
      } else {
        Array.prototype.push.call(output, value);
      }
    }
    Array.prototype.pop.call(ctx.seen);
  } while (++depth !== 3);
}
function getConstructorName(obj, ctx, recurseTimes, protoProps) {
  let firstProto;
  const tmp = obj;
  while (obj || isUndetectableObject(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
    if (descriptor !== void 0 && typeof descriptor.value === "function" && descriptor.value.name !== "" && isInstanceof(tmp, descriptor.value)) {
      if (protoProps !== void 0 && (firstProto !== obj || !builtInObjects.has(descriptor.value.name))) {
        addPrototypeProperties(
          ctx,
          tmp,
          firstProto || tmp,
          recurseTimes,
          protoProps
        );
      }
      return descriptor.value.name;
    }
    obj = Object.getPrototypeOf(obj);
    if (firstProto === void 0) {
      firstProto = obj;
    }
  }
  if (firstProto === null) {
    return null;
  }
  const res = void 0;
  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    return `${res} <Complex prototype>`;
  }
  const protoConstr = getConstructorName(
    firstProto,
    ctx,
    recurseTimes + 1,
    protoProps
  );
  if (protoConstr === null) {
    return `${res} <${inspect(firstProto, {
      ...ctx,
      customInspect: false,
      depth: -1
    })}>`;
  }
  return `${res} <${protoConstr}>`;
}
function formatPrimitive(fn, value, ctx) {
  if (typeof value === "string") {
    let trailer = "";
    if (value.length > ctx.maxStringLength) {
      const remaining = value.length - ctx.maxStringLength;
      value = value.slice(0, ctx.maxStringLength);
      trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
    }
    if (ctx.compact !== true && // TODO(BridgeAR): Add unicode support. Use the readline getStringWidth
    // function.
    value.length > kMinLineLength && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
      return value.split(/(?<=\n)/).map((line) => fn(strEscape(line), "string")).join(` +
${" ".repeat(ctx.indentationLvl + 2)}`) + trailer;
    }
    return fn(strEscape(value), "string") + trailer;
  }
  if (typeof value === "number") {
    return formatNumber(fn, value);
  }
  if (typeof value === "bigint") {
    return formatBigInt(fn, value);
  }
  if (typeof value === "boolean") {
    return fn(`${value}`, "boolean");
  }
  if (typeof value === "undefined") {
    return fn("undefined", "undefined");
  }
  return fn(value.toString(), "symbol");
}
function getEmptyFormatArray() {
  return [];
}
function isInstanceof(object, proto) {
  try {
    return object instanceof proto;
  } catch {
    return false;
  }
}
function getPrefix(constructor, tag, fallback, size = "") {
  if (constructor === null) {
    if (tag !== "" && fallback !== tag) {
      return `[${fallback}${size}: null prototype] [${tag}] `;
    }
    return `[${fallback}${size}: null prototype] `;
  }
  if (tag !== "" && constructor !== tag) {
    return `${constructor}${size} [${tag}] `;
  }
  return `${constructor}${size} `;
}
function formatArray(ctx, value, recurseTimes) {
  const valLen = value.length;
  const len = Math.min(Math.max(0, ctx.maxArrayLength), valLen);
  const remaining = valLen - len;
  const output = [];
  for (let i = 0; i < len; i++) {
    if (!value.hasOwnProperty(i)) {
      return formatSpecialArray(ctx, value, recurseTimes, len, output, i);
    }
    output.push(formatProperty(ctx, value, recurseTimes, i, kArrayType));
  }
  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function getCtxStyle(_value, constructor, tag) {
  let fallback = "";
  if (constructor === null) {
    if (fallback === tag) {
      fallback = "Object";
    }
  }
  return getPrefix(constructor, tag, fallback);
}
function getKeys(value, showHidden) {
  let keys;
  const symbols = Object.getOwnPropertySymbols(value);
  if (showHidden) {
    keys = Object.getOwnPropertyNames(value);
    if (symbols.length !== 0) {
      Array.prototype.push.apply(keys, symbols);
    }
  } else {
    try {
      keys = Object.keys(value);
    } catch (_err) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (symbols.length !== 0) {
    }
  }
  return keys;
}
function formatSet(value, ctx, _ignored, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;
  for (const v2 of value) {
    Array.prototype.push.call(output, formatValue(ctx, v2, recurseTimes));
  }
  ctx.indentationLvl -= 2;
  return output;
}
function formatMap(value, ctx, _gnored, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;
  for (const { 0: k, 1: v2 } of value) {
    output.push(
      `${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v2, recurseTimes)}`
    );
  }
  ctx.indentationLvl -= 2;
  return output;
}
function formatTypedArray(value, length, ctx, _ignored, recurseTimes) {
  const maxLength = Math.min(Math.max(0, ctx.maxArrayLength), length);
  const remaining = value.length - maxLength;
  const output = new Array(maxLength);
  const elementFormatter = value.length > 0 && typeof value[0] === "number" ? formatNumber : formatBigInt;
  for (let i = 0; i < maxLength; ++i) {
    output[i] = elementFormatter(ctx.stylize, value[i]);
  }
  if (remaining > 0) {
    output[maxLength] = `... ${remaining} more item${remaining > 1 ? "s" : ""}`;
  }
  if (ctx.showHidden) {
    ctx.indentationLvl += 2;
    for (const key of [
      "BYTES_PER_ELEMENT",
      "length",
      "byteLength",
      "byteOffset",
      "buffer"
    ]) {
      const str = formatValue(ctx, value[key], recurseTimes, true);
      Array.prototype.push.call(output, `[${key}]: ${str}`);
    }
    ctx.indentationLvl -= 2;
  }
  return output;
}
function getIteratorBraces(type, tag) {
  if (tag !== `${type} Iterator`) {
    if (tag !== "") {
      tag += "] [";
    }
    tag += `${type} Iterator`;
  }
  return [`[${tag}] {`, "}"];
}
function formatIterator(braces, ctx, value, recurseTimes) {
  const { 0: entries, 1: isKeyValue } = value;
  if (isKeyValue) {
    braces[0] = braces[0].replace(/ Iterator] {$/, " Entries] {");
    return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
  }
  return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
}
function getFunctionBase(value, constructor, tag) {
  const stringified = Function.prototype.toString.call(value);
  if (stringified.slice(0, 5) === "class" && stringified.endsWith("}")) {
    const slice2 = stringified.slice(5, -1);
    const bracketIndex = slice2.indexOf("{");
    if (bracketIndex !== -1 && (!slice2.slice(0, bracketIndex).includes("(") || // Slow path to guarantee that it's indeed a class.
    classRegExp.test(slice2.replace(stripCommentsRegExp)))) {
      return getClassBase(value, constructor, tag);
    }
  }
  let type = "Function";
  if (isGeneratorFunction2(value)) {
    type = `Generator${type}`;
  }
  if (isAsyncFunction2(value)) {
    type = `Async${type}`;
  }
  let base2 = `[${type}`;
  if (constructor === null) {
    base2 += " (null prototype)";
  }
  if (value.name === "") {
    base2 += " (anonymous)";
  } else {
    base2 += `: ${value.name}`;
  }
  base2 += "]";
  if (constructor !== type && constructor !== null) {
    base2 += ` ${constructor}`;
  }
  if (tag !== "" && constructor !== tag) {
    base2 += ` [${tag}]`;
  }
  return base2;
}
function formatError(err, constructor, tag, ctx, keys) {
  const name = err.name != null ? String(err.name) : "Error";
  let len = name.length;
  let stack = err.stack ? String(err.stack) : err.toString();
  if (!ctx.showHidden && keys.length !== 0) {
    for (const name2 of ["name", "message", "stack"]) {
      const index = keys.indexOf(name2);
      if (index !== -1 && stack.includes(err[name2])) {
        keys.splice(index, 1);
      }
    }
  }
  if (constructor === null || name.endsWith("Error") && stack.startsWith(name) && (stack.length === len || stack[len] === ":" || stack[len] === "\n")) {
    let fallback = "Error";
    if (constructor === null) {
      const start = stack.match(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) || stack.match(/^([a-z_A-Z0-9-]*Error)$/);
      fallback = start && start[1] || "";
      len = fallback.length;
      fallback = fallback || "Error";
    }
    const prefix = getPrefix(constructor, tag, fallback).slice(0, -1);
    if (name !== prefix) {
      if (prefix.includes(name)) {
        if (len === 0) {
          stack = `${prefix}: ${stack}`;
        } else {
          stack = `${prefix}${stack.slice(len)}`;
        }
      } else {
        stack = `${prefix} [${name}]${stack.slice(len)}`;
      }
    }
  }
  let pos = err.message && stack.indexOf(err.message) || -1;
  if (pos !== -1) {
    pos += err.message.length;
  }
  const stackStart = stack.indexOf("\n    at", pos);
  if (stackStart === -1) {
    stack = `[${stack}]`;
  } else if (ctx.colors) {
    let newStack = stack.slice(0, stackStart);
    const lines = stack.slice(stackStart + 1).split("\n");
    for (const line of lines) {
      let nodeModule;
      newStack += "\n";
      let pos2 = 0;
      while (nodeModule = nodeModulesRegExp.exec(line)) {
        newStack += line.slice(pos2, nodeModule.index + 14);
        newStack += ctx.stylize(nodeModule[1], "module");
        pos2 = nodeModule.index + nodeModule[0].length;
      }
      newStack += pos2 === 0 ? line : line.slice(pos2);
    }
    stack = newStack;
  }
  if (ctx.indentationLvl !== 0) {
    const indentation = " ".repeat(ctx.indentationLvl);
    stack = stack.replace(/\n/g, `
${indentation}`);
  }
  return stack;
}
var hexSlice;
function formatArrayBuffer(ctx, value) {
  let buffer;
  try {
    buffer = new Uint8Array(value);
  } catch {
    return [ctx.stylize("(detached)", "special")];
  }
  let str = hexSlice(buffer, 0, Math.min(ctx.maxArrayLength, buffer.length)).replace(/(.{2})/g, "$1 ").trim();
  const remaining = buffer.length - ctx.maxArrayLength;
  if (remaining > 0) {
    str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
  }
  return [`${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`];
}
function formatNumber(fn, value) {
  return fn(Object.is(value, -0) ? "-0" : `${value}`, "number");
}
function formatPromise(ctx, value, recurseTimes) {
  let output;
  const { 0: state, 1: result } = value;
  if (state === kPending) {
    output = [ctx.stylize("<pending>", "special")];
  } else {
    ctx.indentationLvl += 2;
    const str = formatValue(ctx, result, recurseTimes);
    ctx.indentationLvl -= 2;
    output = [
      state === kRejected ? `${ctx.stylize("<rejected>", "special")} ${str}` : str
    ];
  }
  return output;
}
function formatWeakCollection(ctx) {
  return [ctx.stylize("<items unknown>", "special")];
}
function formatWeakSet(ctx, value, recurseTimes) {
  const entries = value;
  return formatSetIterInner(ctx, recurseTimes, entries, kWeak);
}
function formatWeakMap(ctx, value, recurseTimes) {
  const entries = value;
  return formatMapIterInner(ctx, recurseTimes, entries, kWeak);
}
function formatProperty(ctx, value, recurseTimes, key, type, desc, original = value) {
  let name, str;
  let extra = " ";
  desc = desc || Object.getOwnPropertyDescriptor(value, key) || { value: value[key], enumerable: true };
  if (desc.value !== void 0) {
    const diff = ctx.compact !== true || type !== kObjectType ? 2 : 3;
    ctx.indentationLvl += diff;
    str = formatValue(ctx, desc.value, recurseTimes);
    if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
      extra = `
${" ".repeat(ctx.indentationLvl)}`;
    }
    ctx.indentationLvl -= diff;
  } else if (desc.get !== void 0) {
    const label = desc.set !== void 0 ? "Getter/Setter" : "Getter";
    const s = ctx.stylize;
    const sp = "special";
    if (ctx.getters && (ctx.getters === true || ctx.getters === "get" && desc.set === void 0 || ctx.getters === "set" && desc.set !== void 0)) {
      try {
        const tmp = desc.get.call(original);
        ctx.indentationLvl += 2;
        if (tmp === null) {
          str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
        } else if (typeof tmp === "object") {
          str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
        } else {
          const primitive = formatPrimitive(s, tmp, ctx);
          str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
        }
        ctx.indentationLvl -= 2;
      } catch (err) {
        const message = `<Inspection threw (${err.message})>`;
        str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
      }
    } else {
      str = ctx.stylize(`[${label}]`, sp);
    }
  } else if (desc.set !== void 0) {
    str = ctx.stylize("[Setter]", "special");
  } else {
    str = ctx.stylize("undefined", "undefined");
  }
  if (type === kArrayType) {
    return str;
  }
  if (typeof key === "symbol") {
    const tmp = key.toString().replace(strEscapeSequencesReplacer, escapeFn);
    name = `[${ctx.stylize(tmp, "symbol")}]`;
  } else if (key === "__proto__") {
    name = "['__proto__']";
  } else if (desc.enumerable === false) {
    const tmp = key.replace(strEscapeSequencesReplacer, escapeFn);
    name = `[${tmp}]`;
  } else if (keyStrRegExp.test(key)) {
    name = ctx.stylize(key, "name");
  } else {
    name = ctx.stylize(strEscape(key), "string");
  }
  return `${name}:${extra}${str}`;
}
function handleMaxCallStackSize(_ctx, _err, _constructorName, _indentationLvl) {
}
var colorRegExp = /\u001b\[\d\d?m/g;
function removeColors(str) {
  return str.replace(colorRegExp, "");
}
function isBelowBreakLength(ctx, output, start, base2) {
  let totalLength = output.length + start;
  if (totalLength + output.length > ctx.breakLength) {
    return false;
  }
  for (let i = 0; i < output.length; i++) {
    if (ctx.colors) {
      totalLength += removeColors(output[i]).length;
    } else {
      totalLength += output[i].length;
    }
    if (totalLength > ctx.breakLength) {
      return false;
    }
  }
  return base2 === "" || !base2.includes("\n");
}
function formatBigInt(fn, value) {
  return fn(`${value}n`, "bigint");
}
function formatNamespaceObject(keys, ctx, value, recurseTimes) {
  const output = new Array(keys.length);
  for (let i = 0; i < keys.length; i++) {
    try {
      output[i] = formatProperty(
        ctx,
        value,
        recurseTimes,
        keys[i],
        kObjectType
      );
    } catch (_err) {
      const tmp = { [keys[i]]: "" };
      output[i] = formatProperty(ctx, tmp, recurseTimes, keys[i], kObjectType);
      const pos = output[i].lastIndexOf(" ");
      output[i] = output[i].slice(0, pos + 1) + ctx.stylize("<uninitialized>", "special");
    }
  }
  keys.length = 0;
  return output;
}
function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i) {
  const keys = Object.keys(value);
  let index = i;
  for (; i < keys.length && output.length < maxLength; i++) {
    const key = keys[i];
    const tmp = +key;
    if (tmp > 2 ** 32 - 2) {
      break;
    }
    if (`${index}` !== key) {
      if (!numberRegExp.test(key)) {
        break;
      }
      const emptyItems = tmp - index;
      const ending = emptyItems > 1 ? "s" : "";
      const message = `<${emptyItems} empty item${ending}>`;
      output.push(ctx.stylize(message, "undefined"));
      index = tmp;
      if (output.length === maxLength) {
        break;
      }
    }
    output.push(formatProperty(ctx, value, recurseTimes, key, kArrayType));
    index++;
  }
  const remaining = value.length - index;
  if (output.length !== maxLength) {
    if (remaining > 0) {
      const ending = remaining > 1 ? "s" : "";
      const message = `<${remaining} empty item${ending}>`;
      output.push(ctx.stylize(message, "undefined"));
    }
  } else if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function getBoxedBase(value, ctx, keys, constructor, tag) {
  let type;
  if (isNumberObject2(value)) {
    type = "Number";
  } else if (isStringObject2(value)) {
    type = "String";
    keys.splice(0, value.length);
  } else if (isBooleanObject2(value)) {
    type = "Boolean";
  } else if (isBigIntObject2(value)) {
    type = "BigInt";
  } else {
    type = "Symbol";
  }
  let base2 = `[${type}`;
  if (type !== constructor) {
    if (constructor === null) {
      base2 += " (null prototype)";
    } else {
      base2 += ` (${constructor})`;
    }
  }
  base2 += `: ${formatPrimitive(stylizeNoColor, value.valueOf(), ctx)}]`;
  if (tag !== "" && tag !== constructor) {
    base2 += ` [${tag}]`;
  }
  if (keys.length !== 0 || ctx.stylize === stylizeNoColor) {
    return base2;
  }
  return ctx.stylize(base2, type.toLowerCase());
}
function getClassBase(value, constructor, tag) {
  const hasName = value.hasOwnProperty("name");
  const name = hasName && value.name || "(anonymous)";
  let base2 = `class ${name}`;
  if (constructor !== "Function" && constructor !== null) {
    base2 += ` [${constructor}]`;
  }
  if (tag !== "" && constructor !== tag) {
    base2 += ` [${tag}]`;
  }
  if (constructor !== null) {
    const superName = Object.getPrototypeOf(value).name;
    if (superName) {
      base2 += ` extends ${superName}`;
    }
  } else {
    base2 += " extends [null prototype]";
  }
  return `[${base2}]`;
}
function reduceToSingleString(ctx, output, base2, braces, extrasType, recurseTimes, value) {
  if (ctx.compact !== true) {
    if (typeof ctx.compact === "number" && ctx.compact >= 1) {
      const entries = output.length;
      if (extrasType === kArrayExtrasType && entries > 6) {
        output = groupArrayElements(ctx, output, value);
      }
      if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
        const start = output.length + ctx.indentationLvl + braces[0].length + base2.length + 10;
        if (isBelowBreakLength(ctx, output, start, base2)) {
          return `${base2 ? `${base2} ` : ""}${braces[0]} ${join(output, ", ")} ${braces[1]}`;
        }
      }
    }
    const indentation2 = `
${" ".repeat(ctx.indentationLvl)}`;
    return `${base2 ? `${base2} ` : ""}${braces[0]}${indentation2}  ${join(output, `,${indentation2}  `)}${indentation2}${braces[1]}`;
  }
  if (isBelowBreakLength(ctx, output, 0, base2)) {
    return `${braces[0]}${base2 ? ` ${base2}` : ""} ${join(output, ", ")} ` + braces[1];
  }
  const indentation = " ".repeat(ctx.indentationLvl);
  const ln = base2 === "" && braces[0].length === 1 ? " " : `${base2 ? ` ${base2}` : ""}
${indentation}  `;
  return `${braces[0]}${ln}${join(output, `,
${indentation}  `)} ${braces[1]}`;
}
function join(output, separator) {
  let str = "";
  if (output.length !== 0) {
    const lastIndex = output.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      str += output[i];
      str += separator;
    }
    str += output[lastIndex];
  }
  return str;
}
function groupArrayElements(ctx, output, value) {
  let totalLength = 0;
  let maxLength = 0;
  let i = 0;
  let outputLength = output.length;
  if (ctx.maxArrayLength < output.length) {
    outputLength--;
  }
  const separatorSpace = 2;
  const dataLen = new Array(outputLength);
  for (; i < outputLength; i++) {
    const len = getStringWidth(output[i], ctx.colors);
    dataLen[i] = len;
    totalLength += len + separatorSpace;
    if (maxLength < len) {
      maxLength = len;
    }
  }
  const actualMax = maxLength + separatorSpace;
  if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
    const approxCharHeights = 2.5;
    const averageBias = Math.sqrt(actualMax - totalLength / output.length);
    const biasedMax = Math.max(actualMax - 3 - averageBias, 1);
    const columns = Math.min(
      // Ideally a square should be drawn. We expect a character to be about 2.5
      // times as high as wide. This is the area formula to calculate a square
      // which contains n rectangles of size `actualMax * approxCharHeights`.
      // Divide that by `actualMax` to receive the correct number of columns.
      // The added bias increases the columns for short entries.
      Math.round(
        Math.sqrt(
          approxCharHeights * biasedMax * outputLength
        ) / biasedMax
      ),
      // Do not exceed the breakLength.
      Math.floor((ctx.breakLength - ctx.indentationLvl) / actualMax),
      // Limit array grouping for small `compact` modes as the user requested
      // minimal grouping.
      ctx.compact * 4,
      // Limit the columns to a maximum of fifteen.
      15
    );
    if (columns <= 1) {
      return output;
    }
    const tmp = [];
    const maxLineLength = [];
    for (let i2 = 0; i2 < columns; i2++) {
      let lineMaxLength = 0;
      for (let j2 = i2; j2 < output.length; j2 += columns) {
        if (dataLen[j2] > lineMaxLength) {
          lineMaxLength = dataLen[j2];
        }
      }
      lineMaxLength += separatorSpace;
      maxLineLength[i2] = lineMaxLength;
    }
    let order = String.prototype.padStart;
    if (value !== void 0) {
      for (let i2 = 0; i2 < output.length; i2++) {
        if (typeof value[i2] !== "number" && typeof value[i2] !== "bigint") {
          order = String.prototype.padEnd;
          break;
        }
      }
    }
    for (let i2 = 0; i2 < outputLength; i2 += columns) {
      const max = Math.min(i2 + columns, outputLength);
      let str = "";
      let j2 = i2;
      for (; j2 < max - 1; j2++) {
        const padding = maxLineLength[j2 - i2] + output[j2].length - dataLen[j2];
        str += `${output[j2]}, `.padStart(padding, " ");
      }
      if (order === String.prototype.padStart) {
        const padding = maxLineLength[j2 - i2] + output[j2].length - dataLen[j2] - separatorSpace;
        str += output[j2].padStart(padding, " ");
      } else {
        str += output[j2];
      }
      Array.prototype.push.call(tmp, str);
    }
    if (ctx.maxArrayLength < output.length) {
      Array.prototype.push.call(tmp, output[outputLength]);
    }
    output = tmp;
  }
  return output;
}
function formatMapIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
  const len = entries.length / 2;
  const remaining = len - maxArrayLength;
  const maxLength = Math.min(maxArrayLength, len);
  let output = new Array(maxLength);
  let i = 0;
  ctx.indentationLvl += 2;
  if (state === kWeak) {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      output[i] = `${formatValue(ctx, entries[pos], recurseTimes)} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
    }
    if (!ctx.sorted) {
      output = output.sort();
    }
  } else {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      const res = [
        formatValue(ctx, entries[pos], recurseTimes),
        formatValue(ctx, entries[pos + 1], recurseTimes)
      ];
      output[i] = reduceToSingleString(
        ctx,
        res,
        "",
        ["[", "]"],
        kArrayExtrasType,
        recurseTimes
      );
    }
  }
  ctx.indentationLvl -= 2;
  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
  }
  return output;
}
function formatSetIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
  const maxLength = Math.min(maxArrayLength, entries.length);
  const output = new Array(maxLength);
  ctx.indentationLvl += 2;
  for (let i = 0; i < maxLength; i++) {
    output[i] = formatValue(ctx, entries[i], recurseTimes);
  }
  ctx.indentationLvl -= 2;
  if (state === kWeak && !ctx.sorted) {
    output.sort();
  }
  const remaining = entries.length - maxLength;
  if (remaining > 0) {
    Array.prototype.push.call(
      output,
      `... ${remaining} more item${remaining > 1 ? "s" : ""}`
    );
  }
  return output;
}
var ansiPattern = "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
var ansi = new RegExp(ansiPattern, "g");
function getStringWidth(str, removeControlChars = true) {
  let width = 0;
  if (removeControlChars) {
    str = stripVTControlCharacters(str);
  }
  str = str.normalize("NFC");
  for (const char of str[Symbol.iterator]()) {
    const code = char.codePointAt(0);
    if (isFullWidthCodePoint(code)) {
      width += 2;
    } else if (!isZeroWidthCodePoint(code)) {
      width++;
    }
  }
  return width;
}
var isFullWidthCodePoint = (code) => {
  return code >= 4352 && (code <= 4447 || // Hangul Jamo
  code === 9001 || // LEFT-POINTING ANGLE BRACKET
  code === 9002 || // RIGHT-POINTING ANGLE BRACKET
  // CJK Radicals Supplement .. Enclosed CJK Letters and Months
  code >= 11904 && code <= 12871 && code !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
  code >= 12880 && code <= 19903 || // CJK Unified Ideographs .. Yi Radicals
  code >= 19968 && code <= 42182 || // Hangul Jamo Extended-A
  code >= 43360 && code <= 43388 || // Hangul Syllables
  code >= 44032 && code <= 55203 || // CJK Compatibility Ideographs
  code >= 63744 && code <= 64255 || // Vertical Forms
  code >= 65040 && code <= 65049 || // CJK Compatibility Forms .. Small Form Variants
  code >= 65072 && code <= 65131 || // Halfwidth and Fullwidth Forms
  code >= 65281 && code <= 65376 || code >= 65504 && code <= 65510 || // Kana Supplement
  code >= 110592 && code <= 110593 || // Enclosed Ideographic Supplement
  code >= 127488 && code <= 127569 || // Miscellaneous Symbols and Pictographs 0x1f300 - 0x1f5ff
  // Emoticons 0x1f600 - 0x1f64f
  code >= 127744 && code <= 128591 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
  code >= 131072 && code <= 262141);
};
var isZeroWidthCodePoint = (code) => {
  return code <= 31 || // C0 control codes
  code >= 127 && code <= 159 || // C1 control codes
  code >= 768 && code <= 879 || // Combining Diacritical Marks
  code >= 8203 && code <= 8207 || // Modifying Invisible Characters
  // Combining Diacritical Marks for Symbols
  code >= 8400 && code <= 8447 || code >= 65024 && code <= 65039 || // Variation Selectors
  code >= 65056 && code <= 65071 || // Combining Half Marks
  code >= 917760 && code <= 917999;
};
function stripVTControlCharacters(str) {
  validateString(str, "str");
  return str.replace(ansi, "");
}

// https://deno.land/std@0.177.0/node/internal/errors.ts
var {
  errno: { ENOTDIR, ENOENT }
} = os;
var kIsNodeError = Symbol("kIsNodeError");
var classRegExp2 = /^([A-Z][a-z0-9]*)+$/;
var kTypes = [
  "string",
  "function",
  "number",
  "object",
  // Accept 'Function' and 'Object' as alternative to the lower cased version.
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol"
];
var AbortError = class extends Error {
  code;
  constructor(message = "The operation was aborted", options) {
    if (options !== void 0 && typeof options !== "object") {
      throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
    }
    super(message, options);
    this.code = "ABORT_ERR";
    this.name = "AbortError";
  }
};
function addNumericalSeparator(val) {
  let res = "";
  let i = val.length;
  const start = val[0] === "-" ? 1 : 0;
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`;
  }
  return `${val.slice(0, i)}${res}`;
}
var captureLargerStackTrace = hideStackFrames(
  function captureLargerStackTrace2(err) {
    Error.captureStackTrace(err);
    return err;
  }
);
var uvExceptionWithHostPort = hideStackFrames(
  function uvExceptionWithHostPort2(err, syscall, address, port) {
    const { 0: code, 1: uvmsg } = uvErrmapGet(err) || uvUnmappedError;
    const message = `${syscall} ${code}: ${uvmsg}`;
    let details = "";
    if (port && port > 0) {
      details = ` ${address}:${port}`;
    } else if (address) {
      details = ` ${address}`;
    }
    const ex = new Error(`${message}${details}`);
    ex.code = code;
    ex.errno = err;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
      ex.port = port;
    }
    return captureLargerStackTrace(ex);
  }
);
var errnoException = hideStackFrames(function errnoException2(err, syscall, original) {
  const code = getSystemErrorName(err);
  const message = original ? `${syscall} ${code} ${original}` : `${syscall} ${code}`;
  const ex = new Error(message);
  ex.errno = err;
  ex.code = code;
  ex.syscall = syscall;
  return captureLargerStackTrace(ex);
});
function uvErrmapGet(name) {
  return errorMap.get(name);
}
var uvUnmappedError = ["UNKNOWN", "unknown error"];
var uvException = hideStackFrames(function uvException2(ctx) {
  const { 0: code, 1: uvmsg } = uvErrmapGet(ctx.errno) || uvUnmappedError;
  let message = `${code}: ${ctx.message || uvmsg}, ${ctx.syscall}`;
  let path5;
  let dest;
  if (ctx.path) {
    path5 = ctx.path.toString();
    message += ` '${path5}'`;
  }
  if (ctx.dest) {
    dest = ctx.dest.toString();
    message += ` -> '${dest}'`;
  }
  const err = new Error(message);
  for (const prop of Object.keys(ctx)) {
    if (prop === "message" || prop === "path" || prop === "dest") {
      continue;
    }
    err[prop] = ctx[prop];
  }
  err.code = code;
  if (path5) {
    err.path = path5;
  }
  if (dest) {
    err.dest = dest;
  }
  return captureLargerStackTrace(err);
});
var exceptionWithHostPort = hideStackFrames(
  function exceptionWithHostPort2(err, syscall, address, port, additional) {
    const code = getSystemErrorName(err);
    let details = "";
    if (port && port > 0) {
      details = ` ${address}:${port}`;
    } else if (address) {
      details = ` ${address}`;
    }
    if (additional) {
      details += ` - Local (${additional})`;
    }
    const ex = new Error(`${syscall} ${code}${details}`);
    ex.errno = err;
    ex.code = code;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
      ex.port = port;
    }
    return captureLargerStackTrace(ex);
  }
);
var dnsException = hideStackFrames(function(code, syscall, hostname) {
  let errno;
  if (typeof code === "number") {
    errno = code;
    if (code === codeMap.get("EAI_NODATA") || code === codeMap.get("EAI_NONAME")) {
      code = "ENOTFOUND";
    } else {
      code = getSystemErrorName(code);
    }
  }
  const message = `${syscall} ${code}${hostname ? ` ${hostname}` : ""}`;
  const ex = new Error(message);
  ex.errno = errno;
  ex.code = code;
  ex.syscall = syscall;
  if (hostname) {
    ex.hostname = hostname;
  }
  return captureLargerStackTrace(ex);
});
var NodeErrorAbstraction = class extends Error {
  code;
  constructor(name, code, message) {
    super(message);
    this.code = code;
    this.name = name;
    this.stack = this.stack && `${name} [${this.code}]${this.stack.slice(20)}`;
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
};
var NodeError = class extends NodeErrorAbstraction {
  constructor(code, message) {
    super(Error.prototype.name, code, message);
  }
};
var NodeRangeError = class extends NodeErrorAbstraction {
  constructor(code, message) {
    super(RangeError.prototype.name, code, message);
    Object.setPrototypeOf(this, RangeError.prototype);
    this.toString = function() {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
};
var NodeTypeError = class extends NodeErrorAbstraction {
  constructor(code, message) {
    super(TypeError.prototype.name, code, message);
    Object.setPrototypeOf(this, TypeError.prototype);
    this.toString = function() {
      return `${this.name} [${this.code}]: ${this.message}`;
    };
  }
};
var NodeSystemError = class extends NodeErrorAbstraction {
  constructor(key, context, msgPrefix) {
    let message = `${msgPrefix}: ${context.syscall} returned ${context.code} (${context.message})`;
    if (context.path !== void 0) {
      message += ` ${context.path}`;
    }
    if (context.dest !== void 0) {
      message += ` => ${context.dest}`;
    }
    super("SystemError", key, message);
    captureLargerStackTrace(this);
    Object.defineProperties(this, {
      [kIsNodeError]: {
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      },
      info: {
        value: context,
        enumerable: true,
        configurable: true,
        writable: false
      },
      errno: {
        get() {
          return context.errno;
        },
        set: (value) => {
          context.errno = value;
        },
        enumerable: true,
        configurable: true
      },
      syscall: {
        get() {
          return context.syscall;
        },
        set: (value) => {
          context.syscall = value;
        },
        enumerable: true,
        configurable: true
      }
    });
    if (context.path !== void 0) {
      Object.defineProperty(this, "path", {
        get() {
          return context.path;
        },
        set: (value) => {
          context.path = value;
        },
        enumerable: true,
        configurable: true
      });
    }
    if (context.dest !== void 0) {
      Object.defineProperty(this, "dest", {
        get() {
          return context.dest;
        },
        set: (value) => {
          context.dest = value;
        },
        enumerable: true,
        configurable: true
      });
    }
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
};
function makeSystemErrorWithCode(key, msgPrfix) {
  return class NodeError extends NodeSystemError {
    constructor(ctx) {
      super(key, ctx, msgPrfix);
    }
  };
}
var ERR_FS_EISDIR = makeSystemErrorWithCode(
  "ERR_FS_EISDIR",
  "Path is a directory"
);
function createInvalidArgType(name, expected) {
  expected = Array.isArray(expected) ? expected : [expected];
  let msg = "The ";
  if (name.endsWith(" argument")) {
    msg += `${name} `;
  } else {
    const type = name.includes(".") ? "property" : "argument";
    msg += `"${name}" ${type} `;
  }
  msg += "must be ";
  const types = [];
  const instances = [];
  const other = [];
  for (const value of expected) {
    if (kTypes.includes(value)) {
      types.push(value.toLocaleLowerCase());
    } else if (classRegExp2.test(value)) {
      instances.push(value);
    } else {
      other.push(value);
    }
  }
  if (instances.length > 0) {
    const pos = types.indexOf("object");
    if (pos !== -1) {
      types.splice(pos, 1);
      instances.push("Object");
    }
  }
  if (types.length > 0) {
    if (types.length > 2) {
      const last = types.pop();
      msg += `one of type ${types.join(", ")}, or ${last}`;
    } else if (types.length === 2) {
      msg += `one of type ${types[0]} or ${types[1]}`;
    } else {
      msg += `of type ${types[0]}`;
    }
    if (instances.length > 0 || other.length > 0) {
      msg += " or ";
    }
  }
  if (instances.length > 0) {
    if (instances.length > 2) {
      const last = instances.pop();
      msg += `an instance of ${instances.join(", ")}, or ${last}`;
    } else {
      msg += `an instance of ${instances[0]}`;
      if (instances.length === 2) {
        msg += ` or ${instances[1]}`;
      }
    }
    if (other.length > 0) {
      msg += " or ";
    }
  }
  if (other.length > 0) {
    if (other.length > 2) {
      const last = other.pop();
      msg += `one of ${other.join(", ")}, or ${last}`;
    } else if (other.length === 2) {
      msg += `one of ${other[0]} or ${other[1]}`;
    } else {
      if (other[0].toLowerCase() !== other[0]) {
        msg += "an ";
      }
      msg += `${other[0]}`;
    }
  }
  return msg;
}
var ERR_INVALID_ARG_TYPE_RANGE = class extends NodeRangeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
};
var ERR_INVALID_ARG_TYPE = class extends NodeTypeError {
  constructor(name, expected, actual) {
    const msg = createInvalidArgType(name, expected);
    super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
  }
  static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
};
var ERR_INVALID_ARG_VALUE_RANGE = class extends NodeRangeError {
  constructor(name, value, reason = "is invalid") {
    const type = name.includes(".") ? "property" : "argument";
    const inspected = inspect(value);
    super(
      "ERR_INVALID_ARG_VALUE",
      `The ${type} '${name}' ${reason}. Received ${inspected}`
    );
  }
};
var ERR_INVALID_ARG_VALUE = class extends NodeTypeError {
  constructor(name, value, reason = "is invalid") {
    const type = name.includes(".") ? "property" : "argument";
    const inspected = inspect(value);
    super(
      "ERR_INVALID_ARG_VALUE",
      `The ${type} '${name}' ${reason}. Received ${inspected}`
    );
  }
  static RangeError = ERR_INVALID_ARG_VALUE_RANGE;
};
function invalidArgTypeHelper(input) {
  if (input == null) {
    return ` Received ${input}`;
  }
  if (typeof input === "function" && input.name) {
    return ` Received function ${input.name}`;
  }
  if (typeof input === "object") {
    if (input.constructor && input.constructor.name) {
      return ` Received an instance of ${input.constructor.name}`;
    }
    return ` Received ${inspect(input, { depth: -1 })}`;
  }
  let inspected = inspect(input, { colors: false });
  if (inspected.length > 25) {
    inspected = `${inspected.slice(0, 25)}...`;
  }
  return ` Received type ${typeof input} (${inspected})`;
}
var ERR_OUT_OF_RANGE = class extends RangeError {
  code = "ERR_OUT_OF_RANGE";
  constructor(str, range, input, replaceDefaultBoolean = false) {
    assert(range, 'Missing "range" argument');
    let msg = replaceDefaultBoolean ? str : `The value of "${str}" is out of range.`;
    let received;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > 2n ** 32n || input < -(2n ** 32n)) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    } else {
      received = inspect(input);
    }
    msg += ` It must be ${range}. Received ${received}`;
    super(msg);
    const { name } = this;
    this.name = `${name} [${this.code}]`;
    this.stack;
    this.name = name;
  }
};
var ERR_BUFFER_OUT_OF_BOUNDS = class extends NodeRangeError {
  constructor(name) {
    super(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      name ? `"${name}" is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
    );
  }
};
var ERR_FS_INVALID_SYMLINK_TYPE = class extends NodeError {
  constructor(x) {
    super(
      "ERR_FS_INVALID_SYMLINK_TYPE",
      `Symlink type must be one of "dir", "file", or "junction". Received "${x}"`
    );
  }
};
var ERR_INVALID_CURSOR_POS = class extends NodeTypeError {
  constructor() {
    super(
      "ERR_INVALID_CURSOR_POS",
      `Cannot set cursor row without setting its column`
    );
  }
};
var ERR_INVALID_FILE_URL_HOST = class extends NodeTypeError {
  constructor(x) {
    super(
      "ERR_INVALID_FILE_URL_HOST",
      `File URL host must be "localhost" or empty on ${x}`
    );
  }
};
var ERR_INVALID_FILE_URL_PATH = class extends NodeTypeError {
  constructor(x) {
    super("ERR_INVALID_FILE_URL_PATH", `File URL path ${x}`);
  }
};
var ERR_INVALID_OPT_VALUE_ENCODING = class extends NodeTypeError {
  constructor(x) {
    super(
      "ERR_INVALID_OPT_VALUE_ENCODING",
      `The value "${x}" is invalid for option "encoding"`
    );
  }
};
var ERR_IPC_CHANNEL_CLOSED = class extends NodeError {
  constructor() {
    super("ERR_IPC_CHANNEL_CLOSED", `Channel closed`);
  }
};
var ERR_MISSING_ARGS = class extends NodeTypeError {
  constructor(...args) {
    let msg = "The ";
    const len = args.length;
    const wrap = (a) => `"${a}"`;
    args = args.map(
      (a) => Array.isArray(a) ? a.map(wrap).join(" or ") : wrap(a)
    );
    switch (len) {
      case 1:
        msg += `${args[0]} argument`;
        break;
      case 2:
        msg += `${args[0]} and ${args[1]} arguments`;
        break;
      default:
        msg += args.slice(0, len - 1).join(", ");
        msg += `, and ${args[len - 1]} arguments`;
        break;
    }
    super("ERR_MISSING_ARGS", `${msg} must be specified`);
  }
};
var ERR_SOCKET_BAD_PORT = class extends NodeRangeError {
  constructor(name, port, allowZero = true) {
    assert(
      typeof allowZero === "boolean",
      "The 'allowZero' argument must be of type boolean."
    );
    const operator = allowZero ? ">=" : ">";
    super(
      "ERR_SOCKET_BAD_PORT",
      `${name} should be ${operator} 0 and < 65536. Received ${port}.`
    );
  }
};
var ERR_STREAM_PREMATURE_CLOSE = class extends NodeError {
  constructor() {
    super("ERR_STREAM_PREMATURE_CLOSE", `Premature close`);
  }
};
var ERR_UNHANDLED_ERROR = class extends NodeError {
  constructor(x) {
    super("ERR_UNHANDLED_ERROR", `Unhandled error. (${x})`);
  }
};
var ERR_UNKNOWN_ENCODING = class extends NodeTypeError {
  constructor(x) {
    super("ERR_UNKNOWN_ENCODING", `Unknown encoding: ${x}`);
  }
};
var ERR_UNKNOWN_SIGNAL = class extends NodeTypeError {
  constructor(x) {
    super("ERR_UNKNOWN_SIGNAL", `Unknown signal: ${x}`);
  }
};
var ERR_INVALID_URL_SCHEME = class extends NodeTypeError {
  constructor(expected) {
    expected = Array.isArray(expected) ? expected : [expected];
    const res = expected.length === 2 ? `one of scheme ${expected[0]} or ${expected[1]}` : `of scheme ${expected[0]}`;
    super("ERR_INVALID_URL_SCHEME", `The URL must be ${res}`);
  }
};
var ERR_INTERNAL_ASSERTION = class extends NodeError {
  constructor(message) {
    const suffix = "This is caused by either a bug in Node.js or incorrect usage of Node.js internals.\nPlease open an issue with this stack trace at https://github.com/nodejs/node/issues\n";
    super(
      "ERR_INTERNAL_ASSERTION",
      message === void 0 ? suffix : `${message}
${suffix}`
    );
  }
};
var ERR_FS_RMDIR_ENOTDIR = class extends NodeSystemError {
  constructor(path5) {
    const code = isWindows ? "ENOENT" : "ENOTDIR";
    const ctx = {
      message: "not a directory",
      path: path5,
      syscall: "rmdir",
      code,
      errno: isWindows ? ENOENT : ENOTDIR
    };
    super(code, ctx, "Path is not a directory");
  }
};
function denoErrorToNodeError(e, ctx) {
  const errno = extractOsErrorNumberFromErrorMessage(e);
  if (typeof errno === "undefined") {
    return e;
  }
  const ex = uvException({
    errno: mapSysErrnoToUvErrno(errno),
    ...ctx
  });
  return ex;
}
function extractOsErrorNumberFromErrorMessage(e) {
  const match = e instanceof Error ? e.message.match(/\(os error (\d+)\)/) : false;
  if (match) {
    return +match[1];
  }
  return void 0;
}
function aggregateTwoErrors(innerError, outerError) {
  if (innerError && outerError && innerError !== outerError) {
    if (Array.isArray(outerError.errors)) {
      outerError.errors.push(innerError);
      return outerError;
    }
    const err = new AggregateError(
      [
        outerError,
        innerError
      ],
      outerError.message
    );
    err.code = outerError.code;
    return err;
  }
  return innerError || outerError;
}
codes.ERR_IPC_CHANNEL_CLOSED = ERR_IPC_CHANNEL_CLOSED;
codes.ERR_INVALID_ARG_TYPE = ERR_INVALID_ARG_TYPE;
codes.ERR_INVALID_ARG_VALUE = ERR_INVALID_ARG_VALUE;
codes.ERR_OUT_OF_RANGE = ERR_OUT_OF_RANGE;
codes.ERR_SOCKET_BAD_PORT = ERR_SOCKET_BAD_PORT;
codes.ERR_BUFFER_OUT_OF_BOUNDS = ERR_BUFFER_OUT_OF_BOUNDS;
codes.ERR_UNKNOWN_ENCODING = ERR_UNKNOWN_ENCODING;
var genericNodeError = hideStackFrames(
  function genericNodeError2(message, errorProperties) {
    const err = new Error(message);
    Object.assign(err, errorProperties);
    return err;
  }
);

// https://deno.land/std@0.177.0/node/internal/util.mjs
var { signals } = os;
var customInspectSymbol2 = Symbol.for("nodejs.util.inspect.custom");
var kEnumerableProperty = /* @__PURE__ */ Object.create(null);
kEnumerableProperty.enumerable = true;
var kEmptyObject = Object.freeze(/* @__PURE__ */ Object.create(null));
function once(callback) {
  let called = false;
  return function(...args) {
    if (called)
      return;
    called = true;
    Reflect.apply(callback, this, args);
  };
}
function createDeferredPromise() {
  let resolve7;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve7 = res;
    reject = rej;
  });
  return { promise, resolve: resolve7, reject };
}
var kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
var kCustomPromisifyArgsSymbol = Symbol.for(
  "nodejs.util.promisify.customArgs"
);
function promisify(original) {
  validateFunction(original, "original");
  if (original[kCustomPromisifiedSymbol]) {
    const fn2 = original[kCustomPromisifiedSymbol];
    validateFunction(fn2, "util.promisify.custom");
    return Object.defineProperty(fn2, kCustomPromisifiedSymbol, {
      value: fn2,
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  const argumentNames = original[kCustomPromisifyArgsSymbol];
  function fn(...args) {
    return new Promise((resolve7, reject) => {
      args.push((err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== void 0 && values.length > 1) {
          const obj = {};
          for (let i = 0; i < argumentNames.length; i++) {
            obj[argumentNames[i]] = values[i];
          }
          resolve7(obj);
        } else {
          resolve7(values[0]);
        }
      });
      Reflect.apply(original, this, args);
    });
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(
    fn,
    Object.getOwnPropertyDescriptors(original)
  );
}
promisify.custom = kCustomPromisifiedSymbol;

// https://deno.land/std@0.177.0/node/internal/buffer.mjs
var utf8Encoder = new TextEncoder();
var float32Array = new Float32Array(1);
var uInt8Float32Array = new Uint8Array(float32Array.buffer);
var float64Array = new Float64Array(1);
var uInt8Float64Array = new Uint8Array(float64Array.buffer);
float32Array[0] = -1;
var bigEndian = uInt8Float32Array[3] === 0;
var kMaxLength = 2147483647;
var kStringMaxLength = 536870888;
var MAX_UINT32 = 2 ** 32;
var customInspectSymbol3 = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
var INSPECT_MAX_BYTES = 50;
var constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength
};
Object.defineProperty(Buffer2.prototype, "parent", {
  enumerable: true,
  get: function() {
    if (!Buffer2.isBuffer(this)) {
      return void 0;
    }
    return this.buffer;
  }
});
Object.defineProperty(Buffer2.prototype, "offset", {
  enumerable: true,
  get: function() {
    if (!Buffer2.isBuffer(this)) {
      return void 0;
    }
    return this.byteOffset;
  }
});
function createBuffer(length) {
  if (length > kMaxLength) {
    throw new RangeError(
      'The value "' + length + '" is invalid for option "size"'
    );
  }
  const buf = new Uint8Array(length);
  Object.setPrototypeOf(buf, Buffer2.prototype);
  return buf;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (typeof arg === "number") {
    if (typeof encodingOrOffset === "string") {
      throw new codes.ERR_INVALID_ARG_TYPE(
        "string",
        "string",
        arg
      );
    }
    return _allocUnsafe(arg);
  }
  return _from(arg, encodingOrOffset, length);
}
Buffer2.poolSize = 8192;
function _from(value, encodingOrOffset, length) {
  if (typeof value === "string") {
    return fromString(value, encodingOrOffset);
  }
  if (typeof value === "object" && value !== null) {
    if (isAnyArrayBuffer2(value)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value && (typeof valueOf === "string" || typeof valueOf === "object")) {
      return _from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) {
      return b;
    }
    if (typeof value[Symbol.toPrimitive] === "function") {
      const primitive = value[Symbol.toPrimitive]("string");
      if (typeof primitive === "string") {
        return fromString(primitive, encodingOrOffset);
      }
    }
  }
  throw new codes.ERR_INVALID_ARG_TYPE(
    "first argument",
    ["string", "Buffer", "ArrayBuffer", "Array", "Array-like Object"],
    value
  );
}
Buffer2.from = function from(value, encodingOrOffset, length) {
  return _from(value, encodingOrOffset, length);
};
Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer2, Uint8Array);
function assertSize(size) {
  validateNumber(size, "size");
  if (!(size >= 0 && size <= kMaxLength)) {
    throw new codes.ERR_INVALID_ARG_VALUE.RangeError("size", size);
  }
}
function _alloc(size, fill2, encoding) {
  assertSize(size);
  const buffer = createBuffer(size);
  if (fill2 !== void 0) {
    if (encoding !== void 0 && typeof encoding !== "string") {
      throw new codes.ERR_INVALID_ARG_TYPE(
        "encoding",
        "string",
        encoding
      );
    }
    return buffer.fill(fill2, encoding);
  }
  return buffer;
}
Buffer2.alloc = function alloc(size, fill2, encoding) {
  return _alloc(size, fill2, encoding);
};
function _allocUnsafe(size) {
  assertSize(size);
  return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
Buffer2.allocUnsafe = function allocUnsafe(size) {
  return _allocUnsafe(size);
};
Buffer2.allocUnsafeSlow = function allocUnsafeSlow(size) {
  return _allocUnsafe(size);
};
function fromString(string, encoding) {
  if (typeof encoding !== "string" || encoding === "") {
    encoding = "utf8";
  }
  if (!Buffer2.isEncoding(encoding)) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  const length = byteLength(string, encoding) | 0;
  let buf = createBuffer(length);
  const actual = buf.write(string, encoding);
  if (actual !== length) {
    buf = buf.slice(0, actual);
  }
  return buf;
}
function fromArrayLike(array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0;
  const buf = createBuffer(length);
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf;
}
function fromObject(obj) {
  if (obj.length !== void 0 || isAnyArrayBuffer2(obj.buffer)) {
    if (typeof obj.length !== "number") {
      return createBuffer(0);
    }
    return fromArrayLike(obj);
  }
  if (obj.type === "Buffer" && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data);
  }
}
function checked(length) {
  if (length >= kMaxLength) {
    throw new RangeError(
      "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength.toString(16) + " bytes"
    );
  }
  return length | 0;
}
function SlowBuffer(length) {
  assertSize(length);
  return Buffer2.alloc(+length);
}
Object.setPrototypeOf(SlowBuffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(SlowBuffer, Uint8Array);
Buffer2.isBuffer = function isBuffer(b) {
  return b != null && b._isBuffer === true && b !== Buffer2.prototype;
};
Buffer2.compare = function compare(a, b) {
  if (isInstance(a, Uint8Array)) {
    a = Buffer2.from(a, a.offset, a.byteLength);
  }
  if (isInstance(b, Uint8Array)) {
    b = Buffer2.from(b, b.offset, b.byteLength);
  }
  if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    );
  }
  if (a === b) {
    return 0;
  }
  let x = a.length;
  let y = b.length;
  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
};
Buffer2.isEncoding = function isEncoding(encoding) {
  return typeof encoding === "string" && encoding.length !== 0 && normalizeEncoding(encoding) !== void 0;
};
Buffer2.concat = function concat(list, length) {
  if (!Array.isArray(list)) {
    throw new codes.ERR_INVALID_ARG_TYPE("list", "Array", list);
  }
  if (list.length === 0) {
    return Buffer2.alloc(0);
  }
  if (length === void 0) {
    length = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].length) {
        length += list[i].length;
      }
    }
  } else {
    validateOffset(length, "length");
  }
  const buffer = Buffer2.allocUnsafe(length);
  let pos = 0;
  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    if (!isUint8Array(buf)) {
      throw new codes.ERR_INVALID_ARG_TYPE(
        `list[${i}]`,
        ["Buffer", "Uint8Array"],
        list[i]
      );
    }
    pos += _copyActual(buf, buffer, pos, 0, buf.length);
  }
  if (pos < length) {
    buffer.fill(0, pos, length);
  }
  return buffer;
};
function byteLength(string, encoding) {
  if (typeof string !== "string") {
    if (isArrayBufferView(string) || isAnyArrayBuffer2(string)) {
      return string.byteLength;
    }
    throw new codes.ERR_INVALID_ARG_TYPE(
      "string",
      ["string", "Buffer", "ArrayBuffer"],
      string
    );
  }
  const len = string.length;
  const mustMatch = arguments.length > 2 && arguments[2] === true;
  if (!mustMatch && len === 0) {
    return 0;
  }
  if (!encoding) {
    return mustMatch ? -1 : byteLengthUtf8(string);
  }
  const ops = getEncodingOps(encoding);
  if (ops === void 0) {
    return mustMatch ? -1 : byteLengthUtf8(string);
  }
  return ops.byteLength(string);
}
Buffer2.byteLength = byteLength;
Buffer2.prototype._isBuffer = true;
function swap(b, n, m2) {
  const i = b[n];
  b[n] = b[m2];
  b[m2] = i;
}
Buffer2.prototype.swap16 = function swap16() {
  const len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};
Buffer2.prototype.swap32 = function swap32() {
  const len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};
Buffer2.prototype.swap64 = function swap64() {
  const len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};
Buffer2.prototype.toString = function toString(encoding, start, end) {
  if (arguments.length === 0) {
    return this.utf8Slice(0, this.length);
  }
  const len = this.length;
  if (start <= 0) {
    start = 0;
  } else if (start >= len) {
    return "";
  } else {
    start |= 0;
  }
  if (end === void 0 || end > len) {
    end = len;
  } else {
    end |= 0;
  }
  if (end <= start) {
    return "";
  }
  if (encoding === void 0) {
    return this.utf8Slice(start, end);
  }
  const ops = getEncodingOps(encoding);
  if (ops === void 0) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  return ops.slice(this, start, end);
};
Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
Buffer2.prototype.equals = function equals(b) {
  if (!isUint8Array(b)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "otherBuffer",
      ["Buffer", "Uint8Array"],
      b
    );
  }
  if (this === b) {
    return true;
  }
  return Buffer2.compare(this, b) === 0;
};
Buffer2.prototype.inspect = function inspect2() {
  let str = "";
  const max = INSPECT_MAX_BYTES;
  str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
  if (this.length > max) {
    str += " ... ";
  }
  return "<Buffer " + str + ">";
};
if (customInspectSymbol3) {
  Buffer2.prototype[customInspectSymbol3] = Buffer2.prototype.inspect;
}
Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer2.from(target, target.offset, target.byteLength);
  }
  if (!Buffer2.isBuffer(target)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "target",
      ["Buffer", "Uint8Array"],
      target
    );
  }
  if (start === void 0) {
    start = 0;
  } else {
    validateOffset(start, "targetStart", 0, kMaxLength);
  }
  if (end === void 0) {
    end = target.length;
  } else {
    validateOffset(end, "targetEnd", 0, target.length);
  }
  if (thisStart === void 0) {
    thisStart = 0;
  } else {
    validateOffset(start, "sourceStart", 0, kMaxLength);
  }
  if (thisEnd === void 0) {
    thisEnd = this.length;
  } else {
    validateOffset(end, "sourceEnd", 0, this.length);
  }
  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new codes.ERR_OUT_OF_RANGE("out of range index", "range");
  }
  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }
  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) {
    return 0;
  }
  let x = thisEnd - thisStart;
  let y = end - start;
  const len = Math.min(x, y);
  const thisCopy = this.slice(thisStart, thisEnd);
  const targetCopy = target.slice(start, end);
  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  validateBuffer(buffer);
  if (typeof byteOffset === "string") {
    encoding = byteOffset;
    byteOffset = void 0;
  } else if (byteOffset > 2147483647) {
    byteOffset = 2147483647;
  } else if (byteOffset < -2147483648) {
    byteOffset = -2147483648;
  }
  byteOffset = +byteOffset;
  if (Number.isNaN(byteOffset)) {
    byteOffset = dir ? 0 : buffer.length || buffer.byteLength;
  }
  dir = !!dir;
  if (typeof val === "number") {
    return indexOfNumber(buffer, val >>> 0, byteOffset, dir);
  }
  let ops;
  if (encoding === void 0) {
    ops = encodingOps.utf8;
  } else {
    ops = getEncodingOps(encoding);
  }
  if (typeof val === "string") {
    if (ops === void 0) {
      throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.indexOf(buffer, val, byteOffset, dir);
  }
  if (isUint8Array(val)) {
    const encodingVal = ops === void 0 ? encodingsMap.utf8 : ops.encodingVal;
    return indexOfBuffer(buffer, val, byteOffset, encodingVal, dir);
  }
  throw new codes.ERR_INVALID_ARG_TYPE(
    "value",
    ["number", "string", "Buffer", "Uint8Array"],
    val
  );
}
Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
Buffer2.prototype.asciiSlice = function asciiSlice(offset, length) {
  if (offset === 0 && length === this.length) {
    return bytesToAscii(this);
  } else {
    return bytesToAscii(this.slice(offset, length));
  }
};
Buffer2.prototype.asciiWrite = function asciiWrite(string, offset, length) {
  return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer2.prototype.base64Slice = function base64Slice(offset, length) {
  if (offset === 0 && length === this.length) {
    return encode(this);
  } else {
    return encode(this.slice(offset, length));
  }
};
Buffer2.prototype.base64Write = function base64Write(string, offset, length) {
  return blitBuffer(base64ToBytes(string), this, offset, length);
};
Buffer2.prototype.base64urlSlice = function base64urlSlice(offset, length) {
  if (offset === 0 && length === this.length) {
    return encode2(this);
  } else {
    return encode2(this.slice(offset, length));
  }
};
Buffer2.prototype.base64urlWrite = function base64urlWrite(string, offset, length) {
  return blitBuffer(base64UrlToBytes(string), this, offset, length);
};
Buffer2.prototype.hexWrite = function hexWrite(string, offset, length) {
  return blitBuffer(
    hexToBytes(string, this.length - offset),
    this,
    offset,
    length
  );
};
Buffer2.prototype.hexSlice = function hexSlice2(string, offset, length) {
  return _hexSlice(this, string, offset, length);
};
Buffer2.prototype.latin1Slice = function latin1Slice(string, offset, length) {
  return _latin1Slice(this, string, offset, length);
};
Buffer2.prototype.latin1Write = function latin1Write(string, offset, length) {
  return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer2.prototype.ucs2Slice = function ucs2Slice(offset, length) {
  if (offset === 0 && length === this.length) {
    return bytesToUtf16le(this);
  } else {
    return bytesToUtf16le(this.slice(offset, length));
  }
};
Buffer2.prototype.ucs2Write = function ucs2Write(string, offset, length) {
  return blitBuffer(
    utf16leToBytes(string, this.length - offset),
    this,
    offset,
    length
  );
};
Buffer2.prototype.utf8Slice = function utf8Slice(string, offset, length) {
  return _utf8Slice(this, string, offset, length);
};
Buffer2.prototype.utf8Write = function utf8Write(string, offset, length) {
  return blitBuffer(
    utf8ToBytes(string, this.length - offset),
    this,
    offset,
    length
  );
};
Buffer2.prototype.write = function write(string, offset, length, encoding) {
  if (offset === void 0) {
    return this.utf8Write(string, 0, this.length);
  }
  if (length === void 0 && typeof offset === "string") {
    encoding = offset;
    length = this.length;
    offset = 0;
  } else {
    validateOffset(offset, "offset", 0, this.length);
    const remaining = this.length - offset;
    if (length === void 0) {
      length = remaining;
    } else if (typeof length === "string") {
      encoding = length;
      length = remaining;
    } else {
      validateOffset(length, "length", 0, this.length);
      if (length > remaining) {
        length = remaining;
      }
    }
  }
  if (!encoding) {
    return this.utf8Write(string, offset, length);
  }
  const ops = getEncodingOps(encoding);
  if (ops === void 0) {
    throw new codes.ERR_UNKNOWN_ENCODING(encoding);
  }
  return ops.write(this, string, offset, length);
};
Buffer2.prototype.toJSON = function toJSON() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function fromArrayBuffer(obj, byteOffset, length) {
  if (byteOffset === void 0) {
    byteOffset = 0;
  } else {
    byteOffset = +byteOffset;
    if (Number.isNaN(byteOffset)) {
      byteOffset = 0;
    }
  }
  const maxLength = obj.byteLength - byteOffset;
  if (maxLength < 0) {
    throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("offset");
  }
  if (length === void 0) {
    length = maxLength;
  } else {
    length = +length;
    if (length > 0) {
      if (length > maxLength) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("length");
      }
    } else {
      length = 0;
    }
  }
  const buffer = new Uint8Array(obj, byteOffset, length);
  Object.setPrototypeOf(buffer, Buffer2.prototype);
  return buffer;
}
var decoder = new TextDecoder();
function _utf8Slice(buf, start, end) {
  return decoder.decode(buf.slice(start, end));
}
function _latin1Slice(buf, start, end) {
  let ret = "";
  end = Math.min(buf.length, end);
  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}
function _hexSlice(buf, start, end) {
  const len = buf.length;
  if (!start || start < 0) {
    start = 0;
  }
  if (!end || end < 0 || end > len) {
    end = len;
  }
  let out = "";
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]];
  }
  return out;
}
Buffer2.prototype.slice = function slice(start, end) {
  const len = this.length;
  start = ~~start;
  end = end === void 0 ? len : ~~end;
  if (start < 0) {
    start += len;
    if (start < 0) {
      start = 0;
    }
  } else if (start > len) {
    start = len;
  }
  if (end < 0) {
    end += len;
    if (end < 0) {
      end = 0;
    }
  } else if (end > len) {
    end = len;
  }
  if (end < start) {
    end = start;
  }
  const newBuf = this.subarray(start, end);
  Object.setPrototypeOf(newBuf, Buffer2.prototype);
  return newBuf;
};
Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2) {
  if (offset === void 0) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readUInt48LE(this, offset);
  }
  if (byteLength2 === 5) {
    return readUInt40LE(this, offset);
  }
  if (byteLength2 === 3) {
    return readUInt24LE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readUInt32LE(offset);
  }
  if (byteLength2 === 2) {
    return this.readUInt16LE(offset);
  }
  if (byteLength2 === 1) {
    return this.readUInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2) {
  if (offset === void 0) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readUInt48BE(this, offset);
  }
  if (byteLength2 === 5) {
    return readUInt40BE(this, offset);
  }
  if (byteLength2 === 3) {
    return readUInt24BE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readUInt32BE(offset);
  }
  if (byteLength2 === 2) {
    return this.readUInt16BE(offset);
  }
  if (byteLength2 === 1) {
    return this.readUInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset = 0) {
  validateNumber(offset, "offset");
  const val = this[offset];
  if (val === void 0) {
    boundsError(offset, this.length - 1);
  }
  return val;
};
Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = readUInt16BE;
Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 2);
  }
  return first + last * 2 ** 8;
};
Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 4);
  }
  return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
};
Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = readUInt32BE;
Buffer2.prototype.readBigUint64LE = Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(
  function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi2 = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi2) << BigInt(32));
  }
);
Buffer2.prototype.readBigUint64BE = Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(
  function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi2 = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi2) << BigInt(32)) + BigInt(lo);
  }
);
Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2) {
  if (offset === void 0) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readInt48LE(this, offset);
  }
  if (byteLength2 === 5) {
    return readInt40LE(this, offset);
  }
  if (byteLength2 === 3) {
    return readInt24LE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readInt32LE(offset);
  }
  if (byteLength2 === 2) {
    return this.readInt16LE(offset);
  }
  if (byteLength2 === 1) {
    return this.readInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2) {
  if (offset === void 0) {
    throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
  }
  if (byteLength2 === 6) {
    return readInt48BE(this, offset);
  }
  if (byteLength2 === 5) {
    return readInt40BE(this, offset);
  }
  if (byteLength2 === 3) {
    return readInt24BE(this, offset);
  }
  if (byteLength2 === 4) {
    return this.readInt32BE(offset);
  }
  if (byteLength2 === 2) {
    return this.readInt16BE(offset);
  }
  if (byteLength2 === 1) {
    return this.readInt8(offset);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.readInt8 = function readInt8(offset = 0) {
  validateNumber(offset, "offset");
  const val = this[offset];
  if (val === void 0) {
    boundsError(offset, this.length - 1);
  }
  return val | (val & 2 ** 7) * 33554430;
};
Buffer2.prototype.readInt16LE = function readInt16LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 2);
  }
  const val = first + last * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
Buffer2.prototype.readInt16BE = function readInt16BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 2);
  }
  const val = first * 2 ** 8 + last;
  return val | (val & 2 ** 15) * 131070;
};
Buffer2.prototype.readInt32LE = function readInt32LE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 4);
  }
  return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + (last << 24);
};
Buffer2.prototype.readInt32BE = function readInt32BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 4);
  }
  return (first << 24) + // Overflow
  this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
};
Buffer2.prototype.readBigInt64LE = defineBigIntMethod(
  function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(
      first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24
    );
  }
);
Buffer2.prototype.readBigInt64BE = defineBigIntMethod(
  function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(
      this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last
    );
  }
);
Buffer2.prototype.readFloatLE = function readFloatLE(offset) {
  return bigEndian ? readFloatBackwards(this, offset) : readFloatForwards(this, offset);
};
Buffer2.prototype.readFloatBE = function readFloatBE(offset) {
  return bigEndian ? readFloatForwards(this, offset) : readFloatBackwards(this, offset);
};
Buffer2.prototype.readDoubleLE = function readDoubleLE(offset) {
  return bigEndian ? readDoubleBackwards(this, offset) : readDoubleForwards(this, offset);
};
Buffer2.prototype.readDoubleBE = function readDoubleBE(offset) {
  return bigEndian ? readDoubleForwards(this, offset) : readDoubleBackwards(this, offset);
};
Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48LE(this, value, offset, 0, 281474976710655);
  }
  if (byteLength2 === 5) {
    return writeU_Int40LE(this, value, offset, 0, 1099511627775);
  }
  if (byteLength2 === 3) {
    return writeU_Int24LE(this, value, offset, 0, 16777215);
  }
  if (byteLength2 === 4) {
    return writeU_Int32LE(this, value, offset, 0, 4294967295);
  }
  if (byteLength2 === 2) {
    return writeU_Int16LE(this, value, offset, 0, 65535);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, 0, 255);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48BE(this, value, offset, 0, 281474976710655);
  }
  if (byteLength2 === 5) {
    return writeU_Int40BE(this, value, offset, 0, 1099511627775);
  }
  if (byteLength2 === 3) {
    return writeU_Int24BE(this, value, offset, 0, 16777215);
  }
  if (byteLength2 === 4) {
    return writeU_Int32BE(this, value, offset, 0, 4294967295);
  }
  if (byteLength2 === 2) {
    return writeU_Int16BE(this, value, offset, 0, 65535);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, 0, 255);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset = 0) {
  return writeU_Int8(this, value, offset, 0, 255);
};
Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset = 0) {
  return writeU_Int16LE(this, value, offset, 0, 65535);
};
Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset = 0) {
  return writeU_Int16BE(this, value, offset, 0, 65535);
};
Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset = 0) {
  return _writeUInt32LE(this, value, offset, 0, 4294967295);
};
Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset = 0) {
  return _writeUInt32BE(this, value, offset, 0, 4294967295);
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);
  let lo = Number(value & BigInt(4294967295));
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  lo = lo >> 8;
  buf[offset++] = lo;
  let hi2 = Number(value >> BigInt(32) & BigInt(4294967295));
  buf[offset++] = hi2;
  hi2 = hi2 >> 8;
  buf[offset++] = hi2;
  hi2 = hi2 >> 8;
  buf[offset++] = hi2;
  hi2 = hi2 >> 8;
  buf[offset++] = hi2;
  return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7);
  let lo = Number(value & BigInt(4294967295));
  buf[offset + 7] = lo;
  lo = lo >> 8;
  buf[offset + 6] = lo;
  lo = lo >> 8;
  buf[offset + 5] = lo;
  lo = lo >> 8;
  buf[offset + 4] = lo;
  let hi2 = Number(value >> BigInt(32) & BigInt(4294967295));
  buf[offset + 3] = hi2;
  hi2 = hi2 >> 8;
  buf[offset + 2] = hi2;
  hi2 = hi2 >> 8;
  buf[offset + 1] = hi2;
  hi2 = hi2 >> 8;
  buf[offset] = hi2;
  return offset + 8;
}
Buffer2.prototype.writeBigUint64LE = Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(
  function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(
      this,
      value,
      offset,
      BigInt(0),
      BigInt("0xffffffffffffffff")
    );
  }
);
Buffer2.prototype.writeBigUint64BE = Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(
  function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(
      this,
      value,
      offset,
      BigInt(0),
      BigInt("0xffffffffffffffff")
    );
  }
);
Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48LE(
      this,
      value,
      offset,
      -140737488355328,
      140737488355327
    );
  }
  if (byteLength2 === 5) {
    return writeU_Int40LE(this, value, offset, -549755813888, 549755813887);
  }
  if (byteLength2 === 3) {
    return writeU_Int24LE(this, value, offset, -8388608, 8388607);
  }
  if (byteLength2 === 4) {
    return writeU_Int32LE(this, value, offset, -2147483648, 2147483647);
  }
  if (byteLength2 === 2) {
    return writeU_Int16LE(this, value, offset, -32768, 32767);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, -128, 127);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2) {
  if (byteLength2 === 6) {
    return writeU_Int48BE(
      this,
      value,
      offset,
      -140737488355328,
      140737488355327
    );
  }
  if (byteLength2 === 5) {
    return writeU_Int40BE(this, value, offset, -549755813888, 549755813887);
  }
  if (byteLength2 === 3) {
    return writeU_Int24BE(this, value, offset, -8388608, 8388607);
  }
  if (byteLength2 === 4) {
    return writeU_Int32BE(this, value, offset, -2147483648, 2147483647);
  }
  if (byteLength2 === 2) {
    return writeU_Int16BE(this, value, offset, -32768, 32767);
  }
  if (byteLength2 === 1) {
    return writeU_Int8(this, value, offset, -128, 127);
  }
  boundsError(byteLength2, 6, "byteLength");
};
Buffer2.prototype.writeInt8 = function writeInt8(value, offset = 0) {
  return writeU_Int8(this, value, offset, -128, 127);
};
Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset = 0) {
  return writeU_Int16LE(this, value, offset, -32768, 32767);
};
Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset = 0) {
  return writeU_Int16BE(this, value, offset, -32768, 32767);
};
Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset = 0) {
  return writeU_Int32LE(this, value, offset, -2147483648, 2147483647);
};
Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset = 0) {
  return writeU_Int32BE(this, value, offset, -2147483648, 2147483647);
};
Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(
  function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(
      this,
      value,
      offset,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff")
    );
  }
);
Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(
  function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(
      this,
      value,
      offset,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff")
    );
  }
);
Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset) {
  return bigEndian ? writeFloatBackwards(this, value, offset) : writeFloatForwards(this, value, offset);
};
Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset) {
  return bigEndian ? writeFloatForwards(this, value, offset) : writeFloatBackwards(this, value, offset);
};
Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset) {
  return bigEndian ? writeDoubleBackwards(this, value, offset) : writeDoubleForwards(this, value, offset);
};
Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset) {
  return bigEndian ? writeDoubleForwards(this, value, offset) : writeDoubleBackwards(this, value, offset);
};
Buffer2.prototype.copy = function copy(target, targetStart, sourceStart, sourceEnd) {
  if (!isUint8Array(this)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "source",
      ["Buffer", "Uint8Array"],
      this
    );
  }
  if (!isUint8Array(target)) {
    throw new codes.ERR_INVALID_ARG_TYPE(
      "target",
      ["Buffer", "Uint8Array"],
      target
    );
  }
  if (targetStart === void 0) {
    targetStart = 0;
  } else {
    targetStart = toInteger(targetStart, 0);
    if (targetStart < 0) {
      throw new codes.ERR_OUT_OF_RANGE("targetStart", ">= 0", targetStart);
    }
  }
  if (sourceStart === void 0) {
    sourceStart = 0;
  } else {
    sourceStart = toInteger(sourceStart, 0);
    if (sourceStart < 0) {
      throw new codes.ERR_OUT_OF_RANGE("sourceStart", ">= 0", sourceStart);
    }
    if (sourceStart >= MAX_UINT32) {
      throw new codes.ERR_OUT_OF_RANGE(
        "sourceStart",
        `< ${MAX_UINT32}`,
        sourceStart
      );
    }
  }
  if (sourceEnd === void 0) {
    sourceEnd = this.length;
  } else {
    sourceEnd = toInteger(sourceEnd, 0);
    if (sourceEnd < 0) {
      throw new codes.ERR_OUT_OF_RANGE("sourceEnd", ">= 0", sourceEnd);
    }
    if (sourceEnd >= MAX_UINT32) {
      throw new codes.ERR_OUT_OF_RANGE(
        "sourceEnd",
        `< ${MAX_UINT32}`,
        sourceEnd
      );
    }
  }
  if (targetStart >= target.length) {
    return 0;
  }
  if (sourceEnd > 0 && sourceEnd < sourceStart) {
    sourceEnd = sourceStart;
  }
  if (sourceEnd === sourceStart) {
    return 0;
  }
  if (target.length === 0 || this.length === 0) {
    return 0;
  }
  if (sourceEnd > this.length) {
    sourceEnd = this.length;
  }
  if (target.length - targetStart < sourceEnd - sourceStart) {
    sourceEnd = target.length - targetStart + sourceStart;
  }
  const len = sourceEnd - sourceStart;
  if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
    this.copyWithin(targetStart, sourceStart, sourceEnd);
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(sourceStart, sourceEnd),
      targetStart
    );
  }
  return len;
};
Buffer2.prototype.fill = function fill(val, start, end, encoding) {
  if (typeof val === "string") {
    if (typeof start === "string") {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === "string") {
      encoding = end;
      end = this.length;
    }
    if (encoding !== void 0 && typeof encoding !== "string") {
      throw new TypeError("encoding must be a string");
    }
    if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0);
      if (encoding === "utf8" && code < 128 || encoding === "latin1") {
        val = code;
      }
    }
  } else if (typeof val === "number") {
    val = val & 255;
  } else if (typeof val === "boolean") {
    val = Number(val);
  }
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError("Out of range index");
  }
  if (end <= start) {
    return this;
  }
  start = start >>> 0;
  end = end === void 0 ? this.length : end >>> 0;
  if (!val) {
    val = 0;
  }
  let i;
  if (typeof val === "number") {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
    const len = bytes.length;
    if (len === 0) {
      throw new codes.ERR_INVALID_ARG_VALUE(
        "value",
        val
      );
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }
  return this;
};
function checkBounds(buf, offset, byteLength2) {
  validateNumber(offset, "offset");
  if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
    boundsError(offset, buf.length - (byteLength2 + 1));
  }
}
function checkIntBI(value, min, max, buf, offset, byteLength2) {
  if (value > max || value < min) {
    const n = typeof min === "bigint" ? "n" : "";
    let range;
    if (byteLength2 > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
      } else {
        range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`;
    }
    throw new codes.ERR_OUT_OF_RANGE("value", range, value);
  }
  checkBounds(buf, offset, byteLength2);
}
function utf8ToBytes(string, units) {
  units = units || Infinity;
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) {
          bytes.push(239, 191, 189);
        }
        leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) {
        bytes.push(239, 191, 189);
      }
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) {
        break;
      }
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) {
        break;
      }
      bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) {
        break;
      }
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) {
        break;
      }
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function blitBuffer(src, dst, offset, byteLength2) {
  let i;
  const length = byteLength2 === void 0 ? src.length : byteLength2;
  for (i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) {
      break;
    }
    dst[i + offset] = src[i];
  }
  return i;
}
function isInstance(obj, type) {
  return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
var hexSliceLookupTable = function() {
  const alphabet = "0123456789abcdef";
  const table = new Array(256);
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16;
    for (let j2 = 0; j2 < 16; ++j2) {
      table[i16 + j2] = alphabet[i] + alphabet[j2];
    }
  }
  return table;
}();
function defineBigIntMethod(fn) {
  return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
  throw new Error("BigInt not supported");
}
var atob2 = globalThis.atob;
var Blob = globalThis.Blob;
var btoa = globalThis.btoa;
function readUInt48LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 6);
  }
  return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + (buf[++offset] + last * 2 ** 8) * 2 ** 32;
}
function readUInt40LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 5);
  }
  return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + last * 2 ** 32;
}
function readUInt24LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 3);
  }
  return first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
}
function readUInt48BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 6);
  }
  return (first * 2 ** 8 + buf[++offset]) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt40BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 5);
  }
  return first * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt24BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 3);
  }
  return first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt16BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 1];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 2);
  }
  return first * 2 ** 8 + last;
}
function readUInt32BE(offset = 0) {
  validateNumber(offset, "offset");
  const first = this[offset];
  const last = this[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, this.length - 4);
  }
  return first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
}
function readDoubleBackwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 7];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buffer.length - 8);
  }
  uInt8Float64Array[7] = first;
  uInt8Float64Array[6] = buffer[++offset];
  uInt8Float64Array[5] = buffer[++offset];
  uInt8Float64Array[4] = buffer[++offset];
  uInt8Float64Array[3] = buffer[++offset];
  uInt8Float64Array[2] = buffer[++offset];
  uInt8Float64Array[1] = buffer[++offset];
  uInt8Float64Array[0] = last;
  return float64Array[0];
}
function readDoubleForwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 7];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buffer.length - 8);
  }
  uInt8Float64Array[0] = first;
  uInt8Float64Array[1] = buffer[++offset];
  uInt8Float64Array[2] = buffer[++offset];
  uInt8Float64Array[3] = buffer[++offset];
  uInt8Float64Array[4] = buffer[++offset];
  uInt8Float64Array[5] = buffer[++offset];
  uInt8Float64Array[6] = buffer[++offset];
  uInt8Float64Array[7] = last;
  return float64Array[0];
}
function writeDoubleForwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 7);
  float64Array[0] = val;
  buffer[offset++] = uInt8Float64Array[0];
  buffer[offset++] = uInt8Float64Array[1];
  buffer[offset++] = uInt8Float64Array[2];
  buffer[offset++] = uInt8Float64Array[3];
  buffer[offset++] = uInt8Float64Array[4];
  buffer[offset++] = uInt8Float64Array[5];
  buffer[offset++] = uInt8Float64Array[6];
  buffer[offset++] = uInt8Float64Array[7];
  return offset;
}
function writeDoubleBackwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 7);
  float64Array[0] = val;
  buffer[offset++] = uInt8Float64Array[7];
  buffer[offset++] = uInt8Float64Array[6];
  buffer[offset++] = uInt8Float64Array[5];
  buffer[offset++] = uInt8Float64Array[4];
  buffer[offset++] = uInt8Float64Array[3];
  buffer[offset++] = uInt8Float64Array[2];
  buffer[offset++] = uInt8Float64Array[1];
  buffer[offset++] = uInt8Float64Array[0];
  return offset;
}
function readFloatBackwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buffer.length - 4);
  }
  uInt8Float32Array[3] = first;
  uInt8Float32Array[2] = buffer[++offset];
  uInt8Float32Array[1] = buffer[++offset];
  uInt8Float32Array[0] = last;
  return float32Array[0];
}
function readFloatForwards(buffer, offset = 0) {
  validateNumber(offset, "offset");
  const first = buffer[offset];
  const last = buffer[offset + 3];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buffer.length - 4);
  }
  uInt8Float32Array[0] = first;
  uInt8Float32Array[1] = buffer[++offset];
  uInt8Float32Array[2] = buffer[++offset];
  uInt8Float32Array[3] = last;
  return float32Array[0];
}
function writeFloatForwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 3);
  float32Array[0] = val;
  buffer[offset++] = uInt8Float32Array[0];
  buffer[offset++] = uInt8Float32Array[1];
  buffer[offset++] = uInt8Float32Array[2];
  buffer[offset++] = uInt8Float32Array[3];
  return offset;
}
function writeFloatBackwards(buffer, val, offset = 0) {
  val = +val;
  checkBounds(buffer, offset, 3);
  float32Array[0] = val;
  buffer[offset++] = uInt8Float32Array[3];
  buffer[offset++] = uInt8Float32Array[2];
  buffer[offset++] = uInt8Float32Array[1];
  buffer[offset++] = uInt8Float32Array[0];
  return offset;
}
function readInt24LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 3);
  }
  const val = first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
  return val | (val & 2 ** 23) * 510;
}
function readInt40LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 5);
  }
  return (last | (last & 2 ** 7) * 33554430) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt48LE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 6);
  }
  const val = buf[offset + 4] + last * 2 ** 8;
  return (val | (val & 2 ** 15) * 131070) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt24BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 2];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 3);
  }
  const val = first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
  return val | (val & 2 ** 23) * 510;
}
function readInt48BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 5];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 6);
  }
  const val = buf[++offset] + first * 2 ** 8;
  return (val | (val & 2 ** 15) * 131070) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readInt40BE(buf, offset = 0) {
  validateNumber(offset, "offset");
  const first = buf[offset];
  const last = buf[offset + 4];
  if (first === void 0 || last === void 0) {
    boundsError(offset, buf.length - 5);
  }
  return (first | (first & 2 ** 7) * 33554430) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function byteLengthUtf8(str) {
  return utf8Encoder.encode(str).length;
}
function base64ByteLength(str, bytes) {
  if (str.charCodeAt(bytes - 1) === 61) {
    bytes--;
  }
  if (bytes > 1 && str.charCodeAt(bytes - 1) === 61) {
    bytes--;
  }
  return bytes * 3 >>> 2;
}
var encodingsMap = /* @__PURE__ */ Object.create(null);
for (let i = 0; i < encodings.length; ++i) {
  encodingsMap[encodings[i]] = i;
}
var encodingOps = {
  ascii: {
    byteLength: (string) => string.length,
    encoding: "ascii",
    encodingVal: encodingsMap.ascii,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      asciiToBytes(val),
      byteOffset,
      encodingsMap.ascii,
      dir
    ),
    slice: (buf, start, end) => buf.asciiSlice(start, end),
    write: (buf, string, offset, len) => buf.asciiWrite(string, offset, len)
  },
  base64: {
    byteLength: (string) => base64ByteLength(string, string.length),
    encoding: "base64",
    encodingVal: encodingsMap.base64,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      base64ToBytes(val),
      byteOffset,
      encodingsMap.base64,
      dir
    ),
    slice: (buf, start, end) => buf.base64Slice(start, end),
    write: (buf, string, offset, len) => buf.base64Write(string, offset, len)
  },
  base64url: {
    byteLength: (string) => base64ByteLength(string, string.length),
    encoding: "base64url",
    encodingVal: encodingsMap.base64url,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      base64UrlToBytes(val),
      byteOffset,
      encodingsMap.base64url,
      dir
    ),
    slice: (buf, start, end) => buf.base64urlSlice(start, end),
    write: (buf, string, offset, len) => buf.base64urlWrite(string, offset, len)
  },
  hex: {
    byteLength: (string) => string.length >>> 1,
    encoding: "hex",
    encodingVal: encodingsMap.hex,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      hexToBytes(val),
      byteOffset,
      encodingsMap.hex,
      dir
    ),
    slice: (buf, start, end) => buf.hexSlice(start, end),
    write: (buf, string, offset, len) => buf.hexWrite(string, offset, len)
  },
  latin1: {
    byteLength: (string) => string.length,
    encoding: "latin1",
    encodingVal: encodingsMap.latin1,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      asciiToBytes(val),
      byteOffset,
      encodingsMap.latin1,
      dir
    ),
    slice: (buf, start, end) => buf.latin1Slice(start, end),
    write: (buf, string, offset, len) => buf.latin1Write(string, offset, len)
  },
  ucs2: {
    byteLength: (string) => string.length * 2,
    encoding: "ucs2",
    encodingVal: encodingsMap.utf16le,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      utf16leToBytes(val),
      byteOffset,
      encodingsMap.utf16le,
      dir
    ),
    slice: (buf, start, end) => buf.ucs2Slice(start, end),
    write: (buf, string, offset, len) => buf.ucs2Write(string, offset, len)
  },
  utf8: {
    byteLength: byteLengthUtf8,
    encoding: "utf8",
    encodingVal: encodingsMap.utf8,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      utf8Encoder.encode(val),
      byteOffset,
      encodingsMap.utf8,
      dir
    ),
    slice: (buf, start, end) => buf.utf8Slice(start, end),
    write: (buf, string, offset, len) => buf.utf8Write(string, offset, len)
  },
  utf16le: {
    byteLength: (string) => string.length * 2,
    encoding: "utf16le",
    encodingVal: encodingsMap.utf16le,
    indexOf: (buf, val, byteOffset, dir) => indexOfBuffer(
      buf,
      utf16leToBytes(val),
      byteOffset,
      encodingsMap.utf16le,
      dir
    ),
    slice: (buf, start, end) => buf.ucs2Slice(start, end),
    write: (buf, string, offset, len) => buf.ucs2Write(string, offset, len)
  }
};
function getEncodingOps(encoding) {
  encoding = String(encoding).toLowerCase();
  switch (encoding.length) {
    case 4:
      if (encoding === "utf8")
        return encodingOps.utf8;
      if (encoding === "ucs2")
        return encodingOps.ucs2;
      break;
    case 5:
      if (encoding === "utf-8")
        return encodingOps.utf8;
      if (encoding === "ascii")
        return encodingOps.ascii;
      if (encoding === "ucs-2")
        return encodingOps.ucs2;
      break;
    case 7:
      if (encoding === "utf16le") {
        return encodingOps.utf16le;
      }
      break;
    case 8:
      if (encoding === "utf-16le") {
        return encodingOps.utf16le;
      }
      break;
    case 6:
      if (encoding === "latin1" || encoding === "binary") {
        return encodingOps.latin1;
      }
      if (encoding === "base64")
        return encodingOps.base64;
    case 3:
      if (encoding === "hex") {
        return encodingOps.hex;
      }
      break;
    case 9:
      if (encoding === "base64url") {
        return encodingOps.base64url;
      }
      break;
  }
}
function _copyActual(source, target, targetStart, sourceStart, sourceEnd) {
  if (sourceEnd - sourceStart > target.length - targetStart) {
    sourceEnd = sourceStart + target.length - targetStart;
  }
  let nb = sourceEnd - sourceStart;
  const sourceLen = source.length - sourceStart;
  if (nb > sourceLen) {
    nb = sourceLen;
  }
  if (sourceStart !== 0 || sourceEnd < source.length) {
    source = new Uint8Array(source.buffer, source.byteOffset + sourceStart, nb);
  }
  target.set(source, targetStart);
  return nb;
}
function boundsError(value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type);
    throw new codes.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
  }
  if (length < 0) {
    throw new codes.ERR_BUFFER_OUT_OF_BOUNDS();
  }
  throw new codes.ERR_OUT_OF_RANGE(
    type || "offset",
    `>= ${type ? 1 : 0} and <= ${length}`,
    value
  );
}
function validateNumber(value, name) {
  if (typeof value !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
  }
}
function checkInt(value, min, max, buf, offset, byteLength2) {
  if (value > max || value < min) {
    const n = typeof min === "bigint" ? "n" : "";
    let range;
    if (byteLength2 > 3) {
      if (min === 0 || min === 0n) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
      } else {
        range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}`;
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`;
    }
    throw new codes.ERR_OUT_OF_RANGE("value", range, value);
  }
  checkBounds(buf, offset, byteLength2);
}
function toInteger(n, defaultVal) {
  n = +n;
  if (!Number.isNaN(n) && n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER) {
    return n % 1 === 0 ? n : Math.floor(n);
  }
  return defaultVal;
}
function writeU_Int8(buf, value, offset, min, max) {
  value = +value;
  validateNumber(offset, "offset");
  if (value > max || value < min) {
    throw new codes.ERR_OUT_OF_RANGE("value", `>= ${min} and <= ${max}`, value);
  }
  if (buf[offset] === void 0) {
    boundsError(offset, buf.length - 1);
  }
  buf[offset] = value;
  return offset + 1;
}
function writeU_Int16BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 1);
  buf[offset++] = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function _writeUInt32LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function writeU_Int16LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 1);
  buf[offset++] = value;
  buf[offset++] = value >>> 8;
  return offset;
}
function _writeUInt32BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int48BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 5);
  const newVal = Math.floor(value * 2 ** -32);
  buf[offset++] = newVal >>> 8;
  buf[offset++] = newVal;
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int40BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 4);
  buf[offset++] = Math.floor(value * 2 ** -32);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int32BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset + 3] = value;
  value = value >>> 8;
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 4;
}
function writeU_Int24BE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 2);
  buf[offset + 2] = value;
  value = value >>> 8;
  buf[offset + 1] = value;
  value = value >>> 8;
  buf[offset] = value;
  return offset + 3;
}
function validateOffset(value, name, min = 0, max = Number.MAX_SAFE_INTEGER) {
  if (typeof value !== "number") {
    throw new codes.ERR_INVALID_ARG_TYPE(name, "number", value);
  }
  if (!Number.isInteger(value)) {
    throw new codes.ERR_OUT_OF_RANGE(name, "an integer", value);
  }
  if (value < min || value > max) {
    throw new codes.ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
  }
}
function writeU_Int48LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 5);
  const newVal = Math.floor(value * 2 ** -32);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  buf[offset++] = newVal;
  buf[offset++] = newVal >>> 8;
  return offset;
}
function writeU_Int40LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 4);
  const newVal = value;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  buf[offset++] = Math.floor(newVal * 2 ** -32);
  return offset;
}
function writeU_Int32LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 3);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
function writeU_Int24LE(buf, value, offset, min, max) {
  value = +value;
  checkInt(value, min, max, buf, offset, 2);
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  value = value >>> 8;
  buf[offset++] = value;
  return offset;
}
var buffer_default2 = {
  atob: atob2,
  btoa,
  Blob,
  Buffer: Buffer2,
  constants,
  kMaxLength,
  kStringMaxLength,
  SlowBuffer
};

// https://deno.land/std@0.177.0/node/_process/exiting.ts
var _exiting = false;

// https://deno.land/std@0.177.0/node/internal/fixed_queue.ts
var kSize = 2048;
var kMask = kSize - 1;
var FixedCircularBuffer = class {
  bottom;
  top;
  list;
  next;
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === void 0) {
      return null;
    }
    this.list[this.bottom] = void 0;
    this.bottom = this.bottom + 1 & kMask;
    return nextItem;
  }
};
var FixedQueue = class {
  head;
  tail;
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
    }
    return next;
  }
};

// https://deno.land/std@0.177.0/node/_next_tick.ts
var queue = new FixedQueue();
var _nextTick;
function processTicksAndRejections() {
  let tock;
  do {
    while (tock = queue.shift()) {
      try {
        const callback = tock.callback;
        if (tock.args === void 0) {
          callback();
        } else {
          const args = tock.args;
          switch (args.length) {
            case 1:
              callback(args[0]);
              break;
            case 2:
              callback(args[0], args[1]);
              break;
            case 3:
              callback(args[0], args[1], args[2]);
              break;
            case 4:
              callback(args[0], args[1], args[2], args[3]);
              break;
            default:
              callback(...args);
          }
        }
      } finally {
      }
    }
    core.runMicrotasks();
  } while (!queue.isEmpty());
  core.setHasTickScheduled(false);
}
if (typeof core.setNextTickCallback !== "undefined") {
  let runNextTicks = function() {
    if (!core.hasTickScheduled()) {
      core.runMicrotasks();
    }
    if (!core.hasTickScheduled()) {
      return true;
    }
    processTicksAndRejections();
    return true;
  }, __nextTickNative = function(callback, ...args) {
    validateFunction(callback, "callback");
    if (_exiting) {
      return;
    }
    let args_;
    switch (args.length) {
      case 0:
        break;
      case 1:
        args_ = [args[0]];
        break;
      case 2:
        args_ = [args[0], args[1]];
        break;
      case 3:
        args_ = [args[0], args[1], args[2]];
        break;
      default:
        args_ = new Array(args.length);
        for (let i = 0; i < args.length; i++) {
          args_[i] = args[i];
        }
    }
    if (queue.isEmpty()) {
      core.setHasTickScheduled(true);
    }
    const tickObject = {
      // FIXME(bartlomieju): Deno currently doesn't support async hooks
      // [async_id_symbol]: asyncId,
      // [trigger_async_id_symbol]: triggerAsyncId,
      callback,
      args: args_
    };
    queue.push(tickObject);
  };
  core.setNextTickCallback(processTicksAndRejections);
  core.setMacrotaskCallback(runNextTicks);
  _nextTick = __nextTickNative;
} else {
  let __nextTickQueueMicrotask = function(callback, ...args) {
    if (args) {
      queueMicrotask(() => callback.call(this, ...args));
    } else {
      queueMicrotask(callback);
    }
  };
  _nextTick = __nextTickQueueMicrotask;
}
function nextTick2(callback, ...args) {
  _nextTick(callback, ...args);
}

// https://deno.land/std@0.177.0/node/internal/util/debuglog.ts
var debugImpls;
var testEnabled;
function initializeDebugEnv(debugEnv2) {
  debugImpls = /* @__PURE__ */ Object.create(null);
  if (debugEnv2) {
    debugEnv2 = debugEnv2.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replaceAll("*", ".*").replaceAll(",", "$|^");
    const debugEnvRegex = new RegExp(`^${debugEnv2}$`, "i");
    testEnabled = (str) => debugEnvRegex.exec(str) !== null;
  } else {
    testEnabled = () => false;
  }
}
var debugEnv;
try {
  debugEnv = Deno.env.get("NODE_DEBUG") ?? "";
} catch (error) {
  if (error instanceof Deno.errors.PermissionDenied) {
    debugEnv = "";
  } else {
    throw error;
  }
}
initializeDebugEnv(debugEnv);

// https://deno.land/std@0.177.0/node/util/types.ts
var types_default2 = { ...types_exports2 };

// https://deno.land/std@0.177.0/node/_events.mjs
var kRejection = Symbol.for("nodejs.rejection");
var kCapture = Symbol("kCapture");
var kErrorMonitor = Symbol("events.errorMonitor");
var kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners");
var kMaxEventTargetListenersWarned = Symbol(
  "events.maxEventTargetListenersWarned"
);
function EventEmitter(opts) {
  EventEmitter.init.call(this, opts);
}
var events_default = EventEmitter;
EventEmitter.on = on;
EventEmitter.once = once3;
EventEmitter.getEventListeners = getEventListeners;
EventEmitter.setMaxListeners = setMaxListeners;
EventEmitter.listenerCount = listenerCount2;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.captureRejectionSymbol = kRejection;
var captureRejectionSymbol = EventEmitter.captureRejectionSymbol;
var errorMonitor = EventEmitter.errorMonitor;
Object.defineProperty(EventEmitter, "captureRejections", {
  get() {
    return EventEmitter.prototype[kCapture];
  },
  set(value) {
    validateBoolean(value, "EventEmitter.captureRejections");
    EventEmitter.prototype[kCapture] = value;
  },
  enumerable: true
});
EventEmitter.errorMonitor = kErrorMonitor;
Object.defineProperty(EventEmitter.prototype, kCapture, {
  value: false,
  writable: true,
  enumerable: false
});
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(listener) {
  validateFunction(listener, "listener");
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new ERR_OUT_OF_RANGE(
        "defaultMaxListeners",
        "a non-negative number",
        arg
      );
    }
    defaultMaxListeners = arg;
  }
});
Object.defineProperties(EventEmitter, {
  kMaxEventTargetListeners: {
    value: kMaxEventTargetListeners,
    enumerable: false,
    configurable: false,
    writable: false
  },
  kMaxEventTargetListenersWarned: {
    value: kMaxEventTargetListenersWarned,
    enumerable: false,
    configurable: false,
    writable: false
  }
});
function setMaxListeners(n = defaultMaxListeners, ...eventTargets) {
  if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
    throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
  }
  if (eventTargets.length === 0) {
    defaultMaxListeners = n;
  } else {
    for (let i = 0; i < eventTargets.length; i++) {
      const target = eventTargets[i];
      if (target instanceof EventTarget) {
        target[kMaxEventTargetListeners] = n;
        target[kMaxEventTargetListenersWarned] = false;
      } else if (typeof target.setMaxListeners === "function") {
        target.setMaxListeners(n);
      } else {
        throw new ERR_INVALID_ARG_TYPE(
          "eventTargets",
          ["EventEmitter", "EventTarget"],
          target
        );
      }
    }
  }
}
EventEmitter.init = function(opts) {
  if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
  if (opts?.captureRejections) {
    validateBoolean(opts.captureRejections, "options.captureRejections");
    this[kCapture] = Boolean(opts.captureRejections);
  } else {
    this[kCapture] = EventEmitter.prototype[kCapture];
  }
};
function addCatch(that, promise, type, args) {
  if (!that[kCapture]) {
    return;
  }
  try {
    const then = promise.then;
    if (typeof then === "function") {
      then.call(promise, void 0, function(err) {
        process.nextTick(emitUnhandledRejectionOrErr, that, err, type, args);
      });
    }
  } catch (err) {
    that.emit("error", err);
  }
}
function emitUnhandledRejectionOrErr(ee, err, type, args) {
  if (typeof ee[kRejection] === "function") {
    ee[kRejection](err, type, ...args);
  } else {
    const prev = ee[kCapture];
    try {
      ee[kCapture] = false;
      ee.emit("error", err);
    } finally {
      ee[kCapture] = prev;
    }
  }
}
EventEmitter.prototype.setMaxListeners = function setMaxListeners2(n) {
  if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
    throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === void 0) {
    return EventEmitter.defaultMaxListeners;
  }
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type, ...args) {
  let doError = type === "error";
  const events = this._events;
  if (events !== void 0) {
    if (doError && events[kErrorMonitor] !== void 0) {
      this.emit(kErrorMonitor, ...args);
    }
    doError = doError && events.error === void 0;
  } else if (!doError) {
    return false;
  }
  if (doError) {
    let er;
    if (args.length > 0) {
      er = args[0];
    }
    if (er instanceof Error) {
      try {
        const capture = {};
        Error.captureStackTrace(capture, EventEmitter.prototype.emit);
      } catch {
      }
      throw er;
    }
    let stringifiedEr;
    try {
      stringifiedEr = inspect(er);
    } catch {
      stringifiedEr = er;
    }
    const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
    err.context = er;
    throw err;
  }
  const handler = events[type];
  if (handler === void 0) {
    return false;
  }
  if (typeof handler === "function") {
    const result = handler.apply(this, args);
    if (result !== void 0 && result !== null) {
      addCatch(this, result, type, args);
    }
  } else {
    const len = handler.length;
    const listeners2 = arrayClone(handler);
    for (let i = 0; i < len; ++i) {
      const result = listeners2[i].apply(this, args);
      if (result !== void 0 && result !== null) {
        addCatch(this, result, type, args);
      }
    }
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  let m2;
  let events;
  let existing;
  checkListener(listener);
  events = target._events;
  if (events === void 0) {
    events = target._events = /* @__PURE__ */ Object.create(null);
    target._eventsCount = 0;
  } else {
    if (events.newListener !== void 0) {
      target.emit("newListener", type, listener.listener ?? listener);
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === void 0) {
    events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    m2 = _getMaxListeners(target);
    if (m2 > 0 && existing.length > m2 && !existing.warned) {
      existing.warned = true;
      const w = new Error(
        `Possible EventEmitter memory leak detected. ${existing.length} ${String(type)} listeners added to ${inspect(target, { depth: -1 })}. Use emitter.setMaxListeners() to increase limit`
      );
      w.name = "MaxListenersExceededWarning";
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      process.emitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) {
      return this.listener.call(this.target);
    }
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  const state = { fired: false, wrapFn: void 0, target, type, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once2(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  checkListener(listener);
  const events = this._events;
  if (events === void 0) {
    return this;
  }
  const list = events[type];
  if (list === void 0) {
    return this;
  }
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
    } else {
      delete events[type];
      if (events.removeListener) {
        this.emit("removeListener", type, list.listener || listener);
      }
    }
  } else if (typeof list !== "function") {
    let position = -1;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        position = i;
        break;
      }
    }
    if (position < 0) {
      return this;
    }
    if (position === 0) {
      list.shift();
    } else {
      spliceOne(list, position);
    }
    if (list.length === 1) {
      events[type] = list[0];
    }
    if (events.removeListener !== void 0) {
      this.emit("removeListener", type, listener);
    }
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  const events = this._events;
  if (events === void 0) {
    return this;
  }
  if (events.removeListener === void 0) {
    if (arguments.length === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== void 0) {
      if (--this._eventsCount === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
      } else {
        delete events[type];
      }
    }
    return this;
  }
  if (arguments.length === 0) {
    for (const key of Reflect.ownKeys(events)) {
      if (key === "removeListener")
        continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  const listeners2 = events[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2 !== void 0) {
    for (let i = listeners2.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners2[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  const events = target._events;
  if (events === void 0) {
    return [];
  }
  const evlistener = events[type];
  if (evlistener === void 0) {
    return [];
  }
  if (typeof evlistener === "function") {
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  }
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
var _listenerCount = function listenerCount(type) {
  const events = this._events;
  if (events !== void 0) {
    const evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== void 0) {
      return evlistener.length;
    }
  }
  return 0;
};
EventEmitter.prototype.listenerCount = _listenerCount;
function listenerCount2(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  }
  return _listenerCount.call(emitter, type);
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function arrayClone(arr) {
  switch (arr.length) {
    case 2:
      return [arr[0], arr[1]];
    case 3:
      return [arr[0], arr[1], arr[2]];
    case 4:
      return [arr[0], arr[1], arr[2], arr[3]];
    case 5:
      return [arr[0], arr[1], arr[2], arr[3], arr[4]];
    case 6:
      return [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
  }
  return arr.slice();
}
function unwrapListeners(arr) {
  const ret = arrayClone(arr);
  for (let i = 0; i < ret.length; ++i) {
    const orig = ret[i].listener;
    if (typeof orig === "function") {
      ret[i] = orig;
    }
  }
  return ret;
}
function getEventListeners(emitterOrTarget, type) {
  if (typeof emitterOrTarget.listeners === "function") {
    return emitterOrTarget.listeners(type);
  }
  if (emitterOrTarget instanceof EventTarget) {
    const root = emitterOrTarget[kEvents].get(type);
    const listeners2 = [];
    let handler = root?.next;
    while (handler?.listener !== void 0) {
      const listener = handler.listener?.deref ? handler.listener.deref() : handler.listener;
      listeners2.push(listener);
      handler = handler.next;
    }
    return listeners2;
  }
  throw new ERR_INVALID_ARG_TYPE(
    "emitter",
    ["EventEmitter", "EventTarget"],
    emitterOrTarget
  );
}
async function once3(emitter, name, options = {}) {
  const signal = options?.signal;
  validateAbortSignal(signal, "options.signal");
  if (signal?.aborted) {
    throw new AbortError();
  }
  return new Promise((resolve7, reject) => {
    const errorListener = (err) => {
      emitter.removeListener(name, resolver);
      if (signal != null) {
        eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
      }
      reject(err);
    };
    const resolver = (...args) => {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      if (signal != null) {
        eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
      }
      resolve7(args);
    };
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== "error" && typeof emitter.once === "function") {
      emitter.once("error", errorListener);
    }
    function abortListener() {
      eventTargetAgnosticRemoveListener(emitter, name, resolver);
      eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
      reject(new AbortError());
    }
    if (signal != null) {
      eventTargetAgnosticAddListener(
        signal,
        "abort",
        abortListener,
        { once: true }
      );
    }
  });
}
var AsyncIteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(async function* () {
  }).prototype
);
function createIterResult(value, done) {
  return { value, done };
}
function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
  if (typeof emitter.removeListener === "function") {
    emitter.removeListener(name, listener);
  } else if (typeof emitter.removeEventListener === "function") {
    emitter.removeEventListener(name, listener, flags);
  } else {
    throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags?.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, (arg) => {
      listener(arg);
    }, flags);
  } else {
    throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
  }
}
function on(emitter, event, options) {
  const signal = options?.signal;
  validateAbortSignal(signal, "options.signal");
  if (signal?.aborted) {
    throw new AbortError();
  }
  const unconsumedEvents = [];
  const unconsumedPromises = [];
  let error = null;
  let finished = false;
  const iterator = Object.setPrototypeOf({
    next() {
      const value = unconsumedEvents.shift();
      if (value) {
        return Promise.resolve(createIterResult(value, false));
      }
      if (error) {
        const p = Promise.reject(error);
        error = null;
        return p;
      }
      if (finished) {
        return Promise.resolve(createIterResult(void 0, true));
      }
      return new Promise(function(resolve7, reject) {
        unconsumedPromises.push({ resolve: resolve7, reject });
      });
    },
    return() {
      eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
      eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
      if (signal) {
        eventTargetAgnosticRemoveListener(
          signal,
          "abort",
          abortListener,
          { once: true }
        );
      }
      finished = true;
      for (const promise of unconsumedPromises) {
        promise.resolve(createIterResult(void 0, true));
      }
      return Promise.resolve(createIterResult(void 0, true));
    },
    throw(err) {
      if (!err || !(err instanceof Error)) {
        throw new ERR_INVALID_ARG_TYPE(
          "EventEmitter.AsyncIterator",
          "Error",
          err
        );
      }
      error = err;
      eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
      eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  }, AsyncIteratorPrototype);
  eventTargetAgnosticAddListener(emitter, event, eventHandler);
  if (event !== "error" && typeof emitter.on === "function") {
    emitter.on("error", errorHandler);
  }
  if (signal) {
    eventTargetAgnosticAddListener(
      signal,
      "abort",
      abortListener,
      { once: true }
    );
  }
  return iterator;
  function abortListener() {
    errorHandler(new AbortError());
  }
  function eventHandler(...args) {
    const promise = unconsumedPromises.shift();
    if (promise) {
      promise.resolve(createIterResult(args, false));
    } else {
      unconsumedEvents.push(args);
    }
  }
  function errorHandler(err) {
    finished = true;
    const toError = unconsumedPromises.shift();
    if (toError) {
      toError.reject(err);
    } else {
      error = err;
    }
    iterator.return();
  }
}

// https://deno.land/std@0.177.0/flags/mod.ts
var { hasOwn } = Object;
function get(obj, key) {
  if (hasOwn(obj, key)) {
    return obj[key];
  }
}
function getForce(obj, key) {
  const v2 = get(obj, key);
  assert(v2 != null);
  return v2;
}
function isNumber(x) {
  if (typeof x === "number")
    return true;
  if (/^0x[0-9a-f]+$/i.test(String(x)))
    return true;
  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}
function hasKey(obj, keys) {
  let o = obj;
  keys.slice(0, -1).forEach((key2) => {
    o = get(o, key2) ?? {};
  });
  const key = keys[keys.length - 1];
  return hasOwn(o, key);
}
function parse(args, {
  "--": doubleDash = false,
  alias = {},
  boolean = false,
  default: defaults = {},
  stopEarly = false,
  string = [],
  collect = [],
  negatable = [],
  unknown = (i) => i
} = {}) {
  const aliases = {};
  const flags = {
    bools: {},
    strings: {},
    unknownFn: unknown,
    allBools: false,
    collect: {},
    negatable: {}
  };
  if (alias !== void 0) {
    for (const key in alias) {
      const val = getForce(alias, key);
      if (typeof val === "string") {
        aliases[key] = [val];
      } else {
        aliases[key] = val;
      }
      for (const alias2 of getForce(aliases, key)) {
        aliases[alias2] = [key].concat(aliases[key].filter((y) => alias2 !== y));
      }
    }
  }
  if (boolean !== void 0) {
    if (typeof boolean === "boolean") {
      flags.allBools = !!boolean;
    } else {
      const booleanArgs = typeof boolean === "string" ? [boolean] : boolean;
      for (const key of booleanArgs.filter(Boolean)) {
        flags.bools[key] = true;
        const alias2 = get(aliases, key);
        if (alias2) {
          for (const al of alias2) {
            flags.bools[al] = true;
          }
        }
      }
    }
  }
  if (string !== void 0) {
    const stringArgs = typeof string === "string" ? [string] : string;
    for (const key of stringArgs.filter(Boolean)) {
      flags.strings[key] = true;
      const alias2 = get(aliases, key);
      if (alias2) {
        for (const al of alias2) {
          flags.strings[al] = true;
        }
      }
    }
  }
  if (collect !== void 0) {
    const collectArgs = typeof collect === "string" ? [collect] : collect;
    for (const key of collectArgs.filter(Boolean)) {
      flags.collect[key] = true;
      const alias2 = get(aliases, key);
      if (alias2) {
        for (const al of alias2) {
          flags.collect[al] = true;
        }
      }
    }
  }
  if (negatable !== void 0) {
    const negatableArgs = typeof negatable === "string" ? [negatable] : negatable;
    for (const key of negatableArgs.filter(Boolean)) {
      flags.negatable[key] = true;
      const alias2 = get(aliases, key);
      if (alias2) {
        for (const al of alias2) {
          flags.negatable[al] = true;
        }
      }
    }
  }
  const argv2 = { _: [] };
  function argDefined(key, arg) {
    return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
  }
  function setKey(obj, name, value, collect2 = true) {
    let o = obj;
    const keys = name.split(".");
    keys.slice(0, -1).forEach(function(key2) {
      if (get(o, key2) === void 0) {
        o[key2] = {};
      }
      o = get(o, key2);
    });
    const key = keys[keys.length - 1];
    const collectable = collect2 && !!get(flags.collect, name);
    if (!collectable) {
      o[key] = value;
    } else if (get(o, key) === void 0) {
      o[key] = [value];
    } else if (Array.isArray(get(o, key))) {
      o[key].push(value);
    } else {
      o[key] = [get(o, key), value];
    }
  }
  function setArg(key, val, arg = void 0, collect2) {
    if (arg && flags.unknownFn && !argDefined(key, arg)) {
      if (flags.unknownFn(arg, key, val) === false)
        return;
    }
    const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
    setKey(argv2, key, value, collect2);
    const alias2 = get(aliases, key);
    if (alias2) {
      for (const x of alias2) {
        setKey(argv2, x, value, collect2);
      }
    }
  }
  function aliasIsBoolean(key) {
    return getForce(aliases, key).some(
      (x) => typeof get(flags.bools, x) === "boolean"
    );
  }
  let notFlags = [];
  if (args.includes("--")) {
    notFlags = args.slice(args.indexOf("--") + 1);
    args = args.slice(0, args.indexOf("--"));
  }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (/^--.+=/.test(arg)) {
      const m2 = arg.match(/^--([^=]+)=(.*)$/s);
      assert(m2 != null);
      const [, key, value] = m2;
      if (flags.bools[key]) {
        const booleanValue = value !== "false";
        setArg(key, booleanValue, arg);
      } else {
        setArg(key, value, arg);
      }
    } else if (/^--no-.+/.test(arg) && get(flags.negatable, arg.replace(/^--no-/, ""))) {
      const m2 = arg.match(/^--no-(.+)/);
      assert(m2 != null);
      setArg(m2[1], false, arg, false);
    } else if (/^--.+/.test(arg)) {
      const m2 = arg.match(/^--(.+)/);
      assert(m2 != null);
      const [, key] = m2;
      const next = args[i + 1];
      if (next !== void 0 && !/^-/.test(next) && !get(flags.bools, key) && !flags.allBools && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
        setArg(key, next, arg);
        i++;
      } else if (/^(true|false)$/.test(next)) {
        setArg(key, next === "true", arg);
        i++;
      } else {
        setArg(key, get(flags.strings, key) ? "" : true, arg);
      }
    } else if (/^-[^-]+/.test(arg)) {
      const letters = arg.slice(1, -1).split("");
      let broken = false;
      for (let j2 = 0; j2 < letters.length; j2++) {
        const next = arg.slice(j2 + 2);
        if (next === "-") {
          setArg(letters[j2], next, arg);
          continue;
        }
        if (/[A-Za-z]/.test(letters[j2]) && /=/.test(next)) {
          setArg(letters[j2], next.split(/=(.+)/)[1], arg);
          broken = true;
          break;
        }
        if (/[A-Za-z]/.test(letters[j2]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
          setArg(letters[j2], next, arg);
          broken = true;
          break;
        }
        if (letters[j2 + 1] && letters[j2 + 1].match(/\W/)) {
          setArg(letters[j2], arg.slice(j2 + 2), arg);
          broken = true;
          break;
        } else {
          setArg(letters[j2], get(flags.strings, letters[j2]) ? "" : true, arg);
        }
      }
      const [key] = arg.slice(-1);
      if (!broken && key !== "-") {
        if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !get(flags.bools, key) && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
          setArg(key, args[i + 1], arg);
          i++;
        } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
          setArg(key, args[i + 1] === "true", arg);
          i++;
        } else {
          setArg(key, get(flags.strings, key) ? "" : true, arg);
        }
      }
    } else {
      if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
        argv2._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
      }
      if (stopEarly) {
        argv2._.push(...args.slice(i + 1));
        break;
      }
    }
  }
  for (const [key, value] of Object.entries(defaults)) {
    if (!hasKey(argv2, key.split("."))) {
      setKey(argv2, key, value);
      if (aliases[key]) {
        for (const x of aliases[key]) {
          setKey(argv2, x, value);
        }
      }
    }
  }
  for (const key of Object.keys(flags.bools)) {
    if (!hasKey(argv2, key.split("."))) {
      const value = get(flags.collect, key) ? [] : false;
      setKey(
        argv2,
        key,
        value,
        false
      );
    }
  }
  for (const key of Object.keys(flags.strings)) {
    if (!hasKey(argv2, key.split(".")) && get(flags.collect, key)) {
      setKey(
        argv2,
        key,
        [],
        false
      );
    }
  }
  if (doubleDash) {
    argv2["--"] = [];
    for (const key of notFlags) {
      argv2["--"].push(key);
    }
  } else {
    for (const key of notFlags) {
      argv2._.push(key);
    }
  }
  return argv2;
}

// https://deno.land/std@0.177.0/node/internal_binding/node_options.ts
function getOptions() {
  const { Deno: Deno3 } = globalThis;
  const args = parse(Deno3?.args ?? []);
  const options = new Map(
    Object.entries(args).map(([key, value]) => [key, { value }])
  );
  return { options };
}

// https://deno.land/std@0.177.0/node/internal/options.ts
var optionsMap;
function getOptionsFromBinding() {
  if (!optionsMap) {
    ({ options: optionsMap } = getOptions());
  }
  return optionsMap;
}
function getOptionValue(optionName) {
  const options = getOptionsFromBinding();
  if (optionName.startsWith("--no-")) {
    const option = options.get("--" + optionName.slice(5));
    return option && !option.value;
  }
  return options.get(optionName)?.value;
}

// https://deno.land/std@0.177.0/path/win32.ts
var win32_exports = {};
__export(win32_exports, {
  basename: () => basename,
  delimiter: () => delimiter,
  dirname: () => dirname,
  extname: () => extname,
  format: () => format,
  fromFileUrl: () => fromFileUrl,
  isAbsolute: () => isAbsolute,
  join: () => join2,
  normalize: () => normalize,
  parse: () => parse2,
  relative: () => relative,
  resolve: () => resolve,
  sep: () => sep,
  toFileUrl: () => toFileUrl,
  toNamespacedPath: () => toNamespacedPath
});

// https://deno.land/std@0.177.0/path/_constants.ts
var CHAR_UPPERCASE_A = 65;
var CHAR_LOWERCASE_A = 97;
var CHAR_UPPERCASE_Z = 90;
var CHAR_LOWERCASE_Z = 122;
var CHAR_DOT = 46;
var CHAR_FORWARD_SLASH = 47;
var CHAR_BACKWARD_SLASH = 92;
var CHAR_COLON = 58;
var CHAR_QUESTION_MARK = 63;

// https://deno.land/std@0.177.0/path/_util.ts
function assertPath(path5) {
  if (typeof path5 !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path5)}`
    );
  }
}
function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code) {
  return isPosixPathSeparator(code) || code === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
  return code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z;
}
function normalizeString(path5, allowAboveRoot, separator, isPathSeparator3) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i = 0, len = path5.length; i <= len; ++i) {
    if (i < len)
      code = path5.charCodeAt(i);
    else if (isPathSeparator3(code))
      break;
    else
      code = CHAR_FORWARD_SLASH;
    if (isPathSeparator3(code)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += `${separator}..`;
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += separator + path5.slice(lastSlash + 1, i);
        else
          res = path5.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep7, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base2 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir)
    return base2;
  if (base2 === sep7)
    return dir;
  if (dir === pathObject.root)
    return dir + base2;
  return dir + sep7 + base2;
}
var WHITESPACE_ENCODINGS = {
  "	": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  " ": "%20"
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}
function lastPathSegment(path5, isSep, start = 0) {
  let matchedNonSeparator = false;
  let end = path5.length;
  for (let i = path5.length - 1; i >= start; --i) {
    if (isSep(path5.charCodeAt(i))) {
      if (matchedNonSeparator) {
        start = i + 1;
        break;
      }
    } else if (!matchedNonSeparator) {
      matchedNonSeparator = true;
      end = i + 1;
    }
  }
  return path5.slice(start, end);
}
function stripTrailingSeparators(segment, isSep) {
  if (segment.length <= 1) {
    return segment;
  }
  let end = segment.length;
  for (let i = segment.length - 1; i > 0; i--) {
    if (isSep(segment.charCodeAt(i))) {
      end = i;
    } else {
      break;
    }
  }
  return segment.slice(0, end);
}
function stripSuffix(name, suffix) {
  if (suffix.length >= name.length) {
    return name;
  }
  const lenDiff = name.length - suffix.length;
  for (let i = suffix.length - 1; i >= 0; --i) {
    if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
      return name;
    }
  }
  return name.slice(0, -suffix.length);
}

// https://deno.land/std@0.177.0/path/win32.ts
var sep = "\\";
var delimiter = ";";
function resolve(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path5;
    const { Deno: Deno3 } = globalThis;
    if (i >= 0) {
      path5 = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path5 = Deno3.cwd();
    } else {
      if (typeof Deno3?.env?.get !== "function" || typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno3.cwd();
      if (path5 === void 0 || path5.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path5 = `${resolvedDevice}\\`;
      }
    }
    assertPath(path5);
    const len = path5.length;
    if (len === 0)
      continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute7 = false;
    const code = path5.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        isAbsolute7 = true;
        if (isPathSeparator(path5.charCodeAt(1))) {
          let j2 = 2;
          let last = j2;
          for (; j2 < len; ++j2) {
            if (isPathSeparator(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            const firstPart = path5.slice(last, j2);
            last = j2;
            for (; j2 < len; ++j2) {
              if (!isPathSeparator(path5.charCodeAt(j2)))
                break;
            }
            if (j2 < len && j2 !== last) {
              last = j2;
              for (; j2 < len; ++j2) {
                if (isPathSeparator(path5.charCodeAt(j2)))
                  break;
              }
              if (j2 === len) {
                device = `\\\\${firstPart}\\${path5.slice(last)}`;
                rootEnd = j2;
              } else if (j2 !== last) {
                device = `\\\\${firstPart}\\${path5.slice(last, j2)}`;
                rootEnd = j2;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code)) {
        if (path5.charCodeAt(1) === CHAR_COLON) {
          device = path5.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path5.charCodeAt(2))) {
              isAbsolute7 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      rootEnd = 1;
      isAbsolute7 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path5.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute7;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0)
      break;
  }
  resolvedTail = normalizeString(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0)
    return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute7 = false;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      isAbsolute7 = true;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          const firstPart = path5.slice(last, j2);
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              return `\\\\${firstPart}\\${path5.slice(last)}\\`;
            } else if (j2 !== last) {
              device = `\\\\${firstPart}\\${path5.slice(last, j2)}`;
              rootEnd = j2;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        device = path5.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2))) {
            isAbsolute7 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(
      path5.slice(rootEnd),
      !isAbsolute7,
      "\\",
      isPathSeparator
    );
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute7)
    tail = ".";
  if (tail.length > 0 && isPathSeparator(path5.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute7) {
      if (tail.length > 0)
        return `\\${tail}`;
      else
        return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute7) {
    if (tail.length > 0)
      return `${device}\\${tail}`;
    else
      return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
function isAbsolute(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0)
    return false;
  const code = path5.charCodeAt(0);
  if (isPathSeparator(code)) {
    return true;
  } else if (isWindowsDeviceRoot(code)) {
    if (len > 2 && path5.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path5.charCodeAt(2)))
        return true;
    }
  }
  return false;
}
function join2(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0)
    return ".";
  let joined;
  let firstPart = null;
  for (let i = 0; i < pathsCount; ++i) {
    const path5 = paths[i];
    assertPath(path5);
    if (path5.length > 0) {
      if (joined === void 0)
        joined = firstPart = path5;
      else
        joined += `\\${path5}`;
    }
  }
  if (joined === void 0)
    return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart != null);
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2)))
            ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount)))
        break;
    }
    if (slashCount >= 2)
      joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize(joined);
}
function relative(from2, to) {
  assertPath(from2);
  assertPath(to);
  if (from2 === to)
    return "";
  const fromOrig = resolve(from2);
  const toOrig = resolve(to);
  if (fromOrig === toOrig)
    return "";
  from2 = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from2 === to)
    return "";
  let fromStart = 0;
  let fromEnd = from2.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from2.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH)
      break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from2.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH)
      break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH)
      break;
  }
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH)
      break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) {
          return toOrig.slice(toStart + i);
        }
      }
      if (fromLen > length) {
        if (from2.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
          lastCommonSep = i;
        } else if (i === 2) {
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from2.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (fromCode === CHAR_BACKWARD_SLASH)
      lastCommonSep = i;
  }
  if (i !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1)
    lastCommonSep = 0;
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from2.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
      if (out.length === 0)
        out += "..";
      else
        out += "\\..";
    }
  }
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH)
      ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
function toNamespacedPath(path5) {
  if (typeof path5 !== "string")
    return path5;
  if (path5.length === 0)
    return "";
  const resolvedPath = resolve(path5);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      if (resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path5;
}
function dirname(path5) {
  assertPath(path5);
  const len = path5.length;
  if (len === 0)
    return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              return path5;
            }
            if (j2 !== last) {
              rootEnd = offset = j2 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2)))
            rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    return path5;
  }
  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator(path5.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1)
      return ".";
    else
      end = rootEnd;
  }
  return stripTrailingSeparators(path5.slice(0, end), isPosixPathSeparator);
}
function basename(path5, suffix = "") {
  assertPath(path5);
  if (path5.length === 0)
    return path5;
  if (typeof suffix !== "string") {
    throw new TypeError(
      `Suffix must be a string. Received ${JSON.stringify(suffix)}`
    );
  }
  let start = 0;
  if (path5.length >= 2) {
    const drive = path5.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) {
      if (path5.charCodeAt(1) === CHAR_COLON)
        start = 2;
    }
  }
  const lastSegment = lastPathSegment(path5, isPathSeparator, start);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function extname(path5) {
  assertPath(path5);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path5.length >= 2 && path5.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path5.charCodeAt(0))) {
    start = startPart = 2;
  }
  for (let i = path5.length - 1; i >= start; --i) {
    const code = path5.charCodeAt(i);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("\\", pathObject);
}
function parse2(path5) {
  assertPath(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path5.length;
  if (len === 0)
    return ret;
  let rootEnd = 0;
  let code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = 1;
      if (isPathSeparator(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              rootEnd = j2;
            } else if (j2 !== last) {
              rootEnd = j2 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path5.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path5;
              ret.base = "\\";
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path5;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    ret.root = ret.dir = path5;
    ret.base = "\\";
    return ret;
  }
  if (rootEnd > 0)
    ret.root = path5.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path5.length - 1;
  let preDotState = 0;
  for (; i >= rootEnd; --i) {
    code = path5.charCodeAt(i);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path5.slice(startPart, end);
    }
  } else {
    ret.name = path5.slice(startPart, startDot);
    ret.base = path5.slice(startPart, end);
    ret.ext = path5.slice(startDot, end);
  }
  ret.base = ret.base || "\\";
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path5.slice(0, startPart - 1);
  } else
    ret.dir = ret.root;
  return ret;
}
function fromFileUrl(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  let path5 = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname != "") {
    path5 = `\\\\${url.hostname}${path5}`;
  }
  return path5;
}
function toFileUrl(path5) {
  if (!isAbsolute(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const [, hostname, pathname] = path5.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname != null && hostname != "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}

// https://deno.land/std@0.177.0/path/posix.ts
var posix_exports = {};
__export(posix_exports, {
  basename: () => basename2,
  delimiter: () => delimiter2,
  dirname: () => dirname2,
  extname: () => extname2,
  format: () => format2,
  fromFileUrl: () => fromFileUrl2,
  isAbsolute: () => isAbsolute2,
  join: () => join3,
  normalize: () => normalize2,
  parse: () => parse3,
  relative: () => relative2,
  resolve: () => resolve2,
  sep: () => sep2,
  toFileUrl: () => toFileUrl2,
  toNamespacedPath: () => toNamespacedPath2
});
var sep2 = "/";
var delimiter2 = ":";
function resolve2(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path5;
    if (i >= 0)
      path5 = pathSegments[i];
    else {
      const { Deno: Deno3 } = globalThis;
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno3.cwd();
    }
    assertPath(path5);
    if (path5.length === 0) {
      continue;
    }
    resolvedPath = `${path5}/${resolvedPath}`;
    resolvedAbsolute = isPosixPathSeparator(path5.charCodeAt(0));
  }
  resolvedPath = normalizeString(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0)
      return `/${resolvedPath}`;
    else
      return "/";
  } else if (resolvedPath.length > 0)
    return resolvedPath;
  else
    return ".";
}
function normalize2(path5) {
  assertPath(path5);
  if (path5.length === 0)
    return ".";
  const isAbsolute7 = isPosixPathSeparator(path5.charCodeAt(0));
  const trailingSeparator = isPosixPathSeparator(
    path5.charCodeAt(path5.length - 1)
  );
  path5 = normalizeString(path5, !isAbsolute7, "/", isPosixPathSeparator);
  if (path5.length === 0 && !isAbsolute7)
    path5 = ".";
  if (path5.length > 0 && trailingSeparator)
    path5 += "/";
  if (isAbsolute7)
    return `/${path5}`;
  return path5;
}
function isAbsolute2(path5) {
  assertPath(path5);
  return path5.length > 0 && isPosixPathSeparator(path5.charCodeAt(0));
}
function join3(...paths) {
  if (paths.length === 0)
    return ".";
  let joined;
  for (let i = 0, len = paths.length; i < len; ++i) {
    const path5 = paths[i];
    assertPath(path5);
    if (path5.length > 0) {
      if (!joined)
        joined = path5;
      else
        joined += `/${path5}`;
    }
  }
  if (!joined)
    return ".";
  return normalize2(joined);
}
function relative2(from2, to) {
  assertPath(from2);
  assertPath(to);
  if (from2 === to)
    return "";
  from2 = resolve2(from2);
  to = resolve2(to);
  if (from2 === to)
    return "";
  let fromStart = 1;
  const fromEnd = from2.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (!isPosixPathSeparator(from2.charCodeAt(fromStart)))
      break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (!isPosixPathSeparator(to.charCodeAt(toStart)))
      break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (isPosixPathSeparator(to.charCodeAt(toStart + i))) {
          return to.slice(toStart + i + 1);
        } else if (i === 0) {
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (isPosixPathSeparator(from2.charCodeAt(fromStart + i))) {
          lastCommonSep = i;
        } else if (i === 0) {
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from2.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (isPosixPathSeparator(fromCode))
      lastCommonSep = i;
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || isPosixPathSeparator(from2.charCodeAt(i))) {
      if (out.length === 0)
        out += "..";
      else
        out += "/..";
    }
  }
  if (out.length > 0)
    return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (isPosixPathSeparator(to.charCodeAt(toStart)))
      ++toStart;
    return to.slice(toStart);
  }
}
function toNamespacedPath2(path5) {
  return path5;
}
function dirname2(path5) {
  if (path5.length === 0)
    return ".";
  let end = -1;
  let matchedNonSeparator = false;
  for (let i = path5.length - 1; i >= 1; --i) {
    if (isPosixPathSeparator(path5.charCodeAt(i))) {
      if (matchedNonSeparator) {
        end = i;
        break;
      }
    } else {
      matchedNonSeparator = true;
    }
  }
  if (end === -1) {
    return isPosixPathSeparator(path5.charCodeAt(0)) ? "/" : ".";
  }
  return stripTrailingSeparators(
    path5.slice(0, end),
    isPosixPathSeparator
  );
}
function basename2(path5, suffix = "") {
  assertPath(path5);
  if (path5.length === 0)
    return path5;
  if (typeof suffix !== "string") {
    throw new TypeError(
      `Suffix must be a string. Received ${JSON.stringify(suffix)}`
    );
  }
  const lastSegment = lastPathSegment(path5, isPosixPathSeparator);
  const strippedSegment = stripTrailingSeparators(
    lastSegment,
    isPosixPathSeparator
  );
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function extname2(path5) {
  assertPath(path5);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i = path5.length - 1; i >= 0; --i) {
    const code = path5.charCodeAt(i);
    if (isPosixPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format2(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("/", pathObject);
}
function parse3(path5) {
  assertPath(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path5.length === 0)
    return ret;
  const isAbsolute7 = isPosixPathSeparator(path5.charCodeAt(0));
  let start;
  if (isAbsolute7) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path5.length - 1;
  let preDotState = 0;
  for (; i >= start; --i) {
    const code = path5.charCodeAt(i);
    if (isPosixPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute7) {
        ret.base = ret.name = path5.slice(1, end);
      } else {
        ret.base = ret.name = path5.slice(startPart, end);
      }
    }
    ret.base = ret.base || "/";
  } else {
    if (startPart === 0 && isAbsolute7) {
      ret.name = path5.slice(1, startDot);
      ret.base = path5.slice(1, end);
    } else {
      ret.name = path5.slice(startPart, startDot);
      ret.base = path5.slice(startPart, end);
    }
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0) {
    ret.dir = stripTrailingSeparators(
      path5.slice(0, startPart - 1),
      isPosixPathSeparator
    );
  } else if (isAbsolute7)
    ret.dir = "/";
  return ret;
}
function fromFileUrl2(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  );
}
function toFileUrl2(path5) {
  if (!isAbsolute2(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path5.replace(/%/g, "%25").replace(/\\/g, "%5C")
  );
  return url;
}

// https://deno.land/std@0.177.0/path/glob.ts
var path = isWindows ? win32_exports : posix_exports;
var { join: join4, normalize: normalize3 } = path;

// https://deno.land/std@0.177.0/path/mod.ts
var path2 = isWindows ? win32_exports : posix_exports;
var {
  basename: basename3,
  delimiter: delimiter3,
  dirname: dirname3,
  extname: extname3,
  format: format3,
  fromFileUrl: fromFileUrl3,
  isAbsolute: isAbsolute3,
  join: join5,
  normalize: normalize4,
  parse: parse4,
  relative: relative3,
  resolve: resolve3,
  sep: sep3,
  toFileUrl: toFileUrl3,
  toNamespacedPath: toNamespacedPath3
} = path2;

// https://deno.land/std@0.177.0/node/_process/process.ts
function _arch() {
  if (Deno.build.arch == "x86_64") {
    return "x64";
  } else if (Deno.build.arch == "aarch64") {
    return "arm64";
  } else {
    throw Error("unreachable");
  }
}
var arch = _arch();
var chdir = Deno.chdir;
var cwd = Deno.cwd;
var nextTick3 = nextTick2;
function denoEnvGet(name) {
  try {
    return Deno.env.get(name);
  } catch (e) {
    if (e instanceof TypeError) {
      return void 0;
    }
    throw e;
  }
}
var OBJECT_PROTO_PROP_NAMES = Object.getOwnPropertyNames(Object.prototype);
var env = new Proxy(Object(), {
  get: (target, prop) => {
    if (typeof prop === "symbol") {
      return target[prop];
    }
    const envValue = denoEnvGet(prop);
    if (envValue) {
      return envValue;
    }
    if (OBJECT_PROTO_PROP_NAMES.includes(prop)) {
      return target[prop];
    }
    return envValue;
  },
  ownKeys: () => Reflect.ownKeys(Deno.env.toObject()),
  getOwnPropertyDescriptor: (_target, name) => {
    const value = denoEnvGet(String(name));
    if (value) {
      return {
        enumerable: true,
        configurable: true,
        value
      };
    }
  },
  set(_target, prop, value) {
    Deno.env.set(String(prop), String(value));
    return true;
  },
  has: (_target, prop) => typeof denoEnvGet(String(prop)) === "string"
});
var pid = Deno.pid;
var platform = isWindows ? "win32" : Deno.build.os;
var version = "v18.12.1";
var versions = {
  node: "18.12.1",
  uv: "1.43.0",
  zlib: "1.2.11",
  brotli: "1.0.9",
  ares: "1.18.1",
  modules: "108",
  nghttp2: "1.47.0",
  napi: "8",
  llhttp: "6.0.10",
  openssl: "3.0.7+quic",
  cldr: "41.0",
  icu: "71.1",
  tz: "2022b",
  unicode: "14.0",
  ngtcp2: "0.8.1",
  nghttp3: "0.7.0",
  ...Deno.version
};

// https://deno.land/std@0.177.0/node/internal/readline/utils.mjs
var kEscape = "\x1B";
var kSubstringSearch = Symbol("kSubstringSearch");
function CSI(strings, ...args) {
  let ret = `${kEscape}[`;
  for (let n = 0; n < strings.length; n++) {
    ret += strings[n];
    if (n < args.length) {
      ret += args[n];
    }
  }
  return ret;
}
CSI.kEscape = kEscape;
CSI.kClearToLineBeginning = CSI`1K`;
CSI.kClearToLineEnd = CSI`0K`;
CSI.kClearLine = CSI`2K`;
CSI.kClearScreenDown = CSI`0J`;

// https://deno.land/std@0.177.0/node/internal/readline/callbacks.mjs
var {
  kClearLine,
  kClearScreenDown,
  kClearToLineBeginning,
  kClearToLineEnd
} = CSI;
function cursorTo(stream, x, y, callback) {
  if (callback !== void 0) {
    validateFunction(callback, "callback");
  }
  if (typeof y === "function") {
    callback = y;
    y = void 0;
  }
  if (Number.isNaN(x))
    throw new ERR_INVALID_ARG_VALUE("x", x);
  if (Number.isNaN(y))
    throw new ERR_INVALID_ARG_VALUE("y", y);
  if (stream == null || typeof x !== "number" && typeof y !== "number") {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  if (typeof x !== "number")
    throw new ERR_INVALID_CURSOR_POS();
  const data = typeof y !== "number" ? CSI`${x + 1}G` : CSI`${y + 1};${x + 1}H`;
  return stream.write(data, callback);
}
function moveCursor(stream, dx, dy, callback) {
  if (callback !== void 0) {
    validateFunction(callback, "callback");
  }
  if (stream == null || !(dx || dy)) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  let data = "";
  if (dx < 0) {
    data += CSI`${-dx}D`;
  } else if (dx > 0) {
    data += CSI`${dx}C`;
  }
  if (dy < 0) {
    data += CSI`${-dy}A`;
  } else if (dy > 0) {
    data += CSI`${dy}B`;
  }
  return stream.write(data, callback);
}
function clearLine(stream, dir, callback) {
  if (callback !== void 0) {
    validateFunction(callback, "callback");
  }
  if (stream === null || stream === void 0) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  const type = dir < 0 ? kClearToLineBeginning : dir > 0 ? kClearToLineEnd : kClearLine;
  return stream.write(type, callback);
}
function clearScreenDown(stream, callback) {
  if (callback !== void 0) {
    validateFunction(callback, "callback");
  }
  if (stream === null || stream === void 0) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  return stream.write(kClearScreenDown, callback);
}

// https://deno.land/std@0.177.0/node/_process/stdio.mjs
var stdio = {};

// https://deno.land/std@0.177.0/node/string_decoder.ts
var NotImplemented = /* @__PURE__ */ ((NotImplemented2) => {
  NotImplemented2[NotImplemented2["ascii"] = 0] = "ascii";
  NotImplemented2[NotImplemented2["latin1"] = 1] = "latin1";
  NotImplemented2[NotImplemented2["utf16le"] = 2] = "utf16le";
  return NotImplemented2;
})(NotImplemented || {});
function normalizeEncoding3(enc) {
  const encoding = normalizeEncoding2(enc ?? null);
  if (encoding && encoding in NotImplemented)
    notImplemented(encoding);
  if (!encoding && typeof enc === "string" && enc.toLowerCase() !== "raw") {
    throw new Error(`Unknown encoding: ${enc}`);
  }
  return String(encoding);
}
function isBufferType(buf) {
  return buf instanceof ArrayBuffer && buf.BYTES_PER_ELEMENT;
}
function utf8CheckByte(byte) {
  if (byte <= 127)
    return 0;
  else if (byte >> 5 === 6)
    return 2;
  else if (byte >> 4 === 14)
    return 3;
  else if (byte >> 3 === 30)
    return 4;
  return byte >> 6 === 2 ? -1 : -2;
}
function utf8CheckIncomplete(self, buf, i) {
  let j2 = buf.length - 1;
  if (j2 < i)
    return 0;
  let nb = utf8CheckByte(buf[j2]);
  if (nb >= 0) {
    if (nb > 0)
      self.lastNeed = nb - 1;
    return nb;
  }
  if (--j2 < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j2]);
  if (nb >= 0) {
    if (nb > 0)
      self.lastNeed = nb - 2;
    return nb;
  }
  if (--j2 < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j2]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2)
        nb = 0;
      else
        self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}
function utf8CheckExtraBytes(self, buf) {
  if ((buf[0] & 192) !== 128) {
    self.lastNeed = 0;
    return "\uFFFD";
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 192) !== 128) {
      self.lastNeed = 1;
      return "\uFFFD";
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 192) !== 128) {
        self.lastNeed = 2;
        return "\uFFFD";
      }
    }
  }
}
function utf8FillLastComplete(buf) {
  const p = this.lastTotal - this.lastNeed;
  const r = utf8CheckExtraBytes(this, buf);
  if (r !== void 0)
    return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}
function utf8FillLastIncomplete(buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
}
function utf8Text(buf, i) {
  const total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed)
    return buf.toString("utf8", i);
  this.lastTotal = total;
  const end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString("utf8", i, end);
}
function utf8End(buf) {
  const r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed)
    return r + "\uFFFD";
  return r;
}
function utf8Write2(buf) {
  if (typeof buf === "string") {
    return buf;
  }
  if (buf.length === 0)
    return "";
  let r;
  let i;
  const normalizedBuffer = isBufferType(buf) ? buf : Buffer2.from(buf);
  if (this.lastNeed) {
    r = this.fillLast(normalizedBuffer);
    if (r === void 0)
      return "";
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) {
    return r ? r + this.text(normalizedBuffer, i) : this.text(normalizedBuffer, i);
  }
  return r || "";
}
function base64Text(buf, i) {
  const n = (buf.length - i) % 3;
  if (n === 0)
    return buf.toString("base64", i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString("base64", i, buf.length - n);
}
function base64End(buf) {
  const r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) {
    return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
  }
  return r;
}
function simpleWrite(buf) {
  if (typeof buf === "string") {
    return buf;
  }
  return buf.toString(this.encoding);
}
function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : "";
}
var StringDecoderBase = class {
  constructor(encoding, nb) {
    this.encoding = encoding;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  lastChar;
  lastNeed = 0;
  lastTotal = 0;
};
var Base64Decoder = class extends StringDecoderBase {
  end = base64End;
  fillLast = utf8FillLastIncomplete;
  text = base64Text;
  write = utf8Write2;
  constructor(encoding) {
    super(normalizeEncoding3(encoding), 3);
  }
};
var GenericDecoder = class extends StringDecoderBase {
  end = simpleEnd;
  fillLast = void 0;
  text = utf8Text;
  write = simpleWrite;
  constructor(encoding) {
    super(normalizeEncoding3(encoding), 4);
  }
};
var Utf8Decoder = class extends StringDecoderBase {
  end = utf8End;
  fillLast = utf8FillLastComplete;
  text = utf8Text;
  write = utf8Write2;
  constructor(encoding) {
    super(normalizeEncoding3(encoding), 4);
  }
};
var StringDecoder = class {
  encoding;
  end;
  fillLast;
  lastChar;
  lastNeed;
  lastTotal;
  text;
  write;
  constructor(encoding) {
    const normalizedEncoding = normalizeEncoding3(encoding);
    let decoder2;
    switch (normalizedEncoding) {
      case "utf8":
        decoder2 = new Utf8Decoder(encoding);
        break;
      case "base64":
        decoder2 = new Base64Decoder(encoding);
        break;
      default:
        decoder2 = new GenericDecoder(encoding);
    }
    this.encoding = decoder2.encoding;
    this.end = decoder2.end;
    this.fillLast = decoder2.fillLast;
    this.lastChar = decoder2.lastChar;
    this.lastNeed = decoder2.lastNeed;
    this.lastTotal = decoder2.lastTotal;
    this.text = decoder2.text;
    this.write = decoder2.write;
  }
};
var PStringDecoder = new Proxy(StringDecoder, {
  apply(_target, thisArg, args) {
    return Object.assign(thisArg, new StringDecoder(...args));
  }
});
var string_decoder_default2 = { StringDecoder: PStringDecoder };

// https://deno.land/std@0.177.0/node/internal/streams/destroy.mjs
var kDestroy = Symbol("kDestroy");
var kConstruct = Symbol("kConstruct");
function checkError(err, w, r) {
  if (err) {
    err.stack;
    if (w && !w.errored) {
      w.errored = err;
    }
    if (r && !r.errored) {
      r.errored = err;
    }
  }
}
function destroy(err, cb) {
  const r = this._readableState;
  const w = this._writableState;
  const s = w || r;
  if (w && w.destroyed || r && r.destroyed) {
    if (typeof cb === "function") {
      cb();
    }
    return this;
  }
  checkError(err, w, r);
  if (w) {
    w.destroyed = true;
  }
  if (r) {
    r.destroyed = true;
  }
  if (!s.constructed) {
    this.once(kDestroy, function(er) {
      _destroy(this, aggregateTwoErrors(er, err), cb);
    });
  } else {
    _destroy(this, err, cb);
  }
  return this;
}
function _destroy(self, err, cb) {
  let called = false;
  function onDestroy(err2) {
    if (called) {
      return;
    }
    called = true;
    const r = self._readableState;
    const w = self._writableState;
    checkError(err2, w, r);
    if (w) {
      w.closed = true;
    }
    if (r) {
      r.closed = true;
    }
    if (typeof cb === "function") {
      cb(err2);
    }
    if (err2) {
      nextTick3(emitErrorCloseNT, self, err2);
    } else {
      nextTick3(emitCloseNT, self);
    }
  }
  try {
    const result = self._destroy(err || null, onDestroy);
    if (result != null) {
      const then = result.then;
      if (typeof then === "function") {
        then.call(
          result,
          function() {
            nextTick3(onDestroy, null);
          },
          function(err2) {
            nextTick3(onDestroy, err2);
          }
        );
      }
    }
  } catch (err2) {
    onDestroy(err2);
  }
}
function emitErrorCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  const r = self._readableState;
  const w = self._writableState;
  if (w) {
    w.closeEmitted = true;
  }
  if (r) {
    r.closeEmitted = true;
  }
  if (w && w.emitClose || r && r.emitClose) {
    self.emit("close");
  }
}
function emitErrorNT(self, err) {
  const r = self._readableState;
  const w = self._writableState;
  if (w && w.errorEmitted || r && r.errorEmitted) {
    return;
  }
  if (w) {
    w.errorEmitted = true;
  }
  if (r) {
    r.errorEmitted = true;
  }
  self.emit("error", err);
}
function errorOrDestroy(stream, err, sync) {
  const r = stream._readableState;
  const w = stream._writableState;
  if (w && w.destroyed || r && r.destroyed) {
    return this;
  }
  if (r && r.autoDestroy || w && w.autoDestroy) {
    stream.destroy(err);
  } else if (err) {
    err.stack;
    if (w && !w.errored) {
      w.errored = err;
    }
    if (r && !r.errored) {
      r.errored = err;
    }
    if (sync) {
      nextTick3(emitErrorNT, stream, err);
    } else {
      emitErrorNT(stream, err);
    }
  }
}

// https://deno.land/std@0.177.0/node/internal/streams/end-of-stream.mjs
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
function isServerResponse(stream) {
  return typeof stream._sent100 === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean" && typeof stream._removedTE === "boolean" && typeof stream._closed === "boolean";
}
function isReadable(stream) {
  return typeof stream.readable === "boolean" || typeof stream.readableEnded === "boolean" || !!stream._readableState;
}
function isWritable(stream) {
  return typeof stream.writable === "boolean" || typeof stream.writableEnded === "boolean" || !!stream._writableState;
}
function isWritableFinished(stream) {
  if (stream.writableFinished)
    return true;
  const wState = stream._writableState;
  if (!wState || wState.errored)
    return false;
  return wState.finished || wState.ended && wState.length === 0;
}
var nop = () => {
};
function isReadableEnded(stream) {
  if (stream.readableEnded)
    return true;
  const rState = stream._readableState;
  if (!rState || rState.errored)
    return false;
  return rState.endEmitted || rState.ended && rState.length === 0;
}
function eos(stream, options, callback) {
  if (arguments.length === 2) {
    callback = options;
    options = {};
  } else if (options == null) {
    options = {};
  } else {
    validateObject(options, "options");
  }
  validateFunction(callback, "callback");
  validateAbortSignal(options.signal, "options.signal");
  callback = once(callback);
  const readable = options.readable || options.readable !== false && isReadable(stream);
  const writable = options.writable || options.writable !== false && isWritable(stream);
  const wState = stream._writableState;
  const rState = stream._readableState;
  const state = wState || rState;
  const onlegacyfinish = () => {
    if (!stream.writable)
      onfinish();
  };
  let willEmitClose = isServerResponse(stream) || state && state.autoDestroy && state.emitClose && state.closed === false && isReadable(stream) === readable && isWritable(stream) === writable;
  let writableFinished = stream.writableFinished || wState && wState.finished;
  const onfinish = () => {
    writableFinished = true;
    if (stream.destroyed)
      willEmitClose = false;
    if (willEmitClose && (!stream.readable || readable))
      return;
    if (!readable || readableEnded)
      callback.call(stream);
  };
  let readableEnded = stream.readableEnded || rState && rState.endEmitted;
  const onend = () => {
    readableEnded = true;
    if (stream.destroyed)
      willEmitClose = false;
    if (willEmitClose && (!stream.writable || writable))
      return;
    if (!writable || writableFinished)
      callback.call(stream);
  };
  const onerror = (err) => {
    callback.call(stream, err);
  };
  const onclose = () => {
    if (readable && !readableEnded) {
      if (!isReadableEnded(stream)) {
        return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
      }
    }
    if (writable && !writableFinished) {
      if (!isWritableFinished(stream)) {
        return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
      }
    }
    callback.call(stream);
  };
  const onrequest = () => {
    stream.req.on("finish", onfinish);
  };
  if (isRequest(stream)) {
    stream.on("complete", onfinish);
    if (!willEmitClose) {
      stream.on("abort", onclose);
    }
    if (stream.req)
      onrequest();
    else
      stream.on("request", onrequest);
  } else if (writable && !wState) {
    stream.on("end", onlegacyfinish);
    stream.on("close", onlegacyfinish);
  }
  if (!willEmitClose && typeof stream.aborted === "boolean") {
    stream.on("aborted", onclose);
  }
  stream.on("end", onend);
  stream.on("finish", onfinish);
  if (options.error !== false)
    stream.on("error", onerror);
  stream.on("close", onclose);
  const closed = !wState && !rState && stream._closed === true || (wState && wState.closed || rState && rState.closed || wState && wState.errorEmitted || rState && rState.errorEmitted || rState && stream.req && stream.aborted || (!wState || !willEmitClose || typeof wState.closed !== "boolean") && (!rState || !willEmitClose || typeof rState.closed !== "boolean") && (!writable || wState && wState.finished) && (!readable || rState && rState.endEmitted));
  if (closed) {
    nextTick3(() => {
      callback();
    });
  }
  const cleanup = () => {
    callback = nop;
    stream.removeListener("aborted", onclose);
    stream.removeListener("complete", onfinish);
    stream.removeListener("abort", onclose);
    stream.removeListener("request", onrequest);
    if (stream.req)
      stream.req.removeListener("finish", onfinish);
    stream.removeListener("end", onlegacyfinish);
    stream.removeListener("close", onlegacyfinish);
    stream.removeListener("finish", onfinish);
    stream.removeListener("end", onend);
    stream.removeListener("error", onerror);
    stream.removeListener("close", onclose);
  };
  if (options.signal && !closed) {
    const abort = () => {
      const endCallback = callback;
      cleanup();
      endCallback.call(stream, new AbortError());
    };
    if (options.signal.aborted) {
      nextTick3(abort);
    } else {
      const originalCallback = callback;
      callback = once((...args) => {
        options.signal.removeEventListener("abort", abort);
        originalCallback.apply(stream, args);
      });
      options.signal.addEventListener("abort", abort);
    }
  }
  return cleanup;
}
var end_of_stream_default = eos;

// https://deno.land/std@0.177.0/node/internal/streams/utils.mjs
var kIsDisturbed = Symbol("kIsDisturbed");
function isReadableNodeStream(obj) {
  return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!obj._writableState || obj._readableState?.readable !== false) && // Duplex
  (!obj._writableState || obj._readableState));
}
function isWritableNodeStream(obj) {
  return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || obj._writableState?.writable !== false));
}
function isNodeStream(obj) {
  return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
}
function isDestroyed(stream) {
  if (!isNodeStream(stream))
    return null;
  const wState = stream._writableState;
  const rState = stream._readableState;
  const state = wState || rState;
  return !!(stream.destroyed || state?.destroyed);
}
function isWritableEnded(stream) {
  if (!isWritableNodeStream(stream))
    return null;
  if (stream.writableEnded === true)
    return true;
  const wState = stream._writableState;
  if (wState?.errored)
    return false;
  if (typeof wState?.ended !== "boolean")
    return null;
  return wState.ended;
}
function isReadableEnded2(stream) {
  if (!isReadableNodeStream(stream))
    return null;
  if (stream.readableEnded === true)
    return true;
  const rState = stream._readableState;
  if (!rState || rState.errored)
    return false;
  if (typeof rState?.ended !== "boolean")
    return null;
  return rState.ended;
}
function isReadableFinished(stream, strict) {
  if (!isReadableNodeStream(stream))
    return null;
  const rState = stream._readableState;
  if (rState?.errored)
    return false;
  if (typeof rState?.endEmitted !== "boolean")
    return null;
  return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
}
function isReadable2(stream) {
  const r = isReadableNodeStream(stream);
  if (r === null || typeof stream?.readable !== "boolean")
    return null;
  if (isDestroyed(stream))
    return false;
  return r && stream.readable && !isReadableFinished(stream);
}
function isWritable2(stream) {
  const r = isWritableNodeStream(stream);
  if (r === null || typeof stream?.writable !== "boolean")
    return null;
  if (isDestroyed(stream))
    return false;
  return r && stream.writable && !isWritableEnded(stream);
}

// https://deno.land/std@0.177.0/node/_stream.mjs
var __process$ = { nextTick: nextTick2, stdio };
var pi = Object.create;
var Bt = Object.defineProperty;
var wi = Object.getOwnPropertyDescriptor;
var yi = Object.getOwnPropertyNames;
var gi = Object.getPrototypeOf;
var Si = Object.prototype.hasOwnProperty;
var E = ((e) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e, { get: (t, n) => (typeof __require < "u" ? __require : t)[n] }) : e)(function(e) {
  if (typeof __require < "u")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + e + '" is not supported');
});
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Ei = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of yi(t))
      !Si.call(e, i) && i !== n && Bt(e, i, { get: () => t[i], enumerable: !(r = wi(t, i)) || r.enumerable });
  return e;
};
var Ri = (e, t, n) => (n = e != null ? pi(gi(e)) : {}, Ei(t || !e || !e.__esModule ? Bt(n, "default", { value: e, enumerable: true }) : n, e));
var m = g((Yf, Gt) => {
  "use strict";
  Gt.exports = { ArrayIsArray(e) {
    return Array.isArray(e);
  }, ArrayPrototypeIncludes(e, t) {
    return e.includes(t);
  }, ArrayPrototypeIndexOf(e, t) {
    return e.indexOf(t);
  }, ArrayPrototypeJoin(e, t) {
    return e.join(t);
  }, ArrayPrototypeMap(e, t) {
    return e.map(t);
  }, ArrayPrototypePop(e, t) {
    return e.pop(t);
  }, ArrayPrototypePush(e, t) {
    return e.push(t);
  }, ArrayPrototypeSlice(e, t, n) {
    return e.slice(t, n);
  }, Error, FunctionPrototypeCall(e, t, ...n) {
    return e.call(t, ...n);
  }, FunctionPrototypeSymbolHasInstance(e, t) {
    return Function.prototype[Symbol.hasInstance].call(e, t);
  }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties(e, t) {
    return Object.defineProperties(e, t);
  }, ObjectDefineProperty(e, t, n) {
    return Object.defineProperty(e, t, n);
  }, ObjectGetOwnPropertyDescriptor(e, t) {
    return Object.getOwnPropertyDescriptor(e, t);
  }, ObjectKeys(e) {
    return Object.keys(e);
  }, ObjectSetPrototypeOf(e, t) {
    return Object.setPrototypeOf(e, t);
  }, Promise, PromisePrototypeCatch(e, t) {
    return e.catch(t);
  }, PromisePrototypeThen(e, t, n) {
    return e.then(t, n);
  }, PromiseReject(e) {
    return Promise.reject(e);
  }, ReflectApply: Reflect.apply, RegExpPrototypeTest(e, t) {
    return e.test(t);
  }, SafeSet: Set, String, StringPrototypeSlice(e, t, n) {
    return e.slice(t, n);
  }, StringPrototypeToLowerCase(e) {
    return e.toLowerCase();
  }, StringPrototypeToUpperCase(e) {
    return e.toUpperCase();
  }, StringPrototypeTrim(e) {
    return e.trim();
  }, Symbol, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, TypedArrayPrototypeSet(e, t, n) {
    return e.set(t, n);
  }, Uint8Array };
});
var j = g((Kf, Je) => {
  "use strict";
  var Ai = buffer_default2, mi = Object.getPrototypeOf(async function() {
  }).constructor, Ht = globalThis.Blob || Ai.Blob, Ti = typeof Ht < "u" ? function(t) {
    return t instanceof Ht;
  } : function(t) {
    return false;
  }, Xe = class extends Error {
    constructor(t) {
      if (!Array.isArray(t))
        throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
      let n = "";
      for (let r = 0; r < t.length; r++)
        n += `    ${t[r].stack}
`;
      super(n), this.name = "AggregateError", this.errors = t;
    }
  };
  Je.exports = { AggregateError: Xe, kEmptyObject: Object.freeze({}), once(e) {
    let t = false;
    return function(...n) {
      t || (t = true, e.apply(this, n));
    };
  }, createDeferredPromise: function() {
    let e, t;
    return { promise: new Promise((r, i) => {
      e = r, t = i;
    }), resolve: e, reject: t };
  }, promisify(e) {
    return new Promise((t, n) => {
      e((r, ...i) => r ? n(r) : t(...i));
    });
  }, debuglog() {
    return function() {
    };
  }, format(e, ...t) {
    return e.replace(/%([sdifj])/g, function(...[n, r]) {
      let i = t.shift();
      return r === "f" ? i.toFixed(6) : r === "j" ? JSON.stringify(i) : r === "s" && typeof i == "object" ? `${i.constructor !== Object ? i.constructor.name : ""} {}`.trim() : i.toString();
    });
  }, inspect(e) {
    switch (typeof e) {
      case "string":
        if (e.includes("'"))
          if (e.includes('"')) {
            if (!e.includes("`") && !e.includes("${"))
              return `\`${e}\``;
          } else
            return `"${e}"`;
        return `'${e}'`;
      case "number":
        return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
      case "bigint":
        return `${String(e)}n`;
      case "boolean":
      case "undefined":
        return String(e);
      case "object":
        return "{}";
    }
  }, types: { isAsyncFunction(e) {
    return e instanceof mi;
  }, isArrayBufferView(e) {
    return ArrayBuffer.isView(e);
  } }, isBlob: Ti };
  Je.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
});
var O = g((zf, Kt) => {
  "use strict";
  var { format: Ii, inspect: Re, AggregateError: Mi } = j(), Ni = globalThis.AggregateError || Mi, Di = Symbol("kIsNodeError"), Oi = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], qi = /^([A-Z][a-z0-9]*)+$/, xi = "__node_internal_", Ae = {};
  function X(e, t) {
    if (!e)
      throw new Ae.ERR_INTERNAL_ASSERTION(t);
  }
  function Vt(e) {
    let t = "", n = e.length, r = e[0] === "-" ? 1 : 0;
    for (; n >= r + 4; n -= 3)
      t = `_${e.slice(n - 3, n)}${t}`;
    return `${e.slice(0, n)}${t}`;
  }
  function Li(e, t, n) {
    if (typeof t == "function")
      return X(t.length <= n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${t.length}).`), t(...n);
    let r = (t.match(/%[dfijoOs]/g) || []).length;
    return X(r === n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${r}).`), n.length === 0 ? t : Ii(t, ...n);
  }
  function N(e, t, n) {
    n || (n = Error);
    class r extends n {
      constructor(...o) {
        super(Li(e, t, o));
      }
      toString() {
        return `${this.name} [${e}]: ${this.message}`;
      }
    }
    Object.defineProperties(r.prototype, { name: { value: n.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
      return `${this.name} [${e}]: ${this.message}`;
    }, writable: true, enumerable: false, configurable: true } }), r.prototype.code = e, r.prototype[Di] = true, Ae[e] = r;
  }
  function Yt(e) {
    let t = xi + e.name;
    return Object.defineProperty(e, "name", { value: t }), e;
  }
  function Pi(e, t) {
    if (e && t && e !== t) {
      if (Array.isArray(t.errors))
        return t.errors.push(e), t;
      let n = new Ni([t, e], t.message);
      return n.code = t.code, n;
    }
    return e || t;
  }
  var Qe = class extends Error {
    constructor(t = "The operation was aborted", n = void 0) {
      if (n !== void 0 && typeof n != "object")
        throw new Ae.ERR_INVALID_ARG_TYPE("options", "Object", n);
      super(t, n), this.code = "ABORT_ERR", this.name = "AbortError";
    }
  };
  N("ERR_ASSERTION", "%s", Error);
  N("ERR_INVALID_ARG_TYPE", (e, t, n) => {
    X(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
    let r = "The ";
    e.endsWith(" argument") ? r += `${e} ` : r += `"${e}" ${e.includes(".") ? "property" : "argument"} `, r += "must be ";
    let i = [], o = [], l = [];
    for (let f of t)
      X(typeof f == "string", "All expected entries have to be of type string"), Oi.includes(f) ? i.push(f.toLowerCase()) : qi.test(f) ? o.push(f) : (X(f !== "object", 'The value "object" should be written as "Object"'), l.push(f));
    if (o.length > 0) {
      let f = i.indexOf("object");
      f !== -1 && (i.splice(i, f, 1), o.push("Object"));
    }
    if (i.length > 0) {
      switch (i.length) {
        case 1:
          r += `of type ${i[0]}`;
          break;
        case 2:
          r += `one of type ${i[0]} or ${i[1]}`;
          break;
        default: {
          let f = i.pop();
          r += `one of type ${i.join(", ")}, or ${f}`;
        }
      }
      (o.length > 0 || l.length > 0) && (r += " or ");
    }
    if (o.length > 0) {
      switch (o.length) {
        case 1:
          r += `an instance of ${o[0]}`;
          break;
        case 2:
          r += `an instance of ${o[0]} or ${o[1]}`;
          break;
        default: {
          let f = o.pop();
          r += `an instance of ${o.join(", ")}, or ${f}`;
        }
      }
      l.length > 0 && (r += " or ");
    }
    switch (l.length) {
      case 0:
        break;
      case 1:
        l[0].toLowerCase() !== l[0] && (r += "an "), r += `${l[0]}`;
        break;
      case 2:
        r += `one of ${l[0]} or ${l[1]}`;
        break;
      default: {
        let f = l.pop();
        r += `one of ${l.join(", ")}, or ${f}`;
      }
    }
    if (n == null)
      r += `. Received ${n}`;
    else if (typeof n == "function" && n.name)
      r += `. Received function ${n.name}`;
    else if (typeof n == "object") {
      var u;
      (u = n.constructor) !== null && u !== void 0 && u.name ? r += `. Received an instance of ${n.constructor.name}` : r += `. Received ${Re(n, { depth: -1 })}`;
    } else {
      let f = Re(n, { colors: false });
      f.length > 25 && (f = `${f.slice(0, 25)}...`), r += `. Received type ${typeof n} (${f})`;
    }
    return r;
  }, TypeError);
  N("ERR_INVALID_ARG_VALUE", (e, t, n = "is invalid") => {
    let r = Re(t);
    return r.length > 128 && (r = r.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${r}`;
  }, TypeError);
  N("ERR_INVALID_RETURN_VALUE", (e, t, n) => {
    var r;
    let i = n != null && (r = n.constructor) !== null && r !== void 0 && r.name ? `instance of ${n.constructor.name}` : `type ${typeof n}`;
    return `Expected ${e} to be returned from the "${t}" function but got ${i}.`;
  }, TypeError);
  N("ERR_MISSING_ARGS", (...e) => {
    X(e.length > 0, "At least one arg needs to be specified");
    let t, n = e.length;
    switch (e = (Array.isArray(e) ? e : [e]).map((r) => `"${r}"`).join(" or "), n) {
      case 1:
        t += `The ${e[0]} argument`;
        break;
      case 2:
        t += `The ${e[0]} and ${e[1]} arguments`;
        break;
      default:
        {
          let r = e.pop();
          t += `The ${e.join(", ")}, and ${r} arguments`;
        }
        break;
    }
    return `${t} must be specified`;
  }, TypeError);
  N("ERR_OUT_OF_RANGE", (e, t, n) => {
    X(t, 'Missing "range" argument');
    let r;
    return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? r = Vt(String(n)) : typeof n == "bigint" ? (r = String(n), (n > 2n ** 32n || n < -(2n ** 32n)) && (r = Vt(r)), r += "n") : r = Re(n), `The value of "${e}" is out of range. It must be ${t}. Received ${r}`;
  }, RangeError);
  N("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  N("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  N("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
  N("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  N("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  N("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  N("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  N("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  N("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
  N("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  N("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
  Kt.exports = { AbortError: Qe, aggregateTwoErrors: Yt(Pi), hideStackFrames: Yt, codes: Ae };
});
var _e = g((Xf, nn) => {
  "use strict";
  var { ArrayIsArray: Jt, ArrayPrototypeIncludes: Qt, ArrayPrototypeJoin: Zt, ArrayPrototypeMap: ki, NumberIsInteger: et, NumberIsNaN: Wi, NumberMAX_SAFE_INTEGER: Ci, NumberMIN_SAFE_INTEGER: ji, NumberParseInt: $i, ObjectPrototypeHasOwnProperty: vi, RegExpPrototypeExec: Fi, String: Ui, StringPrototypeToUpperCase: Bi, StringPrototypeTrim: Gi } = m(), { hideStackFrames: k, codes: { ERR_SOCKET_BAD_PORT: Hi, ERR_INVALID_ARG_TYPE: q, ERR_INVALID_ARG_VALUE: me, ERR_OUT_OF_RANGE: J, ERR_UNKNOWN_SIGNAL: zt } } = O(), { normalizeEncoding: Vi } = j(), { isAsyncFunction: Yi, isArrayBufferView: Ki } = j().types, Xt = {};
  function zi(e) {
    return e === (e | 0);
  }
  function Xi(e) {
    return e === e >>> 0;
  }
  var Ji = /^[0-7]+$/, Qi = "must be a 32-bit unsigned integer or an octal string";
  function Zi(e, t, n) {
    if (typeof e > "u" && (e = n), typeof e == "string") {
      if (Fi(Ji, e) === null)
        throw new me(t, e, Qi);
      e = $i(e, 8);
    }
    return en(e, t), e;
  }
  var eo = k((e, t, n = ji, r = Ci) => {
    if (typeof e != "number")
      throw new q(t, "number", e);
    if (!et(e))
      throw new J(t, "an integer", e);
    if (e < n || e > r)
      throw new J(t, `>= ${n} && <= ${r}`, e);
  }), to = k((e, t, n = -2147483648, r = 2147483647) => {
    if (typeof e != "number")
      throw new q(t, "number", e);
    if (!et(e))
      throw new J(t, "an integer", e);
    if (e < n || e > r)
      throw new J(t, `>= ${n} && <= ${r}`, e);
  }), en = k((e, t, n = false) => {
    if (typeof e != "number")
      throw new q(t, "number", e);
    if (!et(e))
      throw new J(t, "an integer", e);
    let r = n ? 1 : 0, i = 4294967295;
    if (e < r || e > i)
      throw new J(t, `>= ${r} && <= ${i}`, e);
  });
  function tn(e, t) {
    if (typeof e != "string")
      throw new q(t, "string", e);
  }
  function no(e, t, n = void 0, r) {
    if (typeof e != "number")
      throw new q(t, "number", e);
    if (n != null && e < n || r != null && e > r || (n != null || r != null) && Wi(e))
      throw new J(t, `${n != null ? `>= ${n}` : ""}${n != null && r != null ? " && " : ""}${r != null ? `<= ${r}` : ""}`, e);
  }
  var ro = k((e, t, n) => {
    if (!Qt(n, e)) {
      let r = Zt(ki(n, (o) => typeof o == "string" ? `'${o}'` : Ui(o)), ", "), i = "must be one of: " + r;
      throw new me(t, e, i);
    }
  });
  function io(e, t) {
    if (typeof e != "boolean")
      throw new q(t, "boolean", e);
  }
  function Ze(e, t, n) {
    return e == null || !vi(e, t) ? n : e[t];
  }
  var oo = k((e, t, n = null) => {
    let r = Ze(n, "allowArray", false), i = Ze(n, "allowFunction", false);
    if (!Ze(n, "nullable", false) && e === null || !r && Jt(e) || typeof e != "object" && (!i || typeof e != "function"))
      throw new q(t, "Object", e);
  }), lo = k((e, t, n = 0) => {
    if (!Jt(e))
      throw new q(t, "Array", e);
    if (e.length < n) {
      let r = `must be longer than ${n}`;
      throw new me(t, e, r);
    }
  });
  function ao(e, t = "signal") {
    if (tn(e, t), Xt[e] === void 0)
      throw Xt[Bi(e)] !== void 0 ? new zt(e + " (signals must use all capital letters)") : new zt(e);
  }
  var fo = k((e, t = "buffer") => {
    if (!Ki(e))
      throw new q(t, ["Buffer", "TypedArray", "DataView"], e);
  });
  function uo(e, t) {
    let n = Vi(t), r = e.length;
    if (n === "hex" && r % 2 !== 0)
      throw new me("encoding", t, `is invalid for data of length ${r}`);
  }
  function so(e, t = "Port", n = true) {
    if (typeof e != "number" && typeof e != "string" || typeof e == "string" && Gi(e).length === 0 || +e !== +e >>> 0 || e > 65535 || e === 0 && !n)
      throw new Hi(t, e, n);
    return e | 0;
  }
  var co = k((e, t) => {
    if (e !== void 0 && (e === null || typeof e != "object" || !("aborted" in e)))
      throw new q(t, "AbortSignal", e);
  }), ho = k((e, t) => {
    if (typeof e != "function")
      throw new q(t, "Function", e);
  }), bo = k((e, t) => {
    if (typeof e != "function" || Yi(e))
      throw new q(t, "Function", e);
  }), _o = k((e, t) => {
    if (e !== void 0)
      throw new q(t, "undefined", e);
  });
  function po(e, t, n) {
    if (!Qt(n, e))
      throw new q(t, `('${Zt(n, "|")}')`, e);
  }
  nn.exports = { isInt32: zi, isUint32: Xi, parseFileMode: Zi, validateArray: lo, validateBoolean: io, validateBuffer: fo, validateEncoding: uo, validateFunction: ho, validateInt32: to, validateInteger: eo, validateNumber: no, validateObject: oo, validateOneOf: ro, validatePlainFunction: bo, validatePort: so, validateSignalName: ao, validateString: tn, validateUint32: en, validateUndefined: _o, validateUnion: po, validateAbortSignal: co };
});
var V = g((Jf, _n) => {
  "use strict";
  var { Symbol: Te, SymbolAsyncIterator: rn, SymbolIterator: on2 } = m(), ln = Te("kDestroyed"), an = Te("kIsErrored"), tt = Te("kIsReadable"), fn = Te("kIsDisturbed");
  function Ie(e, t = false) {
    var n;
    return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || ((n = e._readableState) === null || n === void 0 ? void 0 : n.readable) !== false) && (!e._writableState || e._readableState));
  }
  function Me(e) {
    var t;
    return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || ((t = e._writableState) === null || t === void 0 ? void 0 : t.writable) !== false));
  }
  function wo(e) {
    return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
  }
  function Q(e) {
    return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
  }
  function yo(e, t) {
    return e == null ? false : t === true ? typeof e[rn] == "function" : t === false ? typeof e[on2] == "function" : typeof e[rn] == "function" || typeof e[on2] == "function";
  }
  function Ne(e) {
    if (!Q(e))
      return null;
    let t = e._writableState, n = e._readableState, r = t || n;
    return !!(e.destroyed || e[ln] || r != null && r.destroyed);
  }
  function un(e) {
    if (!Me(e))
      return null;
    if (e.writableEnded === true)
      return true;
    let t = e._writableState;
    return t != null && t.errored ? false : typeof t?.ended != "boolean" ? null : t.ended;
  }
  function go(e, t) {
    if (!Me(e))
      return null;
    if (e.writableFinished === true)
      return true;
    let n = e._writableState;
    return n != null && n.errored ? false : typeof n?.finished != "boolean" ? null : !!(n.finished || t === false && n.ended === true && n.length === 0);
  }
  function So(e) {
    if (!Ie(e))
      return null;
    if (e.readableEnded === true)
      return true;
    let t = e._readableState;
    return !t || t.errored ? false : typeof t?.ended != "boolean" ? null : t.ended;
  }
  function sn(e, t) {
    if (!Ie(e))
      return null;
    let n = e._readableState;
    return n != null && n.errored ? false : typeof n?.endEmitted != "boolean" ? null : !!(n.endEmitted || t === false && n.ended === true && n.length === 0);
  }
  function dn(e) {
    return e && e[tt] != null ? e[tt] : typeof e?.readable != "boolean" ? null : Ne(e) ? false : Ie(e) && e.readable && !sn(e);
  }
  function cn(e) {
    return typeof e?.writable != "boolean" ? null : Ne(e) ? false : Me(e) && e.writable && !un(e);
  }
  function Eo(e, t) {
    return Q(e) ? Ne(e) ? true : !(t?.readable !== false && dn(e) || t?.writable !== false && cn(e)) : null;
  }
  function Ro(e) {
    var t, n;
    return Q(e) ? e.writableErrored ? e.writableErrored : (t = (n = e._writableState) === null || n === void 0 ? void 0 : n.errored) !== null && t !== void 0 ? t : null : null;
  }
  function Ao(e) {
    var t, n;
    return Q(e) ? e.readableErrored ? e.readableErrored : (t = (n = e._readableState) === null || n === void 0 ? void 0 : n.errored) !== null && t !== void 0 ? t : null : null;
  }
  function mo(e) {
    if (!Q(e))
      return null;
    if (typeof e.closed == "boolean")
      return e.closed;
    let t = e._writableState, n = e._readableState;
    return typeof t?.closed == "boolean" || typeof n?.closed == "boolean" ? t?.closed || n?.closed : typeof e._closed == "boolean" && hn(e) ? e._closed : null;
  }
  function hn(e) {
    return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
  }
  function bn(e) {
    return typeof e._sent100 == "boolean" && hn(e);
  }
  function To(e) {
    var t;
    return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && ((t = e.req) === null || t === void 0 ? void 0 : t.upgradeOrConnect) === void 0;
  }
  function Io(e) {
    if (!Q(e))
      return null;
    let t = e._writableState, n = e._readableState, r = t || n;
    return !r && bn(e) || !!(r && r.autoDestroy && r.emitClose && r.closed === false);
  }
  function Mo(e) {
    var t;
    return !!(e && ((t = e[fn]) !== null && t !== void 0 ? t : e.readableDidRead || e.readableAborted));
  }
  function No(e) {
    var t, n, r, i, o, l, u, f, a, c;
    return !!(e && ((t = (n = (r = (i = (o = (l = e[an]) !== null && l !== void 0 ? l : e.readableErrored) !== null && o !== void 0 ? o : e.writableErrored) !== null && i !== void 0 ? i : (u = e._readableState) === null || u === void 0 ? void 0 : u.errorEmitted) !== null && r !== void 0 ? r : (f = e._writableState) === null || f === void 0 ? void 0 : f.errorEmitted) !== null && n !== void 0 ? n : (a = e._readableState) === null || a === void 0 ? void 0 : a.errored) !== null && t !== void 0 ? t : (c = e._writableState) === null || c === void 0 ? void 0 : c.errored));
  }
  _n.exports = { kDestroyed: ln, isDisturbed: Mo, kIsDisturbed: fn, isErrored: No, kIsErrored: an, isReadable: dn, kIsReadable: tt, isClosed: mo, isDestroyed: Ne, isDuplexNodeStream: wo, isFinished: Eo, isIterable: yo, isReadableNodeStream: Ie, isReadableEnded: So, isReadableFinished: sn, isReadableErrored: Ao, isNodeStream: Q, isWritable: cn, isWritableNodeStream: Me, isWritableEnded: un, isWritableFinished: go, isWritableErrored: Ro, isServerRequest: To, isServerResponse: bn, willEmitClose: Io };
});
var Y = g((Qf, rt) => {
  var oe = __process$, { AbortError: Do, codes: Oo } = O(), { ERR_INVALID_ARG_TYPE: qo, ERR_STREAM_PREMATURE_CLOSE: pn } = Oo, { kEmptyObject: wn, once: yn } = j(), { validateAbortSignal: xo, validateFunction: Lo, validateObject: Po } = _e(), { Promise: ko } = m(), { isClosed: Wo, isReadable: gn, isReadableNodeStream: nt, isReadableFinished: Sn, isReadableErrored: Co, isWritable: En, isWritableNodeStream: Rn, isWritableFinished: An, isWritableErrored: jo, isNodeStream: $o, willEmitClose: vo } = V();
  function Fo(e) {
    return e.setHeader && typeof e.abort == "function";
  }
  var Uo = () => {
  };
  function mn(e, t, n) {
    var r, i;
    arguments.length === 2 ? (n = t, t = wn) : t == null ? t = wn : Po(t, "options"), Lo(n, "callback"), xo(t.signal, "options.signal"), n = yn(n);
    let o = (r = t.readable) !== null && r !== void 0 ? r : nt(e), l = (i = t.writable) !== null && i !== void 0 ? i : Rn(e);
    if (!$o(e))
      throw new qo("stream", "Stream", e);
    let u = e._writableState, f = e._readableState, a = () => {
      e.writable || b();
    }, c = vo(e) && nt(e) === o && Rn(e) === l, s = An(e, false), b = () => {
      s = true, e.destroyed && (c = false), !(c && (!e.readable || o)) && (!o || d) && n.call(e);
    }, d = Sn(e, false), h = () => {
      d = true, e.destroyed && (c = false), !(c && (!e.writable || l)) && (!l || s) && n.call(e);
    }, D = (M) => {
      n.call(e, M);
    }, L = Wo(e), _ = () => {
      L = true;
      let M = jo(e) || Co(e);
      if (M && typeof M != "boolean")
        return n.call(e, M);
      if (o && !d && nt(e, true) && !Sn(e, false))
        return n.call(e, new pn());
      if (l && !s && !An(e, false))
        return n.call(e, new pn());
      n.call(e);
    }, p = () => {
      e.req.on("finish", b);
    };
    Fo(e) ? (e.on("complete", b), c || e.on("abort", _), e.req ? p() : e.on("request", p)) : l && !u && (e.on("end", a), e.on("close", a)), !c && typeof e.aborted == "boolean" && e.on("aborted", _), e.on("end", h), e.on("finish", b), t.error !== false && e.on("error", D), e.on("close", _), L ? oe.nextTick(_) : u != null && u.errorEmitted || f != null && f.errorEmitted ? c || oe.nextTick(_) : (!o && (!c || gn(e)) && (s || En(e) === false) || !l && (!c || En(e)) && (d || gn(e) === false) || f && e.req && e.aborted) && oe.nextTick(_);
    let I = () => {
      n = Uo, e.removeListener("aborted", _), e.removeListener("complete", b), e.removeListener("abort", _), e.removeListener("request", p), e.req && e.req.removeListener("finish", b), e.removeListener("end", a), e.removeListener("close", a), e.removeListener("finish", b), e.removeListener("end", h), e.removeListener("error", D), e.removeListener("close", _);
    };
    if (t.signal && !L) {
      let M = () => {
        let F = n;
        I(), F.call(e, new Do(void 0, { cause: t.signal.reason }));
      };
      if (t.signal.aborted)
        oe.nextTick(M);
      else {
        let F = n;
        n = yn((...re) => {
          t.signal.removeEventListener("abort", M), F.apply(e, re);
        }), t.signal.addEventListener("abort", M);
      }
    }
    return I;
  }
  function Bo(e, t) {
    return new ko((n, r) => {
      mn(e, t, (i) => {
        i ? r(i) : n();
      });
    });
  }
  rt.exports = mn;
  rt.exports.finished = Bo;
});
var xn = g((Zf, lt) => {
  "use strict";
  var Nn = globalThis.AbortController, { codes: { ERR_INVALID_ARG_TYPE: pe, ERR_MISSING_ARGS: Go, ERR_OUT_OF_RANGE: Ho }, AbortError: $ } = O(), { validateAbortSignal: le, validateInteger: Vo, validateObject: ae } = _e(), Yo = m().Symbol("kWeak"), { finished: Ko } = Y(), { ArrayPrototypePush: zo, MathFloor: Xo, Number: Jo, NumberIsNaN: Qo, Promise: Tn, PromiseReject: In, PromisePrototypeThen: Zo, Symbol: Dn } = m(), De = Dn("kEmpty"), Mn = Dn("kEof");
  function Oe(e, t) {
    if (typeof e != "function")
      throw new pe("fn", ["Function", "AsyncFunction"], e);
    t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal");
    let n = 1;
    return t?.concurrency != null && (n = Xo(t.concurrency)), Vo(n, "concurrency", 1), async function* () {
      var i, o;
      let l = new Nn(), u = this, f = [], a = l.signal, c = { signal: a }, s = () => l.abort();
      t != null && (i = t.signal) !== null && i !== void 0 && i.aborted && s(), t == null || (o = t.signal) === null || o === void 0 || o.addEventListener("abort", s);
      let b, d, h = false;
      function D() {
        h = true;
      }
      async function L() {
        try {
          for await (let I of u) {
            var _;
            if (h)
              return;
            if (a.aborted)
              throw new $();
            try {
              I = e(I, c);
            } catch (M) {
              I = In(M);
            }
            I !== De && (typeof ((_ = I) === null || _ === void 0 ? void 0 : _.catch) == "function" && I.catch(D), f.push(I), b && (b(), b = null), !h && f.length && f.length >= n && await new Tn((M) => {
              d = M;
            }));
          }
          f.push(Mn);
        } catch (I) {
          let M = In(I);
          Zo(M, void 0, D), f.push(M);
        } finally {
          var p;
          h = true, b && (b(), b = null), t == null || (p = t.signal) === null || p === void 0 || p.removeEventListener("abort", s);
        }
      }
      L();
      try {
        for (; ; ) {
          for (; f.length > 0; ) {
            let _ = await f[0];
            if (_ === Mn)
              return;
            if (a.aborted)
              throw new $();
            _ !== De && (yield _), f.shift(), d && (d(), d = null);
          }
          await new Tn((_) => {
            b = _;
          });
        }
      } finally {
        l.abort(), h = true, d && (d(), d = null);
      }
    }.call(this);
  }
  function el(e = void 0) {
    return e != null && ae(e, "options"), e?.signal != null && le(e.signal, "options.signal"), async function* () {
      let n = 0;
      for await (let i of this) {
        var r;
        if (e != null && (r = e.signal) !== null && r !== void 0 && r.aborted)
          throw new $({ cause: e.signal.reason });
        yield [n++, i];
      }
    }.call(this);
  }
  async function On(e, t = void 0) {
    for await (let n of ot.call(this, e, t))
      return true;
    return false;
  }
  async function tl(e, t = void 0) {
    if (typeof e != "function")
      throw new pe("fn", ["Function", "AsyncFunction"], e);
    return !await On.call(this, async (...n) => !await e(...n), t);
  }
  async function nl(e, t) {
    for await (let n of ot.call(this, e, t))
      return n;
  }
  async function rl(e, t) {
    if (typeof e != "function")
      throw new pe("fn", ["Function", "AsyncFunction"], e);
    async function n(r, i) {
      return await e(r, i), De;
    }
    for await (let r of Oe.call(this, n, t))
      ;
  }
  function ot(e, t) {
    if (typeof e != "function")
      throw new pe("fn", ["Function", "AsyncFunction"], e);
    async function n(r, i) {
      return await e(r, i) ? r : De;
    }
    return Oe.call(this, n, t);
  }
  var it = class extends Go {
    constructor() {
      super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
    }
  };
  async function il(e, t, n) {
    var r;
    if (typeof e != "function")
      throw new pe("reducer", ["Function", "AsyncFunction"], e);
    n != null && ae(n, "options"), n?.signal != null && le(n.signal, "options.signal");
    let i = arguments.length > 1;
    if (n != null && (r = n.signal) !== null && r !== void 0 && r.aborted) {
      let a = new $(void 0, { cause: n.signal.reason });
      throw this.once("error", () => {
      }), await Ko(this.destroy(a)), a;
    }
    let o = new Nn(), l = o.signal;
    if (n != null && n.signal) {
      let a = { once: true, [Yo]: this };
      n.signal.addEventListener("abort", () => o.abort(), a);
    }
    let u = false;
    try {
      for await (let a of this) {
        var f;
        if (u = true, n != null && (f = n.signal) !== null && f !== void 0 && f.aborted)
          throw new $();
        i ? t = await e(t, a, { signal: l }) : (t = a, i = true);
      }
      if (!u && !i)
        throw new it();
    } finally {
      o.abort();
    }
    return t;
  }
  async function ol(e) {
    e != null && ae(e, "options"), e?.signal != null && le(e.signal, "options.signal");
    let t = [];
    for await (let r of this) {
      var n;
      if (e != null && (n = e.signal) !== null && n !== void 0 && n.aborted)
        throw new $(void 0, { cause: e.signal.reason });
      zo(t, r);
    }
    return t;
  }
  function ll(e, t) {
    let n = Oe.call(this, e, t);
    return async function* () {
      for await (let i of n)
        yield* i;
    }.call(this);
  }
  function qn(e) {
    if (e = Jo(e), Qo(e))
      return 0;
    if (e < 0)
      throw new Ho("number", ">= 0", e);
    return e;
  }
  function al(e, t = void 0) {
    return t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal"), e = qn(e), async function* () {
      var r;
      if (t != null && (r = t.signal) !== null && r !== void 0 && r.aborted)
        throw new $();
      for await (let o of this) {
        var i;
        if (t != null && (i = t.signal) !== null && i !== void 0 && i.aborted)
          throw new $();
        e-- <= 0 && (yield o);
      }
    }.call(this);
  }
  function fl(e, t = void 0) {
    return t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal"), e = qn(e), async function* () {
      var r;
      if (t != null && (r = t.signal) !== null && r !== void 0 && r.aborted)
        throw new $();
      for await (let o of this) {
        var i;
        if (t != null && (i = t.signal) !== null && i !== void 0 && i.aborted)
          throw new $();
        if (e-- > 0)
          yield o;
        else
          return;
      }
    }.call(this);
  }
  lt.exports.streamReturningOperators = { asIndexedPairs: el, drop: al, filter: ot, flatMap: ll, map: Oe, take: fl };
  lt.exports.promiseReturningOperators = { every: tl, forEach: rl, reduce: il, toArray: ol, some: On, find: nl };
});
var Z = g((eu, vn) => {
  "use strict";
  var K = __process$, { aggregateTwoErrors: ul, codes: { ERR_MULTIPLE_CALLBACK: sl }, AbortError: dl } = O(), { Symbol: kn } = m(), { kDestroyed: cl, isDestroyed: hl, isFinished: bl, isServerRequest: _l } = V(), Wn = kn("kDestroy"), at = kn("kConstruct");
  function Cn(e, t, n) {
    e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e));
  }
  function pl(e, t) {
    let n = this._readableState, r = this._writableState, i = r || n;
    return r && r.destroyed || n && n.destroyed ? (typeof t == "function" && t(), this) : (Cn(e, r, n), r && (r.destroyed = true), n && (n.destroyed = true), i.constructed ? Ln(this, e, t) : this.once(Wn, function(o) {
      Ln(this, ul(o, e), t);
    }), this);
  }
  function Ln(e, t, n) {
    let r = false;
    function i(o) {
      if (r)
        return;
      r = true;
      let l = e._readableState, u = e._writableState;
      Cn(o, u, l), u && (u.closed = true), l && (l.closed = true), typeof n == "function" && n(o), o ? K.nextTick(wl, e, o) : K.nextTick(jn, e);
    }
    try {
      e._destroy(t || null, i);
    } catch (o) {
      i(o);
    }
  }
  function wl(e, t) {
    ft(e, t), jn(e);
  }
  function jn(e) {
    let t = e._readableState, n = e._writableState;
    n && (n.closeEmitted = true), t && (t.closeEmitted = true), (n && n.emitClose || t && t.emitClose) && e.emit("close");
  }
  function ft(e, t) {
    let n = e._readableState, r = e._writableState;
    r && r.errorEmitted || n && n.errorEmitted || (r && (r.errorEmitted = true), n && (n.errorEmitted = true), e.emit("error", t));
  }
  function yl() {
    let e = this._readableState, t = this._writableState;
    e && (e.constructed = true, e.closed = false, e.closeEmitted = false, e.destroyed = false, e.errored = null, e.errorEmitted = false, e.reading = false, e.ended = e.readable === false, e.endEmitted = e.readable === false), t && (t.constructed = true, t.destroyed = false, t.closed = false, t.closeEmitted = false, t.errored = null, t.errorEmitted = false, t.finalCalled = false, t.prefinished = false, t.ended = t.writable === false, t.ending = t.writable === false, t.finished = t.writable === false);
  }
  function ut(e, t, n) {
    let r = e._readableState, i = e._writableState;
    if (i && i.destroyed || r && r.destroyed)
      return this;
    r && r.autoDestroy || i && i.autoDestroy ? e.destroy(t) : t && (t.stack, i && !i.errored && (i.errored = t), r && !r.errored && (r.errored = t), n ? K.nextTick(ft, e, t) : ft(e, t));
  }
  function gl(e, t) {
    if (typeof e._construct != "function")
      return;
    let n = e._readableState, r = e._writableState;
    n && (n.constructed = false), r && (r.constructed = false), e.once(at, t), !(e.listenerCount(at) > 1) && K.nextTick(Sl, e);
  }
  function Sl(e) {
    let t = false;
    function n(r) {
      if (t) {
        ut(e, r ?? new sl());
        return;
      }
      t = true;
      let i = e._readableState, o = e._writableState, l = o || i;
      i && (i.constructed = true), o && (o.constructed = true), l.destroyed ? e.emit(Wn, r) : r ? ut(e, r, true) : K.nextTick(El, e);
    }
    try {
      e._construct(n);
    } catch (r) {
      n(r);
    }
  }
  function El(e) {
    e.emit(at);
  }
  function Pn(e) {
    return e && e.setHeader && typeof e.abort == "function";
  }
  function $n(e) {
    e.emit("close");
  }
  function Rl(e, t) {
    e.emit("error", t), K.nextTick($n, e);
  }
  function Al(e, t) {
    !e || hl(e) || (!t && !bl(e) && (t = new dl()), _l(e) ? (e.socket = null, e.destroy(t)) : Pn(e) ? e.abort() : Pn(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? K.nextTick(Rl, e, t) : K.nextTick($n, e), e.destroyed || (e[cl] = true));
  }
  vn.exports = { construct: gl, destroyer: Al, destroy: pl, undestroy: yl, errorOrDestroy: ut };
});
var Le = g((tu, Un) => {
  "use strict";
  var { ArrayIsArray: ml, ObjectSetPrototypeOf: Fn } = m(), { EventEmitter: qe } = events_default;
  function xe(e) {
    qe.call(this, e);
  }
  Fn(xe.prototype, qe.prototype);
  Fn(xe, qe);
  xe.prototype.pipe = function(e, t) {
    let n = this;
    function r(c) {
      e.writable && e.write(c) === false && n.pause && n.pause();
    }
    n.on("data", r);
    function i() {
      n.readable && n.resume && n.resume();
    }
    e.on("drain", i), !e._isStdio && (!t || t.end !== false) && (n.on("end", l), n.on("close", u));
    let o = false;
    function l() {
      o || (o = true, e.end());
    }
    function u() {
      o || (o = true, typeof e.destroy == "function" && e.destroy());
    }
    function f(c) {
      a(), qe.listenerCount(this, "error") === 0 && this.emit("error", c);
    }
    st(n, "error", f), st(e, "error", f);
    function a() {
      n.removeListener("data", r), e.removeListener("drain", i), n.removeListener("end", l), n.removeListener("close", u), n.removeListener("error", f), e.removeListener("error", f), n.removeListener("end", a), n.removeListener("close", a), e.removeListener("close", a);
    }
    return n.on("end", a), n.on("close", a), e.on("close", a), e.emit("pipe", n), e;
  };
  function st(e, t, n) {
    if (typeof e.prependListener == "function")
      return e.prependListener(t, n);
    !e._events || !e._events[t] ? e.on(t, n) : ml(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]];
  }
  Un.exports = { Stream: xe, prependListener: st };
});
var ke = g((nu, Pe) => {
  "use strict";
  var { AbortError: Tl, codes: Il } = O(), Ml = Y(), { ERR_INVALID_ARG_TYPE: Bn } = Il, Nl = (e, t) => {
    if (typeof e != "object" || !("aborted" in e))
      throw new Bn(t, "AbortSignal", e);
  };
  function Dl(e) {
    return !!(e && typeof e.pipe == "function");
  }
  Pe.exports.addAbortSignal = function(t, n) {
    if (Nl(t, "signal"), !Dl(n))
      throw new Bn("stream", "stream.Stream", n);
    return Pe.exports.addAbortSignalNoValidate(t, n);
  };
  Pe.exports.addAbortSignalNoValidate = function(e, t) {
    if (typeof e != "object" || !("aborted" in e))
      return t;
    let n = () => {
      t.destroy(new Tl(void 0, { cause: e.reason }));
    };
    return e.aborted ? n() : (e.addEventListener("abort", n), Ml(t, () => e.removeEventListener("abort", n))), t;
  };
});
var Vn = g((iu, Hn) => {
  "use strict";
  var { StringPrototypeSlice: Gn, SymbolIterator: Ol, TypedArrayPrototypeSet: We, Uint8Array: ql } = m(), { Buffer: dt } = buffer_default2, { inspect: xl } = j();
  Hn.exports = class {
    constructor() {
      this.head = null, this.tail = null, this.length = 0;
    }
    push(t) {
      let n = { data: t, next: null };
      this.length > 0 ? this.tail.next = n : this.head = n, this.tail = n, ++this.length;
    }
    unshift(t) {
      let n = { data: t, next: this.head };
      this.length === 0 && (this.tail = n), this.head = n, ++this.length;
    }
    shift() {
      if (this.length === 0)
        return;
      let t = this.head.data;
      return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
    }
    clear() {
      this.head = this.tail = null, this.length = 0;
    }
    join(t) {
      if (this.length === 0)
        return "";
      let n = this.head, r = "" + n.data;
      for (; (n = n.next) !== null; )
        r += t + n.data;
      return r;
    }
    concat(t) {
      if (this.length === 0)
        return dt.alloc(0);
      let n = dt.allocUnsafe(t >>> 0), r = this.head, i = 0;
      for (; r; )
        We(n, r.data, i), i += r.data.length, r = r.next;
      return n;
    }
    consume(t, n) {
      let r = this.head.data;
      if (t < r.length) {
        let i = r.slice(0, t);
        return this.head.data = r.slice(t), i;
      }
      return t === r.length ? this.shift() : n ? this._getString(t) : this._getBuffer(t);
    }
    first() {
      return this.head.data;
    }
    *[Ol]() {
      for (let t = this.head; t; t = t.next)
        yield t.data;
    }
    _getString(t) {
      let n = "", r = this.head, i = 0;
      do {
        let o = r.data;
        if (t > o.length)
          n += o, t -= o.length;
        else {
          t === o.length ? (n += o, ++i, r.next ? this.head = r.next : this.head = this.tail = null) : (n += Gn(o, 0, t), this.head = r, r.data = Gn(o, t));
          break;
        }
        ++i;
      } while ((r = r.next) !== null);
      return this.length -= i, n;
    }
    _getBuffer(t) {
      let n = dt.allocUnsafe(t), r = t, i = this.head, o = 0;
      do {
        let l = i.data;
        if (t > l.length)
          We(n, l, r - t), t -= l.length;
        else {
          t === l.length ? (We(n, l, r - t), ++o, i.next ? this.head = i.next : this.head = this.tail = null) : (We(n, new ql(l.buffer, l.byteOffset, t), r - t), this.head = i, i.data = l.slice(t));
          break;
        }
        ++o;
      } while ((i = i.next) !== null);
      return this.length -= o, n;
    }
    [Symbol.for("nodejs.util.inspect.custom")](t, n) {
      return xl(this, { ...n, depth: 0, customInspect: false });
    }
  };
});
var Ce = g((ou, Kn) => {
  "use strict";
  var { MathFloor: Ll, NumberIsInteger: Pl } = m(), { ERR_INVALID_ARG_VALUE: kl } = O().codes;
  function Wl(e, t, n) {
    return e.highWaterMark != null ? e.highWaterMark : t ? e[n] : null;
  }
  function Yn(e) {
    return e ? 16 : 16 * 1024;
  }
  function Cl(e, t, n, r) {
    let i = Wl(t, r, n);
    if (i != null) {
      if (!Pl(i) || i < 0) {
        let o = r ? `options.${n}` : "options.highWaterMark";
        throw new kl(o, i);
      }
      return Ll(i);
    }
    return Yn(e.objectMode);
  }
  Kn.exports = { getHighWaterMark: Cl, getDefaultHighWaterMark: Yn };
});
var ct = g((lu, Qn) => {
  "use strict";
  var zn = __process$, { PromisePrototypeThen: jl, SymbolAsyncIterator: Xn, SymbolIterator: Jn } = m(), { Buffer: $l } = buffer_default2, { ERR_INVALID_ARG_TYPE: vl, ERR_STREAM_NULL_VALUES: Fl } = O().codes;
  function Ul(e, t, n) {
    let r;
    if (typeof t == "string" || t instanceof $l)
      return new e({ objectMode: true, ...n, read() {
        this.push(t), this.push(null);
      } });
    let i;
    if (t && t[Xn])
      i = true, r = t[Xn]();
    else if (t && t[Jn])
      i = false, r = t[Jn]();
    else
      throw new vl("iterable", ["Iterable"], t);
    let o = new e({ objectMode: true, highWaterMark: 1, ...n }), l = false;
    o._read = function() {
      l || (l = true, f());
    }, o._destroy = function(a, c) {
      jl(u(a), () => zn.nextTick(c, a), (s) => zn.nextTick(c, s || a));
    };
    async function u(a) {
      let c = a != null, s = typeof r.throw == "function";
      if (c && s) {
        let { value: b, done: d } = await r.throw(a);
        if (await b, d)
          return;
      }
      if (typeof r.return == "function") {
        let { value: b } = await r.return();
        await b;
      }
    }
    async function f() {
      for (; ; ) {
        try {
          let { value: a, done: c } = i ? await r.next() : r.next();
          if (c)
            o.push(null);
          else {
            let s = a && typeof a.then == "function" ? await a : a;
            if (s === null)
              throw l = false, new Fl();
            if (o.push(s))
              continue;
            l = false;
          }
        } catch (a) {
          o.destroy(a);
        }
        break;
      }
    }
    return o;
  }
  Qn.exports = Ul;
});
var we = g((au, dr) => {
  var W = __process$, { ArrayPrototypeIndexOf: Bl, NumberIsInteger: Gl, NumberIsNaN: Hl, NumberParseInt: Vl, ObjectDefineProperties: tr, ObjectKeys: Yl, ObjectSetPrototypeOf: nr, Promise: Kl, SafeSet: zl, SymbolAsyncIterator: Xl, Symbol: Jl } = m();
  dr.exports = w;
  w.ReadableState = yt;
  var { EventEmitter: Ql } = events_default, { Stream: z, prependListener: Zl } = Le(), { Buffer: ht } = buffer_default2, { addAbortSignal: ea } = ke(), ta = Y(), y = j().debuglog("stream", (e) => {
    y = e;
  }), na = Vn(), ue = Z(), { getHighWaterMark: ra, getDefaultHighWaterMark: ia } = Ce(), { aggregateTwoErrors: Zn, codes: { ERR_INVALID_ARG_TYPE: oa, ERR_METHOD_NOT_IMPLEMENTED: la, ERR_OUT_OF_RANGE: aa, ERR_STREAM_PUSH_AFTER_EOF: fa, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: ua } } = O(), { validateObject: sa } = _e(), ee = Jl("kPaused"), { StringDecoder: rr } = string_decoder_default2, da = ct();
  nr(w.prototype, z.prototype);
  nr(w, z);
  var bt = () => {
  }, { errorOrDestroy: fe } = ue;
  function yt(e, t, n) {
    typeof n != "boolean" && (n = t instanceof v()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.readableObjectMode)), this.highWaterMark = e ? ra(this, e, "readableHighWaterMark", n) : ia(false), this.buffer = new na(), this.length = 0, this.pipes = [], this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.constructed = true, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this[ee] = null, this.errorEmitted = false, this.emitClose = !e || e.emitClose !== false, this.autoDestroy = !e || e.autoDestroy !== false, this.destroyed = false, this.errored = null, this.closed = false, this.closeEmitted = false, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.multiAwaitDrain = false, this.readingMore = false, this.dataEmitted = false, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new rr(e.encoding), this.encoding = e.encoding);
  }
  function w(e) {
    if (!(this instanceof w))
      return new w(e);
    let t = this instanceof v();
    this._readableState = new yt(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && ea(e.signal, this)), z.call(this, e), ue.construct(this, () => {
      this._readableState.needReadable && je(this, this._readableState);
    });
  }
  w.prototype.destroy = ue.destroy;
  w.prototype._undestroy = ue.undestroy;
  w.prototype._destroy = function(e, t) {
    t(e);
  };
  w.prototype[Ql.captureRejectionSymbol] = function(e) {
    this.destroy(e);
  };
  w.prototype.push = function(e, t) {
    return ir(this, e, t, false);
  };
  w.prototype.unshift = function(e, t) {
    return ir(this, e, t, true);
  };
  function ir(e, t, n, r) {
    y("readableAddChunk", t);
    let i = e._readableState, o;
    if (i.objectMode || (typeof t == "string" ? (n = n || i.defaultEncoding, i.encoding !== n && (r && i.encoding ? t = ht.from(t, n).toString(i.encoding) : (t = ht.from(t, n), n = ""))) : t instanceof ht ? n = "" : z._isUint8Array(t) ? (t = z._uint8ArrayToBuffer(t), n = "") : t != null && (o = new oa("chunk", ["string", "Buffer", "Uint8Array"], t))), o)
      fe(e, o);
    else if (t === null)
      i.reading = false, ba(e, i);
    else if (i.objectMode || t && t.length > 0)
      if (r)
        if (i.endEmitted)
          fe(e, new ua());
        else {
          if (i.destroyed || i.errored)
            return false;
          _t(e, i, t, true);
        }
      else if (i.ended)
        fe(e, new fa());
      else {
        if (i.destroyed || i.errored)
          return false;
        i.reading = false, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? _t(e, i, t, false) : je(e, i)) : _t(e, i, t, false);
      }
    else
      r || (i.reading = false, je(e, i));
    return !i.ended && (i.length < i.highWaterMark || i.length === 0);
  }
  function _t(e, t, n, r) {
    t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? (t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null, t.dataEmitted = true, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && $e(e)), je(e, t);
  }
  w.prototype.isPaused = function() {
    let e = this._readableState;
    return e[ee] === true || e.flowing === false;
  };
  w.prototype.setEncoding = function(e) {
    let t = new rr(e);
    this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
    let n = this._readableState.buffer, r = "";
    for (let i of n)
      r += t.write(i);
    return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
  };
  var ca = 1073741824;
  function ha(e) {
    if (e > ca)
      throw new aa("size", "<= 1GiB", e);
    return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
  }
  function er(e, t) {
    return e <= 0 || t.length === 0 && t.ended ? 0 : t.objectMode ? 1 : Hl(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0;
  }
  w.prototype.read = function(e) {
    y("read", e), e === void 0 ? e = NaN : Gl(e) || (e = Vl(e, 10));
    let t = this._readableState, n = e;
    if (e > t.highWaterMark && (t.highWaterMark = ha(e)), e !== 0 && (t.emittedReadable = false), e === 0 && t.needReadable && ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended))
      return y("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? pt(this) : $e(this), null;
    if (e = er(e, t), e === 0 && t.ended)
      return t.length === 0 && pt(this), null;
    let r = t.needReadable;
    if (y("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = true, y("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed)
      r = false, y("reading, ended or constructing", r);
    else if (r) {
      y("do read"), t.reading = true, t.sync = true, t.length === 0 && (t.needReadable = true);
      try {
        this._read(t.highWaterMark);
      } catch (o) {
        fe(this, o);
      }
      t.sync = false, t.reading || (e = er(n, t));
    }
    let i;
    return e > 0 ? i = ur(e, t) : i = null, i === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = true), n !== e && t.ended && pt(this)), i !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = true, this.emit("data", i)), i;
  };
  function ba(e, t) {
    if (y("onEofChunk"), !t.ended) {
      if (t.decoder) {
        let n = t.decoder.end();
        n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length);
      }
      t.ended = true, t.sync ? $e(e) : (t.needReadable = false, t.emittedReadable = true, or(e));
    }
  }
  function $e(e) {
    let t = e._readableState;
    y("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = false, t.emittedReadable || (y("emitReadable", t.flowing), t.emittedReadable = true, W.nextTick(or, e));
  }
  function or(e) {
    let t = e._readableState;
    y("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = false), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, ar(e);
  }
  function je(e, t) {
    !t.readingMore && t.constructed && (t.readingMore = true, W.nextTick(_a, e, t));
  }
  function _a(e, t) {
    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0); ) {
      let n = t.length;
      if (y("maybeReadMore read 0"), e.read(0), n === t.length)
        break;
    }
    t.readingMore = false;
  }
  w.prototype._read = function(e) {
    throw new la("_read()");
  };
  w.prototype.pipe = function(e, t) {
    let n = this, r = this._readableState;
    r.pipes.length === 1 && (r.multiAwaitDrain || (r.multiAwaitDrain = true, r.awaitDrainWriters = new zl(r.awaitDrainWriters ? [r.awaitDrainWriters] : []))), r.pipes.push(e), y("pipe count=%d opts=%j", r.pipes.length, t);
    let o = (!t || t.end !== false) && e !== W.stdout && e !== W.stderr ? u : L;
    r.endEmitted ? W.nextTick(o) : n.once("end", o), e.on("unpipe", l);
    function l(_, p) {
      y("onunpipe"), _ === n && p && p.hasUnpiped === false && (p.hasUnpiped = true, c());
    }
    function u() {
      y("onend"), e.end();
    }
    let f, a = false;
    function c() {
      y("cleanup"), e.removeListener("close", h), e.removeListener("finish", D), f && e.removeListener("drain", f), e.removeListener("error", d), e.removeListener("unpipe", l), n.removeListener("end", u), n.removeListener("end", L), n.removeListener("data", b), a = true, f && r.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && f();
    }
    function s() {
      a || (r.pipes.length === 1 && r.pipes[0] === e ? (y("false write response, pause", 0), r.awaitDrainWriters = e, r.multiAwaitDrain = false) : r.pipes.length > 1 && r.pipes.includes(e) && (y("false write response, pause", r.awaitDrainWriters.size), r.awaitDrainWriters.add(e)), n.pause()), f || (f = pa(n, e), e.on("drain", f));
    }
    n.on("data", b);
    function b(_) {
      y("ondata");
      let p = e.write(_);
      y("dest.write", p), p === false && s();
    }
    function d(_) {
      if (y("onerror", _), L(), e.removeListener("error", d), e.listenerCount("error") === 0) {
        let p = e._writableState || e._readableState;
        p && !p.errorEmitted ? fe(e, _) : e.emit("error", _);
      }
    }
    Zl(e, "error", d);
    function h() {
      e.removeListener("finish", D), L();
    }
    e.once("close", h);
    function D() {
      y("onfinish"), e.removeListener("close", h), L();
    }
    e.once("finish", D);
    function L() {
      y("unpipe"), n.unpipe(e);
    }
    return e.emit("pipe", n), e.writableNeedDrain === true ? r.flowing && s() : r.flowing || (y("pipe resume"), n.resume()), e;
  };
  function pa(e, t) {
    return function() {
      let r = e._readableState;
      r.awaitDrainWriters === t ? (y("pipeOnDrain", 1), r.awaitDrainWriters = null) : r.multiAwaitDrain && (y("pipeOnDrain", r.awaitDrainWriters.size), r.awaitDrainWriters.delete(t)), (!r.awaitDrainWriters || r.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
    };
  }
  w.prototype.unpipe = function(e) {
    let t = this._readableState, n = { hasUnpiped: false };
    if (t.pipes.length === 0)
      return this;
    if (!e) {
      let i = t.pipes;
      t.pipes = [], this.pause();
      for (let o = 0; o < i.length; o++)
        i[o].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    let r = Bl(t.pipes, e);
    return r === -1 ? this : (t.pipes.splice(r, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, n), this);
  };
  w.prototype.on = function(e, t) {
    let n = z.prototype.on.call(this, e, t), r = this._readableState;
    return e === "data" ? (r.readableListening = this.listenerCount("readable") > 0, r.flowing !== false && this.resume()) : e === "readable" && !r.endEmitted && !r.readableListening && (r.readableListening = r.needReadable = true, r.flowing = false, r.emittedReadable = false, y("on readable", r.length, r.reading), r.length ? $e(this) : r.reading || W.nextTick(wa, this)), n;
  };
  w.prototype.addListener = w.prototype.on;
  w.prototype.removeListener = function(e, t) {
    let n = z.prototype.removeListener.call(this, e, t);
    return e === "readable" && W.nextTick(lr, this), n;
  };
  w.prototype.off = w.prototype.removeListener;
  w.prototype.removeAllListeners = function(e) {
    let t = z.prototype.removeAllListeners.apply(this, arguments);
    return (e === "readable" || e === void 0) && W.nextTick(lr, this), t;
  };
  function lr(e) {
    let t = e._readableState;
    t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[ee] === false ? t.flowing = true : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
  }
  function wa(e) {
    y("readable nexttick read 0"), e.read(0);
  }
  w.prototype.resume = function() {
    let e = this._readableState;
    return e.flowing || (y("resume"), e.flowing = !e.readableListening, ya(this, e)), e[ee] = false, this;
  };
  function ya(e, t) {
    t.resumeScheduled || (t.resumeScheduled = true, W.nextTick(ga, e, t));
  }
  function ga(e, t) {
    y("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = false, e.emit("resume"), ar(e), t.flowing && !t.reading && e.read(0);
  }
  w.prototype.pause = function() {
    return y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (y("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[ee] = true, this;
  };
  function ar(e) {
    let t = e._readableState;
    for (y("flow", t.flowing); t.flowing && e.read() !== null; )
      ;
  }
  w.prototype.wrap = function(e) {
    let t = false;
    e.on("data", (r) => {
      !this.push(r) && e.pause && (t = true, e.pause());
    }), e.on("end", () => {
      this.push(null);
    }), e.on("error", (r) => {
      fe(this, r);
    }), e.on("close", () => {
      this.destroy();
    }), e.on("destroy", () => {
      this.destroy();
    }), this._read = () => {
      t && e.resume && (t = false, e.resume());
    };
    let n = Yl(e);
    for (let r = 1; r < n.length; r++) {
      let i = n[r];
      this[i] === void 0 && typeof e[i] == "function" && (this[i] = e[i].bind(e));
    }
    return this;
  };
  w.prototype[Xl] = function() {
    return fr(this);
  };
  w.prototype.iterator = function(e) {
    return e !== void 0 && sa(e, "options"), fr(this, e);
  };
  function fr(e, t) {
    typeof e.read != "function" && (e = w.wrap(e, { objectMode: true }));
    let n = Sa(e, t);
    return n.stream = e, n;
  }
  async function* Sa(e, t) {
    let n = bt;
    function r(l) {
      this === e ? (n(), n = bt) : n = l;
    }
    e.on("readable", r);
    let i, o = ta(e, { writable: false }, (l) => {
      i = l ? Zn(i, l) : null, n(), n = bt;
    });
    try {
      for (; ; ) {
        let l = e.destroyed ? null : e.read();
        if (l !== null)
          yield l;
        else {
          if (i)
            throw i;
          if (i === null)
            return;
          await new Kl(r);
        }
      }
    } catch (l) {
      throw i = Zn(i, l), i;
    } finally {
      (i || t?.destroyOnReturn !== false) && (i === void 0 || e._readableState.autoDestroy) ? ue.destroyer(e, null) : (e.off("readable", r), o());
    }
  }
  tr(w.prototype, { readable: { __proto__: null, get() {
    let e = this._readableState;
    return !!e && e.readable !== false && !e.destroyed && !e.errorEmitted && !e.endEmitted;
  }, set(e) {
    this._readableState && (this._readableState.readable = !!e);
  } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.dataEmitted;
  } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
  } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.highWaterMark;
  } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
    return this._readableState && this._readableState.buffer;
  } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.flowing;
  }, set: function(e) {
    this._readableState && (this._readableState.flowing = e);
  } }, readableLength: { __proto__: null, enumerable: false, get() {
    return this._readableState.length;
  } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.objectMode : false;
  } }, readableEncoding: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.encoding : null;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.errored : null;
  } }, closed: { __proto__: null, get() {
    return this._readableState ? this._readableState.closed : false;
  } }, destroyed: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.destroyed : false;
  }, set(e) {
    !this._readableState || (this._readableState.destroyed = e);
  } }, readableEnded: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.endEmitted : false;
  } } });
  tr(yt.prototype, { pipesCount: { __proto__: null, get() {
    return this.pipes.length;
  } }, paused: { __proto__: null, get() {
    return this[ee] !== false;
  }, set(e) {
    this[ee] = !!e;
  } } });
  w._fromList = ur;
  function ur(e, t) {
    if (t.length === 0)
      return null;
    let n;
    return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (t.decoder ? n = t.buffer.join("") : t.buffer.length === 1 ? n = t.buffer.first() : n = t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n;
  }
  function pt(e) {
    let t = e._readableState;
    y("endReadable", t.endEmitted), t.endEmitted || (t.ended = true, W.nextTick(Ea, t, e));
  }
  function Ea(e, t) {
    if (y("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
      if (e.endEmitted = true, t.emit("end"), t.writable && t.allowHalfOpen === false)
        W.nextTick(Ra, t);
      else if (e.autoDestroy) {
        let n = t._writableState;
        (!n || n.autoDestroy && (n.finished || n.writable === false)) && t.destroy();
      }
    }
  }
  function Ra(e) {
    e.writable && !e.writableEnded && !e.destroyed && e.end();
  }
  w.from = function(e, t) {
    return da(w, e, t);
  };
  var wt;
  function sr() {
    return wt === void 0 && (wt = {}), wt;
  }
  w.fromWeb = function(e, t) {
    return sr().newStreamReadableFromReadableStream(e, t);
  };
  w.toWeb = function(e, t) {
    return sr().newReadableStreamFromStreamReadable(e, t);
  };
  w.wrap = function(e, t) {
    var n, r;
    return new w({ objectMode: (n = (r = e.readableObjectMode) !== null && r !== void 0 ? r : e.objectMode) !== null && n !== void 0 ? n : true, ...t, destroy(i, o) {
      ue.destroyer(e, i), o(i);
    } }).wrap(e);
  };
});
var Tt = g((fu, Ar) => {
  var te = __process$, { ArrayPrototypeSlice: br, Error: Aa, FunctionPrototypeSymbolHasInstance: _r, ObjectDefineProperty: pr, ObjectDefineProperties: ma, ObjectSetPrototypeOf: wr, StringPrototypeToLowerCase: Ta, Symbol: Ia, SymbolHasInstance: Ma } = m();
  Ar.exports = S;
  S.WritableState = Se;
  var { EventEmitter: Na } = events_default, ye = Le().Stream, { Buffer: ve } = buffer_default2, Be = Z(), { addAbortSignal: Da } = ke(), { getHighWaterMark: Oa, getDefaultHighWaterMark: qa } = Ce(), { ERR_INVALID_ARG_TYPE: xa, ERR_METHOD_NOT_IMPLEMENTED: La, ERR_MULTIPLE_CALLBACK: yr, ERR_STREAM_CANNOT_PIPE: Pa, ERR_STREAM_DESTROYED: ge, ERR_STREAM_ALREADY_FINISHED: ka, ERR_STREAM_NULL_VALUES: Wa, ERR_STREAM_WRITE_AFTER_END: Ca, ERR_UNKNOWN_ENCODING: gr } = O().codes, { errorOrDestroy: se } = Be;
  wr(S.prototype, ye.prototype);
  wr(S, ye);
  function Et() {
  }
  var de = Ia("kOnFinished");
  function Se(e, t, n) {
    typeof n != "boolean" && (n = t instanceof v()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? Oa(this, e, "writableHighWaterMark", n) : qa(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    let r = !!(e && e.decodeStrings === false);
    this.decodeStrings = !r, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = $a.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, Ue(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !e || e.emitClose !== false, this.autoDestroy = !e || e.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[de] = [];
  }
  function Ue(e) {
    e.buffered = [], e.bufferedIndex = 0, e.allBuffers = true, e.allNoop = true;
  }
  Se.prototype.getBuffer = function() {
    return br(this.buffered, this.bufferedIndex);
  };
  pr(Se.prototype, "bufferedRequestCount", { __proto__: null, get() {
    return this.buffered.length - this.bufferedIndex;
  } });
  function S(e) {
    let t = this instanceof v();
    if (!t && !_r(S, this))
      return new S(e);
    this._writableState = new Se(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && Da(e.signal, this)), ye.call(this, e), Be.construct(this, () => {
      let n = this._writableState;
      n.writing || At(this, n), mt(this, n);
    });
  }
  pr(S, Ma, { __proto__: null, value: function(e) {
    return _r(this, e) ? true : this !== S ? false : e && e._writableState instanceof Se;
  } });
  S.prototype.pipe = function() {
    se(this, new Pa());
  };
  function Sr(e, t, n, r) {
    let i = e._writableState;
    if (typeof n == "function")
      r = n, n = i.defaultEncoding;
    else {
      if (!n)
        n = i.defaultEncoding;
      else if (n !== "buffer" && !ve.isEncoding(n))
        throw new gr(n);
      typeof r != "function" && (r = Et);
    }
    if (t === null)
      throw new Wa();
    if (!i.objectMode)
      if (typeof t == "string")
        i.decodeStrings !== false && (t = ve.from(t, n), n = "buffer");
      else if (t instanceof ve)
        n = "buffer";
      else if (ye._isUint8Array(t))
        t = ye._uint8ArrayToBuffer(t), n = "buffer";
      else
        throw new xa("chunk", ["string", "Buffer", "Uint8Array"], t);
    let o;
    return i.ending ? o = new Ca() : i.destroyed && (o = new ge("write")), o ? (te.nextTick(r, o), se(e, o, true), o) : (i.pendingcb++, ja(e, i, t, n, r));
  }
  S.prototype.write = function(e, t, n) {
    return Sr(this, e, t, n) === true;
  };
  S.prototype.cork = function() {
    this._writableState.corked++;
  };
  S.prototype.uncork = function() {
    let e = this._writableState;
    e.corked && (e.corked--, e.writing || At(this, e));
  };
  S.prototype.setDefaultEncoding = function(t) {
    if (typeof t == "string" && (t = Ta(t)), !ve.isEncoding(t))
      throw new gr(t);
    return this._writableState.defaultEncoding = t, this;
  };
  function ja(e, t, n, r, i) {
    let o = t.objectMode ? 1 : n.length;
    t.length += o;
    let l = t.length < t.highWaterMark;
    return l || (t.needDrain = true), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({ chunk: n, encoding: r, callback: i }), t.allBuffers && r !== "buffer" && (t.allBuffers = false), t.allNoop && i !== Et && (t.allNoop = false)) : (t.writelen = o, t.writecb = i, t.writing = true, t.sync = true, e._write(n, r, t.onwrite), t.sync = false), l && !t.errored && !t.destroyed;
  }
  function cr(e, t, n, r, i, o, l) {
    t.writelen = r, t.writecb = l, t.writing = true, t.sync = true, t.destroyed ? t.onwrite(new ge("write")) : n ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = false;
  }
  function hr(e, t, n, r) {
    --t.pendingcb, r(n), Rt(t), se(e, n);
  }
  function $a(e, t) {
    let n = e._writableState, r = n.sync, i = n.writecb;
    if (typeof i != "function") {
      se(e, new yr());
      return;
    }
    n.writing = false, n.writecb = null, n.length -= n.writelen, n.writelen = 0, t ? (t.stack, n.errored || (n.errored = t), e._readableState && !e._readableState.errored && (e._readableState.errored = t), r ? te.nextTick(hr, e, n, t, i) : hr(e, n, t, i)) : (n.buffered.length > n.bufferedIndex && At(e, n), r ? n.afterWriteTickInfo !== null && n.afterWriteTickInfo.cb === i ? n.afterWriteTickInfo.count++ : (n.afterWriteTickInfo = { count: 1, cb: i, stream: e, state: n }, te.nextTick(va, n.afterWriteTickInfo)) : Er(e, n, 1, i));
  }
  function va({ stream: e, state: t, count: n, cb: r }) {
    return t.afterWriteTickInfo = null, Er(e, t, n, r);
  }
  function Er(e, t, n, r) {
    for (!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = false, e.emit("drain")); n-- > 0; )
      t.pendingcb--, r();
    t.destroyed && Rt(t), mt(e, t);
  }
  function Rt(e) {
    if (e.writing)
      return;
    for (let i = e.bufferedIndex; i < e.buffered.length; ++i) {
      var t;
      let { chunk: o, callback: l } = e.buffered[i], u = e.objectMode ? 1 : o.length;
      e.length -= u, l((t = e.errored) !== null && t !== void 0 ? t : new ge("write"));
    }
    let n = e[de].splice(0);
    for (let i = 0; i < n.length; i++) {
      var r;
      n[i]((r = e.errored) !== null && r !== void 0 ? r : new ge("end"));
    }
    Ue(e);
  }
  function At(e, t) {
    if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed)
      return;
    let { buffered: n, bufferedIndex: r, objectMode: i } = t, o = n.length - r;
    if (!o)
      return;
    let l = r;
    if (t.bufferProcessing = true, o > 1 && e._writev) {
      t.pendingcb -= o - 1;
      let u = t.allNoop ? Et : (a) => {
        for (let c = l; c < n.length; ++c)
          n[c].callback(a);
      }, f = t.allNoop && l === 0 ? n : br(n, l);
      f.allBuffers = t.allBuffers, cr(e, t, true, t.length, f, "", u), Ue(t);
    } else {
      do {
        let { chunk: u, encoding: f, callback: a } = n[l];
        n[l++] = null;
        let c = i ? 1 : u.length;
        cr(e, t, false, c, u, f, a);
      } while (l < n.length && !t.writing);
      l === n.length ? Ue(t) : l > 256 ? (n.splice(0, l), t.bufferedIndex = 0) : t.bufferedIndex = l;
    }
    t.bufferProcessing = false;
  }
  S.prototype._write = function(e, t, n) {
    if (this._writev)
      this._writev([{ chunk: e, encoding: t }], n);
    else
      throw new La("_write()");
  };
  S.prototype._writev = null;
  S.prototype.end = function(e, t, n) {
    let r = this._writableState;
    typeof e == "function" ? (n = e, e = null, t = null) : typeof t == "function" && (n = t, t = null);
    let i;
    if (e != null) {
      let o = Sr(this, e, t);
      o instanceof Aa && (i = o);
    }
    return r.corked && (r.corked = 1, this.uncork()), i || (!r.errored && !r.ending ? (r.ending = true, mt(this, r, true), r.ended = true) : r.finished ? i = new ka("end") : r.destroyed && (i = new ge("end"))), typeof n == "function" && (i || r.finished ? te.nextTick(n, i) : r[de].push(n)), this;
  };
  function Fe(e) {
    return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
  }
  function Fa(e, t) {
    let n = false;
    function r(i) {
      if (n) {
        se(e, i ?? yr());
        return;
      }
      if (n = true, t.pendingcb--, i) {
        let o = t[de].splice(0);
        for (let l = 0; l < o.length; l++)
          o[l](i);
        se(e, i, t.sync);
      } else
        Fe(t) && (t.prefinished = true, e.emit("prefinish"), t.pendingcb++, te.nextTick(St, e, t));
    }
    t.sync = true, t.pendingcb++;
    try {
      e._final(r);
    } catch (i) {
      r(i);
    }
    t.sync = false;
  }
  function Ua(e, t) {
    !t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = true, Fa(e, t)) : (t.prefinished = true, e.emit("prefinish")));
  }
  function mt(e, t, n) {
    Fe(t) && (Ua(e, t), t.pendingcb === 0 && (n ? (t.pendingcb++, te.nextTick((r, i) => {
      Fe(i) ? St(r, i) : i.pendingcb--;
    }, e, t)) : Fe(t) && (t.pendingcb++, St(e, t))));
  }
  function St(e, t) {
    t.pendingcb--, t.finished = true;
    let n = t[de].splice(0);
    for (let r = 0; r < n.length; r++)
      n[r]();
    if (e.emit("finish"), t.autoDestroy) {
      let r = e._readableState;
      (!r || r.autoDestroy && (r.endEmitted || r.readable === false)) && e.destroy();
    }
  }
  ma(S.prototype, { closed: { __proto__: null, get() {
    return this._writableState ? this._writableState.closed : false;
  } }, destroyed: { __proto__: null, get() {
    return this._writableState ? this._writableState.destroyed : false;
  }, set(e) {
    this._writableState && (this._writableState.destroyed = e);
  } }, writable: { __proto__: null, get() {
    let e = this._writableState;
    return !!e && e.writable !== false && !e.destroyed && !e.errored && !e.ending && !e.ended;
  }, set(e) {
    this._writableState && (this._writableState.writable = !!e);
  } }, writableFinished: { __proto__: null, get() {
    return this._writableState ? this._writableState.finished : false;
  } }, writableObjectMode: { __proto__: null, get() {
    return this._writableState ? this._writableState.objectMode : false;
  } }, writableBuffer: { __proto__: null, get() {
    return this._writableState && this._writableState.getBuffer();
  } }, writableEnded: { __proto__: null, get() {
    return this._writableState ? this._writableState.ending : false;
  } }, writableNeedDrain: { __proto__: null, get() {
    let e = this._writableState;
    return e ? !e.destroyed && !e.ending && e.needDrain : false;
  } }, writableHighWaterMark: { __proto__: null, get() {
    return this._writableState && this._writableState.highWaterMark;
  } }, writableCorked: { __proto__: null, get() {
    return this._writableState ? this._writableState.corked : 0;
  } }, writableLength: { __proto__: null, get() {
    return this._writableState && this._writableState.length;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._writableState ? this._writableState.errored : null;
  } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
  } } });
  var Ba = Be.destroy;
  S.prototype.destroy = function(e, t) {
    let n = this._writableState;
    return !n.destroyed && (n.bufferedIndex < n.buffered.length || n[de].length) && te.nextTick(Rt, n), Ba.call(this, e, t), this;
  };
  S.prototype._undestroy = Be.undestroy;
  S.prototype._destroy = function(e, t) {
    t(e);
  };
  S.prototype[Na.captureRejectionSymbol] = function(e) {
    this.destroy(e);
  };
  var gt;
  function Rr() {
    return gt === void 0 && (gt = {}), gt;
  }
  S.fromWeb = function(e, t) {
    return Rr().newStreamWritableFromWritableStream(e, t);
  };
  S.toWeb = function(e) {
    return Rr().newWritableStreamFromStreamWritable(e);
  };
});
var kr = g((uu, Pr) => {
  var It = __process$, Ga = buffer_default2, { isReadable: Ha, isWritable: Va, isIterable: mr, isNodeStream: Ya, isReadableNodeStream: Tr, isWritableNodeStream: Ir, isDuplexNodeStream: Ka } = V(), Mr = Y(), { AbortError: Lr, codes: { ERR_INVALID_ARG_TYPE: za, ERR_INVALID_RETURN_VALUE: Nr } } = O(), { destroyer: ce } = Z(), Xa = v(), Ja = we(), { createDeferredPromise: Dr } = j(), Or = ct(), qr = globalThis.Blob || Ga.Blob, Qa = typeof qr < "u" ? function(t) {
    return t instanceof qr;
  } : function(t) {
    return false;
  }, Za = globalThis.AbortController, { FunctionPrototypeCall: xr } = m(), ne = class extends Xa {
    constructor(t) {
      super(t), t?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), t?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
    }
  };
  Pr.exports = function e(t, n) {
    if (Ka(t))
      return t;
    if (Tr(t))
      return Ge({ readable: t });
    if (Ir(t))
      return Ge({ writable: t });
    if (Ya(t))
      return Ge({ writable: false, readable: false });
    if (typeof t == "function") {
      let { value: i, write: o, final: l, destroy: u } = ef(t);
      if (mr(i))
        return Or(ne, i, { objectMode: true, write: o, final: l, destroy: u });
      let f = i?.then;
      if (typeof f == "function") {
        let a, c = xr(f, i, (s) => {
          if (s != null)
            throw new Nr("nully", "body", s);
        }, (s) => {
          ce(a, s);
        });
        return a = new ne({ objectMode: true, readable: false, write: o, final(s) {
          l(async () => {
            try {
              await c, It.nextTick(s, null);
            } catch (b) {
              It.nextTick(s, b);
            }
          });
        }, destroy: u });
      }
      throw new Nr("Iterable, AsyncIterable or AsyncFunction", n, i);
    }
    if (Qa(t))
      return e(t.arrayBuffer());
    if (mr(t))
      return Or(ne, t, { objectMode: true, writable: false });
    if (typeof t?.writable == "object" || typeof t?.readable == "object") {
      let i = t != null && t.readable ? Tr(t?.readable) ? t?.readable : e(t.readable) : void 0, o = t != null && t.writable ? Ir(t?.writable) ? t?.writable : e(t.writable) : void 0;
      return Ge({ readable: i, writable: o });
    }
    let r = t?.then;
    if (typeof r == "function") {
      let i;
      return xr(r, t, (o) => {
        o != null && i.push(o), i.push(null);
      }, (o) => {
        ce(i, o);
      }), i = new ne({ objectMode: true, writable: false, read() {
      } });
    }
    throw new za(n, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], t);
  };
  function ef(e) {
    let { promise: t, resolve: n } = Dr(), r = new Za(), i = r.signal;
    return { value: e(async function* () {
      for (; ; ) {
        let l = t;
        t = null;
        let { chunk: u, done: f, cb: a } = await l;
        if (It.nextTick(a), f)
          return;
        if (i.aborted)
          throw new Lr(void 0, { cause: i.reason });
        ({ promise: t, resolve: n } = Dr()), yield u;
      }
    }(), { signal: i }), write(l, u, f) {
      let a = n;
      n = null, a({ chunk: l, done: false, cb: f });
    }, final(l) {
      let u = n;
      n = null, u({ done: true, cb: l });
    }, destroy(l, u) {
      r.abort(), u(l);
    } };
  }
  function Ge(e) {
    let t = e.readable && typeof e.readable.read != "function" ? Ja.wrap(e.readable) : e.readable, n = e.writable, r = !!Ha(t), i = !!Va(n), o, l, u, f, a;
    function c(s) {
      let b = f;
      f = null, b ? b(s) : s ? a.destroy(s) : !r && !i && a.destroy();
    }
    return a = new ne({ readableObjectMode: !!(t != null && t.readableObjectMode), writableObjectMode: !!(n != null && n.writableObjectMode), readable: r, writable: i }), i && (Mr(n, (s) => {
      i = false, s && ce(t, s), c(s);
    }), a._write = function(s, b, d) {
      n.write(s, b) ? d() : o = d;
    }, a._final = function(s) {
      n.end(), l = s;
    }, n.on("drain", function() {
      if (o) {
        let s = o;
        o = null, s();
      }
    }), n.on("finish", function() {
      if (l) {
        let s = l;
        l = null, s();
      }
    })), r && (Mr(t, (s) => {
      r = false, s && ce(t, s), c(s);
    }), t.on("readable", function() {
      if (u) {
        let s = u;
        u = null, s();
      }
    }), t.on("end", function() {
      a.push(null);
    }), a._read = function() {
      for (; ; ) {
        let s = t.read();
        if (s === null) {
          u = a._read;
          return;
        }
        if (!a.push(s))
          return;
      }
    }), a._destroy = function(s, b) {
      !s && f !== null && (s = new Lr()), u = null, o = null, l = null, f === null ? b(s) : (f = b, ce(n, s), ce(t, s));
    }, a;
  }
});
var v = g((su, jr) => {
  "use strict";
  var { ObjectDefineProperties: tf, ObjectGetOwnPropertyDescriptor: B, ObjectKeys: nf, ObjectSetPrototypeOf: Wr } = m();
  jr.exports = C;
  var Dt = we(), x = Tt();
  Wr(C.prototype, Dt.prototype);
  Wr(C, Dt);
  {
    let e = nf(x.prototype);
    for (let t = 0; t < e.length; t++) {
      let n = e[t];
      C.prototype[n] || (C.prototype[n] = x.prototype[n]);
    }
  }
  function C(e) {
    if (!(this instanceof C))
      return new C(e);
    Dt.call(this, e), x.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== false, e.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
  }
  tf(C.prototype, { writable: { __proto__: null, ...B(x.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...B(x.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...B(x.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...B(x.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...B(x.prototype, "writableLength") }, writableFinished: { __proto__: null, ...B(x.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...B(x.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...B(x.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...B(x.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
    return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
  }, set(e) {
    this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
  } } });
  var Mt;
  function Cr() {
    return Mt === void 0 && (Mt = {}), Mt;
  }
  C.fromWeb = function(e, t) {
    return Cr().newStreamDuplexFromReadableWritablePair(e, t);
  };
  C.toWeb = function(e) {
    return Cr().newReadableWritablePairFromDuplex(e);
  };
  var Nt;
  C.from = function(e) {
    return Nt || (Nt = kr()), Nt(e, "body");
  };
});
var xt = g((du, vr) => {
  "use strict";
  var { ObjectSetPrototypeOf: $r, Symbol: rf } = m();
  vr.exports = G;
  var { ERR_METHOD_NOT_IMPLEMENTED: of } = O().codes, qt = v(), { getHighWaterMark: lf } = Ce();
  $r(G.prototype, qt.prototype);
  $r(G, qt);
  var Ee = rf("kCallback");
  function G(e) {
    if (!(this instanceof G))
      return new G(e);
    let t = e ? lf(this, e, "readableHighWaterMark", true) : null;
    t === 0 && (e = { ...e, highWaterMark: null, readableHighWaterMark: t, writableHighWaterMark: e.writableHighWaterMark || 0 }), qt.call(this, e), this._readableState.sync = false, this[Ee] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", af);
  }
  function Ot(e) {
    typeof this._flush == "function" && !this.destroyed ? this._flush((t, n) => {
      if (t) {
        e ? e(t) : this.destroy(t);
        return;
      }
      n != null && this.push(n), this.push(null), e && e();
    }) : (this.push(null), e && e());
  }
  function af() {
    this._final !== Ot && Ot.call(this);
  }
  G.prototype._final = Ot;
  G.prototype._transform = function(e, t, n) {
    throw new of("_transform()");
  };
  G.prototype._write = function(e, t, n) {
    let r = this._readableState, i = this._writableState, o = r.length;
    this._transform(e, t, (l, u) => {
      if (l) {
        n(l);
        return;
      }
      u != null && this.push(u), i.ended || o === r.length || r.length < r.highWaterMark ? n() : this[Ee] = n;
    });
  };
  G.prototype._read = function() {
    if (this[Ee]) {
      let e = this[Ee];
      this[Ee] = null, e();
    }
  };
});
var Pt = g((cu, Ur) => {
  "use strict";
  var { ObjectSetPrototypeOf: Fr } = m();
  Ur.exports = he;
  var Lt = xt();
  Fr(he.prototype, Lt.prototype);
  Fr(he, Lt);
  function he(e) {
    if (!(this instanceof he))
      return new he(e);
    Lt.call(this, e);
  }
  he.prototype._transform = function(e, t, n) {
    n(null, e);
  };
});
var Ye = g((hu, zr) => {
  var He = __process$, { ArrayIsArray: ff, Promise: uf, SymbolAsyncIterator: sf } = m(), Ve = Y(), { once: df } = j(), cf = Z(), Br = v(), { aggregateTwoErrors: hf, codes: { ERR_INVALID_ARG_TYPE: Yr, ERR_INVALID_RETURN_VALUE: kt, ERR_MISSING_ARGS: bf, ERR_STREAM_DESTROYED: _f, ERR_STREAM_PREMATURE_CLOSE: pf }, AbortError: wf } = O(), { validateFunction: yf, validateAbortSignal: gf } = _e(), { isIterable: be, isReadable: Wt, isReadableNodeStream: $t, isNodeStream: Gr } = V(), Sf = globalThis.AbortController, Ct, jt;
  function Hr(e, t, n) {
    let r = false;
    e.on("close", () => {
      r = true;
    });
    let i = Ve(e, { readable: t, writable: n }, (o) => {
      r = !o;
    });
    return { destroy: (o) => {
      r || (r = true, cf.destroyer(e, o || new _f("pipe")));
    }, cleanup: i };
  }
  function Ef(e) {
    return yf(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
  }
  function Rf(e) {
    if (be(e))
      return e;
    if ($t(e))
      return Af(e);
    throw new Yr("val", ["Readable", "Iterable", "AsyncIterable"], e);
  }
  async function* Af(e) {
    jt || (jt = we()), yield* jt.prototype[sf].call(e);
  }
  async function Vr(e, t, n, { end: r }) {
    let i, o = null, l = (a) => {
      if (a && (i = a), o) {
        let c = o;
        o = null, c();
      }
    }, u = () => new uf((a, c) => {
      i ? c(i) : o = () => {
        i ? c(i) : a();
      };
    });
    t.on("drain", l);
    let f = Ve(t, { readable: false }, l);
    try {
      t.writableNeedDrain && await u();
      for await (let a of e)
        t.write(a) || await u();
      r && t.end(), await u(), n();
    } catch (a) {
      n(i !== a ? hf(i, a) : a);
    } finally {
      f(), t.off("drain", l);
    }
  }
  function mf(...e) {
    return Kr(e, df(Ef(e)));
  }
  function Kr(e, t, n) {
    if (e.length === 1 && ff(e[0]) && (e = e[0]), e.length < 2)
      throw new bf("streams");
    let r = new Sf(), i = r.signal, o = n?.signal, l = [];
    gf(o, "options.signal");
    function u() {
      d(new wf());
    }
    o?.addEventListener("abort", u);
    let f, a, c = [], s = 0;
    function b(_) {
      d(_, --s === 0);
    }
    function d(_, p) {
      if (_ && (!f || f.code === "ERR_STREAM_PREMATURE_CLOSE") && (f = _), !(!f && !p)) {
        for (; c.length; )
          c.shift()(f);
        o?.removeEventListener("abort", u), r.abort(), p && (f || l.forEach((I) => I()), He.nextTick(t, f, a));
      }
    }
    let h;
    for (let _ = 0; _ < e.length; _++) {
      let p = e[_], I = _ < e.length - 1, M = _ > 0, F = I || n?.end !== false, re = _ === e.length - 1;
      if (Gr(p)) {
        let P = function(U) {
          U && U.name !== "AbortError" && U.code !== "ERR_STREAM_PREMATURE_CLOSE" && b(U);
        };
        var L = P;
        if (F) {
          let { destroy: U, cleanup: ze } = Hr(p, I, M);
          c.push(U), Wt(p) && re && l.push(ze);
        }
        p.on("error", P), Wt(p) && re && l.push(() => {
          p.removeListener("error", P);
        });
      }
      if (_ === 0)
        if (typeof p == "function") {
          if (h = p({ signal: i }), !be(h))
            throw new kt("Iterable, AsyncIterable or Stream", "source", h);
        } else
          be(p) || $t(p) ? h = p : h = Br.from(p);
      else if (typeof p == "function")
        if (h = Rf(h), h = p(h, { signal: i }), I) {
          if (!be(h, true))
            throw new kt("AsyncIterable", `transform[${_ - 1}]`, h);
        } else {
          var D;
          Ct || (Ct = Pt());
          let P = new Ct({ objectMode: true }), U = (D = h) === null || D === void 0 ? void 0 : D.then;
          if (typeof U == "function")
            s++, U.call(h, (ie) => {
              a = ie, ie != null && P.write(ie), F && P.end(), He.nextTick(b);
            }, (ie) => {
              P.destroy(ie), He.nextTick(b, ie);
            });
          else if (be(h, true))
            s++, Vr(h, P, b, { end: F });
          else
            throw new kt("AsyncIterable or Promise", "destination", h);
          h = P;
          let { destroy: ze, cleanup: _i } = Hr(h, false, true);
          c.push(ze), re && l.push(_i);
        }
      else if (Gr(p)) {
        if ($t(h)) {
          s += 2;
          let P = Tf(h, p, b, { end: F });
          Wt(p) && re && l.push(P);
        } else if (be(h))
          s++, Vr(h, p, b, { end: F });
        else
          throw new Yr("val", ["Readable", "Iterable", "AsyncIterable"], h);
        h = p;
      } else
        h = Br.from(p);
    }
    return (i != null && i.aborted || o != null && o.aborted) && He.nextTick(u), h;
  }
  function Tf(e, t, n, { end: r }) {
    let i = false;
    return t.on("close", () => {
      i || n(new pf());
    }), e.pipe(t, { end: r }), r ? e.once("end", () => {
      i = true, t.end();
    }) : n(), Ve(e, { readable: true, writable: false }, (o) => {
      let l = e._readableState;
      o && o.code === "ERR_STREAM_PREMATURE_CLOSE" && l && l.ended && !l.errored && !l.errorEmitted ? e.once("end", n).once("error", n) : n(o);
    }), Ve(t, { readable: false, writable: true }, n);
  }
  zr.exports = { pipelineImpl: Kr, pipeline: mf };
});
var ei = g((bu, Zr) => {
  "use strict";
  var { pipeline: If } = Ye(), Ke = v(), { destroyer: Mf } = Z(), { isNodeStream: Nf, isReadable: Xr, isWritable: Jr } = V(), { AbortError: Df, codes: { ERR_INVALID_ARG_VALUE: Qr, ERR_MISSING_ARGS: Of } } = O();
  Zr.exports = function(...t) {
    if (t.length === 0)
      throw new Of("streams");
    if (t.length === 1)
      return Ke.from(t[0]);
    let n = [...t];
    if (typeof t[0] == "function" && (t[0] = Ke.from(t[0])), typeof t[t.length - 1] == "function") {
      let d = t.length - 1;
      t[d] = Ke.from(t[d]);
    }
    for (let d = 0; d < t.length; ++d)
      if (!!Nf(t[d])) {
        if (d < t.length - 1 && !Xr(t[d]))
          throw new Qr(`streams[${d}]`, n[d], "must be readable");
        if (d > 0 && !Jr(t[d]))
          throw new Qr(`streams[${d}]`, n[d], "must be writable");
      }
    let r, i, o, l, u;
    function f(d) {
      let h = l;
      l = null, h ? h(d) : d ? u.destroy(d) : !b && !s && u.destroy();
    }
    let a = t[0], c = If(t, f), s = !!Jr(a), b = !!Xr(c);
    return u = new Ke({ writableObjectMode: !!(a != null && a.writableObjectMode), readableObjectMode: !!(c != null && c.writableObjectMode), writable: s, readable: b }), s && (u._write = function(d, h, D) {
      a.write(d, h) ? D() : r = D;
    }, u._final = function(d) {
      a.end(), i = d;
    }, a.on("drain", function() {
      if (r) {
        let d = r;
        r = null, d();
      }
    }), c.on("finish", function() {
      if (i) {
        let d = i;
        i = null, d();
      }
    })), b && (c.on("readable", function() {
      if (o) {
        let d = o;
        o = null, d();
      }
    }), c.on("end", function() {
      u.push(null);
    }), u._read = function() {
      for (; ; ) {
        let d = c.read();
        if (d === null) {
          o = u._read;
          return;
        }
        if (!u.push(d))
          return;
      }
    }), u._destroy = function(d, h) {
      !d && l !== null && (d = new Df()), o = null, r = null, i = null, l === null ? h(d) : (l = h, Mf(c, d));
    }, u;
  };
});
var vt = g((_u, ti) => {
  "use strict";
  var { ArrayPrototypePop: qf, Promise: xf } = m(), { isIterable: Lf, isNodeStream: Pf } = V(), { pipelineImpl: kf } = Ye(), { finished: Wf } = Y();
  function Cf(...e) {
    return new xf((t, n) => {
      let r, i, o = e[e.length - 1];
      if (o && typeof o == "object" && !Pf(o) && !Lf(o)) {
        let l = qf(e);
        r = l.signal, i = l.end;
      }
      kf(e, (l, u) => {
        l ? n(l) : t(u);
      }, { signal: r, end: i });
    });
  }
  ti.exports = { finished: Wf, pipeline: Cf };
});
var di = g((pu, si) => {
  var { Buffer: jf } = buffer_default2, { ObjectDefineProperty: H, ObjectKeys: ii, ReflectApply: oi } = m(), { promisify: { custom: li } } = j(), { streamReturningOperators: ni, promiseReturningOperators: ri } = xn(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: ai } } = O(), $f = ei(), { pipeline: fi } = Ye(), { destroyer: vf } = Z(), ui = Y(), Ft = vt(), Ut = V(), R = si.exports = Le().Stream;
  R.isDisturbed = Ut.isDisturbed;
  R.isErrored = Ut.isErrored;
  R.isReadable = Ut.isReadable;
  R.Readable = we();
  for (let e of ii(ni)) {
    let n = function(...r) {
      if (new.target)
        throw ai();
      return R.Readable.from(oi(t, this, r));
    };
    Uf = n;
    let t = ni[e];
    H(n, "name", { __proto__: null, value: t.name }), H(n, "length", { __proto__: null, value: t.length }), H(R.Readable.prototype, e, { __proto__: null, value: n, enumerable: false, configurable: true, writable: true });
  }
  var Uf;
  for (let e of ii(ri)) {
    let n = function(...i) {
      if (new.target)
        throw ai();
      return oi(t, this, i);
    };
    Uf = n;
    let t = ri[e];
    H(n, "name", { __proto__: null, value: t.name }), H(n, "length", { __proto__: null, value: t.length }), H(R.Readable.prototype, e, { __proto__: null, value: n, enumerable: false, configurable: true, writable: true });
  }
  var Uf;
  R.Writable = Tt();
  R.Duplex = v();
  R.Transform = xt();
  R.PassThrough = Pt();
  R.pipeline = fi;
  var { addAbortSignal: Ff } = ke();
  R.addAbortSignal = Ff;
  R.finished = ui;
  R.destroy = vf;
  R.compose = $f;
  H(R, "promises", { __proto__: null, configurable: true, enumerable: true, get() {
    return Ft;
  } });
  H(fi, li, { __proto__: null, enumerable: true, get() {
    return Ft.pipeline;
  } });
  H(ui, li, { __proto__: null, enumerable: true, get() {
    return Ft.finished;
  } });
  R.Stream = R;
  R._isUint8Array = function(t) {
    return t instanceof Uint8Array;
  };
  R._uint8ArrayToBuffer = function(t) {
    return jf.from(t.buffer, t.byteOffset, t.byteLength);
  };
});
var ci = g((wu, A) => {
  "use strict";
  var T = di(), Bf = vt(), Gf = T.Readable.destroy;
  A.exports = T.Readable;
  A.exports._uint8ArrayToBuffer = T._uint8ArrayToBuffer;
  A.exports._isUint8Array = T._isUint8Array;
  A.exports.isDisturbed = T.isDisturbed;
  A.exports.isErrored = T.isErrored;
  A.exports.isReadable = T.isReadable;
  A.exports.Readable = T.Readable;
  A.exports.Writable = T.Writable;
  A.exports.Duplex = T.Duplex;
  A.exports.Transform = T.Transform;
  A.exports.PassThrough = T.PassThrough;
  A.exports.addAbortSignal = T.addAbortSignal;
  A.exports.finished = T.finished;
  A.exports.destroy = T.destroy;
  A.exports.destroy = Gf;
  A.exports.pipeline = T.pipeline;
  A.exports.compose = T.compose;
  Object.defineProperty(T, "promises", { configurable: true, enumerable: true, get() {
    return Bf;
  } });
  A.exports.Stream = T.Stream;
  A.exports.default = A.exports;
});
var bi = Ri(ci());
var { _uint8ArrayToBuffer: yu, _isUint8Array: gu, isDisturbed: Su, isErrored: Eu, isReadable: Ru, Readable: Au, Writable: mu, Duplex: Tu, Transform: Iu, PassThrough: Mu, addAbortSignal: Nu, finished: Du, destroy: Ou, pipeline: qu, compose: xu, Stream: Lu } = bi;
var { default: hi, ...Hf } = bi;
var process2 = __process$;
var { Buffer: Buffer3 } = buffer_default2;
var Readable = Au;
var Writable = mu;
var Duplex = Tu;
function isReadableStream(object) {
  return object instanceof ReadableStream;
}
function isWritableStream(object) {
  return object instanceof WritableStream;
}
Readable.fromWeb = function(readableStream, options = kEmptyObject) {
  if (!isReadableStream(readableStream)) {
    throw new ERR_INVALID_ARG_TYPE(
      "readableStream",
      "ReadableStream",
      readableStream
    );
  }
  validateObject(options, "options");
  const {
    highWaterMark,
    encoding,
    objectMode = false,
    signal
  } = options;
  if (encoding !== void 0 && !Buffer3.isEncoding(encoding)) {
    throw new ERR_INVALID_ARG_VALUE(encoding, "options.encoding");
  }
  validateBoolean(objectMode, "options.objectMode");
  const reader = readableStream.getReader();
  let closed = false;
  const readable = new Readable({
    objectMode,
    highWaterMark,
    encoding,
    signal,
    read() {
      reader.read().then(
        (chunk) => {
          if (chunk.done) {
            readable.push(null);
          } else {
            readable.push(chunk.value);
          }
        },
        (error) => destroy.call(readable, error)
      );
    },
    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error2) {
          process2.nextTick(() => {
            throw error2;
          });
        }
      }
      if (!closed) {
        reader.cancel(error).then(done, done);
        return;
      }
      done();
    }
  });
  reader.closed.then(
    () => {
      closed = true;
      if (!isReadableEnded2(readable)) {
        readable.push(null);
      }
    },
    (error) => {
      closed = true;
      destroy.call(readable, error);
    }
  );
  return readable;
};
Writable.fromWeb = function(writableStream, options = kEmptyObject) {
  if (!isWritableStream(writableStream)) {
    throw new ERR_INVALID_ARG_TYPE(
      "writableStream",
      "WritableStream",
      writableStream
    );
  }
  validateObject(options, "options");
  const {
    highWaterMark,
    decodeStrings = true,
    objectMode = false,
    signal
  } = options;
  validateBoolean(objectMode, "options.objectMode");
  validateBoolean(decodeStrings, "options.decodeStrings");
  const writer = writableStream.getWriter();
  let closed = false;
  const writable = new Writable({
    highWaterMark,
    objectMode,
    decodeStrings,
    signal,
    writev(chunks, callback) {
      function done(error) {
        error = error.filter((e) => e);
        try {
          callback(error.length === 0 ? void 0 : error);
        } catch (error2) {
          process2.nextTick(() => destroy.call(writable, error2));
        }
      }
      writer.ready.then(
        () => Promise.all(
          chunks.map((data) => writer.write(data.chunk))
        ).then(done, done),
        done
      );
    },
    write(chunk, encoding, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        chunk = Buffer3.from(chunk, encoding);
        chunk = new Uint8Array(
          chunk.buffer,
          chunk.byteOffset,
          chunk.byteLength
        );
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroy(this, duplex, error2);
        }
      }
      writer.ready.then(
        () => writer.write(chunk).then(done, done),
        done
      );
    },
    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error2) {
          process2.nextTick(() => {
            throw error2;
          });
        }
      }
      if (!closed) {
        if (error != null) {
          writer.abort(error).then(done, done);
        } else {
          writer.close().then(done, done);
        }
        return;
      }
      done();
    },
    final(callback) {
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          process2.nextTick(() => destroy.call(writable, error2));
        }
      }
      if (!closed) {
        writer.close().then(done, done);
      }
    }
  });
  writer.closed.then(
    () => {
      closed = true;
      if (!isWritableEnded(writable)) {
        destroy.call(writable, new ERR_STREAM_PREMATURE_CLOSE());
      }
    },
    (error) => {
      closed = true;
      destroy.call(writable, error);
    }
  );
  return writable;
};
Duplex.fromWeb = function(pair, options = kEmptyObject) {
  validateObject(pair, "pair");
  const {
    readable: readableStream,
    writable: writableStream
  } = pair;
  if (!isReadableStream(readableStream)) {
    throw new ERR_INVALID_ARG_TYPE(
      "pair.readable",
      "ReadableStream",
      readableStream
    );
  }
  if (!isWritableStream(writableStream)) {
    throw new ERR_INVALID_ARG_TYPE(
      "pair.writable",
      "WritableStream",
      writableStream
    );
  }
  validateObject(options, "options");
  const {
    allowHalfOpen = false,
    objectMode = false,
    encoding,
    decodeStrings = true,
    highWaterMark,
    signal
  } = options;
  validateBoolean(objectMode, "options.objectMode");
  if (encoding !== void 0 && !Buffer3.isEncoding(encoding)) {
    throw new ERR_INVALID_ARG_VALUE(encoding, "options.encoding");
  }
  const writer = writableStream.getWriter();
  const reader = readableStream.getReader();
  let writableClosed = false;
  let readableClosed = false;
  const duplex2 = new Duplex({
    allowHalfOpen,
    highWaterMark,
    objectMode,
    encoding,
    decodeStrings,
    signal,
    writev(chunks, callback) {
      function done(error) {
        error = error.filter((e) => e);
        try {
          callback(error.length === 0 ? void 0 : error);
        } catch (error2) {
          process2.nextTick(() => destroy(duplex2, error2));
        }
      }
      writer.ready.then(
        () => Promise.all(
          chunks.map((data) => writer.write(data.chunk))
        ).then(done, done),
        done
      );
    },
    write(chunk, encoding2, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        chunk = Buffer3.from(chunk, encoding2);
        chunk = new Uint8Array(
          chunk.buffer,
          chunk.byteOffset,
          chunk.byteLength
        );
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroy(duplex2, error2);
        }
      }
      writer.ready.then(
        () => writer.write(chunk).then(done, done),
        done
      );
    },
    final(callback) {
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          process2.nextTick(() => destroy(duplex2, error2));
        }
      }
      if (!writableClosed) {
        writer.close().then(done, done);
      }
    },
    read() {
      reader.read().then(
        (chunk) => {
          if (chunk.done) {
            duplex2.push(null);
          } else {
            duplex2.push(chunk.value);
          }
        },
        (error) => destroy(duplex2, error)
      );
    },
    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error2) {
          process2.nextTick(() => {
            throw error2;
          });
        }
      }
      async function closeWriter() {
        if (!writableClosed) {
          await writer.abort(error);
        }
      }
      async function closeReader() {
        if (!readableClosed) {
          await reader.cancel(error);
        }
      }
      if (!writableClosed || !readableClosed) {
        Promise.all([
          closeWriter(),
          closeReader()
        ]).then(done, done);
        return;
      }
      done();
    }
  });
  writer.closed.then(
    () => {
      writableClosed = true;
      if (!isWritableEnded(duplex2)) {
        destroy(duplex2, new ERR_STREAM_PREMATURE_CLOSE());
      }
    },
    (error) => {
      writableClosed = true;
      readableClosed = true;
      destroy(duplex2, error);
    }
  );
  reader.closed.then(
    () => {
      readableClosed = true;
      if (!isReadableEnded2(duplex2)) {
        duplex2.push(null);
      }
    },
    (error) => {
      writableClosed = true;
      readableClosed = true;
      destroy(duplex2, error);
    }
  );
  return duplex2;
};
delete Readable.Duplex;
delete Readable.PassThrough;
delete Readable.Readable;
delete Readable.Stream;
delete Readable.Transform;
delete Readable.Writable;
delete Readable._isUint8Array;
delete Readable._uint8ArrayToBuffer;
delete Readable.addAbortSignal;
delete Readable.compose;
delete Readable.destroy;
delete Readable.finished;
delete Readable.isDisturbed;
delete Readable.isErrored;
delete Readable.isReadable;
delete Readable.pipeline;
function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
  if (typeof streamReadable?._readableState !== "object") {
    throw new ERR_INVALID_ARG_TYPE(
      "streamReadable",
      "stream.Readable",
      streamReadable
    );
  }
  if (isDestroyed(streamReadable) || !isReadable2(streamReadable)) {
    const readable = new ReadableStream();
    readable.cancel();
    return readable;
  }
  const objectMode = streamReadable.readableObjectMode;
  const highWaterMark = streamReadable.readableHighWaterMark;
  const evaluateStrategyOrFallback = (strategy2) => {
    if (strategy2) {
      return strategy2;
    }
    if (objectMode) {
      return new CountQueuingStrategy({ highWaterMark });
    }
    return { highWaterMark };
  };
  const strategy = evaluateStrategyOrFallback(options?.strategy);
  let controller;
  function onData(chunk) {
    if (Buffer3.isBuffer(chunk) && !objectMode) {
      chunk = new Uint8Array(chunk);
    }
    controller.enqueue(chunk);
    if (controller.desiredSize <= 0) {
      streamReadable.pause();
    }
  }
  streamReadable.pause();
  const cleanup = end_of_stream_default(streamReadable, (error) => {
    if (error?.code === "ERR_STREAM_PREMATURE_CLOSE") {
      const err = new AbortError(void 0, { cause: error });
      error = err;
    }
    cleanup();
    streamReadable.on("error", () => {
    });
    if (error) {
      return controller.error(error);
    }
    controller.close();
  });
  streamReadable.on("data", onData);
  return new ReadableStream({
    start(c) {
      controller = c;
    },
    pull() {
      streamReadable.resume();
    },
    cancel(reason) {
      destroy(streamReadable, reason);
    }
  }, strategy);
}
function newWritableStreamFromStreamWritable(streamWritable) {
  if (typeof streamWritable?._writableState !== "object") {
    throw new ERR_INVALID_ARG_TYPE(
      "streamWritable",
      "stream.Writable",
      streamWritable
    );
  }
  if (isDestroyed(streamWritable) || !isWritable2(streamWritable)) {
    const writable = new WritableStream();
    writable.close();
    return writable;
  }
  const highWaterMark = streamWritable.writableHighWaterMark;
  const strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({ highWaterMark }) : { highWaterMark };
  let controller;
  let backpressurePromise;
  let closed;
  function onDrain() {
    if (backpressurePromise !== void 0) {
      backpressurePromise.resolve();
    }
  }
  const cleanup = end_of_stream_default(streamWritable, (error) => {
    if (error?.code === "ERR_STREAM_PREMATURE_CLOSE") {
      const err = new AbortError(void 0, { cause: error });
      error = err;
    }
    cleanup();
    streamWritable.on("error", () => {
    });
    if (error != null) {
      if (backpressurePromise !== void 0) {
        backpressurePromise.reject(error);
      }
      if (closed !== void 0) {
        closed.reject(error);
        closed = void 0;
      }
      controller.error(error);
      controller = void 0;
      return;
    }
    if (closed !== void 0) {
      closed.resolve();
      closed = void 0;
      return;
    }
    controller.error(new AbortError());
    controller = void 0;
  });
  streamWritable.on("drain", onDrain);
  return new WritableStream({
    start(c) {
      controller = c;
    },
    async write(chunk) {
      if (streamWritable.writableNeedDrain || !streamWritable.write(chunk)) {
        backpressurePromise = createDeferredPromise();
        return backpressurePromise.promise.finally(() => {
          backpressurePromise = void 0;
        });
      }
    },
    abort(reason) {
      destroy(streamWritable, reason);
    },
    close() {
      if (closed === void 0 && !isWritableEnded(streamWritable)) {
        closed = createDeferredPromise();
        streamWritable.end();
        return closed.promise;
      }
      controller = void 0;
      return Promise.resolve();
    }
  }, strategy);
}
function newReadableWritablePairFromDuplex(duplex2) {
  if (typeof duplex2?._writableState !== "object" || typeof duplex2?._readableState !== "object") {
    throw new ERR_INVALID_ARG_TYPE("duplex", "stream.Duplex", duplex2);
  }
  if (isDestroyed(duplex2)) {
    const writable2 = new WritableStream();
    const readable2 = new ReadableStream();
    writable2.close();
    readable2.cancel();
    return { readable: readable2, writable: writable2 };
  }
  const writable = isWritable2(duplex2) ? newWritableStreamFromStreamWritable(duplex2) : new WritableStream();
  if (!isWritable2(duplex2)) {
    writable.close();
  }
  const readable = isReadable2(duplex2) ? newReadableStreamFromStreamReadable(duplex2) : new ReadableStream();
  if (!isReadable2(duplex2)) {
    readable.cancel();
  }
  return { writable, readable };
}
Readable.toWeb = newReadableStreamFromStreamReadable;
Writable.toWeb = newWritableStreamFromStreamWritable;
Duplex.toWeb = newReadableWritablePairFromDuplex;

// https://deno.land/std@0.177.0/node/_process/streams.mjs
function createWritableStdioStream(writer, name) {
  const stream = new mu({
    write(buf, enc, cb) {
      if (!writer) {
        this.destroy(
          new Error(`Deno.${name} is not available in this environment`)
        );
        return;
      }
      writer.writeSync(buf instanceof Uint8Array ? buf : Buffer2.from(buf, enc));
      cb();
    },
    destroy(err, cb) {
      cb(err);
      this._undestroy();
      if (!this._writableState.emitClose) {
        nextTick(() => this.emit("close"));
      }
    }
  });
  stream.fd = writer?.rid ?? -1;
  stream.destroySoon = stream.destroy;
  stream._isStdio = true;
  stream.once("close", () => writer?.close());
  Object.defineProperties(stream, {
    columns: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.().columns : void 0
    },
    rows: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.().rows : void 0
    },
    isTTY: {
      enumerable: true,
      configurable: true,
      get: () => Deno.isatty?.(writer?.rid)
    },
    getWindowSize: {
      enumerable: true,
      configurable: true,
      value: () => Deno.isatty?.(writer?.rid) ? Object.values(Deno.consoleSize?.()) : void 0
    }
  });
  if (Deno.isatty?.(writer?.rid)) {
    stream.cursorTo = function(x, y, callback) {
      return cursorTo(this, x, y, callback);
    };
    stream.moveCursor = function(dx, dy, callback) {
      return moveCursor(this, dx, dy, callback);
    };
    stream.clearLine = function(dir, callback) {
      return clearLine(this, dir, callback);
    };
    stream.clearScreenDown = function(callback) {
      return clearScreenDown(this, callback);
    };
  }
  return stream;
}
var stderr = stdio.stderr = createWritableStdioStream(
  Deno.stderr,
  "stderr"
);
var stdout = stdio.stdout = createWritableStdioStream(
  Deno.stdout,
  "stdout"
);
function _guessStdinType(fd) {
  if (typeof fd !== "number" || fd < 0)
    return "UNKNOWN";
  if (Deno.isatty?.(fd))
    return "TTY";
  try {
    const fileInfo = Deno.fstatSync?.(fd);
    if (Deno.build.os !== "windows") {
      switch (fileInfo.mode & fs.S_IFMT) {
        case fs.S_IFREG:
        case fs.S_IFCHR:
          return "FILE";
        case fs.S_IFIFO:
          return "PIPE";
        case fs.S_IFSOCK:
          return "TCP";
        default:
          return "UNKNOWN";
      }
    }
    if (fileInfo.isFile) {
      if (fileInfo.birthtime.valueOf() === 116444736e5)
        return "PIPE";
      return "FILE";
    }
  } catch (e) {
    if (Deno.build.os === "windows" && e.code === "EISDIR")
      return "FILE";
  }
  return "UNKNOWN";
}
var _read = function(size) {
  const p = Buffer2.alloc(size || 16 * 1024);
  Deno.stdin?.read(p).then((length) => {
    this.push(length === null ? null : p.slice(0, length));
  }, (error) => {
    this.destroy(error);
  });
};
var stdin = stdio.stdin = (() => {
  const fd = Deno.stdin?.rid;
  let _stdin;
  const stdinType = _guessStdinType(fd);
  switch (stdinType) {
    case "FILE": {
      _stdin = new Au({
        highWaterMark: 64 * 1024,
        autoDestroy: false,
        read: _read
      });
      break;
    }
    case "TTY":
    case "PIPE":
    case "TCP": {
      _stdin = new Tu({
        readable: stdinType === "TTY" ? void 0 : true,
        writable: stdinType === "TTY" ? void 0 : false,
        readableHighWaterMark: stdinType === "TTY" ? 0 : void 0,
        allowHalfOpen: false,
        emitClose: false,
        autoDestroy: true,
        decodeStrings: false,
        read: _read
      });
      if (stdinType !== "TTY") {
        _stdin._writableState.ended = true;
      }
      break;
    }
    default: {
      _stdin = new Au({ read() {
      } });
      _stdin.push(null);
    }
  }
  return _stdin;
})();
stdin.on("close", () => Deno.stdin?.close());
stdin.fd = Deno.stdin?.rid ?? -1;
Object.defineProperty(stdin, "isTTY", {
  enumerable: true,
  configurable: true,
  get() {
    return Deno.isatty?.(Deno.stdin.rid);
  }
});
stdin._isRawMode = false;
stdin.setRawMode = (enable) => {
  Deno.stdin?.setRaw?.(enable);
  stdin._isRawMode = enable;
  return stdin;
};
Object.defineProperty(stdin, "isRaw", {
  enumerable: true,
  configurable: true,
  get() {
    return stdin._isRawMode;
  }
});

// https://deno.land/std@0.177.0/node/internal_binding/async_wrap.ts
var async_wrap_exports = {};
__export(async_wrap_exports, {
  AsyncWrap: () => AsyncWrap,
  UidFields: () => UidFields,
  asyncIdFields: () => asyncIdFields,
  async_hook_fields: () => asyncHookFields,
  constants: () => constants2,
  newAsyncId: () => newAsyncId,
  providerType: () => providerType,
  registerDestroyHook: () => registerDestroyHook
});
function registerDestroyHook(_target, _asyncId, _prop) {
}
var constants2 = /* @__PURE__ */ ((constants5) => {
  constants5[constants5["kInit"] = 0] = "kInit";
  constants5[constants5["kBefore"] = 1] = "kBefore";
  constants5[constants5["kAfter"] = 2] = "kAfter";
  constants5[constants5["kDestroy"] = 3] = "kDestroy";
  constants5[constants5["kPromiseResolve"] = 4] = "kPromiseResolve";
  constants5[constants5["kTotals"] = 5] = "kTotals";
  constants5[constants5["kCheck"] = 6] = "kCheck";
  constants5[constants5["kExecutionAsyncId"] = 7] = "kExecutionAsyncId";
  constants5[constants5["kTriggerAsyncId"] = 8] = "kTriggerAsyncId";
  constants5[constants5["kAsyncIdCounter"] = 9] = "kAsyncIdCounter";
  constants5[constants5["kDefaultTriggerAsyncId"] = 10] = "kDefaultTriggerAsyncId";
  constants5[constants5["kUsesExecutionAsyncResource"] = 11] = "kUsesExecutionAsyncResource";
  constants5[constants5["kStackLength"] = 12] = "kStackLength";
  return constants5;
})(constants2 || {});
var asyncHookFields = new Uint32Array(Object.keys(constants2).length);
function newAsyncId() {
  return ++asyncIdFields[9 /* kAsyncIdCounter */];
}
var UidFields = /* @__PURE__ */ ((UidFields2) => {
  UidFields2[UidFields2["kExecutionAsyncId"] = 0] = "kExecutionAsyncId";
  UidFields2[UidFields2["kTriggerAsyncId"] = 1] = "kTriggerAsyncId";
  UidFields2[UidFields2["kAsyncIdCounter"] = 2] = "kAsyncIdCounter";
  UidFields2[UidFields2["kDefaultTriggerAsyncId"] = 3] = "kDefaultTriggerAsyncId";
  UidFields2[UidFields2["kUidFieldsCount"] = 4] = "kUidFieldsCount";
  return UidFields2;
})(UidFields || {});
var asyncIdFields = new Float64Array(Object.keys(UidFields).length);
asyncIdFields[2 /* kAsyncIdCounter */] = 1;
asyncIdFields[3 /* kDefaultTriggerAsyncId */] = -1;
var providerType = /* @__PURE__ */ ((providerType3) => {
  providerType3[providerType3["NONE"] = 0] = "NONE";
  providerType3[providerType3["DIRHANDLE"] = 1] = "DIRHANDLE";
  providerType3[providerType3["DNSCHANNEL"] = 2] = "DNSCHANNEL";
  providerType3[providerType3["ELDHISTOGRAM"] = 3] = "ELDHISTOGRAM";
  providerType3[providerType3["FILEHANDLE"] = 4] = "FILEHANDLE";
  providerType3[providerType3["FILEHANDLECLOSEREQ"] = 5] = "FILEHANDLECLOSEREQ";
  providerType3[providerType3["FIXEDSIZEBLOBCOPY"] = 6] = "FIXEDSIZEBLOBCOPY";
  providerType3[providerType3["FSEVENTWRAP"] = 7] = "FSEVENTWRAP";
  providerType3[providerType3["FSREQCALLBACK"] = 8] = "FSREQCALLBACK";
  providerType3[providerType3["FSREQPROMISE"] = 9] = "FSREQPROMISE";
  providerType3[providerType3["GETADDRINFOREQWRAP"] = 10] = "GETADDRINFOREQWRAP";
  providerType3[providerType3["GETNAMEINFOREQWRAP"] = 11] = "GETNAMEINFOREQWRAP";
  providerType3[providerType3["HEAPSNAPSHOT"] = 12] = "HEAPSNAPSHOT";
  providerType3[providerType3["HTTP2SESSION"] = 13] = "HTTP2SESSION";
  providerType3[providerType3["HTTP2STREAM"] = 14] = "HTTP2STREAM";
  providerType3[providerType3["HTTP2PING"] = 15] = "HTTP2PING";
  providerType3[providerType3["HTTP2SETTINGS"] = 16] = "HTTP2SETTINGS";
  providerType3[providerType3["HTTPINCOMINGMESSAGE"] = 17] = "HTTPINCOMINGMESSAGE";
  providerType3[providerType3["HTTPCLIENTREQUEST"] = 18] = "HTTPCLIENTREQUEST";
  providerType3[providerType3["JSSTREAM"] = 19] = "JSSTREAM";
  providerType3[providerType3["JSUDPWRAP"] = 20] = "JSUDPWRAP";
  providerType3[providerType3["MESSAGEPORT"] = 21] = "MESSAGEPORT";
  providerType3[providerType3["PIPECONNECTWRAP"] = 22] = "PIPECONNECTWRAP";
  providerType3[providerType3["PIPESERVERWRAP"] = 23] = "PIPESERVERWRAP";
  providerType3[providerType3["PIPEWRAP"] = 24] = "PIPEWRAP";
  providerType3[providerType3["PROCESSWRAP"] = 25] = "PROCESSWRAP";
  providerType3[providerType3["PROMISE"] = 26] = "PROMISE";
  providerType3[providerType3["QUERYWRAP"] = 27] = "QUERYWRAP";
  providerType3[providerType3["SHUTDOWNWRAP"] = 28] = "SHUTDOWNWRAP";
  providerType3[providerType3["SIGNALWRAP"] = 29] = "SIGNALWRAP";
  providerType3[providerType3["STATWATCHER"] = 30] = "STATWATCHER";
  providerType3[providerType3["STREAMPIPE"] = 31] = "STREAMPIPE";
  providerType3[providerType3["TCPCONNECTWRAP"] = 32] = "TCPCONNECTWRAP";
  providerType3[providerType3["TCPSERVERWRAP"] = 33] = "TCPSERVERWRAP";
  providerType3[providerType3["TCPWRAP"] = 34] = "TCPWRAP";
  providerType3[providerType3["TTYWRAP"] = 35] = "TTYWRAP";
  providerType3[providerType3["UDPSENDWRAP"] = 36] = "UDPSENDWRAP";
  providerType3[providerType3["UDPWRAP"] = 37] = "UDPWRAP";
  providerType3[providerType3["SIGINTWATCHDOG"] = 38] = "SIGINTWATCHDOG";
  providerType3[providerType3["WORKER"] = 39] = "WORKER";
  providerType3[providerType3["WORKERHEAPSNAPSHOT"] = 40] = "WORKERHEAPSNAPSHOT";
  providerType3[providerType3["WRITEWRAP"] = 41] = "WRITEWRAP";
  providerType3[providerType3["ZLIB"] = 42] = "ZLIB";
  return providerType3;
})(providerType || {});
var kInvalidAsyncId = -1;
var AsyncWrap = class {
  provider = 0 /* NONE */;
  asyncId = kInvalidAsyncId;
  constructor(provider) {
    this.provider = provider;
    this.getAsyncId();
  }
  getAsyncId() {
    this.asyncId = this.asyncId === kInvalidAsyncId ? newAsyncId() : this.asyncId;
    return this.asyncId;
  }
  getProviderType() {
    return this.provider;
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/config.ts
var config_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/cares_wrap.ts
var cares_wrap_exports = {};
__export(cares_wrap_exports, {
  ChannelWrap: () => ChannelWrap,
  GetAddrInfoReqWrap: () => GetAddrInfoReqWrap,
  QueryReqWrap: () => QueryReqWrap,
  getaddrinfo: () => getaddrinfo,
  strerror: () => strerror
});

// https://deno.land/std@0.177.0/node/internal/net.ts
var v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
var v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
var IPv4Reg = new RegExp(`^${v4Str}$`);
var v6Seg = "(?:[0-9a-fA-F]{1,4})";
var IPv6Reg = new RegExp(
  `^((?:${v6Seg}:){7}(?:${v6Seg}|:)|(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`
);
function isIPv4(ip) {
  return RegExp.prototype.test.call(IPv4Reg, ip);
}
function isIPv6(ip) {
  return RegExp.prototype.test.call(IPv6Reg, ip);
}
function isIP(ip) {
  if (isIPv4(ip)) {
    return 4;
  }
  if (isIPv6(ip)) {
    return 6;
  }
  return 0;
}
var normalizedArgsSymbol = Symbol("normalizedArgs");

// https://deno.land/std@0.177.0/node/internal_binding/ares.ts
var ARES_AI_CANONNAME = 1 << 0;
var ARES_AI_NUMERICHOST = 1 << 1;
var ARES_AI_PASSIVE = 1 << 2;
var ARES_AI_NUMERICSERV = 1 << 3;
var AI_V4MAPPED = 1 << 4;
var AI_ALL = 1 << 5;
var AI_ADDRCONFIG = 1 << 6;
var ARES_AI_NOSORT = 1 << 7;
var ARES_AI_ENVHOSTS = 1 << 8;
function ares_strerror(code) {
  const errorText = [
    "Successful completion",
    "DNS server returned answer with no data",
    "DNS server claims query was misformatted",
    "DNS server returned general failure",
    "Domain name not found",
    "DNS server does not implement requested operation",
    "DNS server refused query",
    "Misformatted DNS query",
    "Misformatted domain name",
    "Unsupported address family",
    "Misformatted DNS reply",
    "Could not contact DNS servers",
    "Timeout while contacting DNS servers",
    "End of file",
    "Error reading file",
    "Out of memory",
    "Channel is being destroyed",
    "Misformatted string",
    "Illegal flags specified",
    "Given hostname is not numeric",
    "Illegal hints flags specified",
    "c-ares library initialization not yet performed",
    "Error loading iphlpapi.dll",
    "Could not find GetNetworkParams function",
    "DNS query cancelled"
  ];
  if (code >= 0 && code < errorText.length) {
    return errorText[code];
  } else {
    return "unknown";
  }
}

// https://deno.land/std@0.177.0/node/internal_binding/cares_wrap.ts
var GetAddrInfoReqWrap = class extends AsyncWrap {
  family;
  hostname;
  callback;
  resolve;
  reject;
  oncomplete;
  constructor() {
    super(10 /* GETADDRINFOREQWRAP */);
  }
};
function getaddrinfo(req, hostname, family, _hints, verbatim) {
  let addresses = [];
  const recordTypes = [];
  if (family === 0 || family === 4) {
    recordTypes.push("A");
  }
  if (family === 0 || family === 6) {
    recordTypes.push("AAAA");
  }
  (async () => {
    await Promise.allSettled(
      recordTypes.map(
        (recordType) => Deno.resolveDns(hostname, recordType).then((records) => {
          records.forEach((record) => addresses.push(record));
        })
      )
    );
    const error = addresses.length ? 0 : codeMap.get("EAI_NODATA");
    if (!verbatim) {
      addresses.sort((a, b) => {
        if (isIPv4(a)) {
          return -1;
        } else if (isIPv4(b)) {
          return 1;
        }
        return 0;
      });
    }
    if (isWindows && hostname === "localhost") {
      addresses = addresses.filter((address) => isIPv4(address));
    }
    req.oncomplete(error, addresses);
  })();
  return 0;
}
var QueryReqWrap = class extends AsyncWrap {
  bindingName;
  hostname;
  ttl;
  callback;
  // deno-lint-ignore no-explicit-any
  resolve;
  reject;
  oncomplete;
  constructor() {
    super(27 /* QUERYWRAP */);
  }
};
function fqdnToHostname(fqdn) {
  return fqdn.replace(/\.$/, "");
}
function compressIPv6(address) {
  const formatted = address.replace(/\b(?:0+:){2,}/, ":");
  const finalAddress = formatted.split(":").map((octet) => {
    if (octet.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      return Number(octet.replaceAll(".", "")).toString(16);
    }
    return octet.replace(/\b0+/g, "");
  }).join(":");
  return finalAddress;
}
var ChannelWrap = class extends AsyncWrap {
  #servers = [];
  #timeout;
  #tries;
  constructor(timeout, tries) {
    super(2 /* DNSCHANNEL */);
    this.#timeout = timeout;
    this.#tries = tries;
  }
  async #query(query, recordType) {
    let code;
    let ret;
    if (this.#servers.length) {
      for (const [ipAddr, port] of this.#servers) {
        const resolveOptions = {
          nameServer: {
            ipAddr,
            port
          }
        };
        ({ code, ret } = await this.#resolve(
          query,
          recordType,
          resolveOptions
        ));
        if (code === 0 || code === codeMap.get("EAI_NODATA")) {
          break;
        }
      }
    } else {
      ({ code, ret } = await this.#resolve(query, recordType));
    }
    return { code, ret };
  }
  async #resolve(query, recordType, resolveOptions) {
    let ret = [];
    let code = 0;
    try {
      ret = await Deno.resolveDns(query, recordType, resolveOptions);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        code = codeMap.get("EAI_NODATA");
      } else {
        code = codeMap.get("UNKNOWN");
      }
    }
    return { code, ret };
  }
  queryAny(req, name) {
    (async () => {
      const records = [];
      await Promise.allSettled([
        this.#query(name, "A").then(({ ret }) => {
          ret.forEach((record) => records.push({ type: "A", address: record }));
        }),
        this.#query(name, "AAAA").then(({ ret }) => {
          ret.forEach(
            (record) => records.push({ type: "AAAA", address: compressIPv6(record) })
          );
        }),
        this.#query(name, "CAA").then(({ ret }) => {
          ret.forEach(
            ({ critical, tag, value }) => records.push({
              type: "CAA",
              [tag]: value,
              critical: +critical && 128
            })
          );
        }),
        this.#query(name, "CNAME").then(({ ret }) => {
          ret.forEach(
            (record) => records.push({ type: "CNAME", value: record })
          );
        }),
        this.#query(name, "MX").then(({ ret }) => {
          ret.forEach(
            ({ preference, exchange }) => records.push({
              type: "MX",
              priority: preference,
              exchange: fqdnToHostname(exchange)
            })
          );
        }),
        this.#query(name, "NAPTR").then(({ ret }) => {
          ret.forEach(
            ({ order, preference, flags, services, regexp, replacement }) => records.push({
              type: "NAPTR",
              order,
              preference,
              flags,
              service: services,
              regexp,
              replacement
            })
          );
        }),
        this.#query(name, "NS").then(({ ret }) => {
          ret.forEach(
            (record) => records.push({ type: "NS", value: fqdnToHostname(record) })
          );
        }),
        this.#query(name, "PTR").then(({ ret }) => {
          ret.forEach(
            (record) => records.push({ type: "PTR", value: fqdnToHostname(record) })
          );
        }),
        this.#query(name, "SOA").then(({ ret }) => {
          ret.forEach(
            ({ mname, rname, serial, refresh, retry, expire, minimum }) => records.push({
              type: "SOA",
              nsname: fqdnToHostname(mname),
              hostmaster: fqdnToHostname(rname),
              serial,
              refresh,
              retry,
              expire,
              minttl: minimum
            })
          );
        }),
        this.#query(name, "SRV").then(({ ret }) => {
          ret.forEach(
            ({ priority, weight, port, target }) => records.push({
              type: "SRV",
              priority,
              weight,
              port,
              name: target
            })
          );
        }),
        this.#query(name, "TXT").then(({ ret }) => {
          ret.forEach(
            (record) => records.push({ type: "TXT", entries: record })
          );
        })
      ]);
      const err = records.length ? 0 : codeMap.get("EAI_NODATA");
      req.oncomplete(err, records);
    })();
    return 0;
  }
  queryA(req, name) {
    this.#query(name, "A").then(({ code, ret }) => {
      req.oncomplete(code, ret);
    });
    return 0;
  }
  queryAaaa(req, name) {
    this.#query(name, "AAAA").then(({ code, ret }) => {
      const records = ret.map((record) => compressIPv6(record));
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryCaa(req, name) {
    this.#query(name, "CAA").then(({ code, ret }) => {
      const records = ret.map(
        ({ critical, tag, value }) => ({
          [tag]: value,
          critical: +critical && 128
        })
      );
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryCname(req, name) {
    this.#query(name, "CNAME").then(({ code, ret }) => {
      req.oncomplete(code, ret);
    });
    return 0;
  }
  queryMx(req, name) {
    this.#query(name, "MX").then(({ code, ret }) => {
      const records = ret.map(
        ({ preference, exchange }) => ({
          priority: preference,
          exchange: fqdnToHostname(exchange)
        })
      );
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryNaptr(req, name) {
    this.#query(name, "NAPTR").then(({ code, ret }) => {
      const records = ret.map(
        ({ order, preference, flags, services, regexp, replacement }) => ({
          flags,
          service: services,
          regexp,
          replacement,
          order,
          preference
        })
      );
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryNs(req, name) {
    this.#query(name, "NS").then(({ code, ret }) => {
      const records = ret.map((record) => fqdnToHostname(record));
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryPtr(req, name) {
    this.#query(name, "PTR").then(({ code, ret }) => {
      const records = ret.map((record) => fqdnToHostname(record));
      req.oncomplete(code, records);
    });
    return 0;
  }
  querySoa(req, name) {
    this.#query(name, "SOA").then(({ code, ret }) => {
      let record = {};
      if (ret.length) {
        const { mname, rname, serial, refresh, retry, expire, minimum } = ret[0];
        record = {
          nsname: fqdnToHostname(mname),
          hostmaster: fqdnToHostname(rname),
          serial,
          refresh,
          retry,
          expire,
          minttl: minimum
        };
      }
      req.oncomplete(code, record);
    });
    return 0;
  }
  querySrv(req, name) {
    this.#query(name, "SRV").then(({ code, ret }) => {
      const records = ret.map(
        ({ priority, weight, port, target }) => ({
          priority,
          weight,
          port,
          name: target
        })
      );
      req.oncomplete(code, records);
    });
    return 0;
  }
  queryTxt(req, name) {
    this.#query(name, "TXT").then(({ code, ret }) => {
      req.oncomplete(code, ret);
    });
    return 0;
  }
  getHostByAddr(_req, _name) {
    notImplemented("cares.ChannelWrap.prototype.getHostByAddr");
  }
  getServers() {
    return this.#servers;
  }
  setServers(servers) {
    if (typeof servers === "string") {
      const tuples = [];
      for (let i = 0; i < servers.length; i += 2) {
        tuples.push([servers[i], parseInt(servers[i + 1])]);
      }
      this.#servers = tuples;
    } else {
      this.#servers = servers.map(([_ipVersion, ip, port]) => [ip, port]);
    }
    return 0;
  }
  setLocalAddress(_addr0, _addr1) {
    notImplemented("cares.ChannelWrap.prototype.setLocalAddress");
  }
  cancel() {
    notImplemented("cares.ChannelWrap.prototype.cancel");
  }
};
var DNS_ESETSRVPENDING = -1e3;
var EMSG_ESETSRVPENDING = "There are pending queries.";
function strerror(code) {
  return code === DNS_ESETSRVPENDING ? EMSG_ESETSRVPENDING : ares_strerror(code);
}

// https://deno.land/std@0.177.0/node/internal_binding/contextify.ts
var contextify_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/crypto.ts
var crypto_exports = {};
__export(crypto_exports, {
  getFipsCrypto: () => getFipsCrypto,
  setFipsCrypto: () => setFipsCrypto,
  timingSafeEqual: () => timingSafeEqual2
});

// https://deno.land/std@0.177.0/crypto/timing_safe_equal.ts
function timingSafeEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  if (!(a instanceof DataView)) {
    a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
  }
  if (!(b instanceof DataView)) {
    b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
  }
  assert(a instanceof DataView);
  assert(b instanceof DataView);
  const length = a.byteLength;
  let out = 0;
  let i = -1;
  while (++i < length) {
    out |= a.getUint8(i) ^ b.getUint8(i);
  }
  return out === 0;
}

// https://deno.land/std@0.177.0/node/internal_binding/_timingSafeEqual.ts
var timingSafeEqual2 = (a, b) => {
  if (a instanceof Buffer2)
    a = new DataView(a.buffer);
  if (a instanceof Buffer2)
    b = new DataView(a.buffer);
  return timingSafeEqual(a, b);
};

// https://deno.land/std@0.177.0/node/internal_binding/crypto.ts
function getFipsCrypto() {
  notImplemented("crypto.getFipsCrypto");
}
function setFipsCrypto(_fips) {
  notImplemented("crypto.setFipsCrypto");
}

// https://deno.land/std@0.177.0/node/internal_binding/credentials.ts
var credentials_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/errors.ts
var errors_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/fs.ts
var fs_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/fs_dir.ts
var fs_dir_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/fs_event_wrap.ts
var fs_event_wrap_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/heap_utils.ts
var heap_utils_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/http_parser.ts
var http_parser_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/icu.ts
var icu_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/inspector.ts
var inspector_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/js_stream.ts
var js_stream_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/messaging.ts
var messaging_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/module_wrap.ts
var module_wrap_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/native_module.ts
var native_module_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/natives.ts
var natives_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/options.ts
var options_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/os.ts
var os_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/pipe_wrap.ts
var pipe_wrap_exports = {};
__export(pipe_wrap_exports, {
  Pipe: () => Pipe,
  PipeConnectWrap: () => PipeConnectWrap,
  constants: () => constants3,
  socketType: () => socketType
});

// https://deno.land/std@0.177.0/node/internal_binding/stream_wrap.ts
var stream_wrap_exports = {};
__export(stream_wrap_exports, {
  LibuvStreamWrap: () => LibuvStreamWrap,
  ShutdownWrap: () => ShutdownWrap,
  WriteWrap: () => WriteWrap,
  kArrayBufferOffset: () => kArrayBufferOffset,
  kBytesWritten: () => kBytesWritten,
  kLastWriteWasAsync: () => kLastWriteWasAsync,
  kNumStreamBaseStateFields: () => kNumStreamBaseStateFields,
  kReadBytesOrError: () => kReadBytesOrError,
  kStreamBaseField: () => kStreamBaseField,
  streamBaseState: () => streamBaseState
});

// https://deno.land/std@0.177.0/node/internal_binding/handle_wrap.ts
var HandleWrap = class extends AsyncWrap {
  constructor(provider) {
    super(provider);
  }
  close(cb = () => {
  }) {
    this._onClose();
    queueMicrotask(cb);
  }
  ref() {
    unreachable();
  }
  unref() {
    unreachable();
  }
  // deno-lint-ignore no-explicit-any
  _onClose() {
  }
};

// https://deno.land/std@0.177.0/streams/write_all.ts
async function writeAll(w, arr) {
  let nwritten = 0;
  while (nwritten < arr.length) {
    nwritten += await w.write(arr.subarray(nwritten));
  }
}
function writeAllSync(w, arr) {
  let nwritten = 0;
  while (nwritten < arr.length) {
    nwritten += w.writeSync(arr.subarray(nwritten));
  }
}

// https://deno.land/std@0.177.0/node/internal_binding/stream_wrap.ts
var kReadBytesOrError = 0 /* kReadBytesOrError */;
var kArrayBufferOffset = 1 /* kArrayBufferOffset */;
var kBytesWritten = 2 /* kBytesWritten */;
var kLastWriteWasAsync = 3 /* kLastWriteWasAsync */;
var kNumStreamBaseStateFields = 4 /* kNumStreamBaseStateFields */;
var streamBaseState = new Uint8Array(5);
streamBaseState[kLastWriteWasAsync] = 1;
var WriteWrap = class extends AsyncWrap {
  handle;
  oncomplete;
  async;
  bytes;
  buffer;
  callback;
  _chunks;
  constructor() {
    super(41 /* WRITEWRAP */);
  }
};
var ShutdownWrap = class extends AsyncWrap {
  handle;
  oncomplete;
  callback;
  constructor() {
    super(28 /* SHUTDOWNWRAP */);
  }
};
var kStreamBaseField = Symbol("kStreamBaseField");
var SUGGESTED_SIZE = 64 * 1024;
var LibuvStreamWrap = class extends HandleWrap {
  [kStreamBaseField];
  reading;
  #reading = false;
  destroyed = false;
  writeQueueSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  onread;
  constructor(provider, stream) {
    super(provider);
    this.#attachToObject(stream);
  }
  /**
   * Start the reading of the stream.
   * @return An error status code.
   */
  readStart() {
    if (!this.#reading) {
      this.#reading = true;
      this.#read();
    }
    return 0;
  }
  /**
   * Stop the reading of the stream.
   * @return An error status code.
   */
  readStop() {
    this.#reading = false;
    return 0;
  }
  /**
   * Shutdown the stream.
   * @param req A shutdown request wrapper.
   * @return An error status code.
   */
  shutdown(req) {
    const status = this._onClose();
    try {
      req.oncomplete(status);
    } catch {
    }
    return 0;
  }
  /**
   * @param userBuf
   * @return An error status code.
   */
  useUserBuffer(_userBuf) {
    notImplemented("LibuvStreamWrap.prototype.useUserBuffer");
  }
  /**
   * Write a buffer to the stream.
   * @param req A write request wrapper.
   * @param data The Uint8Array buffer to write to the stream.
   * @return An error status code.
   */
  writeBuffer(req, data) {
    this.#write(req, data);
    return 0;
  }
  /**
   * Write multiple chunks at once.
   * @param req A write request wrapper.
   * @param chunks
   * @param allBuffers
   * @return An error status code.
   */
  writev(req, chunks, allBuffers) {
    const count = allBuffers ? chunks.length : chunks.length >> 1;
    const buffers = new Array(count);
    if (!allBuffers) {
      for (let i = 0; i < count; i++) {
        const chunk = chunks[i * 2];
        if (Buffer2.isBuffer(chunk)) {
          buffers[i] = chunk;
        }
        const encoding = chunks[i * 2 + 1];
        buffers[i] = Buffer2.from(chunk, encoding);
      }
    } else {
      for (let i = 0; i < count; i++) {
        buffers[i] = chunks[i];
      }
    }
    return this.writeBuffer(req, Buffer2.concat(buffers));
  }
  /**
   * Write an ASCII string to the stream.
   * @return An error status code.
   */
  writeAsciiString(req, data) {
    const buffer = new TextEncoder().encode(data);
    return this.writeBuffer(req, buffer);
  }
  /**
   * Write an UTF8 string to the stream.
   * @return An error status code.
   */
  writeUtf8String(req, data) {
    const buffer = new TextEncoder().encode(data);
    return this.writeBuffer(req, buffer);
  }
  /**
   * Write an UCS2 string to the stream.
   * @return An error status code.
   */
  writeUcs2String(_req, _data) {
    notImplemented("LibuvStreamWrap.prototype.writeUcs2String");
  }
  /**
   * Write an LATIN1 string to the stream.
   * @return An error status code.
   */
  writeLatin1String(req, data) {
    const buffer = Buffer2.from(data, "latin1");
    return this.writeBuffer(req, buffer);
  }
  _onClose() {
    let status = 0;
    this.#reading = false;
    try {
      this[kStreamBaseField]?.close();
    } catch {
      status = codeMap.get("ENOTCONN");
    }
    return status;
  }
  /**
   * Attaches the class to the underlying stream.
   * @param stream The stream to attach to.
   */
  #attachToObject(stream) {
    this[kStreamBaseField] = stream;
  }
  /** Internal method for reading from the attached stream. */
  async #read() {
    let buf = new Uint8Array(SUGGESTED_SIZE);
    let nread;
    try {
      nread = await this[kStreamBaseField].read(buf);
    } catch (e) {
      if (e instanceof Deno.errors.Interrupted || e instanceof Deno.errors.BadResource) {
        nread = codeMap.get("EOF");
      } else if (e instanceof Deno.errors.ConnectionReset || e instanceof Deno.errors.ConnectionAborted) {
        nread = codeMap.get("ECONNRESET");
      } else {
        nread = codeMap.get("UNKNOWN");
      }
      buf = new Uint8Array(0);
    }
    nread ??= codeMap.get("EOF");
    streamBaseState[kReadBytesOrError] = nread;
    if (nread > 0) {
      this.bytesRead += nread;
    }
    buf = buf.slice(0, nread);
    streamBaseState[kArrayBufferOffset] = 0;
    try {
      this.onread(buf, nread);
    } catch {
    }
    if (nread >= 0 && this.#reading) {
      this.#read();
    }
  }
  /**
   * Internal method for writing to the attached stream.
   * @param req A write request wrapper.
   * @param data The Uint8Array buffer to write to the stream.
   */
  async #write(req, data) {
    const { byteLength: byteLength2 } = data;
    try {
      await writeAll(this[kStreamBaseField], data);
    } catch (e) {
      let status;
      if (e instanceof Deno.errors.BadResource || e instanceof Deno.errors.BrokenPipe) {
        status = codeMap.get("EBADF");
      } else {
        status = codeMap.get("UNKNOWN");
      }
      try {
        req.oncomplete(status);
      } catch {
      }
      return;
    }
    streamBaseState[kBytesWritten] = byteLength2;
    this.bytesWritten += byteLength2;
    try {
      req.oncomplete(0);
    } catch {
    }
    return;
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/connection_wrap.ts
var ConnectionWrap = class extends LibuvStreamWrap {
  /** Optional connection callback. */
  onconnection = null;
  /**
   * Creates a new ConnectionWrap class instance.
   * @param provider Provider type.
   * @param object Optional stream object.
   */
  constructor(provider, object) {
    super(provider, object);
  }
  /**
   * @param req A connect request.
   * @param status An error status code.
   */
  afterConnect(req, status) {
    const isSuccessStatus = !status;
    const readable = isSuccessStatus;
    const writable = isSuccessStatus;
    try {
      req.oncomplete(status, this, req, readable, writable);
    } catch {
    }
    return;
  }
};

// https://deno.land/std@0.177.0/async/deferred.ts
function deferred() {
  let methods;
  let state = "pending";
  const promise = new Promise((resolve7, reject) => {
    methods = {
      async resolve(value) {
        await value;
        state = "fulfilled";
        resolve7(value);
      },
      // deno-lint-ignore no-explicit-any
      reject(reason) {
        state = "rejected";
        reject(reason);
      }
    };
  });
  Object.defineProperty(promise, "state", { get: () => state });
  return Object.assign(promise, methods);
}

// https://deno.land/std@0.177.0/async/delay.ts
function delay(ms, options = {}) {
  const { signal, persistent } = options;
  if (signal?.aborted) {
    return Promise.reject(new DOMException("Delay was aborted.", "AbortError"));
  }
  return new Promise((resolve7, reject) => {
    const abort = () => {
      clearTimeout(i);
      reject(new DOMException("Delay was aborted.", "AbortError"));
    };
    const done = () => {
      signal?.removeEventListener("abort", abort);
      resolve7();
    };
    const i = setTimeout(done, ms);
    signal?.addEventListener("abort", abort, { once: true });
    if (persistent === false) {
      try {
        Deno.unrefTimer(i);
      } catch (error) {
        if (!(error instanceof ReferenceError)) {
          throw error;
        }
        console.error("`persistent` option is only available in Deno");
      }
    }
  });
}

// https://deno.land/std@0.177.0/async/mux_async_iterator.ts
var MuxAsyncIterator = class {
  #iteratorCount = 0;
  #yields = [];
  // deno-lint-ignore no-explicit-any
  #throws = [];
  #signal = deferred();
  add(iterable) {
    ++this.#iteratorCount;
    this.#callIteratorNext(iterable[Symbol.asyncIterator]());
  }
  async #callIteratorNext(iterator) {
    try {
      const { value, done } = await iterator.next();
      if (done) {
        --this.#iteratorCount;
      } else {
        this.#yields.push({ iterator, value });
      }
    } catch (e) {
      this.#throws.push(e);
    }
    this.#signal.resolve();
  }
  async *iterate() {
    while (this.#iteratorCount > 0) {
      await this.#signal;
      for (let i = 0; i < this.#yields.length; i++) {
        const { iterator, value } = this.#yields[i];
        yield value;
        this.#callIteratorNext(iterator);
      }
      if (this.#throws.length) {
        for (const e of this.#throws) {
          throw e;
        }
        this.#throws.length = 0;
      }
      this.#yields.length = 0;
      this.#signal = deferred();
    }
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/_listen.ts
function ceilPowOf2(n) {
  const roundPowOf2 = 1 << 31 - Math.clz32(n);
  return roundPowOf2 < n ? roundPowOf2 * 2 : roundPowOf2;
}
var INITIAL_ACCEPT_BACKOFF_DELAY = 5;
var MAX_ACCEPT_BACKOFF_DELAY = 1e3;

// https://deno.land/std@0.177.0/node/internal_binding/pipe_wrap.ts
var socketType = /* @__PURE__ */ ((socketType2) => {
  socketType2[socketType2["SOCKET"] = 0] = "SOCKET";
  socketType2[socketType2["SERVER"] = 1] = "SERVER";
  socketType2[socketType2["IPC"] = 2] = "IPC";
  return socketType2;
})(socketType || {});
var Pipe = class _Pipe extends ConnectionWrap {
  reading = false;
  ipc;
  // REF: https://github.com/nodejs/node/blob/master/deps/uv/src/win/pipe.c#L48
  #pendingInstances = 4;
  #address;
  #backlog;
  #listener;
  #connections = 0;
  #closed = false;
  #acceptBackoffDelay;
  constructor(type, conn) {
    let provider;
    let ipc;
    switch (type) {
      case 0 /* SOCKET */: {
        provider = 24 /* PIPEWRAP */;
        ipc = false;
        break;
      }
      case 1 /* SERVER */: {
        provider = 23 /* PIPESERVERWRAP */;
        ipc = false;
        break;
      }
      case 2 /* IPC */: {
        provider = 24 /* PIPEWRAP */;
        ipc = true;
        break;
      }
      default: {
        unreachable();
      }
    }
    super(provider, conn);
    this.ipc = ipc;
    if (conn && provider === 24 /* PIPEWRAP */) {
      const localAddr = conn.localAddr;
      this.#address = localAddr.path;
    }
  }
  open(_fd) {
    notImplemented("Pipe.prototype.open");
  }
  /**
   * Bind to a Unix domain or Windows named pipe.
   * @param name Unix domain or Windows named pipe the server should listen to.
   * @return An error status code.
   */
  bind(name) {
    this.#address = name;
    return 0;
  }
  /**
   * Connect to a Unix domain or Windows named pipe.
   * @param req A PipeConnectWrap instance.
   * @param address Unix domain or Windows named pipe the server should connect to.
   * @return An error status code.
   */
  connect(req, address) {
    if (isWindows) {
      notImplemented("Pipe.prototype.connect - Windows");
    }
    const connectOptions = {
      path: address,
      transport: "unix"
    };
    Deno.connect(connectOptions).then(
      (conn) => {
        const localAddr = conn.localAddr;
        this.#address = req.address = localAddr.path;
        this[kStreamBaseField] = conn;
        try {
          this.afterConnect(req, 0);
        } catch {
        }
      },
      (e) => {
        let code;
        if (e instanceof Deno.errors.NotFound) {
          code = codeMap.get("ENOENT");
        } else if (e instanceof Deno.errors.PermissionDenied) {
          code = codeMap.get("EACCES");
        } else {
          code = codeMap.get("ECONNREFUSED");
        }
        try {
          this.afterConnect(req, code);
        } catch {
        }
      }
    );
    return 0;
  }
  /**
   * Listen for new connections.
   * @param backlog The maximum length of the queue of pending connections.
   * @return An error status code.
   */
  listen(backlog) {
    if (isWindows) {
      notImplemented("Pipe.prototype.listen - Windows");
    }
    this.#backlog = isWindows ? this.#pendingInstances : ceilPowOf2(backlog + 1);
    const listenOptions = {
      path: this.#address,
      transport: "unix"
    };
    let listener;
    try {
      listener = Deno.listen(listenOptions);
    } catch (e) {
      if (e instanceof Deno.errors.AddrInUse) {
        return codeMap.get("EADDRINUSE");
      } else if (e instanceof Deno.errors.AddrNotAvailable) {
        return codeMap.get("EADDRNOTAVAIL");
      } else if (e instanceof Deno.errors.PermissionDenied) {
        throw e;
      }
      return codeMap.get("UNKNOWN");
    }
    const address = listener.addr;
    this.#address = address.path;
    this.#listener = listener;
    this.#accept();
    return 0;
  }
  ref() {
    if (this.#listener) {
      this.#listener.ref();
    }
  }
  unref() {
    if (this.#listener) {
      this.#listener.unref();
    }
  }
  /**
   * Set the number of pending pipe instance handles when the pipe server is
   * waiting for connections. This setting applies to Windows only.
   * @param instances Number of pending pipe instances.
   */
  setPendingInstances(instances) {
    this.#pendingInstances = instances;
  }
  /**
   * Alters pipe permissions, allowing it to be accessed from processes run by
   * different users. Makes the pipe writable or readable by all users. Mode
   * can be `UV_WRITABLE`, `UV_READABLE` or `UV_WRITABLE | UV_READABLE`. This
   * function is blocking.
   * @param mode Pipe permissions mode.
   * @return An error status code.
   */
  fchmod(mode) {
    if (mode != 1 /* UV_READABLE */ && mode != 2 /* UV_WRITABLE */ && mode != (2 /* UV_WRITABLE */ | 1 /* UV_READABLE */)) {
      return codeMap.get("EINVAL");
    }
    let desired_mode = 0;
    if (mode & 1 /* UV_READABLE */) {
      desired_mode |= fs.S_IRUSR | fs.S_IRGRP | fs.S_IROTH;
    }
    if (mode & 2 /* UV_WRITABLE */) {
      desired_mode |= fs.S_IWUSR | fs.S_IWGRP | fs.S_IWOTH;
    }
    try {
      Deno.chmodSync(this.#address, desired_mode);
    } catch {
      return codeMap.get("UNKNOWN");
    }
    return 0;
  }
  /** Handle backoff delays following an unsuccessful accept. */
  async #acceptBackoff() {
    if (!this.#acceptBackoffDelay) {
      this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
    } else {
      this.#acceptBackoffDelay *= 2;
    }
    if (this.#acceptBackoffDelay >= MAX_ACCEPT_BACKOFF_DELAY) {
      this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
    }
    await delay(this.#acceptBackoffDelay);
    this.#accept();
  }
  /** Accept new connections. */
  async #accept() {
    if (this.#closed) {
      return;
    }
    if (this.#connections > this.#backlog) {
      this.#acceptBackoff();
      return;
    }
    let connection;
    try {
      connection = await this.#listener.accept();
    } catch (e) {
      if (e instanceof Deno.errors.BadResource && this.#closed) {
        return;
      }
      try {
        this.onconnection(codeMap.get("UNKNOWN"), void 0);
      } catch {
      }
      this.#acceptBackoff();
      return;
    }
    this.#acceptBackoffDelay = void 0;
    const connectionHandle = new _Pipe(0 /* SOCKET */, connection);
    this.#connections++;
    try {
      this.onconnection(0, connectionHandle);
    } catch {
    }
    return this.#accept();
  }
  /** Handle server closure. */
  _onClose() {
    this.#closed = true;
    this.reading = false;
    this.#address = void 0;
    this.#backlog = void 0;
    this.#connections = 0;
    this.#acceptBackoffDelay = void 0;
    if (this.provider === 23 /* PIPESERVERWRAP */) {
      try {
        this.#listener.close();
      } catch {
      }
    }
    return LibuvStreamWrap.prototype._onClose.call(this);
  }
};
var PipeConnectWrap = class extends AsyncWrap {
  oncomplete;
  address;
  constructor() {
    super(22 /* PIPECONNECTWRAP */);
  }
};
var constants3 = /* @__PURE__ */ ((constants5) => {
  constants5[constants5["SOCKET"] = 0 /* SOCKET */] = "SOCKET";
  constants5[constants5["SERVER"] = 1 /* SERVER */] = "SERVER";
  constants5[constants5["IPC"] = 2 /* IPC */] = "IPC";
  constants5[constants5["UV_READABLE"] = 1] = "UV_READABLE";
  constants5[constants5["UV_WRITABLE"] = 2] = "UV_WRITABLE";
  return constants5;
})(constants3 || {});

// https://deno.land/std@0.177.0/node/internal_binding/performance.ts
var performance_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/process_methods.ts
var process_methods_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/report.ts
var report_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/serdes.ts
var serdes_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/signal_wrap.ts
var signal_wrap_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/spawn_sync.ts
var spawn_sync_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/symbols.ts
var symbols_exports = {};
__export(symbols_exports, {
  asyncIdSymbol: () => asyncIdSymbol,
  ownerSymbol: () => ownerSymbol
});
var asyncIdSymbol = Symbol("asyncIdSymbol");
var ownerSymbol = Symbol("ownerSymbol");

// https://deno.land/std@0.177.0/node/internal_binding/task_queue.ts
var task_queue_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/tcp_wrap.ts
var tcp_wrap_exports = {};
__export(tcp_wrap_exports, {
  TCP: () => TCP,
  TCPConnectWrap: () => TCPConnectWrap,
  constants: () => constants4
});
var TCPConnectWrap = class extends AsyncWrap {
  oncomplete;
  address;
  port;
  localAddress;
  localPort;
  constructor() {
    super(32 /* TCPCONNECTWRAP */);
  }
};
var constants4 = /* @__PURE__ */ ((constants5) => {
  constants5[constants5["SOCKET"] = 0 /* SOCKET */] = "SOCKET";
  constants5[constants5["SERVER"] = 1 /* SERVER */] = "SERVER";
  constants5[constants5["UV_TCP_IPV6ONLY"] = 2] = "UV_TCP_IPV6ONLY";
  return constants5;
})(constants4 || {});
var TCP = class _TCP extends ConnectionWrap {
  [ownerSymbol] = null;
  reading = false;
  #address;
  #port;
  #remoteAddress;
  #remoteFamily;
  #remotePort;
  #backlog;
  #listener;
  #connections = 0;
  #closed = false;
  #acceptBackoffDelay;
  /**
   * Creates a new TCP class instance.
   * @param type The socket type.
   * @param conn Optional connection object to wrap.
   */
  constructor(type, conn) {
    let provider;
    switch (type) {
      case 0 /* SOCKET */: {
        provider = 34 /* TCPWRAP */;
        break;
      }
      case 1 /* SERVER */: {
        provider = 33 /* TCPSERVERWRAP */;
        break;
      }
      default: {
        unreachable();
      }
    }
    super(provider, conn);
    if (conn && provider === 34 /* TCPWRAP */) {
      const localAddr = conn.localAddr;
      this.#address = localAddr.hostname;
      this.#port = localAddr.port;
      const remoteAddr = conn.remoteAddr;
      this.#remoteAddress = remoteAddr.hostname;
      this.#remotePort = remoteAddr.port;
      this.#remoteFamily = isIP(remoteAddr.hostname);
    }
  }
  /**
   * Opens a file descriptor.
   * @param fd The file descriptor to open.
   * @return An error status code.
   */
  open(_fd) {
    notImplemented("TCP.prototype.open");
  }
  /**
   * Bind to an IPv4 address.
   * @param address The hostname to bind to.
   * @param port The port to bind to
   * @return An error status code.
   */
  bind(address, port) {
    return this.#bind(address, port, 0);
  }
  /**
   * Bind to an IPv6 address.
   * @param address The hostname to bind to.
   * @param port The port to bind to
   * @return An error status code.
   */
  bind6(address, port, flags) {
    return this.#bind(address, port, flags);
  }
  /**
   * Connect to an IPv4 address.
   * @param req A TCPConnectWrap instance.
   * @param address The hostname to connect to.
   * @param port The port to connect to.
   * @return An error status code.
   */
  connect(req, address, port) {
    return this.#connect(req, address, port);
  }
  /**
   * Connect to an IPv6 address.
   * @param req A TCPConnectWrap instance.
   * @param address The hostname to connect to.
   * @param port The port to connect to.
   * @return An error status code.
   */
  connect6(req, address, port) {
    return this.#connect(req, address, port);
  }
  /**
   * Listen for new connections.
   * @param backlog The maximum length of the queue of pending connections.
   * @return An error status code.
   */
  listen(backlog) {
    this.#backlog = ceilPowOf2(backlog + 1);
    const listenOptions = {
      hostname: this.#address,
      port: this.#port,
      transport: "tcp"
    };
    let listener;
    try {
      listener = Deno.listen(listenOptions);
    } catch (e) {
      if (e instanceof Deno.errors.AddrInUse) {
        return codeMap.get("EADDRINUSE");
      } else if (e instanceof Deno.errors.AddrNotAvailable) {
        return codeMap.get("EADDRNOTAVAIL");
      } else if (e instanceof Deno.errors.PermissionDenied) {
        throw e;
      }
      return codeMap.get("UNKNOWN");
    }
    const address = listener.addr;
    this.#address = address.hostname;
    this.#port = address.port;
    this.#listener = listener;
    this.#accept();
    return 0;
  }
  ref() {
    if (this.#listener) {
      this.#listener.ref();
    }
    if (this[kStreamBaseField]) {
      this[kStreamBaseField].ref();
    }
  }
  unref() {
    if (this.#listener) {
      this.#listener.unref();
    }
    if (this[kStreamBaseField]) {
      this[kStreamBaseField].unref();
    }
  }
  /**
   * Populates the provided object with local address entries.
   * @param sockname An object to add the local address entries to.
   * @return An error status code.
   */
  getsockname(sockname) {
    if (typeof this.#address === "undefined" || typeof this.#port === "undefined") {
      return codeMap.get("EADDRNOTAVAIL");
    }
    sockname.address = this.#address;
    sockname.port = this.#port;
    sockname.family = isIP(this.#address);
    return 0;
  }
  /**
   * Populates the provided object with remote address entries.
   * @param peername An object to add the remote address entries to.
   * @return An error status code.
   */
  getpeername(peername) {
    if (typeof this.#remoteAddress === "undefined" || typeof this.#remotePort === "undefined") {
      return codeMap.get("EADDRNOTAVAIL");
    }
    peername.address = this.#remoteAddress;
    peername.port = this.#remotePort;
    peername.family = this.#remoteFamily;
    return 0;
  }
  /**
   * @param noDelay
   * @return An error status code.
   */
  setNoDelay(_noDelay) {
    return 0;
  }
  /**
   * @param enable
   * @param initialDelay
   * @return An error status code.
   */
  setKeepAlive(_enable, _initialDelay) {
    return 0;
  }
  /**
   * Windows only.
   *
   * Deprecated by Node.
   * REF: https://github.com/nodejs/node/blob/master/lib/net.js#L1731
   *
   * @param enable
   * @return An error status code.
   * @deprecated
   */
  setSimultaneousAccepts(_enable) {
    notImplemented("TCP.prototype.setSimultaneousAccepts");
  }
  /**
   * Bind to an IPv4 or IPv6 address.
   * @param address The hostname to bind to.
   * @param port The port to bind to
   * @param _flags
   * @return An error status code.
   */
  #bind(address, port, _flags) {
    this.#address = address;
    this.#port = port;
    return 0;
  }
  /**
   * Connect to an IPv4 or IPv6 address.
   * @param req A TCPConnectWrap instance.
   * @param address The hostname to connect to.
   * @param port The port to connect to.
   * @return An error status code.
   */
  #connect(req, address, port) {
    this.#remoteAddress = address;
    this.#remotePort = port;
    this.#remoteFamily = isIP(address);
    const connectOptions = {
      hostname: address,
      port,
      transport: "tcp"
    };
    Deno.connect(connectOptions).then(
      (conn) => {
        const localAddr = conn.localAddr;
        this.#address = req.localAddress = localAddr.hostname;
        this.#port = req.localPort = localAddr.port;
        this[kStreamBaseField] = conn;
        try {
          this.afterConnect(req, 0);
        } catch {
        }
      },
      () => {
        try {
          this.afterConnect(req, codeMap.get("ECONNREFUSED"));
        } catch {
        }
      }
    );
    return 0;
  }
  /** Handle backoff delays following an unsuccessful accept. */
  async #acceptBackoff() {
    if (!this.#acceptBackoffDelay) {
      this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
    } else {
      this.#acceptBackoffDelay *= 2;
    }
    if (this.#acceptBackoffDelay >= MAX_ACCEPT_BACKOFF_DELAY) {
      this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
    }
    await delay(this.#acceptBackoffDelay);
    this.#accept();
  }
  /** Accept new connections. */
  async #accept() {
    if (this.#closed) {
      return;
    }
    if (this.#connections > this.#backlog) {
      this.#acceptBackoff();
      return;
    }
    let connection;
    try {
      connection = await this.#listener.accept();
    } catch (e) {
      if (e instanceof Deno.errors.BadResource && this.#closed) {
        return;
      }
      try {
        this.onconnection(codeMap.get("UNKNOWN"), void 0);
      } catch {
      }
      this.#acceptBackoff();
      return;
    }
    this.#acceptBackoffDelay = void 0;
    const connectionHandle = new _TCP(0 /* SOCKET */, connection);
    this.#connections++;
    try {
      this.onconnection(0, connectionHandle);
    } catch {
    }
    return this.#accept();
  }
  /** Handle server closure. */
  _onClose() {
    this.#closed = true;
    this.reading = false;
    this.#address = void 0;
    this.#port = void 0;
    this.#remoteAddress = void 0;
    this.#remoteFamily = void 0;
    this.#remotePort = void 0;
    this.#backlog = void 0;
    this.#connections = 0;
    this.#acceptBackoffDelay = void 0;
    if (this.provider === 33 /* TCPSERVERWRAP */) {
      try {
        this.#listener.close();
      } catch {
      }
    }
    return LibuvStreamWrap.prototype._onClose.call(this);
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/timers.ts
var timers_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/tls_wrap.ts
var tls_wrap_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/trace_events.ts
var trace_events_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/tty_wrap.ts
var tty_wrap_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/udp_wrap.ts
var udp_wrap_exports = {};
__export(udp_wrap_exports, {
  SendWrap: () => SendWrap,
  UDP: () => UDP
});
var DenoListenDatagram = Deno[Deno.internal]?.nodeUnstable?.listenDatagram || Deno.listenDatagram;
var AF_INET = 2;
var AF_INET6 = 10;
var UDP_DGRAM_MAXSIZE = 64 * 1024;
var SendWrap = class extends AsyncWrap {
  list;
  address;
  port;
  callback;
  oncomplete;
  constructor() {
    super(36 /* UDPSENDWRAP */);
  }
};
var UDP = class extends HandleWrap {
  [ownerSymbol] = null;
  #address;
  #family;
  #port;
  #remoteAddress;
  #remoteFamily;
  #remotePort;
  #listener;
  #receiving = false;
  #recvBufferSize = UDP_DGRAM_MAXSIZE;
  #sendBufferSize = UDP_DGRAM_MAXSIZE;
  onmessage;
  lookup;
  constructor() {
    super(37 /* UDPWRAP */);
  }
  addMembership(_multicastAddress, _interfaceAddress) {
    notImplemented("udp.UDP.prototype.addMembership");
  }
  addSourceSpecificMembership(_sourceAddress, _groupAddress, _interfaceAddress) {
    notImplemented("udp.UDP.prototype.addSourceSpecificMembership");
  }
  /**
   * Bind to an IPv4 address.
   * @param ip The hostname to bind to.
   * @param port The port to bind to
   * @return An error status code.
   */
  bind(ip, port, flags) {
    return this.#doBind(ip, port, flags, AF_INET);
  }
  /**
   * Bind to an IPv6 address.
   * @param ip The hostname to bind to.
   * @param port The port to bind to
   * @return An error status code.
   */
  bind6(ip, port, flags) {
    return this.#doBind(ip, port, flags, AF_INET6);
  }
  bufferSize(size, buffer, ctx) {
    let err;
    if (size > UDP_DGRAM_MAXSIZE) {
      err = "EINVAL";
    } else if (!this.#address) {
      err = isWindows ? "ENOTSOCK" : "EBADF";
    }
    if (err) {
      ctx.errno = codeMap.get(err);
      ctx.code = err;
      ctx.message = errorMap.get(ctx.errno)[1];
      ctx.syscall = buffer ? "uv_recv_buffer_size" : "uv_send_buffer_size";
      return;
    }
    if (size !== 0) {
      size = isLinux ? size * 2 : size;
      if (buffer) {
        return this.#recvBufferSize = size;
      }
      return this.#sendBufferSize = size;
    }
    return buffer ? this.#recvBufferSize : this.#sendBufferSize;
  }
  connect(ip, port) {
    return this.#doConnect(ip, port, AF_INET);
  }
  connect6(ip, port) {
    return this.#doConnect(ip, port, AF_INET6);
  }
  disconnect() {
    this.#remoteAddress = void 0;
    this.#remotePort = void 0;
    this.#remoteFamily = void 0;
    return 0;
  }
  dropMembership(_multicastAddress, _interfaceAddress) {
    notImplemented("udp.UDP.prototype.dropMembership");
  }
  dropSourceSpecificMembership(_sourceAddress, _groupAddress, _interfaceAddress) {
    notImplemented("udp.UDP.prototype.dropSourceSpecificMembership");
  }
  /**
   * Populates the provided object with remote address entries.
   * @param peername An object to add the remote address entries to.
   * @return An error status code.
   */
  getpeername(peername) {
    if (this.#remoteAddress === void 0) {
      return codeMap.get("EBADF");
    }
    peername.address = this.#remoteAddress;
    peername.port = this.#remotePort;
    peername.family = this.#remoteFamily;
    return 0;
  }
  /**
   * Populates the provided object with local address entries.
   * @param sockname An object to add the local address entries to.
   * @return An error status code.
   */
  getsockname(sockname) {
    if (this.#address === void 0) {
      return codeMap.get("EBADF");
    }
    sockname.address = this.#address;
    sockname.port = this.#port;
    sockname.family = this.#family;
    return 0;
  }
  /**
   * Opens a file descriptor.
   * @param fd The file descriptor to open.
   * @return An error status code.
   */
  open(_fd) {
    notImplemented("udp.UDP.prototype.open");
  }
  /**
   * Start receiving on the connection.
   * @return An error status code.
   */
  recvStart() {
    if (!this.#receiving) {
      this.#receiving = true;
      this.#receive();
    }
    return 0;
  }
  /**
   * Stop receiving on the connection.
   * @return An error status code.
   */
  recvStop() {
    this.#receiving = false;
    return 0;
  }
  ref() {
    notImplemented("udp.UDP.prototype.ref");
  }
  send(req, bufs, count, ...args) {
    return this.#doSend(req, bufs, count, args, AF_INET);
  }
  send6(req, bufs, count, ...args) {
    return this.#doSend(req, bufs, count, args, AF_INET6);
  }
  setBroadcast(_bool) {
    notImplemented("udp.UDP.prototype.setBroadcast");
  }
  setMulticastInterface(_interfaceAddress) {
    notImplemented("udp.UDP.prototype.setMulticastInterface");
  }
  setMulticastLoopback(_bool) {
    notImplemented("udp.UDP.prototype.setMulticastLoopback");
  }
  setMulticastTTL(_ttl) {
    notImplemented("udp.UDP.prototype.setMulticastTTL");
  }
  setTTL(_ttl) {
    notImplemented("udp.UDP.prototype.setTTL");
  }
  unref() {
    notImplemented("udp.UDP.prototype.unref");
  }
  #doBind(ip, port, _flags, family) {
    const listenOptions = {
      port,
      hostname: ip,
      transport: "udp"
    };
    let listener;
    try {
      listener = DenoListenDatagram(listenOptions);
    } catch (e) {
      if (e instanceof Deno.errors.AddrInUse) {
        return codeMap.get("EADDRINUSE");
      } else if (e instanceof Deno.errors.AddrNotAvailable) {
        return codeMap.get("EADDRNOTAVAIL");
      } else if (e instanceof Deno.errors.PermissionDenied) {
        throw e;
      }
      return codeMap.get("UNKNOWN");
    }
    const address = listener.addr;
    this.#address = address.hostname;
    this.#port = address.port;
    this.#family = family === AF_INET6 ? "IPv6" : "IPv4";
    this.#listener = listener;
    return 0;
  }
  #doConnect(ip, port, family) {
    this.#remoteAddress = ip;
    this.#remotePort = port;
    this.#remoteFamily = family === AF_INET6 ? "IPv6" : "IPv4";
    return 0;
  }
  #doSend(req, bufs, _count, args, _family) {
    let hasCallback;
    if (args.length === 3) {
      this.#remotePort = args[0];
      this.#remoteAddress = args[1];
      hasCallback = args[2];
    } else {
      hasCallback = args[0];
    }
    const addr = {
      hostname: this.#remoteAddress,
      port: this.#remotePort,
      transport: "udp"
    };
    const payload = new Uint8Array(
      Buffer2.concat(
        bufs.map((buf) => {
          if (typeof buf === "string") {
            return Buffer2.from(buf);
          }
          return Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength);
        })
      )
    );
    (async () => {
      let sent;
      let err = null;
      try {
        sent = await this.#listener.send(payload, addr);
      } catch (e) {
        if (e instanceof Deno.errors.BadResource) {
          err = codeMap.get("EBADF");
        } else if (e instanceof Error && e.message.match(/os error (40|90|10040)/)) {
          err = codeMap.get("EMSGSIZE");
        } else {
          err = codeMap.get("UNKNOWN");
        }
        sent = 0;
      }
      if (hasCallback) {
        try {
          req.oncomplete(err, sent);
        } catch {
        }
      }
    })();
    return 0;
  }
  async #receive() {
    if (!this.#receiving) {
      return;
    }
    const p = new Uint8Array(this.#recvBufferSize);
    let buf;
    let remoteAddr;
    let nread;
    try {
      [buf, remoteAddr] = await this.#listener.receive(p);
      nread = buf.length;
    } catch (e) {
      if (e instanceof Deno.errors.Interrupted || e instanceof Deno.errors.BadResource) {
        nread = 0;
      } else {
        nread = codeMap.get("UNKNOWN");
      }
      buf = new Uint8Array(0);
      remoteAddr = null;
    }
    nread ??= 0;
    const rinfo = remoteAddr ? {
      address: remoteAddr.hostname,
      port: remoteAddr.port,
      family: isIP(remoteAddr.hostname) === 6 ? "IPv6" : "IPv4"
    } : void 0;
    try {
      this.onmessage(nread, this, Buffer2.from(buf), rinfo);
    } catch {
    }
    this.#receive();
  }
  /** Handle socket closure. */
  _onClose() {
    this.#receiving = false;
    this.#address = void 0;
    this.#port = void 0;
    this.#family = void 0;
    try {
      this.#listener.close();
    } catch {
    }
    this.#listener = void 0;
    return 0;
  }
};

// https://deno.land/std@0.177.0/node/internal_binding/url.ts
var url_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/v8.ts
var v8_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/worker.ts
var worker_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/zlib.ts
var zlib_exports = {};

// https://deno.land/std@0.177.0/node/internal_binding/mod.ts
var modules = {
  "async_wrap": async_wrap_exports,
  buffer: buffer_exports,
  "cares_wrap": cares_wrap_exports,
  config: config_exports,
  constants: constants_exports,
  contextify: contextify_exports,
  credentials: credentials_exports,
  crypto: crypto_exports,
  errors: errors_exports,
  fs: fs_exports,
  "fs_dir": fs_dir_exports,
  "fs_event_wrap": fs_event_wrap_exports,
  "heap_utils": heap_utils_exports,
  "http_parser": http_parser_exports,
  icu: icu_exports,
  inspector: inspector_exports,
  "js_stream": js_stream_exports,
  messaging: messaging_exports,
  "module_wrap": module_wrap_exports,
  "native_module": native_module_exports,
  natives: natives_exports,
  options: options_exports,
  os: os_exports,
  performance: performance_exports,
  "pipe_wrap": pipe_wrap_exports,
  "process_methods": process_methods_exports,
  report: report_exports,
  serdes: serdes_exports,
  "signal_wrap": signal_wrap_exports,
  "spawn_sync": spawn_sync_exports,
  "stream_wrap": stream_wrap_exports,
  "string_decoder": string_decoder_exports,
  symbols: symbols_exports,
  "task_queue": task_queue_exports,
  "tcp_wrap": tcp_wrap_exports,
  timers: timers_exports,
  "tls_wrap": tls_wrap_exports,
  "trace_events": trace_events_exports,
  "tty_wrap": tty_wrap_exports,
  types: types_exports,
  "udp_wrap": udp_wrap_exports,
  url: url_exports,
  util: util_exports,
  uv: uv_exports,
  v8: v8_exports,
  worker: worker_exports,
  zlib: zlib_exports
};
function getBinding(name) {
  const mod = modules[name];
  if (!mod) {
    throw new Error(`No such module: ${name}`);
  }
  return mod;
}

// https://deno.land/std@0.177.0/node/internal/process/per_thread.mjs
var kInternal = Symbol("internal properties");
var replaceUnderscoresRegex = /_/g;
var leadingDashesRegex = /^--?/;
var trailingValuesRegex = /=.*$/;
function buildAllowedFlags() {
  const allowedNodeEnvironmentFlags = [
    "--track-heap-objects",
    "--no-track-heap-objects",
    "--node-snapshot",
    "--no-node-snapshot",
    "--require",
    "--max-old-space-size",
    "--trace-exit",
    "--no-trace-exit",
    "--disallow-code-generation-from-strings",
    "--experimental-json-modules",
    "--no-experimental-json-modules",
    "--interpreted-frames-native-stack",
    "--inspect-brk",
    "--no-inspect-brk",
    "--trace-tls",
    "--no-trace-tls",
    "--stack-trace-limit",
    "--experimental-repl-await",
    "--no-experimental-repl-await",
    "--preserve-symlinks",
    "--no-preserve-symlinks",
    "--report-uncaught-exception",
    "--no-report-uncaught-exception",
    "--experimental-modules",
    "--no-experimental-modules",
    "--report-signal",
    "--jitless",
    "--inspect-port",
    "--heapsnapshot-near-heap-limit",
    "--tls-keylog",
    "--force-context-aware",
    "--no-force-context-aware",
    "--napi-modules",
    "--abort-on-uncaught-exception",
    "--diagnostic-dir",
    "--verify-base-objects",
    "--no-verify-base-objects",
    "--unhandled-rejections",
    "--perf-basic-prof",
    "--trace-atomics-wait",
    "--no-trace-atomics-wait",
    "--deprecation",
    "--no-deprecation",
    "--perf-basic-prof-only-functions",
    "--perf-prof",
    "--max-http-header-size",
    "--report-on-signal",
    "--no-report-on-signal",
    "--throw-deprecation",
    "--no-throw-deprecation",
    "--warnings",
    "--no-warnings",
    "--force-fips",
    "--no-force-fips",
    "--pending-deprecation",
    "--no-pending-deprecation",
    "--input-type",
    "--tls-max-v1.3",
    "--no-tls-max-v1.3",
    "--tls-min-v1.2",
    "--no-tls-min-v1.2",
    "--inspect",
    "--no-inspect",
    "--heapsnapshot-signal",
    "--trace-warnings",
    "--no-trace-warnings",
    "--trace-event-categories",
    "--experimental-worker",
    "--tls-max-v1.2",
    "--no-tls-max-v1.2",
    "--perf-prof-unwinding-info",
    "--preserve-symlinks-main",
    "--no-preserve-symlinks-main",
    "--policy-integrity",
    "--experimental-wasm-modules",
    "--no-experimental-wasm-modules",
    "--node-memory-debug",
    "--inspect-publish-uid",
    "--tls-min-v1.3",
    "--no-tls-min-v1.3",
    "--experimental-specifier-resolution",
    "--secure-heap",
    "--tls-min-v1.0",
    "--no-tls-min-v1.0",
    "--redirect-warnings",
    "--experimental-report",
    "--trace-event-file-pattern",
    "--trace-uncaught",
    "--no-trace-uncaught",
    "--experimental-loader",
    "--http-parser",
    "--dns-result-order",
    "--trace-sigint",
    "--no-trace-sigint",
    "--secure-heap-min",
    "--enable-fips",
    "--no-enable-fips",
    "--enable-source-maps",
    "--no-enable-source-maps",
    "--insecure-http-parser",
    "--no-insecure-http-parser",
    "--use-openssl-ca",
    "--no-use-openssl-ca",
    "--tls-cipher-list",
    "--experimental-top-level-await",
    "--no-experimental-top-level-await",
    "--openssl-config",
    "--icu-data-dir",
    "--v8-pool-size",
    "--report-on-fatalerror",
    "--no-report-on-fatalerror",
    "--title",
    "--tls-min-v1.1",
    "--no-tls-min-v1.1",
    "--report-filename",
    "--trace-deprecation",
    "--no-trace-deprecation",
    "--report-compact",
    "--no-report-compact",
    "--experimental-policy",
    "--experimental-import-meta-resolve",
    "--no-experimental-import-meta-resolve",
    "--zero-fill-buffers",
    "--no-zero-fill-buffers",
    "--report-dir",
    "--use-bundled-ca",
    "--no-use-bundled-ca",
    "--experimental-vm-modules",
    "--no-experimental-vm-modules",
    "--force-async-hooks-checks",
    "--no-force-async-hooks-checks",
    "--frozen-intrinsics",
    "--no-frozen-intrinsics",
    "--huge-max-old-generation-size",
    "--disable-proto",
    "--debug-arraybuffer-allocations",
    "--no-debug-arraybuffer-allocations",
    "--conditions",
    "--experimental-wasi-unstable-preview1",
    "--no-experimental-wasi-unstable-preview1",
    "--trace-sync-io",
    "--no-trace-sync-io",
    "--use-largepages",
    "--experimental-abortcontroller",
    "--debug-port",
    "--es-module-specifier-resolution",
    "--prof-process",
    "-C",
    "--loader",
    "--report-directory",
    "-r",
    "--trace-events-enabled"
  ];
  const trimLeadingDashes = (flag) => flag.replace(leadingDashesRegex, "");
  const nodeFlags = allowedNodeEnvironmentFlags.map(trimLeadingDashes);
  class NodeEnvironmentFlagsSet extends Set {
    constructor(array) {
      super();
      this[kInternal] = { array };
    }
    add() {
      return this;
    }
    delete() {
      return false;
    }
    clear() {
    }
    has(key) {
      if (typeof key === "string") {
        key = key.replace(replaceUnderscoresRegex, "-");
        if (leadingDashesRegex.test(key)) {
          key = key.replace(trailingValuesRegex, "");
          return this[kInternal].array.includes(key);
        }
        return nodeFlags.includes(key);
      }
      return false;
    }
    entries() {
      this[kInternal].set ??= new Set(this[kInternal].array);
      return this[kInternal].set.entries();
    }
    forEach(callback, thisArg = void 0) {
      this[kInternal].array.forEach(
        (v2) => Reflect.apply(callback, thisArg, [v2, v2, this])
      );
    }
    get size() {
      return this[kInternal].array.length;
    }
    values() {
      this[kInternal].set ??= new Set(this[kInternal].array);
      return this[kInternal].set.values();
    }
  }
  NodeEnvironmentFlagsSet.prototype.keys = NodeEnvironmentFlagsSet.prototype[Symbol.iterator] = NodeEnvironmentFlagsSet.prototype.values;
  Object.freeze(NodeEnvironmentFlagsSet.prototype.constructor);
  Object.freeze(NodeEnvironmentFlagsSet.prototype);
  return Object.freeze(
    new NodeEnvironmentFlagsSet(
      allowedNodeEnvironmentFlags
    )
  );
}

// https://deno.land/std@0.177.0/node/process.ts
var stderr2 = stderr;
var stdin2 = stdin;
var stdout2 = stdout;
var DenoCommand = Deno[Deno.internal]?.nodeUnstable?.Command || Deno.Command;
var notImplementedEvents = [
  "disconnect",
  "message",
  "multipleResolves",
  "rejectionHandled",
  "worker"
];
var argv = ["", "", ...Deno.args];
Object.defineProperty(argv, "0", { get: Deno.execPath });
Object.defineProperty(argv, "1", {
  get: () => {
    if (Deno.mainModule.startsWith("file:")) {
      return fromFileUrl3(Deno.mainModule);
    } else {
      return join5(Deno.cwd(), "$deno$node.js");
    }
  }
});
var exit = (code) => {
  if (code || code === 0) {
    if (typeof code === "string") {
      const parsedCode = parseInt(code);
      process3.exitCode = isNaN(parsedCode) ? void 0 : parsedCode;
    } else {
      process3.exitCode = code;
    }
  }
  if (!process3._exiting) {
    process3._exiting = true;
    process3.emit("exit", process3.exitCode || 0);
  }
  Deno.exit(process3.exitCode || 0);
};
function addReadOnlyProcessAlias(name, option, enumerable = true) {
  const value = getOptionValue(option);
  if (value) {
    Object.defineProperty(process3, name, {
      writable: false,
      configurable: true,
      enumerable,
      value
    });
  }
}
function createWarningObject(warning, type, code, ctor, detail) {
  assert(typeof warning === "string");
  const warningErr = new Error(warning);
  warningErr.name = String(type || "Warning");
  if (code !== void 0) {
    warningErr.code = code;
  }
  if (detail !== void 0) {
    warningErr.detail = detail;
  }
  Error.captureStackTrace(warningErr, ctor || process3.emitWarning);
  return warningErr;
}
function doEmitWarning(warning) {
  process3.emit("warning", warning);
}
function emitWarning(warning, type, code, ctor) {
  let detail;
  if (type !== null && typeof type === "object" && !Array.isArray(type)) {
    ctor = type.ctor;
    code = type.code;
    if (typeof type.detail === "string") {
      detail = type.detail;
    }
    type = type.type || "Warning";
  } else if (typeof type === "function") {
    ctor = type;
    code = void 0;
    type = "Warning";
  }
  if (type !== void 0) {
    validateString(type, "type");
  }
  if (typeof code === "function") {
    ctor = code;
    code = void 0;
  } else if (code !== void 0) {
    validateString(code, "code");
  }
  if (typeof warning === "string") {
    warning = createWarningObject(warning, type, code, ctor, detail);
  } else if (!(warning instanceof Error)) {
    throw new ERR_INVALID_ARG_TYPE("warning", ["Error", "string"], warning);
  }
  if (warning.name === "DeprecationWarning") {
    if (process3.noDeprecation) {
      return;
    }
    if (process3.throwDeprecation) {
      return process3.nextTick(() => {
        throw warning;
      });
    }
  }
  process3.nextTick(doEmitWarning, warning);
}
function hrtime(time) {
  const milli = performance.now();
  const sec = Math.floor(milli / 1e3);
  const nano = Math.floor(milli * 1e6 - sec * 1e9);
  if (!time) {
    return [sec, nano];
  }
  const [prevSec, prevNano] = time;
  return [sec - prevSec, nano - prevNano];
}
hrtime.bigint = function() {
  const [sec, nano] = hrtime();
  return BigInt(sec) * 1000000000n + BigInt(nano);
};
function memoryUsage() {
  return {
    ...Deno.memoryUsage(),
    arrayBuffers: 0
  };
}
memoryUsage.rss = function() {
  return memoryUsage().rss;
};
function _kill(pid2, sig) {
  let errCode;
  if (sig === 0) {
    let status;
    if (Deno.build.os === "windows") {
      status = new DenoCommand("powershell.exe", {
        args: ["Get-Process", "-pid", pid2]
      }).outputSync();
    } else {
      status = new DenoCommand("kill", {
        args: ["-0", pid2]
      }).outputSync();
    }
    if (!status.success) {
      errCode = codeMap.get("ESRCH");
    }
  } else {
    const maybeSignal = Object.entries(os.signals).find(([_, numericCode]) => numericCode === sig);
    if (!maybeSignal) {
      errCode = codeMap.get("EINVAL");
    } else {
      try {
        Deno.kill(pid2, maybeSignal[0]);
      } catch (e) {
        if (e instanceof TypeError) {
          throw notImplemented(maybeSignal[0]);
        }
        throw e;
      }
    }
  }
  if (!errCode) {
    return 0;
  } else {
    return errCode;
  }
}
function kill(pid2, sig = "SIGTERM") {
  if (pid2 != (pid2 | 0)) {
    throw new ERR_INVALID_ARG_TYPE("pid", "number", pid2);
  }
  let err;
  if (typeof sig === "number") {
    err = process3._kill(pid2, sig);
  } else {
    if (sig in os.signals) {
      err = process3._kill(pid2, os.signals[sig]);
    } else {
      throw new ERR_UNKNOWN_SIGNAL(sig);
    }
  }
  if (err) {
    throw errnoException(err, "kill");
  }
  return true;
}
function uncaughtExceptionHandler(err, origin) {
  process3.emit("uncaughtExceptionMonitor", err, origin);
  process3.emit("uncaughtException", err, origin);
}
var execPath = null;
var Process = class extends EventEmitter {
  constructor() {
    super();
    globalThis.addEventListener("unhandledrejection", (event) => {
      if (process3.listenerCount("unhandledRejection") === 0) {
        if (process3.listenerCount("uncaughtException") === 0) {
          throw event.reason;
        }
        event.preventDefault();
        uncaughtExceptionHandler(event.reason, "unhandledRejection");
        return;
      }
      event.preventDefault();
      process3.emit("unhandledRejection", event.reason, event.promise);
    });
    globalThis.addEventListener("error", (event) => {
      if (process3.listenerCount("uncaughtException") > 0) {
        event.preventDefault();
      }
      uncaughtExceptionHandler(event.error, "uncaughtException");
    });
    globalThis.addEventListener("beforeunload", (e) => {
      super.emit("beforeExit", process3.exitCode || 0);
      processTicksAndRejections();
      if (core.eventLoopHasMoreWork()) {
        e.preventDefault();
      }
    });
    globalThis.addEventListener("unload", () => {
      if (!process3._exiting) {
        process3._exiting = true;
        super.emit("exit", process3.exitCode || 0);
      }
    });
  }
  /** https://nodejs.org/api/process.html#process_process_arch */
  arch = arch;
  /**
   * https://nodejs.org/api/process.html#process_process_argv
   * Read permissions are required in order to get the executable route
   */
  argv = argv;
  /** https://nodejs.org/api/process.html#process_process_chdir_directory */
  chdir = chdir;
  /** https://nodejs.org/api/process.html#processconfig */
  config = {
    target_defaults: {},
    variables: {}
  };
  /** https://nodejs.org/api/process.html#process_process_cwd */
  cwd = cwd;
  /**
   * https://nodejs.org/api/process.html#process_process_env
   * Requires env permissions
   */
  env = env;
  /** https://nodejs.org/api/process.html#process_process_execargv */
  execArgv = [];
  /** https://nodejs.org/api/process.html#process_process_exit_code */
  exit = exit;
  _exiting = _exiting;
  /** https://nodejs.org/api/process.html#processexitcode_1 */
  exitCode = void 0;
  // Typed as any to avoid importing "module" module for types
  // deno-lint-ignore no-explicit-any
  mainModule = void 0;
  /** https://nodejs.org/api/process.html#process_process_nexttick_callback_args */
  nextTick = nextTick3;
  // deno-lint-ignore no-explicit-any
  on(event, listener) {
    if (notImplementedEvents.includes(event)) {
      warnNotImplemented(`process.on("${event}")`);
      super.on(event, listener);
    } else if (event.startsWith("SIG")) {
      if (event === "SIGBREAK" && Deno.build.os !== "windows") {
      } else if (event === "SIGTERM" && Deno.build.os === "windows") {
      } else {
        Deno.addSignalListener(event, listener);
      }
    } else {
      super.on(event, listener);
    }
    return this;
  }
  // deno-lint-ignore no-explicit-any
  off(event, listener) {
    if (notImplementedEvents.includes(event)) {
      warnNotImplemented(`process.off("${event}")`);
      super.off(event, listener);
    } else if (event.startsWith("SIG")) {
      if (event === "SIGBREAK" && Deno.build.os !== "windows") {
      } else if (event === "SIGTERM" && Deno.build.os === "windows") {
      } else {
        Deno.removeSignalListener(event, listener);
      }
    } else {
      super.off(event, listener);
    }
    return this;
  }
  // deno-lint-ignore no-explicit-any
  emit(event, ...args) {
    if (event.startsWith("SIG")) {
      if (event === "SIGBREAK" && Deno.build.os !== "windows") {
      } else {
        Deno.kill(Deno.pid, event);
      }
    } else {
      return super.emit(event, ...args);
    }
    return true;
  }
  prependListener(event, listener) {
    if (notImplementedEvents.includes(event)) {
      warnNotImplemented(`process.prependListener("${event}")`);
      super.prependListener(event, listener);
    } else if (event.startsWith("SIG")) {
      if (event === "SIGBREAK" && Deno.build.os !== "windows") {
      } else {
        Deno.addSignalListener(event, listener);
      }
    } else {
      super.prependListener(event, listener);
    }
    return this;
  }
  /** https://nodejs.org/api/process.html#process_process_pid */
  pid = pid;
  /** https://nodejs.org/api/process.html#process_process_platform */
  platform = platform;
  addListener(event, listener) {
    if (notImplementedEvents.includes(event)) {
      warnNotImplemented(`process.addListener("${event}")`);
    }
    return this.on(event, listener);
  }
  removeListener(event, listener) {
    if (notImplementedEvents.includes(event)) {
      warnNotImplemented(`process.removeListener("${event}")`);
    }
    return this.off(event, listener);
  }
  /**
   * Returns the current high-resolution real time in a [seconds, nanoseconds]
   * tuple.
   *
   * Note: You need to give --allow-hrtime permission to Deno to actually get
   * nanoseconds precision values. If you don't give 'hrtime' permission, the returned
   * values only have milliseconds precision.
   *
   * `time` is an optional parameter that must be the result of a previous process.hrtime() call to diff with the current time.
   *
   * These times are relative to an arbitrary time in the past, and not related to the time of day and therefore not subject to clock drift. The primary use is for measuring performance between intervals.
   * https://nodejs.org/api/process.html#process_process_hrtime_time
   */
  hrtime = hrtime;
  /**
   * @private
   *
   * NodeJS internal, use process.kill instead
   */
  _kill = _kill;
  /** https://nodejs.org/api/process.html#processkillpid-signal */
  kill = kill;
  memoryUsage = memoryUsage;
  /** https://nodejs.org/api/process.html#process_process_stderr */
  stderr = stderr2;
  /** https://nodejs.org/api/process.html#process_process_stdin */
  stdin = stdin2;
  /** https://nodejs.org/api/process.html#process_process_stdout */
  stdout = stdout2;
  /** https://nodejs.org/api/process.html#process_process_version */
  version = version;
  /** https://nodejs.org/api/process.html#process_process_versions */
  versions = versions;
  /** https://nodejs.org/api/process.html#process_process_emitwarning_warning_options */
  emitWarning = emitWarning;
  binding(name) {
    return getBinding(name);
  }
  /** https://nodejs.org/api/process.html#processumaskmask */
  umask() {
    return 18;
  }
  /** This method is removed on Windows */
  getgid() {
    return Deno.gid();
  }
  /** This method is removed on Windows */
  getuid() {
    return Deno.uid();
  }
  // TODO(kt3k): Implement this when we added -e option to node compat mode
  _eval = void 0;
  /** https://nodejs.org/api/process.html#processexecpath */
  get execPath() {
    if (execPath) {
      return execPath;
    }
    execPath = Deno.execPath();
    return execPath;
  }
  set execPath(path5) {
    execPath = path5;
  }
  #startTime = Date.now();
  /** https://nodejs.org/api/process.html#processuptime */
  uptime() {
    return (Date.now() - this.#startTime) / 1e3;
  }
  #allowedFlags = buildAllowedFlags();
  /** https://nodejs.org/api/process.html#processallowednodeenvironmentflags */
  get allowedNodeEnvironmentFlags() {
    return this.#allowedFlags;
  }
  features = { inspector: false };
  // TODO(kt3k): Get the value from --no-deprecation flag.
  noDeprecation = false;
};
if (Deno.build.os === "windows") {
  delete Process.prototype.getgid;
  delete Process.prototype.getuid;
}
var process3 = new Process();
Object.defineProperty(process3, Symbol.toStringTag, {
  enumerable: false,
  writable: true,
  configurable: false,
  value: "process"
});
addReadOnlyProcessAlias("noDeprecation", "--no-deprecation");
addReadOnlyProcessAlias("throwDeprecation", "--throw-deprecation");
var removeListener2 = process3.removeListener;
var removeAllListeners2 = process3.removeAllListeners;
var process_default = process3;

// https://deno.land/std@0.177.0/node/util.ts
var codesWarned = /* @__PURE__ */ new Set();
function deprecate(fn, msg, code) {
  if (process_default.noDeprecation === true) {
    return fn;
  }
  if (code !== void 0) {
    validateString(code, "code");
  }
  let warned = false;
  function deprecated(...args) {
    if (!warned) {
      warned = true;
      if (code !== void 0) {
        if (!codesWarned.has(code)) {
          process_default.emitWarning(msg, "DeprecationWarning", code, deprecated);
          codesWarned.add(code);
        }
      } else {
        process_default.emitWarning(msg, "DeprecationWarning", deprecated);
      }
    }
    if (new.target) {
      return Reflect.construct(fn, args, new.target);
    }
    return Reflect.apply(fn, this, args);
  }
  Object.setPrototypeOf(deprecated, fn);
  if (fn.prototype) {
    deprecated.prototype = fn.prototype;
  }
  return deprecated;
}

// https://deno.land/std@0.177.0/node/path/mod.ts
var mod_exports = {};
__export(mod_exports, {
  SEP: () => SEP2,
  SEP_PATTERN: () => SEP_PATTERN2,
  basename: () => basename6,
  common: () => common,
  delimiter: () => delimiter6,
  dirname: () => dirname6,
  extname: () => extname6,
  format: () => format7,
  fromFileUrl: () => fromFileUrl6,
  globToRegExp: () => globToRegExp,
  isAbsolute: () => isAbsolute6,
  isGlob: () => isGlob,
  join: () => join9,
  joinGlobs: () => joinGlobs,
  normalize: () => normalize8,
  normalizeGlob: () => normalizeGlob,
  parse: () => parse7,
  posix: () => posix,
  relative: () => relative6,
  resolve: () => resolve6,
  sep: () => sep6,
  toFileUrl: () => toFileUrl6,
  toNamespacedPath: () => toNamespacedPath6,
  win32: () => win32
});

// https://deno.land/std@0.177.0/node/path/win32.ts
var win32_exports2 = {};
__export(win32_exports2, {
  basename: () => basename4,
  default: () => win32_default,
  delimiter: () => delimiter4,
  dirname: () => dirname4,
  extname: () => extname4,
  format: () => format5,
  fromFileUrl: () => fromFileUrl4,
  isAbsolute: () => isAbsolute4,
  join: () => join6,
  normalize: () => normalize5,
  parse: () => parse5,
  relative: () => relative4,
  resolve: () => resolve4,
  sep: () => sep4,
  toFileUrl: () => toFileUrl4,
  toNamespacedPath: () => toNamespacedPath4
});

// https://deno.land/std@0.177.0/node/path/_constants.ts
var CHAR_UPPERCASE_A2 = 65;
var CHAR_LOWERCASE_A2 = 97;
var CHAR_UPPERCASE_Z2 = 90;
var CHAR_LOWERCASE_Z2 = 122;
var CHAR_DOT2 = 46;
var CHAR_FORWARD_SLASH2 = 47;
var CHAR_BACKWARD_SLASH2 = 92;
var CHAR_COLON2 = 58;
var CHAR_QUESTION_MARK2 = 63;

// https://deno.land/std@0.177.0/node/path/_util.ts
function assertPath2(path5) {
  if (typeof path5 !== "string") {
    throw new ERR_INVALID_ARG_TYPE("path", ["string"], path5);
  }
}
function isPosixPathSeparator2(code) {
  return code === CHAR_FORWARD_SLASH2;
}
function isPathSeparator2(code) {
  return isPosixPathSeparator2(code) || code === CHAR_BACKWARD_SLASH2;
}
function isWindowsDeviceRoot2(code) {
  return code >= CHAR_LOWERCASE_A2 && code <= CHAR_LOWERCASE_Z2 || code >= CHAR_UPPERCASE_A2 && code <= CHAR_UPPERCASE_Z2;
}
function normalizeString2(path5, allowAboveRoot, separator, isPathSeparator3) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i = 0, len = path5.length; i <= len; ++i) {
    if (i < len)
      code = path5.charCodeAt(i);
    else if (isPathSeparator3(code))
      break;
    else
      code = CHAR_FORWARD_SLASH2;
    if (isPathSeparator3(code)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT2 || res.charCodeAt(res.length - 2) !== CHAR_DOT2) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += `${separator}..`;
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += separator + path5.slice(lastSlash + 1, i);
        else
          res = path5.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT2 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format2(sep7, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base2 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir)
    return base2;
  if (dir === pathObject.root)
    return dir + base2;
  return dir + sep7 + base2;
}
var WHITESPACE_ENCODINGS2 = {
  "	": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  " ": "%20"
};
function encodeWhitespace2(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS2[c] ?? c;
  });
}

// https://deno.land/std@0.177.0/node/path/win32.ts
var sep4 = "\\";
var delimiter4 = ";";
function resolve4(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path5;
    const { Deno: Deno3 } = globalThis;
    if (i >= 0) {
      path5 = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path5 = Deno3.cwd();
    } else {
      if (typeof Deno3?.env?.get !== "function" || typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno3.cwd();
      if (path5 === void 0 || path5.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path5 = `${resolvedDevice}\\`;
      }
    }
    assertPath2(path5);
    const len = path5.length;
    if (len === 0)
      continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute7 = false;
    const code = path5.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator2(code)) {
        isAbsolute7 = true;
        if (isPathSeparator2(path5.charCodeAt(1))) {
          let j2 = 2;
          let last = j2;
          for (; j2 < len; ++j2) {
            if (isPathSeparator2(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            const firstPart = path5.slice(last, j2);
            last = j2;
            for (; j2 < len; ++j2) {
              if (!isPathSeparator2(path5.charCodeAt(j2)))
                break;
            }
            if (j2 < len && j2 !== last) {
              last = j2;
              for (; j2 < len; ++j2) {
                if (isPathSeparator2(path5.charCodeAt(j2)))
                  break;
              }
              if (j2 === len) {
                device = `\\\\${firstPart}\\${path5.slice(last)}`;
                rootEnd = j2;
              } else if (j2 !== last) {
                device = `\\\\${firstPart}\\${path5.slice(last, j2)}`;
                rootEnd = j2;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot2(code)) {
        if (path5.charCodeAt(1) === CHAR_COLON2) {
          device = path5.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator2(path5.charCodeAt(2))) {
              isAbsolute7 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator2(code)) {
      rootEnd = 1;
      isAbsolute7 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path5.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute7;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0)
      break;
  }
  resolvedTail = normalizeString2(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator2
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize5(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0)
    return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute7 = false;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      isAbsolute7 = true;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator2(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          const firstPart = path5.slice(last, j2);
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator2(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator2(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              return `\\\\${firstPart}\\${path5.slice(last)}\\`;
            } else if (j2 !== last) {
              device = `\\\\${firstPart}\\${path5.slice(last, j2)}`;
              rootEnd = j2;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        device = path5.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2))) {
            isAbsolute7 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString2(
      path5.slice(rootEnd),
      !isAbsolute7,
      "\\",
      isPathSeparator2
    );
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute7)
    tail = ".";
  if (tail.length > 0 && isPathSeparator2(path5.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute7) {
      if (tail.length > 0)
        return `\\${tail}`;
      else
        return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute7) {
    if (tail.length > 0)
      return `${device}\\${tail}`;
    else
      return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
function isAbsolute4(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0)
    return false;
  const code = path5.charCodeAt(0);
  if (isPathSeparator2(code)) {
    return true;
  } else if (isWindowsDeviceRoot2(code)) {
    if (len > 2 && path5.charCodeAt(1) === CHAR_COLON2) {
      if (isPathSeparator2(path5.charCodeAt(2)))
        return true;
    }
  }
  return false;
}
function join6(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0)
    return ".";
  let joined;
  let firstPart = null;
  for (let i = 0; i < pathsCount; ++i) {
    const path5 = paths[i];
    assertPath2(path5);
    if (path5.length > 0) {
      if (joined === void 0)
        joined = firstPart = path5;
      else
        joined += `\\${path5}`;
    }
  }
  if (joined === void 0)
    return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart != null);
  if (isPathSeparator2(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator2(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator2(firstPart.charCodeAt(2)))
            ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator2(joined.charCodeAt(slashCount)))
        break;
    }
    if (slashCount >= 2)
      joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize5(joined);
}
function relative4(from2, to) {
  assertPath2(from2);
  assertPath2(to);
  if (from2 === to)
    return "";
  const fromOrig = resolve4(from2);
  const toOrig = resolve4(to);
  if (fromOrig === toOrig)
    return "";
  from2 = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from2 === to)
    return "";
  let fromStart = 0;
  let fromEnd = from2.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from2.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH2)
      break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from2.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH2)
      break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH2)
      break;
  }
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH2)
      break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH2) {
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) {
          return toOrig.slice(toStart + i);
        }
      }
      if (fromLen > length) {
        if (from2.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH2) {
          lastCommonSep = i;
        } else if (i === 2) {
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from2.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (fromCode === CHAR_BACKWARD_SLASH2)
      lastCommonSep = i;
  }
  if (i !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1)
    lastCommonSep = 0;
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from2.charCodeAt(i) === CHAR_BACKWARD_SLASH2) {
      if (out.length === 0)
        out += "..";
      else
        out += "\\..";
    }
  }
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH2)
      ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
function toNamespacedPath4(path5) {
  if (typeof path5 !== "string")
    return path5;
  if (path5.length === 0)
    return "";
  const resolvedPath = resolve4(path5);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH2) {
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH2) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== CHAR_QUESTION_MARK2 && code !== CHAR_DOT2) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot2(resolvedPath.charCodeAt(0))) {
      if (resolvedPath.charCodeAt(1) === CHAR_COLON2 && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH2) {
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path5;
}
function dirname4(path5) {
  assertPath2(path5);
  const len = path5.length;
  if (len === 0)
    return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator2(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator2(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator2(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              return path5;
            }
            if (j2 !== last) {
              rootEnd = offset = j2 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2)))
            rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    return path5;
  }
  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator2(path5.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1)
      return ".";
    else
      end = rootEnd;
  }
  return path5.slice(0, end);
}
function basename4(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new ERR_INVALID_ARG_TYPE("ext", ["string"], ext);
  }
  assertPath2(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i;
  if (path5.length >= 2) {
    const drive = path5.charCodeAt(0);
    if (isWindowsDeviceRoot2(drive)) {
      if (path5.charCodeAt(1) === CHAR_COLON2)
        start = 2;
    }
  }
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5)
      return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i = path5.length - 1; i >= start; --i) {
      const code = path5.charCodeAt(i);
      if (isPathSeparator2(code)) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i = path5.length - 1; i >= start; --i) {
      if (isPathSeparator2(path5.charCodeAt(i))) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return path5.slice(start, end);
  }
}
function extname4(path5) {
  assertPath2(path5);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path5.length >= 2 && path5.charCodeAt(1) === CHAR_COLON2 && isWindowsDeviceRoot2(path5.charCodeAt(0))) {
    start = startPart = 2;
  }
  for (let i = path5.length - 1; i >= start; --i) {
    const code = path5.charCodeAt(i);
    if (isPathSeparator2(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format5(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new ERR_INVALID_ARG_TYPE("pathObject", ["Object"], pathObject);
  }
  return _format2("\\", pathObject);
}
function parse5(path5) {
  assertPath2(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path5.length;
  if (len === 0)
    return ret;
  let rootEnd = 0;
  let code = path5.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator2(code)) {
      rootEnd = 1;
      if (isPathSeparator2(path5.charCodeAt(1))) {
        let j2 = 2;
        let last = j2;
        for (; j2 < len; ++j2) {
          if (isPathSeparator2(path5.charCodeAt(j2)))
            break;
        }
        if (j2 < len && j2 !== last) {
          last = j2;
          for (; j2 < len; ++j2) {
            if (!isPathSeparator2(path5.charCodeAt(j2)))
              break;
          }
          if (j2 < len && j2 !== last) {
            last = j2;
            for (; j2 < len; ++j2) {
              if (isPathSeparator2(path5.charCodeAt(j2)))
                break;
            }
            if (j2 === len) {
              rootEnd = j2;
            } else if (j2 !== last) {
              rootEnd = j2 + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot2(code)) {
      if (path5.charCodeAt(1) === CHAR_COLON2) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator2(path5.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path5;
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path5;
          return ret;
        }
      }
    }
  } else if (isPathSeparator2(code)) {
    ret.root = ret.dir = path5;
    return ret;
  }
  if (rootEnd > 0)
    ret.root = path5.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path5.length - 1;
  let preDotState = 0;
  for (; i >= rootEnd; --i) {
    code = path5.charCodeAt(i);
    if (isPathSeparator2(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path5.slice(startPart, end);
    }
  } else {
    ret.name = path5.slice(startPart, startDot);
    ret.base = path5.slice(startPart, end);
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path5.slice(0, startPart - 1);
  } else
    ret.dir = ret.root;
  return ret;
}
function fromFileUrl4(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  let path5 = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname != "") {
    path5 = `\\\\${url.hostname}${path5}`;
  }
  return path5;
}
function toFileUrl4(path5) {
  if (!isAbsolute4(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const [, hostname, pathname] = path5.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace2(pathname.replace(/%/g, "%25"));
  if (hostname != null && hostname != "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}
var win32_default = {
  basename: basename4,
  delimiter: delimiter4,
  dirname: dirname4,
  extname: extname4,
  format: format5,
  fromFileUrl: fromFileUrl4,
  isAbsolute: isAbsolute4,
  join: join6,
  normalize: normalize5,
  parse: parse5,
  relative: relative4,
  resolve: resolve4,
  sep: sep4,
  toFileUrl: toFileUrl4,
  toNamespacedPath: toNamespacedPath4
};

// https://deno.land/std@0.177.0/node/path/posix.ts
var posix_exports2 = {};
__export(posix_exports2, {
  basename: () => basename5,
  default: () => posix_default,
  delimiter: () => delimiter5,
  dirname: () => dirname5,
  extname: () => extname5,
  format: () => format6,
  fromFileUrl: () => fromFileUrl5,
  isAbsolute: () => isAbsolute5,
  join: () => join7,
  normalize: () => normalize6,
  parse: () => parse6,
  relative: () => relative5,
  resolve: () => resolve5,
  sep: () => sep5,
  toFileUrl: () => toFileUrl5,
  toNamespacedPath: () => toNamespacedPath5
});
var sep5 = "/";
var delimiter5 = ":";
function resolve5(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path5;
    if (i >= 0)
      path5 = pathSegments[i];
    else {
      const { Deno: Deno3 } = globalThis;
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path5 = Deno3.cwd();
    }
    assertPath2(path5);
    if (path5.length === 0) {
      continue;
    }
    resolvedPath = `${path5}/${resolvedPath}`;
    resolvedAbsolute = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  }
  resolvedPath = normalizeString2(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator2
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0)
      return `/${resolvedPath}`;
    else
      return "/";
  } else if (resolvedPath.length > 0)
    return resolvedPath;
  else
    return ".";
}
function normalize6(path5) {
  assertPath2(path5);
  if (path5.length === 0)
    return ".";
  const isAbsolute7 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  const trailingSeparator = path5.charCodeAt(path5.length - 1) === CHAR_FORWARD_SLASH2;
  path5 = normalizeString2(path5, !isAbsolute7, "/", isPosixPathSeparator2);
  if (path5.length === 0 && !isAbsolute7)
    path5 = ".";
  if (path5.length > 0 && trailingSeparator)
    path5 += "/";
  if (isAbsolute7)
    return `/${path5}`;
  return path5;
}
function isAbsolute5(path5) {
  assertPath2(path5);
  return path5.length > 0 && path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
}
function join7(...paths) {
  if (paths.length === 0)
    return ".";
  let joined;
  for (let i = 0, len = paths.length; i < len; ++i) {
    const path5 = paths[i];
    assertPath2(path5);
    if (path5.length > 0) {
      if (!joined)
        joined = path5;
      else
        joined += `/${path5}`;
    }
  }
  if (!joined)
    return ".";
  return normalize6(joined);
}
function relative5(from2, to) {
  assertPath2(from2);
  assertPath2(to);
  if (from2 === to)
    return "";
  from2 = resolve5(from2);
  to = resolve5(to);
  if (from2 === to)
    return "";
  let fromStart = 1;
  const fromEnd = from2.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from2.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH2)
      break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH2)
      break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH2) {
          return to.slice(toStart + i + 1);
        } else if (i === 0) {
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (from2.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH2) {
          lastCommonSep = i;
        } else if (i === 0) {
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from2.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode)
      break;
    else if (fromCode === CHAR_FORWARD_SLASH2)
      lastCommonSep = i;
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from2.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
      if (out.length === 0)
        out += "..";
      else
        out += "/..";
    }
  }
  if (out.length > 0)
    return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH2)
      ++toStart;
    return to.slice(toStart);
  }
}
function toNamespacedPath5(path5) {
  return path5;
}
function dirname5(path5) {
  assertPath2(path5);
  if (path5.length === 0)
    return ".";
  const hasRoot = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  let end = -1;
  let matchedSlash = true;
  for (let i = path5.length - 1; i >= 1; --i) {
    if (path5.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path5.slice(0, end);
}
function basename5(path5, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new ERR_INVALID_ARG_TYPE("ext", ["string"], ext);
  }
  assertPath2(path5);
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  let i;
  if (ext !== void 0 && ext.length > 0 && ext.length <= path5.length) {
    if (ext.length === path5.length && ext === path5)
      return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i = path5.length - 1; i >= 0; --i) {
      const code = path5.charCodeAt(i);
      if (code === CHAR_FORWARD_SLASH2) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }
        if (extIdx >= 0) {
          if (code === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i;
            }
          } else {
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end)
      end = firstNonSlashEnd;
    else if (end === -1)
      end = path5.length;
    return path5.slice(start, end);
  } else {
    for (i = path5.length - 1; i >= 0; --i) {
      if (path5.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return path5.slice(start, end);
  }
}
function extname5(path5) {
  assertPath2(path5);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i = path5.length - 1; i >= 0; --i) {
    const code = path5.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function format6(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new ERR_INVALID_ARG_TYPE("pathObject", ["Object"], pathObject);
  }
  return _format2("/", pathObject);
}
function parse6(path5) {
  assertPath2(path5);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path5.length === 0)
    return ret;
  const isAbsolute7 = path5.charCodeAt(0) === CHAR_FORWARD_SLASH2;
  let start;
  if (isAbsolute7) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path5.length - 1;
  let preDotState = 0;
  for (; i >= start; --i) {
    const code = path5.charCodeAt(i);
    if (code === CHAR_FORWARD_SLASH2) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === CHAR_DOT2) {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute7) {
        ret.base = ret.name = path5.slice(1, end);
      } else {
        ret.base = ret.name = path5.slice(startPart, end);
      }
    }
  } else {
    if (startPart === 0 && isAbsolute7) {
      ret.name = path5.slice(1, startDot);
      ret.base = path5.slice(1, end);
    } else {
      ret.name = path5.slice(startPart, startDot);
      ret.base = path5.slice(startPart, end);
    }
    ret.ext = path5.slice(startDot, end);
  }
  if (startPart > 0)
    ret.dir = path5.slice(0, startPart - 1);
  else if (isAbsolute7)
    ret.dir = "/";
  return ret;
}
function fromFileUrl5(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  );
}
function toFileUrl5(path5) {
  if (!isAbsolute5(path5)) {
    throw new TypeError("Must be an absolute path.");
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace2(
    path5.replace(/%/g, "%25").replace(/\\/g, "%5C")
  );
  return url;
}
var posix_default = {
  basename: basename5,
  delimiter: delimiter5,
  dirname: dirname5,
  extname: extname5,
  format: format6,
  fromFileUrl: fromFileUrl5,
  isAbsolute: isAbsolute5,
  join: join7,
  normalize: normalize6,
  parse: parse6,
  relative: relative5,
  resolve: resolve5,
  sep: sep5,
  toFileUrl: toFileUrl5,
  toNamespacedPath: toNamespacedPath5
};

// https://deno.land/std@0.177.0/node/path/separator.ts
var SEP2 = isWindows ? "\\" : "/";
var SEP_PATTERN2 = isWindows ? /[\\/]+/ : /\/+/;

// https://deno.land/std@0.177.0/node/path/common.ts
function common(paths, sep7 = SEP2) {
  const [first = "", ...remaining] = paths;
  if (first === "" || remaining.length === 0) {
    return first.substring(0, first.lastIndexOf(sep7) + 1);
  }
  const parts = first.split(sep7);
  let endOfPrefix = parts.length;
  for (const path5 of remaining) {
    const compare3 = path5.split(sep7);
    for (let i = 0; i < endOfPrefix; i++) {
      if (compare3[i] !== parts[i]) {
        endOfPrefix = i;
      }
    }
    if (endOfPrefix === 0) {
      return "";
    }
  }
  const prefix = parts.slice(0, endOfPrefix).join(sep7);
  return prefix.endsWith(sep7) ? prefix : `${prefix}${sep7}`;
}

// https://deno.land/std@0.177.0/node/path/glob.ts
var path3 = isWindows ? win32_exports2 : posix_exports2;
var { join: join8, normalize: normalize7 } = path3;
var regExpEscapeChars = [
  "!",
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "=",
  "?",
  "[",
  "\\",
  "^",
  "{",
  "|"
];
var rangeEscapeChars = ["-", "\\", "]"];
function globToRegExp(glob, {
  extended = true,
  globstar: globstarOption = true,
  os: os2 = osType,
  caseInsensitive = false
} = {}) {
  if (glob == "") {
    return /(?!)/;
  }
  const sep7 = os2 == "windows" ? "(?:\\\\|/)+" : "/+";
  const sepMaybe = os2 == "windows" ? "(?:\\\\|/)*" : "/*";
  const seps = os2 == "windows" ? ["\\", "/"] : ["/"];
  const globstar = os2 == "windows" ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*" : "(?:[^/]*(?:/|$)+)*";
  const wildcard = os2 == "windows" ? "[^\\\\/]*" : "[^/]*";
  const escapePrefix = os2 == "windows" ? "`" : "\\";
  let newLength = glob.length;
  for (; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--)
    ;
  glob = glob.slice(0, newLength);
  let regExpString = "";
  for (let j2 = 0; j2 < glob.length; ) {
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j2;
    for (; i < glob.length && !seps.includes(glob[i]); i++) {
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }
      if (glob[i] == escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob[i] == "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob[i + 1] == "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] == "^") {
            i++;
            segment += "\\^";
          }
          continue;
        } else if (glob[i + 1] == ":") {
          let k = i + 1;
          let value = "";
          while (glob[k + 1] != null && glob[k + 1] != ":") {
            value += glob[k + 1];
            k++;
          }
          if (glob[k + 1] == ":" && glob[k + 2] == "]") {
            i = k + 2;
            if (value == "alnum")
              segment += "\\dA-Za-z";
            else if (value == "alpha")
              segment += "A-Za-z";
            else if (value == "ascii")
              segment += "\0-\x7F";
            else if (value == "blank")
              segment += "	 ";
            else if (value == "cntrl")
              segment += "\0-\x7F";
            else if (value == "digit")
              segment += "\\d";
            else if (value == "graph")
              segment += "!-~";
            else if (value == "lower")
              segment += "a-z";
            else if (value == "print")
              segment += " -~";
            else if (value == "punct") {
              segment += `!"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_\u2018{|}~`;
            } else if (value == "space")
              segment += "\\s\v";
            else if (value == "upper")
              segment += "A-Z";
            else if (value == "word")
              segment += "\\w";
            else if (value == "xdigit")
              segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob[i] == "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        if (glob[i] == "\\") {
          segment += `\\\\`;
        } else {
          segment += glob[i];
        }
        continue;
      }
      if (glob[i] == ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
        segment += ")";
        const type = groupStack.pop();
        if (type == "!") {
          segment += wildcard;
        } else if (type != "@") {
          segment += type;
        }
        continue;
      }
      if (glob[i] == "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] == "+" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "@" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "?") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else {
          segment += ".";
        }
        continue;
      }
      if (glob[i] == "!" && extended && glob[i + 1] == "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob[i] == "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob[i] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob[i] == "," && groupStack[groupStack.length - 1] == "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] == "*") {
        if (extended && glob[i + 1] == "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;
          while (glob[i + 1] == "*") {
            i++;
            numStars++;
          }
          const nextChar = glob[i + 1];
          if (globstarOption && numStars == 2 && [...seps, void 0].includes(prevChar) && [...seps, void 0].includes(nextChar)) {
            segment += globstar;
            endsWithSep = true;
          } else {
            segment += wildcard;
          }
        }
        continue;
      }
      segment += regExpEscapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    }
    if (groupStack.length > 0 || inRange || inEscape) {
      segment = "";
      for (const c of glob.slice(j2, i)) {
        segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i < glob.length ? sep7 : sepMaybe;
      endsWithSep = true;
    }
    while (seps.includes(glob[i]))
      i++;
    if (!(i > j2)) {
      throw new Error("Assertion failure: i > j (potential infinite loop)");
    }
    j2 = i;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
function isGlob(str) {
  const chars = { "{": "}", "(": ")", "[": "]" };
  const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  if (str === "") {
    return false;
  }
  let match;
  while (match = regex.exec(str)) {
    if (match[2])
      return true;
    let idx = match.index + match[0].length;
    const open2 = match[1];
    const close3 = open2 ? chars[open2] : null;
    if (open2 && close3) {
      const n = str.indexOf(close3, idx);
      if (n !== -1) {
        idx = n + 1;
      }
    }
    str = str.slice(idx);
  }
  return false;
}
function normalizeGlob(glob, { globstar = false } = {}) {
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) {
    return normalize7(glob);
  }
  const s = SEP_PATTERN2.source;
  const badParentPattern = new RegExp(
    `(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`,
    "g"
  );
  return normalize7(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
function joinGlobs(globs, { extended = true, globstar = false } = {}) {
  if (!globstar || globs.length == 0) {
    return join8(...globs);
  }
  if (globs.length === 0)
    return ".";
  let joined;
  for (const glob of globs) {
    const path5 = glob;
    if (path5.length > 0) {
      if (!joined)
        joined = path5;
      else
        joined += `${SEP2}${path5}`;
    }
  }
  if (!joined)
    return ".";
  return normalizeGlob(joined, { extended, globstar });
}

// https://deno.land/std@0.177.0/node/path/mod.ts
var path4 = isWindows ? win32_default : posix_default;
var win32 = win32_default;
var posix = posix_default;
var {
  basename: basename6,
  delimiter: delimiter6,
  dirname: dirname6,
  extname: extname6,
  format: format7,
  fromFileUrl: fromFileUrl6,
  isAbsolute: isAbsolute6,
  join: join9,
  normalize: normalize8,
  parse: parse7,
  relative: relative6,
  resolve: resolve6,
  sep: sep6,
  toFileUrl: toFileUrl6,
  toNamespacedPath: toNamespacedPath6
} = path4;

// https://deno.land/std@0.177.0/node/path.ts
var path_default = { ...mod_exports };

// https://deno.land/std@0.177.0/node/internal/idna.ts
var base = 36;
var tMin = 1;
var baseMinusTMin = base - tMin;

// https://deno.land/std@0.177.0/node/internal/querystring.ts
var hexTable = new Array(256);
for (let i = 0; i < 256; ++i) {
  hexTable[i] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
}
var isHexTable = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 64 - 79
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 80 - 95
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 96 - 111
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 112 - 127
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 128 ...
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
  // ... 256
]);

// https://deno.land/std@0.177.0/node/querystring.ts
var isHexTable2 = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 64 - 79
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 80 - 95
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 96 - 111
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 112 - 127
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 128 ...
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
  // ... 256
]);
var noEscape = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  // 80 - 95
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  0
  // 112 - 127
]);
var unhexTable = new Int8Array([
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 0 - 15
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 16 - 31
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 32 - 47
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 48 - 63
  -1,
  10,
  11,
  12,
  13,
  14,
  15,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 64 - 79
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 80 - 95
  -1,
  10,
  11,
  12,
  13,
  14,
  15,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 96 - 111
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 112 - 127
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  // 128 ...
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1
  // ... 255
]);

// https://deno.land/std@0.177.0/node/url.ts
var forwardSlashRegEx = /\//g;
var noEscapeAuth = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0x00 - 0x0F
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0x10 - 0x1F
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  // 0x20 - 0x2F
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  // 0x30 - 0x3F
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 0x40 - 0x4F
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  // 0x50 - 0x5F
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 0x60 - 0x6F
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  0
  // 0x70 - 0x7F
]);
function fileURLToPath(path5) {
  if (typeof path5 === "string")
    path5 = new URL(path5);
  else if (!(path5 instanceof URL)) {
    throw new ERR_INVALID_ARG_TYPE("path", ["string", "URL"], path5);
  }
  if (path5.protocol !== "file:") {
    throw new ERR_INVALID_URL_SCHEME("file");
  }
  return isWindows ? getPathFromURLWin(path5) : getPathFromURLPosix(path5);
}
function getPathFromURLWin(url) {
  const hostname = url.hostname;
  let pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) | 32;
      if (pathname[n + 1] === "2" && third === 102 || // 2f 2F /
      pathname[n + 1] === "5" && third === 99) {
        throw new ERR_INVALID_FILE_URL_PATH(
          "must not include encoded \\ or / characters"
        );
      }
    }
  }
  pathname = pathname.replace(forwardSlashRegEx, "\\");
  pathname = decodeURIComponent(pathname);
  if (hostname !== "") {
    return `\\\\${hostname}${pathname}`;
  } else {
    const letter = pathname.codePointAt(1) | 32;
    const sep7 = pathname[2];
    if (letter < CHAR_LOWERCASE_A || letter > CHAR_LOWERCASE_Z || // a..z A..Z
    sep7 !== ":") {
      throw new ERR_INVALID_FILE_URL_PATH("must be absolute");
    }
    return pathname.slice(1);
  }
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new ERR_INVALID_FILE_URL_HOST(osType);
  }
  const pathname = url.pathname;
  for (let n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      const third = pathname.codePointAt(n + 2) | 32;
      if (pathname[n + 1] === "2" && third === 102) {
        throw new ERR_INVALID_FILE_URL_PATH(
          "must not include encoded / characters"
        );
      }
    }
  }
  return decodeURIComponent(pathname);
}

// https://deno.land/std@0.177.0/node/internal/url.ts
var searchParams = Symbol("query");
function toPathIfFileURL(fileURLOrPath) {
  if (!(fileURLOrPath instanceof URL)) {
    return fileURLOrPath;
  }
  return fileURLToPath(fileURLOrPath);
}

// https://deno.land/std@0.177.0/node/internal/assert.mjs
function assert2(value, message) {
  if (!value) {
    throw new ERR_INTERNAL_ASSERTION(message);
  }
}
function fail(message) {
  throw new ERR_INTERNAL_ASSERTION(message);
}
assert2.fail = fail;
var assert_default = assert2;

// https://deno.land/std@0.177.0/node/_fs/_fs_stat.ts
function convertFileInfoToStats(origin) {
  return {
    dev: origin.dev,
    ino: origin.ino,
    mode: origin.mode,
    nlink: origin.nlink,
    uid: origin.uid,
    gid: origin.gid,
    rdev: origin.rdev,
    size: origin.size,
    blksize: origin.blksize,
    blocks: origin.blocks,
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime?.getTime() || null,
    atimeMs: origin.atime?.getTime() || null,
    birthtimeMs: origin.birthtime?.getTime() || null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime?.getTime() || null
  };
}
function toBigInt(number) {
  if (number === null || number === void 0)
    return null;
  return BigInt(number);
}
function convertFileInfoToBigIntStats(origin) {
  return {
    dev: toBigInt(origin.dev),
    ino: toBigInt(origin.ino),
    mode: toBigInt(origin.mode),
    nlink: toBigInt(origin.nlink),
    uid: toBigInt(origin.uid),
    gid: toBigInt(origin.gid),
    rdev: toBigInt(origin.rdev),
    size: toBigInt(origin.size) || 0n,
    blksize: toBigInt(origin.blksize),
    blocks: toBigInt(origin.blocks),
    mtime: origin.mtime,
    atime: origin.atime,
    birthtime: origin.birthtime,
    mtimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    atimeMs: origin.atime ? BigInt(origin.atime.getTime()) : null,
    birthtimeMs: origin.birthtime ? BigInt(origin.birthtime.getTime()) : null,
    mtimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null,
    atimeNs: origin.atime ? BigInt(origin.atime.getTime()) * 1000000n : null,
    birthtimeNs: origin.birthtime ? BigInt(origin.birthtime.getTime()) * 1000000n : null,
    isFile: () => origin.isFile,
    isDirectory: () => origin.isDirectory,
    isSymbolicLink: () => origin.isSymlink,
    // not sure about those
    isBlockDevice: () => false,
    isFIFO: () => false,
    isCharacterDevice: () => false,
    isSocket: () => false,
    ctime: origin.mtime,
    ctimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
    ctimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null
  };
}
function CFISBIS(fileInfo, bigInt) {
  if (bigInt)
    return convertFileInfoToBigIntStats(fileInfo);
  return convertFileInfoToStats(fileInfo);
}
function stat(path5, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : { bigint: false };
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.stat(path5).then(
    (stat2) => callback(null, CFISBIS(stat2, options.bigint)),
    (err) => callback(denoErrorToNodeError(err, { syscall: "stat" }))
  );
}
var statPromise = promisify(stat);
function statSync(path5, options = { bigint: false, throwIfNoEntry: true }) {
  try {
    const origin = Deno.statSync(path5);
    return CFISBIS(origin, options.bigint);
  } catch (err) {
    if (options?.throwIfNoEntry === false && err instanceof Deno.errors.NotFound) {
      return;
    }
    if (err instanceof Error) {
      throw denoErrorToNodeError(err, { syscall: "stat" });
    } else {
      throw err;
    }
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_lstat.ts
function lstat(path5, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : { bigint: false };
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.lstat(path5).then(
    (stat2) => callback(null, CFISBIS(stat2, options.bigint)),
    (err) => callback(err)
  );
}
var lstatPromise = promisify(lstat);
function lstatSync(path5, options) {
  const origin = Deno.lstatSync(path5);
  return CFISBIS(origin, options?.bigint || false);
}

// https://deno.land/std@0.177.0/node/internal/fs/utils.mjs
var kType = Symbol("type");
var kStats = Symbol("stats");
var {
  F_OK: F_OK2 = 0,
  W_OK: W_OK2 = 0,
  R_OK: R_OK2 = 0,
  X_OK: X_OK2 = 0,
  COPYFILE_EXCL: COPYFILE_EXCL2,
  COPYFILE_FICLONE: COPYFILE_FICLONE2,
  COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE2,
  O_APPEND: O_APPEND2,
  O_CREAT: O_CREAT2,
  O_EXCL: O_EXCL2,
  O_RDONLY: O_RDONLY2,
  O_RDWR: O_RDWR2,
  O_SYNC: O_SYNC2,
  O_TRUNC: O_TRUNC2,
  O_WRONLY: O_WRONLY2,
  S_IFBLK,
  S_IFCHR,
  S_IFDIR,
  S_IFIFO,
  S_IFLNK,
  S_IFMT,
  S_IFREG,
  S_IFSOCK,
  UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION,
  UV_DIRENT_UNKNOWN,
  UV_DIRENT_FILE,
  UV_DIRENT_DIR,
  UV_DIRENT_LINK,
  UV_DIRENT_FIFO,
  UV_DIRENT_SOCKET,
  UV_DIRENT_CHAR,
  UV_DIRENT_BLOCK
} = fs;
var {
  errno: {
    EISDIR
  }
} = os;
var kMinimumAccessMode = Math.min(F_OK2, W_OK2, R_OK2, X_OK2);
var kMaximumAccessMode = F_OK2 | W_OK2 | R_OK2 | X_OK2;
var kDefaultCopyMode = 0;
var kMinimumCopyMode = Math.min(
  kDefaultCopyMode,
  COPYFILE_EXCL2,
  COPYFILE_FICLONE2,
  COPYFILE_FICLONE_FORCE2
);
var kMaximumCopyMode = COPYFILE_EXCL2 | COPYFILE_FICLONE2 | COPYFILE_FICLONE_FORCE2;
var kIoMaxLength = 2 ** 31 - 1;
var kReadFileUnknownBufferLength = 64 * 1024;
var kReadFileBufferLength = 512 * 1024;
var kWriteFileMaxChunkSize = 512 * 1024;
var kMaxUserId = 2 ** 32 - 1;
function assertEncoding(encoding) {
  if (encoding && !Buffer2.isEncoding(encoding)) {
    const reason = "is invalid encoding";
    throw new ERR_INVALID_ARG_VALUE(encoding, "encoding", reason);
  }
}
var Dirent = class {
  constructor(name, type) {
    this.name = name;
    this[kType] = type;
  }
  isDirectory() {
    return this[kType] === UV_DIRENT_DIR;
  }
  isFile() {
    return this[kType] === UV_DIRENT_FILE;
  }
  isBlockDevice() {
    return this[kType] === UV_DIRENT_BLOCK;
  }
  isCharacterDevice() {
    return this[kType] === UV_DIRENT_CHAR;
  }
  isSymbolicLink() {
    return this[kType] === UV_DIRENT_LINK;
  }
  isFIFO() {
    return this[kType] === UV_DIRENT_FIFO;
  }
  isSocket() {
    return this[kType] === UV_DIRENT_SOCKET;
  }
};
var DirentFromStats = class extends Dirent {
  constructor(name, stats) {
    super(name, null);
    this[kStats] = stats;
  }
};
for (const name of Reflect.ownKeys(Dirent.prototype)) {
  if (name === "constructor") {
    continue;
  }
  DirentFromStats.prototype[name] = function() {
    return this[kStats][name]();
  };
}
function copyObject(source) {
  const target = {};
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
var bufferSep = Buffer2.from(path_default.sep);
function getOptions2(options, defaultOptions) {
  if (options === null || options === void 0 || typeof options === "function") {
    return defaultOptions;
  }
  if (typeof options === "string") {
    defaultOptions = { ...defaultOptions };
    defaultOptions.encoding = options;
    options = defaultOptions;
  } else if (typeof options !== "object") {
    throw new ERR_INVALID_ARG_TYPE("options", ["string", "Object"], options);
  }
  if (options.encoding !== "buffer") {
    assertEncoding(options.encoding);
  }
  if (options.signal !== void 0) {
    validateAbortSignal(options.signal, "options.signal");
  }
  return options;
}
var nullCheck = hideStackFrames(
  (path5, propName, throwError = true) => {
    const pathIsString = typeof path5 === "string";
    const pathIsUint8Array = isUint8Array(path5);
    if (!pathIsString && !pathIsUint8Array || pathIsString && !path5.includes("\0") || pathIsUint8Array && !path5.includes(0)) {
      return;
    }
    const err = new ERR_INVALID_ARG_VALUE(
      propName,
      path5,
      "must be a string or Uint8Array without null bytes"
    );
    if (throwError) {
      throw err;
    }
    return err;
  }
);
function StatsBase(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks) {
  this.dev = dev;
  this.mode = mode;
  this.nlink = nlink;
  this.uid = uid;
  this.gid = gid;
  this.rdev = rdev;
  this.blksize = blksize;
  this.ino = ino;
  this.size = size;
  this.blocks = blocks;
}
StatsBase.prototype.isDirectory = function() {
  return this._checkModeProperty(S_IFDIR);
};
StatsBase.prototype.isFile = function() {
  return this._checkModeProperty(S_IFREG);
};
StatsBase.prototype.isBlockDevice = function() {
  return this._checkModeProperty(S_IFBLK);
};
StatsBase.prototype.isCharacterDevice = function() {
  return this._checkModeProperty(S_IFCHR);
};
StatsBase.prototype.isSymbolicLink = function() {
  return this._checkModeProperty(S_IFLNK);
};
StatsBase.prototype.isFIFO = function() {
  return this._checkModeProperty(S_IFIFO);
};
StatsBase.prototype.isSocket = function() {
  return this._checkModeProperty(S_IFSOCK);
};
var kNsPerMsBigInt = 10n ** 6n;
var kNsPerSecBigInt = 10n ** 9n;
var kMsPerSec = 10 ** 3;
var kNsPerMs = 10 ** 6;
function dateFromMs(ms) {
  return new Date(Number(ms) + 0.5);
}
function BigIntStats2(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeNs, mtimeNs, ctimeNs, birthtimeNs) {
  Reflect.apply(StatsBase, this, [
    dev,
    mode,
    nlink,
    uid,
    gid,
    rdev,
    blksize,
    ino,
    size,
    blocks
  ]);
  this.atimeMs = atimeNs / kNsPerMsBigInt;
  this.mtimeMs = mtimeNs / kNsPerMsBigInt;
  this.ctimeMs = ctimeNs / kNsPerMsBigInt;
  this.birthtimeMs = birthtimeNs / kNsPerMsBigInt;
  this.atimeNs = atimeNs;
  this.mtimeNs = mtimeNs;
  this.ctimeNs = ctimeNs;
  this.birthtimeNs = birthtimeNs;
  this.atime = dateFromMs(this.atimeMs);
  this.mtime = dateFromMs(this.mtimeMs);
  this.ctime = dateFromMs(this.ctimeMs);
  this.birthtime = dateFromMs(this.birthtimeMs);
}
Object.setPrototypeOf(BigIntStats2.prototype, StatsBase.prototype);
Object.setPrototypeOf(BigIntStats2, StatsBase);
BigIntStats2.prototype._checkModeProperty = function(property) {
  if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
    return false;
  }
  return (this.mode & BigInt(S_IFMT)) === BigInt(property);
};
function Stats2(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeMs, mtimeMs, ctimeMs, birthtimeMs) {
  StatsBase.call(
    this,
    dev,
    mode,
    nlink,
    uid,
    gid,
    rdev,
    blksize,
    ino,
    size,
    blocks
  );
  this.atimeMs = atimeMs;
  this.mtimeMs = mtimeMs;
  this.ctimeMs = ctimeMs;
  this.birthtimeMs = birthtimeMs;
  this.atime = dateFromMs(atimeMs);
  this.mtime = dateFromMs(mtimeMs);
  this.ctime = dateFromMs(ctimeMs);
  this.birthtime = dateFromMs(birthtimeMs);
}
Object.setPrototypeOf(Stats2.prototype, StatsBase.prototype);
Object.setPrototypeOf(Stats2, StatsBase);
Stats2.prototype.isFile = StatsBase.prototype.isFile;
Stats2.prototype._checkModeProperty = function(property) {
  if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
    return false;
  }
  return (this.mode & S_IFMT) === property;
};
var stringToSymlinkType = hideStackFrames((type) => {
  let flags = 0;
  if (typeof type === "string") {
    switch (type) {
      case "dir":
        flags |= UV_FS_SYMLINK_DIR;
        break;
      case "junction":
        flags |= UV_FS_SYMLINK_JUNCTION;
        break;
      case "file":
        break;
      default:
        throw new ERR_FS_INVALID_SYMLINK_TYPE(type);
    }
  }
  return flags;
});
var validateOffsetLengthRead = hideStackFrames(
  (offset, length, bufferLength) => {
    if (offset < 0) {
      throw new ERR_OUT_OF_RANGE("offset", ">= 0", offset);
    }
    if (length < 0) {
      throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    if (offset + length > bufferLength) {
      throw new ERR_OUT_OF_RANGE(
        "length",
        `<= ${bufferLength - offset}`,
        length
      );
    }
  }
);
var validateOffsetLengthWrite = hideStackFrames(
  (offset, length, byteLength2) => {
    if (offset > byteLength2) {
      throw new ERR_OUT_OF_RANGE("offset", `<= ${byteLength2}`, offset);
    }
    if (length > byteLength2 - offset) {
      throw new ERR_OUT_OF_RANGE("length", `<= ${byteLength2 - offset}`, length);
    }
    if (length < 0) {
      throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    validateInt32(length, "length", 0);
  }
);
var validatePath = hideStackFrames((path5, propName = "path") => {
  if (typeof path5 !== "string" && !isUint8Array(path5)) {
    throw new ERR_INVALID_ARG_TYPE(propName, ["string", "Buffer", "URL"], path5);
  }
  const err = nullCheck(path5, propName, false);
  if (err !== void 0) {
    throw err;
  }
});
var getValidatedPath = hideStackFrames(
  (fileURLOrPath, propName = "path") => {
    const path5 = toPathIfFileURL(fileURLOrPath);
    validatePath(path5, propName);
    return path5;
  }
);
var getValidatedFd = hideStackFrames((fd, propName = "fd") => {
  if (Object.is(fd, -0)) {
    return 0;
  }
  validateInt32(fd, propName, 0);
  return fd;
});
var validateBufferArray = hideStackFrames(
  (buffers, propName = "buffers") => {
    if (!Array.isArray(buffers)) {
      throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
    }
    for (let i = 0; i < buffers.length; i++) {
      if (!isArrayBufferView(buffers[i])) {
        throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
      }
    }
    return buffers;
  }
);
var defaultCpOptions = {
  dereference: false,
  errorOnExist: false,
  filter: void 0,
  force: true,
  preserveTimestamps: false,
  recursive: false
};
var defaultRmOptions = {
  recursive: false,
  force: false,
  retryDelay: 100,
  maxRetries: 0
};
var defaultRmdirOptions = {
  retryDelay: 100,
  maxRetries: 0,
  recursive: false
};
var validateCpOptions = hideStackFrames((options) => {
  if (options === void 0) {
    return { ...defaultCpOptions };
  }
  validateObject(options, "options");
  options = { ...defaultCpOptions, ...options };
  validateBoolean(options.dereference, "options.dereference");
  validateBoolean(options.errorOnExist, "options.errorOnExist");
  validateBoolean(options.force, "options.force");
  validateBoolean(options.preserveTimestamps, "options.preserveTimestamps");
  validateBoolean(options.recursive, "options.recursive");
  if (options.filter !== void 0) {
    validateFunction(options.filter, "options.filter");
  }
  return options;
});
var validateRmOptions = hideStackFrames(
  (path5, options, expectDir, cb) => {
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    stat(path5, (err, stats) => {
      if (err) {
        if (options.force && err.code === "ENOENT") {
          return cb(null, options);
        }
        return cb(err, options);
      }
      if (expectDir && !stats.isDirectory()) {
        return cb(false);
      }
      if (stats.isDirectory() && !options.recursive) {
        return cb(
          new ERR_FS_EISDIR({
            code: "EISDIR",
            message: "is a directory",
            path: path5,
            syscall: "rm",
            errno: EISDIR
          })
        );
      }
      return cb(null, options);
    });
  }
);
var validateRmOptionsSync = hideStackFrames(
  (path5, options, expectDir) => {
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    if (!options.force || expectDir || !options.recursive) {
      const isDirectory = statSync(path5, { throwIfNoEntry: !options.force })?.isDirectory();
      if (expectDir && !isDirectory) {
        return false;
      }
      if (isDirectory && !options.recursive) {
        throw new ERR_FS_EISDIR({
          code: "EISDIR",
          message: "is a directory",
          path: path5,
          syscall: "rm",
          errno: EISDIR
        });
      }
    }
    return options;
  }
);
var recursiveRmdirWarned = process_default.noDeprecation;
function emitRecursiveRmdirWarning() {
  if (!recursiveRmdirWarned) {
    process_default.emitWarning(
      "In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead",
      "DeprecationWarning",
      "DEP0147"
    );
    recursiveRmdirWarned = true;
  }
}
var validateRmdirOptions = hideStackFrames(
  (options, defaults = defaultRmdirOptions) => {
    if (options === void 0) {
      return defaults;
    }
    validateObject(options, "options");
    options = { ...defaults, ...options };
    validateBoolean(options.recursive, "options.recursive");
    validateInt32(options.retryDelay, "options.retryDelay", 0);
    validateUint32(options.maxRetries, "options.maxRetries");
    return options;
  }
);
var getValidMode = hideStackFrames((mode, type) => {
  let min = kMinimumAccessMode;
  let max = kMaximumAccessMode;
  let def = F_OK2;
  if (type === "copyFile") {
    min = kMinimumCopyMode;
    max = kMaximumCopyMode;
    def = mode || kDefaultCopyMode;
  } else {
    assert_default(type === "access");
  }
  if (mode == null) {
    return def;
  }
  if (Number.isInteger(mode) && mode >= min && mode <= max) {
    return mode;
  }
  if (typeof mode !== "number") {
    throw new ERR_INVALID_ARG_TYPE("mode", "integer", mode);
  }
  throw new ERR_OUT_OF_RANGE(
    "mode",
    `an integer >= ${min} && <= ${max}`,
    mode
  );
});
var validateStringAfterArrayBufferView = hideStackFrames(
  (buffer, name) => {
    if (typeof buffer === "string") {
      return;
    }
    if (typeof buffer === "object" && buffer !== null && typeof buffer.toString === "function" && Object.prototype.hasOwnProperty.call(buffer, "toString")) {
      return;
    }
    throw new ERR_INVALID_ARG_TYPE(
      name,
      ["string", "Buffer", "TypedArray", "DataView"],
      buffer
    );
  }
);
var validatePosition = hideStackFrames((position) => {
  if (typeof position === "number") {
    validateInteger(position, "position");
  } else if (typeof position === "bigint") {
    if (!(position >= -(2n ** 63n) && position <= 2n ** 63n - 1n)) {
      throw new ERR_OUT_OF_RANGE(
        "position",
        `>= ${-(2n ** 63n)} && <= ${2n ** 63n - 1n}`,
        position
      );
    }
  } else {
    throw new ERR_INVALID_ARG_TYPE("position", ["integer", "bigint"], position);
  }
});
var realpathCacheKey = Symbol("realpathCacheKey");
var showStringCoercionDeprecation = deprecate(
  () => {
  },
  "Implicit coercion of objects with own toString property is deprecated.",
  "DEP0162"
);

// https://deno.land/std@0.177.0/node/_fs/_fs_access.ts
function access(path5, mode, callback) {
  if (typeof mode === "function") {
    callback = mode;
    mode = fs.F_OK;
  }
  path5 = getValidatedPath(path5).toString();
  mode = getValidMode(mode, "access");
  const cb = makeCallback(callback);
  Deno.lstat(path5).then((info) => {
    if (info.mode === null) {
      cb(null);
      return;
    }
    const m2 = +mode || 0;
    let fileMode = +info.mode || 0;
    if (Deno.build.os !== "windows" && info.uid === Deno.uid()) {
      fileMode >>= 6;
    }
    if ((m2 & fileMode) === m2) {
      cb(null);
    } else {
      const e = new Error(`EACCES: permission denied, access '${path5}'`);
      e.path = path5;
      e.syscall = "access";
      e.errno = codeMap.get("EACCES");
      e.code = "EACCES";
      cb(e);
    }
  }, (err) => {
    if (err instanceof Deno.errors.NotFound) {
      const e = new Error(
        `ENOENT: no such file or directory, access '${path5}'`
      );
      e.path = path5;
      e.syscall = "access";
      e.errno = codeMap.get("ENOENT");
      e.code = "ENOENT";
      cb(e);
    } else {
      cb(err);
    }
  });
}
var accessPromise = promisify(access);
function accessSync(path5, mode) {
  path5 = getValidatedPath(path5).toString();
  mode = getValidMode(mode, "access");
  try {
    const info = Deno.lstatSync(path5.toString());
    if (info.mode === null) {
      return;
    }
    const m2 = +mode || 0;
    let fileMode = +info.mode || 0;
    if (Deno.build.os !== "windows" && info.uid === Deno.uid()) {
      fileMode >>= 6;
    }
    if ((m2 & fileMode) === m2) {
    } else {
      const e = new Error(`EACCES: permission denied, access '${path5}'`);
      e.path = path5;
      e.syscall = "access";
      e.errno = codeMap.get("EACCES");
      e.code = "EACCES";
      throw e;
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      const e = new Error(
        `ENOENT: no such file or directory, access '${path5}'`
      );
      e.path = path5;
      e.syscall = "access";
      e.errno = codeMap.get("ENOENT");
      e.code = "ENOENT";
      throw e;
    } else {
      throw err;
    }
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_writeFile.ts
const _tryAgainSymbol = Symbol("tryAgain");
function writeFile(pathOrRid, data, optOrCallback, callback, _tryAgain) {
  const callbackFn = optOrCallback instanceof Function ? optOrCallback : callback;
  const options = optOrCallback instanceof Function ? void 0 : optOrCallback;
  if (!callbackFn) {
    throw new TypeError("Callback must be a function.");
  }
  pathOrRid = pathOrRid instanceof URL ? fromFileUrl6(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : void 0;
  const mode = isFileOptions(options) ? options.mode : void 0;
  const encoding = checkEncoding(getEncoding(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (!ArrayBuffer.isView(data)) {
    validateStringAfterArrayBufferView(data, "data");
    if (typeof data !== "string") {
      showStringCoercionDeprecation();
    }
    data = Buffer2.from(String(data), encoding);
  }
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;
  (async () => {
    try {
      file = isRid ? new Deno.FsFile(pathOrRid) : await Deno.open(pathOrRid, openOptions);
      if (!isRid && mode && !isWindows) {
        await Deno.chmod(pathOrRid, mode);
      }
      const signal = isFileOptions(options) ? options.signal : void 0;
      await writeAll2(file, data, { signal });
    } catch (e) {
      // a hacky fix for what is probably a race condition causing a permissions error
      if (_tryAgain != _tryAgainSymbol) {
        return writeFile(pathOrRid, data, optOrCallback, callback, _tryAgainSymbol)
      }
      error = e instanceof Error ?  denoErrorToNodeError(e, { syscall: "write" }) : new Error("[non-error thrown]");
    } finally {
      if (!isRid && file)
        file.close();
      callbackFn(error);
    }
  })();
}
var writeFilePromise = promisify(writeFile);
function writeFileSync(pathOrRid, data, options) {
  pathOrRid = pathOrRid instanceof URL ? fromFileUrl6(pathOrRid) : pathOrRid;
  const flag = isFileOptions(options) ? options.flag : void 0;
  const mode = isFileOptions(options) ? options.mode : void 0;
  const encoding = checkEncoding(getEncoding(options)) || "utf8";
  const openOptions = getOpenOptions(flag || "w");
  if (!ArrayBuffer.isView(data)) {
    validateStringAfterArrayBufferView(data, "data");
    if (typeof data !== "string") {
      showStringCoercionDeprecation();
    }
    data = Buffer2.from(String(data), encoding);
  }
  const isRid = typeof pathOrRid === "number";
  let file;
  let error = null;
  try {
    file = isRid ? new Deno.FsFile(pathOrRid) : Deno.openSync(pathOrRid, openOptions);
    if (!isRid && mode && !isWindows) {
      Deno.chmodSync(pathOrRid, mode);
    }
    writeAllSync(file, data);
  } catch (e) {
    error = e instanceof Error ? denoErrorToNodeError(e, { syscall: "write" }) : new Error("[non-error thrown]");
  } finally {
    if (!isRid && file)
      file.close();
  }
  if (error)
    throw error;
}
async function writeAll2(w, arr, options = {}) {
  const { offset = 0, length = arr.byteLength, signal } = options;
  checkAborted(signal);
  const written = await w.write(arr.subarray(offset, offset + length));
  if (written === length) {
    return;
  }
  await writeAll2(w, arr, {
    offset: offset + written,
    length: length - written,
    signal
  });
}
function checkAborted(signal) {
  if (signal?.aborted) {
    throw new AbortError();
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_appendFile.ts
function appendFile(path5, data, options, callback) {
  callback = maybeCallback(callback || options);
  options = getOptions2(options, { encoding: "utf8", mode: 438, flag: "a" });
  options = copyObject(options);
  if (!options.flag || isUint32(path5)) {
    options.flag = "a";
  }
  writeFile(path5, data, options, callback);
}
var appendFilePromise = promisify(appendFile);
function appendFileSync(path5, data, options) {
  options = getOptions2(options, { encoding: "utf8", mode: 438, flag: "a" });
  options = copyObject(options);
  if (!options.flag || isUint32(path5)) {
    options.flag = "a";
  }
  writeFileSync(path5, data, options);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_chmod.ts
function chmod(path5, mode, callback) {
  path5 = getValidatedPath(path5).toString();
  mode = parseFileMode(mode, "mode");
  Deno.chmod(toNamespacedPath3(path5), mode).catch((error) => {
    if (!(error instanceof Deno.errors.NotSupported)) {
      throw error;
    }
  }).then(
    () => callback(null),
    callback
  );
}
var chmodPromise = promisify(chmod);
function chmodSync(path5, mode) {
  path5 = getValidatedPath(path5).toString();
  mode = parseFileMode(mode, "mode");
  try {
    Deno.chmodSync(toNamespacedPath3(path5), mode);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotSupported)) {
      throw error;
    }
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_chown.ts
function chown(path5, uid, gid, callback) {
  callback = makeCallback(callback);
  path5 = getValidatedPath(path5).toString();
  validateInteger(uid, "uid", -1, kMaxUserId);
  validateInteger(gid, "gid", -1, kMaxUserId);
  Deno.chown(toNamespacedPath3(path5), uid, gid).then(
    () => callback(null),
    callback
  );
}
var chownPromise = promisify(chown);
function chownSync(path5, uid, gid) {
  path5 = getValidatedPath(path5).toString();
  validateInteger(uid, "uid", -1, kMaxUserId);
  validateInteger(gid, "gid", -1, kMaxUserId);
  Deno.chownSync(toNamespacedPath3(path5), uid, gid);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_close.ts
function close(fd, callback) {
  fd = getValidatedFd(fd);
  setTimeout(() => {
    let error = null;
    try {
      Deno.close(fd);
    } catch (err) {
      error = err instanceof Error ? err : new Error("[non-error thrown]");
    }
    callback(error);
  }, 0);
}
function closeSync(fd) {
  fd = getValidatedFd(fd);
  Deno.close(fd);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_copy.ts
function copyFile(src, dest, mode, callback) {
  if (typeof mode === "function") {
    callback = mode;
    mode = 0;
  }
  const srcStr = getValidatedPath(src, "src").toString();
  const destStr = getValidatedPath(dest, "dest").toString();
  const modeNum = getValidMode(mode, "copyFile");
  const cb = makeCallback(callback);
  if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
    Deno.lstat(destStr).then(() => {
      const e = new Error(
        `EEXIST: file already exists, copyfile '${srcStr}' -> '${destStr}'`
      );
      e.syscall = "copyfile";
      e.errno = codeMap.get("EEXIST");
      e.code = "EEXIST";
      cb(e);
    }, (e) => {
      if (e instanceof Deno.errors.NotFound) {
        Deno.copyFile(srcStr, destStr).then(() => cb(null), cb);
      }
      cb(e);
    });
  } else {
    Deno.copyFile(srcStr, destStr).then(() => cb(null), cb);
  }
}
var copyFilePromise = promisify(copyFile);
function copyFileSync(src, dest, mode) {
  const srcStr = getValidatedPath(src, "src").toString();
  const destStr = getValidatedPath(dest, "dest").toString();
  const modeNum = getValidMode(mode, "copyFile");
  if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
    try {
      Deno.lstatSync(destStr);
      throw new Error(`A file exists at the destination: ${destStr}`);
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        Deno.copyFileSync(srcStr, destStr);
      }
      throw e;
    }
  } else {
    Deno.copyFileSync(srcStr, destStr);
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_dirent.ts
var Dirent2 = class {
  constructor(entry) {
    this.entry = entry;
  }
  isBlockDevice() {
    notImplemented("Deno does not yet support identification of block devices");
    return false;
  }
  isCharacterDevice() {
    notImplemented(
      "Deno does not yet support identification of character devices"
    );
    return false;
  }
  isDirectory() {
    return this.entry.isDirectory;
  }
  isFIFO() {
    notImplemented(
      "Deno does not yet support identification of FIFO named pipes"
    );
    return false;
  }
  isFile() {
    return this.entry.isFile;
  }
  isSocket() {
    notImplemented("Deno does not yet support identification of sockets");
    return false;
  }
  isSymbolicLink() {
    return this.entry.isSymlink;
  }
  get name() {
    return this.entry.name;
  }
};

// https://deno.land/std@0.177.0/node/_fs/_fs_dir.ts
var Dir = class {
  #dirPath;
  #syncIterator;
  #asyncIterator;
  constructor(path5) {
    if (!path5) {
      throw new ERR_MISSING_ARGS("path");
    }
    this.#dirPath = path5;
  }
  get path() {
    if (this.#dirPath instanceof Uint8Array) {
      return new TextDecoder().decode(this.#dirPath);
    }
    return this.#dirPath;
  }
  // deno-lint-ignore no-explicit-any
  read(callback) {
    return new Promise((resolve7, reject) => {
      if (!this.#asyncIterator) {
        this.#asyncIterator = Deno.readDir(this.path)[Symbol.asyncIterator]();
      }
      assert(this.#asyncIterator);
      this.#asyncIterator.next().then((iteratorResult) => {
        resolve7(
          iteratorResult.done ? null : new Dirent2(iteratorResult.value)
        );
        if (callback) {
          callback(
            null,
            iteratorResult.done ? null : new Dirent2(iteratorResult.value)
          );
        }
      }, (err) => {
        if (callback) {
          callback(err);
        }
        reject(err);
      });
    });
  }
  readSync() {
    if (!this.#syncIterator) {
      this.#syncIterator = Deno.readDirSync(this.path)[Symbol.iterator]();
    }
    const iteratorResult = this.#syncIterator.next();
    if (iteratorResult.done) {
      return null;
    } else {
      return new Dirent2(iteratorResult.value);
    }
  }
  /**
   * Unlike Node, Deno does not require managing resource ids for reading
   * directories, and therefore does not need to close directories when
   * finished reading.
   */
  // deno-lint-ignore no-explicit-any
  close(callback) {
    return new Promise((resolve7) => {
      if (callback) {
        callback(null);
      }
      resolve7();
    });
  }
  /**
   * Unlike Node, Deno does not require managing resource ids for reading
   * directories, and therefore does not need to close directories when
   * finished reading
   */
  closeSync() {
  }
  async *[Symbol.asyncIterator]() {
    try {
      while (true) {
        const dirent = await this.read();
        if (dirent === null) {
          break;
        }
        yield dirent;
      }
    } finally {
      await this.close();
    }
  }
};

// https://deno.land/std@0.177.0/node/_fs/_fs_exists.ts
function exists(path5, callback) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  Deno.lstat(path5).then(() => callback(true), () => callback(false));
}
var kCustomPromisifiedSymbol2 = Symbol.for("nodejs.util.promisify.custom");
Object.defineProperty(exists, kCustomPromisifiedSymbol2, {
  value: (path5) => {
    return new Promise((resolve7) => {
      exists(path5, (exists2) => resolve7(exists2));
    });
  }
});
function existsSync(path5) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  try {
    Deno.lstatSync(path5);
    return true;
  } catch (_err) {
    return false;
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_fdatasync.ts
function fdatasync(fd, callback) {
  Deno.fdatasync(fd).then(() => callback(null), callback);
}
function fdatasyncSync(fd) {
  Deno.fdatasyncSync(fd);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_fstat.ts
function fstat(fd, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : { bigint: false };
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.fstat(fd).then(
    (stat2) => callback(null, CFISBIS(stat2, options.bigint)),
    (err) => callback(err)
  );
}
function fstatSync(fd, options) {
  const origin = Deno.fstatSync(fd);
  return CFISBIS(origin, options?.bigint || false);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_fsync.ts
function fsync(fd, callback) {
  Deno.fsync(fd).then(() => callback(null), callback);
}
function fsyncSync(fd) {
  Deno.fsyncSync(fd);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_ftruncate.ts
function ftruncate(fd, lenOrCallback, maybeCallback2) {
  const len = typeof lenOrCallback === "number" ? lenOrCallback : void 0;
  const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback2;
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.ftruncate(fd, len).then(() => callback(null), callback);
}
function ftruncateSync(fd, len) {
  Deno.ftruncateSync(fd, len);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_futimes.ts
function getValidTime(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }
  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(
      `invalid ${name}, must not be infinity or NaN`
    );
  }
  return time;
}
function futimes(fd, atime, mtime, callback) {
  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  Deno.futime(fd, atime, mtime).then(() => callback(null), callback);
}
function futimesSync(fd, atime, mtime) {
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");
  Deno.futimeSync(fd, atime, mtime);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_link.ts
function link(existingPath, newPath, callback) {
  existingPath = existingPath instanceof URL ? fromFileUrl6(existingPath) : existingPath;
  newPath = newPath instanceof URL ? fromFileUrl6(newPath) : newPath;
  Deno.link(existingPath, newPath).then(() => callback(null), callback);
}
var linkPromise = promisify(link);
function linkSync(existingPath, newPath) {
  existingPath = existingPath instanceof URL ? fromFileUrl6(existingPath) : existingPath;
  newPath = newPath instanceof URL ? fromFileUrl6(newPath) : newPath;
  Deno.linkSync(existingPath, newPath);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_mkdir.ts
function mkdir(path5, options, callback) {
  path5 = getValidatedPath(path5);
  let mode = 511;
  let recursive = false;
  if (typeof options == "function") {
    callback = options;
  } else if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== void 0)
      recursive = options.recursive;
    if (options.mode !== void 0)
      mode = options.mode;
  }
  validateBoolean(recursive, "options.recursive");
  Deno.mkdir(path5, { recursive, mode }).then(() => {
    if (typeof callback === "function") {
      callback(null);
    }
  }, (err) => {
    if (typeof callback === "function") {
      callback(err);
    }
  });
}
var mkdirPromise = promisify(mkdir);
function mkdirSync(path5, options) {
  path5 = getValidatedPath(path5);
  let mode = 511;
  let recursive = false;
  if (typeof options === "number") {
    mode = options;
  } else if (typeof options === "boolean") {
    recursive = options;
  } else if (options) {
    if (options.recursive !== void 0)
      recursive = options.recursive;
    if (options.mode !== void 0)
      mode = options.mode;
  }
  validateBoolean(recursive, "options.recursive");
  try {
    Deno.mkdirSync(path5, { recursive, mode });
  } catch (err) {
    throw denoErrorToNodeError(err, { syscall: "mkdir", path: path5 });
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_mkdtemp.ts
function mkdtemp(prefix, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback == "function" ? optionsOrCallback : maybeCallback2;
  if (!callback) {
    throw new ERR_INVALID_ARG_TYPE("callback", "function", callback);
  }
  const encoding = parseEncoding(optionsOrCallback);
  const path5 = tempDirPath(prefix);
  mkdir(
    path5,
    { recursive: false, mode: 448 },
    (err) => {
      if (err)
        callback(err);
      else
        callback(null, decode3(path5, encoding));
    }
  );
}
var mkdtempPromise = promisify(mkdtemp);
function mkdtempSync(prefix, options) {
  const encoding = parseEncoding(options);
  const path5 = tempDirPath(prefix);
  mkdirSync(path5, { recursive: false, mode: 448 });
  return decode3(path5, encoding);
}
function parseEncoding(optionsOrCallback) {
  let encoding;
  if (typeof optionsOrCallback == "function")
    encoding = void 0;
  else if (optionsOrCallback instanceof Object) {
    encoding = optionsOrCallback?.encoding;
  } else
    encoding = optionsOrCallback;
  if (encoding) {
    try {
      new TextDecoder(encoding);
    } catch {
      throw new ERR_INVALID_OPT_VALUE_ENCODING(encoding);
    }
  }
  return encoding;
}
function decode3(str, encoding) {
  if (!encoding)
    return str;
  else {
    const decoder2 = new TextDecoder(encoding);
    const encoder = new TextEncoder();
    return decoder2.decode(encoder.encode(str));
  }
}
var CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function randomName() {
  return [...Array(6)].map(
    () => CHARS[Math.floor(Math.random() * CHARS.length)]
  ).join("");
}
function tempDirPath(prefix) {
  let path5;
  do {
    path5 = prefix + randomName();
  } while (existsSync(path5));
  return path5;
}

// https://deno.land/std@0.177.0/fs/exists.ts
function existsSync2(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_open.ts
var FLAGS_AX = O_APPEND | O_CREAT | O_WRONLY | O_EXCL;
var FLAGS_AX_PLUS = O_APPEND | O_CREAT | O_RDWR | O_EXCL;
var FLAGS_WX = O_TRUNC | O_CREAT | O_WRONLY | O_EXCL;
var FLAGS_WX_PLUS = O_TRUNC | O_CREAT | O_RDWR | O_EXCL;
function convertFlagAndModeToOptions(flag, mode) {
  if (!flag && !mode)
    return void 0;
  if (!flag && mode)
    return { mode };
  return { ...getOpenOptions(flag), mode };
}
function open(path5, flags, mode, callback) {
  if (flags === void 0) {
    throw new ERR_INVALID_ARG_TYPE(
      "flags or callback",
      ["string", "function"],
      flags
    );
  }
  path5 = getValidatedPath(path5);
  if (arguments.length < 3) {
    callback = flags;
    flags = "r";
    mode = 438;
  } else if (typeof mode === "function") {
    callback = mode;
    mode = 438;
  } else {
    mode = parseFileMode(mode, "mode", 438);
  }
  if (typeof callback !== "function") {
    throw new ERR_INVALID_ARG_TYPE(
      "callback",
      "function",
      callback
    );
  }
  if (flags === void 0) {
    flags = "r";
  }
  if (existenceCheckRequired(flags) && existsSync2(path5)) {
    const err = new Error(`EEXIST: file already exists, open '${path5}'`);
    callback(err);
  } else {
    if (flags === "as" || flags === "as+") {
      let err = null, res;
      try {
        res = openSync(path5, flags, mode);
      } catch (error) {
        err = error instanceof Error ? error : new Error("[non-error thrown]");
      }
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
      return;
    }
    Deno.open(
      path5,
      convertFlagAndModeToOptions(flags, mode)
    ).then(
      (file) => callback(null, file.rid),
      (err) => callback(err)
    );
  }
}
var openPromise = promisify(open);
function openSync(path5, flags, maybeMode) {
  const mode = parseFileMode(maybeMode, "mode", 438);
  path5 = getValidatedPath(path5);
  if (flags === void 0) {
    flags = "r";
  }
  if (existenceCheckRequired(flags) && existsSync2(path5)) {
    throw new Error(`EEXIST: file already exists, open '${path5}'`);
  }
  return Deno.openSync(path5, convertFlagAndModeToOptions(flags, mode)).rid;
}
function existenceCheckRequired(flags) {
  return typeof flags === "string" && ["ax", "ax+", "wx", "wx+"].includes(flags) || typeof flags === "number" && ((flags & FLAGS_AX) === FLAGS_AX || (flags & FLAGS_AX_PLUS) === FLAGS_AX_PLUS || (flags & FLAGS_WX) === FLAGS_WX || (flags & FLAGS_WX_PLUS) === FLAGS_WX_PLUS);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_opendir.ts
function _validateFunction(callback) {
  validateFunction(callback, "callback");
}
function opendir(path5, options, callback) {
  callback = typeof options === "function" ? options : callback;
  _validateFunction(callback);
  path5 = getValidatedPath(path5).toString();
  let err, dir;
  try {
    const { bufferSize } = getOptions2(options, {
      encoding: "utf8",
      bufferSize: 32
    });
    validateInteger(bufferSize, "options.bufferSize", 1, 4294967295);
    Deno.readDirSync(path5);
    dir = new Dir(path5);
  } catch (error) {
    err = denoErrorToNodeError(error, { syscall: "opendir" });
  }
  if (err) {
    callback(err);
  } else {
    callback(null, dir);
  }
}
var opendirPromise = promisify(opendir);
function opendirSync(path5, options) {
  path5 = getValidatedPath(path5).toString();
  const { bufferSize } = getOptions2(options, {
    encoding: "utf8",
    bufferSize: 32
  });
  validateInteger(bufferSize, "options.bufferSize", 1, 4294967295);
  try {
    Deno.readDirSync(path5);
    return new Dir(path5);
  } catch (err) {
    throw denoErrorToNodeError(err, { syscall: "opendir" });
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_read.ts
function read(fd, optOrBufferOrCb, offsetOrCallback, length, position, callback) {
  let cb;
  let offset = 0, buffer;
  if (typeof fd !== "number") {
    throw new ERR_INVALID_ARG_TYPE("fd", "number", fd);
  }
  if (length == null) {
    length = 0;
  }
  if (typeof offsetOrCallback === "function") {
    cb = offsetOrCallback;
  } else if (typeof optOrBufferOrCb === "function") {
    cb = optOrBufferOrCb;
  } else {
    offset = offsetOrCallback;
    validateInteger(offset, "offset", 0);
    cb = callback;
  }
  if (optOrBufferOrCb instanceof Buffer2 || optOrBufferOrCb instanceof Uint8Array) {
    buffer = optOrBufferOrCb;
  } else if (typeof optOrBufferOrCb === "function") {
    offset = 0;
    buffer = Buffer2.alloc(16384);
    length = buffer.byteLength;
    position = null;
  } else {
    const opt = optOrBufferOrCb;
    if (!(opt.buffer instanceof Buffer2) && !(opt.buffer instanceof Uint8Array)) {
      if (opt.buffer === null) {
        length = opt.buffer.byteLength;
      }
      throw new ERR_INVALID_ARG_TYPE("buffer", [
        "Buffer",
        "TypedArray",
        "DataView"
      ], optOrBufferOrCb);
    }
    offset = opt.offset ?? 0;
    buffer = opt.buffer ?? Buffer2.alloc(16384);
    length = opt.length ?? buffer.byteLength;
    position = opt.position ?? null;
  }
  if (position == null) {
    position = -1;
  }
  validatePosition(position);
  validateOffsetLengthRead(offset, length, buffer.byteLength);
  if (!cb)
    throw new ERR_INVALID_ARG_TYPE("cb", "Callback", cb);
  (async () => {
    try {
      let nread;
      if (typeof position === "number" && position >= 0) {
        const currentPosition = await Deno.seek(fd, 0, Deno.SeekMode.Current);
        Deno.seekSync(fd, position, Deno.SeekMode.Start);
        nread = Deno.readSync(fd, buffer);
        Deno.seekSync(fd, currentPosition, Deno.SeekMode.Start);
      } else {
        nread = await Deno.read(fd, buffer);
      }
      cb(null, nread ?? 0, Buffer2.from(buffer.buffer, offset, length));
    } catch (error) {
      cb(error, null);
    }
  })();
}
function readSync(fd, buffer, offsetOrOpt, length, position) {
  let offset = 0;
  if (typeof fd !== "number") {
    throw new ERR_INVALID_ARG_TYPE("fd", "number", fd);
  }
  validateBuffer(buffer);
  if (length == null) {
    length = 0;
  }
  if (typeof offsetOrOpt === "number") {
    offset = offsetOrOpt;
    validateInteger(offset, "offset", 0);
  } else {
    const opt = offsetOrOpt;
    offset = opt.offset ?? 0;
    length = opt.length ?? buffer.byteLength;
    position = opt.position ?? null;
  }
  if (position == null) {
    position = -1;
  }
  validatePosition(position);
  validateOffsetLengthRead(offset, length, buffer.byteLength);
  let currentPosition = 0;
  if (typeof position === "number" && position >= 0) {
    currentPosition = Deno.seekSync(fd, 0, Deno.SeekMode.Current);
    Deno.seekSync(fd, position, Deno.SeekMode.Start);
  }
  const numberOfBytesRead = Deno.readSync(fd, buffer);
  if (typeof position === "number" && position >= 0) {
    Deno.seekSync(fd, currentPosition, Deno.SeekMode.Start);
  }
  return numberOfBytesRead ?? 0;
}

// https://deno.land/std@0.177.0/node/_fs/_fs_watch.ts
var statPromisified = promisify(stat);
var statAsync = async (filename) => {
  try {
    return await statPromisified(filename);
  } catch {
    return emptyStats;
  }
};
var emptyStats = new Stats2(
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  Date.UTC(1970, 0, 1, 0, 0, 0),
  Date.UTC(1970, 0, 1, 0, 0, 0),
  Date.UTC(1970, 0, 1, 0, 0, 0),
  Date.UTC(1970, 0, 1, 0, 0, 0)
);
function asyncIterableToCallback(iter, callback, errCallback) {
  const iterator = iter[Symbol.asyncIterator]();
  function next() {
    iterator.next().then((obj) => {
      if (obj.done) {
        callback(obj.value, true);
        return;
      }
      callback(obj.value);
      next();
    }, errCallback);
  }
  next();
}
function watch(filename, optionsOrListener, optionsOrListener2) {
  const listener = typeof optionsOrListener === "function" ? optionsOrListener : typeof optionsOrListener2 === "function" ? optionsOrListener2 : void 0;
  const options = typeof optionsOrListener === "object" ? optionsOrListener : typeof optionsOrListener2 === "object" ? optionsOrListener2 : void 0;
  const watchPath = getValidatedPath(filename).toString();
  let iterator;
  const timer = setTimeout(() => {
    iterator = Deno.watchFs(watchPath, {
      recursive: options?.recursive || false
    });
    asyncIterableToCallback(iterator, (val, done) => {
      if (done)
        return;
      fsWatcher.emit(
        "change",
        convertDenoFsEventToNodeFsEvent(val.kind),
        basename6(val.paths[0])
      );
    }, (e) => {
      fsWatcher.emit("error", e);
    });
  }, 5);
  const fsWatcher = new FSWatcher(() => {
    clearTimeout(timer);
    try {
      iterator?.close();
    } catch (e) {
      if (e instanceof Deno.errors.BadResource) {
        return;
      }
      throw e;
    }
  });
  if (listener) {
    fsWatcher.on("change", listener.bind({ _handle: fsWatcher }));
  }
  return fsWatcher;
}
var watchPromise = promisify(watch);
function watchFile(filename, listenerOrOptions, listener) {
  const watchPath = getValidatedPath(filename).toString();
  const handler = typeof listenerOrOptions === "function" ? listenerOrOptions : listener;
  validateFunction(handler, "listener");
  const {
    bigint = false,
    persistent = true,
    interval = 5007
  } = typeof listenerOrOptions === "object" ? listenerOrOptions : {};
  let stat2 = statWatchers.get(watchPath);
  if (stat2 === void 0) {
    stat2 = new StatWatcher(bigint);
    stat2[kFSStatWatcherStart](watchPath, persistent, interval);
    statWatchers.set(watchPath, stat2);
  }
  stat2.addListener("change", listener);
  return stat2;
}
function unwatchFile(filename, listener) {
  const watchPath = getValidatedPath(filename).toString();
  const stat2 = statWatchers.get(watchPath);
  if (!stat2) {
    return;
  }
  if (typeof listener === "function") {
    const beforeListenerCount = stat2.listenerCount("change");
    stat2.removeListener("change", listener);
    if (stat2.listenerCount("change") < beforeListenerCount) {
      stat2[kFSStatWatcherAddOrCleanRef]("clean");
    }
  } else {
    stat2.removeAllListeners("change");
    stat2[kFSStatWatcherAddOrCleanRef]("cleanAll");
  }
  if (stat2.listenerCount("change") === 0) {
    stat2.stop();
    statWatchers.delete(watchPath);
  }
}
var statWatchers = /* @__PURE__ */ new Map();
var kFSStatWatcherStart = Symbol("kFSStatWatcherStart");
var kFSStatWatcherAddOrCleanRef = Symbol("kFSStatWatcherAddOrCleanRef");
var StatWatcher = class extends EventEmitter {
  #bigint;
  #refCount = 0;
  #abortController = new AbortController();
  constructor(bigint) {
    super();
    this.#bigint = bigint;
  }
  [kFSStatWatcherStart](filename, persistent, interval) {
    if (persistent) {
      this.#refCount++;
    }
    (async () => {
      let prev = await statAsync(filename);
      if (prev === emptyStats) {
        this.emit("change", prev, prev);
      }
      try {
        while (true) {
          await delay(interval, { signal: this.#abortController.signal });
          const curr = await statAsync(filename);
          if (curr?.mtime !== prev?.mtime) {
            this.emit("change", curr, prev);
            prev = curr;
          }
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        this.emit("error", e);
      }
    })();
  }
  [kFSStatWatcherAddOrCleanRef](addOrClean) {
    if (addOrClean === "add") {
      this.#refCount++;
    } else if (addOrClean === "clean") {
      this.#refCount--;
    } else {
      this.#refCount = 0;
    }
  }
  stop() {
    if (this.#abortController.signal.aborted) {
      return;
    }
    this.#abortController.abort();
    this.emit("stop");
  }
  ref() {
    notImplemented("FSWatcher.ref() is not implemented");
  }
  unref() {
    notImplemented("FSWatcher.unref() is not implemented");
  }
};
var FSWatcher = class extends EventEmitter {
  #closer;
  #closed = false;
  constructor(closer) {
    super();
    this.#closer = closer;
  }
  close() {
    if (this.#closed) {
      return;
    }
    this.#closed = true;
    this.emit("close");
    this.#closer();
  }
  ref() {
    notImplemented("FSWatcher.ref() is not implemented");
  }
  unref() {
    notImplemented("FSWatcher.unref() is not implemented");
  }
};
function convertDenoFsEventToNodeFsEvent(kind) {
  if (kind === "create" || kind === "remove") {
    return "rename";
  } else {
    return "change";
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_readdir.ts
function toDirent(val) {
  return new Dirent2(val);
}
function readdir(path5, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
  const result = [];
  path5 = getValidatedPath(path5);
  if (!callback)
    throw new Error("No callback function supplied");
  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch {
      throw new Error(
        `TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`
      );
    }
  }
  try {
    asyncIterableToCallback(Deno.readDir(path5.toString()), (val, done) => {
      if (typeof path5 !== "string")
        return;
      if (done) {
        callback(null, result);
        return;
      }
      if (options?.withFileTypes) {
        result.push(toDirent(val));
      } else
        result.push(decode4(val.name));
    }, (e) => {
      callback(denoErrorToNodeError(e, { syscall: "readdir" }));
    });
  } catch (e) {
    callback(denoErrorToNodeError(e, { syscall: "readdir" }));
  }
}
function decode4(str, encoding) {
  if (!encoding)
    return str;
  else {
    const decoder2 = new TextDecoder(encoding);
    const encoder = new TextEncoder();
    return decoder2.decode(encoder.encode(str));
  }
}
var readdirPromise = promisify(readdir);
function readdirSync(path5, options) {
  const result = [];
  path5 = getValidatedPath(path5);
  if (options?.encoding) {
    try {
      new TextDecoder(options.encoding);
    } catch {
      throw new Error(
        `TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`
      );
    }
  }
  try {
    for (const file of Deno.readDirSync(path5.toString())) {
      if (options?.withFileTypes) {
        result.push(toDirent(file));
      } else
        result.push(decode4(file.name));
    }
  } catch (e) {
    throw denoErrorToNodeError(e, { syscall: "readdir" });
  }
  return result;
}

// https://deno.land/std@0.177.0/node/_fs/_fs_readFile.ts
function maybeDecode(data, encoding) {
  const buffer = Buffer2.from(data.buffer, data.byteOffset, data.byteLength);
  if (encoding && encoding !== "binary")
    return buffer.toString(encoding);
  return buffer;
}
function readFile(path5, optOrCallback, callback) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  if (path5 === ""||path5 instanceof Function) {
    throw Error(`readFile invalid arg for path: ${path5.toString()}`)
  }
  let cb;
  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }
  const encoding = getEncoding(optOrCallback);
  const p = Deno.readFile(path5);
  p.catch((error)=>{
    if (cb) {
      cb(error, null)
    } else {
        throw error
    }
  })
  if (cb) {
    p.then((data) => {
      if (encoding && encoding !== "binary") {
        const text = maybeDecode(data, encoding);
        return cb(null, text);
      }
      const buffer = maybeDecode(data, encoding);
      cb(null, buffer);
    }, (err) => cb && cb(err));
  }
}
var readFilePromise = promisify(readFile);
function readFileSync(path5, opt) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  const data = Deno.readFileSync(path5);
  const encoding = getEncoding(opt);
  if (encoding && encoding !== "binary") {
    const text = maybeDecode(data, encoding);
    return text;
  }
  const buffer = maybeDecode(data, encoding);
  return buffer;
}

// https://deno.land/std@0.177.0/node/_fs/_fs_readlink.ts
function maybeEncode(data, encoding) {
  if (encoding === "buffer") {
    return new TextEncoder().encode(data);
  }
  return data;
}
function getEncoding2(optOrCallback) {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  } else {
    if (optOrCallback.encoding) {
      if (optOrCallback.encoding === "utf8" || optOrCallback.encoding === "utf-8") {
        return "utf8";
      } else if (optOrCallback.encoding === "buffer") {
        return "buffer";
      } else {
        notImplemented(`fs.readlink encoding=${optOrCallback.encoding}`);
      }
    }
    return null;
  }
}
function readlink(path5, optOrCallback, callback) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  let cb;
  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }
  const encoding = getEncoding2(optOrCallback);
  intoCallbackAPIWithIntercept(
    Deno.readLink,
    (data) => maybeEncode(data, encoding),
    cb,
    path5
  );
}
var readlinkPromise = promisify(readlink);
function readlinkSync(path5, opt) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  return maybeEncode(Deno.readLinkSync(path5), getEncoding2(opt));
}

// https://deno.land/std@0.177.0/node/_fs/_fs_realpath.ts
function realpath(path5, options, callback) {
  if (typeof options === "function") {
    callback = options;
  }
  if (!callback) {
    throw new Error("No callback function supplied");
  }
  Deno.realPath(path5).then(
    (path6) => callback(null, path6),
    (err) => callback(err)
  );
}
realpath.native = realpath;
var realpathPromise = promisify(realpath);
function realpathSync(path5) {
  return Deno.realPathSync(path5);
}
realpathSync.native = realpathSync;

// https://deno.land/std@0.177.0/node/_fs/_fs_rename.ts
function rename(oldPath, newPath, callback) {
  oldPath = oldPath instanceof URL ? fromFileUrl6(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fromFileUrl6(newPath) : newPath;
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.rename(oldPath, newPath).then((_) => callback(), callback);
}
var renamePromise = promisify(rename);
function renameSync(oldPath, newPath) {
  oldPath = oldPath instanceof URL ? fromFileUrl6(oldPath) : oldPath;
  newPath = newPath instanceof URL ? fromFileUrl6(newPath) : newPath;
  Deno.renameSync(oldPath, newPath);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_rmdir.ts
function rmdir(path5, optionsOrCallback, maybeCallback2) {
  path5 = toNamespacedPath6(getValidatedPath(path5));
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : void 0;
  if (!callback)
    throw new Error("No callback function supplied");
  if (options?.recursive) {
    emitRecursiveRmdirWarning();
    validateRmOptions(
      path5,
      { ...options, force: false },
      true,
      (err, options2) => {
        if (err === false) {
          return callback(new ERR_FS_RMDIR_ENOTDIR(path5.toString()));
        }
        if (err) {
          return callback(err);
        }
        Deno.remove(path5, { recursive: options2?.recursive }).then((_) => callback(), callback);
      }
    );
  } else {
    validateRmdirOptions(options);
    Deno.remove(path5, { recursive: options?.recursive }).then((_) => callback(), (err) => {
      callback(
        err instanceof Error ? denoErrorToNodeError(err, { syscall: "rmdir" }) : err
      );
    });
  }
}
var rmdirPromise = promisify(rmdir);
function rmdirSync(path5, options) {
  path5 = getValidatedPath(path5);
  if (options?.recursive) {
    emitRecursiveRmdirWarning();
    const optionsOrFalse = validateRmOptionsSync(path5, {
      ...options,
      force: false
    }, true);
    if (optionsOrFalse === false) {
      throw new ERR_FS_RMDIR_ENOTDIR(path5.toString());
    }
    options = optionsOrFalse;
  } else {
    validateRmdirOptions(options);
  }
  try {
    Deno.removeSync(toNamespacedPath6(path5), {
      recursive: options?.recursive
    });
  } catch (err) {
    throw err instanceof Error ? denoErrorToNodeError(err, { syscall: "rmdir" }) : err;
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_rm.ts
function rm(path5, optionsOrCallback, maybeCallback2) {
  const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
  const options = typeof optionsOrCallback === "object" ? optionsOrCallback : void 0;
  if (!callback)
    throw new Error("No callback function supplied");
  validateRmOptions(
    path5,
    options,
    false,
    (err, options2) => {
      if (err) {
        return callback(err);
      }
      Deno.remove(path5, { recursive: options2?.recursive }).then((_) => callback(null), (err2) => {
        if (options2?.force && err2 instanceof Deno.errors.NotFound) {
          callback(null);
        } else {
          callback(
            err2 instanceof Error ? denoErrorToNodeError(err2, { syscall: "rm" }) : err2
          );
        }
      });
    }
  );
}
var rmPromise = promisify(rm);
function rmSync(path5, options) {
  options = validateRmOptionsSync(path5, options, false);
  try {
    Deno.removeSync(path5, { recursive: options?.recursive });
  } catch (err) {
    if (options?.force && err instanceof Deno.errors.NotFound) {
      return;
    }
    if (err instanceof Error) {
      throw denoErrorToNodeError(err, { syscall: "stat" });
    } else {
      throw err;
    }
  }
}

// https://deno.land/std@0.177.0/node/_fs/_fs_symlink.ts
function symlink(target, path5, typeOrCallback, maybeCallback2) {
  target = target instanceof URL ? fromFileUrl6(target) : target;
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  const type = typeof typeOrCallback === "string" ? typeOrCallback : "file";
  const callback = typeof typeOrCallback === "function" ? typeOrCallback : maybeCallback2;
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.symlink(target, path5, { type }).then(() => callback(null), callback);
}
var symlinkPromise = promisify(symlink);
function symlinkSync(target, path5, type) {
  target = target instanceof URL ? fromFileUrl6(target) : target;
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  type = type || "file";
  Deno.symlinkSync(target, path5, { type });
}

// https://deno.land/std@0.177.0/node/_fs/_fs_truncate.ts
function truncate(path5, lenOrCallback, maybeCallback2) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  const len = typeof lenOrCallback === "number" ? lenOrCallback : void 0;
  const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback2;
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.truncate(path5, len).then(() => callback(null), callback);
}
var truncatePromise = promisify(truncate);
function truncateSync(path5, len) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  Deno.truncateSync(path5, len);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_unlink.ts
function unlink(path5, callback) {
  if (!callback)
    throw new Error("No callback function supplied");
  Deno.remove(path5).then((_) => callback(), callback);
}
var unlinkPromise = promisify(unlink);
function unlinkSync(path5) {
  Deno.removeSync(path5);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_utimes.ts
function getValidTime2(time, name) {
  if (typeof time === "string") {
    time = Number(time);
  }
  if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
    throw new Deno.errors.InvalidData(
      `invalid ${name}, must not be infinity or NaN`
    );
  }
  return time;
}
function utimes(path5, atime, mtime, callback) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }
  atime = getValidTime2(atime, "atime");
  mtime = getValidTime2(mtime, "mtime");
  Deno.utime(path5, atime, mtime).then(() => callback(null), callback);
}
var utimesPromise = promisify(utimes);
function utimesSync(path5, atime, mtime) {
  path5 = path5 instanceof URL ? fromFileUrl6(path5) : path5;
  atime = getValidTime2(atime, "atime");
  mtime = getValidTime2(mtime, "mtime");
  Deno.utimeSync(path5, atime, mtime);
}

// https://deno.land/std@0.177.0/node/_fs/_fs_write.mjs
function writeSync(fd, buffer, offset, length, position) {
  fd = getValidatedFd(fd);
  const innerWriteSync = (fd2, buffer2, offset2, length2, position2) => {
    if (buffer2 instanceof DataView) {
      buffer2 = new Uint8Array(buffer2.buffer);
    }
    if (typeof position2 === "number") {
      Deno.seekSync(fd2, position2, Deno.SeekMode.Start);
    }
    let currentOffset = offset2;
    const end = offset2 + length2;
    while (currentOffset - offset2 < length2) {
      currentOffset += Deno.writeSync(fd2, buffer2.subarray(currentOffset, end));
    }
    return currentOffset - offset2;
  };
  if (isArrayBufferView(buffer)) {
    if (position === void 0) {
      position = null;
    }
    if (offset == null) {
      offset = 0;
    } else {
      validateInteger(offset, "offset", 0);
    }
    if (typeof length !== "number") {
      length = buffer.byteLength - offset;
    }
    validateOffsetLengthWrite(offset, length, buffer.byteLength);
    return innerWriteSync(fd, buffer, offset, length, position);
  }
  validateStringAfterArrayBufferView(buffer, "buffer");
  validateEncoding(buffer, length);
  if (offset === void 0) {
    offset = null;
  }
  buffer = Buffer2.from(buffer, length);
  return innerWriteSync(fd, buffer, 0, buffer.length, position);
}
function write2(fd, buffer, offset, length, position, callback) {
  fd = getValidatedFd(fd);
  const innerWrite = async (fd2, buffer2, offset2, length2, position2) => {
    if (buffer2 instanceof DataView) {
      buffer2 = new Uint8Array(buffer2.buffer);
    }
    if (typeof position2 === "number") {
      await Deno.seek(fd2, position2, Deno.SeekMode.Start);
    }
    let currentOffset = offset2;
    const end = offset2 + length2;
    while (currentOffset - offset2 < length2) {
      currentOffset += await Deno.write(
        fd2,
        buffer2.subarray(currentOffset, end)
      );
    }
    return currentOffset - offset2;
  };
  if (isArrayBufferView(buffer)) {
    callback = maybeCallback(callback || position || length || offset);
    if (offset == null || typeof offset === "function") {
      offset = 0;
    } else {
      validateInteger(offset, "offset", 0);
    }
    if (typeof length !== "number") {
      length = buffer.byteLength - offset;
    }
    if (typeof position !== "number") {
      position = null;
    }
    validateOffsetLengthWrite(offset, length, buffer.byteLength);
    innerWrite(fd, buffer, offset, length, position).then(
      (nwritten) => {
        callback(null, nwritten, buffer);
      },
      (err) => callback(err)
    );
    return;
  }
  validateStringAfterArrayBufferView(buffer, "buffer");
  if (typeof buffer !== "string") {
    showStringCoercionDeprecation();
  }
  if (typeof position !== "function") {
    if (typeof offset === "function") {
      position = offset;
      offset = null;
    } else {
      position = length;
    }
    length = "utf-8";
  }
  const str = String(buffer);
  validateEncoding(str, length);
  callback = maybeCallback(position);
  buffer = Buffer2.from(str, length);
  innerWrite(fd, buffer, 0, buffer.length, offset, callback).then(
    (nwritten) => {
      callback(null, nwritten, buffer);
    },
    (err) => callback(err)
  );
}

// https://deno.land/std@0.177.0/node/_fs/_fs_writev.mjs
function writev(fd, buffers, position, callback) {
  const innerWritev = async (fd2, buffers2, position2) => {
    const chunks = [];
    const offset = 0;
    for (let i = 0; i < buffers2.length; i++) {
      if (Buffer2.isBuffer(buffers2[i])) {
        chunks.push(buffers2[i]);
      } else {
        chunks.push(Buffer2.from(buffers2[i]));
      }
    }
    if (typeof position2 === "number") {
      await Deno.seekSync(fd2, position2, Deno.SeekMode.Start);
    }
    const buffer = Buffer2.concat(chunks);
    let currentOffset = 0;
    while (currentOffset < buffer.byteLength) {
      currentOffset += await Deno.writeSync(fd2, buffer.subarray(currentOffset));
    }
    return currentOffset - offset;
  };
  fd = getValidatedFd(fd);
  validateBufferArray(buffers);
  callback = maybeCallback(callback || position);
  if (buffers.length === 0) {
    process.nextTick(callback, null, 0, buffers);
    return;
  }
  if (typeof position !== "number")
    position = null;
  innerWritev(fd, buffers, position).then(
    (nwritten) => {
      callback(null, nwritten, buffers);
    },
    (err) => callback(err)
  );
}
function writevSync(fd, buffers, position) {
  const innerWritev = (fd2, buffers2, position2) => {
    const chunks = [];
    const offset = 0;
    for (let i = 0; i < buffers2.length; i++) {
      if (Buffer2.isBuffer(buffers2[i])) {
        chunks.push(buffers2[i]);
      } else {
        chunks.push(Buffer2.from(buffers2[i]));
      }
    }
    if (typeof position2 === "number") {
      Deno.seekSync(fd2, position2, Deno.SeekMode.Start);
    }
    const buffer = Buffer2.concat(chunks);
    let currentOffset = 0;
    while (currentOffset < buffer.byteLength) {
      currentOffset += Deno.writeSync(fd2, buffer.subarray(currentOffset));
    }
    return currentOffset - offset;
  };
  fd = getValidatedFd(fd);
  validateBufferArray(buffers);
  if (buffers.length === 0) {
    return 0;
  }
  if (typeof position !== "number")
    position = null;
  return innerWritev(fd, buffers, position);
}

// https://deno.land/std@0.177.0/node/internal/fs/streams.mjs
var kIoDone = Symbol("kIoDone");
var kIsPerformingIO = Symbol("kIsPerformingIO");
var kFs = Symbol("kFs");
function _construct(callback) {
  const stream = this;
  if (typeof stream.fd === "number") {
    callback();
    return;
  }
  if (stream.open !== openWriteFs && stream.open !== openReadFs) {
    const orgEmit = stream.emit;
    stream.emit = function(...args) {
      if (args[0] === "open") {
        this.emit = orgEmit;
        callback();
        Reflect.apply(orgEmit, this, args);
      } else if (args[0] === "error") {
        this.emit = orgEmit;
        callback(args[1]);
      } else {
        Reflect.apply(orgEmit, this, args);
      }
    };
    stream.open();
  } else {
    stream[kFs].open(
      stream.path.toString(),
      stream.flags,
      stream.mode,
      (er, fd) => {
        if (er) {
          callback(er);
        } else {
          stream.fd = fd;
          callback();
          stream.emit("open", stream.fd);
          stream.emit("ready");
        }
      }
    );
  }
}
function close2(stream, err, cb) {
  if (!stream.fd) {
    cb(err);
  } else {
    stream[kFs].close(stream.fd, (er) => {
      cb(er || err);
    });
    stream.fd = null;
  }
}
function importFd(stream, options) {
  if (typeof options.fd === "number") {
    if (stream instanceof ReadStream) {
      stream[kFs] = options.fs || { read, close };
    }
    if (stream instanceof WriteStream) {
      stream[kFs] = options.fs || { write: write2, writev, close };
    }
    return options.fd;
  }
  throw new ERR_INVALID_ARG_TYPE("options.fd", ["number"], options.fd);
}
function ReadStream(path5, options) {
  if (!(this instanceof ReadStream)) {
    return new ReadStream(path5, options);
  }
  options = copyObject(getOptions2(options, kEmptyObject));
  if (options.highWaterMark === void 0) {
    options.highWaterMark = 64 * 1024;
  }
  if (options.autoDestroy === void 0) {
    options.autoDestroy = false;
  }
  if (options.fd == null) {
    this.fd = null;
    this[kFs] = options.fs || { open, read, close };
    validateFunction(this[kFs].open, "options.fs.open");
    this.path = toPathIfFileURL(path5);
    this.flags = options.flags === void 0 ? "r" : options.flags;
    this.mode = options.mode === void 0 ? 438 : options.mode;
    validatePath(this.path);
  } else {
    this.fd = getValidatedFd(importFd(this, options));
  }
  options.autoDestroy = options.autoClose === void 0 ? true : options.autoClose;
  validateFunction(this[kFs].read, "options.fs.read");
  if (options.autoDestroy) {
    validateFunction(this[kFs].close, "options.fs.close");
  }
  this.start = options.start;
  this.end = options.end ?? Infinity;
  this.pos = void 0;
  this.bytesRead = 0;
  this[kIsPerformingIO] = false;
  if (this.start !== void 0) {
    validateInteger(this.start, "start", 0);
    this.pos = this.start;
  }
  if (this.end !== Infinity) {
    validateInteger(this.end, "end", 0);
    if (this.start !== void 0 && this.start > this.end) {
      throw new ERR_OUT_OF_RANGE(
        "start",
        `<= "end" (here: ${this.end})`,
        this.start
      );
    }
  }
  Reflect.apply(Au, this, [options]);
}
Object.setPrototypeOf(ReadStream.prototype, Au.prototype);
Object.setPrototypeOf(ReadStream, Au);
Object.defineProperty(ReadStream.prototype, "autoClose", {
  get() {
    return this._readableState.autoDestroy;
  },
  set(val) {
    this._readableState.autoDestroy = val;
  }
});
var openReadFs = deprecate(
  function() {
  },
  "ReadStream.prototype.open() is deprecated",
  "DEP0135"
);
ReadStream.prototype.open = openReadFs;
ReadStream.prototype._construct = _construct;
ReadStream.prototype._read = async function(n) {
  n = this.pos !== void 0 ? Math.min(this.end - this.pos + 1, n) : Math.min(this.end - this.bytesRead + 1, n);
  if (n <= 0) {
    this.push(null);
    return;
  }
  const buf = Buffer2.allocUnsafeSlow(n);
  let error = null;
  let bytesRead = null;
  let buffer = void 0;
  this[kIsPerformingIO] = true;
  await new Promise((resolve7) => {
    this[kFs].read(
      this.fd,
      buf,
      0,
      n,
      this.pos ?? null,
      (_er, _bytesRead, _buf) => {
        error = _er;
        bytesRead = _bytesRead;
        buffer = _buf;
        return resolve7(true);
      }
    );
  });
  this[kIsPerformingIO] = false;
  if (this.destroyed) {
    this.emit(kIoDone, error);
    return;
  }
  if (error) {
    errorOrDestroy(this, error);
  } else if (typeof bytesRead === "number" && bytesRead > 0) {
    if (this.pos !== void 0) {
      this.pos += bytesRead;
    }
    this.bytesRead += bytesRead;
    if (bytesRead !== buffer.length) {
      const dst = Buffer2.allocUnsafeSlow(bytesRead);
      buffer.copy(dst, 0, 0, bytesRead);
      buffer = dst;
    }
    this.push(buffer);
  } else {
    this.push(null);
  }
};
ReadStream.prototype._destroy = function(err, cb) {
  if (this[kIsPerformingIO]) {
    this.once(kIoDone, (er) => close2(this, err || er, cb));
  } else {
    close2(this, err, cb);
  }
};
ReadStream.prototype.close = function(cb) {
  if (typeof cb === "function")
    Du(this, cb);
  this.destroy();
};
Object.defineProperty(ReadStream.prototype, "pending", {
  get() {
    return this.fd === null;
  },
  configurable: true
});
function WriteStream(path5, options) {
  if (!(this instanceof WriteStream)) {
    return new WriteStream(path5, options);
  }
  options = copyObject(getOptions2(options, kEmptyObject));
  options.decodeStrings = true;
  if (options.fd == null) {
    this.fd = null;
    this[kFs] = options.fs || { open, write: write2, writev, close };
    validateFunction(this[kFs].open, "options.fs.open");
    this.path = toPathIfFileURL(path5);
    this.flags = options.flags === void 0 ? "w" : options.flags;
    this.mode = options.mode === void 0 ? 438 : options.mode;
    validatePath(this.path);
  } else {
    this.fd = getValidatedFd(importFd(this, options));
  }
  options.autoDestroy = options.autoClose === void 0 ? true : options.autoClose;
  if (!this[kFs].write && !this[kFs].writev) {
    throw new ERR_INVALID_ARG_TYPE(
      "options.fs.write",
      "function",
      this[kFs].write
    );
  }
  if (this[kFs].write) {
    validateFunction(this[kFs].write, "options.fs.write");
  }
  if (this[kFs].writev) {
    validateFunction(this[kFs].writev, "options.fs.writev");
  }
  if (options.autoDestroy) {
    validateFunction(this[kFs].close, "options.fs.close");
  }
  if (!this[kFs].write) {
    this._write = null;
  }
  if (!this[kFs].writev) {
    this._writev = null;
  }
  this.start = options.start;
  this.pos = void 0;
  this.bytesWritten = 0;
  this[kIsPerformingIO] = false;
  if (this.start !== void 0) {
    validateInteger(this.start, "start", 0);
    this.pos = this.start;
  }
  Reflect.apply(mu, this, [options]);
  if (options.encoding) {
    this.setDefaultEncoding(options.encoding);
  }
}
Object.setPrototypeOf(WriteStream.prototype, mu.prototype);
Object.setPrototypeOf(WriteStream, mu);
Object.defineProperty(WriteStream.prototype, "autoClose", {
  get() {
    return this._writableState.autoDestroy;
  },
  set(val) {
    this._writableState.autoDestroy = val;
  }
});
var openWriteFs = deprecate(
  function() {
  },
  "WriteStream.prototype.open() is deprecated",
  "DEP0135"
);
WriteStream.prototype.open = openWriteFs;
WriteStream.prototype._construct = _construct;
WriteStream.prototype._write = function(data, _encoding, cb) {
  this[kIsPerformingIO] = true;
  this[kFs].write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
    this[kIsPerformingIO] = false;
    if (this.destroyed) {
      cb(er);
      return this.emit(kIoDone, er);
    }
    if (er) {
      return cb(er);
    }
    this.bytesWritten += bytes;
    cb();
  });
  if (this.pos !== void 0) {
    this.pos += data.length;
  }
};
WriteStream.prototype._writev = function(data, cb) {
  const len = data.length;
  const chunks = new Array(len);
  let size = 0;
  for (let i = 0; i < len; i++) {
    const chunk = data[i].chunk;
    chunks[i] = chunk;
    size += chunk.length;
  }
  this[kIsPerformingIO] = true;
  this[kFs].writev(this.fd, chunks, this.pos ?? null, (er, bytes) => {
    this[kIsPerformingIO] = false;
    if (this.destroyed) {
      cb(er);
      return this.emit(kIoDone, er);
    }
    if (er) {
      return cb(er);
    }
    this.bytesWritten += bytes;
    cb();
  });
  if (this.pos !== void 0) {
    this.pos += size;
  }
};
WriteStream.prototype._destroy = function(err, cb) {
  if (this[kIsPerformingIO]) {
    this.once(kIoDone, (er) => close2(this, err || er, cb));
  } else {
    close2(this, err, cb);
  }
};
WriteStream.prototype.close = function(cb) {
  if (cb) {
    if (this.closed) {
      nextTick2(cb);
      return;
    }
    this.on("close", cb);
  }
  if (!this.autoClose) {
    this.on("finish", this.destroy);
  }
  this.end();
};
WriteStream.prototype.destroySoon = WriteStream.prototype.end;
Object.defineProperty(WriteStream.prototype, "pending", {
  get() {
    return this.fd === null;
  },
  configurable: true
});
function createReadStream(path5, options) {
  return new ReadStream(path5, options);
}
function createWriteStream(path5, options) {
  return new WriteStream(path5, options);
}

// https://deno.land/std@0.177.0/node/fs.ts
var {
  F_OK: F_OK3,
  R_OK: R_OK3,
  W_OK: W_OK3,
  X_OK: X_OK3,
  O_RDONLY: O_RDONLY3,
  O_WRONLY: O_WRONLY3,
  O_RDWR: O_RDWR3,
  O_NOCTTY: O_NOCTTY2,
  O_TRUNC: O_TRUNC3,
  O_APPEND: O_APPEND3,
  O_DIRECTORY: O_DIRECTORY2,
  O_NOFOLLOW: O_NOFOLLOW2,
  O_SYNC: O_SYNC3,
  O_DSYNC: O_DSYNC2,
  O_SYMLINK: O_SYMLINK2,
  O_NONBLOCK: O_NONBLOCK2,
  O_CREAT: O_CREAT3,
  O_EXCL: O_EXCL3
} = fs_constants_exports;
var promises = {
  access: accessPromise,
  copyFile: copyFilePromise,
  open: openPromise,
  opendir: opendirPromise,
  rename: renamePromise,
  truncate: truncatePromise,
  rm: rmPromise,
  rmdir: rmdirPromise,
  mkdir: mkdirPromise,
  readdir: readdirPromise,
  readlink: readlinkPromise,
  symlink: symlinkPromise,
  lstat: lstatPromise,
  stat: statPromise,
  link: linkPromise,
  unlink: unlinkPromise,
  chmod: chmodPromise,
  // lchmod: promisify(lchmod),
  // lchown: promisify(lchown),
  chown: chownPromise,
  utimes: utimesPromise,
  // lutimes = promisify(lutimes),
  realpath: realpathPromise,
  mkdtemp: mkdtempPromise,
  writeFile: writeFilePromise,
  appendFile: appendFilePromise,
  readFile: readFilePromise,
  watch: watchPromise
};
var fs_default = {
  access,
  accessSync,
  appendFile,
  appendFileSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  close,
  closeSync,
  constants: fs_constants_exports,
  copyFile,
  copyFileSync,
  createReadStream,
  createWriteStream,
  Dir,
  Dirent: Dirent2,
  exists,
  existsSync,
  F_OK: F_OK3,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  O_APPEND: O_APPEND3,
  O_CREAT: O_CREAT3,
  O_DIRECTORY: O_DIRECTORY2,
  O_DSYNC: O_DSYNC2,
  O_EXCL: O_EXCL3,
  O_NOCTTY: O_NOCTTY2,
  O_NOFOLLOW: O_NOFOLLOW2,
  O_NONBLOCK: O_NONBLOCK2,
  O_RDONLY: O_RDONLY3,
  O_RDWR: O_RDWR3,
  O_SYMLINK: O_SYMLINK2,
  O_SYNC: O_SYNC3,
  O_TRUNC: O_TRUNC3,
  O_WRONLY: O_WRONLY3,
  open,
  openSync,
  opendir,
  opendirSync,
  read,
  readSync,
  promises,
  R_OK: R_OK3,
  readdir,
  readdirSync,
  readFile,
  readFileSync,
  readlink,
  readlinkSync,
  ReadStream,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rmdir,
  rmdirSync,
  rm,
  rmSync,
  stat,
  Stats: Stats2,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  unwatchFile,
  utimes,
  utimesSync,
  W_OK: W_OK3,
  watch,
  watchFile,
  write: write2,
  writeFile,
  writev,
  writevSync,
  writeFileSync,
  WriteStream,
  writeSync,
  X_OK: X_OK3
};
export {
  Dir,
  Dirent2 as Dirent,
  F_OK3 as F_OK,
  O_APPEND3 as O_APPEND,
  O_CREAT3 as O_CREAT,
  O_DIRECTORY2 as O_DIRECTORY,
  O_DSYNC2 as O_DSYNC,
  O_EXCL3 as O_EXCL,
  O_NOCTTY2 as O_NOCTTY,
  O_NOFOLLOW2 as O_NOFOLLOW,
  O_NONBLOCK2 as O_NONBLOCK,
  O_RDONLY3 as O_RDONLY,
  O_RDWR3 as O_RDWR,
  O_SYMLINK2 as O_SYMLINK,
  O_SYNC3 as O_SYNC,
  O_TRUNC3 as O_TRUNC,
  O_WRONLY3 as O_WRONLY,
  R_OK3 as R_OK,
  ReadStream,
  Stats2 as Stats,
  W_OK3 as W_OK,
  WriteStream,
  X_OK3 as X_OK,
  access,
  accessSync,
  appendFile,
  appendFileSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  close,
  closeSync,
  fs_constants_exports as constants,
  copyFile,
  copyFileSync,
  createReadStream,
  createWriteStream,
  fs_default as default,
  exists,
  existsSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  promises,
  read,
  readFile,
  readFileSync,
  readSync,
  readdir,
  readdirSync,
  readlink,
  readlinkSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  unwatchFile,
  utimes,
  utimesSync,
  watch,
  watchFile,
  write2 as write,
  writeFile,
  writeFileSync,
  writeSync,
  writev,
  writevSync
};
