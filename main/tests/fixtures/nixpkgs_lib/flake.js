export default ({
  "description": "Library of low-level helper functions for nix expressions.",
  "outputs": createFunc({}, null, {}, (nixScope) => (
    /*let*/ createScope((nixScope) => {
      Object.defineProperty(nixScope, "lib0", {
        enumerable: true,
        get() {
          return nixScope.import(new Path(["./."], []));
        },
      });
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
