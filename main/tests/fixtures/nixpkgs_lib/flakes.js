export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "callLocklessFlake",
      (nixScope) =>
        createFunc({ "inputs": (nixScope) => ({}) }, null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "self", (nixScope) =>
              operators.merge(
                { "outPath": nixScope.path },
                (nixScope.import(operators.add(nixScope.path, "/flake.nix")))
                  ["outputs"](
                    operators.merge(nixScope.inputs, { "self": nixScope.self }),
                  ),
              ));
            return nixScope.self;
          })
        )),
    );
    return nixScope;
  })
));
