import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-functionargs.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "stdenvFun",
    (nixScope) => (createFunc({}, null, { args: {} }, nixScope, (nixScope) => (
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("stdenv"));
        return obj;
      })
    ))),
  );
  defGetter(
    nixScope,
    "stdenv2Fun",
    (nixScope) => (createFunc({}, null, { args: {} }, nixScope, (nixScope) => (
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("stdenv2"));
        return obj;
      })
    ))),
  );
  defGetter(
    nixScope,
    "fetchurlFun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false } },
      nixScope,
      (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'stdenv.name == "stdenv"');
          }
          return createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "name", () => ("fetchurl"));
            return obj;
          });
        })(operators.equal(nixScope.stdenv["name"], "stdenv"))
      ),
    )),
  );
  defGetter(
    nixScope,
    "atermFun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "name",
            () => (new InterpolatedString(["aterm-", ""], [
              () => (nixScope.stdenv["name"]),
            ])),
          );
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "aterm2Fun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "name",
            () => (new InterpolatedString(["aterm2-", ""], [
              () => (nixScope.stdenv["name"]),
            ])),
          );
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "nixFun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false, "aterm": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "name",
            () => (new InterpolatedString(["nix-", "-", ""], [
              () => (nixScope.stdenv["name"]),
              () => (nixScope.aterm["name"]),
            ])),
          );
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "mplayerFun",
    (
      nixScope,
    ) => (createFunc(
      {
        "enableX11": (nixScope) => (false),
        "xorg": (nixScope) => (null),
        "enableFoo": (nixScope) => (true),
        "foo": (nixScope) => (null),
      },
      null,
      {
        args: {
          "stdenv": false,
          "fetchurl": false,
          "enableX11": true,
          "xorg": true,
          "enableFoo": true,
          "foo": true,
        },
      },
      nixScope,
      (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'stdenv.name == "stdenv2"');
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  'enableX11 -> xorg.libXv.name == "libXv"',
              );
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " + "enableFoo -> foo != null",
                );
              }
              return createScope(nixScope, (nixScope) => {
                const obj = {};
                defGetter(
                  obj,
                  "name",
                  () => (new InterpolatedString(["mplayer-", ".", "-", ""], [
                    () => (nixScope.stdenv["name"]),
                    () => (nixScope.xorg["libXv"]["name"]),
                    () => (nixScope.xorg["libX11"]["name"]),
                  ])),
                );
                return obj;
              });
            })(
              !(nixScope.enableFoo) || (operators.notEqual(nixScope.foo, null)),
            );
          })(
            !(nixScope.enableX11) ||
            (operators.equal(nixScope.xorg["libXv"]["name"], "libXv")),
          );
        })(operators.equal(nixScope.stdenv["name"], "stdenv2"))
      ),
    )),
  );
  defGetter(
    nixScope,
    "makeOverridable",
    (nixScope) => (createFunc(/*arg:*/ "f", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "origArgs", null, {}, nixScope, (nixScope) => (
        operators.merge(
          apply(nixScope.f, mkThunk(() => (nixScope.origArgs))),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(
              obj,
              "override",
              () => (createFunc(
                /*arg:*/ "newArgs",
                null,
                {},
                nixScope,
                (nixScope) => (
                  apply(
                    apply(
                      nixScope.makeOverridable,
                      mkThunk(() => (nixScope.f)),
                    ),
                    mkThunk(
                      () => (operators.merge(
                        nixScope.origArgs,
                        operators.ifThenElse(
                          apply(
                            nixScope.builtins["isFunction"],
                            mkThunk(() => (nixScope.newArgs)),
                          ),
                          () => (apply(
                            nixScope.newArgs,
                            mkThunk(() => (nixScope.origArgs)),
                          )),
                          () => (nixScope.newArgs),
                        ),
                      ))
                    ),
                  )
                ),
              )),
            );
            return obj;
          }),
        )
      ))
    ))),
  );
  defGetter(
    nixScope,
    "callPackage_",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "pkgs", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "f", null, {}, nixScope, (nixScope) => (
        createFunc(/*arg:*/ "args", null, {}, nixScope, (nixScope) => (
          apply(
            apply(nixScope.makeOverridable, mkThunk(() => (nixScope.f))),
            mkThunk(
              () => (operators.merge(
                apply(
                  apply(
                    nixScope.builtins["intersectAttrs"],
                    mkThunk(
                      () => (apply(
                        nixScope.builtins["functionArgs"],
                        mkThunk(() => (nixScope.f)),
                      ))
                    ),
                  ),
                  mkThunk(() => (nixScope.pkgs)),
                ),
                nixScope.args,
              ))
            ),
          )
        ))
      ))
    ))),
  );
  defGetter(
    nixScope,
    "allPackages",
    (
      nixScope,
    ) => (createFunc(
      {
        "overrides": (
          nixScope,
        ) => (createFunc(/*arg:*/ "pkgs", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "pkgsPrev", null, {}, nixScope, (nixScope) => (
            {}
          ))
        ))),
      },
      null,
      { args: { "overrides": true } },
      nixScope,
      (nixScope) => (
        /*let*/ createScope(nixScope, (nixScope) => {
          defGetter(
            nixScope,
            "callPackage",
            (
              nixScope,
            ) => (apply(nixScope.callPackage_, mkThunk(() => (nixScope.pkgs)))),
          );
          defGetter(
            nixScope,
            "pkgs",
            (
              nixScope,
            ) => (operators.merge(
              nixScope.pkgsStd,
              apply(
                apply(nixScope.overrides, mkThunk(() => (nixScope.pkgs))),
                mkThunk(() => (nixScope.pkgsStd)),
              ),
            )),
          );
          defGetter(
            nixScope,
            "pkgsStd",
            (nixScope) => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "pkgs", () => (nixScope.pkgs));
              defGetter(
                obj,
                "stdenv",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.stdenvFun)),
                  ),
                  mkThunk(() => ({})),
                )),
              );
              defGetter(
                obj,
                "stdenv2",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.stdenv2Fun)),
                  ),
                  mkThunk(() => ({})),
                )),
              );
              defGetter(
                obj,
                "fetchurl",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.fetchurlFun)),
                  ),
                  mkThunk(() => ({})),
                )),
              );
              defGetter(
                obj,
                "aterm",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.atermFun)),
                  ),
                  mkThunk(() => ({})),
                )),
              );
              defGetter(
                obj,
                "xorg",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.xorgFun)),
                  ),
                  mkThunk(() => ({})),
                )),
              );
              defGetter(
                obj,
                "mplayer",
                () => (apply(
                  apply(
                    nixScope.callPackage,
                    mkThunk(() => (nixScope.mplayerFun)),
                  ),
                  mkThunk(() => (createScope(nixScope, (nixScope) => {
                    const obj = {};
                    defGetter(obj, "stdenv", () => (nixScope.pkgs["stdenv2"]));
                    defGetter(obj, "enableFoo", () => (false));
                    return obj;
                  }))),
                )),
              );
              defGetter(
                obj,
                "nix",
                () => (apply(
                  apply(nixScope.callPackage, mkThunk(() => (nixScope.nixFun))),
                  mkThunk(() => ({})),
                )),
              );
              return obj;
            })),
          );
          return nixScope.pkgs;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "libX11Fun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "name", () => ("libX11"));
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "libX11_2Fun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "name", () => ("libX11_2"));
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "libXvFun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "stdenv": false, "fetchurl": false, "libX11": false } },
      nixScope,
      (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "name", () => ("libXv"));
          return obj;
        })
      ),
    )),
  );
  defGetter(
    nixScope,
    "xorgFun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "pkgs": false } },
      nixScope,
      (nixScope) => (
        /*let*/ createScope(nixScope, (nixScope) => {
          defGetter(
            nixScope,
            "callPackage",
            (
              nixScope,
            ) => (apply(
              nixScope.callPackage_,
              mkThunk(
                () => (operators.merge(nixScope.pkgs, nixScope.pkgs["xorg"]))
              ),
            )),
          );
          return createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(
              obj,
              "libX11",
              () => (apply(
                apply(
                  nixScope.callPackage,
                  mkThunk(() => (nixScope.libX11Fun)),
                ),
                mkThunk(() => ({})),
              )),
            );
            defGetter(
              obj,
              "libXv",
              () => (apply(
                apply(nixScope.callPackage, mkThunk(() => (nixScope.libXvFun))),
                mkThunk(() => ({})),
              )),
            );
            return obj;
          });
        })
      ),
    )),
  );
  return /*let*/ createScope(nixScope, (nixScope) => {
    defGetter(
      nixScope,
      "pkgs",
      (nixScope) => (apply(nixScope.allPackages, mkThunk(() => ({})))),
    );
    defGetter(
      nixScope,
      "pkgs2",
      (
        nixScope,
      ) => (apply(
        nixScope.allPackages,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "overrides",
            () => (createFunc(
              /*arg:*/ "pkgs",
              null,
              {},
              nixScope,
              (nixScope) => (
                createFunc(
                  /*arg:*/ "pkgsPrev",
                  null,
                  {},
                  nixScope,
                  (nixScope) => (
                    createScope(nixScope, (nixScope) => {
                      const obj = {};
                      defGetter(
                        obj,
                        "stdenv",
                        () => (nixScope.pkgs["stdenv2"]),
                      );
                      defGetter(
                        obj,
                        "nix",
                        () => (apply(
                          nixScope.pkgsPrev["nix"]["override"],
                          mkThunk(() => (createScope(nixScope, (nixScope) => {
                            const obj = {};
                            defGetter(
                              obj,
                              "aterm",
                              () => (apply(
                                nixScope.aterm2Fun,
                                mkThunk(
                                  () => (createScope(nixScope, (nixScope) => {
                                    const obj = {};
                                    defGetter(
                                      obj,
                                      "stdenv",
                                      () => (nixScope.pkgs.stdenv),
                                    );
                                    defGetter(
                                      obj,
                                      "fetchurl",
                                      () => (nixScope.pkgs.fetchurl),
                                    );
                                    return obj;
                                  }))
                                ),
                              )),
                            );
                            return obj;
                          }))),
                        )),
                      );
                      defGetter(
                        obj,
                        "xorg",
                        () => (operators.merge(
                          nixScope.pkgsPrev["xorg"],
                          createScope(nixScope, (nixScope) => {
                            const obj = {};
                            defGetter(
                              obj,
                              "libX11",
                              () => (apply(
                                nixScope.libX11_2Fun,
                                mkThunk(
                                  () => (createScope(nixScope, (nixScope) => {
                                    const obj = {};
                                    defGetter(
                                      obj,
                                      "stdenv",
                                      () => (nixScope.pkgs.stdenv),
                                    );
                                    defGetter(
                                      obj,
                                      "fetchurl",
                                      () => (nixScope.pkgs.fetchurl),
                                    );
                                    return obj;
                                  }))
                                ),
                              )),
                            );
                            return obj;
                          }),
                        )),
                      );
                      return obj;
                    })
                  ),
                )
              ),
            )),
          );
          return obj;
        }))),
      )),
    );
    return [
      nixScope.pkgs["stdenv"]["name"],
      nixScope.pkgs["fetchurl"]["name"],
      nixScope.pkgs["aterm"]["name"],
      nixScope.pkgs2["aterm"]["name"],
      nixScope.pkgs["xorg"]["libX11"]["name"],
      nixScope.pkgs["xorg"]["libXv"]["name"],
      nixScope.pkgs["mplayer"]["name"],
      nixScope.pkgs2["mplayer"]["name"],
      nixScope.pkgs["nix"]["name"],
      nixScope.pkgs2["nix"]["name"],
    ];
  });
});
