export default /**
  General list operations.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.toInt = nixScope.lib["strings"]["toInt"];
    nixScope.compare = nixScope.lib["trivial"]["compare"];
    nixScope.min = nixScope.lib["trivial"]["min"];
    nixScope.id = nixScope.lib["trivial"]["id"];
    nixScope.warn = nixScope.lib["trivial"]["warn"];
    nixScope.pipe = nixScope.lib["trivial"]["pipe"];
    nixScope.mapAttrs = nixScope.lib["attrsets"]["mapAttrs"];
    nixScope.max = nixScope.lib["max"];
    return /*rec*/ createScope((nixScope) => {
      nixScope.head = nixScope.builtins["head"];
      nixScope.tail = nixScope.builtins["tail"];
      nixScope.length = nixScope.builtins["length"];
      nixScope.isList = nixScope.builtins["isList"];
      nixScope.elemAt = nixScope.builtins["elemAt"];
      nixScope.concatLists = nixScope.builtins["concatLists"];
      nixScope.filter = nixScope.builtins["filter"];
      nixScope.elem = nixScope.builtins["elem"];
      nixScope.genList = nixScope.builtins["genList"];
      nixScope.map = nixScope.builtins["map"];
      Object.defineProperty(nixScope, "singleton", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => [nixScope.x]);
        },
      });
      Object.defineProperty(nixScope, "forEach", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              nixScope.map(nixScope.f)(nixScope.xs)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "foldr", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "len", {
                    enumerable: true,
                    get() {
                      return nixScope.length(nixScope.list);
                    },
                  });
                  Object.defineProperty(nixScope, "fold'", {
                    enumerable: true,
                    get() {
                      return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.equal(nixScope.n, nixScope.len),
                          () => (nixScope.nul),
                          () => (nixScope.op(
                            nixScope.elemAt(nixScope.list)(nixScope.n),
                          )(nixScope["fold'"](operators.add(nixScope.n, 1n)))),
                        )
                      ));
                    },
                  });
                  return nixScope["fold'"](0n);
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "fold", {
        enumerable: true,
        get() {
          return nixScope.foldr;
        },
      });
      Object.defineProperty(nixScope, "foldl", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "foldl'", {
                    enumerable: true,
                    get() {
                      return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.equal(nixScope.n, -1n),
                          () => (nixScope.nul),
                          () => (nixScope.op(
                            nixScope["foldl'"](
                              operators.subtract(nixScope.n, 1n),
                            ),
                          )(nixScope.elemAt(nixScope.list)(nixScope.n))),
                        )
                      ));
                    },
                  });
                  return nixScope["foldl'"](
                    operators.subtract(nixScope.length(nixScope.list), 1n),
                  );
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "foldl'", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
              nixScope.builtins["seq"](nixScope.acc)(
                nixScope.builtins["foldl'"](nixScope.op)(nixScope.acc),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "imap0", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.f(nixScope.n)(
                    nixScope.elemAt(nixScope.list)(nixScope.n),
                  )
                )),
              )(nixScope.length(nixScope.list))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "imap1", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.f(operators.add(nixScope.n, 1n))(
                    nixScope.elemAt(nixScope.list)(nixScope.n),
                  )
                )),
              )(nixScope.length(nixScope.list))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "ifilter0", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "ipred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "input", null, {}, (nixScope) => (
              nixScope.map(createFunc(/*arg:*/ "idx", null, {}, (nixScope) => (
                nixScope.elemAt(nixScope.input)(nixScope.idx)
              )))(
                nixScope.filter(
                  createFunc(/*arg:*/ "idx", null, {}, (nixScope) => (
                    nixScope.ipred(nixScope.idx)(
                      nixScope.elemAt(nixScope.input)(nixScope.idx),
                    )
                  )),
                )(
                  nixScope.genList(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      nixScope.x
                    )),
                  )(nixScope.length(nixScope.input)),
                ),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "concatMap", {
        enumerable: true,
        get() {
          return nixScope.builtins["concatMap"];
        },
      });
      Object.defineProperty(nixScope, "flatten", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isList(nixScope.x),
              () => (nixScope.concatMap(
                createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                  nixScope.flatten(nixScope.y)
                )),
              )(nixScope.x)),
              () => [nixScope.x],
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "remove", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.notEqual(nixScope.x, nixScope.e)
            )))
          ));
        },
      });
      Object.defineProperty(nixScope, "findSingle", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "multiple", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "found", {
                      enumerable: true,
                      get() {
                        return nixScope.filter(nixScope.pred)(nixScope.list);
                      },
                    });
                    Object.defineProperty(nixScope, "len", {
                      enumerable: true,
                      get() {
                        return nixScope.length(nixScope.found);
                      },
                    });
                    return (operators.ifThenElse(
                      operators.equal(nixScope.len, 0n),
                      () => (nixScope.default),
                      () => (operators.ifThenElse(
                        operators.notEqual(nixScope.len, 1n),
                        () => (nixScope.multiple),
                        () => (nixScope.head(nixScope.found)),
                      )),
                    ));
                  })
                ))
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "findFirstIndex", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "resultIndex", {
                    enumerable: true,
                    get() {
                      return nixScope["foldl'"](
                        createFunc(/*arg:*/ "index", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "el", null, {}, (nixScope) => (
                            operators.ifThenElse(
                              operators.lessThan(nixScope.index, 0n),
                              () => (operators.ifThenElse(
                                nixScope.pred(nixScope.el),
                                () => (operators.subtract(
                                  operators.negative(nixScope.index),
                                  1n,
                                )),
                                () => (operators.subtract(nixScope.index, 1n)),
                              )),
                              () => (nixScope.index),
                            )
                          ))
                        )),
                      )(-1n)(nixScope.list);
                    },
                  });
                  return (operators.ifThenElse(
                    operators.lessThan(nixScope.resultIndex, 0n),
                    () => (nixScope.default),
                    () => (nixScope.resultIndex),
                  ));
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "findFirst", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "index", {
                    enumerable: true,
                    get() {
                      return nixScope.findFirstIndex(nixScope.pred)(null)(
                        nixScope.list,
                      );
                    },
                  });
                  return (operators.ifThenElse(
                    operators.equal(nixScope.index, null),
                    () => (nixScope.default),
                    () => (nixScope.elemAt(nixScope.list)(nixScope.index)),
                  ));
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "any", {
        enumerable: true,
        get() {
          return nixScope.builtins["any"];
        },
      });
      Object.defineProperty(nixScope, "all", {
        enumerable: true,
        get() {
          return nixScope.builtins["all"];
        },
      });
      Object.defineProperty(nixScope, "count", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            nixScope["foldl'"](
              createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    nixScope.pred(nixScope.x),
                    () => (operators.add(nixScope.c, 1n)),
                    () => (nixScope.c),
                  )
                ))
              )),
            )(0n)
          ));
        },
      });
      Object.defineProperty(nixScope, "optional", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => [nixScope.elem],
                () => [],
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "optionals", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elems", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => (nixScope.elems),
                () => [],
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "toList", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isList(nixScope.x),
              () => (nixScope.x),
              () => [nixScope.x],
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "range", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "first", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "last", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.greaterThan(nixScope.first, nixScope.last),
                () => [],
                () => (nixScope.genList(
                  createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                    operators.add(nixScope.first, nixScope.n)
                  )),
                )(operators.add(
                  operators.subtract(nixScope.last, nixScope.first),
                  1n,
                ))),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "replicate", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  nixScope.elem
                )),
              )(nixScope.n)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "partition", {
        enumerable: true,
        get() {
          return nixScope.builtins["partition"];
        },
      });
      Object.defineProperty(nixScope, "groupBy'", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "lst", null, {}, (nixScope) => (
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      nixScope.foldl(nixScope.op)(nixScope.nul)
                    )),
                  )(nixScope.groupBy(nixScope.pred)(nixScope.lst))
                ))
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "groupBy", {
        enumerable: true,
        get() {
          return operators.selectOrDefault(
            nixScope.builtins,
            ["groupBy"],
            createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
              nixScope["foldl'"](
                createFunc(/*arg:*/ "r", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "key", {
                        enumerable: true,
                        get() {
                          return nixScope.pred(nixScope.e);
                        },
                      });
                      return operators.merge(
                        nixScope.r,
                        createScope((nixScope) => {
                          const obj = {};
                          obj[nixScope.key] = operators.listConcat(
                            operators.selectOrDefault(nixScope.r, [
                              nixScope.key,
                            ], []),
                            [nixScope.e],
                          );
                          return obj;
                        }),
                      );
                    })
                  ))
                )),
              )({})
            )),
          );
        },
      });
      Object.defineProperty(nixScope, "zipListsWith", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                nixScope.genList(
                  createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                    nixScope.f(nixScope.elemAt(nixScope.fst)(nixScope.n))(
                      nixScope.elemAt(nixScope.snd)(nixScope.n),
                    )
                  )),
                )(
                  nixScope.min(nixScope.length(nixScope.fst))(
                    nixScope.length(nixScope.snd),
                  ),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "zipLists", {
        enumerable: true,
        get() {
          return nixScope.zipListsWith(
            createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                { "fst": nixScope.fst, "snd": nixScope.snd }
              ))
            )),
          );
        },
      });
      Object.defineProperty(nixScope, "reverseList", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "l", {
                enumerable: true,
                get() {
                  return nixScope.length(nixScope.xs);
                },
              });
              return nixScope.genList(
                createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.elemAt(nixScope.xs)(
                    operators.subtract(
                      operators.subtract(nixScope.l, nixScope.n),
                      1n,
                    ),
                  )
                )),
              )(nixScope.l);
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "listDfs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "stopOnCycles", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "before", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "dfs'", {
                    enumerable: true,
                    get() {
                      return createFunc(/*arg:*/ "us", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "visited", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "rest", null, {}, (nixScope) => (
                            /*let*/ createScope((nixScope) => {
                              Object.defineProperty(nixScope, "c", {
                                enumerable: true,
                                get() {
                                  return nixScope.filter(
                                    createFunc(
                                      /*arg:*/ "x",
                                      null,
                                      {},
                                      (nixScope) => (
                                        nixScope.before(nixScope.x)(nixScope.us)
                                      ),
                                    ),
                                  )(nixScope.visited);
                                },
                              });
                              Object.defineProperty(nixScope, "b", {
                                enumerable: true,
                                get() {
                                  return nixScope.partition(
                                    createFunc(
                                      /*arg:*/ "x",
                                      null,
                                      {},
                                      (nixScope) => (
                                        nixScope.before(nixScope.x)(nixScope.us)
                                      ),
                                    ),
                                  )(nixScope.rest);
                                },
                              });
                              return (operators.ifThenElse(
                                operators.and(
                                  nixScope.stopOnCycles,
                                  operators.greaterThan(
                                    nixScope.length(nixScope.c),
                                    0n,
                                  ),
                                ),
                                () => ({
                                  "cycle": nixScope.us,
                                  "loops": nixScope.c,
                                  "visited": nixScope.visited,
                                  "rest": nixScope.rest,
                                }),
                                () => (operators.ifThenElse(
                                  operators.equal(
                                    nixScope.length(nixScope.b["right"]),
                                    0n,
                                  ),
                                  () => ({
                                    "minimal": nixScope.us,
                                    "visited": nixScope.visited,
                                    "rest": nixScope.rest,
                                  }),
                                  () => (nixScope["dfs'"](
                                    nixScope.head(nixScope.b["right"]),
                                  )(operators.listConcat(
                                    [nixScope.us],
                                    nixScope.visited,
                                  ))(
                                    operators.listConcat(
                                      nixScope.tail(nixScope.b["right"]),
                                      nixScope.b["wrong"],
                                    ),
                                  )),
                                )),
                              ));
                            })
                          ))
                        ))
                      ));
                    },
                  });
                  return nixScope["dfs'"](nixScope.head(nixScope.list))([])(
                    nixScope.tail(nixScope.list),
                  );
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "toposort", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "before", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "dfsthis", {
                  enumerable: true,
                  get() {
                    return nixScope.listDfs(true)(nixScope.before)(
                      nixScope.list,
                    );
                  },
                });
                Object.defineProperty(nixScope, "toporest", {
                  enumerable: true,
                  get() {
                    return nixScope.toposort(nixScope.before)(
                      operators.listConcat(
                        nixScope.dfsthis["visited"],
                        nixScope.dfsthis["rest"],
                      ),
                    );
                  },
                });
                return (operators.ifThenElse(
                  operators.lessThan(nixScope.length(nixScope.list), 2n),
                  () => ({ "result": nixScope.list }),
                  () => (operators.ifThenElse(
                    operators.hasAttr(nixScope.dfsthis, "cycle"),
                    () => (createScope((nixScope) => {
                      const obj = {};
                      obj["cycle"] = nixScope.reverseList(
                        operators.listConcat(
                          [nixScope.dfsthis["cycle"]],
                          nixScope.dfsthis["visited"],
                        ),
                      );
                      obj["loops"] = nixScope.dfsthis["loops"];
                      return obj;
                    })),
                    () => (operators.ifThenElse(
                      operators.hasAttr(nixScope.toporest, "cycle"),
                      () => (nixScope.toporest),
                      () => ({
                        "result": operators.listConcat([
                          nixScope.dfsthis["minimal"],
                        ], nixScope.toporest["result"]),
                      }),
                    )),
                  )),
                ));
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "sort", {
        enumerable: true,
        get() {
          return nixScope.builtins["sort"];
        },
      });
      Object.defineProperty(nixScope, "sortOn", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "pairs", {
                  enumerable: true,
                  get() {
                    return nixScope.map(
                      createFunc(
                        /*arg:*/ "x",
                        null,
                        {},
                        (nixScope) => [nixScope.f(nixScope.x), nixScope.x],
                      ),
                    )(nixScope.list);
                  },
                });
                return nixScope.map(
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    nixScope.builtins["elemAt"](nixScope.x)(1n)
                  )),
                )(
                  nixScope.sort(
                    createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                        operators.lessThan(
                          nixScope.head(nixScope.a),
                          nixScope.head(nixScope.b),
                        )
                      ))
                    )),
                  )(nixScope.pairs),
                );
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "compareLists", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "cmp", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.a, []),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.b, []),
                    () => (0n),
                    () => (-1n),
                  )),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.b, []),
                    () => (1n),
                    () => (/*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "rel", {
                        enumerable: true,
                        get() {
                          return nixScope.cmp(nixScope.head(nixScope.a))(
                            nixScope.head(nixScope.b),
                          );
                        },
                      });
                      return (operators.ifThenElse(
                        operators.equal(nixScope.rel, 0n),
                        () => (nixScope.compareLists(nixScope.cmp)(
                          nixScope.tail(nixScope.a),
                        )(nixScope.tail(nixScope.b))),
                        () => (nixScope.rel),
                      ));
                    })),
                  )),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "naturalSort", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "lst", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "vectorise", {
                enumerable: true,
                get() {
                  return createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                    nixScope.map(
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          nixScope.isList(nixScope.x),
                          () => (nixScope.toInt(nixScope.head(nixScope.x))),
                          () => (nixScope.x),
                        )
                      )),
                    )(nixScope.builtins["split"]("(0|[1-9][0-9]*)")(nixScope.s))
                  ));
                },
              });
              Object.defineProperty(nixScope, "prepared", {
                enumerable: true,
                get() {
                  return nixScope.map(
                    createFunc(
                      /*arg:*/ "x",
                      null,
                      {},
                      (
                        nixScope,
                      ) => [nixScope.vectorise(nixScope.x), nixScope.x],
                    ),
                  )(nixScope.lst);
                },
              });
              Object.defineProperty(nixScope, "less", {
                enumerable: true,
                get() {
                  return createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                      operators.lessThan(
                        nixScope.compareLists(nixScope.compare)(
                          nixScope.head(nixScope.a),
                        )(nixScope.head(nixScope.b)),
                        0n,
                      )
                    ))
                  ));
                },
              });
              return nixScope.map(
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  nixScope.elemAt(nixScope.x)(1n)
                )),
              )(nixScope.sort(nixScope.less)(nixScope.prepared));
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "take", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
            nixScope.sublist(0n)(nixScope.count)
          ));
        },
      });
      Object.defineProperty(nixScope, "takeEnd", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
              nixScope.drop(
                nixScope.max(0n)(
                  operators.subtract(nixScope.length(nixScope.xs), nixScope.n),
                ),
              )(nixScope.xs)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "drop", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.sublist(nixScope.count)(nixScope.length(nixScope.list))(
                nixScope.list,
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "dropEnd", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
              nixScope.take(
                nixScope.max(0n)(
                  operators.subtract(nixScope.length(nixScope.xs), nixScope.n),
                ),
              )(nixScope.xs)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "hasPrefix", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list2", null, {}, (nixScope) => (
              operators.equal(
                nixScope.take(nixScope.length(nixScope.list1))(nixScope.list2),
                nixScope.list1,
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "removePrefix", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list2", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.hasPrefix(nixScope.list1)(nixScope.list2),
                () => (nixScope.drop(nixScope.length(nixScope.list1))(
                  nixScope.list2,
                )),
                () => (nixScope.throw(
                  "lib.lists.removePrefix: First argument is not a list prefix of the second argument",
                )),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "sublist", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "start", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "len", {
                    enumerable: true,
                    get() {
                      return nixScope.length(nixScope.list);
                    },
                  });
                  return nixScope.genList(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      nixScope.elemAt(nixScope.list)(
                        operators.add(nixScope.n, nixScope.start),
                      )
                    )),
                  )(operators.ifThenElse(
                    operators.greaterThanOrEqual(nixScope.start, nixScope.len),
                    () => (0n),
                    () => (operators.ifThenElse(
                      operators.greaterThan(
                        operators.add(nixScope.start, nixScope.count),
                        nixScope.len,
                      ),
                      () => (operators.subtract(nixScope.len, nixScope.start)),
                      () => (nixScope.count),
                    )),
                  ));
                })
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "commonPrefix", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list2", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "matchings", {
                  enumerable: true,
                  get() {
                    return nixScope.zipListsWith(
                      createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                          operators.notEqual(nixScope.fst, nixScope.snd)
                        ))
                      )),
                    )(nixScope.list1)(nixScope.list2);
                  },
                });
                Object.defineProperty(nixScope, "commonPrefixLength", {
                  enumerable: true,
                  get() {
                    return nixScope.findFirstIndex(nixScope.id)(
                      nixScope.length(nixScope.matchings),
                    )(nixScope.matchings);
                  },
                });
                return nixScope.take(nixScope.commonPrefixLength)(
                  nixScope.list1,
                );
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "last", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'lib.assertMsg (list != [ ]) "lists.last: list must not be empty!"',
                );
              }
              return nixScope.elemAt(nixScope.list)(
                operators.subtract(nixScope.length(nixScope.list), 1n),
              );
            })(
              nixScope.lib["assertMsg"](operators.notEqual(nixScope.list, []))(
                "lists.last: list must not be empty!",
              ),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "init", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'lib.assertMsg (list != [ ]) "lists.init: list must not be empty!"',
                );
              }
              return nixScope.take(
                operators.subtract(nixScope.length(nixScope.list), 1n),
              )(nixScope.list);
            })(
              nixScope.lib["assertMsg"](operators.notEqual(nixScope.list, []))(
                "lists.init: list must not be empty!",
              ),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "crossLists", {
        enumerable: true,
        get() {
          return nixScope.warn(`
        lib.crossLists is deprecated, use lib.mapCartesianProduct instead.
    
        For example, the following function call:
    
        nix-repl> lib.crossLists (x: y: x+y) [[1 2] [3 4]]
        [ 4 5 5 6 ]
    
        Can now be replaced by the following one:
    
        nix-repl> lib.mapCartesianProduct ({x,y}: x+y) { x = [1 2]; y = [3 4]; }
        [ 4 5 5 6 ]
      `)(createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            nixScope.foldl(createFunc(/*arg:*/ "fs", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                nixScope.concatMap(
                  createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                    nixScope.map(nixScope.f)(nixScope.args)
                  )),
                )(nixScope.fs)
              ))
            )))([nixScope.f])
          )));
        },
      });
      Object.defineProperty(nixScope, "unique", {
        enumerable: true,
        get() {
          return nixScope["foldl'"](
            createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
                operators.ifThenElse(
                  nixScope.elem(nixScope.e)(nixScope.acc),
                  () => (nixScope.acc),
                  () => (operators.listConcat(nixScope.acc, [nixScope.e])),
                )
              ))
            )),
          )([]);
        },
      });
      Object.defineProperty(nixScope, "allUnique", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            operators.equal(
              nixScope.length(nixScope.unique(nixScope.list)),
              nixScope.length(nixScope.list),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "intersectLists", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.elem(nixScope.x)(nixScope.e)
            )))
          ));
        },
      });
      Object.defineProperty(nixScope, "subtractLists", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.negate(nixScope.elem(nixScope.x)(nixScope.e))
            )))
          ));
        },
      });
      Object.defineProperty(nixScope, "mutuallyExclusive", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              operators.or(
                operators.equal(nixScope.length(nixScope.a), 0n),
                operators.negate(
                  nixScope.any(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      nixScope.elem(nixScope.x)(nixScope.a)
                    )),
                  )(nixScope.b),
                ),
              )
            ))
          ));
        },
      });
      return nixScope;
    });
  })
));
