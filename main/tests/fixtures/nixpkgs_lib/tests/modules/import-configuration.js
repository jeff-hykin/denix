export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "myconf",
      (nixScope) => nixScope.lib["evalModules"]({ "modules": [{}] }),
    );
    return ({ "imports": [nixScope.myconf] });
  })
));
