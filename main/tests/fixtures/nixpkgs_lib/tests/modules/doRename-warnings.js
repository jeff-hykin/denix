export default createFunc({}, null, {}, (nixScope) => (
  {
    "imports": [
      nixScope.lib["doRename"](
        {
          "from": ["a", "b"],
          "to": ["c", "d", "e"],
          "warn": true,
          "use": createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          )),
          "visible": true,
        },
      ),
    ],
    "options": createScope((nixScope) => {
      const obj = {};
      obj.warnings = nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["listOf"](nixScope.lib["types"]["str"]),
        },
      );
      obj.result = nixScope.lib["mkOption"]({});
      if (obj["c"] === undefined) obj["c"] = {};
      if (obj["c"]["d"] === undefined) obj["c"]["d"] = {};
      obj["c"]["d"]["e"] = nixScope.lib["mkOption"]({});
      return obj;
    }),
    "config": createScope((nixScope) => {
      const obj = {};
      obj.result = nixScope.lib["concatStringsSep"]("%")(
        nixScope.config["warnings"],
      );
      if (obj["a"] === undefined) obj["a"] = {};
      obj["a"]["b"] = 1234n;
      return obj;
    }),
  }
));
