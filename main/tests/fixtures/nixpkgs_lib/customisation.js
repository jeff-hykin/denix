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
      Object.defineProperty(nixScope, "overrideDerivation", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "newDrv", {
                  enumerable: true,
                  get() {
                    return nixScope.derivation(
                      operators.merge(
                        nixScope.drv["drvAttrs"],
                        nixScope.f(nixScope.drv),
                      ),
                    );
                  },
                });
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
          ));
        },
      });
      Object.defineProperty(nixScope, "makeOverridable", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "mirrorArgs", {
                enumerable: true,
                get() {
                  return nixScope.mirrorFunctionArgs(nixScope.f);
                },
              });
              return nixScope.mirrorArgs(
                createFunc(/*arg:*/ "origArgs", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "result", {
                      enumerable: true,
                      get() {
                        return nixScope.f(nixScope.origArgs);
                      },
                    });
                    Object.defineProperty(nixScope, "overrideWith", {
                      enumerable: true,
                      get() {
                        return createFunc(
                          /*arg:*/ "newArgs",
                          null,
                          {},
                          (nixScope) => (
                            operators.merge(
                              nixScope.origArgs,
                              operators.ifThenElse(
                                nixScope.isFunction(nixScope.newArgs),
                                () => (nixScope.newArgs(nixScope.origArgs)),
                                () => (nixScope.newArgs),
                              ),
                            )
                          ),
                        );
                      },
                    });
                    Object.defineProperty(nixScope, "overrideArgs", {
                      enumerable: true,
                      get() {
                        return nixScope.mirrorArgs(
                          createFunc(
                            /*arg:*/ "newArgs",
                            null,
                            {},
                            (nixScope) => (
                              nixScope.makeOverridable(nixScope.f)(
                                nixScope.overrideWith(nixScope.newArgs),
                              )
                            ),
                          ),
                        );
                      },
                    });
                    Object.defineProperty(nixScope, "overrideResult", {
                      enumerable: true,
                      get() {
                        return createFunc(
                          /*arg:*/ "g",
                          null,
                          {},
                          (nixScope) => (
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
                          ),
                        );
                      },
                    });
                    return (operators.ifThenElse(
                      nixScope.isAttrs(nixScope.result),
                      () => (operators.merge(
                        nixScope.result,
                        createScope((nixScope) => {
                          const obj = {};
                          obj["override"] = nixScope.overrideArgs;
                          obj["overrideDerivation"] = createFunc(
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
          ));
        },
      });
      Object.defineProperty(nixScope, "callPackageWith", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "autoArgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "f", {
                    enumerable: true,
                    get() {
                      return (operators.ifThenElse(
                        nixScope.isFunction(nixScope.fn),
                        () => (nixScope.fn),
                        () => (nixScope.import(nixScope.fn)),
                      ));
                    },
                  });
                  Object.defineProperty(nixScope, "fargs", {
                    enumerable: true,
                    get() {
                      return nixScope.functionArgs(nixScope.f);
                    },
                  });
                  Object.defineProperty(nixScope, "allArgs", {
                    enumerable: true,
                    get() {
                      return operators.merge(
                        nixScope.intersectAttrs(nixScope.fargs)(
                          nixScope.autoArgs,
                        ),
                        nixScope.args,
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "missingArgs", {
                    enumerable: true,
                    get() {
                      return (nixScope.filterAttrs(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            operators.negate(nixScope.value)
                          ))
                        )),
                      )(
                        nixScope.removeAttrs(nixScope.fargs)(
                          nixScope.attrNames(nixScope.allArgs),
                        ),
                      ));
                    },
                  });
                  Object.defineProperty(nixScope, "getSuggestions", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "arg",
                        null,
                        {},
                        (nixScope) => (
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
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "prettySuggestions", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "suggestions",
                        null,
                        {},
                        (nixScope) => (
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
                                () => (nixScope.elemAt(nixScope.suggestions)(
                                  0n,
                                )),
                              ])),
                              () => (new InterpolatedString([
                                ", did you mean ",
                                " or ",
                                "?",
                              ], [
                                () => (nixScope.concatStringsSep(", ")(
                                  nixScope.lib["init"](nixScope.suggestions),
                                )),
                                () => (nixScope.lib["last"](
                                  nixScope.suggestions,
                                )),
                              ])),
                            )),
                          )
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "errorForArg", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "arg",
                        null,
                        {},
                        (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "loc", {
                              enumerable: true,
                              get() {
                                return nixScope.builtins["unsafeGetAttrPos"](
                                  nixScope.arg,
                                )(nixScope.fargs);
                              },
                            });
                            Object.defineProperty(nixScope, "loc'", {
                              enumerable: true,
                              get() {
                                return (operators.ifThenElse(
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
                                      nixScope.lib["filesystem"]
                                        ["resolveDefaultNix"](nixScope.fn),
                                    )),
                                    () => ("<unknown location>"),
                                  )),
                                ));
                              },
                            });
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
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "error", {
                    enumerable: true,
                    get() {
                      return nixScope.errorForArg(
                        nixScope.head(nixScope.attrNames(nixScope.missingArgs)),
                      );
                    },
                  });
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
          ));
        },
      });
      Object.defineProperty(nixScope, "callPackagesWith", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "autoArgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "f", {
                    enumerable: true,
                    get() {
                      return (operators.ifThenElse(
                        nixScope.isFunction(nixScope.fn),
                        () => (nixScope.fn),
                        () => (nixScope.import(nixScope.fn)),
                      ));
                    },
                  });
                  Object.defineProperty(nixScope, "auto", {
                    enumerable: true,
                    get() {
                      return nixScope.intersectAttrs(
                        nixScope.functionArgs(nixScope.f),
                      )(nixScope.autoArgs);
                    },
                  });
                  Object.defineProperty(nixScope, "mirrorArgs", {
                    enumerable: true,
                    get() {
                      return nixScope.mirrorFunctionArgs(nixScope.f);
                    },
                  });
                  Object.defineProperty(nixScope, "origArgs", {
                    enumerable: true,
                    get() {
                      return operators.merge(nixScope.auto, nixScope.args);
                    },
                  });
                  Object.defineProperty(nixScope, "pkgs", {
                    enumerable: true,
                    get() {
                      return nixScope.f(nixScope.origArgs);
                    },
                  });
                  Object.defineProperty(nixScope, "mkAttrOverridable", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "name",
                        null,
                        {},
                        (nixScope) => (
                          createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                            nixScope.makeOverridable(
                              nixScope.mirrorArgs(
                                createFunc(
                                  /*arg:*/ "newArgs",
                                  null,
                                  {},
                                  (nixScope) => (
                                    (nixScope.f(nixScope.newArgs))[
                                      nixScope.name
                                    ]
                                  ),
                                ),
                              ),
                            )(nixScope.origArgs)
                          ))
                        ),
                      );
                    },
                  });
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
          ));
        },
      });
      Object.defineProperty(nixScope, "extendDerivation", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "condition", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "passthru", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "outputs", {
                    enumerable: true,
                    get() {
                      return operators.selectOrDefault(nixScope.drv, [
                        "outputs",
                      ], ["out"]);
                    },
                  });
                  Object.defineProperty(nixScope, "commonAttrs", {
                    enumerable: true,
                    get() {
                      return operators.merge(
                        nixScope.drv,
                        operators.merge(
                          nixScope.listToAttrs(nixScope.outputsList),
                          operators.merge(
                            {
                              "all": nixScope.map(
                                createFunc(
                                  /*arg:*/ "x",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.x["value"]
                                  ),
                                ),
                              )(nixScope.outputsList),
                            },
                            nixScope.passthru,
                          ),
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "outputToAttrListElement", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "outputName",
                        null,
                        {},
                        (nixScope) => (
                          {
                            "name": nixScope.outputName,
                            "value": operators.merge(
                              nixScope.commonAttrs,
                              operators.merge(
                                createScope((nixScope) => {
                                  const obj = {};
                                  obj["type"] =
                                    nixScope.drv[nixScope.outputName]["type"];
                                  obj["outputName"] =
                                    nixScope
                                      .drv[nixScope.outputName]["outputName"];
                                  obj["outputSpecified"] = true;
                                  obj["drvPath"] = ((_cond) => {
                                    if (!_cond) {
                                      throw new Error(
                                        "assertion failed: " + "condition",
                                      );
                                    }
                                    return nixScope
                                      .drv[nixScope.outputName]["drvPath"];
                                  })(nixScope.condition);
                                  obj["outPath"] = ((_cond) => {
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
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "outputsList", {
                    enumerable: true,
                    get() {
                      return nixScope.map(nixScope.outputToAttrListElement)(
                        nixScope.outputs,
                      );
                    },
                  });
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
          ));
        },
      });
      Object.defineProperty(nixScope, "hydraJob", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "outputs", {
                enumerable: true,
                get() {
                  return operators.selectOrDefault(nixScope.drv, ["outputs"], [
                    "out",
                  ]);
                },
              });
              Object.defineProperty(nixScope, "commonAttrs", {
                enumerable: true,
                get() {
                  return operators.merge(
                    createScope((nixScope) => {
                      const obj = {};
                      obj["name"] = nixScope.drv["name"];
                      obj["system"] = nixScope.drv["system"];
                      obj["meta"] = nixScope.drv["meta"];
                      obj["outputs"] = nixScope.outputs;
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
                  );
                },
              });
              Object.defineProperty(nixScope, "makeOutput", {
                enumerable: true,
                get() {
                  return createFunc(
                    /*arg:*/ "outputName",
                    null,
                    {},
                    (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        Object.defineProperty(nixScope, "output", {
                          enumerable: true,
                          get() {
                            return nixScope.drv[nixScope.outputName];
                          },
                        });
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
                    ),
                  );
                },
              });
              Object.defineProperty(nixScope, "outputsList", {
                enumerable: true,
                get() {
                  return nixScope.map(nixScope.makeOutput)(nixScope.outputs);
                },
              });
              Object.defineProperty(nixScope, "drv'", {
                enumerable: true,
                get() {
                  return (nixScope.head(nixScope.outputsList))["value"];
                },
              });
              return (operators.ifThenElse(
                operators.equal(nixScope.drv, null),
                () => (null),
                () => (nixScope.deepSeq(nixScope["drv'"])(nixScope["drv'"])),
              ));
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "makeScope", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "newScope", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "self", {
                  enumerable: true,
                  get() {
                    return operators.merge(
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
                    );
                  },
                });
                return nixScope.self;
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "makeScopeWithSplicing", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "splicePackages", null, {}, (nixScope) => (
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
          ));
        },
      });
      Object.defineProperty(nixScope, "makeScopeWithSplicing'", {
        enumerable: true,
        get() {
          return createFunc({}, null, {}, (nixScope) => (
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
                  Object.defineProperty(nixScope, "spliced0", {
                    enumerable: true,
                    get() {
                      return nixScope.splicePackages({
                        "pkgsBuildBuild":
                          nixScope.otherSplices["selfBuildBuild"],
                        "pkgsBuildHost": nixScope.otherSplices["selfBuildHost"],
                        "pkgsBuildTarget":
                          nixScope.otherSplices["selfBuildTarget"],
                        "pkgsHostHost": nixScope.otherSplices["selfHostHost"],
                        "pkgsHostTarget": nixScope.self,
                        "pkgsTargetTarget":
                          nixScope.otherSplices["selfTargetTarget"],
                      });
                    },
                  });
                  Object.defineProperty(nixScope, "spliced", {
                    enumerable: true,
                    get() {
                      return operators.merge(
                        nixScope.extra(nixScope.spliced0),
                        operators.merge(
                          nixScope.spliced0,
                          nixScope.keep(nixScope.self),
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "self", {
                    enumerable: true,
                    get() {
                      return operators.merge(
                        nixScope.f(nixScope.self),
                        {
                          "newScope": createFunc(
                            /*arg:*/ "scope",
                            null,
                            {},
                            (nixScope) => (
                              nixScope.newScope(
                                operators.merge(
                                  nixScope.spliced,
                                  nixScope.scope,
                                ),
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
                      );
                    },
                  });
                  return nixScope.self;
                })
              ),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "extendMkDerivation", {
        enumerable: true,
        get() {
          return /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "extendsWithExclusion", {
              enumerable: true,
              get() {
                return createFunc(
                  /*arg:*/ "excludedNames",
                  null,
                  {},
                  (nixScope) => (
                    createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "previous", {
                              enumerable: true,
                              get() {
                                return nixScope.f(nixScope.final);
                              },
                            });
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
                  ),
                );
              },
            });
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
          });
        },
      });
      return nixScope;
    });
  })
));
