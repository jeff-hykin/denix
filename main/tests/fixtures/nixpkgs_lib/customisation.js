export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.intersectAttrs = nixScope.builtins["intersectAttrs"];
    nixScope.functionArgs = nixScope.lib["functionArgs"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.mirrorFunctionArgs = nixScope.lib["mirrorFunctionArgs"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.setFunctionArgs = nixScope.lib["setFunctionArgs"];
    nixScope.optionalAttrs = nixScope.lib["optionalAttrs"];
    nixScope.attrNames = nixScope.lib["attrNames"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope.elemAt = nixScope.lib["elemAt"];
    nixScope.concatStringsSep = nixScope.lib["concatStringsSep"];
    nixScope.sortOn = nixScope.lib["sortOn"];
    nixScope.take = nixScope.lib["take"];
    nixScope.length = nixScope.lib["length"];
    nixScope.filterAttrs = nixScope.lib["filterAttrs"];
    nixScope.optionalString = nixScope.lib["optionalString"];
    nixScope.flip = nixScope.lib["flip"];
    nixScope.pathIsDirectory = nixScope.lib["pathIsDirectory"];
    nixScope.head = nixScope.lib["head"];
    nixScope.pipe = nixScope.lib["pipe"];
    nixScope.isDerivation = nixScope.lib["isDerivation"];
    nixScope.listToAttrs = nixScope.lib["listToAttrs"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.seq = nixScope.lib["seq"];
    nixScope.flatten = nixScope.lib["flatten"];
    nixScope.deepSeq = nixScope.lib["deepSeq"];
    nixScope.extends = nixScope.lib["extends"];
    nixScope.toFunction = nixScope.lib["toFunction"];
    nixScope.id = nixScope.lib["id"];
    nixScope.levenshtein = nixScope.lib["strings"]["levenshtein"];
    nixScope.levenshteinAtMost = nixScope.lib["strings"]["levenshteinAtMost"];
    return /*rec*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "overrideDerivation",
        (nixScope) =>
          createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "newDrv", (nixScope) =>
                  nixScope.derivation(
                    operators.merge(
                      nixScope.drv["drvAttrs"],
                      nixScope.f(nixScope.drv),
                    ),
                  ));
                return nixScope.flip(
                  nixScope.extendDerivation(
                    nixScope.seq(nixScope.drv["drvPath"])(true),
                  ),
                )(nixScope.newDrv)(operators.merge(
                  {
                    "meta": operators.selectOrDefault(
                      nixScope.drv,
                      ["meta"],
                      {},
                    ),
                    "passthru":
                      (operators.ifThenElse(
                        operators.hasAttr(nixScope.drv, "passthru"),
                        () => (nixScope.drv["passthru"]),
                        () => ({}),
                      )),
                  },
                  operators.merge(
                    operators.selectOrDefault(nixScope.drv, ["passthru"], {}),
                    nixScope.optionalAttrs(
                      operators.hasAttr(nixScope.drv, "__spliced"),
                    )({
                      "__spliced": operators.merge(
                        {},
                        nixScope.mapAttrs(
                          createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "sDrv",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.overrideDerivation(nixScope.sDrv)(
                                  nixScope.f,
                                )
                              ),
                            )
                          )),
                        )(nixScope.drv["__spliced"]),
                      ),
                    }),
                  ),
                ));
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "makeOverridable",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "mirrorArgs",
                (nixScope) => nixScope.mirrorFunctionArgs(nixScope.f),
              );
              return nixScope.mirrorArgs(
                createFunc(/*arg:*/ "origArgs", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "result", (nixScope) =>
                      nixScope.f(nixScope.origArgs));
                    defGetter(nixScope, "overrideWith", (nixScope) =>
                      createFunc(/*arg:*/ "newArgs", null, {}, (nixScope) => (
                        operators.merge(
                          nixScope.origArgs,
                          operators.ifThenElse(
                            nixScope.isFunction(nixScope.newArgs),
                            () => (nixScope.newArgs(nixScope.origArgs)),
                            () => (nixScope.newArgs),
                          ),
                        )
                      )));
                    defGetter(nixScope, "overrideArgs", (nixScope) =>
                      nixScope.mirrorArgs(
                        createFunc(/*arg:*/ "newArgs", null, {}, (nixScope) => (
                          nixScope.makeOverridable(nixScope.f)(
                            nixScope.overrideWith(nixScope.newArgs),
                          )
                        )),
                      ));
                    defGetter(nixScope, "overrideResult", (nixScope) =>
                      createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
                        nixScope.makeOverridable(
                          nixScope.mirrorArgs(
                            createFunc(
                              /*arg:*/ "args",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.g(nixScope.f(nixScope.args))
                              ),
                            ),
                          ),
                        )(nixScope.origArgs)
                      )));
                    return (operators.ifThenElse(
                      nixScope.isAttrs(nixScope.result),
                      () => (operators.merge(
                        nixScope.result,
                        createScope((nixScope) => {
                          const obj = {};
                          obj.override = nixScope.overrideArgs;
                          obj.overrideDerivation = createFunc(
                            /*arg:*/ "fdrv",
                            null,
                            {},
                            (nixScope) => (
                              nixScope.overrideResult(
                                createFunc(
                                  /*arg:*/ "x",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.overrideDerivation(nixScope.x)(
                                      nixScope.fdrv,
                                    )
                                  ),
                                ),
                              )
                            ),
                          );
                          obj[
                            operators.ifThenElse(
                              operators.hasAttr(
                                nixScope.result,
                                "overrideAttrs",
                              ),
                              () => ("overrideAttrs"),
                              () => (null),
                            )
                          ] = createFunc(
                            /*arg:*/ "fdrv",
                            null,
                            {},
                            (nixScope) => (
                              nixScope.overrideResult(
                                createFunc(
                                  /*arg:*/ "x",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.x["overrideAttrs"](nixScope.fdrv)
                                  ),
                                ),
                              )
                            ),
                          );
                          return obj;
                        }),
                      )),
                      () => (operators.ifThenElse(
                        nixScope.isFunction(nixScope.result),
                        () => (operators.merge(
                          nixScope.setFunctionArgs(nixScope.result)(
                            nixScope.functionArgs(nixScope.result),
                          ),
                          { "override": nixScope.overrideArgs },
                        )),
                        () => (nixScope.result),
                      )),
                    ));
                  })
                )),
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "callPackageWith",
        (nixScope) =>
          createFunc(/*arg:*/ "autoArgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "f",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      nixScope.isFunction(nixScope.fn),
                      () => (nixScope.fn),
                      () => (nixScope.import(nixScope.fn)),
                    )),
                  );
                  defGetter(
                    nixScope,
                    "fargs",
                    (nixScope) => nixScope.functionArgs(nixScope.f),
                  );
                  defGetter(nixScope, "allArgs", (nixScope) =>
                    operators.merge(
                      nixScope.intersectAttrs(nixScope.fargs)(
                        nixScope.autoArgs,
                      ),
                      nixScope.args,
                    ));
                  defGetter(
                    nixScope,
                    "missingArgs",
                    (
                      nixScope,
                    ) => (nixScope.filterAttrs(
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                          operators.negate(nixScope.value)
                        ))
                      )),
                    )(
                      nixScope.removeAttrs(nixScope.fargs)(
                        nixScope.attrNames(nixScope.allArgs),
                      ),
                    )),
                  );
                  defGetter(nixScope, "getSuggestions", (nixScope) =>
                    createFunc(/*arg:*/ "arg", null, {}, (nixScope) => (
                      nixScope.pipe(
                        operators.merge(nixScope.autoArgs, nixScope.args),
                      )([
                        nixScope.attrNames,
                        nixScope.filter(
                          nixScope.levenshteinAtMost(2n)(nixScope.arg),
                        ),
                        nixScope.sortOn(nixScope.levenshtein(nixScope.arg)),
                        nixScope.take(3n),
                        nixScope.map(
                          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                            operators.add(operators.add("", nixScope.x), "")
                          )),
                        ),
                      ])
                    )));
                  defGetter(nixScope, "prettySuggestions", (nixScope) =>
                    createFunc(/*arg:*/ "suggestions", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.suggestions, []),
                        () => (""),
                        () => (operators.ifThenElse(
                          operators.equal(
                            nixScope.length(nixScope.suggestions),
                            1n,
                          ),
                          () => (new InterpolatedString([
                            ", did you mean ",
                            "?",
                          ], [
                            () => (nixScope.elemAt(nixScope.suggestions)(0n)),
                          ])),
                          () => (new InterpolatedString([
                            ", did you mean ",
                            " or ",
                            "?",
                          ], [
                            () => (nixScope.concatStringsSep(", ")(
                              nixScope.lib["init"](nixScope.suggestions),
                            )),
                            () => (nixScope.lib["last"](nixScope.suggestions)),
                          ])),
                        )),
                      )
                    )));
                  defGetter(nixScope, "errorForArg", (nixScope) =>
                    createFunc(/*arg:*/ "arg", null, {}, (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "loc",
                          (nixScope) =>
                            nixScope.builtins["unsafeGetAttrPos"](nixScope.arg)(
                              nixScope.fargs,
                            ),
                        );
                        defGetter(
                          nixScope,
                          "loc'",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            operators.notEqual(nixScope.loc, null),
                            () => (operators.add(
                              operators.add(nixScope.loc["file"], ":"),
                              nixScope.toString(nixScope.loc["line"]),
                            )),
                            () => (operators.ifThenElse(
                              operators.negate(
                                nixScope.isFunction(nixScope.fn),
                              ),
                              () => (nixScope.toString(
                                nixScope.lib["filesystem"]["resolveDefaultNix"](
                                  nixScope.fn,
                                ),
                              )),
                              () => ("<unknown location>"),
                            )),
                          )),
                        );
                        return operators.add(
                          new InterpolatedString([
                            "Function called without required argument ",
                            " at ",
                          ], [() => (nixScope.arg)]),
                          new InterpolatedString(["", "", ""], [
                            () => (nixScope["loc'"]),
                            () => (nixScope.prettySuggestions(
                              nixScope.getSuggestions(nixScope.arg),
                            )),
                          ]),
                        );
                      })
                    )));
                  defGetter(
                    nixScope,
                    "error",
                    (nixScope) =>
                      nixScope.errorForArg(
                        nixScope.head(nixScope.attrNames(nixScope.missingArgs)),
                      ),
                  );
                  return (operators.ifThenElse(
                    operators.equal(nixScope.missingArgs, {}),
                    () => (nixScope.makeOverridable(nixScope.f)(
                      nixScope.allArgs,
                    )),
                    () => (nixScope.abort(
                      new InterpolatedString([
                        "lib.customisation.callPackageWith: ",
                        "",
                      ], [() => (nixScope.error)]),
                    )),
                  ));
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "callPackagesWith",
        (nixScope) =>
          createFunc(/*arg:*/ "autoArgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "f",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      nixScope.isFunction(nixScope.fn),
                      () => (nixScope.fn),
                      () => (nixScope.import(nixScope.fn)),
                    )),
                  );
                  defGetter(nixScope, "auto", (nixScope) =>
                    nixScope.intersectAttrs(nixScope.functionArgs(nixScope.f))(
                      nixScope.autoArgs,
                    ));
                  defGetter(
                    nixScope,
                    "mirrorArgs",
                    (nixScope) => nixScope.mirrorFunctionArgs(nixScope.f),
                  );
                  defGetter(
                    nixScope,
                    "origArgs",
                    (nixScope) => operators.merge(nixScope.auto, nixScope.args),
                  );
                  defGetter(
                    nixScope,
                    "pkgs",
                    (nixScope) => nixScope.f(nixScope.origArgs),
                  );
                  defGetter(nixScope, "mkAttrOverridable", (nixScope) =>
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                        nixScope.makeOverridable(
                          nixScope.mirrorArgs(
                            createFunc(
                              /*arg:*/ "newArgs",
                              null,
                              {},
                              (nixScope) => (
                                (nixScope.f(nixScope.newArgs))[nixScope.name]
                              ),
                            ),
                          ),
                        )(nixScope.origArgs)
                      ))
                    )));
                  return (operators.ifThenElse(
                    nixScope.isDerivation(nixScope.pkgs),
                    () => (nixScope.throw(
                      operators.add(
                        operators.add(
                          "function `callPackages` was called on a *single* derivation ",
                          new InterpolatedString(['"', '";'], [
                            () => (operators.selectOrDefault(nixScope.pkgs, [
                              "name",
                            ], "<unknown-name>")),
                          ]),
                        ),
                        " did you mean to use `callPackage` instead?",
                      ),
                    )),
                    () => (nixScope.mapAttrs(nixScope.mkAttrOverridable)(
                      nixScope.pkgs,
                    )),
                  ));
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "extendDerivation",
        (nixScope) =>
          createFunc(/*arg:*/ "condition", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "passthru", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "outputs", (nixScope) =>
                    operators.selectOrDefault(nixScope.drv, ["outputs"], [
                      "out",
                    ]));
                  defGetter(nixScope, "commonAttrs", (nixScope) =>
                    operators.merge(
                      nixScope.drv,
                      operators.merge(
                        nixScope.listToAttrs(nixScope.outputsList),
                        operators.merge(
                          {
                            "all": nixScope.map(
                              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                                nixScope.x["value"]
                              )),
                            )(nixScope.outputsList),
                          },
                          nixScope.passthru,
                        ),
                      ),
                    ));
                  defGetter(nixScope, "outputToAttrListElement", (nixScope) =>
                    createFunc(/*arg:*/ "outputName", null, {}, (nixScope) => (
                      {
                        "name": nixScope.outputName,
                        "value": operators.merge(
                          nixScope.commonAttrs,
                          operators.merge(
                            createScope((nixScope) => {
                              const obj = {};
                              obj.type = nixScope.drv[nixScope.outputName].type;
                              obj.outputName =
                                nixScope.drv[nixScope.outputName].outputName;
                              obj.outputSpecified = true;
                              obj.drvPath = ((_cond) => {
                                if (!_cond) {
                                  throw new Error(
                                    "assertion failed: " + "condition",
                                  );
                                }
                                return nixScope
                                  .drv[nixScope.outputName]["drvPath"];
                              })(nixScope.condition);
                              obj.outPath = ((_cond) => {
                                if (!_cond) {
                                  throw new Error(
                                    "assertion failed: " + "condition",
                                  );
                                }
                                return nixScope
                                  .drv[nixScope.outputName]["outPath"];
                              })(nixScope.condition);
                              return obj;
                            }),
                            nixScope.optionalAttrs(
                              operators.hasAttr(
                                nixScope.passthru,
                                "overrideAttrs",
                              ),
                            )({
                              "overrideAttrs": createFunc(
                                /*arg:*/ "f",
                                null,
                                {},
                                (nixScope) => (
                                  (nixScope.passthru["overrideAttrs"](
                                    nixScope.f,
                                  ))[nixScope.outputName]
                                ),
                              ),
                            }),
                          ),
                        ),
                      }
                    )));
                  defGetter(nixScope, "outputsList", (nixScope) =>
                    nixScope.map(nixScope.outputToAttrListElement)(
                      nixScope.outputs,
                    ));
                  return operators.merge(
                    nixScope.commonAttrs,
                    {
                      "drvPath": ((_cond) => {
                        if (!_cond) {
                          throw new Error("assertion failed: " + "condition");
                        }
                        return nixScope.drv["drvPath"];
                      })(nixScope.condition),
                      "outPath": ((_cond) => {
                        if (!_cond) {
                          throw new Error("assertion failed: " + "condition");
                        }
                        return nixScope.drv["outPath"];
                      })(nixScope.condition),
                    },
                  );
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "hydraJob",
        (nixScope) =>
          createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "outputs",
                (nixScope) =>
                  operators.selectOrDefault(nixScope.drv, ["outputs"], ["out"]),
              );
              defGetter(nixScope, "commonAttrs", (nixScope) =>
                operators.merge(
                  createScope((nixScope) => {
                    const obj = {};
                    obj.name = nixScope.drv.name;
                    obj.system = nixScope.drv.system;
                    obj.meta = nixScope.drv.meta;
                    obj.outputs = nixScope.outputs;
                    return obj;
                  }),
                  operators.merge(
                    nixScope.optionalAttrs(
                      operators.selectOrDefault(nixScope.drv, [
                        "_hydraAggregate",
                      ], false),
                    )({
                      "_hydraAggregate": true,
                      "constituents": nixScope.map(nixScope.hydraJob)(
                        nixScope.flatten(nixScope.drv["constituents"]),
                      ),
                    }),
                    nixScope.listToAttrs(nixScope.outputsList),
                  ),
                ));
              defGetter(nixScope, "makeOutput", (nixScope) =>
                createFunc(/*arg:*/ "outputName", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "output",
                      (nixScope) => nixScope.drv[nixScope.outputName],
                    );
                    return ({
                      "name": nixScope.outputName,
                      "value": operators.merge(
                        nixScope.commonAttrs,
                        {
                          "outPath": nixScope.output["outPath"],
                          "drvPath": nixScope.output["drvPath"],
                          "type": "derivation",
                          "outputName": nixScope.outputName,
                        },
                      ),
                    });
                  })
                )));
              defGetter(
                nixScope,
                "outputsList",
                (nixScope) =>
                  nixScope.map(nixScope.makeOutput)(nixScope.outputs),
              );
              defGetter(
                nixScope,
                "drv'",
                (nixScope) => (nixScope.head(nixScope.outputsList))["value"],
              );
              return (operators.ifThenElse(
                operators.equal(nixScope.drv, null),
                () => (null),
                () => (nixScope.deepSeq(nixScope["drv'"])(nixScope["drv'"])),
              ));
            })
          )),
      );
      defGetter(
        nixScope,
        "makeScope",
        (nixScope) =>
          createFunc(/*arg:*/ "newScope", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "self", (nixScope) =>
                  operators.merge(
                    nixScope.f(nixScope.self),
                    {
                      "newScope": createFunc(
                        /*arg:*/ "scope",
                        null,
                        {},
                        (nixScope) => (
                          nixScope.newScope(
                            operators.merge(nixScope.self, nixScope.scope),
                          )
                        ),
                      ),
                      "callPackage": nixScope.self["newScope"]({}),
                      "overrideScope": createFunc(
                        /*arg:*/ "g",
                        null,
                        {},
                        (nixScope) => (
                          nixScope.makeScope(nixScope.newScope)(
                            nixScope.extends(nixScope.g)(nixScope.f),
                          )
                        ),
                      ),
                      "packages": nixScope.f,
                    },
                  ));
                return nixScope.self;
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "makeScopeWithSplicing",
        (nixScope) =>
          createFunc(/*arg:*/ "splicePackages", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "newScope", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "otherSplices", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "keep", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "extra", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                      nixScope["makeScopeWithSplicing'"](
                        {
                          "splicePackages": nixScope.splicePackages,
                          "newScope": nixScope.newScope,
                        },
                      )({
                        "otherSplices": nixScope.otherSplices,
                        "keep": nixScope.keep,
                        "extra": nixScope.extra,
                        "f": nixScope.f,
                      })
                    ))
                  ))
                ))
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "makeScopeWithSplicing'",
        (nixScope) =>
          createFunc({}, null, {}, (nixScope) => (
            createFunc(
              {
                "keep": (
                  nixScope,
                ) => (createFunc(/*arg:*/ "_self", null, {}, (nixScope) => (
                  {}
                ))),
                "extra": (
                  nixScope,
                ) => (createFunc(/*arg:*/ "_spliced0", null, {}, (nixScope) => (
                  {}
                ))),
              },
              null,
              {},
              (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "spliced0", (nixScope) =>
                    nixScope.splicePackages({
                      "pkgsBuildBuild": nixScope.otherSplices["selfBuildBuild"],
                      "pkgsBuildHost": nixScope.otherSplices["selfBuildHost"],
                      "pkgsBuildTarget":
                        nixScope.otherSplices["selfBuildTarget"],
                      "pkgsHostHost": nixScope.otherSplices["selfHostHost"],
                      "pkgsHostTarget": nixScope.self,
                      "pkgsTargetTarget":
                        nixScope.otherSplices["selfTargetTarget"],
                    }));
                  defGetter(nixScope, "spliced", (nixScope) =>
                    operators.merge(
                      nixScope.extra(nixScope.spliced0),
                      operators.merge(
                        nixScope.spliced0,
                        nixScope.keep(nixScope.self),
                      ),
                    ));
                  defGetter(nixScope, "self", (nixScope) =>
                    operators.merge(
                      nixScope.f(nixScope.self),
                      {
                        "newScope": createFunc(
                          /*arg:*/ "scope",
                          null,
                          {},
                          (nixScope) => (
                            nixScope.newScope(
                              operators.merge(nixScope.spliced, nixScope.scope),
                            )
                          ),
                        ),
                        "callPackage": nixScope.newScope(nixScope.spliced),
                        "overrideScope": createFunc(
                          /*arg:*/ "g",
                          null,
                          {},
                          (nixScope) => (
                            nixScope["makeScopeWithSplicing'"](
                              {
                                "splicePackages": nixScope.splicePackages,
                                "newScope": nixScope.newScope,
                              },
                            )({
                              "otherSplices": nixScope.otherSplices,
                              "keep": nixScope.keep,
                              "extra": nixScope.extra,
                              "f": nixScope.extends(nixScope.g)(nixScope.f),
                            })
                          ),
                        ),
                        "packages": nixScope.f,
                      },
                    ));
                  return nixScope.self;
                })
              ),
            )
          )),
      );
      defGetter(
        nixScope,
        "extendMkDerivation",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "extendsWithExclusion", (nixScope) =>
              createFunc(/*arg:*/ "excludedNames", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "previous",
                          (nixScope) => nixScope.f(nixScope.final),
                        );
                        return operators.merge(
                          nixScope.removeAttrs(nixScope.previous)(
                            nixScope.excludedNames,
                          ),
                          nixScope.g(nixScope.final)(nixScope.previous),
                        );
                      })
                    ))
                  ))
                ))
              )));
            return createFunc(
              {
                "excludeDrvArgNames": (nixScope) => [],
                "inheritFunctionArgs": (nixScope) => (true),
                "transformDrv": (nixScope) => (nixScope.id),
              },
              null,
              {},
              (nixScope) => (
                operators.merge(
                  nixScope.setFunctionArgs(
                    createFunc(/*arg:*/ "fpargs", null, {}, (nixScope) => (
                      nixScope.transformDrv(
                        nixScope.constructDrv(
                          nixScope.extendsWithExclusion(
                            nixScope.excludeDrvArgNames,
                          )(nixScope.extendDrvArgs)(
                            nixScope.toFunction(nixScope.fpargs),
                          ),
                        ),
                      )
                    )),
                  )(operators.merge(
                    nixScope.optionalAttrs(nixScope.inheritFunctionArgs)(
                      nixScope.removeAttrs(
                        nixScope.functionArgs(nixScope.constructDrv),
                      )(nixScope.excludeDrvArgNames),
                    ),
                    nixScope.functionArgs(nixScope.extendDrvArgs({})),
                  )),
                  {
                    "constructDrv": nixScope.constructDrv,
                    "excludeDrvArgNames": nixScope.excludeDrvArgNames,
                    "extendDrvArgs": nixScope.extendDrvArgs,
                    "transformDrv": nixScope.transformDrv,
                  },
                )
              ),
            );
          }),
      );
      return nixScope;
    });
  })
));
