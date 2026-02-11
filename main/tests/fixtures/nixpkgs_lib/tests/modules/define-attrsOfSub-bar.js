export default createScope((nixScope) => {
  const obj = {};
  if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
  obj["attrsOfSub"]["bar"] = {};
  return obj;
});
