export default createScope((nixScope) => {
  const obj = {};
  if (obj["_module"] === undefined) obj["_module"] = {};
  obj["_module"]["check"] = false;
  return obj;
});
