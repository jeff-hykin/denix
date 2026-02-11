export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkIf = nixScope.lib["mkIf"];
    nixScope.versionAtLeast = nixScope.lib["versionAtLeast"];
    nixScope.versionOlder = nixScope.lib["versionOlder"];
    return ({
      "option": createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.merge(nixScope.x, { "optional": true })
      )),
      "yes": ({ "tristate": "y", "optional": false }),
      "no": ({ "tristate": "n", "optional": false }),
      "module": ({ "tristate": "m", "optional": false }),
      "unset": ({ "tristate": null, "optional": false }),
      "freeform": createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        { "freeform": nixScope.x, "optional": false }
      )),
      "whenHelpers": createFunc(/*arg:*/ "version", null, {}, (nixScope) => (
        {
          "whenAtLeast": createFunc(/*arg:*/ "ver", null, {}, (nixScope) => (
            nixScope.mkIf(
              nixScope.versionAtLeast(nixScope.version)(nixScope.ver),
            )
          )),
          "whenOlder": createFunc(/*arg:*/ "ver", null, {}, (nixScope) => (
            nixScope.mkIf(nixScope.versionOlder(nixScope.version)(nixScope.ver))
          )),
          "whenBetween": createFunc(/*arg:*/ "verLow", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "verHigh", null, {}, (nixScope) => (
              nixScope.mkIf(
                operators.and(
                  nixScope.versionAtLeast(nixScope.version)(nixScope.verLow),
                  nixScope.versionOlder(nixScope.version)(nixScope.verHigh),
                ),
              )
            ))
          )),
        }
      )),
    });
  })
));
