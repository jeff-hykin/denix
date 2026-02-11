export default /*
  A basic documentation generating module.
  Declares and defines a `docs` option, suitable for making assertions about
  the extraction "phase" of documentation generation.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.head = nixScope.lib["head"];
    nixScope.length = nixScope.lib["length"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    defGetter(
      nixScope,
      "traceListSeq",
      (nixScope) =>
        createFunc(/*arg:*/ "l", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            nixScope.lib["foldl'"](
              createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                  nixScope.lib["traceSeq"](nixScope.b)(nixScope.a)
                ))
              )),
            )(nixScope.v)(nixScope.l)
          ))
        )),
    );
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["docs"] = nixScope.mkOption(
        {
          "type": nixScope.types["lazyAttrsOf"](nixScope.types["raw"]),
          "description": `
          All options to be rendered, without any visibility filtering applied.
        `,
        },
      );
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["docs"] = nixScope.lib["zipAttrsWith"](
        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "values", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.greaterThan(nixScope.length(nixScope.values), 1n),
              () => (nixScope.traceListSeq(nixScope.values)(nixScope.abort)(
                new InterpolatedString([
                  "Multiple options with the same name: ",
                  "",
                ], [() => (nixScope.name)]),
              )),
              () => (((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "length values == 1");
                }
                return nixScope.head(nixScope.values);
              })(operators.equal(nixScope.length(nixScope.values), 1n))),
            )
          ))
        )),
      )(
        nixScope.map(createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj[nixScope.opt["name"]] = nixScope.opt;
            return obj;
          })
        )))(nixScope.lib["optionAttrSetToDocList"](nixScope.options)),
      );
      return obj;
    });
  })
));
