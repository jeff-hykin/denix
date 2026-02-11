export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.setDefaultModuleLocation =
      nixScope.lib["setDefaultModuleLocation"];
    nixScope.deferredModule = nixScope.types["deferredModule"];
    nixScope.lazyAttrsOf = nixScope.types["lazyAttrsOf"];
    nixScope.submodule = nixScope.types["submodule"];
    nixScope.str = nixScope.types["str"];
    nixScope.raw = nixScope.types["raw"];
    nixScope.enum = nixScope.types["enum"];
    return ({
      "imports": [
        createFunc({}, null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj._file = "generic.nix";
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["nodes"] = nixScope.mkOption(
              {
                "type": nixScope.lazyAttrsOf(
                  nixScope.submodule(
                    { "imports": [nixScope.config["default"]] },
                  ),
                ),
                "default": {},
              },
            );
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["default"] = nixScope.mkOption(
              {
                "type": nixScope.deferredModule,
                "default": {},
                "description": `
                    Module that is included in all nodes.
                  `,
              },
            );
            return obj;
          })
        )),
        {
          "_file": "default-1.nix",
          "default": createFunc({}, null, {}, (nixScope) => (
            createScope((nixScope) => {
              const obj = {};
              if (obj["options"] === undefined) obj["options"] = {};
              obj["options"]["settingsDict"] = nixScope.lib["mkOption"](
                { "type": nixScope.lazyAttrsOf(nixScope.str), "default": {} },
              );
              if (obj["options"] === undefined) obj["options"] = {};
              obj["options"]["bottom"] = nixScope.lib["mkOption"](
                { "type": nixScope.enum([]) },
              );
              return obj;
            })
          )),
        },
        {
          "_file": "default-a-is-b.nix",
          "default": (new Path(["./define-settingsDict-a-is-b.nix"], [])),
        },
        createScope((nixScope) => {
          const obj = {};
          obj._file = "nodes-foo.nix";
          if (obj["nodes"] === undefined) obj["nodes"] = {};
          if (obj["nodes"]["foo"] === undefined) obj["nodes"]["foo"] = {};
          if (obj["nodes"]["foo"]["settingsDict"] === undefined) {
            obj["nodes"]["foo"]["settingsDict"] = {};
          }
          obj["nodes"]["foo"]["settingsDict"]["b"] = "beta";
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          obj._file = "the-file-that-contains-the-bad-config.nix";
          if (obj["default"] === undefined) obj["default"] = {};
          obj["default"]["bottom"] = "bogus";
          return obj;
        }),
        createScope((nixScope) => {
          const obj = {};
          obj._file = "nodes-foo-c-is-a.nix";
          if (obj["nodes"] === undefined) obj["nodes"] = {};
          obj["nodes"]["foo"] = createFunc({}, null, {}, (nixScope) => (
            createScope((nixScope) => {
              const obj = {};
              if (obj["settingsDict"] === undefined) obj["settingsDict"] = {};
              obj["settingsDict"]["c"] = nixScope.config["settingsDict"]["a"];
              return obj;
            })
          ));
          return obj;
        }),
      ],
    });
  })
));
