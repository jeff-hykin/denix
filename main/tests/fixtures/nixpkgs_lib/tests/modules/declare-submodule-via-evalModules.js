export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope.lib["mkOption"](
      createScope((nixScope) => {
        const obj = {};
        obj.type =
          nixScope.lib["evalModules"]({
            "modules": [createScope((nixScope) => {
              const obj = {};
              if (obj["options"] === undefined) obj["options"] = {};
              obj["options"]["inner"] = nixScope.lib["mkOption"](
                { "type": nixScope.lib["types"]["bool"], "default": false },
              );
              return obj;
            })],
          }).type;
        obj.default = {};
        return obj;
      }),
    );
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["submodule"] = nixScope.lib["mkMerge"]([
      createFunc({}, null, {}, (nixScope) => (
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["outer"] = nixScope.lib["mkOption"](
            { "type": nixScope.lib["types"]["bool"], "default": false },
          );
          return obj;
        })
      )),
      { "inner": true, "outer": true },
    ]);
    return obj;
  })
));
