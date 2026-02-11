export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "myconf", {
      enumerable: true,
      get() {
        return nixScope.lib["evalModules"]({ "modules": [{}] });
      },
    });
    return ({ "imports": [nixScope.myconf] });
  })
));
