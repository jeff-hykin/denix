export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj.config = {
      "foo": createFunc({}, null, {}, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + '_prefix == [ "foo" ]');
          }
          return createScope((nixScope) => {
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["ok"] = nixScope.lib["mkOption"]({});
            if (obj["config"] === undefined) obj["config"] = {};
            obj["config"]["ok"] = true;
            return obj;
          });
        })(operators.equal(nixScope._prefix, ["foo"]))
      )),
    };
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope.lib["mkOption"](
      { "type": nixScope.lib["types"]["submodule"]({}), "default": {} },
    );
    return obj;
  })
));
