export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    return ({
      "options": ({
        "name": nixScope.lib["mkOption"]({ "type": nixScope.types["str"] }),
        "email": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["nullOr"](nixScope.types["str"]),
            "default": null,
          },
        ),
        "matrix": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["nullOr"](nixScope.types["str"]),
            "default": null,
          },
        ),
        "github": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["nullOr"](nixScope.types["str"]),
            "default": null,
          },
        ),
        "githubId": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["nullOr"](
              nixScope.types["ints"]["unsigned"],
            ),
            "default": null,
          },
        ),
        "keys": nixScope.lib["mkOption"](
          {
            "type": nixScope.types["listOf"](
              nixScope.types["submodule"](createScope((nixScope) => {
                const obj = {};
                if (obj["options"] === undefined) obj["options"] = {};
                obj["options"]["fingerprint"] = nixScope.lib["mkOption"](
                  { "type": nixScope.types["str"] },
                );
                return obj;
              })),
            ),
            "default": [],
          },
        ),
      }),
    });
  })
));
