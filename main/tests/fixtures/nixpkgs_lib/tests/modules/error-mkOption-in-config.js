export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    return createScope((nixScope) => {
      const obj = {};
      obj["wrong1"] = nixScope.mkOption({});
      if (obj["nest"] === undefined) obj["nest"] = {};
      obj["nest"]["wrong2"] = nixScope.mkOption({});
      return obj;
    });
  })
));
