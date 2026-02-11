export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "toGNUCommandLineShell", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "options", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            nixScope.lib["escapeShellArgs"](
              nixScope.toGNUCommandLine(nixScope.options)(nixScope.attrs),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "toGNUCommandLine", {
      enumerable: true,
      get() {
        return createFunc(
          {
            "mkOptionName": (
              nixScope,
            ) => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(
                  nixScope.builtins["stringLength"](nixScope.k),
                  1n,
                ),
                () => (new InterpolatedString(["-", ""], [() => (nixScope.k)])),
                () => (new InterpolatedString(["--", ""], [
                  () => (nixScope.k),
                ])),
              )
            ))),
            "mkBool": (
              nixScope,
            ) => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                nixScope.lib["optional"](nixScope.v)(
                  nixScope.mkOptionName(nixScope.k),
                )
              ))
            ))),
            "mkList": (
              nixScope,
            ) => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                nixScope.lib["concatMap"](nixScope.mkOption(nixScope.k))(
                  nixScope.v,
                )
              ))
            ))),
            "mkOption": (
              nixScope,
            ) => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.v, null),
                  () => [],
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.optionValueSeparator, null),
                    () => [
                      nixScope.mkOptionName(nixScope.k),
                      nixScope.lib["generators"]["mkValueStringDefault"]({})(
                        nixScope.v,
                      ),
                    ],
                    () => [
                      new InterpolatedString(["", "", "", ""], [
                        () => (nixScope.mkOptionName(nixScope.k)),
                        () => (nixScope.optionValueSeparator),
                        () => (nixScope.lib["generators"]
                          ["mkValueStringDefault"]({})(nixScope.v)),
                      ]),
                    ],
                  )),
                )
              ))
            ))),
            "optionValueSeparator": (nixScope) => (null),
          },
          null,
          {},
          (nixScope) => (
            createFunc(/*arg:*/ "options", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "render", {
                  enumerable: true,
                  get() {
                    return createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          nixScope.builtins["isBool"](nixScope.v),
                          () => (nixScope.mkBool(nixScope.k)(nixScope.v)),
                          () => (operators.ifThenElse(
                            nixScope.builtins["isList"](nixScope.v),
                            () => (nixScope.mkList(nixScope.k)(nixScope.v)),
                            () => (nixScope.mkOption(nixScope.k)(nixScope.v)),
                          )),
                        )
                      ))
                    ));
                  },
                });
                return nixScope.builtins["concatLists"](
                  nixScope.lib["mapAttrsToList"](nixScope.render)(
                    nixScope.options,
                  ),
                );
              })
            ))
          ),
        );
      },
    });
    return nixScope;
  })
));
