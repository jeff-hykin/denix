export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    nixScope.moduleWithoutKey = { "config": ({ "raw": "pear" }) };
    Object.defineProperty(nixScope, "moduleWithKey", {
      enumerable: true,
      get() {
        return ({
          "key": operators.add(nixScope.__curPos["file"], "#moduleWithKey"),
          "config": ({ "raw": "pear" }),
        });
      },
    });
    Object.defineProperty(nixScope, "decl", {
      enumerable: true,
      get() {
        return ({
          "options":
            ({ "raw": nixScope.mkOption({ "type": nixScope.types["lines"] }) }),
        });
      },
    });
    return ({
      "options": ({
        "once": nixScope.mkOption(
          {
            "type": nixScope.types["submodule"](
              {
                "imports": [
                  nixScope.decl,
                  nixScope.moduleWithKey,
                  nixScope.moduleWithKey,
                ],
              },
            ),
            "default": {},
          },
        ),
        "twice": nixScope.mkOption(
          {
            "type": nixScope.types["submodule"](
              {
                "imports": [
                  nixScope.decl,
                  nixScope.moduleWithoutKey,
                  nixScope.moduleWithoutKey,
                ],
              },
            ),
            "default": {},
          },
        ),
      }),
    });
  })
));
