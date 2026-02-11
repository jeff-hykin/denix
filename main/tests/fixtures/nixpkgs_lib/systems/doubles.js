export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.lists = nixScope.lib["lists"];
    nixScope.parse = nixScope.lib["systems"]["parse"];
    nixScope.predicates = nixScope.lib["systems"]["inspect"]["predicates"];
    nixScope.matchAttrs = nixScope.lib["attrsets"]["matchAttrs"];
    nixScope.all = [
      "i686-cygwin",
      "x86_64-cygwin",
      "x86_64-darwin",
      "aarch64-darwin",
      "i686-freebsd",
      "x86_64-freebsd",
      "aarch64-freebsd",
      "aarch64-genode",
      "i686-genode",
      "x86_64-genode",
      "x86_64-solaris",
      "javascript-ghcjs",
      "aarch64-linux",
      "armv5tel-linux",
      "armv6l-linux",
      "armv7a-linux",
      "armv7l-linux",
      "i686-linux",
      "loongarch64-linux",
      "m68k-linux",
      "microblaze-linux",
      "microblazeel-linux",
      "mips-linux",
      "mips64-linux",
      "mips64el-linux",
      "mipsel-linux",
      "powerpc64-linux",
      "powerpc64le-linux",
      "riscv32-linux",
      "riscv64-linux",
      "s390-linux",
      "s390x-linux",
      "x86_64-linux",
      "mmix-mmixware",
      "aarch64-netbsd",
      "armv6l-netbsd",
      "armv7a-netbsd",
      "armv7l-netbsd",
      "i686-netbsd",
      "m68k-netbsd",
      "mipsel-netbsd",
      "powerpc-netbsd",
      "riscv32-netbsd",
      "riscv64-netbsd",
      "x86_64-netbsd",
      "aarch64_be-none",
      "aarch64-none",
      "arm-none",
      "armv6l-none",
      "avr-none",
      "i686-none",
      "microblaze-none",
      "microblazeel-none",
      "mips-none",
      "mips64-none",
      "msp430-none",
      "or1k-none",
      "m68k-none",
      "powerpc-none",
      "powerpcle-none",
      "riscv32-none",
      "riscv64-none",
      "rx-none",
      "s390-none",
      "s390x-none",
      "vc4-none",
      "x86_64-none",
      "i686-openbsd",
      "x86_64-openbsd",
      "x86_64-redox",
      "wasm64-wasi",
      "wasm32-wasi",
      "aarch64-windows",
      "x86_64-windows",
      "i686-windows",
    ];
    defGetter(
      nixScope,
      "allParsed",
      (nixScope) =>
        nixScope.map(nixScope.parse["mkSystemFromString"])(nixScope.all),
    );
    defGetter(
      nixScope,
      "filterDoubles",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          nixScope.map(nixScope.parse["doubleFromSystem"])(
            nixScope.lists["filter"](nixScope.f)(nixScope.allParsed),
          )
        )),
    );
    return ({
      "all": nixScope.all,
      "none": [],
      "arm": nixScope.filterDoubles(nixScope.predicates["isAarch32"]),
      "armv7": nixScope.filterDoubles(nixScope.predicates["isArmv7"]),
      "aarch": nixScope.filterDoubles(nixScope.predicates["isAarch"]),
      "aarch64": nixScope.filterDoubles(nixScope.predicates["isAarch64"]),
      "x86": nixScope.filterDoubles(nixScope.predicates["isx86"]),
      "i686": nixScope.filterDoubles(nixScope.predicates["isi686"]),
      "x86_64": nixScope.filterDoubles(nixScope.predicates["isx86_64"]),
      "microblaze": nixScope.filterDoubles(nixScope.predicates["isMicroBlaze"]),
      "mips": nixScope.filterDoubles(nixScope.predicates["isMips"]),
      "mmix": nixScope.filterDoubles(nixScope.predicates["isMmix"]),
      "power": nixScope.filterDoubles(nixScope.predicates["isPower"]),
      "riscv": nixScope.filterDoubles(nixScope.predicates["isRiscV"]),
      "riscv32": nixScope.filterDoubles(nixScope.predicates["isRiscV32"]),
      "riscv64": nixScope.filterDoubles(nixScope.predicates["isRiscV64"]),
      "rx": nixScope.filterDoubles(nixScope.predicates["isRx"]),
      "vc4": nixScope.filterDoubles(nixScope.predicates["isVc4"]),
      "or1k": nixScope.filterDoubles(nixScope.predicates["isOr1k"]),
      "m68k": nixScope.filterDoubles(nixScope.predicates["isM68k"]),
      "s390": nixScope.filterDoubles(nixScope.predicates["isS390"]),
      "s390x": nixScope.filterDoubles(nixScope.predicates["isS390x"]),
      "loongarch64": nixScope.filterDoubles(
        nixScope.predicates["isLoongArch64"],
      ),
      "js": nixScope.filterDoubles(nixScope.predicates["isJavaScript"]),
      "bigEndian": nixScope.filterDoubles(nixScope.predicates["isBigEndian"]),
      "littleEndian": nixScope.filterDoubles(
        nixScope.predicates["isLittleEndian"],
      ),
      "cygwin": nixScope.filterDoubles(nixScope.predicates["isCygwin"]),
      "darwin": nixScope.filterDoubles(nixScope.predicates["isDarwin"]),
      "freebsd": nixScope.filterDoubles(nixScope.predicates["isFreeBSD"]),
      "gnu": operators.listConcat(
        nixScope.filterDoubles(
          nixScope.matchAttrs(
            {
              "kernel": nixScope.parse["kernels"]["linux"],
              "abi": nixScope.parse["abis"]["gnu"],
            },
          ),
        ),
        operators.listConcat(
          nixScope.filterDoubles(
            nixScope.matchAttrs(
              {
                "kernel": nixScope.parse["kernels"]["linux"],
                "abi": nixScope.parse["abis"]["gnueabi"],
              },
            ),
          ),
          operators.listConcat(
            nixScope.filterDoubles(
              nixScope.matchAttrs(
                {
                  "kernel": nixScope.parse["kernels"]["linux"],
                  "abi": nixScope.parse["abis"]["gnueabihf"],
                },
              ),
            ),
            operators.listConcat(
              nixScope.filterDoubles(
                nixScope.matchAttrs(
                  {
                    "kernel": nixScope.parse["kernels"]["linux"],
                    "abi": nixScope.parse["abis"]["gnuabin32"],
                  },
                ),
              ),
              operators.listConcat(
                nixScope.filterDoubles(
                  nixScope.matchAttrs(
                    {
                      "kernel": nixScope.parse["kernels"]["linux"],
                      "abi": nixScope.parse["abis"]["gnuabi64"],
                    },
                  ),
                ),
                operators.listConcat(
                  nixScope.filterDoubles(
                    nixScope.matchAttrs(
                      {
                        "kernel": nixScope.parse["kernels"]["linux"],
                        "abi": nixScope.parse["abis"]["gnuabielfv1"],
                      },
                    ),
                  ),
                  nixScope.filterDoubles(
                    nixScope.matchAttrs(
                      {
                        "kernel": nixScope.parse["kernels"]["linux"],
                        "abi": nixScope.parse["abis"]["gnuabielfv2"],
                      },
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      "illumos": nixScope.filterDoubles(nixScope.predicates["isSunOS"]),
      "linux": nixScope.filterDoubles(nixScope.predicates["isLinux"]),
      "netbsd": nixScope.filterDoubles(nixScope.predicates["isNetBSD"]),
      "openbsd": nixScope.filterDoubles(nixScope.predicates["isOpenBSD"]),
      "unix": nixScope.filterDoubles(nixScope.predicates["isUnix"]),
      "wasi": nixScope.filterDoubles(nixScope.predicates["isWasi"]),
      "redox": nixScope.filterDoubles(nixScope.predicates["isRedox"]),
      "windows": nixScope.filterDoubles(nixScope.predicates["isWindows"]),
      "genode": nixScope.filterDoubles(nixScope.predicates["isGenode"]),
      "embedded": nixScope.filterDoubles(nixScope.predicates["isNone"]),
    });
  })
));
