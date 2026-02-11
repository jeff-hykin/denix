export default createFunc(
  {
    "lib": (nixScope) => (nixScope.import(new Path(["../.."], []))),
    "modules": (nixScope) => [],
  },
  null,
  {},
  (nixScope) => (
    createScope((nixScope) => {
      const obj = {};
      obj["config"] = nixScope.lib["evalModules"](createScope((nixScope) => {
        const obj = {};
        obj["modules"] = nixScope.modules;
        if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
        obj["specialArgs"]["modulesPath"] = new Path(["./."], []);
        return obj;
      }))["config"];
      obj["options"] = nixScope.lib["evalModules"](createScope((nixScope) => {
        const obj = {};
        obj["modules"] = nixScope.modules;
        if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
        obj["specialArgs"]["modulesPath"] = new Path(["./."], []);
        return obj;
      }))["options"];
      return obj;
    })
  ),
);
