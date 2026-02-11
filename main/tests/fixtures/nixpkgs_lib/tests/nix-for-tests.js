export default createFunc(
  { "lib": (nixScope) => (nixScope.pkgs["lib"]) },
  null,
  {},
  (nixScope) => (
    nixScope.builtins["mapAttrs"](
      createFunc(/*arg:*/ "attr", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.lib["versionAtLeast"](nixScope.pkg["version"])("2.29pre"),
            () => (nixScope.pkg["overrideScope"](
              createFunc(/*arg:*/ "finalScope", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "prevScope", null, {}, (nixScope) => (
                  { "aws-sdk-cpp": null }
                ))
              )),
            )),
            () => (nixScope.pkg["override"]({ "withAWS": false })),
          )
        ))
      )),
    )(nixScope.pkgs["nixVersions"])
  ),
);
