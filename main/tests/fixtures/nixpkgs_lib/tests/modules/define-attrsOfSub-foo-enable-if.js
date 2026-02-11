export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
    obj["attrsOfSub"]["foo"]["enable"] = nixScope.lib["mkIf"](
      nixScope.config["enable"],
    )(true);
    return obj;
  })
));
