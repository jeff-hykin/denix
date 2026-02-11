export default //
createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "splitVersion", {
      enumerable: true,
      get() {
        return nixScope.builtins["splitVersion"];
      },
    });
    Object.defineProperty(nixScope, "major", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(0n)
        ));
      },
    });
    Object.defineProperty(nixScope, "minor", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(1n)
        ));
      },
    });
    Object.defineProperty(nixScope, "patch", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(2n)
        ));
      },
    });
    Object.defineProperty(nixScope, "majorMinor", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["concatStringsSep"](".")(
            nixScope.lib["take"](2n)(nixScope.splitVersion(nixScope.v)),
          )
        ));
      },
    });
    Object.defineProperty(nixScope, "pad", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "version", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "numericVersion", {
                enumerable: true,
                get() {
                  return nixScope.lib["head"](
                    nixScope.lib["splitString"]("-")(nixScope.version),
                  );
                },
              });
              Object.defineProperty(nixScope, "versionSuffix", {
                enumerable: true,
                get() {
                  return nixScope.lib["removePrefix"](nixScope.numericVersion)(
                    nixScope.version,
                  );
                },
              });
              return operators.add(
                nixScope.lib["concatStringsSep"](".")(
                  nixScope.lib["take"](nixScope.n)(
                    operators.listConcat(
                      nixScope.lib["splitVersion"](nixScope.numericVersion),
                      nixScope.lib["genList"](
                        createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                          "0"
                        )),
                      )(nixScope.n),
                    ),
                  ),
                ),
                nixScope.versionSuffix,
              );
            })
          ))
        ));
      },
    });
    return nixScope;
  })
));
