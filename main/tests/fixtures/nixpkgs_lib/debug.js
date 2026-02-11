export default /**
  Collection of functions useful for debugging
  broken nix expressions.

  * `trace`-like functions take two values, print
    the first to stderr and return the second.
  * `traceVal`-like functions take one argument
    which both printed and returned.
  * `traceSeq`-like functions fully evaluate their
    traced value before printing (not just to “weak
    head normal form” like trace does by default).
  * Functions that end in `-Fn` take an additional
    function as their first argument, which is applied
    to the traced value before it is printed.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.isList = nixScope.lib["isList"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.substring = nixScope.lib["substring"];
    nixScope.attrValues = nixScope.lib["attrValues"];
    nixScope.concatLists = nixScope.lib["concatLists"];
    nixScope.const = nixScope.lib["const"];
    nixScope.elem = nixScope.lib["elem"];
    nixScope.generators = nixScope.lib["generators"];
    nixScope.id = nixScope.lib["id"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.trace = nixScope.lib["trace"];
    return /*rec*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "traceIf",
        (nixScope) =>
          createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                operators.ifThenElse(
                  nixScope.pred,
                  () => (nixScope.trace(nixScope.msg)(nixScope.x)),
                  () => (nixScope.x),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceValFn",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.trace(nixScope.f(nixScope.x))(nixScope.x)
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceVal",
        (nixScope) => nixScope.traceValFn(nixScope.id),
      );
      defGetter(
        nixScope,
        "traceSeq",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              nixScope.trace(
                nixScope.builtins["deepSeq"](nixScope.x)(nixScope.x),
              )(nixScope.y)
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceSeqN",
        (nixScope) =>
          createFunc(/*arg:*/ "depth", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "snip", (nixScope) =>
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.isList(nixScope.v),
                        () => (nixScope.noQuotes("[…]")(nixScope.v)),
                        () => (operators.ifThenElse(
                          nixScope.isAttrs(nixScope.v),
                          () => (nixScope.noQuotes("{…}")(nixScope.v)),
                          () => (nixScope.v),
                        )),
                      )
                    )));
                  defGetter(nixScope, "noQuotes", (nixScope) =>
                    createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        {
                          "__pretty": nixScope.const(nixScope.str),
                          "val": nixScope.v,
                        }
                      ))
                    )));
                  defGetter(nixScope, "modify", (nixScope) =>
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                          operators.ifThenElse(
                            operators.equal(nixScope.n, 0n),
                            () => (nixScope.fn(nixScope.v)),
                            () => (operators.ifThenElse(
                              nixScope.isList(nixScope.v),
                              () => (nixScope.map(
                                nixScope.modify(
                                  operators.subtract(nixScope.n, 1n),
                                )(nixScope.fn),
                              )(nixScope.v)),
                              () => (operators.ifThenElse(
                                nixScope.isAttrs(nixScope.v),
                                () => (nixScope.mapAttrs(
                                  nixScope.const(
                                    nixScope.modify(
                                      operators.subtract(nixScope.n, 1n),
                                    )(nixScope.fn),
                                  ),
                                )(nixScope.v)),
                                () => (nixScope.v),
                              )),
                            )),
                          )
                        ))
                      ))
                    )));
                  return nixScope.trace(
                    nixScope.generators["toPretty"](
                      { "allowPrettyValues": true },
                    )(
                      nixScope.modify(nixScope.depth)(nixScope.snip)(
                        nixScope.x,
                      ),
                    ),
                  )(nixScope.y);
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceValSeqFn",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              nixScope.traceValFn(nixScope.f)(
                nixScope.builtins["deepSeq"](nixScope.v)(nixScope.v),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceValSeq",
        (nixScope) => nixScope.traceValSeqFn(nixScope.id),
      );
      defGetter(
        nixScope,
        "traceValSeqNFn",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "depth", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                nixScope.traceSeqN(nixScope.depth)(nixScope.f(nixScope.v))(
                  nixScope.v,
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "traceValSeqN",
        (nixScope) => nixScope.traceValSeqNFn(nixScope.id),
      );
      defGetter(
        nixScope,
        "traceFnSeqN",
        (nixScope) =>
          createFunc(/*arg:*/ "depth", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "res",
                      (nixScope) => nixScope.f(nixScope.v),
                    );
                    return nixScope.lib["traceSeqN"](
                      operators.add(nixScope.depth, 1n),
                    )({
                      "fn": nixScope.name,
                      "from": nixScope.v,
                      "to": nixScope.res,
                    })(nixScope.res);
                  })
                ))
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "runTests",
        (nixScope) =>
          createFunc(/*arg:*/ "tests", null, {}, (nixScope) => (
            nixScope.concatLists(
              nixScope.attrValues(
                nixScope.mapAttrs(
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "test", null, {}, (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "testsToRun",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            operators.hasAttr(nixScope.tests, "tests"),
                            () => (nixScope.tests["tests"]),
                            () => [],
                          )),
                        );
                        return (operators.ifThenElse(
                          operators.and(
                            operators.and(
                              operators.or(
                                operators.equal(
                                  nixScope.substring(0n)(4n)(nixScope.name),
                                  "test",
                                ),
                                nixScope.elem(nixScope.name)(
                                  nixScope.testsToRun,
                                ),
                              ),
                              operators.or(
                                operators.equal(nixScope.testsToRun, []),
                                nixScope.elem(nixScope.name)(
                                  nixScope.tests["tests"],
                                ),
                              ),
                            ),
                            operators.notEqual(
                              nixScope.test["expr"],
                              nixScope.test["expected"],
                            ),
                          ),
                          () => [
                            {
                              "name": nixScope.name,
                              "expected": nixScope.test["expected"],
                              "result": nixScope.test["expr"],
                            },
                          ],
                          () => [],
                        ));
                      })
                    ))
                  )),
                )(nixScope.tests),
              ),
            )
          )),
      );
      defGetter(
        nixScope,
        "testAllTrue",
        (nixScope) =>
          createFunc(/*arg:*/ "expr", null, {}, (nixScope) => (
            {
              "expr": nixScope.expr,
              "expected": nixScope.map(
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  true
                )),
              )(nixScope.expr),
            }
          )),
      );
      return nixScope;
    });
  })
));
