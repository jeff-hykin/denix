export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    return ({
      "imports": [
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedName"] = nixScope.mkOption(
              {
                "default": {},
                "type": nixScope.types["attrsWith"](
                  {
                    "placeholder": "id",
                    "elemType": nixScope.types["submodule"](
                      createScope((nixScope) => {
                        const obj = {};
                        if (obj["options"] === undefined) obj["options"] = {};
                        obj["options"]["nested"] = nixScope.mkOption(
                          { "type": nixScope.types["int"], "default": 1n },
                        );
                        return obj;
                      }),
                    ),
                  },
                ),
              },
            );
            return obj;
          })
        )),
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedName"] = nixScope.mkOption(
              {
                "type": nixScope.types["attrsWith"](
                  {
                    "placeholder": "other",
                    "elemType": nixScope.types["submodule"]({}),
                  },
                ),
              },
            );
            return obj;
          })
        )),
      ],
    });
  })
));
