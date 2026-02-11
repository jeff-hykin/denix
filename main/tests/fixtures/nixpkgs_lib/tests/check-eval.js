export default //
/*let*/ createScope((nixScope) => {
  nixScope.tests = ["misc", "systems"];
  defGetter(
    nixScope,
    "all",
    (nixScope) =>
      nixScope.builtins["concatLists"](
        nixScope.map(createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          nixScope.import(
            operators.add(
              new Path(["./."], []),
              new InterpolatedString(["/", ".nix"], [() => (nixScope.f)]),
            ),
          )
        )))(nixScope.tests),
      ),
  );
  return (operators.ifThenElse(
    operators.equal(nixScope.all, []),
    () => (null),
    () => (nixScope.throw(nixScope.builtins["toJSON"](nixScope.all))),
  ));
});
