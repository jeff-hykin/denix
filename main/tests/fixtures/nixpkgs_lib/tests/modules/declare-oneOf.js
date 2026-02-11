export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope.lib["mkOption"]({
      "type": nixScope.lib["types"]["oneOf"]([
        nixScope.lib["types"]["int"],
        nixScope.lib["types"]["listOf"](nixScope.lib["types"]["int"]),
        nixScope.lib["types"]["str"],
      ]),
    });
    return obj;
  })
));
