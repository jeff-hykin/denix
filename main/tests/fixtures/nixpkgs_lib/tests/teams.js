export default //
//
//
createFunc(
  {
    "pkgs": (nixScope) => (nixScope.import(new Path(["../.."], []))({})),
    "lib": (nixScope) => (nixScope.pkgs["lib"]),
  },
  null,
  {},
  (nixScope) => (
    /*let*/ createScope((nixScope) => {
      nixScope.types = nixScope.lib["types"];
      Object.defineProperty(nixScope, "teamModule", {
        enumerable: true,
        get() {
          return createFunc({}, null, {}, (nixScope) => (
            {
              "options": ({
                "shortName": nixScope.lib["mkOption"](
                  { "type": nixScope.types["str"] },
                ),
                "scope": nixScope.lib["mkOption"](
                  { "type": nixScope.types["str"] },
                ),
                "enableFeatureFreezePing": nixScope.lib["mkOption"](
                  { "type": nixScope.types["bool"], "default": false },
                ),
                "members": nixScope.lib["mkOption"]({
                  "type": nixScope.types["listOf"](
                    nixScope.types["submodule"](
                      nixScope.import(
                        new Path(["./maintainer-module.nix"], []),
                      )({ "lib": nixScope.lib }),
                    ),
                  ),
                  "default": [],
                }),
                "githubTeams": nixScope.lib["mkOption"](
                  {
                    "type": nixScope.types["listOf"](nixScope.types["str"]),
                    "default": [],
                  },
                ),
              }),
            }
          ));
        },
      });
      Object.defineProperty(nixScope, "checkTeam", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "team", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "uncheckedAttrs", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "prefix", {
                  enumerable: true,
                  get() {
                    return ["lib", "maintainer-team", nixScope.team];
                  },
                });
                Object.defineProperty(nixScope, "checkedAttrs", {
                  enumerable: true,
                  get() {
                    return (nixScope.lib["modules"]["evalModules"]({
                      "prefix": nixScope.prefix,
                      "modules": [
                        nixScope.teamModule,
                        {
                          "_file": nixScope.toString(
                            new Path(["../../maintainers/team-list.nix"], []),
                          ),
                          "config": nixScope.uncheckedAttrs,
                        },
                      ],
                    }))["config"];
                  },
                });
                return nixScope.checkedAttrs;
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "checkedTeams", {
        enumerable: true,
        get() {
          return nixScope.lib["mapAttrs"](nixScope.checkTeam)(
            nixScope.lib["teams"],
          );
        },
      });
      return nixScope.pkgs["writeTextDir"]("maintainer-teams.json")(
        nixScope.builtins["toJSON"](nixScope.checkedTeams),
      );
    })
  ),
);
