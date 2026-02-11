export default createFunc(
  { "a": (nixScope) => (false) },
  null,
  {},
  (nixScope) => (
    {
      "options": ({ "result": nixScope.lib["mkOption"]({}) }),
      "config": createScope((nixScope) => {
        const obj = {};
        obj.result = nixScope.a;
        if (obj["_module"] === undefined) obj["_module"] = {};
        if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
        obj["_module"]["args"]["a"] = true;
        return obj;
      }),
    }
  ),
);
