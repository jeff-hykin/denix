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
              "modules": [],
              "shorthandOnlyDefinesConfig":
                nixScope.config["shorthandOnlyDefinesConfig"],
            },
          ),
          "default": {},
        },
      );
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["shorthandOnlyDefinesConfig"] = nixScope.mkOption(
        { "default": false },
      );
      return obj;
    });
  })
));
