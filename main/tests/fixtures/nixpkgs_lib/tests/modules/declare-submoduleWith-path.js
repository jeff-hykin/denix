export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope.lib["mkOption"](
      {
        "type": nixScope.lib["types"]["submoduleWith"](
          { "modules": [new Path(["./declare-enable.nix"], [])] },
        ),
        "default": {},
      },
    );
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["submodule"] = new Path(["./define-enable.nix"], []);
    return obj;
  })
));
