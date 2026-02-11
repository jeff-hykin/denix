import { createRuntime } from "../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const operators = runtime.operators;

export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.any = nixScope.lib["any"];
    nixScope.filterAttrs = nixScope.lib["filterAttrs"];
    nixScope.foldl = nixScope.lib["foldl"];
    nixScope.hasInfix = nixScope.lib["hasInfix"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.optional = nixScope.lib["optional"];
    nixScope.optionalAttrs = nixScope.lib["optionalAttrs"];
    nixScope.optionalString = nixScope.lib["optionalString"];
    nixScope.removeSuffix = nixScope.lib["removeSuffix"];
    nixScope.replaceString = nixScope.lib["replaceString"];
    nixScope.toUpper = nixScope.lib["toUpper"];
    nixScope.toJSON = nixScope.lib["strings"]["toJSON"];
    defGetter(
      nixScope,
      "doubles",
      (nixScope) =>
        nixScope.import(new Path(["./doubles.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "parse",
      (nixScope) =>
        nixScope.import(new Path(["./parse.nix"], []))({ "lib": nixScope.lib }),
    );
    defGetter(
      nixScope,
      "inspect",
      (nixScope) =>
        nixScope.import(new Path(["./inspect.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "platforms",
      (nixScope) =>
        nixScope.import(new Path(["./platforms.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "examples",
      (nixScope) =>
        nixScope.import(new Path(["./examples.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "architectures",
      (nixScope) =>
        nixScope.import(new Path(["./architectures.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "equals",
      (nixScope) =>
        /*let*/ createScope((nixScope) => {
          defGetter(nixScope, "removeFunctions", (nixScope) =>
            createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
              nixScope.filterAttrs(
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                    operators.negate(nixScope.isFunction(nixScope.v))
                  ))
                )),
              )(nixScope.a)
            )));
          return createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              operators.equal(
                nixScope.removeFunctions(nixScope.a),
                nixScope.removeFunctions(nixScope.b),
              )
            ))
          ));
        }),
    );
    defGetter(
      nixScope,
      "flakeExposed",
      (nixScope) => nixScope.import(new Path(["./flake-systems.nix"], []))({}),
    );
    defGetter(
      nixScope,
      "systemToAttrs",
      (nixScope) =>
        createFunc(/*arg:*/ "systemOrArgs", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.isAttrs(nixScope.systemOrArgs),
            () => (nixScope.systemOrArgs),
            () => ({ "system": nixScope.systemOrArgs }),
          )
        )),
    );
    defGetter(
      nixScope,
      "elaborate",
      (nixScope) =>
        createFunc(/*arg:*/ "systemOrArgs", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "allArgs", (nixScope) =>
              nixScope.systemToAttrs(nixScope.systemOrArgs));
            defGetter(nixScope, "args", (nixScope) =>
              nixScope.builtins["removeAttrs"](nixScope.allArgs)([
                "parsed",
                "system",
              ]));
            defGetter(nixScope, "rust", (nixScope) =>
              operators.selectOrDefault(
                nixScope.args,
                ["rust"],
                operators.selectOrDefault(nixScope.args, ["rustc"], {}),
              ));
            defGetter(nixScope, "final", (nixScope) =>
              operators.merge(
                {
                  "parsed": nixScope.parse["mkSystemFromString"](
                    operators.selectOrDefault(
                      nixScope.args,
                      ["config"],
                      nixScope.allArgs["system"],
                    ),
                  ),
                  "system": nixScope.parse["doubleFromSystem"](
                    nixScope.final["parsed"],
                  ),
                  "config": nixScope.parse["tripleFromSystem"](
                    nixScope.final["parsed"],
                  ),
                  "canExecute": createFunc(
                    /*arg:*/ "platform",
                    null,
                    {},
                    (nixScope) => (
                      operators.and(
                        operators.and(
                          operators.and(
                            operators.equal(
                              nixScope.final["isAndroid"],
                              nixScope.platform["isAndroid"],
                            ),
                            nixScope.parse["isCompatible"](
                              nixScope.final["parsed"]["cpu"],
                            )(nixScope.platform["parsed"]["cpu"]),
                          ),
                          operators.equal(
                            nixScope.final["parsed"]["kernel"],
                            nixScope.platform["parsed"]["kernel"],
                          ),
                        ),
                        operators.implication(
                          operators.equal(
                            nixScope.final["parsed"]["cpu"],
                            nixScope.platform["parsed"]["cpu"],
                          ),
                          operators.or(
                            operators.implication(
                              operators.and(
                                operators.hasAttrPath(
                                  nixScope.final,
                                  "gcc",
                                  "arch",
                                ),
                                operators.hasAttrPath(
                                  nixScope.platform,
                                  "gcc",
                                  "arch",
                                ),
                              ),
                              nixScope.architectures["canExecute"](
                                nixScope.final["gcc"]["arch"],
                              )(nixScope.platform["gcc"]["arch"]),
                            ),
                            operators.implication(
                              operators.hasAttrPath(
                                nixScope.platform,
                                "gcc",
                                "arch",
                              ),
                              operators.negate(
                                operators.hasAttrPath(
                                  nixScope.final,
                                  "gcc",
                                  "arch",
                                ),
                              ),
                            ),
                          ),
                        ),
                      )
                    ),
                  ),
                  "isCompatible": createFunc(
                    /*arg:*/ "_",
                    null,
                    {},
                    (nixScope) => (
                      nixScope.throw(
                        "2022-05-23: isCompatible has been removed in favor of canExecute, refer to the 22.11 changelog for details",
                      )
                    ),
                  ),
                  "useLLVM": operators.or(
                    nixScope.final["isFreeBSD"],
                    nixScope.final["isOpenBSD"],
                  ),
                  "libc":
                    (operators.ifThenElse(
                      nixScope.final["isDarwin"],
                      () => ("libSystem"),
                      () => (operators.ifThenElse(
                        nixScope.final["isMsvc"],
                        () => ("ucrt"),
                        () => (operators.ifThenElse(
                          nixScope.final["isMinGW"],
                          () => ("msvcrt"),
                          () => (operators.ifThenElse(
                            nixScope.final["isWasi"],
                            () => ("wasilibc"),
                            () => (operators.ifThenElse(
                              operators.and(
                                nixScope.final["isWasm"],
                                operators.negate(nixScope.final["isWasi"]),
                              ),
                              () => (null),
                              () => (operators.ifThenElse(
                                nixScope.final["isRedox"],
                                () => ("relibc"),
                                () => (operators.ifThenElse(
                                  nixScope.final["isMusl"],
                                  () => ("musl"),
                                  () => (operators.ifThenElse(
                                    nixScope.final["isUClibc"],
                                    () => ("uclibc"),
                                    () => (operators.ifThenElse(
                                      nixScope.final["isAndroid"],
                                      () => ("bionic"),
                                      () => (operators.ifThenElse(
                                        nixScope.final["isLinux"],
                                        () => ("glibc"),
                                        () => (operators.ifThenElse(
                                          nixScope.final["isFreeBSD"],
                                          () => ("fblibc"),
                                          () => (operators.ifThenElse(
                                            nixScope.final["isOpenBSD"],
                                            () => ("oblibc"),
                                            () => (operators.ifThenElse(
                                              nixScope.final["isNetBSD"],
                                              () => ("nblibc"),
                                              () => (operators.ifThenElse(
                                                nixScope.final["isAvr"],
                                                () => ("avrlibc"),
                                                () => (operators.ifThenElse(
                                                  nixScope.final["isGhcjs"],
                                                  () => (null),
                                                  () => (operators.ifThenElse(
                                                    nixScope.final["isNone"],
                                                    () => ("newlib"),
                                                    () => ("native/impure"),
                                                  )),
                                                )),
                                              )),
                                            )),
                                          )),
                                        )),
                                      )),
                                    )),
                                  )),
                                )),
                              )),
                            )),
                          )),
                        )),
                      )),
                    )),
                  "linker":
                    (operators.ifThenElse(
                      operators.selectOrDefault(
                        nixScope.final,
                        ["useLLVM"],
                        false,
                      ),
                      () => ("lld"),
                      () => (operators.ifThenElse(
                        nixScope.final["isDarwin"],
                        () => ("cctools"),
                        () => ("bfd"),
                      )),
                    )),
                  "libDir":
                    (operators.ifThenElse(
                      nixScope.final["isLinux"],
                      () => (operators.ifThenElse(
                        operators.or(
                          operators.or(
                            nixScope.final["isx86_64"],
                            nixScope.final["isMips64"],
                          ),
                          nixScope.final["isPower64"],
                        ),
                        () => ("lib64"),
                        () => ("lib"),
                      )),
                      () => (null),
                    )),
                  "extensions": operators.merge(
                    nixScope.optionalAttrs(
                      nixScope.final["hasSharedLibraries"],
                    )({
                      "sharedLibrary":
                        (operators.ifThenElse(
                          nixScope.final["isDarwin"],
                          () => (".dylib"),
                          () => (operators.ifThenElse(
                            nixScope.final["isWindows"],
                            () => (".dll"),
                            () => (".so"),
                          )),
                        )),
                    }),
                    {
                      "staticLibrary":
                        (operators.ifThenElse(
                          nixScope.final["isWindows"],
                          () => (".lib"),
                          () => (".a"),
                        )),
                      "library":
                        (operators.ifThenElse(
                          nixScope.final["isStatic"],
                          () => (nixScope.final["extensions"]["staticLibrary"]),
                          () => (nixScope.final["extensions"]["sharedLibrary"]),
                        )),
                      "executable":
                        (operators.ifThenElse(
                          nixScope.final["isWindows"],
                          () => (".exe"),
                          () => (""),
                        )),
                    },
                  ),
                  "useAndroidPrebuilt": false,
                  "useiOSPrebuilt": false,
                  "uname": ({
                    "system": operators.selectOrDefault(
                      {
                        "linux": "Linux",
                        "windows": "Windows",
                        "darwin": "Darwin",
                        "netbsd": "NetBSD",
                        "freebsd": "FreeBSD",
                        "openbsd": "OpenBSD",
                        "wasi": "Wasi",
                        "redox": "Redox",
                        "genode": "Genode",
                      },
                      [nixScope.final["parsed"]["kernel"]["name"]],
                      null,
                    ),
                    "processor":
                      (operators.ifThenElse(
                        nixScope.final["isPower64"],
                        () => (new InterpolatedString(["ppc64", ""], [
                          () => (nixScope.optionalString(
                            nixScope.final["isLittleEndian"],
                          )("le")),
                        ])),
                        () => (operators.ifThenElse(
                          nixScope.final["isPower"],
                          () => (new InterpolatedString(["ppc", ""], [
                            () => (nixScope.optionalString(
                              nixScope.final["isLittleEndian"],
                            )("le")),
                          ])),
                          () => (operators.ifThenElse(
                            nixScope.final["isMips64"],
                            () => ("mips64"),
                            () => (operators.ifThenElse(
                              nixScope.final["isDarwin"],
                              () => (nixScope.final["darwinArch"]),
                              () => (nixScope.final["parsed"]["cpu"]["name"]),
                            )),
                          )),
                        )),
                      )),
                    "release": null,
                  }),
                  "hasSharedLibraries": ((_withAttrs) => {
                    const nixScope = {
                      ...runtime.scopeStack.slice(-1)[0],
                      ..._withAttrs,
                    };
                    runtime.scopeStack.push(nixScope);
                    try {
                      return operators.and(
                        operators.or(
                          operators.or(
                            operators.or(
                              operators.or(
                                operators.or(
                                  operators.or(
                                    operators.or(
                                      operators.or(
                                        operators.or(
                                          operators.or(
                                            operators.or(
                                              nixScope.isAndroid,
                                              nixScope.isGnu,
                                            ),
                                            nixScope.isMusl,
                                          ),
                                          nixScope.isDarwin,
                                        ),
                                        nixScope.isSunOS,
                                      ),
                                      nixScope.isOpenBSD,
                                    ),
                                    nixScope.isFreeBSD,
                                  ),
                                  nixScope.isNetBSD,
                                ),
                                nixScope.isCygwin,
                              ),
                              nixScope.isMinGW,
                            ),
                            nixScope.isWindows,
                          ),
                          nixScope.isWasm,
                        ),
                        operators.negate(nixScope.isStatic),
                      );
                    } finally {
                      runtime.scopeStack.pop();
                    }
                  })(nixScope.final),
                  "isStatic": operators.or(
                    nixScope.final["isWasi"],
                    nixScope.final["isRedox"],
                  ),
                  "rustc": operators.selectOrDefault(
                    nixScope.args,
                    ["rustc"],
                    {},
                  ),
                  "linuxArch":
                    (operators.ifThenElse(
                      nixScope.final["isAarch32"],
                      () => ("arm"),
                      () => (operators.ifThenElse(
                        nixScope.final["isAarch64"],
                        () => ("arm64"),
                        () => (operators.ifThenElse(
                          nixScope.final["isx86_32"],
                          () => ("i386"),
                          () => (operators.ifThenElse(
                            nixScope.final["isx86_64"],
                            () => ("x86_64"),
                            () => (operators.ifThenElse(
                              nixScope.final["isMicroBlaze"],
                              () => ("microblaze"),
                              () => (operators.ifThenElse(
                                nixScope.final["isMips32"],
                                () => ("mips"),
                                () => (operators.ifThenElse(
                                  nixScope.final["isMips64"],
                                  () => ("mips"),
                                  () => (operators.ifThenElse(
                                    nixScope.final["isPower"],
                                    () => ("powerpc"),
                                    () => (operators.ifThenElse(
                                      nixScope.final["isRiscV"],
                                      () => ("riscv"),
                                      () => (operators.ifThenElse(
                                        nixScope.final["isS390"],
                                        () => ("s390"),
                                        () => (operators.ifThenElse(
                                          nixScope.final["isLoongArch64"],
                                          () => ("loongarch"),
                                          () => (nixScope
                                            .final["parsed"]["cpu"]["name"]),
                                        )),
                                      )),
                                    )),
                                  )),
                                )),
                              )),
                            )),
                          )),
                        )),
                      )),
                    )),
                  "ubootArch":
                    (operators.ifThenElse(
                      nixScope.final["isx86_32"],
                      () => ("x86"),
                      () => (operators.ifThenElse(
                        nixScope.final["isMips64"],
                        () => ("mips64"),
                        () => (nixScope.final["linuxArch"]),
                      )),
                    )),
                  "qemuArch":
                    (operators.ifThenElse(
                      nixScope.final["isAarch32"],
                      () => ("arm"),
                      () => (operators.ifThenElse(
                        nixScope.final["isAarch64"],
                        () => ("aarch64"),
                        () => (operators.ifThenElse(
                          operators.and(
                            nixScope.final["isS390"],
                            operators.negate(nixScope.final["isS390x"]),
                          ),
                          () => (null),
                          () => (operators.ifThenElse(
                            nixScope.final["isx86_64"],
                            () => ("x86_64"),
                            () => (operators.ifThenElse(
                              nixScope.final["isx86"],
                              () => ("i386"),
                              () => (operators.ifThenElse(
                                nixScope.final["isMips64n32"],
                                () => (new InterpolatedString(["mipsn32", ""], [
                                  () => (nixScope.optionalString(
                                    nixScope.final["isLittleEndian"],
                                  )("el")),
                                ])),
                                () => (operators.ifThenElse(
                                  nixScope.final["isMips64"],
                                  () => (new InterpolatedString(
                                    ["mips64", ""],
                                    [() => (nixScope.optionalString(
                                      nixScope.final["isLittleEndian"],
                                    )("el"))],
                                  )),
                                  () => (nixScope.final["uname"]["processor"]),
                                )),
                              )),
                            )),
                          )),
                        )),
                      )),
                    )),
                  "efiArch":
                    (operators.ifThenElse(
                      nixScope.final["isx86_32"],
                      () => ("ia32"),
                      () => (operators.ifThenElse(
                        nixScope.final["isx86_64"],
                        () => ("x64"),
                        () => (operators.ifThenElse(
                          nixScope.final["isAarch32"],
                          () => ("arm"),
                          () => (operators.ifThenElse(
                            nixScope.final["isAarch64"],
                            () => ("aa64"),
                            () => (nixScope.final["parsed"]["cpu"]["name"]),
                          )),
                        )),
                      )),
                    )),
                  "darwinArch": nixScope.parse["darwinArch"](
                    nixScope.final["parsed"]["cpu"],
                  ),
                  "darwinPlatform":
                    (operators.ifThenElse(
                      nixScope.final["isMacOS"],
                      () => ("macos"),
                      () => (operators.ifThenElse(
                        nixScope.final["isiOS"],
                        () => ("ios"),
                        () => (null),
                      )),
                    )),
                  "darwinSdkVersion": operators.selectOrDefault(
                    nixScope.final,
                    ["sdkVer"],
                    "11.3",
                  ),
                  "darwinMinVersion": nixScope.final["darwinSdkVersion"],
                  "darwinMinVersionVariable":
                    (operators.ifThenElse(
                      nixScope.final["isMacOS"],
                      () => ("MACOSX_DEPLOYMENT_TARGET"),
                      () => (operators.ifThenElse(
                        nixScope.final["isiOS"],
                        () => ("IPHONEOS_DEPLOYMENT_TARGET"),
                        () => (null),
                      )),
                    )),
                  "androidSdkVersion": operators.selectOrDefault(
                    nixScope.args,
                    ["androidSdkVersion"],
                    null,
                  ),
                  "androidNdkVersion": operators.selectOrDefault(
                    nixScope.args,
                    ["androidNdkVersion"],
                    null,
                  ),
                },
                operators.merge(
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "selectEmulator", (nixScope) =>
                      createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "wine", (nixScope) =>
                            (nixScope.pkgs["winePackagesFor"](
                              new InterpolatedString(["wine", ""], [
                                () => (nixScope.toString(
                                  nixScope.final["parsed"]["cpu"]["bits"],
                                )),
                              ]),
                            ))["minimal"]);
                          return (operators.ifThenElse(
                            nixScope.pkgs["stdenv"]["hostPlatform"]
                              ["canExecute"](nixScope.final),
                            () => (nixScope.lib["getExe"](
                              nixScope.pkgs["writeShellScriptBin"]("exec")(
                                `exec "$@"`,
                              ),
                            )),
                            () => (operators.ifThenElse(
                              nixScope.final["isWindows"],
                              () => (new InterpolatedString([
                                "",
                                "/bin/wine",
                                "",
                              ], [
                                () => (nixScope.wine),
                                () => (nixScope.optionalString(
                                  operators.equal(
                                    nixScope.final["parsed"]["cpu"]["bits"],
                                    64n,
                                  ),
                                )("64")),
                              ])),
                              () => (operators.ifThenElse(
                                operators.and(
                                  operators.and(
                                    nixScope.final["isLinux"],
                                    nixScope
                                      .pkgs["stdenv"]["hostPlatform"][
                                        "isLinux"
                                      ],
                                  ),
                                  operators.notEqual(
                                    nixScope.final["qemuArch"],
                                    null,
                                  ),
                                ),
                                () => (new InterpolatedString([
                                  "",
                                  "/bin/qemu-",
                                  "",
                                ], [
                                  () => (nixScope.pkgs["qemu-user"]),
                                  () => (nixScope.final["qemuArch"]),
                                ])),
                                () => (operators.ifThenElse(
                                  nixScope.final["isWasi"],
                                  () => (new InterpolatedString([
                                    "",
                                    "/bin/wasmtime",
                                  ], [() => (nixScope.pkgs["wasmtime"])])),
                                  () => (operators.ifThenElse(
                                    nixScope.final["isMmix"],
                                    () => (new InterpolatedString([
                                      "",
                                      "/bin/mmix",
                                    ], [() => (nixScope.pkgs["mmixware"])])),
                                    () => (null),
                                  )),
                                )),
                              )),
                            )),
                          ));
                        })
                      )));
                    return ({
                      "emulatorAvailable": createFunc(
                        /*arg:*/ "pkgs",
                        null,
                        {},
                        (nixScope) => (
                          operators.notEqual(
                            nixScope.selectEmulator(nixScope.pkgs),
                            null,
                          )
                        ),
                      ),
                      "staticEmulatorAvailable": createFunc(
                        /*arg:*/ "pkgs",
                        null,
                        {},
                        (nixScope) => (
                          operators.and(
                            nixScope.final["emulatorAvailable"](nixScope.pkgs),
                            operators.or(
                              operators.or(
                                nixScope.final["isLinux"],
                                nixScope.final["isWasi"],
                              ),
                              nixScope.final["isMmix"],
                            ),
                          )
                        ),
                      ),
                      "emulator": createFunc(
                        /*arg:*/ "pkgs",
                        null,
                        {},
                        (nixScope) => (
                          operators.ifThenElse(
                            nixScope.final["emulatorAvailable"](nixScope.pkgs),
                            () => (nixScope.selectEmulator(nixScope.pkgs)),
                            () => (nixScope.throw(
                              new InterpolatedString([
                                "Don't know how to run ",
                                " executables.",
                              ], [() => (nixScope.final["config"])]),
                            )),
                          )
                        ),
                      ),
                    });
                  }),
                  operators.merge(
                    nixScope.mapAttrs(
                      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                          nixScope.v(nixScope.final["parsed"])
                        ))
                      )),
                    )(nixScope.inspect["predicates"]),
                    operators.merge(
                      nixScope.mapAttrs(
                        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                            nixScope.v(
                              operators.selectOrDefault(nixScope.final, [
                                "gcc",
                                "arch",
                              ], "default"),
                            )
                          ))
                        )),
                      )(nixScope.architectures["predicates"]),
                      operators.merge(
                        nixScope.args,
                        operators.merge({
                          "rust": operators.merge(nixScope.rust, {
                            "platform": operators.merge(
                              operators.selectOrDefault(nixScope.rust, [
                                "platform",
                              ], {}),
                              {
                                "arch":
                                  (operators.ifThenElse(
                                    operators.hasAttr(
                                      nixScope.rust,
                                      "platform",
                                    ),
                                    () => (nixScope.rust["platform"]["arch"]),
                                    () => (operators.ifThenElse(
                                      nixScope.final["isAarch32"],
                                      () => ("arm"),
                                      () => (operators.ifThenElse(
                                        nixScope.final["isMips64"],
                                        () => ("mips64"),
                                        () => (operators.ifThenElse(
                                          nixScope.final["isPower64"],
                                          () => ("powerpc64"),
                                          () => (nixScope
                                            .final["parsed"]["cpu"]["name"]),
                                        )),
                                      )),
                                    )),
                                  )),
                                "os":
                                  (operators.ifThenElse(
                                    operators.hasAttr(
                                      nixScope.rust,
                                      "platform",
                                    ),
                                    () => (operators.selectOrDefault(
                                      nixScope.rust,
                                      ["platform", "os"],
                                      "none",
                                    )),
                                    () => (operators.ifThenElse(
                                      nixScope.final["isDarwin"],
                                      () => ("macos"),
                                      () => (operators.ifThenElse(
                                        operators.and(
                                          nixScope.final["isWasm"],
                                          operators.negate(
                                            nixScope.final["isWasi"],
                                          ),
                                        ),
                                        () => ("unknown"),
                                        () => (nixScope
                                          .final["parsed"]["kernel"]["name"]),
                                      )),
                                    )),
                                  )),
                                "target-family":
                                  (operators.ifThenElse(
                                    operators.hasAttrPath(
                                      nixScope.args,
                                      "rust",
                                      "platform",
                                      "target-family",
                                    ),
                                    () => (nixScope
                                      .args["rust"]["platform"][
                                        "target-family"
                                      ]),
                                    () => (operators.ifThenElse(
                                      operators.hasAttrPath(
                                        nixScope.args,
                                        "rustc",
                                        "platform",
                                        "target-family",
                                      ),
                                      () => (/*let*/ createScope((nixScope) => {
                                        defGetter(
                                          nixScope,
                                          "f",
                                          (nixScope) =>
                                            nixScope
                                              .args["rustc"]["platform"][
                                                "target-family"
                                              ],
                                        );
                                        return (operators.ifThenElse(
                                          nixScope.isList(nixScope.f),
                                          () => (nixScope.f),
                                          () => [nixScope.f],
                                        ));
                                      })),
                                      () => (operators.listConcat(
                                        nixScope.optional(
                                          nixScope.final["isUnix"],
                                        )("unix"),
                                        operators.listConcat(
                                          nixScope.optional(
                                            nixScope.final["isWindows"],
                                          )("windows"),
                                          nixScope.optional(
                                            nixScope.final["isWasm"],
                                          )("wasm"),
                                        ),
                                      )),
                                    )),
                                  )),
                                "vendor": /*let*/ createScope((nixScope) => {
                                  nixScope.vendor =
                                    nixScope.final["parsed"]["vendor"];
                                  return operators.selectOrDefault(
                                    nixScope.rust,
                                    ["platform", "vendor"],
                                    operators.selectOrDefault({ "w64": "pc" }, [
                                      nixScope.vendor["name"],
                                    ], nixScope.vendor["name"]),
                                  );
                                }),
                              },
                            ),
                            "rustcTarget": /*let*/ createScope((nixScope) => {
                              nixScope.cpu = nixScope.final["parsed"]["cpu"];
                              nixScope.kernel =
                                nixScope.final["parsed"]["kernel"];
                              nixScope.abi = nixScope.final["parsed"]["abi"];
                              defGetter(nixScope, "cpu_", (nixScope) =>
                                operators.selectOrDefault(
                                  nixScope.rust,
                                  ["platform", "arch"],
                                  operators.selectOrDefault(
                                    {
                                      "armv7a": "armv7",
                                      "armv7l": "armv7",
                                      "armv6l": "arm",
                                      "armv5tel": "armv5te",
                                      "riscv32": "riscv32gc",
                                      "riscv64": "riscv64gc",
                                    },
                                    [nixScope.cpu["name"]],
                                    nixScope.cpu["name"],
                                  ),
                                ));
                              defGetter(
                                nixScope,
                                "vendor_",
                                (nixScope) =>
                                  nixScope.final["rust"]["platform"]["vendor"],
                              );
                              return operators.selectOrDefault(
                                nixScope.args,
                                ["rust", "rustcTarget"],
                                operators.selectOrDefault(
                                  nixScope.args,
                                  ["rustc", "config"],
                                  operators.ifThenElse(
                                    nixScope.final["isWasi"],
                                    () => (new InterpolatedString([
                                      "",
                                      "-wasip1",
                                    ], [() => (nixScope.cpu_)])),
                                    () => (new InterpolatedString([
                                      "",
                                      "-",
                                      "-",
                                      "",
                                      "",
                                    ], [
                                      () => (nixScope.cpu_),
                                      () => (nixScope.vendor_),
                                      () => (nixScope.kernel["name"]),
                                      () => (nixScope.optionalString(
                                        operators.notEqual(
                                          nixScope.abi["name"],
                                          "unknown",
                                        ),
                                      )(
                                        new InterpolatedString(["-", ""], [
                                          () => (nixScope.abi["name"]),
                                        ]),
                                      )),
                                    ])),
                                  ),
                                ),
                              );
                            }),
                            "rustcTargetSpec": operators.selectOrDefault(
                              nixScope.rust,
                              ["rustcTargetSpec"],
                              operators.ifThenElse(
                                operators.hasAttr(nixScope.rust, "platform"),
                                () => (nixScope.builtins["toFile"](
                                  operators.add(
                                    nixScope.final["rust"]["rustcTarget"],
                                    ".json",
                                  ),
                                )(nixScope.toJSON(nixScope.rust["platform"]))),
                                () => (nixScope.final["rust"]["rustcTarget"]),
                              ),
                            ),
                            "cargoShortTarget": nixScope.removeSuffix(".json")(
                              nixScope.baseNameOf(
                                new InterpolatedString(["", ""], [
                                  () => (nixScope
                                    .final["rust"]["rustcTargetSpec"]),
                                ]),
                              ),
                            ),
                            "cargoEnvVarTarget": nixScope.replaceString("-")(
                              "_",
                            )(nixScope.toUpper(
                              nixScope.final["rust"]["cargoShortTarget"],
                            )),
                            "isNoStdTarget": nixScope.any(
                              createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
                                nixScope.hasInfix(nixScope.t)(
                                  nixScope.final["rust"]["rustcTarget"],
                                )
                              )),
                            )(["-none", "nvptx", "switch", "-uefi"]),
                          }),
                        }, {
                          "go": ({
                            "GOARCH": operators.selectOrDefault(
                              {
                                "aarch64": "arm64",
                                "arm": "arm",
                                "armv5tel": "arm",
                                "armv6l": "arm",
                                "armv7l": "arm",
                                "i686": "386",
                                "loongarch64": "loong64",
                                "mips": "mips",
                                "mips64el": "mips64le",
                                "mipsel": "mipsle",
                                "powerpc64": "ppc64",
                                "powerpc64le": "ppc64le",
                                "riscv64": "riscv64",
                                "s390x": "s390x",
                                "x86_64": "amd64",
                                "wasm32": "wasm",
                              },
                              [nixScope.final["parsed"]["cpu"]["name"]],
                              null,
                            ),
                            "GOOS":
                              (operators.ifThenElse(
                                nixScope.final["isWasi"],
                                () => ("wasip1"),
                                () => (nixScope
                                  .final["parsed"]["kernel"]["name"]),
                              )),
                            "GOARM": nixScope.toString(
                              nixScope.lib["intersectLists"]([
                                operators.selectOrDefault(nixScope.final, [
                                  "parsed",
                                  "cpu",
                                  "version",
                                ], ""),
                              ])(["5", "6", "7"]),
                            ),
                          }),
                        }),
                      ),
                    ),
                  ),
                ),
              ));
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    "final.useAndroidPrebuilt -> final.isAndroid",
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      "foldl (pass: { assertion, message }: if assertion final then pass else throw message) true (\n      final.parsed.abi.assertions or [ ]\n    )",
                  );
                }
                return nixScope.final;
              })(
                nixScope.foldl(
                  createFunc(/*arg:*/ "pass", null, {}, (nixScope) => (
                    createFunc({}, null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.assertion(nixScope.final),
                        () => (nixScope.pass),
                        () => (nixScope.throw(nixScope.message)),
                      )
                    ))
                  )),
                )(true)(
                  operators.selectOrDefault(nixScope.final, [
                    "parsed",
                    "abi",
                    "assertions",
                  ], []),
                ),
              );
            })(
              operators.implication(
                nixScope.final["useAndroidPrebuilt"],
                nixScope.final["isAndroid"],
              ),
            );
          })
        )),
    );
    return ({
      "architectures": nixScope.architectures,
      "doubles": nixScope.doubles,
      "elaborate": nixScope.elaborate,
      "equals": nixScope.equals,
      "examples": nixScope.examples,
      "flakeExposed": nixScope.flakeExposed,
      "inspect": nixScope.inspect,
      "parse": nixScope.parse,
      "platforms": nixScope.platforms,
      "systemToAttrs": nixScope.systemToAttrs,
    });
  })
));
