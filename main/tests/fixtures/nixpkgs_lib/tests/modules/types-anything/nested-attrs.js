export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    obj["config"] = nixScope.lib["mkMerge"]([
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["foo"] = null;
        return obj;
      }),
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        if (obj["value"]["l1"] === undefined) obj["value"]["l1"] = {};
        obj["value"]["l1"]["foo"] = null;
        return obj;
      }),
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        if (obj["value"]["l1"] === undefined) obj["value"]["l1"] = {};
        if (obj["value"]["l1"]["l2"] === undefined) {
          obj["value"]["l1"]["l2"] = {};
        }
        obj["value"]["l1"]["l2"]["foo"] = null;
        return obj;
      }),
      createScope((nixScope) => {
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        if (obj["value"]["l1"] === undefined) obj["value"]["l1"] = {};
        if (obj["value"]["l1"]["l2"] === undefined) {
          obj["value"]["l1"]["l2"] = {};
        }
        if (obj["value"]["l1"]["l2"]["l3"] === undefined) {
          obj["value"]["l1"]["l2"]["l3"] = {};
        }
        obj["value"]["l1"]["l2"]["l3"]["foo"] = null;
        return obj;
      }),
    ]);
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope.lib["mkOption"](
      { "type": nixScope.lib["types"]["anything"] },
    );
    return obj;
  })
));
