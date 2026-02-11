export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    Object.defineProperty(nixScope, "moduleWithKey", {
      enumerable: true,
      get() {
        return createFunc({}, null, {}, (nixScope) => (
          { "config": ({ "enable": true }) }
        ));
      },
    });
    return ({
      "imports": [new Path(["./declare-enable.nix"], [])],
      "disabledModules": [{}],
    });
  })
));
