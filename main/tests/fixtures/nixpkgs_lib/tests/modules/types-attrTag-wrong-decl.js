export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    return ({
      "options":
        ({
          "opt": nixScope.mkOption(
            {
              "type": nixScope.types["attrTag"](
                { "int": nixScope.types["int"] },
              ),
              "default": ({ "int": 1n }),
            },
          ),
        }),
    });
  })
));
