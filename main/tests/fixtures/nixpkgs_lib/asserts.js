export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
    nixScope.filter = nixScope.lib["lists"]["filter"];
    nixScope.showWarnings = nixScope.lib["trivial"]["showWarnings"];
    return /*rec*/ createScope((nixScope) => {
      Object.defineProperty(nixScope, "assertMsg", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pred", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
              operators.or(
                nixScope.pred,
                nixScope.builtins["throw"](nixScope.msg),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "assertOneOf", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "val", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
                nixScope.assertMsg(
                  nixScope.lib["elem"](nixScope.val)(nixScope.xs),
                )(
                  new InterpolatedString([
                    "",
                    " must be one of ",
                    ", but is: ",
                    "",
                  ], [
                    () => (nixScope.name),
                    () => (nixScope.lib["generators"]["toPretty"]({})(
                      nixScope.xs,
                    )),
                    () => (nixScope.lib["generators"]["toPretty"]({})(
                      nixScope.val,
                    )),
                  ]),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "assertEachOneOf", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "vals", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "xs", null, {}, (nixScope) => (
                nixScope.assertMsg(
                  nixScope.lib["all"](
                    createFunc(/*arg:*/ "val", null, {}, (nixScope) => (
                      nixScope.lib["elem"](nixScope.val)(nixScope.xs)
                    )),
                  )(nixScope.vals),
                )(
                  new InterpolatedString([
                    "each element in ",
                    " must be one of ",
                    ", but is: ",
                    "",
                  ], [
                    () => (nixScope.name),
                    () => (nixScope.lib["generators"]["toPretty"]({})(
                      nixScope.xs,
                    )),
                    () => (nixScope.lib["generators"]["toPretty"]({})(
                      nixScope.vals,
                    )),
                  ]),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "checkAssertWarn", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "assertions", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "warnings", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "val", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "failedAssertions", {
                    enumerable: true,
                    get() {
                      return nixScope.map(
                        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                          nixScope.x["message"]
                        )),
                      )(
                        nixScope.filter(
                          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                            operators.negate(nixScope.x["assertion"])
                          )),
                        )(nixScope.assertions),
                      );
                    },
                  });
                  return (operators.ifThenElse(
                    operators.notEqual(nixScope.failedAssertions, []),
                    () => (nixScope.throw(
                      new InterpolatedString(["Failed assertions:", ""], [
                        () => (nixScope.concatStringsSep("")(
                          nixScope.map(
                            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                              new InterpolatedString(["- ", ""], [
                                () => (nixScope.x),
                              ])
                            )),
                          )(nixScope.failedAssertions),
                        )),
                      ]),
                    )),
                    () => (nixScope.showWarnings(nixScope.warnings)(
                      nixScope.val,
                    )),
                  ));
                })
              ))
            ))
          ));
        },
      });
      return nixScope;
    });
  })
));
