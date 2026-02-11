import { createRuntime } from "../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope } = createRuntime();
const operators = runtime.operators;

export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.any = nixScope.lib["any"];
    nixScope.attrValues = nixScope.lib["attrValues"];
    nixScope.concatMap = nixScope.lib["concatMap"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope.hasPrefix = nixScope.lib["hasPrefix"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.matchAttrs = nixScope.lib["matchAttrs"];
    nixScope.recursiveUpdateUntil = nixScope.lib["recursiveUpdateUntil"];
    nixScope.toList = nixScope.lib["toList"];
    nixScope.toJSON = nixScope.lib["strings"]["toJSON"];
    nixScope.kernels = nixScope.lib["systems"]["parse"]["kernels"];
    nixScope.kernelFamilies =
      nixScope.lib["systems"]["parse"]["kernelFamilies"];
    nixScope.significantBytes =
      nixScope.lib["systems"]["parse"]["significantBytes"];
    nixScope.cpuTypes = nixScope.lib["systems"]["parse"]["cpuTypes"];
    nixScope.execFormats = nixScope.lib["systems"]["parse"]["execFormats"];
    Object.defineProperty(nixScope, "abis", {
      enumerable: true,
      get() {
        return nixScope.mapAttrs(
          createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "abi", null, {}, (nixScope) => (
              nixScope.removeAttrs(nixScope.abi)(["assertions"])
            ))
          )),
        )(nixScope.lib["systems"]["parse"]["abis"]);
      },
    });
    return /*rec*/ createScope((nixScope) => {
      Object.defineProperty(nixScope, "patterns", {
        enumerable: true,
        get() {
          return /*rec*/ createScope((nixScope) => {
            nixScope.isx86_32 = { "cpu": ({ "family": "x86", "bits": 32n }) };
            nixScope.isx86_64 = { "cpu": ({ "family": "x86", "bits": 64n }) };
            nixScope.isPower = { "cpu": ({ "family": "power" }) };
            nixScope.isPower64 = {
              "cpu": ({ "family": "power", "bits": 64n }),
            };
            nixScope.isAbiElfv1 = { "abi": ({ "abi": "elfv1" }) };
            nixScope.isAbiElfv2 = [
              { "abi": ({ "abi": "elfv2" }) },
              {
                "abi": ({ "name": "musl" }),
                "cpu": ({ "family": "power", "bits": 64n }),
              },
            ];
            nixScope.isx86 = { "cpu": ({ "family": "x86" }) };
            nixScope.isAarch32 = { "cpu": ({ "family": "arm", "bits": 32n }) };
            nixScope.isAarch64 = { "cpu": ({ "family": "arm", "bits": 64n }) };
            nixScope.isAarch = { "cpu": ({ "family": "arm" }) };
            nixScope.isMicroBlaze = { "cpu": ({ "family": "microblaze" }) };
            nixScope.isMips = { "cpu": ({ "family": "mips" }) };
            nixScope.isMips32 = { "cpu": ({ "family": "mips", "bits": 32n }) };
            nixScope.isMips64 = { "cpu": ({ "family": "mips", "bits": 64n }) };
            nixScope.isMips64n32 = {
              "cpu": ({ "family": "mips", "bits": 64n }),
              "abi": ({ "abi": "n32" }),
            };
            nixScope.isMips64n64 = {
              "cpu": ({ "family": "mips", "bits": 64n }),
              "abi": ({ "abi": "64" }),
            };
            nixScope.isMmix = { "cpu": ({ "family": "mmix" }) };
            nixScope.isRiscV = { "cpu": ({ "family": "riscv" }) };
            nixScope.isRiscV32 = {
              "cpu": ({ "family": "riscv", "bits": 32n }),
            };
            nixScope.isRiscV64 = {
              "cpu": ({ "family": "riscv", "bits": 64n }),
            };
            nixScope.isRx = { "cpu": ({ "family": "rx" }) };
            nixScope.isSparc = { "cpu": ({ "family": "sparc" }) };
            nixScope.isSparc64 = {
              "cpu": ({ "family": "sparc", "bits": 64n }),
            };
            nixScope.isWasm = { "cpu": ({ "family": "wasm" }) };
            nixScope.isMsp430 = { "cpu": ({ "family": "msp430" }) };
            nixScope.isVc4 = { "cpu": ({ "family": "vc4" }) };
            nixScope.isAvr = { "cpu": ({ "family": "avr" }) };
            nixScope.isAlpha = { "cpu": ({ "family": "alpha" }) };
            nixScope.isOr1k = { "cpu": ({ "family": "or1k" }) };
            nixScope.isM68k = { "cpu": ({ "family": "m68k" }) };
            nixScope.isS390 = { "cpu": ({ "family": "s390" }) };
            nixScope.isS390x = { "cpu": ({ "family": "s390", "bits": 64n }) };
            nixScope.isLoongArch64 = {
              "cpu": ({ "family": "loongarch", "bits": 64n }),
            };
            nixScope.is32bit = { "cpu": ({ "bits": 32n }) };
            nixScope.is64bit = { "cpu": ({ "bits": 64n }) };
            nixScope.isBSD = {
              "kernel": ({
                "families": createScope((nixScope) => {
                  const obj = {};
                  obj["bsd"] = nixScope.kernelFamilies["bsd"];
                  return obj;
                }),
              }),
            };
            nixScope.isDarwin = {
              "kernel": ({
                "families": createScope((nixScope) => {
                  const obj = {};
                  obj["darwin"] = nixScope.kernelFamilies["darwin"];
                  return obj;
                }),
              }),
            };
            nixScope.isFreeBSD = { "kernel": ({ "name": "freebsd" }) };
            nixScope.isEfi = [
              { "cpu": ({ "family": "arm", "version": "6" }) },
              { "cpu": ({ "family": "arm", "version": "7" }) },
              { "cpu": ({ "family": "arm", "version": "8" }) },
              { "cpu": ({ "family": "riscv" }) },
              { "cpu": ({ "family": "x86" }) },
              { "cpu": ({ "family": "loongarch" }) },
            ];
            Object.defineProperty(nixScope, "isi686", {
              enumerable: true,
              get() {
                return ({ "cpu": nixScope.cpuTypes["i686"] });
              },
            });
            Object.defineProperty(nixScope, "isArmv7", {
              enumerable: true,
              get() {
                return nixScope.map(createFunc({}, null, {}, (nixScope) => (
                  { "cpu": ({ "arch": nixScope.arch }) }
                )))(
                  nixScope.filter(
                    createFunc(/*arg:*/ "cpu", null, {}, (nixScope) => (
                      nixScope.hasPrefix("armv7")(
                        operators.selectOrDefault(nixScope.cpu, ["arch"], ""),
                      )
                    )),
                  )(nixScope.attrValues(nixScope.cpuTypes)),
                );
              },
            });
            Object.defineProperty(nixScope, "isJavaScript", {
              enumerable: true,
              get() {
                return ({ "cpu": nixScope.cpuTypes["javascript"] });
              },
            });
            Object.defineProperty(nixScope, "isILP32", {
              enumerable: true,
              get() {
                return operators.listConcat(
                  [{ "cpu": ({ "family": "wasm", "bits": 32n }) }],
                  nixScope.map(
                    createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                      { "abi": ({ "abi": nixScope.a }) }
                    )),
                  )(["n32", "ilp32", "x32"]),
                );
              },
            });
            Object.defineProperty(nixScope, "isBigEndian", {
              enumerable: true,
              get() {
                return ({
                  "cpu":
                    ({
                      "significantByte": nixScope.significantBytes["bigEndian"],
                    }),
                });
              },
            });
            Object.defineProperty(nixScope, "isLittleEndian", {
              enumerable: true,
              get() {
                return ({
                  "cpu":
                    ({
                      "significantByte":
                        nixScope.significantBytes["littleEndian"],
                    }),
                });
              },
            });
            Object.defineProperty(nixScope, "isUnix", {
              enumerable: true,
              get() {
                return [
                  nixScope.isBSD,
                  nixScope.isDarwin,
                  nixScope.isLinux,
                  nixScope.isSunOS,
                  nixScope.isCygwin,
                  nixScope.isRedox,
                ];
              },
            });
            Object.defineProperty(nixScope, "isMacOS", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["macos"] });
              },
            });
            Object.defineProperty(nixScope, "isiOS", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["ios"] });
              },
            });
            Object.defineProperty(nixScope, "isLinux", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["linux"] });
              },
            });
            Object.defineProperty(nixScope, "isSunOS", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["solaris"] });
              },
            });
            Object.defineProperty(nixScope, "isNetBSD", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["netbsd"] });
              },
            });
            Object.defineProperty(nixScope, "isOpenBSD", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["openbsd"] });
              },
            });
            Object.defineProperty(nixScope, "isWindows", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["windows"] });
              },
            });
            Object.defineProperty(nixScope, "isCygwin", {
              enumerable: true,
              get() {
                return ({
                  "kernel": nixScope.kernels["windows"],
                  "abi": nixScope.abis["cygnus"],
                });
              },
            });
            Object.defineProperty(nixScope, "isMinGW", {
              enumerable: true,
              get() {
                return ({
                  "kernel": nixScope.kernels["windows"],
                  "abi": nixScope.abis["gnu"],
                });
              },
            });
            Object.defineProperty(nixScope, "isMsvc", {
              enumerable: true,
              get() {
                return ({
                  "kernel": nixScope.kernels["windows"],
                  "abi": nixScope.abis["msvc"],
                });
              },
            });
            Object.defineProperty(nixScope, "isWasi", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["wasi"] });
              },
            });
            Object.defineProperty(nixScope, "isRedox", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["redox"] });
              },
            });
            Object.defineProperty(nixScope, "isGhcjs", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["ghcjs"] });
              },
            });
            Object.defineProperty(nixScope, "isGenode", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["genode"] });
              },
            });
            Object.defineProperty(nixScope, "isNone", {
              enumerable: true,
              get() {
                return ({ "kernel": nixScope.kernels["none"] });
              },
            });
            Object.defineProperty(nixScope, "isAndroid", {
              enumerable: true,
              get() {
                return [
                  { "abi": nixScope.abis["android"] },
                  { "abi": nixScope.abis["androideabi"] },
                ];
              },
            });
            Object.defineProperty(nixScope, "isGnu", {
              enumerable: true,
              get() {
                return ((_withAttrs) => {
                  const nixScope = {
                    ...runtime.scopeStack.slice(-1)[0],
                    ..._withAttrs,
                  };
                  runtime.scopeStack.push(nixScope);
                  try {
                    return nixScope.map(
                      createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                        { "abi": nixScope.a }
                      )),
                    )([
                      nixScope.gnuabi64,
                      nixScope.gnuabin32,
                      nixScope.gnu,
                      nixScope.gnueabi,
                      nixScope.gnueabihf,
                      nixScope.gnuabielfv1,
                      nixScope.gnuabielfv2,
                    ]);
                  } finally {
                    runtime.scopeStack.pop();
                  }
                })(nixScope.abis);
              },
            });
            Object.defineProperty(nixScope, "isMusl", {
              enumerable: true,
              get() {
                return ((_withAttrs) => {
                  const nixScope = {
                    ...runtime.scopeStack.slice(-1)[0],
                    ..._withAttrs,
                  };
                  runtime.scopeStack.push(nixScope);
                  try {
                    return nixScope.map(
                      createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                        { "abi": nixScope.a }
                      )),
                    )([
                      nixScope.musl,
                      nixScope.musleabi,
                      nixScope.musleabihf,
                      nixScope.muslabin32,
                      nixScope.muslabi64,
                    ]);
                  } finally {
                    runtime.scopeStack.pop();
                  }
                })(nixScope.abis);
              },
            });
            Object.defineProperty(nixScope, "isUClibc", {
              enumerable: true,
              get() {
                return ((_withAttrs) => {
                  const nixScope = {
                    ...runtime.scopeStack.slice(-1)[0],
                    ..._withAttrs,
                  };
                  runtime.scopeStack.push(nixScope);
                  try {
                    return nixScope.map(
                      createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                        { "abi": nixScope.a }
                      )),
                    )([
                      nixScope.uclibc,
                      nixScope.uclibceabi,
                      nixScope.uclibceabihf,
                    ]);
                  } finally {
                    runtime.scopeStack.pop();
                  }
                })(nixScope.abis);
              },
            });
            Object.defineProperty(nixScope, "isElf", {
              enumerable: true,
              get() {
                return createScope((nixScope) => {
                  const obj = {};
                  if (obj["kernel"] === undefined) obj["kernel"] = {};
                  obj["kernel"]["execFormat"] = nixScope.execFormats["elf"];
                  return obj;
                });
              },
            });
            Object.defineProperty(nixScope, "isMacho", {
              enumerable: true,
              get() {
                return createScope((nixScope) => {
                  const obj = {};
                  if (obj["kernel"] === undefined) obj["kernel"] = {};
                  obj["kernel"]["execFormat"] = nixScope.execFormats["macho"];
                  return obj;
                });
              },
            });
            return nixScope;
          });
        },
      });
      Object.defineProperty(nixScope, "patternLogicalAnd", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pat1_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pat2_", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "pat1", {
                  enumerable: true,
                  get() {
                    return nixScope.toList(nixScope.pat1_);
                  },
                });
                Object.defineProperty(nixScope, "pat2", {
                  enumerable: true,
                  get() {
                    return nixScope.toList(nixScope.pat2_);
                  },
                });
                return nixScope.concatMap(
                  createFunc(/*arg:*/ "attr1", null, {}, (nixScope) => (
                    nixScope.map(
                      createFunc(/*arg:*/ "attr2", null, {}, (nixScope) => (
                        nixScope.recursiveUpdateUntil(
                          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "subattr1",
                              null,
                              {},
                              (nixScope) => (
                                createFunc(
                                  /*arg:*/ "subattr2",
                                  null,
                                  {},
                                  (nixScope) => (
                                    operators.ifThenElse(
                                      operators.or(
                                        operators.equal(
                                          nixScope.builtins["intersectAttrs"](
                                            nixScope.subattr1,
                                          )(nixScope.subattr2),
                                          {},
                                        ),
                                        operators.equal(
                                          nixScope.subattr1,
                                          nixScope.subattr2,
                                        ),
                                      ),
                                      () => (true),
                                      () => (nixScope.throw(
                                        new InterpolatedString([
                                          "\n              pattern conflict at path ",
                                          ":\n                ",
                                          "\n                ",
                                          "\n            ",
                                        ], [
                                          () => (nixScope.toString(
                                            nixScope.path,
                                          )),
                                          () => (nixScope.toJSON(
                                            nixScope.subattr1,
                                          )),
                                          () => (nixScope.toJSON(
                                            nixScope.subattr2,
                                          )),
                                        ]),
                                      )),
                                    )
                                  ),
                                )
                              ),
                            )
                          )),
                        )(nixScope.attr1)(nixScope.attr2)
                      )),
                    )(nixScope.pat2)
                  )),
                )(nixScope.pat1);
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "matchAnyAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "patterns", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isList(nixScope.patterns),
              () => (createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                nixScope.any(
                  createFunc(/*arg:*/ "pattern", null, {}, (nixScope) => (
                    nixScope.matchAttrs(nixScope.pattern)(nixScope.attrs)
                  )),
                )(nixScope.patterns)
              ))),
              () => (nixScope.matchAttrs(nixScope.patterns)),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "predicates", {
        enumerable: true,
        get() {
          return nixScope.mapAttrs(
            createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
              nixScope.matchAnyAttrs
            )),
          )(nixScope.patterns);
        },
      });
      Object.defineProperty(nixScope, "platformPatterns", {
        enumerable: true,
        get() {
          return nixScope.mapAttrs(
            createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "p", null, {}, (nixScope) => (
                operators.merge({ "parsed": {} }, nixScope.p)
              ))
            )),
          )({ "isStatic": ({ "isStatic": true }) });
        },
      });
      return nixScope;
    });
  })
));
