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
      defGetter(
        nixScope,
        "singleton",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => [nixScope.x]),
      );
      defGetter(
        nixScope,
        "forEach",
        (nixScope) =>
          createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              nixScope.map(nixScope.f)(nixScope.xs)
            ))
          )),
      );
      defGetter(
        nixScope,
        "foldr",
        (nixScope) =>
          createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "len",
                    (nixScope) => nixScope.length(nixScope.list),
                  );
                  defGetter(nixScope, "fold'", (nixScope) =>
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.n, nixScope.len),
                        () => (nixScope.nul),
                        () => (nixScope.op(
                          nixScope.elemAt(nixScope.list)(nixScope.n),
                        )(nixScope["fold'"](operators.add(nixScope.n, 1n)))),
                      )
                    )));
                  return nixScope["fold'"](0n);
                })
              ))
            ))
          )),
      );
      defGetter(nixScope, "fold", (nixScope) => nixScope.foldr);
      defGetter(
        nixScope,
        "foldl",
        (nixScope) =>
          createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "nul", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "foldl'", (nixScope) =>
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.n, -1n),
                        () => (nixScope.nul),
                        () => (nixScope.op(
                          nixScope["foldl'"](
                            operators.subtract(nixScope.n, 1n),
                          ),
                        )(nixScope.elemAt(nixScope.list)(nixScope.n))),
                      )
                    )));
                  return nixScope["foldl'"](
                    operators.subtract(nixScope.length(nixScope.list), 1n),
                  );
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "foldl'",
        (nixScope) =>
          createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
              nixScope.builtins["seq"](nixScope.acc)(
                nixScope.builtins["foldl'"](nixScope.op)(nixScope.acc),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "imap0",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.f(nixScope.n)(
                    nixScope.elemAt(nixScope.list)(nixScope.n),
                  )
                )),
              )(nixScope.length(nixScope.list))
            ))
          )),
      );
      defGetter(
        nixScope,
        "imap1",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                  nixScope.f(operators.add(nixScope.n, 1n))(
                    nixScope.elemAt(nixScope.list)(nixScope.n),
                  )
                )),
              )(nixScope.length(nixScope.list))
            ))
          )),
      );
      defGetter(
        nixScope,
        "ifilter0",
        (nixScope) =>
          createFunc(/*arg:*/ "ipred", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "concatMap",
        (nixScope) => nixScope.builtins["concatMap"],
      );
      defGetter(
        nixScope,
        "flatten",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isList(nixScope.x),
              () => (nixScope.concatMap(
                createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                  nixScope.flatten(nixScope.y)
                )),
              )(nixScope.x)),
              () => [nixScope.x],
            )
          )),
      );
      defGetter(
        nixScope,
        "remove",
        (nixScope) =>
          createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.notEqual(nixScope.x, nixScope.e)
            )))
          )),
      );
      defGetter(
        nixScope,
        "findSingle",
        (nixScope) =>
          createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "multiple", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "found",
                      (nixScope) =>
                        nixScope.filter(nixScope.pred)(nixScope.list),
                    );
                    defGetter(
                      nixScope,
                      "len",
                      (nixScope) => nixScope.length(nixScope.found),
                    );
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
          )),
      );
      defGetter(
        nixScope,
        "findFirstIndex",
        (nixScope) =>
          createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "resultIndex", (nixScope) =>
                    nixScope["foldl'"](
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
                    )(-1n)(nixScope.list));
                  return (operators.ifThenElse(
                    operators.lessThan(nixScope.resultIndex, 0n),
                    () => (nixScope.default),
                    () => (nixScope.resultIndex),
                  ));
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "findFirst",
        (nixScope) =>
          createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "index", (nixScope) =>
                    nixScope.findFirstIndex(nixScope.pred)(null)(
                      nixScope.list,
                    ));
                  return (operators.ifThenElse(
                    operators.equal(nixScope.index, null),
                    () => (nixScope.default),
                    () => (nixScope.elemAt(nixScope.list)(nixScope.index)),
                  ));
                })
              ))
            ))
          )),
      );
      defGetter(nixScope, "any", (nixScope) => nixScope.builtins["any"]);
      defGetter(nixScope, "all", (nixScope) => nixScope.builtins["all"]);
      defGetter(
        nixScope,
        "count",
        (nixScope) =>
          createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "optional",
        (nixScope) =>
          createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => [nixScope.elem],
                () => [],
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "optionals",
        (nixScope) =>
          createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elems", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => (nixScope.elems),
                () => [],
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "toList",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isList(nixScope.x),
              () => (nixScope.x),
              () => [nixScope.x],
            )
          )),
      );
      defGetter(
        nixScope,
        "range",
        (nixScope) =>
          createFunc(/*arg:*/ "first", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "replicate",
        (nixScope) =>
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              nixScope.genList(
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  nixScope.elem
                )),
              )(nixScope.n)
            ))
          )),
      );
      defGetter(
        nixScope,
        "partition",
        (nixScope) => nixScope.builtins["partition"],
      );
      defGetter(
        nixScope,
        "groupBy'",
        (nixScope) =>
          createFunc(/*arg:*/ "op", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "groupBy",
        (nixScope) =>
          operators.selectOrDefault(
            nixScope.builtins,
            ["groupBy"],
            createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
              nixScope["foldl'"](
                createFunc(/*arg:*/ "r", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "key", (nixScope) =>
                        nixScope.pred(nixScope.e));
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
          ),
      );
      defGetter(
        nixScope,
        "zipListsWith",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "zipLists",
        (nixScope) =>
          nixScope.zipListsWith(
            createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                { "fst": nixScope.fst, "snd": nixScope.snd }
              ))
            )),
          ),
      );
      defGetter(
        nixScope,
        "reverseList",
        (nixScope) =>
          createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "l",
                (nixScope) => nixScope.length(nixScope.xs),
              );
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
          )),
      );
      defGetter(
        nixScope,
        "listDfs",
        (nixScope) =>
          createFunc(/*arg:*/ "stopOnCycles", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "before", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "dfs'", (nixScope) =>
                    createFunc(/*arg:*/ "us", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "visited", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "rest", null, {}, (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            defGetter(nixScope, "c", (nixScope) =>
                              nixScope.filter(
                                createFunc(
                                  /*arg:*/ "x",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.before(nixScope.x)(nixScope.us)
                                  ),
                                ),
                              )(nixScope.visited));
                            defGetter(nixScope, "b", (nixScope) =>
                              nixScope.partition(
                                createFunc(
                                  /*arg:*/ "x",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.before(nixScope.x)(nixScope.us)
                                  ),
                                ),
                              )(nixScope.rest));
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
                    )));
                  return nixScope["dfs'"](nixScope.head(nixScope.list))([])(
                    nixScope.tail(nixScope.list),
                  );
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "toposort",
        (nixScope) =>
          createFunc(/*arg:*/ "before", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "dfsthis",
                  (nixScope) =>
                    nixScope.listDfs(true)(nixScope.before)(nixScope.list),
                );
                defGetter(
                  nixScope,
                  "toporest",
                  (nixScope) =>
                    nixScope.toposort(nixScope.before)(
                      operators.listConcat(
                        nixScope.dfsthis["visited"],
                        nixScope.dfsthis["rest"],
                      ),
                    ),
                );
                return (operators.ifThenElse(
                  operators.lessThan(nixScope.length(nixScope.list), 2n),
                  () => ({ "result": nixScope.list }),
                  () => (operators.ifThenElse(
                    operators.hasAttr(nixScope.dfsthis, "cycle"),
                    () => (createScope((nixScope) => {
                      const obj = {};
                      obj.cycle = nixScope.reverseList(
                        operators.listConcat(
                          [nixScope.dfsthis["cycle"]],
                          nixScope.dfsthis["visited"],
                        ),
                      );
                      obj.loops = nixScope.dfsthis.loops;
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
          )),
      );
      defGetter(nixScope, "sort", (nixScope) => nixScope.builtins["sort"]);
      defGetter(
        nixScope,
        "sortOn",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "pairs", (nixScope) =>
                  nixScope.map(
                    createFunc(
                      /*arg:*/ "x",
                      null,
                      {},
                      (nixScope) => [nixScope.f(nixScope.x), nixScope.x],
                    ),
                  )(nixScope.list));
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
          )),
      );
      defGetter(
        nixScope,
        "compareLists",
        (nixScope) =>
          createFunc(/*arg:*/ "cmp", null, {}, (nixScope) => (
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
                      defGetter(nixScope, "rel", (nixScope) =>
                        nixScope.cmp(nixScope.head(nixScope.a))(
                          nixScope.head(nixScope.b),
                        ));
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
          )),
      );
      defGetter(
        nixScope,
        "naturalSort",
        (nixScope) =>
          createFunc(/*arg:*/ "lst", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "vectorise", (nixScope) =>
                createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                  nixScope.map(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.isList(nixScope.x),
                        () => (nixScope.toInt(nixScope.head(nixScope.x))),
                        () => (nixScope.x),
                      )
                    )),
                  )(nixScope.builtins["split"]("(0|[1-9][0-9]*)")(nixScope.s))
                )));
              defGetter(nixScope, "prepared", (nixScope) =>
                nixScope.map(
                  createFunc(
                    /*arg:*/ "x",
                    null,
                    {},
                    (nixScope) => [nixScope.vectorise(nixScope.x), nixScope.x],
                  ),
                )(nixScope.lst));
              defGetter(nixScope, "less", (nixScope) =>
                createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                    operators.lessThan(
                      nixScope.compareLists(nixScope.compare)(
                        nixScope.head(nixScope.a),
                      )(nixScope.head(nixScope.b)),
                      0n,
                    )
                  ))
                )));
              return nixScope.map(
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  nixScope.elemAt(nixScope.x)(1n)
                )),
              )(nixScope.sort(nixScope.less)(nixScope.prepared));
            })
          )),
      );
      defGetter(
        nixScope,
        "take",
        (nixScope) =>
          createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
            nixScope.sublist(0n)(nixScope.count)
          )),
      );
      defGetter(
        nixScope,
        "takeEnd",
        (nixScope) =>
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
              nixScope.drop(
                nixScope.max(0n)(
                  operators.subtract(nixScope.length(nixScope.xs), nixScope.n),
                ),
              )(nixScope.xs)
            ))
          )),
      );
      defGetter(
        nixScope,
        "drop",
        (nixScope) =>
          createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.sublist(nixScope.count)(nixScope.length(nixScope.list))(
                nixScope.list,
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "dropEnd",
        (nixScope) =>
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
              nixScope.take(
                nixScope.max(0n)(
                  operators.subtract(nixScope.length(nixScope.xs), nixScope.n),
                ),
              )(nixScope.xs)
            ))
          )),
      );
      defGetter(
        nixScope,
        "hasPrefix",
        (nixScope) =>
          createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list2", null, {}, (nixScope) => (
              operators.equal(
                nixScope.take(nixScope.length(nixScope.list1))(nixScope.list2),
                nixScope.list1,
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "removePrefix",
        (nixScope) =>
          createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "sublist",
        (nixScope) =>
          createFunc(/*arg:*/ "start", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "count", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "len",
                    (nixScope) => nixScope.length(nixScope.list),
                  );
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
          )),
      );
      defGetter(
        nixScope,
        "commonPrefix",
        (nixScope) =>
          createFunc(/*arg:*/ "list1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list2", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "matchings", (nixScope) =>
                  nixScope.zipListsWith(
                    createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                        operators.notEqual(nixScope.fst, nixScope.snd)
                      ))
                    )),
                  )(nixScope.list1)(nixScope.list2));
                defGetter(nixScope, "commonPrefixLength", (nixScope) =>
                  nixScope.findFirstIndex(nixScope.id)(
                    nixScope.length(nixScope.matchings),
                  )(nixScope.matchings));
                return nixScope.take(nixScope.commonPrefixLength)(
                  nixScope.list1,
                );
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "last",
        (nixScope) =>
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "init",
        (nixScope) =>
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(nixScope, "crossLists", (nixScope) =>
        nixScope.warn(`
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
        ))));
      defGetter(
        nixScope,
        "unique",
        (nixScope) =>
          nixScope["foldl'"](
            createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
                operators.ifThenElse(
                  nixScope.elem(nixScope.e)(nixScope.acc),
                  () => (nixScope.acc),
                  () => (operators.listConcat(nixScope.acc, [nixScope.e])),
                )
              ))
            )),
          )([]),
      );
      defGetter(
        nixScope,
        "allUnique",
        (nixScope) =>
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            operators.equal(
              nixScope.length(nixScope.unique(nixScope.list)),
              nixScope.length(nixScope.list),
            )
          )),
      );
      defGetter(
        nixScope,
        "intersectLists",
        (nixScope) =>
          createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.elem(nixScope.x)(nixScope.e)
            )))
          )),
      );
      defGetter(
        nixScope,
        "subtractLists",
        (nixScope) =>
          createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
            nixScope.filter(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.negate(nixScope.elem(nixScope.x)(nixScope.e))
            )))
          )),
      );
      defGetter(
        nixScope,
        "mutuallyExclusive",
        (nixScope) =>
          createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
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
          )),
      );
      return nixScope;
    });
  })
));
