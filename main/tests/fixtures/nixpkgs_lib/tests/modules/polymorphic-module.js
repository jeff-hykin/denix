export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "nixosModule",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["foo"] = nixScope.lib["mkOption"](
              { "default": "bar" },
            );
            return obj;
          })
        )),
    );
    defGetter(
      nixScope,
      "darwinModule",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["bar"] = nixScope.lib["mkOption"](
              { "default": "foo" },
            );
            return obj;
          })
        )),
    );
    return ({
      "imports": [
        nixScope.lib["optionalAttrs"](
          operators.equal(nixScope._class, "nixos"),
        )(nixScope.nixosModule),
        nixScope.lib["optionalAttrs"](
          operators.equal(nixScope._class, "darwin"),
        )(nixScope.darwinModule),
      ],
    });
  })
));
