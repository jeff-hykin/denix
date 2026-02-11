export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      if (obj["options"]["bare-submodule"] === undefined) {
        obj["options"]["bare-submodule"] = {};
      }
      obj["options"]["bare-submodule"]["deep"] = nixScope.mkOption(
        { "type": nixScope.types["int"], "default": 2n },
      );
      return obj;
    });
  })
));
