export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.mkOverride = nixScope.lib["mkOverride"];
    nixScope.types = nixScope.lib["types"];
    return ({
      "imports": [
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["sub"] = nixScope.mkOption(
            {
              "default": {},
              "type": nixScope.types["submodule"](
                createFunc({}, null, {}, (nixScope) => (
                  createScope((nixScope) => {
                    const obj = {};
                    if (obj["options"] === undefined) obj["options"] = {};
                    obj["options"]["value"] = nixScope.mkOption(
                      { "type": nixScope.types["int"] },
                    );
                    if (obj["options"] === undefined) {
                      obj["options"] = {};
                    }
                    obj["options"]["specialisation"] = nixScope.mkOption(
                      createScope((nixScope) => {
                        const obj = {};
                        obj.default = {};
                        obj.type =
                          nixScope.extendModules(
                            {
                              "modules": [
                                {
                                  "specialisation": nixScope.mkOverride(0n)({}),
                                },
                              ],
                            },
                          ).type;
                        return obj;
                      }),
                    );
                    return obj;
                  })
                )),
              ),
            },
          );
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["config"] === undefined) obj["config"] = {};
          if (obj["config"]["sub"] === undefined) obj["config"]["sub"] = {};
          obj["config"]["sub"]["value"] = 1n;
          return obj;
        }),
      ],
    });
  })
));
