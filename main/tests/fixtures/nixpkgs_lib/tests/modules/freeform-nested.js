export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "deathtrapArgs", {
      enumerable: true,
      get() {
        return nixScope.lib["mapAttrs"](
          createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
              nixScope.throw(
                new InterpolatedString([
                  "The module system is too strict, accessing an unused option's ",
                  " mkOption-attribute.",
                ], [() => (nixScope.k)]),
              )
            ))
          )),
        )(nixScope.lib["functionArgs"](nixScope.lib["mkOption"]));
      },
    });
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      if (obj["options"]["nest"] === undefined) obj["options"]["nest"] = {};
      obj["options"]["nest"]["foo"] = nixScope.lib["mkOption"](
        { "type": nixScope.lib["types"]["bool"], "default": false },
      );
      if (obj["options"] === undefined) obj["options"] = {};
      if (obj["options"]["nest"] === undefined) obj["options"]["nest"] = {};
      obj["options"]["nest"]["unused"] = nixScope.lib["mkOption"](
        nixScope.deathtrapArgs,
      );
      if (obj["config"] === undefined) obj["config"] = {};
      if (obj["config"]["nest"] === undefined) obj["config"]["nest"] = {};
      obj["config"]["nest"]["bar"] = "bar";
      return obj;
    });
  })
));
