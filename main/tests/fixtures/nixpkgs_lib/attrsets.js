export default /**
  Operations on attribute sets.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.head = nixScope.builtins["head"];
    nixScope.length = nixScope.builtins["length"];
    nixScope.oldestSupportedReleaseIsAtLeast =
      nixScope.lib["trivial"]["oldestSupportedReleaseIsAtLeast"];
    nixScope.mergeAttrs = nixScope.lib["trivial"]["mergeAttrs"];
    nixScope.warn = nixScope.lib["trivial"]["warn"];
    nixScope.warnIf = nixScope.lib["trivial"]["warnIf"];
    nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
    nixScope.concatMapStringsSep =
      nixScope.lib["strings"]["concatMapStringsSep"];
    nixScope.escapeNixIdentifier =
      nixScope.lib["strings"]["escapeNixIdentifier"];
    nixScope.sanitizeDerivationName =
      nixScope.lib["strings"]["sanitizeDerivationName"];
    nixScope.filter = nixScope.lib["lists"]["filter"];
    nixScope.foldr = nixScope.lib["lists"]["foldr"];
    nixScope["foldl'"] = nixScope.lib["lists"]["foldl'"];
    nixScope.concatMap = nixScope.lib["lists"]["concatMap"];
    nixScope.elemAt = nixScope.lib["lists"]["elemAt"];
    nixScope.all = nixScope.lib["lists"]["all"];
    nixScope.partition = nixScope.lib["lists"]["partition"];
    nixScope.groupBy = nixScope.lib["lists"]["groupBy"];
    nixScope.take = nixScope.lib["lists"]["take"];
    nixScope.foldl = nixScope.lib["lists"]["foldl"];
    return /*rec*/ createScope((nixScope) => {
      nixScope.attrNames = nixScope.builtins["attrNames"];
      nixScope.listToAttrs = nixScope.builtins["listToAttrs"];
      nixScope.hasAttr = nixScope.builtins["hasAttr"];
      nixScope.isAttrs = nixScope.builtins["isAttrs"];
      nixScope.getAttr = nixScope.builtins["getAttr"];
      nixScope.removeAttrs = nixScope.builtins["removeAttrs"];
      nixScope.intersectAttrs = nixScope.builtins["intersectAttrs"];
      Object.defineProperty(nixScope, "attrByPath", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "lenAttrPath", {
                    enumerable: true,
                    get() {
                      return nixScope.length(nixScope.attrPath);
                    },
                  });
                  Object.defineProperty(nixScope, "attrByPath'", {
                    enumerable: true,
                    get() {
                      return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                          operators.ifThenElse(
                            operators.equal(nixScope.n, nixScope.lenAttrPath),
                            () => (nixScope.s),
                            () => (/*let*/ createScope((nixScope) => {
                              Object.defineProperty(nixScope, "attr", {
                                enumerable: true,
                                get() {
                                  return nixScope.elemAt(nixScope.attrPath)(
                                    nixScope.n,
                                  );
                                },
                              });
                              return (operators.ifThenElse(
                                operators.hasAttr(nixScope.s, nixScope.attr),
                                () => (nixScope["attrByPath'"](
                                  operators.add(nixScope.n, 1n),
                                )(nixScope.s[nixScope.attr])),
                                () => (nixScope.default),
                              ));
                            })),
                          )
                        ))
                      ));
                    },
                  });
                  return nixScope["attrByPath'"](0n)(nixScope.set);
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "hasAttrByPath", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "lenAttrPath", {
                  enumerable: true,
                  get() {
                    return nixScope.length(nixScope.attrPath);
                  },
                });
                Object.defineProperty(nixScope, "hasAttrByPath'", {
                  enumerable: true,
                  get() {
                    return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                        operators.or(
                          operators.equal(nixScope.n, nixScope.lenAttrPath),
                          /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "attr", {
                              enumerable: true,
                              get() {
                                return nixScope.elemAt(nixScope.attrPath)(
                                  nixScope.n,
                                );
                              },
                            });
                            return (operators.ifThenElse(
                              operators.hasAttr(nixScope.s, nixScope.attr),
                              () => (nixScope["hasAttrByPath'"](
                                operators.add(nixScope.n, 1n),
                              )(nixScope.s[nixScope.attr])),
                              () => (false),
                            ));
                          }),
                        )
                      ))
                    ));
                  },
                });
                return nixScope["hasAttrByPath'"](0n)(nixScope.e);
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "longestValidPathPrefix", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "lenAttrPath", {
                  enumerable: true,
                  get() {
                    return nixScope.length(nixScope.attrPath);
                  },
                });
                Object.defineProperty(nixScope, "getPrefixForSetAtIndex", {
                  enumerable: true,
                  get() {
                    return createFunc(
                      /*arg:*/ "remainingSet",
                      null,
                      {},
                      (nixScope) => (
                        createFunc(
                          /*arg:*/ "remainingPathIndex",
                          null,
                          {},
                          (nixScope) => (
                            operators.ifThenElse(
                              operators.equal(
                                nixScope.remainingPathIndex,
                                nixScope.lenAttrPath,
                              ),
                              () => (nixScope.attrPath),
                              () => (/*let*/ createScope((nixScope) => {
                                Object.defineProperty(nixScope, "attr", {
                                  enumerable: true,
                                  get() {
                                    return nixScope.elemAt(nixScope.attrPath)(
                                      nixScope.remainingPathIndex,
                                    );
                                  },
                                });
                                return (operators.ifThenElse(
                                  operators.hasAttr(
                                    nixScope.remainingSet,
                                    nixScope.attr,
                                  ),
                                  () => (nixScope.getPrefixForSetAtIndex(
                                    nixScope.remainingSet[nixScope.attr],
                                  )(operators.add(
                                    nixScope.remainingPathIndex,
                                    1n,
                                  ))),
                                  () => (nixScope.take(
                                    nixScope.remainingPathIndex,
                                  )(nixScope.attrPath)),
                                ));
                              })),
                            )
                          ),
                        )
                      ),
                    );
                  },
                });
                return nixScope.getPrefixForSetAtIndex(nixScope.v)(0n);
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "setAttrByPath", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "len", {
                  enumerable: true,
                  get() {
                    return nixScope.length(nixScope.attrPath);
                  },
                });
                Object.defineProperty(nixScope, "atDepth", {
                  enumerable: true,
                  get() {
                    return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.n, nixScope.len),
                        () => (nixScope.value),
                        () => (createScope((nixScope) => {
                          const obj = {};
                          obj[nixScope.elemAt(nixScope.attrPath)(nixScope.n)] =
                            nixScope.atDepth(operators.add(nixScope.n, 1n));
                          return obj;
                        })),
                      )
                    ));
                  },
                });
                return nixScope.atDepth(0n);
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "getAttrFromPath", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.attrByPath(nixScope.attrPath)(
                nixScope.abort(
                  operators.add(
                    operators.add(
                      "cannot find attribute '",
                      nixScope.concatStringsSep(".")(nixScope.attrPath),
                    ),
                    "'",
                  ),
                ),
              )(nixScope.set)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "concatMapAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              nixScope["foldl'"](nixScope.mergeAttrs)({})(
                nixScope.attrValues(nixScope.mapAttrs(nixScope.f)(nixScope.v)),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "updateManyAttrsByPath", {
        enumerable: true,
        get() {
          return /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "go", {
              enumerable: true,
              get() {
                return createFunc(
                  /*arg:*/ "prefixLength",
                  null,
                  {},
                  (nixScope) => (
                    createFunc(/*arg:*/ "hasValue", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "updates", null, {}, (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "split", {
                              enumerable: true,
                              get() {
                                return nixScope.partition(
                                  createFunc(
                                    /*arg:*/ "el",
                                    null,
                                    {},
                                    (nixScope) => (
                                      operators.equal(
                                        nixScope.length(nixScope.el["path"]),
                                        nixScope.prefixLength,
                                      )
                                    ),
                                  ),
                                )(nixScope.updates);
                              },
                            });
                            Object.defineProperty(nixScope, "nested", {
                              enumerable: true,
                              get() {
                                return nixScope.groupBy(
                                  createFunc(
                                    /*arg:*/ "el",
                                    null,
                                    {},
                                    (nixScope) => (
                                      nixScope.elemAt(nixScope.el["path"])(
                                        nixScope.prefixLength,
                                      )
                                    ),
                                  ),
                                )(nixScope.split["wrong"]);
                              },
                            });
                            Object.defineProperty(nixScope, "withNestedMods", {
                              enumerable: true,
                              get() {
                                return (operators.ifThenElse(
                                  operators.equal(nixScope.split["wrong"], []),
                                  () => (operators.ifThenElse(
                                    nixScope.hasValue,
                                    () => (nixScope.value),
                                    () => (/*let*/ createScope((nixScope) => {
                                      Object.defineProperty(
                                        nixScope,
                                        "updatePath",
                                        {
                                          enumerable: true,
                                          get() {
                                            return (nixScope.head(
                                              nixScope.split["right"],
                                            ))["path"];
                                          },
                                        },
                                      );
                                      return nixScope.throw(
                                        operators.add(
                                          operators.add(
                                            new InterpolatedString([
                                              "updateManyAttrsByPath: Path '",
                                              "' does ",
                                            ], [
                                              () => (nixScope.showAttrPath(
                                                nixScope.updatePath,
                                              )),
                                            ]),
                                            "not exist in the given value, but the first update to this ",
                                          ),
                                          "path tries to access the existing value.",
                                        ),
                                      );
                                    })),
                                  )),
                                  () => (operators.ifThenElse(
                                    operators.negate(nixScope.hasValue),
                                    () => (nixScope.mapAttrs(
                                      createFunc(
                                        /*arg:*/ "name",
                                        null,
                                        {},
                                        (nixScope) => (
                                          nixScope.go(
                                            operators.add(
                                              nixScope.prefixLength,
                                              1n,
                                            ),
                                          )(false)(null)
                                        ),
                                      ),
                                    )(nixScope.nested)),
                                    () => (operators.ifThenElse(
                                      nixScope.isAttrs(nixScope.value),
                                      () => (operators.merge(
                                        nixScope.value,
                                        nixScope.mapAttrs(
                                          createFunc(
                                            /*arg:*/ "name",
                                            null,
                                            {},
                                            (nixScope) => (
                                              nixScope.go(
                                                operators.add(
                                                  nixScope.prefixLength,
                                                  1n,
                                                ),
                                              )(operators.hasAttr(
                                                nixScope.value,
                                                nixScope.name,
                                              ))(nixScope.value[nixScope.name])
                                            ),
                                          ),
                                        )(nixScope.nested),
                                      )),
                                      () => (/*let*/ createScope((nixScope) => {
                                        Object.defineProperty(
                                          nixScope,
                                          "updatePath",
                                          {
                                            enumerable: true,
                                            get() {
                                              return (nixScope.head(
                                                nixScope.split["wrong"],
                                              ))["path"];
                                            },
                                          },
                                        );
                                        return nixScope.throw(
                                          operators.add(
                                            operators.add(
                                              operators.add(
                                                new InterpolatedString([
                                                  "updateManyAttrsByPath: Path '",
                                                  "' needs to ",
                                                ], [
                                                  () => (nixScope.showAttrPath(
                                                    nixScope.updatePath,
                                                  )),
                                                ]),
                                                new InterpolatedString([
                                                  "be updated, but path '",
                                                  "' ",
                                                ], [
                                                  () => (nixScope.showAttrPath(
                                                    nixScope.take(
                                                      nixScope.prefixLength,
                                                    )(nixScope.updatePath),
                                                  )),
                                                ]),
                                              ),
                                              "of the given value is not an attribute set, so we can't ",
                                            ),
                                            "update an attribute inside of it.",
                                          ),
                                        );
                                      })),
                                    )),
                                  )),
                                ));
                              },
                            });
                            return nixScope.foldl(
                              createFunc(
                                /*arg:*/ "acc",
                                null,
                                {},
                                (nixScope) => (
                                  createFunc(
                                    /*arg:*/ "el",
                                    null,
                                    {},
                                    (nixScope) => (
                                      nixScope.el["update"](nixScope.acc)
                                    ),
                                  )
                                ),
                              ),
                            )(nixScope.withNestedMods)(nixScope.split["right"]);
                          })
                        ))
                      ))
                    ))
                  ),
                );
              },
            });
            return createFunc(/*arg:*/ "updates", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                nixScope.go(0n)(true)(nixScope.value)(nixScope.updates)
              ))
            ));
          });
        },
      });
      Object.defineProperty(nixScope, "attrVals", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "nameList", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                nixScope.set[nixScope.x]
              )))(nixScope.nameList)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "attrValues", {
        enumerable: true,
        get() {
          return nixScope.builtins["attrValues"];
        },
      });
      Object.defineProperty(nixScope, "getAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "names", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              nixScope.genAttrs(nixScope.names)(
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  nixScope.attrs[nixScope.name]
                )),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "catAttrs", {
        enumerable: true,
        get() {
          return nixScope.builtins["catAttrs"];
        },
      });
      Object.defineProperty(nixScope, "filterAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.removeAttrs(nixScope.set)(
                nixScope.filter(
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    operators.negate(
                      nixScope.pred(nixScope.name)(nixScope.set[nixScope.name]),
                    )
                  )),
                )(nixScope.attrNames(nixScope.set)),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "filterAttrsRecursive", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.listToAttrs(
                nixScope.concatMap(
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "v", {
                        enumerable: true,
                        get() {
                          return nixScope.set[nixScope.name];
                        },
                      });
                      return (operators.ifThenElse(
                        nixScope.pred(nixScope.name)(nixScope.v),
                        () => [
                          nixScope.nameValuePair(nixScope.name)(
                            operators.ifThenElse(
                              nixScope.isAttrs(nixScope.v),
                              () => (nixScope.filterAttrsRecursive(
                                nixScope.pred,
                              )(nixScope.v)),
                              () => (nixScope.v),
                            ),
                          ),
                        ],
                        () => [],
                      ));
                    })
                  )),
                )(nixScope.attrNames(nixScope.set)),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "foldlAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "init", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
                nixScope["foldl'"](
                  createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      nixScope.f(nixScope.acc)(nixScope.name)(
                        nixScope.set[nixScope.name],
                      )
                    ))
                  )),
                )(nixScope.init)(nixScope.attrNames(nixScope.set))
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "foldAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list_of_attrs", null, {}, (nixScope) => (
                nixScope.foldr(
                  createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                      nixScope.foldr(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "o", null, {}, (nixScope) => (
                            operators.merge(
                              nixScope.o,
                              createScope((nixScope) => {
                                const obj = {};
                                obj[nixScope.name] = nixScope.op(
                                  nixScope.n[nixScope.name],
                                )(operators.selectOrDefault(nixScope.a, [
                                  nixScope.name,
                                ], nixScope.nul));
                                return obj;
                              }),
                            )
                          ))
                        )),
                      )(nixScope.a)(nixScope.attrNames(nixScope.n))
                    ))
                  )),
                )({})(nixScope.list_of_attrs)
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "collect", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.pred(nixScope.attrs),
                () => [nixScope.attrs],
                () => (operators.ifThenElse(
                  nixScope.isAttrs(nixScope.attrs),
                  () => (nixScope.concatMap(nixScope.collect(nixScope.pred))(
                    nixScope.attrValues(nixScope.attrs),
                  )),
                  () => [],
                )),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "cartesianProduct", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrsOfLists", null, {}, (nixScope) => (
            nixScope["foldl'"](
              createFunc(/*arg:*/ "listOfAttrs", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "attrName", null, {}, (nixScope) => (
                  nixScope.concatMap(
                    createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                      nixScope.map(
                        createFunc(
                          /*arg:*/ "listValue",
                          null,
                          {},
                          (nixScope) => (
                            operators.merge(
                              nixScope.attrs,
                              createScope((nixScope) => {
                                const obj = {};
                                obj[nixScope.attrName] = nixScope.listValue;
                                return obj;
                              }),
                            )
                          ),
                        ),
                      )(nixScope.attrsOfLists[nixScope.attrName])
                    )),
                  )(nixScope.listOfAttrs)
                ))
              )),
            )([{}])(nixScope.attrNames(nixScope.attrsOfLists))
          ));
        },
      });
      Object.defineProperty(nixScope, "mapCartesianProduct", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrsOfLists", null, {}, (nixScope) => (
              nixScope.map(nixScope.f)(
                nixScope.cartesianProduct(nixScope.attrsOfLists),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "nameValuePair", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              { "name": nixScope.name, "value": nixScope.value }
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mapAttrs", {
        enumerable: true,
        get() {
          return nixScope.builtins["mapAttrs"];
        },
      });
      Object.defineProperty(nixScope, "mapAttrs'", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.listToAttrs(
                nixScope.mapAttrsToList(nixScope.f)(nixScope.set),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mapAttrsToList", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              nixScope.attrValues(nixScope.mapAttrs(nixScope.f)(nixScope.attrs))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "attrsToList", {
        enumerable: true,
        get() {
          return nixScope.mapAttrsToList(nixScope.nameValuePair);
        },
      });
      Object.defineProperty(nixScope, "mapAttrsRecursive", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.mapAttrsRecursiveCond(
                createFunc(/*arg:*/ "as", null, {}, (nixScope) => (
                  true
                )),
              )(nixScope.f)(nixScope.set)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mapAttrsRecursiveCond", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "recurse", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "path",
                        null,
                        {},
                        (nixScope) => (
                          nixScope.mapAttrs(
                            createFunc(
                              /*arg:*/ "name",
                              null,
                              {},
                              (nixScope) => (
                                createFunc(
                                  /*arg:*/ "value",
                                  null,
                                  {},
                                  (nixScope) => (
                                    operators.ifThenElse(
                                      operators.and(
                                        nixScope.isAttrs(nixScope.value),
                                        nixScope.cond(nixScope.value),
                                      ),
                                      () => (nixScope.recurse(
                                        operators.listConcat(nixScope.path, [
                                          nixScope.name,
                                        ]),
                                      )(nixScope.value)),
                                      () => (nixScope.f(
                                        operators.listConcat(nixScope.path, [
                                          nixScope.name,
                                        ]),
                                      )(nixScope.value)),
                                    )
                                  ),
                                )
                              ),
                            ),
                          )
                        ),
                      );
                    },
                  });
                  return nixScope.recurse([])(nixScope.set);
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "genAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "names", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              nixScope.listToAttrs(
                nixScope.map(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.nameValuePair(nixScope.n)(nixScope.f(nixScope.n))
                )))(nixScope.names),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "isDerivation", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
            operators.equal(
              operators.selectOrDefault(nixScope.value, ["type"], null),
              "derivation",
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "toDerivation", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "path'", {
                enumerable: true,
                get() {
                  return nixScope.builtins["storePath"](nixScope.path);
                },
              });
              Object.defineProperty(nixScope, "res", {
                enumerable: true,
                get() {
                  return ({
                    "type": "derivation",
                    "name": nixScope.sanitizeDerivationName(
                      nixScope.builtins["substring"](33n)(-1n)(
                        nixScope.baseNameOf(nixScope["path'"]),
                      ),
                    ),
                    "outPath": nixScope["path'"],
                    "outputs": ["out"],
                    "out": nixScope.res,
                    "outputName": "out",
                  });
                },
              });
              return nixScope.res;
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "optionalAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "as", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => (nixScope.as),
                () => ({}),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "zipAttrsWithNames", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "names", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "sets", null, {}, (nixScope) => (
                nixScope.listToAttrs(
                  nixScope.map(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      {
                        "name": nixScope.name,
                        "value": nixScope.f(nixScope.name)(
                          nixScope.catAttrs(nixScope.name)(nixScope.sets),
                        ),
                      }
                    )),
                  )(nixScope.names),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "zipAttrsWith", {
        enumerable: true,
        get() {
          return operators.selectOrDefault(
            nixScope.builtins,
            ["zipAttrsWith"],
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "sets", null, {}, (nixScope) => (
                nixScope.zipAttrsWithNames(
                  nixScope.concatMap(nixScope.attrNames)(nixScope.sets),
                )(nixScope.f)(nixScope.sets)
              ))
            )),
          );
        },
      });
      Object.defineProperty(nixScope, "zipAttrs", {
        enumerable: true,
        get() {
          return nixScope.zipAttrsWith(
            createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "values", null, {}, (nixScope) => (
                nixScope.values
              ))
            )),
          );
        },
      });
      Object.defineProperty(nixScope, "mergeAttrsList", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "binaryMerge", {
                enumerable: true,
                get() {
                  return createFunc(/*arg:*/ "start", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "end", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.greaterThanOrEqual(
                          operators.subtract(nixScope.end, nixScope.start),
                          2n,
                        ),
                        () => (operators.merge(
                          nixScope.binaryMerge(nixScope.start)(
                            operators.add(
                              nixScope.start,
                              operators.divide(
                                operators.subtract(
                                  nixScope.end,
                                  nixScope.start,
                                ),
                                2n,
                              ),
                            ),
                          ),
                          nixScope.binaryMerge(
                            operators.add(
                              nixScope.start,
                              operators.divide(
                                operators.subtract(
                                  nixScope.end,
                                  nixScope.start,
                                ),
                                2n,
                              ),
                            ),
                          )(nixScope.end),
                        )),
                        () => (nixScope.elemAt(nixScope.list)(nixScope.start)),
                      )
                    ))
                  ));
                },
              });
              return (operators.ifThenElse(
                operators.equal(nixScope.list, []),
                () => ({}),
                () => (nixScope.binaryMerge(0n)(
                  nixScope.length(nixScope.list),
                )),
              ));
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "recursiveUpdateUntil", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "lhs", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "rhs", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "f", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "attrPath",
                        null,
                        {},
                        (nixScope) => (
                          nixScope.zipAttrsWith(
                            createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                              createFunc(
                                /*arg:*/ "values",
                                null,
                                {},
                                (nixScope) => (
                                  /*let*/ createScope((nixScope) => {
                                    Object.defineProperty(nixScope, "here", {
                                      enumerable: true,
                                      get() {
                                        return operators.listConcat(
                                          nixScope.attrPath,
                                          [nixScope.n],
                                        );
                                      },
                                    });
                                    return (operators.ifThenElse(
                                      operators.or(
                                        operators.equal(
                                          nixScope.length(nixScope.values),
                                          1n,
                                        ),
                                        nixScope.pred(nixScope.here)(
                                          nixScope.elemAt(nixScope.values)(1n),
                                        )(nixScope.head(nixScope.values)),
                                      ),
                                      () => (nixScope.head(nixScope.values)),
                                      () => (nixScope.f(nixScope.here)(
                                        nixScope.values,
                                      )),
                                    ));
                                  })
                                ),
                              )
                            )),
                          )
                        ),
                      );
                    },
                  });
                  return nixScope.f([])([nixScope.rhs, nixScope.lhs]);
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "recursiveUpdate", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "lhs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "rhs", null, {}, (nixScope) => (
              nixScope.recursiveUpdateUntil(
                createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "lhs", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "rhs", null, {}, (nixScope) => (
                      operators.negate(
                        operators.and(
                          nixScope.isAttrs(nixScope.lhs),
                          nixScope.isAttrs(nixScope.rhs),
                        ),
                      )
                    ))
                  ))
                )),
              )(nixScope.lhs)(nixScope.rhs)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "matchAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pattern", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "isAttrs pattern");
                }
                return nixScope.all(
                  createFunc(/*arg:*/ "attr", null, {}, (nixScope) => (
                    operators.and(
                      operators.hasAttr(nixScope.attrs, nixScope.attr),
                      /*let*/ createScope((nixScope) => {
                        Object.defineProperty(nixScope, "lhs", {
                          enumerable: true,
                          get() {
                            return nixScope.pattern[nixScope.attr];
                          },
                        });
                        Object.defineProperty(nixScope, "rhs", {
                          enumerable: true,
                          get() {
                            return nixScope.attrs[nixScope.attr];
                          },
                        });
                        return (operators.ifThenElse(
                          nixScope.isAttrs(nixScope.lhs),
                          () => (operators.and(
                            nixScope.isAttrs(nixScope.rhs),
                            nixScope.matchAttrs(nixScope.lhs)(nixScope.rhs),
                          )),
                          () => (operators.equal(nixScope.lhs, nixScope.rhs)),
                        ));
                      }),
                    )
                  )),
                )(nixScope.attrNames(nixScope.pattern));
              })(nixScope.isAttrs(nixScope.pattern))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "overrideExisting", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "old", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "new", null, {}, (nixScope) => (
              nixScope.mapAttrs(
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                    operators.selectOrDefault(
                      nixScope.new,
                      [nixScope.name],
                      nixScope.value,
                    )
                  ))
                )),
              )(nixScope.old)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "showAttrPath", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.equal(nixScope.path, []),
              () => ("<root attribute path>"),
              () => (nixScope.concatMapStringsSep(".")(
                nixScope.escapeNixIdentifier,
              )(nixScope.path)),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "getOutput", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "output", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.or(
                  operators.negate(
                    operators.hasAttr(nixScope.pkg, "outputSpecified"),
                  ),
                  operators.negate(nixScope.pkg["outputSpecified"]),
                ),
                () => (operators.selectOrDefault(
                  nixScope.pkg,
                  [nixScope.output],
                  operators.selectOrDefault(
                    nixScope.pkg,
                    ["out"],
                    nixScope.pkg,
                  ),
                )),
                () => (nixScope.pkg),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "getFirstOutput", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "candidates", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "outputs", {
                  enumerable: true,
                  get() {
                    return nixScope.builtins["filter"](
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        nixScope.hasAttr(nixScope.name)(nixScope.pkg)
                      )),
                    )(nixScope.candidates);
                  },
                });
                Object.defineProperty(nixScope, "output", {
                  enumerable: true,
                  get() {
                    return nixScope.builtins["head"](nixScope.outputs);
                  },
                });
                return (operators.ifThenElse(
                  operators.or(
                    operators.selectOrDefault(
                      nixScope.pkg,
                      ["outputSpecified"],
                      false,
                    ),
                    operators.equal(nixScope.outputs, []),
                  ),
                  () => (nixScope.pkg),
                  () => (nixScope.pkg[nixScope.output]),
                ));
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "getBin", {
        enumerable: true,
        get() {
          return nixScope.getOutput("bin");
        },
      });
      Object.defineProperty(nixScope, "getLib", {
        enumerable: true,
        get() {
          return nixScope.getOutput("lib");
        },
      });
      Object.defineProperty(nixScope, "getStatic", {
        enumerable: true,
        get() {
          return nixScope.getFirstOutput(["static", "lib", "out"]);
        },
      });
      Object.defineProperty(nixScope, "getDev", {
        enumerable: true,
        get() {
          return nixScope.getOutput("dev");
        },
      });
      Object.defineProperty(nixScope, "getInclude", {
        enumerable: true,
        get() {
          return nixScope.getFirstOutput(["include", "dev", "out"]);
        },
      });
      Object.defineProperty(nixScope, "getMan", {
        enumerable: true,
        get() {
          return nixScope.getOutput("man");
        },
      });
      Object.defineProperty(nixScope, "chooseDevOutputs", {
        enumerable: true,
        get() {
          return nixScope.builtins["map"](nixScope.getDev);
        },
      });
      Object.defineProperty(nixScope, "recurseIntoAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            operators.merge(nixScope.attrs, { "recurseForDerivations": true })
          ));
        },
      });
      Object.defineProperty(nixScope, "dontRecurseIntoAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            operators.merge(nixScope.attrs, { "recurseForDerivations": false })
          ));
        },
      });
      Object.defineProperty(nixScope, "unionOfDisjoint", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "intersection", {
                  enumerable: true,
                  get() {
                    return nixScope.builtins["intersectAttrs"](nixScope.x)(
                      nixScope.y,
                    );
                  },
                });
                Object.defineProperty(nixScope, "collisions", {
                  enumerable: true,
                  get() {
                    return nixScope.lib["concatStringsSep"](" ")(
                      nixScope.builtins["attrNames"](nixScope.intersection),
                    );
                  },
                });
                Object.defineProperty(nixScope, "mask", {
                  enumerable: true,
                  get() {
                    return nixScope.builtins["mapAttrs"](
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                          nixScope.builtins["throw"](
                            new InterpolatedString([
                              "unionOfDisjoint: collision on ",
                              "; complete list: ",
                              "",
                            ], [
                              () => (nixScope.name),
                              () => (nixScope.collisions),
                            ]),
                          )
                        ))
                      )),
                    )(nixScope.intersection);
                  },
                });
                return operators.merge(
                  operators.merge(nixScope.x, nixScope.y),
                  nixScope.mask,
                );
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "zipWithNames", {
        enumerable: true,
        get() {
          return nixScope.warn(
            "lib.zipWithNames is a deprecated alias of lib.zipAttrsWithNames.",
          )(nixScope.zipAttrsWithNames);
        },
      });
      Object.defineProperty(nixScope, "zip", {
        enumerable: true,
        get() {
          return nixScope.warn(
            "lib.zip is a deprecated alias of lib.zipAttrsWith.",
          )(nixScope.zipAttrsWith);
        },
      });
      Object.defineProperty(nixScope, "cartesianProductOfSets", {
        enumerable: true,
        get() {
          return nixScope.warnIf(
            nixScope.oldestSupportedReleaseIsAtLeast(2405n),
          )("lib.cartesianProductOfSets is a deprecated alias of lib.cartesianProduct.")(
            nixScope.cartesianProduct,
          );
        },
      });
      return nixScope;
    });
  })
));
