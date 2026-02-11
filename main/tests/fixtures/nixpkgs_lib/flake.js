export default ({
  "description": "Library of low-level helper functions for nix expressions.",
  "outputs": createFunc({}, null, {}, (nixScope) => (
    /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "lib0",
        (nixScope) => nixScope.import(new Path(["./."], [])),
      );
      return ({
        "lib": nixScope.lib0["extend"](
          nixScope.import(new Path(["./flake-version-info.nix"], []))(
            nixScope.self,
          ),
        ),
      });
    })
  )),
});
