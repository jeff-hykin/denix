export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "submod", {
      enumerable: true,
      get() {
        return createFunc({}, null, {}, (nixScope) => (
          {
            "options":
              ({
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
              }),
          }
        ));
      },
    });
    return ({
      "options": ({
        "attrsOfSub": nixScope.lib["mkOption"](
          {
            "default": {},
            "example": {},
            "type": nixScope.lib["types"]["attrsOf"](
              nixScope.lib["types"]["submodule"]([nixScope.submod]),
            ),
            "description": `
            Some descriptive text
          `,
          },
        ),
      }),
    });
  })
));
