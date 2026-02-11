export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["variants"] = nixScope.mkOption(
        {
          "type": nixScope.types["lazyAttrsOf"](nixScope.moduleType),
          "default": {},
        },
      );
      return obj;
    });
  })
));
