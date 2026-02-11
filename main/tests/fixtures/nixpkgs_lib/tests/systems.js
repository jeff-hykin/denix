import { createRuntime } from "../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const operators = runtime.operators;

export default //
//
//
//
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "lib",
    (nixScope) => nixScope.import(new Path(["../default.nix"], [])),
  );
  defGetter(
    nixScope,
    "mseteq",
    (nixScope) =>
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          {
            "expr": nixScope.lib["sort"](nixScope.lib["lessThan"])(nixScope.x),
            "expected": nixScope.lib["sort"](nixScope.lib["lessThan"])(
              nixScope.y,
            ),
          }
        ))
      )),
  );
  defGetter(
    nixScope,
    "toLosslessStringMaybe",
    (nixScope) =>
      createFunc(/*arg:*/ "sys", null, {}, (nixScope) => (
        operators.ifThenElse(
          nixScope.lib["isString"](nixScope.sys),
          () => (nixScope.sys),
          () => (operators.ifThenElse(
            nixScope.lib["systems"]["equals"](nixScope.sys)(
              nixScope.lib["systems"]["elaborate"](nixScope.sys["system"]),
            ),
            () => (nixScope.sys["system"]),
            () => (null),
          )),
        )
      )),
  );
  return nixScope.lib["runTests"](operators.merge(
    ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
      runtime.scopeStack.push(nixScope);
      try {
        return ({
          "testall": nixScope.mseteq(nixScope.all)(
            operators.listConcat(
              nixScope.linux,
              operators.listConcat(
                nixScope.darwin,
                operators.listConcat(
                  nixScope.freebsd,
                  operators.listConcat(
                    nixScope.openbsd,
                    operators.listConcat(
                      nixScope.netbsd,
                      operators.listConcat(
                        nixScope.illumos,
                        operators.listConcat(
                          nixScope.wasi,
                          operators.listConcat(
                            nixScope.windows,
                            operators.listConcat(
                              nixScope.embedded,
                              operators.listConcat(
                                nixScope.mmix,
                                operators.listConcat(
                                  nixScope.js,
                                  operators.listConcat(
                                    nixScope.genode,
                                    nixScope.redox,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          "testarm": nixScope.mseteq(nixScope.arm)([
            "armv5tel-linux",
            "armv6l-linux",
            "armv6l-netbsd",
            "armv6l-none",
            "armv7a-linux",
            "armv7a-netbsd",
            "armv7l-linux",
            "armv7l-netbsd",
            "arm-none",
          ]),
          "testarmv7": nixScope.mseteq(nixScope.armv7)([
            "armv7a-linux",
            "armv7l-linux",
            "armv7a-netbsd",
            "armv7l-netbsd",
          ]),
          "testi686": nixScope.mseteq(nixScope.i686)([
            "i686-linux",
            "i686-freebsd",
            "i686-genode",
            "i686-netbsd",
            "i686-openbsd",
            "i686-cygwin",
            "i686-windows",
            "i686-none",
          ]),
          "testmips": nixScope.mseteq(nixScope.mips)([
            "mips-none",
            "mips64-none",
            "mips-linux",
            "mips64-linux",
            "mips64el-linux",
            "mipsel-linux",
            "mipsel-netbsd",
          ]),
          "testmmix": nixScope.mseteq(nixScope.mmix)(["mmix-mmixware"]),
          "testpower": nixScope.mseteq(nixScope.power)([
            "powerpc-netbsd",
            "powerpc-none",
            "powerpc64-linux",
            "powerpc64le-linux",
            "powerpcle-none",
          ]),
          "testriscv": nixScope.mseteq(nixScope.riscv)([
            "riscv32-linux",
            "riscv64-linux",
            "riscv32-netbsd",
            "riscv64-netbsd",
            "riscv32-none",
            "riscv64-none",
          ]),
          "testriscv32": nixScope.mseteq(nixScope.riscv32)([
            "riscv32-linux",
            "riscv32-netbsd",
            "riscv32-none",
          ]),
          "testriscv64": nixScope.mseteq(nixScope.riscv64)([
            "riscv64-linux",
            "riscv64-netbsd",
            "riscv64-none",
          ]),
          "tests390x": nixScope.mseteq(nixScope.s390x)([
            "s390x-linux",
            "s390x-none",
          ]),
          "testx86_64": nixScope.mseteq(nixScope.x86_64)([
            "x86_64-linux",
            "x86_64-darwin",
            "x86_64-freebsd",
            "x86_64-genode",
            "x86_64-redox",
            "x86_64-openbsd",
            "x86_64-netbsd",
            "x86_64-cygwin",
            "x86_64-solaris",
            "x86_64-windows",
            "x86_64-none",
          ]),
          "testcygwin": nixScope.mseteq(nixScope.cygwin)([
            "i686-cygwin",
            "x86_64-cygwin",
          ]),
          "testdarwin": nixScope.mseteq(nixScope.darwin)([
            "x86_64-darwin",
            "aarch64-darwin",
          ]),
          "testfreebsd": nixScope.mseteq(nixScope.freebsd)([
            "aarch64-freebsd",
            "i686-freebsd",
            "x86_64-freebsd",
          ]),
          "testgenode": nixScope.mseteq(nixScope.genode)([
            "aarch64-genode",
            "i686-genode",
            "x86_64-genode",
          ]),
          "testredox": nixScope.mseteq(nixScope.redox)(["x86_64-redox"]),
          "testgnu": nixScope.mseteq(nixScope.gnu)(nixScope.linux),
          "testillumos": nixScope.mseteq(nixScope.illumos)(["x86_64-solaris"]),
          "testlinux": nixScope.mseteq(nixScope.linux)([
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
          ]),
          "testnetbsd": nixScope.mseteq(nixScope.netbsd)([
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
          ]),
          "testopenbsd": nixScope.mseteq(nixScope.openbsd)([
            "i686-openbsd",
            "x86_64-openbsd",
          ]),
          "testwindows": nixScope.mseteq(nixScope.windows)([
            "i686-cygwin",
            "x86_64-cygwin",
            "aarch64-windows",
            "i686-windows",
            "x86_64-windows",
          ]),
          "testunix": nixScope.mseteq(nixScope.unix)(
            operators.listConcat(
              nixScope.linux,
              operators.listConcat(
                nixScope.darwin,
                operators.listConcat(
                  nixScope.freebsd,
                  operators.listConcat(
                    nixScope.openbsd,
                    operators.listConcat(
                      nixScope.netbsd,
                      operators.listConcat(
                        nixScope.illumos,
                        operators.listConcat(nixScope.cygwin, nixScope.redox),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        });
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.lib["systems"]["doubles"]),
    operators.merge(
      {
        "test_equals_example_x86_64-linux": ({
          "expr": nixScope.lib["systems"]["equals"](
            nixScope.lib["systems"]["elaborate"]("x86_64-linux"),
          )(nixScope.lib["systems"]["elaborate"]("x86_64-linux")),
          "expected": true,
        }),
        "test_toLosslessStringMaybe_example_x86_64-linux":
          ({
            "expr": nixScope.toLosslessStringMaybe(
              nixScope.lib["systems"]["elaborate"]("x86_64-linux"),
            ),
            "expected": "x86_64-linux",
          }),
        "test_toLosslessStringMaybe_fail":
          ({
            "expr": nixScope.toLosslessStringMaybe(
              operators.merge(
                nixScope.lib["systems"]["elaborate"]("x86_64-linux"),
                { "something": "extra" },
              ),
            ),
            "expected": null,
          }),
        "test_elaborate_config_over_system":
          ({
            "expr":
              (nixScope.lib["systems"]["elaborate"](
                {
                  "config": "i686-unknown-linux-gnu",
                  "system": "x86_64-linux",
                },
              ))["system"],
            "expected": "i686-linux",
          }),
        "test_elaborate_config_over_parsed": ({
          "expr":
            (nixScope.lib["systems"]["elaborate"](
              {
                "config": "i686-unknown-linux-gnu",
                "parsed":
                  (nixScope.lib["systems"]["elaborate"]("x86_64-linux"))[
                    "parsed"
                  ],
              },
            ))["parsed"]["cpu"]["arch"],
          "expected": "i686",
        }),
        "test_elaborate_system_over_parsed": ({
          "expr":
            (nixScope.lib["systems"]["elaborate"](
              {
                "system": "i686-linux",
                "parsed":
                  (nixScope.lib["systems"]["elaborate"]("x86_64-linux"))[
                    "parsed"
                  ],
              },
            ))["parsed"]["cpu"]["arch"],
          "expected": "i686",
        }),
      },
      nixScope.lib["concatMapAttrs"](
        createFunc(/*arg:*/ "platformAttrName", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "origValue", null, {}, (nixScope) => (
            createScope((nixScope) => {
              const obj = {};
              obj[
                new InterpolatedString(["test_equals_unequal_", ""], [
                  () => (nixScope.platformAttrName),
                ])
              ] = /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "modified", (nixScope) =>
                  ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " + "origValue != arbitraryValue",
                      );
                    }
                    return operators.merge(
                      nixScope.lib["systems"]["elaborate"]("x86_64-linux"),
                      createScope((nixScope) => {
                        const obj = {};
                        obj[nixScope.platformAttrName] =
                          nixScope.arbitraryValue;
                        return obj;
                      }),
                    );
                  })(
                    operators.notEqual(
                      nixScope.origValue,
                      nixScope.arbitraryValue,
                    ),
                  ));
                defGetter(nixScope, "arbitraryValue", (nixScope) =>
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    "<<modified>>"
                  )));
                return ({
                  "expr": nixScope.lib["systems"]["equals"](
                    nixScope.lib["systems"]["elaborate"]("x86_64-linux"),
                  )(nixScope.modified),
                  "expected": operators.hasAttr(
                    {
                      "canExecute": null,
                      "emulator": null,
                      "emulatorAvailable": null,
                      "staticEmulatorAvailable": null,
                      "isCompatible": null,
                    },
                    nixScope.platformAttrName,
                  ),
                });
              });
              return obj;
            })
          ))
        )),
      )(nixScope.lib["systems"]["elaborate"]("x86_64-linux")),
    ),
  ));
});
