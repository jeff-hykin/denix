export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "foo", {
      enumerable: true,
      get() {
        return nixScope.lib["mkOptionType"](
          {
            "name": "foo",
            "functor": operators.merge(
              nixScope.lib["types"]["defaultFunctor"]("foo"),
              { "wrapped": nixScope.lib["types"]["int"], "payload": 10n },
            ),
          },
        );
      },
    });
    return createScope((nixScope) => {
      const obj = {};
      obj["imports"] = [
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["foo"] = nixScope.lib["mkOption"](
            { "type": nixScope.foo },
          );
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["options"] === undefined) obj["options"] = {};
          obj["options"]["foo"] = nixScope.lib["mkOption"](
            { "type": nixScope.foo },
          );
          return obj;
        }),
      ];
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["result"] = nixScope.lib["mkOption"](
        { "default": nixScope.builtins["seq"](nixScope.options["foo"])(null) },
      );
      return obj;
    });
  })
));
