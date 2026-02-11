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
            "default": nixScope.config["fun"]("input"),
          },
        ),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["fun"] = createFunc(
        /*arg:*/ "input",
        null,
        {},
        (nixScope) => (
          new InterpolatedString(["input is ", ""], [() => (nixScope.input)])
        ),
      );
      return obj;
    });
  })
));
