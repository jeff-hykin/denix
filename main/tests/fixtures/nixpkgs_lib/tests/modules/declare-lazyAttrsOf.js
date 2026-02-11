export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope.lib["mkOption"](
      {
        "type": nixScope.lib["types"]["lazyAttrsOf"](
          operators.merge(
            nixScope.lib["types"]["str"],
            createScope((nixScope) => {
              const obj = {};
              if (obj["emptyValue"] === undefined) obj["emptyValue"] = {};
              obj["emptyValue"]["value"] = "empty";
              return obj;
            }),
          ),
        ),
        "default": {},
      },
    );
    return obj;
  })
));
