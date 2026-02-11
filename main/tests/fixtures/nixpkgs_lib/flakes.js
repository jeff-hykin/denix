export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "callLocklessFlake", {
      enumerable: true,
      get() {
        return createFunc(
          { "inputs": (nixScope) => ({}) },
          null,
          {},
          (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "self", {
                enumerable: true,
                get() {
                  return operators.merge(
                    { "outPath": nixScope.path },
                    (nixScope.import(
                      operators.add(nixScope.path, "/flake.nix"),
                    ))["outputs"](
                      operators.merge(
                        nixScope.inputs,
                        { "self": nixScope.self },
                      ),
                    ),
                  );
                },
              });
              return nixScope.self;
            })
          ),
        );
      },
    });
    return nixScope;
  })
));
