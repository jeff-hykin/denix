export default createFunc({}, null, {}, (nixScope) => (
  {
    "imports": [
      createScope((nixScope) => {
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sm"] = nixScope.lib["mkOption"](
          { "type": nixScope.lib["types"]["strMatching"]("(.*") },
        );
        return obj;
      }),
      createScope((nixScope) => {
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sm"] = nixScope.lib["mkOption"](
          { "type": nixScope.lib["types"]["strMatching"]("(.*") },
        );
        return obj;
      }),
    ],
  }
));
