export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj["imports"] = [
      nixScope.lib["modules"]["importApply"](
        new Path(["./importApply-function.nix"], []),
      )({ "foo": "abc" }),
    ];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope.lib["mkOption"]({ "default": 1n });
    return obj;
  })
));
