export default createFunc({}, null, {}, (nixScope) => (
  {
    "attrsOfSub": nixScope.lib["mkIf"](nixScope.config["enable"])(
      createScope((nixScope) => {
        const obj = {};
        if (obj["foo"] === undefined) obj["foo"] = {};
        obj["foo"]["enable"] = true;
        return obj;
      }),
    ),
  }
));
