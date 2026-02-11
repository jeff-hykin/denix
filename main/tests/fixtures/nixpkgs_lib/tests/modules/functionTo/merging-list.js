export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      obj.options = {
        "fun": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["functionTo"](
              nixScope.types["listOf"](nixScope.types["str"]),
            ),
          },
        ),
        "result": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["str"],
            "default": nixScope.toString(
              nixScope.config["fun"]({ "a": "a", "b": "b", "c": "c" }),
            ),
          },
        ),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["fun"] = nixScope.lib["mkMerge"]([
        createFunc(
          /*arg:*/ "input",
          null,
          {},
          (nixScope) => [nixScope.input["a"]],
        ),
        createFunc(
          /*arg:*/ "input",
          null,
          {},
          (nixScope) => [nixScope.input["b"]],
        ),
      ]);
      return obj;
    });
  })
));
