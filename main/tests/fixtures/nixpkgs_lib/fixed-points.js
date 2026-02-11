export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "fix", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "x", {
              enumerable: true,
              get() {
                return nixScope.f(nixScope.x);
              },
            });
            return nixScope.x;
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "fix'", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "x", {
              enumerable: true,
              get() {
                return operators.merge(
                  nixScope.f(nixScope.x),
                  { "__unfix__": nixScope.f },
                );
              },
            });
            return nixScope.x;
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "converge", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "x'", {
                enumerable: true,
                get() {
                  return nixScope.f(nixScope.x);
                },
              });
              return (operators.ifThenElse(
                operators.equal(nixScope["x'"], nixScope.x),
                () => (nixScope.x),
                () => (nixScope.converge(nixScope.f)(nixScope["x'"])),
              ));
            })
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "extends", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "overlay", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "prev", {
                  enumerable: true,
                  get() {
                    return nixScope.f(nixScope.final);
                  },
                });
                return operators.merge(
                  nixScope.prev,
                  nixScope.overlay(nixScope.final)(nixScope.prev),
                );
              })
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "composeExtensions", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "fApplied", {
                    enumerable: true,
                    get() {
                      return nixScope.f(nixScope.final)(nixScope.prev);
                    },
                  });
                  Object.defineProperty(nixScope, "prev'", {
                    enumerable: true,
                    get() {
                      return operators.merge(nixScope.prev, nixScope.fApplied);
                    },
                  });
                  return operators.merge(
                    nixScope.fApplied,
                    nixScope.g(nixScope.final)(nixScope["prev'"]),
                  );
                })
              ))
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "composeManyExtensions", {
      enumerable: true,
      get() {
        return nixScope.lib["foldr"](
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              nixScope.composeExtensions(nixScope.x)(nixScope.y)
            ))
          )),
        )(createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
            {}
          ))
        )));
      },
    });
    Object.defineProperty(nixScope, "makeExtensible", {
      enumerable: true,
      get() {
        return nixScope.makeExtensibleWithCustomName("extend");
      },
    });
    Object.defineProperty(nixScope, "makeExtensibleWithCustomName", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "extenderName", null, {}, (nixScope) => (
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
        ));
      },
    });
    Object.defineProperty(nixScope, "toExtension", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.lib["isFunction"](nixScope.f),
            () => (createFunc(/*arg:*/ "final", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "fPrev", {
                    enumerable: true,
                    get() {
                      return nixScope.f(nixScope.prev);
                    },
                  });
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
        ));
      },
    });
    return nixScope;
  })
));
