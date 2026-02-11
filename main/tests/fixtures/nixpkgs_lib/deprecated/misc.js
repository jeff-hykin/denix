export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.and = nixScope.lib["and"];
    nixScope.any = nixScope.lib["any"];
    nixScope.attrByPath = nixScope.lib["attrByPath"];
    nixScope.attrNames = nixScope.lib["attrNames"];
    nixScope.compare = nixScope.lib["compare"];
    nixScope.concat = nixScope.lib["concat"];
    nixScope.concatMap = nixScope.lib["concatMap"];
    nixScope.elem = nixScope.lib["elem"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope.foldl = nixScope.lib["foldl"];
    nixScope.foldr = nixScope.lib["foldr"];
    nixScope.genericClosure = nixScope.lib["genericClosure"];
    nixScope.head = nixScope.lib["head"];
    nixScope.imap1 = nixScope.lib["imap1"];
    nixScope.init = nixScope.lib["init"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.isInt = nixScope.lib["isInt"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.lists = nixScope.lib["lists"];
    nixScope.listToAttrs = nixScope.lib["listToAttrs"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.mergeAttrs = nixScope.lib["mergeAttrs"];
    nixScope.meta = nixScope.lib["meta"];
    nixScope.nameValuePair = nixScope.lib["nameValuePair"];
    nixScope.tail = nixScope.lib["tail"];
    nixScope.toList = nixScope.lib["toList"];
    nixScope.warn = nixScope.lib["warn"];
    nixScope.removeAttrs = nixScope.lib["attrsets"]["removeAttrs"];
    nixScope.mapAttrsToList = nixScope.lib["attrsets"]["mapAttrsToList"];
    nixScope.fakeHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    nixScope.fakeSha256 =
      "0000000000000000000000000000000000000000000000000000000000000000";
    nixScope.fakeSha512 =
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    Object.defineProperty(nixScope, "maybeEnv", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "value", {
                enumerable: true,
                get() {
                  return nixScope.builtins["getEnv"](nixScope.name);
                },
              });
              return (operators.ifThenElse(
                operators.equal(nixScope.value, ""),
                () => (nixScope.default),
                () => (nixScope.value),
              ));
            })
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "defaultMergeArg", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.builtins["isAttrs"](nixScope.y),
              () => (nixScope.y),
              () => (nixScope.y(nixScope.x)),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "defaultMerge", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
            operators.merge(
              nixScope.x,
              nixScope.defaultMergeArg(nixScope.x)(nixScope.y),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "foldArgs", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "merger", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "init", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "arg", {
                    enumerable: true,
                    get() {
                      return (nixScope.merger(nixScope.init)(
                        nixScope.defaultMergeArg(nixScope.init)(nixScope.x),
                      ));
                    },
                  });
                  Object.defineProperty(nixScope, "base", {
                    enumerable: true,
                    get() {
                      return (nixScope.setAttrMerge("passthru")({})(
                        nixScope.f(nixScope.arg),
                      )(createFunc(/*arg:*/ "z", null, {}, (nixScope) => (
                        operators.merge(nixScope.z, {
                          "function": nixScope.foldArgs(nixScope.merger)(
                            nixScope.f,
                          )(nixScope.arg),
                          "args": operators.merge(
                            nixScope.attrByPath(["passthru", "args"])({})(
                              nixScope.z,
                            ),
                            nixScope.x,
                          ),
                        })
                      ))));
                    },
                  });
                  Object.defineProperty(nixScope, "withStdOverrides", {
                    enumerable: true,
                    get() {
                      return operators.merge(
                        nixScope.base,
                        { "override": nixScope.base["passthru"]["function"] },
                      );
                    },
                  });
                  return nixScope.withStdOverrides;
                })
              ))
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "maybeAttrNullable", {
      enumerable: true,
      get() {
        return nixScope.maybeAttr;
      },
    });
    Object.defineProperty(nixScope, "maybeAttr", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              operators.selectOrDefault(
                nixScope.attrs,
                [nixScope.name],
                nixScope.default,
              )
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "ifEnable", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "val", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.cond,
              () => (nixScope.val),
              () => (operators.ifThenElse(
                nixScope.builtins["isList"](nixScope.val),
                () => [],
                () => (operators.ifThenElse(
                  nixScope.builtins["isAttrs"](nixScope.val),
                  () => ({}),
                  () => (operators.ifThenElse(
                    operators.or(
                      operators.equal(nixScope.val, true),
                      operators.equal(nixScope.val, false),
                    ),
                    () => (false),
                    () => (null),
                  )),
                )),
              )),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "checkFlag", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "attrSet", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.equal(nixScope.name, "true"),
              () => (true),
              () => (operators.ifThenElse(
                operators.equal(nixScope.name, "false"),
                () => (false),
                () => (operators.ifThenElse(
                  nixScope.elem(nixScope.name)(
                    nixScope.attrByPath(["flags"])([])(nixScope.attrSet),
                  ),
                  () => (true),
                  () => (nixScope.attrByPath([nixScope.name])(false)(
                    nixScope.attrSet,
                  )),
                )),
              )),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "getValue", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "attrSet", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "argList", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
              nixScope.attrByPath([nixScope.name])(
                operators.ifThenElse(
                  nixScope.checkFlag(nixScope.attrSet)(nixScope.name),
                  () => (true),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.argList, []),
                    () => (null),
                    () => (/*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "x", {
                        enumerable: true,
                        get() {
                          return nixScope.builtins["head"](nixScope.argList);
                        },
                      });
                      return (operators.ifThenElse(
                        operators.equal(
                          nixScope.head(nixScope.x),
                          nixScope.name,
                        ),
                        () => (nixScope.head(nixScope.tail(nixScope.x))),
                        () => (nixScope.getValue(nixScope.attrSet)(
                          nixScope.tail(nixScope.argList),
                        )(nixScope.name)),
                      ));
                    })),
                  )),
                ),
              )(nixScope.attrSet)
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "checkReqs", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "attrSet", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "argList", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "condList", null, {}, (nixScope) => (
              nixScope.foldr(nixScope.and)(true)(
                nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "name", {
                      enumerable: true,
                      get() {
                        return (nixScope.head(nixScope.x));
                      },
                    });
                    return (operators.implication(
                      nixScope.checkFlag(nixScope.attrSet)(nixScope.name),
                      nixScope.foldr(nixScope.and)(true)(
                        nixScope.map(
                          createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                            /*let*/ createScope((nixScope) => {
                              Object.defineProperty(nixScope, "val", {
                                enumerable: true,
                                get() {
                                  return (nixScope.getValue(nixScope.attrSet)(
                                    nixScope.argList,
                                  )(nixScope.y));
                                },
                              });
                              return operators.and(
                                operators.notEqual(nixScope.val, null),
                                operators.notEqual(nixScope.val, false),
                              );
                            })
                          )),
                        )(nixScope.tail(nixScope.x)),
                      ),
                    ));
                  })
                )))(nixScope.condList),
              )
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "uniqList", {
      enumerable: true,
      get() {
        return createFunc({ "acc": (nixScope) => [] }, null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "go", {
              enumerable: true,
              get() {
                return createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.equal(nixScope.xs, []),
                      () => [],
                      () => (/*let*/ createScope((nixScope) => {
                        Object.defineProperty(nixScope, "x", {
                          enumerable: true,
                          get() {
                            return nixScope.head(nixScope.xs);
                          },
                        });
                        Object.defineProperty(nixScope, "y", {
                          enumerable: true,
                          get() {
                            return (operators.ifThenElse(
                              nixScope.elem(nixScope.x)(nixScope.acc),
                              () => [],
                              () => [nixScope.x],
                            ));
                          },
                        });
                        return operators.listConcat(
                          nixScope.y,
                          nixScope.go(nixScope.tail(nixScope.xs))(
                            operators.listConcat(nixScope.y, nixScope.acc),
                          ),
                        );
                      })),
                    )
                  ))
                ));
              },
            });
            return nixScope.go(nixScope.inputList)(nixScope.acc);
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "uniqListExt", {
      enumerable: true,
      get() {
        return createFunc(
          {
            "outputList": (nixScope) => [],
            "getter": (
              nixScope,
            ) => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
            "compare": (
              nixScope,
            ) => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                operators.equal(nixScope.x, nixScope.y)
              ))
            ))),
          },
          null,
          {},
          (nixScope) => (
            operators.ifThenElse(
              operators.equal(nixScope.inputList, []),
              () => (nixScope.outputList),
              () => (/*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "x", {
                  enumerable: true,
                  get() {
                    return nixScope.head(nixScope.inputList);
                  },
                });
                Object.defineProperty(nixScope, "isX", {
                  enumerable: true,
                  get() {
                    return createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                      nixScope.compare(nixScope.getter(nixScope.y))(
                        nixScope.getter(nixScope.x),
                      )
                    ));
                  },
                });
                Object.defineProperty(nixScope, "newOutputList", {
                  enumerable: true,
                  get() {
                    return operators.listConcat(
                      nixScope.outputList,
                      operators.ifThenElse(
                        nixScope.any(nixScope.isX)(nixScope.outputList),
                        () => [],
                        () => [nixScope.x],
                      ),
                    );
                  },
                });
                return nixScope.uniqListExt(
                  {
                    "outputList": nixScope.newOutputList,
                    "inputList": (nixScope.tail(nixScope.inputList)),
                    "getter": nixScope.getter,
                    "compare": nixScope.compare,
                  },
                );
              })),
            )
          ),
        );
      },
    });
    Object.defineProperty(nixScope, "condConcat", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "checker", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(nixScope.list, []),
                () => (nixScope.name),
                () => (operators.ifThenElse(
                  nixScope.checker(nixScope.head(nixScope.list)),
                  () => (nixScope.condConcat(
                    operators.add(
                      nixScope.name,
                      nixScope.head(nixScope.tail(nixScope.list)),
                    ),
                  )(nixScope.tail(nixScope.tail(nixScope.list)))(
                    nixScope.checker,
                  )),
                  () => (nixScope.condConcat(nixScope.name)(
                    nixScope.tail(nixScope.tail(nixScope.list)),
                  )(nixScope.checker)),
                )),
              )
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "lazyGenericClosure", {
      enumerable: true,
      get() {
        return createFunc({}, null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "work", {
              enumerable: true,
              get() {
                return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "doneKeys", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "result", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.list, []),
                        () => (nixScope.result),
                        () => (/*let*/ createScope((nixScope) => {
                          Object.defineProperty(nixScope, "x", {
                            enumerable: true,
                            get() {
                              return nixScope.head(nixScope.list);
                            },
                          });
                          Object.defineProperty(nixScope, "key", {
                            enumerable: true,
                            get() {
                              return nixScope.x["key"];
                            },
                          });
                          return (operators.ifThenElse(
                            nixScope.elem(nixScope.key)(nixScope.doneKeys),
                            () => (nixScope.work(nixScope.tail(nixScope.list))(
                              nixScope.doneKeys,
                            )(nixScope.result)),
                            () => (nixScope.work(
                              operators.listConcat(
                                nixScope.tail(nixScope.list),
                                nixScope.operator(nixScope.x),
                              ),
                            )(operators.listConcat(
                              [nixScope.key],
                              nixScope.doneKeys,
                            ))(
                              operators.listConcat(
                                [nixScope.x],
                                nixScope.result,
                              ),
                            )),
                          ));
                        })),
                      )
                    ))
                  ))
                ));
              },
            });
            return nixScope.work(nixScope.startSet)([])([]);
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "innerModifySumArgs", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.b, null),
                  () => (operators.merge(
                    nixScope.f(nixScope.a)(nixScope.b),
                    nixScope.x,
                  )),
                  () => (nixScope.innerModifySumArgs(nixScope.f)(nixScope.x)(
                    operators.merge(nixScope.a, nixScope.b),
                  )),
                )
              ))
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "modifySumArgs", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.innerModifySumArgs(nixScope.f)(nixScope.x)({})
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "innerClosePropagation", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.equal(nixScope.xs, []),
              () => (nixScope.acc),
              () => (/*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "y", {
                  enumerable: true,
                  get() {
                    return nixScope.head(nixScope.xs);
                  },
                });
                Object.defineProperty(nixScope, "ys", {
                  enumerable: true,
                  get() {
                    return nixScope.tail(nixScope.xs);
                  },
                });
                return (operators.ifThenElse(
                  operators.negate(nixScope.isAttrs(nixScope.y)),
                  () => (nixScope.innerClosePropagation(nixScope.acc)(
                    nixScope.ys,
                  )),
                  () => (/*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "acc'", {
                      enumerable: true,
                      get() {
                        return operators.listConcat([nixScope.y], nixScope.acc);
                      },
                    });
                    return nixScope.innerClosePropagation(nixScope["acc'"])(
                      nixScope.uniqList({
                        "inputList": operators.listConcat(
                          nixScope.maybeAttrNullable("propagatedBuildInputs")(
                            [],
                          )(nixScope.y),
                          operators.listConcat(
                            nixScope.maybeAttrNullable(
                              "propagatedNativeBuildInputs",
                            )([])(nixScope.y),
                            nixScope.ys,
                          ),
                        ),
                        "acc": nixScope["acc'"],
                      }),
                    );
                  })),
                ));
              })),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "closePropagationSlow", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
          nixScope.uniqList(
            {
              "inputList": (nixScope.innerClosePropagation([])(nixScope.list)),
            },
          )
        ));
      },
    });
    Object.defineProperty(nixScope, "closePropagationFast", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
          nixScope.builtins["map"](
            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x["val"]
            )),
          )(nixScope.builtins["genericClosure"](
            {
              "startSet": nixScope.builtins["map"](
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  { "key": nixScope.x["outPath"], "val": nixScope.x }
                )),
              )(
                nixScope.builtins["filter"](
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    operators.notEqual(nixScope.x, null)
                  )),
                )(nixScope.list),
              ),
              "operator": createFunc(/*arg:*/ "item", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.negate(
                    nixScope.builtins["isAttrs"](nixScope.item["val"]),
                  ),
                  () => [],
                  () => (nixScope.builtins["concatMap"](
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.notEqual(nixScope.x, null),
                        () => [
                          { "key": nixScope.x["outPath"], "val": nixScope.x },
                        ],
                        () => [],
                      )
                    )),
                  )(operators.listConcat(
                    operators.selectOrDefault(nixScope.item, [
                      "val",
                      "propagatedBuildInputs",
                    ], []),
                    operators.selectOrDefault(nixScope.item, [
                      "val",
                      "propagatedNativeBuildInputs",
                    ], []),
                  ))),
                )
              )),
            },
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "closePropagation", {
      enumerable: true,
      get() {
        return (operators.ifThenElse(
          operators.hasAttr(nixScope.builtins, "genericClosure"),
          () => (nixScope.closePropagationFast),
          () => (nixScope.closePropagationSlow),
        ));
      },
    });
    Object.defineProperty(nixScope, "mapAttrsFlatten", {
      enumerable: true,
      get() {
        return nixScope.warn(
          "lib.misc.mapAttrsFlatten is deprecated, please use lib.attrsets.mapAttrsToList instead.",
        )(nixScope.mapAttrsToList);
      },
    });
    Object.defineProperty(nixScope, "nvs", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
            nixScope.listToAttrs([
              nixScope.nameValuePair(nixScope.name)(nixScope.value),
            ])
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "setAttr", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              operators.merge(
                nixScope.set,
                nixScope.nvs(nixScope.name)(nixScope.v),
              )
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "setAttrMerge", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                nixScope.setAttr(nixScope.attrs)(nixScope.name)(
                  nixScope.f(
                    nixScope.maybeAttr(nixScope.name)(nixScope.default)(
                      nixScope.attrs,
                    ),
                  ),
                )
              ))
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "mergeAttrsWithFunc", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "set1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set2", null, {}, (nixScope) => (
              nixScope.foldr(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.hasAttr(nixScope.set, nixScope.n),
                    () => (nixScope.setAttr(nixScope.set)(nixScope.n)(
                      nixScope.f(nixScope.set[nixScope.n])(
                        nixScope.set2[nixScope.n],
                      ),
                    )),
                    () => (nixScope.set),
                  )
                ))
              )))(operators.merge(nixScope.set2, nixScope.set1))(
                nixScope.attrNames(nixScope.set2),
              )
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "mergeAttrsConcatenateValues", {
      enumerable: true,
      get() {
        return nixScope.mergeAttrsWithFunc(
          createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              operators.listConcat(
                nixScope.toList(nixScope.a),
                nixScope.toList(nixScope.b),
              )
            ))
          )),
        );
      },
    });
    Object.defineProperty(nixScope, "mergeAttrsNoOverride", {
      enumerable: true,
      get() {
        return createFunc(
          {
            "mergeLists": (
              nixScope,
            ) => ["buildInputs", "propagatedBuildInputs"],
            "overrideSnd": (nixScope) => ["buildPhase"],
          },
          null,
          {},
          (nixScope) => (
            createFunc(/*arg:*/ "attrs1", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "attrs2", null, {}, (nixScope) => (
                nixScope.foldr(
                  createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
                      nixScope.setAttr(nixScope.set)(nixScope.n)(
                        operators.ifThenElse(
                          operators.hasAttr(nixScope.set, nixScope.n),
                          () => (operators.ifThenElse(
                            nixScope.elem(nixScope.n)(nixScope.mergeLists),
                            () => (operators.listConcat(
                              nixScope.attrs2[nixScope.n],
                              nixScope.attrs1[nixScope.n],
                            )),
                            () => (operators.ifThenElse(
                              nixScope.elem(nixScope.n)(nixScope.overrideSnd),
                              () => (nixScope.attrs1[nixScope.n]),
                              () => (nixScope.throw(
                                new InterpolatedString([
                                  "error mergeAttrsNoOverride, attribute ",
                                  " given in both attributes - no merge func defined",
                                ], [() => (nixScope.n)]),
                              )),
                            )),
                          )),
                          () => (nixScope.attrs2[nixScope.n]),
                        ),
                      )
                    ))
                  )),
                )(nixScope.attrs1)(nixScope.attrNames(nixScope.attrs2))
              ))
            ))
          ),
        );
      },
    });
    Object.defineProperty(nixScope, "mergeAttrByFunc", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "mergeAttrBy2", {
                enumerable: true,
                get() {
                  return operators.merge(
                    { "mergeAttrBy": nixScope.mergeAttrs },
                    operators.merge(
                      nixScope.maybeAttr("mergeAttrBy")({})(nixScope.x),
                      nixScope.maybeAttr("mergeAttrBy")({})(nixScope.y),
                    ),
                  );
                },
              });
              return nixScope.foldr(nixScope.mergeAttrs)({})([
                nixScope.x,
                nixScope.y,
                nixScope.mapAttrs(
                  createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.hasAttr(nixScope.x, nixScope.a),
                        () => (operators.ifThenElse(
                          operators.hasAttr(nixScope.y, nixScope.a),
                          () => (nixScope.v(nixScope.x[nixScope.a])(
                            nixScope.y[nixScope.a],
                          )),
                          () => (nixScope.x[nixScope.a]),
                        )),
                        () => (nixScope.y[nixScope.a]),
                      )
                    ))
                  )),
                )(
                  nixScope.removeAttrs(nixScope.mergeAttrBy2)(
                    nixScope.filter(
                      createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                        operators.and(
                          operators.negate(
                            operators.hasAttr(nixScope.x, nixScope.a),
                          ),
                          operators.negate(
                            operators.hasAttr(nixScope.y, nixScope.a),
                          ),
                        )
                      )),
                    )(nixScope.attrNames(nixScope.mergeAttrBy2)),
                  ),
                ),
              ]);
            })
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "mergeAttrsByFuncDefaults", {
      enumerable: true,
      get() {
        return nixScope.foldl(nixScope.mergeAttrByFunc)(
          { "mergeAttrBy": nixScope.mergeAttrBy },
        );
      },
    });
    Object.defineProperty(nixScope, "mergeAttrsByFuncDefaultsClean", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
          nixScope.removeAttrs(
            nixScope.mergeAttrsByFuncDefaults(nixScope.list),
          )(["mergeAttrBy"])
        ));
      },
    });
    Object.defineProperty(nixScope, "mergeAttrBy", {
      enumerable: true,
      get() {
        return operators.merge(
          nixScope.listToAttrs(
            nixScope.map(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
              nixScope.nameValuePair(nixScope.n)(nixScope.concat)
            )))([
              "nativeBuildInputs",
              "buildInputs",
              "propagatedBuildInputs",
              "configureFlags",
              "prePhases",
              "postAll",
              "patches",
            ]),
          ),
          operators.merge(
            nixScope.listToAttrs(
              nixScope.map(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                nixScope.nameValuePair(nixScope.n)(nixScope.mergeAttrs)
              )))(["passthru", "meta", "cfg", "flags"]),
            ),
            nixScope.listToAttrs(
              nixScope.map(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                nixScope.nameValuePair(nixScope.n)(
                  createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                      new InterpolatedString(["", "", ""], [
                        () => (nixScope.a),
                        () => (nixScope.b),
                      ])
                    ))
                  )),
                )
              )))(["preConfigure", "postInstall"]),
            ),
          ),
        );
      },
    });
    Object.defineProperty(nixScope, "nixType", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.isAttrs(nixScope.x),
            () => (operators.ifThenElse(
              operators.hasAttr(nixScope.x, "outPath"),
              () => ("derivation"),
              () => ("attrs"),
            )),
            () => (operators.ifThenElse(
              nixScope.isFunction(nixScope.x),
              () => ("function"),
              () => (operators.ifThenElse(
                nixScope.isList(nixScope.x),
                () => ("list"),
                () => (operators.ifThenElse(
                  operators.equal(nixScope.x, true),
                  () => ("bool"),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.x, false),
                    () => ("bool"),
                    () => (operators.ifThenElse(
                      operators.equal(nixScope.x, null),
                      () => ("null"),
                      () => (operators.ifThenElse(
                        nixScope.isInt(nixScope.x),
                        () => ("int"),
                        () => ("string"),
                      )),
                    )),
                  )),
                )),
              )),
            )),
          )
        ));
      },
    });
    Object.defineProperty(nixScope, "imap", {
      enumerable: true,
      get() {
        return nixScope.imap1;
      },
    });
    return ({
      "checkFlag": nixScope.checkFlag,
      "checkReqs": nixScope.checkReqs,
      "closePropagation": nixScope.closePropagation,
      "closePropagationFast": nixScope.closePropagationFast,
      "closePropagationSlow": nixScope.closePropagationSlow,
      "condConcat": nixScope.condConcat,
      "defaultMerge": nixScope.defaultMerge,
      "defaultMergeArg": nixScope.defaultMergeArg,
      "fakeHash": nixScope.fakeHash,
      "fakeSha256": nixScope.fakeSha256,
      "fakeSha512": nixScope.fakeSha512,
      "foldArgs": nixScope.foldArgs,
      "getValue": nixScope.getValue,
      "ifEnable": nixScope.ifEnable,
      "imap": nixScope.imap,
      "innerClosePropagation": nixScope.innerClosePropagation,
      "innerModifySumArgs": nixScope.innerModifySumArgs,
      "lazyGenericClosure": nixScope.lazyGenericClosure,
      "mapAttrsFlatten": nixScope.mapAttrsFlatten,
      "maybeAttr": nixScope.maybeAttr,
      "maybeAttrNullable": nixScope.maybeAttrNullable,
      "maybeEnv": nixScope.maybeEnv,
      "mergeAttrBy": nixScope.mergeAttrBy,
      "mergeAttrByFunc": nixScope.mergeAttrByFunc,
      "mergeAttrsByFuncDefaults": nixScope.mergeAttrsByFuncDefaults,
      "mergeAttrsByFuncDefaultsClean": nixScope.mergeAttrsByFuncDefaultsClean,
      "mergeAttrsConcatenateValues": nixScope.mergeAttrsConcatenateValues,
      "mergeAttrsNoOverride": nixScope.mergeAttrsNoOverride,
      "mergeAttrsWithFunc": nixScope.mergeAttrsWithFunc,
      "modifySumArgs": nixScope.modifySumArgs,
      "nixType": nixScope.nixType,
      "nvs": nixScope.nvs,
      "setAttr": nixScope.setAttr,
      "setAttrMerge": nixScope.setAttrMerge,
      "uniqList": nixScope.uniqList,
      "uniqListExt": nixScope.uniqListExt,
    });
  })
));
