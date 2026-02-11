export default //
//
//
createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    nixScope.tier1 = ["x86_64-linux"];
    nixScope.tier2 = ["aarch64-linux", "x86_64-darwin"];
    nixScope.tier3 = [
      "armv6l-linux",
      "armv7l-linux",
      "i686-linux",
      "mipsel-linux",
    ];
    defGetter(
      nixScope,
      "hydra",
      (nixScope) =>
        operators.listConcat(
          nixScope.tier1,
          operators.listConcat(
            nixScope.tier2,
            operators.listConcat(nixScope.tier3, ["aarch64-darwin"]),
          ),
        ),
    );
    return nixScope;
  })
));
