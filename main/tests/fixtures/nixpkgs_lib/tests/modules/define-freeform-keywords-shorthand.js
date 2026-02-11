export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj.class = { "just": "data" };
    obj.a = "one";
    obj.b = "two";
    obj.meta = "meta";
    if (obj["_module"] === undefined) obj["_module"] = {};
    if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
    obj["_module"]["args"]["result"] = /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "r",
        (nixScope) =>
          nixScope.builtins["removeAttrs"](nixScope.config)(["_module"]),
      );
      return nixScope.builtins["trace"](
        nixScope.builtins["deepSeq"](nixScope.r)(nixScope.r),
      )(operators.equal(
        nixScope.r,
        {
          "a": "one",
          "b": "two",
          "class": ({ "just": "data" }),
          "meta": "meta",
        },
      ));
    });
    return obj;
  })
));
