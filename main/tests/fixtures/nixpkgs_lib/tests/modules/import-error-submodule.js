export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "myconf",
      (nixScope) => nixScope.lib["evalModules"]({ "modules": [{}] }),
    );
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["foo"] = nixScope.lib["mkOption"](
        { "type": nixScope.lib["types"]["submodule"]({}), "default": {} },
      );
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["foo"] = createFunc({}, null, {}, (nixScope) => (
        { "imports": [nixScope.myconf] }
      ));
      return obj;
    });
  })
));
