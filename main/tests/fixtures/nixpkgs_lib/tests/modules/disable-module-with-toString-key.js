export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    Object.defineProperty(nixScope, "moduleWithKey", {
      enumerable: true,
      get() {
        return ({ "key": 123n, "config": ({ "enable": true }) });
      },
    });
    return ({
      "options": ({
        "positive": nixScope.mkOption(
          {
            "type": nixScope.types["submodule"](
              {
                "imports": [
                  new Path(["./declare-enable.nix"], []),
                  nixScope.moduleWithKey,
                ],
              },
            ),
            "default": {},
          },
        ),
        "negative": nixScope.mkOption(
          {
            "type": nixScope.types["submodule"](
              {
                "imports": [
                  new Path(["./declare-enable.nix"], []),
                  nixScope.moduleWithKey,
                ],
                "disabledModules": [123n],
              },
            ),
            "default": {},
          },
        ),
      }),
    });
  })
));
