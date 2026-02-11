export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["set"] = {
      "enable": nixScope.lib["mkOption"](
        {
          "default": false,
          "example": true,
          "type": nixScope.lib["types"]["bool"],
          "description": `
            Some descriptive text
          `,
        },
      ),
    };
    return obj;
  })
));
