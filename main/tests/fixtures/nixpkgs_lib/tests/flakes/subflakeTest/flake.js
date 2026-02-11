export default ({
  "outputs": createFunc({}, null, {}, (nixScope) => (
    /*rec*/ createScope((nixScope) => {
      defGetter(nixScope, "x", (nixScope) =>
        (nixScope.callLocklessFlake(
          { "path": nixScope.subflake, "inputs": {} },
        ))["subflakeOutput"]);
      return nixScope;
    })
  )),
});
