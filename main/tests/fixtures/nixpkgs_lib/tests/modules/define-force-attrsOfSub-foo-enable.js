export default createFunc({}, null, {}, (nixScope) => (
  nixScope.lib["mkForce"](createScope((nixScope) => {
    const obj = {};
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
    obj["attrsOfSub"]["foo"]["enable"] = false;
    return obj;
  }))
));
