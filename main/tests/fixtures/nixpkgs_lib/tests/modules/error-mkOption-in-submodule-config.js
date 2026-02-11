export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["sub"] = nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["submodule"](
            { "wrong2": nixScope.mkOption({}) },
          ),
          "default": {},
        },
      );
      return obj;
    });
  })
));
