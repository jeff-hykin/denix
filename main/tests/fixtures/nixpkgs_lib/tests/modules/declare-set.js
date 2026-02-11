export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["set"] = nixScope.lib["mkOption"](
      {
        "default": {},
        "example": ({ "a": 1n }),
        "type": nixScope.lib["types"]["attrsOf"](nixScope.lib["types"]["int"]),
        "description": `
          Some descriptive text
        `,
      },
    );
    return obj;
  })
));
