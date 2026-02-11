export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj.options = {
      "result": nixScope.lib["mkOption"]({}),
      "weird": nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["submoduleWith"](
            createScope((nixScope) => {
              const obj = {};
              obj.modules = [];
              if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
              obj["specialArgs"]["lib"] = {};
              return obj;
            }),
          ),
        },
      ),
    };
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["weird"] = createFunc(
      /*arg:*/ "args",
      null,
      {},
      (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + "args.lib == { }");
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " + "args.specialArgs == { lib = { }",
              );
            }
            return createScope((nixScope) => {
              const obj = {};
              if (obj["options"] === undefined) obj["options"] = {};
              obj["options"]["foo"] = nixScope.lib["mkOption"]({});
              if (obj["config"] === undefined) obj["config"] = {};
              obj["config"]["foo"] = nixScope.lib["mkIf"](true)("alright");
              return obj;
            });
          })(operators.equal(nixScope.args["specialArgs"], { "lib": {} }));
        })(operators.equal(nixScope.args["lib"], {}))
      ),
    );
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["result"] = ((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + 'config.weird.foo == "alright"');
      }
      return "ok";
    })(operators.equal(nixScope.config["weird"]["foo"], "alright"));
    return obj;
  })
));
