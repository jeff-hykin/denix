export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "fix",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "x", (nixScope) => nixScope.f(nixScope.x));
            return nixScope.x;
          })
        )),
    );
    defGetter(
      nixScope,
      "fix'",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "x", (nixScope) =>
              operators.merge(
                nixScope.f(nixScope.x),
                { "__unfix__": nixScope.f },
              ));
            return nixScope.x;
          })
        )),
    );
    defGetter(
      nixScope,
      "converge",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "x'", (nixScope) => nixScope.f(nixScope.x));
              return (operators.ifThenElse(
                operators.equal(nixScope["x'"], nixScope.x),
                () => (nixScope.x),
                () => (nixScope.converge(nixScope.f)(nixScope["x'"])),
              ));
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "extends",
      (nixScope) =>
        createFunc(/*arg:*/ "overlay", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "prev",
                  (nixScope) => nixScope.f(nixScope.final),
                );
                return operators.merge(
                  nixScope.prev,
                  nixScope.overlay(nixScope.final)(nixScope.prev),
                );
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "composeExtensions",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "fApplied",
                    (nixScope) => nixScope.f(nixScope.final)(nixScope.prev),
                  );
                  defGetter(
                    nixScope,
                    "prev'",
                    (nixScope) =>
                      operators.merge(nixScope.prev, nixScope.fApplied),
                  );
                  return operators.merge(
                    nixScope.fApplied,
                    nixScope.g(nixScope.final)(nixScope["prev'"]),
                  );
                })
              ))
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "composeManyExtensions",
      (nixScope) =>
        nixScope.lib["foldr"](createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
            nixScope.composeExtensions(nixScope.x)(nixScope.y)
          ))
        )))(createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
            {}
          ))
        ))),
    );
    defGetter(
      nixScope,
      "makeExtensible",
      (nixScope) => nixScope.makeExtensibleWithCustomName("extend"),
    );
    defGetter(
      nixScope,
      "makeExtensibleWithCustomName",
      (nixScope) =>
        createFunc(/*arg:*/ "extenderName", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "rattrs", null, {}, (nixScope) => (
            nixScope["fix'"](
              createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
                operators.merge(
                  nixScope.rattrs(nixScope.self),
                  createScope((nixScope) => {
                    const obj = {};
                    obj[nixScope.extenderName] = createFunc(
                      /*arg:*/ "f",
                      null,
                      {},
                      (nixScope) => (
                        nixScope.makeExtensibleWithCustomName(
                          nixScope.extenderName,
                        )(nixScope.extends(nixScope.f)(nixScope.rattrs))
                      ),
                    );
                    return obj;
                  }),
                )
              )),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "toExtension",
      (nixScope) =>
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.lib["isFunction"](nixScope.f),
            () => (createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "fPrev",
                    (nixScope) => nixScope.f(nixScope.prev),
                  );
                  return (operators.ifThenElse(
                    nixScope.lib["isFunction"](nixScope.fPrev),
                    () => (nixScope.f(nixScope.final)(nixScope.prev)),
                    () => (nixScope.fPrev),
                  ));
                })
              ))
            ))),
            () => (createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                nixScope.f
              ))
            ))),
          )
        )),
    );
    return nixScope;
  })
));
