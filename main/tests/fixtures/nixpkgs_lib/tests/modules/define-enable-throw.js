export default createScope((nixScope) => {
  const obj = {};
  if (obj["config"] === undefined) obj["config"] = {};
  obj["config"]["enable"] = nixScope.throw("oops");
  return obj;
});
