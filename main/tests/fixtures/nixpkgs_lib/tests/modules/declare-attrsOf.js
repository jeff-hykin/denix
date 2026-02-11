export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "deathtrapArgs",
      (nixScope) =>
        nixScope.lib["mapAttrs"](
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
        )(nixScope.lib["functionArgs"](nixScope.lib["mkOption"])),
    );
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["value"] = nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["attrsOf"](
            nixScope.lib["types"]["str"],
          ),
          "default": {},
        },
      );
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["testing-laziness-so-don't-read-me"] = nixScope.lib
        ["mkOption"](nixScope.deathtrapArgs);
      return obj;
    });
  })
));
