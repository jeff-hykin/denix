export default //
createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "splitVersion",
      (nixScope) => nixScope.builtins["splitVersion"],
    );
    defGetter(
      nixScope,
      "major",
      (nixScope) =>
        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(0n)
        )),
    );
    defGetter(
      nixScope,
      "minor",
      (nixScope) =>
        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(1n)
        )),
    );
    defGetter(
      nixScope,
      "patch",
      (nixScope) =>
        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["elemAt"](nixScope.splitVersion(nixScope.v))(2n)
        )),
    );
    defGetter(
      nixScope,
      "majorMinor",
      (nixScope) =>
        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
          nixScope.builtins["concatStringsSep"](".")(
            nixScope.lib["take"](2n)(nixScope.splitVersion(nixScope.v)),
          )
        )),
    );
    defGetter(
      nixScope,
      "pad",
      (nixScope) =>
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "version", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "numericVersion", (nixScope) =>
                nixScope.lib["head"](
                  nixScope.lib["splitString"]("-")(nixScope.version),
                ));
              defGetter(nixScope, "versionSuffix", (nixScope) =>
                nixScope.lib["removePrefix"](nixScope.numericVersion)(
                  nixScope.version,
                ));
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
        )),
    );
    return nixScope;
  })
));
