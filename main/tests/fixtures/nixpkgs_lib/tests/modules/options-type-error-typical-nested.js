export default createFunc({}, null, {}, (nixScope) => (
  {
    "options": createScope((nixScope) => {
      const obj = {};
      if (obj["result"] === undefined) obj["result"] = {};
      obj["result"]["here"] = nixScope.lib["types"]["str"];
      return obj;
    }),
  }
));
