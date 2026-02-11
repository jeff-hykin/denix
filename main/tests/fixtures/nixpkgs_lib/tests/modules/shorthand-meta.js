export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    return ({
      "imports": [
        createFunc({}, null, {}, (nixScope) => (
          {
            "options": createScope((nixScope) => {
              const obj = {};
              obj.result = nixScope.mkOption(
                {
                  "default": nixScope.lib["concatStringsSep"](" ")(
                    nixScope.config["meta"]["foo"],
                  ),
                },
              );
              if (obj["meta"] === undefined) obj["meta"] = {};
              obj["meta"]["foo"] = nixScope.mkOption(
                { "type": nixScope.types["listOf"](nixScope.types["str"]) },
              );
              return obj;
            }),
          }
        )),
        createScope((nixScope) => {
          const obj = {};
          if (obj["meta"] === undefined) obj["meta"] = {};
          obj["meta"]["foo"] = ["one", "two"];
          return obj;
        }),
      ],
    });
  })
));
