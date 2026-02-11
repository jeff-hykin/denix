export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj["config"] = nixScope.lib["mkMerge"]([
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["single-lambda"] = createFunc(
          /*arg:*/ "x",
          null,
          {},
          (nixScope) => (
            nixScope.x
          ),
        );
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["multiple-lambdas"] = createFunc(
          /*arg:*/ "x",
          null,
          {},
          (nixScope) => (
            { "x": nixScope.x }
          ),
        );
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["merging-lambdas"] = createFunc(
          /*arg:*/ "x",
          null,
          {},
          (nixScope) => (
            { "x": nixScope.x }
          ),
        );
        return obj;
      }),
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["multiple-lambdas"] = createFunc(
          /*arg:*/ "x",
          null,
          {},
          (nixScope) => [nixScope.x],
        );
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["merging-lambdas"] = createFunc(
          /*arg:*/ "y",
          null,
          {},
          (nixScope) => (
            { "y": nixScope.y }
          ),
        );
        return obj;
      }),
    ]);
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["valueIsFunction"] = nixScope.lib["mkOption"](
      {
        "default": nixScope.lib["mapAttrs"](
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            nixScope.lib["isFunction"]
          )),
        )(nixScope.config["value"]),
      },
    );
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope.lib["mkOption"](
      { "type": nixScope.lib["types"]["anything"] },
    );
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["applied"] = nixScope.lib["mkOption"](
      {
        "default": nixScope.lib["mapAttrs"](
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fun", null, {}, (nixScope) => (
              nixScope.fun(null)
            ))
          )),
        )(nixScope.config["value"]),
      },
    );
    return obj;
  })
));
