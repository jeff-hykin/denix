export default ({
  "outputs": createFunc({}, null, {}, (nixScope) => (
    /*rec*/ createScope((nixScope) => {
      Object.defineProperty(nixScope, "x", {
        enumerable: true,
        get() {
          return (nixScope.callLocklessFlake(
            { "path": nixScope.subflake, "inputs": {} },
          ))["subflakeOutput"];
        },
      });
      return nixScope;
    })
  )),
});
