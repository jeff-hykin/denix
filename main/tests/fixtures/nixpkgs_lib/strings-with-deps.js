export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.concatStringsSep = nixScope.lib["concatStringsSep"];
    nixScope.head = nixScope.lib["head"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.listToAttrs = nixScope.lib["listToAttrs"];
    nixScope.tail = nixScope.lib["tail"];
    return /*rec*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "textClosureList",
        (nixScope) =>
          createFunc(/*arg:*/ "predefined", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "arg", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "f", (nixScope) =>
                  createFunc(/*arg:*/ "done", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "todo", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.todo, []),
                        () => ({ "result": [], "done": nixScope.done }),
                        () => (/*let*/ createScope((nixScope) => {
                          defGetter(
                            nixScope,
                            "entry",
                            (nixScope) => nixScope.head(nixScope.todo),
                          );
                          return (operators.ifThenElse(
                            nixScope.isAttrs(nixScope.entry),
                            () => (/*let*/ createScope((nixScope) => {
                              defGetter(
                                nixScope,
                                "x",
                                (nixScope) =>
                                  nixScope.f(nixScope.done)(
                                    nixScope.entry["deps"],
                                  ),
                              );
                              defGetter(
                                nixScope,
                                "y",
                                (nixScope) =>
                                  nixScope.f(nixScope.x["done"])(
                                    nixScope.tail(nixScope.todo),
                                  ),
                              );
                              return ({
                                "result": operators.listConcat(
                                  nixScope.x["result"],
                                  operators.listConcat(
                                    [nixScope.entry["text"]],
                                    nixScope.y["result"],
                                  ),
                                ),
                                "done": nixScope.y["done"],
                              });
                            })),
                            () => (operators.ifThenElse(
                              operators.hasAttr(nixScope.done, nixScope.entry),
                              () => (nixScope.f(nixScope.done)(
                                nixScope.tail(nixScope.todo),
                              )),
                              () => (nixScope.f(
                                operators.merge(
                                  nixScope.done,
                                  nixScope.listToAttrs([
                                    { "name": nixScope.entry, "value": 1n },
                                  ]),
                                ),
                              )(operators.listConcat([
                                nixScope.predefined[nixScope.entry],
                              ], nixScope.tail(nixScope.todo)))),
                            )),
                          ));
                        })),
                      )
                    ))
                  )));
                return (nixScope.f({})(nixScope.arg))["result"];
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "textClosureMap",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "predefined", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "names", null, {}, (nixScope) => (
                nixScope.concatStringsSep("")(
                  nixScope.map(nixScope.f)(
                    nixScope.textClosureList(nixScope.predefined)(
                      nixScope.names,
                    ),
                  ),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "noDepEntry",
        (nixScope) =>
          createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            { "text": nixScope.text, "deps": [] }
          )),
      );
      defGetter(
        nixScope,
        "fullDepEntry",
        (nixScope) =>
          createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "deps", null, {}, (nixScope) => (
              { "text": nixScope.text, "deps": nixScope.deps }
            ))
          )),
      );
      defGetter(
        nixScope,
        "packEntry",
        (nixScope) =>
          createFunc(/*arg:*/ "deps", null, {}, (nixScope) => (
            { "deps": nixScope.deps, "text": "" }
          )),
      );
      defGetter(
        nixScope,
        "stringAfter",
        (nixScope) =>
          createFunc(/*arg:*/ "deps", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
              { "text": nixScope.text, "deps": nixScope.deps }
            ))
          )),
      );
      return nixScope;
    });
  })
));
