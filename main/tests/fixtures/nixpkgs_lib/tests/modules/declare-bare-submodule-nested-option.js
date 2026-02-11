export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["bare-submodule"] = nixScope.mkOption(
        {
          "type": nixScope.types["submoduleWith"](
            {
              "shorthandOnlyDefinesConfig":
                nixScope.config["shorthandOnlyDefinesConfig"],
              "modules": [createScope((nixScope) => {
                const obj = {};
                if (obj["options"] === undefined) obj["options"] = {};
                obj["options"]["nested"] = nixScope.mkOption(
                  { "type": nixScope.types["int"], "default": 1n },
                );
                return obj;
              })],
            },
          ),
        },
      );
      return obj;
    });
  })
));
