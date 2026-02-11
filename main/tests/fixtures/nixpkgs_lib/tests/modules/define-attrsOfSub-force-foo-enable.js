export default createFunc({}, null, {}, (nixScope) => (
  {
    "attrsOfSub": nixScope.lib["mkForce"](createScope((nixScope) => {
      const obj = {};
      if (obj["foo"] === undefined) obj["foo"] = {};
      obj["foo"]["enable"] = false;
      return obj;
    })),
  }
));
