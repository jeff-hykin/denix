export default //
//
//
//
//
//
//
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.normalise = nixScope.lib["path"]["subpath"]["normalise"];
    nixScope.isValid = nixScope.lib["path"]["subpath"]["isValid"];
    nixScope.assertMsg = nixScope.lib["asserts"]["assertMsg"];
    defGetter(nixScope, "lib", (nixScope) => nixScope.import(nixScope.libpath));
    defGetter(
      nixScope,
      "strings",
      (nixScope) =>
        nixScope.map(createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          nixScope.builtins["readFile"](
            operators.add(
              nixScope.dir,
              new InterpolatedString(["/", ""], [() => (nixScope.name)]),
            ),
          )
        )))(
          nixScope.builtins["attrNames"](
            nixScope.builtins["readDir"](nixScope.dir),
          ),
        ),
    );
    defGetter(
      nixScope,
      "normaliseAndCheck",
      (nixScope) =>
        createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "originalValid",
              (nixScope) => nixScope.isValid(nixScope.str),
            );
            defGetter(
              nixScope,
              "tryOnce",
              (nixScope) =>
                nixScope.builtins["tryEval"](nixScope.normalise(nixScope.str)),
            );
            defGetter(
              nixScope,
              "tryTwice",
              (nixScope) =>
                nixScope.builtins["tryEval"](
                  nixScope.normalise(nixScope.tryOnce["value"]),
                ),
            );
            defGetter(
              nixScope,
              "absConcatOrig",
              (nixScope) =>
                operators.add(
                  new Path(["/."], []),
                  operators.add("/", nixScope.str),
                ),
            );
            defGetter(
              nixScope,
              "absConcatNormalised",
              (nixScope) =>
                operators.add(
                  new Path(["/."], []),
                  operators.add("/", nixScope.tryOnce["value"]),
                ),
            );
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'assertMsg (\n      originalValid -> tryOnce.success\n    ) "Even though string \\"${str}\\" is valid as a subpath, the normalisation for it failed"',
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'assertMsg (\n      !originalValid -> !tryOnce.success\n    ) "Even though string \\"${str}\\" is invalid as a subpath, the normalisation for it succeeded"',
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " +
                        'assertMsg (\n      originalValid -> tryTwice.success\n    ) "For valid subpath \\"${str}\\", the normalisation \\"${tryOnce.value}\\" was not a valid subpath"',
                    );
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          'assertMsg (originalValid -> tryOnce.value == tryTwice.value)\n      "For valid subpath \\"${str}\\", normalising it once gives \\"${tryOnce.value}\\" but normalising it twice gives a different result: \\"${tryTwice.value}\\""',
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " +
                            'assertMsg (originalValid -> absConcatOrig == absConcatNormalised)\n      "For valid subpath \\"${str}\\", appending to an absolute Nix path value gives \\"${absConcatOrig}\\", but appending the normalised result \\"${tryOnce.value}\\" gives a different value \\"${absConcatNormalised}\\""',
                        );
                      }
                      return (operators.ifThenElse(
                        nixScope.tryOnce["success"],
                        () => (nixScope.tryOnce["value"]),
                        () => (""),
                      ));
                    })(
                      nixScope.assertMsg(
                        operators.implication(
                          nixScope.originalValid,
                          operators.equal(
                            nixScope.absConcatOrig,
                            nixScope.absConcatNormalised,
                          ),
                        ),
                      )(
                        new InterpolatedString([
                          "For valid subpath ",
                          ", appending to an absolute Nix path value gives ",
                          ", but appending the normalised result ",
                          " gives a different value ",
                          "",
                        ], [
                          () => (nixScope.str),
                          () => (nixScope.absConcatOrig),
                          () => (nixScope.tryOnce["value"]),
                          () => (nixScope.absConcatNormalised),
                        ]),
                      ),
                    );
                  })(
                    nixScope.assertMsg(
                      operators.implication(
                        nixScope.originalValid,
                        operators.equal(
                          nixScope.tryOnce["value"],
                          nixScope.tryTwice["value"],
                        ),
                      ),
                    )(
                      new InterpolatedString([
                        "For valid subpath ",
                        ", normalising it once gives ",
                        " but normalising it twice gives a different result: ",
                        "",
                      ], [
                        () => (nixScope.str),
                        () => (nixScope.tryOnce["value"]),
                        () => (nixScope.tryTwice["value"]),
                      ]),
                    ),
                  );
                })(
                  nixScope.assertMsg(
                    operators.implication(
                      nixScope.originalValid,
                      nixScope.tryTwice["success"],
                    ),
                  )(
                    new InterpolatedString([
                      "For valid subpath ",
                      ", the normalisation ",
                      " was not a valid subpath",
                    ], [
                      () => (nixScope.str),
                      () => (nixScope.tryOnce["value"]),
                    ]),
                  ),
                );
              })(
                nixScope.assertMsg(
                  operators.implication(
                    operators.negate(nixScope.originalValid),
                    operators.negate(nixScope.tryOnce["success"]),
                  ),
                )(
                  new InterpolatedString([
                    "Even though string ",
                    " is invalid as a subpath, the normalisation for it succeeded",
                  ], [() => (nixScope.str)]),
                ),
              );
            })(
              nixScope.assertMsg(
                operators.implication(
                  nixScope.originalValid,
                  nixScope.tryOnce["success"],
                ),
              )(
                new InterpolatedString([
                  "Even though string ",
                  " is valid as a subpath, the normalisation for it failed",
                ], [() => (nixScope.str)]),
              ),
            );
          })
        )),
    );
    return nixScope.lib["genAttrs"](nixScope.strings)(
      nixScope.normaliseAndCheck,
    );
  })
));
