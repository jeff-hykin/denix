export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.sub = {};
    nixScope.sub["options"]["config"] = nixScope.lib["mkOption"](
      { "type": nixScope.lib["types"]["bool"], "default": false },
    );
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["submodule"] = nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["submoduleWith"](
            { "modules": [nixScope.sub] },
          ),
          "default": {},
        },
      );
      return obj;
    });
  })
));
