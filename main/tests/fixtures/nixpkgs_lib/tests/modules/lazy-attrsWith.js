export default //
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    defGetter(
      nixScope,
      "lazyAttrsOf",
      (nixScope) =>
        nixScope.mkOption(
          {
            "type": nixScope.types["attrsWith"](
              { "lazy": true, "elemType": nixScope.types["int"] },
            ),
          },
        ),
    );
    defGetter(
      nixScope,
      "attrsOf",
      (nixScope) =>
        nixScope.mkOption(
          {
            "type": nixScope.types["attrsWith"](
              { "elemType": nixScope.types["int"] },
            ),
          },
        ),
    );
    return ({
      "imports": [
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedLazyLazy"] = nixScope.lazyAttrsOf;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedLazyNonLazy"] = nixScope.lazyAttrsOf;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedNonLazyNonLazy"] = nixScope.attrsOf;
            return obj;
          })
        )),
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedLazyLazy"] = nixScope.lazyAttrsOf;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedLazyNonLazy"] = nixScope.attrsOf;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedNonLazyNonLazy"] = nixScope.attrsOf;
            return obj;
          })
        )),
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            if (obj["config"] === undefined) obj["config"] = {};
            if (obj["config"]["mergedLazyLazy"] === undefined) {
              obj["config"]["mergedLazyLazy"] = {};
            }
            obj["config"]["mergedLazyLazy"]["bar"] = operators.add(
              nixScope.config["mergedLazyLazy"]["baz"],
              1n,
            );
            if (obj["config"] === undefined) obj["config"] = {};
            if (obj["config"]["mergedLazyLazy"] === undefined) {
              obj["config"]["mergedLazyLazy"] = {};
            }
            obj["config"]["mergedLazyLazy"]["baz"] = 10n;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["lazyResult"] = nixScope.mkOption(
              { "default": nixScope.config["mergedLazyLazy"]["bar"] },
            );
            if (obj["config"] === undefined) obj["config"] = {};
            if (obj["config"]["mergedNonLazyNonLazy"] === undefined) {
              obj["config"]["mergedNonLazyNonLazy"] = {};
            }
            obj["config"]["mergedNonLazyNonLazy"]["bar"] = operators.add(
              nixScope.config["mergedNonLazyNonLazy"]["baz"],
              1n,
            );
            if (obj["config"] === undefined) obj["config"] = {};
            if (obj["config"]["mergedNonLazyNonLazy"] === undefined) {
              obj["config"]["mergedNonLazyNonLazy"] = {};
            }
            obj["config"]["mergedNonLazyNonLazy"]["baz"] = 10n;
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["nonLazyResult"] = nixScope.mkOption(
              { "default": nixScope.config["mergedNonLazyNonLazy"]["bar"] },
            );
            return obj;
          })
        )),
      ],
    });
  })
));
