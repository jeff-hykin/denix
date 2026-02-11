export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    nixScope.setDefaultModuleLocation =
      nixScope.lib["setDefaultModuleLocation"];
    nixScope.evalModules = nixScope.lib["evalModules"];
    nixScope.deferredModule = nixScope.types["deferredModule"];
    nixScope.lazyAttrsOf = nixScope.types["lazyAttrsOf"];
    nixScope.submodule = nixScope.types["submodule"];
    nixScope.str = nixScope.types["str"];
    nixScope.raw = nixScope.types["raw"];
    nixScope.enum = nixScope.types["enum"];
    return ({
      "options": ({
        "deferred": nixScope.mkOption({ "type": nixScope.deferredModule }),
        "result": nixScope.mkOption(
          {
            "default":
              (nixScope.evalModules(
                { "modules": [nixScope.config["deferred"]] },
              ))["config"]["result"],
          },
        ),
      }),
      "config": ({
        "deferred": createFunc({}, null, {}, (nixScope) => (
          true
        )),
      }),
    });
  })
));
