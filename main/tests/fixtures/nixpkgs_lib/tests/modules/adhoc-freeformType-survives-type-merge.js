export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj.freeformType = /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "a",
        (nixScope) =>
          nixScope.lib["types"]["attrsOf"](
            nixScope.lib["types"]["submodule"](createScope((nixScope) => {
              const obj = {};
              if (obj["options"] === undefined) obj["options"] = {};
              obj["options"]["bar"] = nixScope.lib["mkOption"]({});
              return obj;
            })),
          ),
      );
      return operators.merge(
        nixScope.a,
        {
          "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              {
                "freeformItems": nixScope.a["merge"](nixScope.loc)(
                  nixScope.defs,
                ),
              }
            ))
          )),
        },
      );
    });
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["dummy"] = nixScope.lib["mkOption"](
      { "type": nixScope.lib["types"]["anything"], "default": {} },
    );
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["foo"] === undefined) obj["config"]["foo"] = {};
    obj["config"]["foo"]["bar"] = "ok";
    return obj;
  })
));
