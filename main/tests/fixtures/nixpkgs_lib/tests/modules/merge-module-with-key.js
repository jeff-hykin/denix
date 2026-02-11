export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    nixScope.moduleWithoutKey = { "config": ({ "raw": "pear" }) };
    defGetter(
      nixScope,
      "moduleWithKey",
      (nixScope) => ({
        "key": operators.add(nixScope.__curPos["file"], "#moduleWithKey"),
        "config": ({ "raw": "pear" }),
      }),
    );
    defGetter(
      nixScope,
      "decl",
      (nixScope) => ({
        "options":
          ({ "raw": nixScope.mkOption({ "type": nixScope.types["lines"] }) }),
      }),
    );
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
