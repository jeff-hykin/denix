export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      obj["options"] = {
        "fun": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["functionTo"](
              nixScope.types["attrsOf"](nixScope.types["str"]),
            ),
          },
        ),
        "result": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["str"],
            "default": nixScope.toString(
              nixScope.lib["attrValues"](
                nixScope.config["fun"]({ "a": "a", "b": "b", "c": "c" }),
              ),
            ),
          },
        ),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["fun"] = nixScope.lib["mkMerge"]([
        createFunc(/*arg:*/ "input", null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj["a"] = nixScope.input["a"];
            return obj;
          })
        )),
        createFunc(/*arg:*/ "input", null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj["b"] = nixScope.input["b"];
            return obj;
          })
        )),
        createFunc(/*arg:*/ "input", null, {}, (nixScope) => (
          { "b": nixScope.lib["mkForce"](nixScope.input["c"]) }
        )),
      ]);
      return obj;
    });
  })
));
