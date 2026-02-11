export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["isLazy"] = nixScope.lib["mkOption"](
      {
        "default": operators.negate(
          operators.hasAttr(nixScope.config["value"], "foo"),
        ),
      },
    );
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["value"] === undefined) obj["config"]["value"] = {};
    obj["config"]["value"]["bar"] = nixScope.throw("is not lazy");
    return obj;
  })
));
