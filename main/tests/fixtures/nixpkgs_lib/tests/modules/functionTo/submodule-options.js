export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      obj["imports"] = [
        createFunc({}, null, {}, (nixScope) => (
          {
            "options":
              ({
                "fun": nixScope.lib["mkOption"](
                  {
                    "type": nixScope.types["functionTo"](
                      nixScope.types["submodule"](createScope((nixScope) => {
                        const obj = {};
                        if (obj["options"] === undefined) obj["options"] = {};
                        obj["options"]["a"] = nixScope.lib["mkOption"](
                          { "default": "a" },
                        );
                        return obj;
                      })),
                    ),
                  },
                ),
              }),
          }
        )),
        createFunc({}, null, {}, (nixScope) => (
          {
            "options":
              ({
                "fun": nixScope.lib["mkOption"](
                  {
                    "type": nixScope.types["functionTo"](
                      nixScope.types["submodule"](createScope((nixScope) => {
                        const obj = {};
                        if (obj["options"] === undefined) obj["options"] = {};
                        obj["options"]["b"] = nixScope.lib["mkOption"](
                          { "default": "b" },
                        );
                        return obj;
                      })),
                    ),
                  },
                ),
              }),
          }
        )),
      ];
      obj["options"] = {
        "result": nixScope.lib["mkOption"]({
          "type": nixScope.types["str"],
          "default": nixScope.lib["concatStringsSep"](" ")(
            nixScope.lib["attrValues"](
              nixScope.config["fun"](
                nixScope.throw("shouldn't use input param"),
              ),
            ),
          ),
        }),
        "optionsResult": nixScope.lib["mkOption"]({
          "type": nixScope.types["str"],
          "default": nixScope.lib["concatStringsSep"](" ")(
            nixScope.lib["concatLists"](
              nixScope.lib["mapAttrsToList"](
                createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.equal(nixScope.k, "_module"),
                      () => [],
                      () => [nixScope.lib["showOption"](nixScope.v["loc"])],
                    )
                  ))
                )),
              )(nixScope.options["fun"]["type"]["getSubOptions"](["fun"])),
            ),
          ),
        }),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["fun"] = nixScope.lib["mkMerge"]([
        createFunc(/*arg:*/ "input", null, {}, (nixScope) => (
          { "b": "bee" }
        )),
      ]);
      return obj;
    });
  })
));
