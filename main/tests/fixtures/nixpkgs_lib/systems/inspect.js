import { createRuntime } from "../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
    defGetter(
      nixScope,
      "abis",
      (nixScope) =>
        nixScope.mapAttrs(createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "abi", null, {}, (nixScope) => (
            nixScope.removeAttrs(nixScope.abi)(["assertions"])
          ))
        )))(nixScope.lib["systems"]["parse"]["abis"]),
    );
    return /*rec*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "patterns",
        (nixScope) =>
          /*rec*/ createScope((nixScope) => {
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
                  obj.bsd = nixScope.kernelFamilies.bsd;
                  return obj;
                }),
              }),
            };
            nixScope.isDarwin = {
              "kernel": ({
                "families": createScope((nixScope) => {
                  const obj = {};
                  obj.darwin = nixScope.kernelFamilies.darwin;
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
            defGetter(
              nixScope,
              "isi686",
              (nixScope) => ({ "cpu": nixScope.cpuTypes["i686"] }),
            );
            defGetter(nixScope, "isArmv7", (nixScope) =>
              nixScope.map(createFunc({}, null, {}, (nixScope) => (
                { "cpu": ({ "arch": nixScope.arch }) }
              )))(
                nixScope.filter(
                  createFunc(/*arg:*/ "cpu", null, {}, (nixScope) => (
                    nixScope.hasPrefix("armv7")(
                      operators.selectOrDefault(nixScope.cpu, ["arch"], ""),
                    )
                  )),
                )(nixScope.attrValues(nixScope.cpuTypes)),
              ));
            defGetter(
              nixScope,
              "isJavaScript",
              (nixScope) => ({ "cpu": nixScope.cpuTypes["javascript"] }),
            );
            defGetter(nixScope, "isILP32", (nixScope) =>
              operators.listConcat(
                [{ "cpu": ({ "family": "wasm", "bits": 32n }) }],
                nixScope.map(createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                  { "abi": ({ "abi": nixScope.a }) }
                )))(["n32", "ilp32", "x32"]),
              ));
            defGetter(
              nixScope,
              "isBigEndian",
              (nixScope) => ({
                "cpu":
                  ({
                    "significantByte": nixScope.significantBytes["bigEndian"],
                  }),
              }),
            );
            defGetter(
              nixScope,
              "isLittleEndian",
              (nixScope) => ({
                "cpu":
                  ({
                    "significantByte":
                      nixScope.significantBytes["littleEndian"],
                  }),
              }),
            );
            defGetter(
              nixScope,
              "isUnix",
              (
                nixScope,
              ) => [
                nixScope.isBSD,
                nixScope.isDarwin,
                nixScope.isLinux,
                nixScope.isSunOS,
                nixScope.isCygwin,
                nixScope.isRedox,
              ],
            );
            defGetter(
              nixScope,
              "isMacOS",
              (nixScope) => ({ "kernel": nixScope.kernels["macos"] }),
            );
            defGetter(
              nixScope,
              "isiOS",
              (nixScope) => ({ "kernel": nixScope.kernels["ios"] }),
            );
            defGetter(
              nixScope,
              "isLinux",
              (nixScope) => ({ "kernel": nixScope.kernels["linux"] }),
            );
            defGetter(
              nixScope,
              "isSunOS",
              (nixScope) => ({ "kernel": nixScope.kernels["solaris"] }),
            );
            defGetter(
              nixScope,
              "isNetBSD",
              (nixScope) => ({ "kernel": nixScope.kernels["netbsd"] }),
            );
            defGetter(
              nixScope,
              "isOpenBSD",
              (nixScope) => ({ "kernel": nixScope.kernels["openbsd"] }),
            );
            defGetter(
              nixScope,
              "isWindows",
              (nixScope) => ({ "kernel": nixScope.kernels["windows"] }),
            );
            defGetter(
              nixScope,
              "isCygwin",
              (nixScope) => ({
                "kernel": nixScope.kernels["windows"],
                "abi": nixScope.abis["cygnus"],
              }),
            );
            defGetter(
              nixScope,
              "isMinGW",
              (nixScope) => ({
                "kernel": nixScope.kernels["windows"],
                "abi": nixScope.abis["gnu"],
              }),
            );
            defGetter(
              nixScope,
              "isMsvc",
              (nixScope) => ({
                "kernel": nixScope.kernels["windows"],
                "abi": nixScope.abis["msvc"],
              }),
            );
            defGetter(
              nixScope,
              "isWasi",
              (nixScope) => ({ "kernel": nixScope.kernels["wasi"] }),
            );
            defGetter(
              nixScope,
              "isRedox",
              (nixScope) => ({ "kernel": nixScope.kernels["redox"] }),
            );
            defGetter(
              nixScope,
              "isGhcjs",
              (nixScope) => ({ "kernel": nixScope.kernels["ghcjs"] }),
            );
            defGetter(
              nixScope,
              "isGenode",
              (nixScope) => ({ "kernel": nixScope.kernels["genode"] }),
            );
            defGetter(
              nixScope,
              "isNone",
              (nixScope) => ({ "kernel": nixScope.kernels["none"] }),
            );
            defGetter(
              nixScope,
              "isAndroid",
              (
                nixScope,
              ) => [
                { "abi": nixScope.abis["android"] },
                { "abi": nixScope.abis["androideabi"] },
              ],
            );
            defGetter(nixScope, "isGnu", (nixScope) =>
              ((_withAttrs) => {
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
              })(nixScope.abis));
            defGetter(nixScope, "isMusl", (nixScope) =>
              ((_withAttrs) => {
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
              })(nixScope.abis));
            defGetter(nixScope, "isUClibc", (nixScope) =>
              ((_withAttrs) => {
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
              })(nixScope.abis));
            defGetter(nixScope, "isElf", (nixScope) =>
              createScope((nixScope) => {
                const obj = {};
                if (obj["kernel"] === undefined) obj["kernel"] = {};
                obj["kernel"]["execFormat"] = nixScope.execFormats["elf"];
                return obj;
              }));
            defGetter(nixScope, "isMacho", (nixScope) =>
              createScope((nixScope) => {
                const obj = {};
                if (obj["kernel"] === undefined) obj["kernel"] = {};
                obj["kernel"]["execFormat"] = nixScope.execFormats["macho"];
                return obj;
              }));
            return nixScope;
          }),
      );
      defGetter(
        nixScope,
        "patternLogicalAnd",
        (nixScope) =>
          createFunc(/*arg:*/ "pat1_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pat2_", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "pat1",
                  (nixScope) => nixScope.toList(nixScope.pat1_),
                );
                defGetter(
                  nixScope,
                  "pat2",
                  (nixScope) => nixScope.toList(nixScope.pat2_),
                );
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
          )),
      );
      defGetter(
        nixScope,
        "matchAnyAttrs",
        (nixScope) =>
          createFunc(/*arg:*/ "patterns", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "predicates",
        (nixScope) =>
          nixScope.mapAttrs(createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
            nixScope.matchAnyAttrs
          )))(nixScope.patterns),
      );
      defGetter(
        nixScope,
        "platformPatterns",
        (nixScope) =>
          nixScope.mapAttrs(createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "p", null, {}, (nixScope) => (
              operators.merge({ "parsed": {} }, nixScope.p)
            ))
          )))({ "isStatic": ({ "isStatic": true }) }),
      );
      return nixScope;
    });
  })
));
