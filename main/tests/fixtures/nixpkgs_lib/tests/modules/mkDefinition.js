export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.mkDefinition = nixScope.lib["mkDefinition"];
    nixScope.mkOptionDefault = nixScope.lib["mkOptionDefault"];
    return ({
      "imports": [
        createScope((nixScope) => {
          const obj = {};
          obj._file = "file";
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["conflict"] = nixScope.mkOption({ "default": 1n });
          if (obj["config"] === undefined) obj["config"] = {};
          obj["config"]["conflict"] = nixScope.mkDefinition(
            { "file": "other", "value": nixScope.mkOptionDefault(42n) },
          );
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["viaConfig"] = nixScope.mkOption({});
          if (obj["config"] === undefined) obj["config"] = {};
          obj["config"]["viaConfig"] = nixScope.mkDefinition(
            { "file": "other", "value": true },
          );
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["mkMerge"] = nixScope.mkOption(
            { "type": nixScope.lib["types"]["bool"] },
          );
          if (obj["config"] === undefined) obj["config"] = {};
          obj["config"]["mkMerge"] = nixScope.lib["mkMerge"]([
            nixScope.mkDefinition({ "file": "a.nix", "value": true }),
            nixScope.mkDefinition({ "file": "b.nix", "value": true }),
          ]);
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["mkForce"] = nixScope.mkOption(
            { "type": nixScope.lib["types"]["bool"], "default": false },
          );
          if (obj["config"] === undefined) obj["config"] = {};
          obj["config"]["mkForce"] = nixScope.mkDefinition(
            { "file": "other", "value": nixScope.lib["mkForce"](true) },
          );
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["viaOptionDefault"] = nixScope.mkOption(
            {
              "type": nixScope.lib["types"]["bool"],
              "default": nixScope.mkDefinition(
                { "file": "other", "value": true },
              ),
            },
          );
          return obj;
        }),
      ],
    });
  })
));
