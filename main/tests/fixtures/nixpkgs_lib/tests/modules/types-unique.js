export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.types = nixScope.lib["types"];
    return createScope((nixScope) => {
      const obj = {};
      obj["imports"] = [
        createScope((nixScope) => {
          const obj = {};
          if (obj["examples"] === undefined) obj["examples"] = {};
          obj["examples"]["merged"] = { "b": "bee" };
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          if (obj["examples"] === undefined) obj["examples"] = {};
          obj["examples"]["override"] = nixScope.lib["mkForce"]({ "b": "bee" });
          return obj;
        }),
      ];
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["examples"] = nixScope.mkOption({
        "type": nixScope.types["lazyAttrsOf"](
          nixScope.types["unique"](
            {
              "message":
                "We require a single definition, because seeing the whole value at once helps us maintain critical invariants of our system.",
            },
          )(nixScope.types["attrsOf"](nixScope.types["str"])),
        ),
      });
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["examples"] = {
        "merged": ({ "a": "aye" }),
        "override": ({ "a": "aye" }),
        "badLazyType": ({ "a": true }),
      };
      return obj;
    });
  })
));
