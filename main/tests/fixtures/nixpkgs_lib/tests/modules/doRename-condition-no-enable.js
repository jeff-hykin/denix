export default createFunc({}, null, {}, (nixScope) => (
  {
    "config": ({
      "result": ((_cond) => {
        if (!_cond) {
          throw new Error("assertion failed: " + "config.services.foos == { }");
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " + "!options.services.foo.bar.isDefined",
            );
          }
          return true;
        })(
          operators.negate(
            nixScope.options["services"]["foo"]["bar"]["isDefined"],
          ),
        );
      })(operators.equal(nixScope.config["services"]["foos"], {})),
    }),
  }
));
