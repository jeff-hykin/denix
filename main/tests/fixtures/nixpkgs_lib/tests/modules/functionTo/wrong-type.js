export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      obj.options = {
        "fun": nixScope.lib["mkOption"](
          { "type": nixScope.types["functionTo"](nixScope.types["str"]) },
        ),
        "result": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["str"],
            "default": nixScope.config["fun"](0n),
          },
        ),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["fun"] = createFunc(
        /*arg:*/ "input",
        null,
        {},
        (nixScope) => (
          operators.add(nixScope.input, 1n)
        ),
      );
      return obj;
    });
  })
));
