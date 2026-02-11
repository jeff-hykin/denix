export default createScope((nixScope) => {
  const obj = {};
  if (obj["submodule"] === undefined) obj["submodule"] = {};
  if (obj["submodule"]["config"] === undefined) obj["submodule"]["config"] = {};
  obj["submodule"]["config"]["config"] = true;
  return obj;
});
