export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope.lib["mkOption"](
      {
        "type": nixScope.lib["types"]["submoduleWith"](
          createScope((nixScope) => {
            const obj = {};
            obj["modules"] = [createFunc({}, null, {}, (nixScope) => (
              createScope((nixScope) => {
                const obj = {};
                if (obj["options"] === undefined) obj["options"] = {};
                obj["options"]["foo"] = nixScope.lib["mkOption"](
                  { "default": nixScope.lib["foo"] },
                );
                return obj;
              })
            ))];
            if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
            obj["specialArgs"]["lib"] = operators.merge(
              nixScope.lib,
              { "foo": "foo" },
            );
            return obj;
          }),
        ),
        "default": {},
      },
    );
    return obj;
  })
));
