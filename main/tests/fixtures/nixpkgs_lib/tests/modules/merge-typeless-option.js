export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "typeless",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["group"] = nixScope.lib["mkOption"]({});
            return obj;
          })
        )),
    );
    defGetter(
      nixScope,
      "childOfTypeless",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            if (obj["options"]["group"] === undefined) {
              obj["options"]["group"] = {};
            }
            obj["options"]["group"]["enable"] = nixScope.lib["mkEnableOption"](
              "nothing",
            );
            return obj;
          })
        )),
    );
    return createScope((nixScope) => {
      const obj = {};
      obj.imports = [nixScope.typeless, nixScope.childOfTypeless];
      if (obj["config"] === undefined) obj["config"] = {};
      if (obj["config"]["group"] === undefined) obj["config"]["group"] = {};
      obj["config"]["group"]["enable"] = false;
      return obj;
    });
  })
));
