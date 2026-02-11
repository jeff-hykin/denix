export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "nixosModule", {
      enumerable: true,
      get() {
        return createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["foo"] = nixScope.lib["mkOption"](
              { "default": "bar" },
            );
            return obj;
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "darwinModule", {
      enumerable: true,
      get() {
        return createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["bar"] = nixScope.lib["mkOption"](
              { "default": "foo" },
            );
            return obj;
          })
        ));
      },
    });
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
