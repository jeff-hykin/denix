export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.addErrorContext = nixScope.lib["addErrorContext"];
    nixScope.all = nixScope.lib["all"];
    nixScope.any = nixScope.lib["any"];
    nixScope.attrByPath = nixScope.lib["attrByPath"];
    nixScope.attrNames = nixScope.lib["attrNames"];
    nixScope.catAttrs = nixScope.lib["catAttrs"];
    nixScope.concatLists = nixScope.lib["concatLists"];
    nixScope.concatMap = nixScope.lib["concatMap"];
    nixScope.concatStringsSep = nixScope.lib["concatStringsSep"];
    nixScope.elem = nixScope.lib["elem"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope["foldl'"] = nixScope.lib["foldl'"];
    nixScope.functionArgs = nixScope.lib["functionArgs"];
    nixScope.getAttrFromPath = nixScope.lib["getAttrFromPath"];
    nixScope.genericClosure = nixScope.lib["genericClosure"];
    nixScope.head = nixScope.lib["head"];
    nixScope.id = nixScope.lib["id"];
    nixScope.imap1 = nixScope.lib["imap1"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.isBool = nixScope.lib["isBool"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.oldestSupportedReleaseIsAtLeast =
      nixScope.lib["oldestSupportedReleaseIsAtLeast"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.isString = nixScope.lib["isString"];
    nixScope.length = nixScope.lib["length"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.mapAttrsToList = nixScope.lib["mapAttrsToList"];
    nixScope.mapAttrsRecursiveCond = nixScope.lib["mapAttrsRecursiveCond"];
    nixScope.min = nixScope.lib["min"];
    nixScope.optional = nixScope.lib["optional"];
    nixScope.optionalAttrs = nixScope.lib["optionalAttrs"];
    nixScope.optionalString = nixScope.lib["optionalString"];
    nixScope.recursiveUpdate = nixScope.lib["recursiveUpdate"];
    nixScope.reverseList = nixScope.lib["reverseList"];
    nixScope.sort = nixScope.lib["sort"];
    nixScope.seq = nixScope.lib["seq"];
    nixScope.setAttrByPath = nixScope.lib["setAttrByPath"];
    nixScope.substring = nixScope.lib["substring"];
    nixScope.throwIfNot = nixScope.lib["throwIfNot"];
    nixScope.trace = nixScope.lib["trace"];
    nixScope.typeOf = nixScope.lib["typeOf"];
    nixScope.types = nixScope.lib["types"];
    nixScope.unsafeGetAttrPos = nixScope.lib["unsafeGetAttrPos"];
    nixScope.warn = nixScope.lib["warn"];
    nixScope.warnIf = nixScope.lib["warnIf"];
    nixScope.zipAttrs = nixScope.lib["zipAttrs"];
    nixScope.zipAttrsWith = nixScope.lib["zipAttrsWith"];
    nixScope.isOption = nixScope.lib["options"]["isOption"];
    nixScope.mkOption = nixScope.lib["options"]["mkOption"];
    nixScope.showDefs = nixScope.lib["options"]["showDefs"];
    nixScope.showFiles = nixScope.lib["options"]["showFiles"];
    nixScope.showOption = nixScope.lib["options"]["showOption"];
    nixScope.unknownModule = nixScope.lib["options"]["unknownModule"];
    nixScope.isConvertibleWithToString =
      nixScope.lib["strings"]["isConvertibleWithToString"];
    nixScope.defaultOverridePriority = 100n;
    nixScope.defaultOrderPriority = 1000n;
    defGetter(
      nixScope,
      "showDeclPrefix",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "decl", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
              new InterpolatedString([
                " - option(s) with prefix `",
                "' in module `",
                "'",
              ], [
                () => (nixScope.showOption(
                  operators.listConcat(nixScope.loc, [nixScope.prefix]),
                )),
                () => (nixScope.decl["_file"]),
              ])
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "showRawDecls",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "decls", null, {}, (nixScope) => (
            nixScope.concatStringsSep("")(
              nixScope.sort(createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                  operators.lessThan(nixScope.a, nixScope.b)
                ))
              )))(
                nixScope.concatMap(
                  createFunc(/*arg:*/ "decl", null, {}, (nixScope) => (
                    nixScope.map(
                      nixScope.showDeclPrefix(nixScope.loc)(nixScope.decl),
                    )(nixScope.attrNames(nixScope.decl["options"]))
                  )),
                )(nixScope.decls),
              ),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "evalModules",
      (nixScope) =>
        createFunc(/*arg:*/ "evalModulesArgs", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "withWarnings", (nixScope) =>
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                nixScope.warnIf(
                  operators.hasAttr(nixScope.evalModulesArgs, "args"),
                )("The args argument to evalModules is deprecated. Please set config._module.args instead.")(
                  nixScope.warnIf,
                )(operators.hasAttr(nixScope.evalModulesArgs, "check"))(
                  "The check argument to evalModules is deprecated. Please set config._module.check instead.",
                )(nixScope.x)
              )));
            defGetter(nixScope, "legacyModules", (nixScope) =>
              operators.listConcat(
                nixScope.optional(
                  operators.hasAttr(nixScope.evalModulesArgs, "args"),
                )({
                  "config": createScope((nixScope) => {
                    const obj = {};
                    if (obj["_module"] === undefined) obj["_module"] = {};
                    obj["_module"]["args"] = nixScope.args;
                    return obj;
                  }),
                }),
                nixScope.optional(
                  operators.hasAttr(nixScope.evalModulesArgs, "check"),
                )({
                  "config": createScope((nixScope) => {
                    const obj = {};
                    if (obj["_module"] === undefined) obj["_module"] = {};
                    obj["_module"]["check"] = nixScope.mkDefault(
                      nixScope.check,
                    );
                    return obj;
                  }),
                }),
              ));
            defGetter(nixScope, "regularModules", (nixScope) =>
              operators.listConcat(nixScope.modules, nixScope.legacyModules));
            defGetter(nixScope, "internalModule", (nixScope) =>
              /*rec*/ createScope((nixScope) => {
                nixScope._file = "lib/modules.nix";
                defGetter(nixScope, "key", (nixScope) =>
                  nixScope._file);
                defGetter(nixScope, "options", (nixScope) =>
                  createScope((nixScope) => {
                    const obj = {};
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["args"] = nixScope.mkOption(
                      createScope((nixScope) => {
                        const obj = {};
                        obj.type = nixScope.types["lazyAttrsOf"](
                          nixScope.types["raw"],
                        );
                        obj.description = `
                      Additional arguments passed to each module in addition to ones
                      like \`lib\`, \`config\`,
                      and \`pkgs\`, \`modulesPath\`.
        
                      This option is also available to all submodules. Submodules do not
                      inherit args from their parent module, nor do they provide args to
                      their parent module or sibling submodules. The sole exception to
                      this is the argument \`name\` which is provided by
                      parent modules to a submodule and contains the attribute name
                      the submodule is bound to, or a unique generated name if it is
                      not bound to an attribute.
        
                      Some arguments are already passed by default, of which the
                      following *cannot* be changed with this option:
                      - {var}\`lib\`: The nixpkgs library.
                      - {var}\`config\`: The results of all options after merging the values from all modules together.
                      - {var}\`options\`: The options declared in all modules.
                      - {var}\`specialArgs\`: The \`specialArgs\` argument passed to \`evalModules\`.
                      - All attributes of {var}\`specialArgs\`
        
                        Whereas option values can generally depend on other option values
                        thanks to laziness, this does not apply to \`imports\`, which
                        must be computed statically before anything else.
        
                        For this reason, callers of the module system can provide \`specialArgs\`
                        which are available during import resolution.
        
                        For NixOS, \`specialArgs\` includes
                        {var}\`modulesPath\`, which allows you to import
                        extra modules from the nixpkgs package tree without having to
                        somehow make the module aware of the location of the
                        \`nixpkgs\` or NixOS directories.
                        \`\`\`
                        { modulesPath, ... }: {
                          imports = [
                            (modulesPath + "/profiles/minimal.nix")
                          ];
                        }
                        \`\`\`
        
                      For NixOS, the default value for this option includes at least this argument:
                      - {var}\`pkgs\`: The nixpkgs package set according to
                        the {option}\`nixpkgs.pkgs\` option.
                    `;
                        obj[
                          operators.ifThenElse(
                            operators.equal(nixScope.prefix, []),
                            () => (null),
                            () => ("internal"),
                          )
                        ] = true;
                        return obj;
                      }),
                    );
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["check"] = nixScope.mkOption(
                      {
                        "type": nixScope.types["bool"],
                        "internal": true,
                        "default": true,
                        "description":
                          "Whether to check whether all option definitions have matching declarations.",
                      },
                    );
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["freeformType"] = nixScope.mkOption(
                      {
                        "type": nixScope.types["nullOr"](
                          nixScope.types["optionType"],
                        ),
                        "internal": true,
                        "default": null,
                        "description": `
                      If set, merge all definitions that don't have an associated option
                      together using this type. The result then gets combined with the
                      values of all declared options to produce the final \`
                      config\` value.
        
                      If this is \`null\`, definitions without an option
                      will throw an error unless {option}\`_module.check\` is
                      turned off.
                    `,
                      },
                    );
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["specialArgs"] = nixScope.mkOption(
                      {
                        "readOnly": true,
                        "internal": true,
                        "description": `
                      Externally provided module arguments that can't be modified from
                      within a configuration, but can be used in module imports.
                    `,
                      },
                    );
                    return obj;
                  }));
                defGetter(nixScope, "config", (nixScope) =>
                  createScope((nixScope) => {
                    const obj = {};
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["args"] = {
                      "extendModules": nixScope.extendModules,
                      "moduleType": nixScope.type,
                    };
                    if (obj["_module"] === undefined) {
                      obj["_module"] = {};
                    }
                    obj["_module"]["specialArgs"] = nixScope.specialArgs;
                    return obj;
                  }));
                return nixScope;
              }));
            defGetter(nixScope, "doCollect", (nixScope) =>
              createFunc({}, null, {}, (nixScope) => (
                nixScope.collectModules(nixScope.class)(
                  operators.selectOrDefault(nixScope.specialArgs, [
                    "modulesPath",
                  ], ""),
                )(operators.listConcat(nixScope.regularModules, [
                  nixScope.internalModule,
                ]))(operators.merge({
                  "lib": nixScope.lib,
                  "options": nixScope.options,
                  "specialArgs": nixScope.specialArgs,
                  "_class": nixScope.class,
                  "_prefix": nixScope.prefix,
                  "config": nixScope.addErrorContext(
                    "if you get an infinite recursion here, you probably reference `config` in `imports`. If you are trying to achieve a conditional import behavior dependent on `config`, consider importing unconditionally, and using `mkEnableOption` and `mkIf` to control its effect.",
                  )(nixScope.config),
                }, nixScope.specialArgs))
              )));
            defGetter(nixScope, "merged", (nixScope) =>
              nixScope.mergeModules(nixScope.prefix)(
                nixScope.reverseList((nixScope.doCollect({}))["modules"]),
              ));
            defGetter(nixScope, "options", (nixScope) =>
              nixScope.merged["matchedOptions"]);
            defGetter(nixScope, "config", (nixScope) =>
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "declaredConfig", (nixScope) =>
                  nixScope.mapAttrsRecursiveCond(
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      operators.negate(nixScope.isOption(nixScope.v))
                    )),
                  )(createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      nixScope.v["value"]
                    ))
                  )))(nixScope.options));
                defGetter(nixScope, "freeformConfig", (nixScope) =>
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "defs", (nixScope) =>
                      nixScope.map(
                        createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                          {
                            "file": nixScope.def["file"],
                            "value": nixScope.setAttrByPath(
                              nixScope.def["prefix"],
                            )(nixScope.def["value"]),
                          }
                        )),
                      )(nixScope.merged["unmatchedDefns"]));
                    return (operators.ifThenElse(
                      operators.equal(nixScope.defs, []),
                      () => ({}),
                      () => (nixScope.declaredConfig["_module"]["freeformType"]
                        ["merge"](nixScope.prefix)(nixScope.defs)),
                    ));
                  }));
                return (operators.ifThenElse(
                  operators.equal(
                    nixScope.declaredConfig["_module"]["freeformType"],
                    null,
                  ),
                  () => (nixScope.declaredConfig),
                  () => (nixScope.recursiveUpdate(nixScope.freeformConfig)(
                    nixScope.declaredConfig,
                  )),
                ));
              }));
            defGetter(
              nixScope,
              "checkUnmatched",
              (
                nixScope,
              ) => (operators.ifThenElse(
                operators.and(
                  operators.and(
                    nixScope.config["_module"]["check"],
                    operators.equal(
                      nixScope.config["_module"]["freeformType"],
                      null,
                    ),
                  ),
                  operators.notEqual(nixScope.merged["unmatchedDefns"], []),
                ),
                () => (/*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "firstDef",
                    (nixScope) =>
                      nixScope.head(nixScope.merged["unmatchedDefns"]),
                  );
                  defGetter(nixScope, "baseMsg", (nixScope) =>
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "optText", (nixScope) =>
                        nixScope.showOption(
                          operators.listConcat(
                            nixScope.prefix,
                            nixScope.firstDef["prefix"],
                          ),
                        ));
                      defGetter(nixScope, "defText", (nixScope) =>
                        nixScope.addErrorContext(
                          new InterpolatedString([
                            "while evaluating the error message for definitions for `",
                            "', which is an option that does not exist",
                          ], [() => (nixScope.optText)]),
                        )(
                          nixScope.addErrorContext(
                            new InterpolatedString([
                              "while evaluating a definition from `",
                              "'",
                            ], [() => (nixScope.firstDef["file"])]),
                          )(nixScope.showDefs([nixScope.firstDef])),
                        ));
                      return (new InterpolatedString([
                        "The option `",
                        "' does not exist. Definition values:",
                        "",
                      ], [() => (nixScope.optText), () => (nixScope.defText)]));
                    }));
                  return (operators.ifThenElse(
                    operators.equal(nixScope.attrNames(nixScope.options), [
                      "_module",
                    ]),
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "optionName", (nixScope) =>
                        nixScope.showOption(nixScope.prefix));
                      return (operators.ifThenElse(
                        operators.equal(nixScope.optionName, ""),
                        () => (nixScope.throw(
                          new InterpolatedString([
                            "\n                ",
                            "\n\n                It seems as if you're trying to declare an option by placing it into \\`config' rather than \\`options'!\n              ",
                          ], [() => (nixScope.baseMsg)]),
                        )),
                        () => (nixScope.throw(
                          new InterpolatedString([
                            "\n                ",
                            "\n\n                However there are no options defined in \\`",
                            "'. Are you sure you've\n                declared your options properly? This can happen if you e.g. declared your options in \\`types.submodule'\n                under \\`config' rather than \\`options'.\n              ",
                          ], [
                            () => (nixScope.baseMsg),
                            () => (nixScope.showOption(nixScope.prefix)),
                          ]),
                        )),
                      ));
                    })),
                    () => (nixScope.throw(nixScope.baseMsg)),
                  ));
                })),
                () => (null),
              )),
            );
            defGetter(nixScope, "checked", (nixScope) =>
              nixScope.seq(nixScope.checkUnmatched));
            defGetter(nixScope, "extendModules", (nixScope) =>
              createFunc(/*arg:*/ "extendArgs", null, {}, (nixScope) => (
                nixScope.evalModules(operators.merge(nixScope.evalModulesArgs, {
                  "modules": operators.listConcat(
                    nixScope.regularModules,
                    nixScope.modules,
                  ),
                  "specialArgs": operators.merge(
                    operators.selectOrDefault(nixScope.evalModulesArgs, [
                      "specialArgs",
                    ], {}),
                    nixScope.specialArgs,
                  ),
                  "prefix": operators.selectOrDefault(
                    nixScope.extendArgs,
                    ["prefix"],
                    operators.selectOrDefault(nixScope.evalModulesArgs, [
                      "prefix",
                    ], []),
                  ),
                }))
              )));
            defGetter(nixScope, "type", (nixScope) =>
              nixScope.types["submoduleWith"](
                {
                  "modules": nixScope.modules,
                  "specialArgs": nixScope.specialArgs,
                  "class": nixScope.class,
                },
              ));
            defGetter(nixScope, "result", (nixScope) =>
              nixScope.withWarnings(createScope((nixScope) => {
                const obj = {};
                obj._type = "configuration";
                obj.options = nixScope.checked(nixScope.options);
                obj.config = nixScope.checked(
                  nixScope.removeAttrs(nixScope.config)(["_module"]),
                );
                obj._module = nixScope.checked(nixScope.config["_module"]);
                obj.graph = nixScope.doCollect({}).graph;
                obj.extendModules = nixScope.extendModules;
                obj.type = nixScope.type;
                obj.class = nixScope.class;
                return obj;
              })));
            return nixScope.result;
          })
        )),
    );
    defGetter(
      nixScope,
      "collectModules",
      (nixScope) =>
        createFunc(/*arg:*/ "class", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "loadModule", (nixScope) =>
              createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "fallbackFile", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "fallbackKey", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.isFunction(nixScope.m),
                        () => (nixScope.unifyModuleSyntax(
                          nixScope.fallbackFile,
                        )(nixScope.fallbackKey)(
                          nixScope.applyModuleArgs(nixScope.fallbackKey)(
                            nixScope.m,
                          )(nixScope.args),
                        )),
                        () => (operators.ifThenElse(
                          nixScope.isAttrs(nixScope.m),
                          () => (operators.ifThenElse(
                            operators.equal(
                              operators.selectOrDefault(
                                nixScope.m,
                                ["_type"],
                                "module",
                              ),
                              "module",
                            ),
                            () => (nixScope.unifyModuleSyntax(
                              nixScope.fallbackFile,
                            )(nixScope.fallbackKey)(nixScope.m)),
                            () => (operators.ifThenElse(
                              operators.or(
                                operators.equal(nixScope.m["_type"], "if"),
                                operators.equal(
                                  nixScope.m["_type"],
                                  "override",
                                ),
                              ),
                              () => (nixScope.loadModule(nixScope.args)(
                                nixScope.fallbackFile,
                              )(nixScope.fallbackKey)(
                                { "config": nixScope.m },
                              )),
                              () => (nixScope.throw(
                                nixScope.messages["not_a_module"](
                                  {
                                    "fallbackFile": nixScope.fallbackFile,
                                    "value": nixScope.m,
                                    "_type": nixScope.m["_type"],
                                    "expectedClass": nixScope.class,
                                    "prefix": nixScope.args["_prefix"],
                                  },
                                ),
                              )),
                            )),
                          )),
                          () => (operators.ifThenElse(
                            nixScope.isList(nixScope.m),
                            () => (/*let*/ createScope((nixScope) => {
                              defGetter(
                                nixScope,
                                "defs",
                                (
                                  nixScope,
                                ) => [
                                  {
                                    "file": nixScope.fallbackFile,
                                    "value": nixScope.m,
                                  },
                                ],
                              );
                              return nixScope.throw(
                                new InterpolatedString([
                                  "Module imports can't be nested lists. Perhaps you meant to remove one level of lists? Definitions: ",
                                  "",
                                ], [() => (nixScope.showDefs(nixScope.defs))]),
                              );
                            })),
                            () => (nixScope.unifyModuleSyntax(
                              nixScope.toString(nixScope.m),
                            )(nixScope.toString(nixScope.m))(
                              nixScope.applyModuleArgsIfFunction(
                                nixScope.toString(nixScope.m),
                              )(nixScope.import(nixScope.m))(nixScope.args),
                            )),
                          )),
                        )),
                      )
                    ))
                  ))
                ))
              )));
            defGetter(
              nixScope,
              "checkModule",
              (
                nixScope,
              ) => (operators.ifThenElse(
                operators.notEqual(nixScope.class, null),
                () => (createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.or(
                      operators.equal(nixScope.m["_class"], null),
                      operators.equal(nixScope.m["_class"], nixScope.class),
                    ),
                    () => (nixScope.m),
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "\n              The module \\`",
                        "\\` (class: ",
                        ") cannot be imported into a module evaluation that expects class ",
                        ".\n\n              Help:\n              - Ensure that you are importing the correct module.\n              - Verify that the module's \\`_class\\`, ",
                        " matches the expected \\`class\\` ",
                        ".\n              - If you are using a custom class, make sure it is correctly defined and used consistently across your modules.\n            ",
                      ], [
                        () => (operators.selectOrDefault(
                          nixScope.m,
                          ["_file"],
                          nixScope.m["key"],
                        )),
                        () => (nixScope.lib["strings"]["escapeNixString"](
                          nixScope.m["_class"],
                        )),
                        () => (nixScope.lib["strings"]["escapeNixString"](
                          nixScope.class,
                        )),
                        () => (nixScope.lib["strings"]["escapeNixString"](
                          nixScope.m["_class"],
                        )),
                        () => (nixScope.lib["strings"]["escapeNixString"](
                          nixScope.class,
                        )),
                      ]),
                    )),
                  )
                ))),
                () => (createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                  nixScope.m
                ))),
              )),
            );
            defGetter(nixScope, "isDisabled", (nixScope) =>
              createFunc(/*arg:*/ "modulesPath", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "disabledList", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "moduleKey", (nixScope) =>
                      createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                          operators.ifThenElse(
                            nixScope.isString(nixScope.m),
                            () => (operators.ifThenElse(
                              operators.equal(
                                nixScope.substring(0n)(1n)(nixScope.m),
                                "/",
                              ),
                              () => (nixScope.m),
                              () => (operators.add(
                                operators.add(
                                  nixScope.toString(nixScope.modulesPath),
                                  "/",
                                ),
                                nixScope.m,
                              )),
                            )),
                            () => (operators.ifThenElse(
                              nixScope.isConvertibleWithToString(nixScope.m),
                              () => (operators.ifThenElse(
                                operators.and(
                                  operators.hasAttr(nixScope.m, "key"),
                                  operators.notEqual(
                                    nixScope.m["key"],
                                    nixScope.toString(nixScope.m),
                                  ),
                                ),
                                () => (nixScope.throw(
                                  new InterpolatedString([
                                    "Module `",
                                    "` contains a disabledModules item that is an attribute set that can be converted to a string (",
                                    ") but also has a `.key` attribute (",
                                    ") with a different value. This makes it ambiguous which module should be disabled.",
                                  ], [
                                    () => (nixScope.file),
                                    () => (nixScope.toString(nixScope.m)),
                                    () => (nixScope.m["key"]),
                                  ]),
                                )),
                                () => (nixScope.toString(nixScope.m)),
                              )),
                              () => (operators.ifThenElse(
                                operators.hasAttr(nixScope.m, "key"),
                                () => (nixScope.m["key"]),
                                () => (operators.ifThenElse(
                                  nixScope.isAttrs(nixScope.m),
                                  () => (nixScope.throw(
                                    new InterpolatedString([
                                      "Module `",
                                      "` contains a disabledModules item that is an attribute set, presumably a module, that does not have a `key` attribute. This means that the module system doesn't have any means to identify the module that should be disabled. Make sure that you've put the correct value in disabledModules: a string path relative to modulesPath, a path value, or an attribute set with a `key` attribute.",
                                    ], [() => (nixScope.file)]),
                                  )),
                                  () => (nixScope.throw(
                                    new InterpolatedString([
                                      "Each disabledModules item must be a path, string, or a attribute set with a key attribute, or a value supported by toString. However, one of the disabledModules items in `",
                                      "` is none of that, but is of type ",
                                      ".",
                                    ], [
                                      () => (nixScope.toString(nixScope.file)),
                                      () => (nixScope.typeOf(nixScope.m)),
                                    ]),
                                  )),
                                )),
                              )),
                            )),
                          )
                        ))
                      )));
                    defGetter(nixScope, "disabledKeys", (nixScope) =>
                      nixScope.concatMap(
                        createFunc({}, null, {}, (nixScope) => (
                          nixScope.map(nixScope.moduleKey(nixScope.file))(
                            nixScope.disabled,
                          )
                        )),
                      )(nixScope.disabledList));
                    return createFunc(
                      /*arg:*/ "structuredModule",
                      null,
                      {},
                      (nixScope) => (
                        nixScope.elem(nixScope.structuredModule["key"])(
                          nixScope.disabledKeys,
                        )
                      ),
                    );
                  })
                ))
              )));
            defGetter(nixScope, "collectStructuredModules", (nixScope) =>
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "collectResults", (nixScope) =>
                  createFunc(/*arg:*/ "modules", null, {}, (nixScope) => (
                    {
                      "disabled": nixScope.concatLists(
                        nixScope.catAttrs("disabled")(nixScope.modules),
                      ),
                      "modules": nixScope.modules,
                    }
                  )));
                return createFunc(
                  /*arg:*/ "parentFile",
                  null,
                  {},
                  (nixScope) => (
                    createFunc(/*arg:*/ "parentKey", null, {}, (nixScope) => (
                      createFunc(
                        /*arg:*/ "initialModules",
                        null,
                        {},
                        (nixScope) => (
                          createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                            nixScope.collectResults(
                              nixScope.imap1(
                                createFunc(
                                  /*arg:*/ "n",
                                  null,
                                  {},
                                  (nixScope) => (
                                    createFunc(
                                      /*arg:*/ "x",
                                      null,
                                      {},
                                      (nixScope) => (
                                        /*let*/ createScope((nixScope) => {
                                          defGetter(
                                            nixScope,
                                            "module",
                                            (nixScope) =>
                                              nixScope.checkModule(
                                                nixScope.loadModule(
                                                  nixScope.args,
                                                )(nixScope.parentFile)(
                                                  new InterpolatedString([
                                                    "",
                                                    ":anon-",
                                                    "",
                                                  ], [
                                                    () => (nixScope.parentKey),
                                                    () => (nixScope.toString(
                                                      nixScope.n,
                                                    )),
                                                  ]),
                                                )(nixScope.x),
                                              ),
                                          );
                                          defGetter(
                                            nixScope,
                                            "collectedImports",
                                            (nixScope) =>
                                              nixScope.collectStructuredModules(
                                                nixScope.module["_file"],
                                              )(nixScope.module["key"])(
                                                nixScope.module["imports"],
                                              )(nixScope.args),
                                          );
                                          return ({
                                            "key": nixScope.module["key"],
                                            "module": nixScope.module,
                                            "modules":
                                              nixScope
                                                .collectedImports["modules"],
                                            "disabled": operators.listConcat(
                                              operators.ifThenElse(
                                                operators.notEqual(
                                                  nixScope
                                                    .module["disabledModules"],
                                                  [],
                                                ),
                                                () => [
                                                  {
                                                    "file":
                                                      nixScope.module["_file"],
                                                    "disabled":
                                                      nixScope
                                                        .module[
                                                          "disabledModules"
                                                        ],
                                                  },
                                                ],
                                                () => [],
                                              ),
                                              nixScope
                                                .collectedImports["disabled"],
                                            ),
                                          });
                                        })
                                      ),
                                    )
                                  ),
                                ),
                              )(nixScope.initialModules),
                            )
                          ))
                        ),
                      )
                    ))
                  ),
                );
              }));
            defGetter(nixScope, "filterModules", (nixScope) =>
              createFunc(/*arg:*/ "modulesPath", null, {}, (nixScope) => (
                createFunc({}, null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "keyFilter", (nixScope) =>
                      nixScope.filter(
                        createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                          operators.negate(
                            nixScope.isDisabled(nixScope.modulesPath)(
                              nixScope.disabled,
                            )(nixScope.attrs),
                          )
                        )),
                      ));
                    return nixScope.map(
                      createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                        nixScope.attrs["module"]
                      )),
                    )(nixScope.genericClosure(
                      {
                        "startSet": nixScope.keyFilter(nixScope.modules),
                        "operator": createFunc(
                          /*arg:*/ "attrs",
                          null,
                          {},
                          (nixScope) => (
                            nixScope.keyFilter(nixScope.attrs["modules"])
                          ),
                        ),
                      },
                    ));
                  })
                ))
              )));
            defGetter(nixScope, "toGraph", (nixScope) =>
              createFunc(/*arg:*/ "modulesPath", null, {}, (nixScope) => (
                createFunc({}, null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "isDisabledModule", (nixScope) =>
                      nixScope.isDisabled(nixScope.modulesPath)(
                        nixScope.disabled,
                      ));
                    defGetter(nixScope, "toModuleGraph", (nixScope) =>
                      createFunc(
                        /*arg:*/ "structuredModule",
                        null,
                        {},
                        (nixScope) => (
                          createScope((nixScope) => {
                            const obj = {};
                            obj.disabled = nixScope.isDisabledModule(
                              nixScope.structuredModule,
                            );
                            obj.key = nixScope.structuredModule.key;
                            obj.file =
                              nixScope.structuredModule["module"]["_file"];
                            obj.imports = nixScope.map(nixScope.toModuleGraph)(
                              nixScope.structuredModule["modules"],
                            );
                            return obj;
                          })
                        ),
                      ));
                    return nixScope.map(nixScope.toModuleGraph)(
                      nixScope.filter(
                        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                          operators.notEqual(
                            nixScope.x["key"],
                            "lib/modules.nix",
                          )
                        )),
                      )(nixScope.modules),
                    );
                  })
                ))
              )));
            return createFunc(/*arg:*/ "modulesPath", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "initialModules", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                  {
                    "modules": nixScope.filterModules(nixScope.modulesPath)(
                      nixScope.collectStructuredModules(nixScope.unknownModule)(
                        "",
                      )(nixScope.initialModules)(nixScope.args),
                    ),
                    "graph": nixScope.toGraph(nixScope.modulesPath)(
                      nixScope.collectStructuredModules(nixScope.unknownModule)(
                        "",
                      )(nixScope.initialModules)(nixScope.args),
                    ),
                  }
                ))
              ))
            ));
          })
        )),
    );
    defGetter(
      nixScope,
      "setDefaultModuleLocation",
      (nixScope) =>
        createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
            { "_file": nixScope.file, "imports": [nixScope.m] }
          ))
        )),
    );
    defGetter(
      nixScope,
      "unifyModuleSyntax",
      (nixScope) =>
        createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "key", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "addMeta", (nixScope) =>
                  createFunc(/*arg:*/ "config", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.hasAttr(nixScope.m, "meta"),
                      () => (nixScope.mkMerge([
                        nixScope.config,
                        { "meta": nixScope.m["meta"] },
                      ])),
                      () => (nixScope.config),
                    )
                  )));
                defGetter(nixScope, "addFreeformType", (nixScope) =>
                  createFunc(/*arg:*/ "config", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.hasAttr(nixScope.m, "freeformType"),
                      () => (nixScope.mkMerge([
                        nixScope.config,
                        createScope((nixScope) => {
                          const obj = {};
                          if (obj["_module"] === undefined) {
                            obj["_module"] = {};
                          }
                          obj["_module"]["freeformType"] =
                            nixScope.m["freeformType"];
                          return obj;
                        }),
                      ])),
                      () => (nixScope.config),
                    )
                  )));
                return (operators.ifThenElse(
                  operators.or(
                    operators.hasAttr(nixScope.m, "config"),
                    operators.hasAttr(nixScope.m, "options"),
                  ),
                  () => (/*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "badAttrs", (nixScope) =>
                      nixScope.removeAttrs(nixScope.m)([
                        "_class",
                        "_file",
                        "key",
                        "disabledModules",
                        "imports",
                        "options",
                        "config",
                        "meta",
                        "freeformType",
                      ]));
                    return (operators.ifThenElse(
                      operators.notEqual(nixScope.badAttrs, {}),
                      () => (nixScope.throw(
                        new InterpolatedString([
                          "Module `",
                          "' has an unsupported attribute `",
                          "'. This is caused by introducing a top-level `config' or `options' attribute. Add configuration attributes immediately on the top level instead, or move all of them (namely: ",
                          ") into the explicit `config' attribute.",
                        ], [
                          () => (nixScope.key),
                          () => (nixScope.head(
                            nixScope.attrNames(nixScope.badAttrs),
                          )),
                          () => (nixScope.toString(
                            nixScope.attrNames(nixScope.badAttrs),
                          )),
                        ]),
                      )),
                      () => ({
                        "_file": nixScope.toString(
                          operators.selectOrDefault(
                            nixScope.m,
                            ["_file"],
                            nixScope.file,
                          ),
                        ),
                        "_class": operators.selectOrDefault(nixScope.m, [
                          "_class",
                        ], null),
                        "key": nixScope.toString(
                          operators.selectOrDefault(
                            nixScope.m,
                            ["key"],
                            nixScope.key,
                          ),
                        ),
                        "disabledModules": operators.selectOrDefault(
                          nixScope.m,
                          ["disabledModules"],
                          [],
                        ),
                        "imports": operators.selectOrDefault(nixScope.m, [
                          "imports",
                        ], []),
                        "options": operators.selectOrDefault(nixScope.m, [
                          "options",
                        ], {}),
                        "config": nixScope.addFreeformType(
                          nixScope.addMeta(
                            operators.selectOrDefault(
                              nixScope.m,
                              ["config"],
                              {},
                            ),
                          ),
                        ),
                      }),
                    ));
                  })),
                  () => (nixScope.throwIfNot(nixScope.isAttrs(nixScope.m))(
                    new InterpolatedString([
                      "module ",
                      " (",
                      ") does not look like a module.",
                    ], [() => (nixScope.file), () => (nixScope.key)]),
                  )({
                    "_file": nixScope.toString(
                      operators.selectOrDefault(
                        nixScope.m,
                        ["_file"],
                        nixScope.file,
                      ),
                    ),
                    "_class": operators.selectOrDefault(
                      nixScope.m,
                      ["_class"],
                      null,
                    ),
                    "key": nixScope.toString(
                      operators.selectOrDefault(
                        nixScope.m,
                        ["key"],
                        nixScope.key,
                      ),
                    ),
                    "disabledModules": operators.selectOrDefault(nixScope.m, [
                      "disabledModules",
                    ], []),
                    "imports": operators.listConcat(
                      operators.selectOrDefault(nixScope.m, ["require"], []),
                      operators.selectOrDefault(nixScope.m, ["imports"], []),
                    ),
                    "options": {},
                    "config": nixScope.addFreeformType(
                      nixScope.removeAttrs(nixScope.m)([
                        "_class",
                        "_file",
                        "key",
                        "disabledModules",
                        "require",
                        "imports",
                        "freeformType",
                      ]),
                    ),
                  })),
                ));
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "applyModuleArgsIfFunction",
      (nixScope) =>
        createFunc(/*arg:*/ "key", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.isFunction(nixScope.f),
                () => (nixScope.applyModuleArgs(nixScope.key)(nixScope.f)(
                  nixScope.args,
                )),
                () => (nixScope.f),
              )
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "applyModuleArgs",
      (nixScope) =>
        createFunc(/*arg:*/ "key", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "context", (nixScope) =>
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    new InterpolatedString([
                      "while evaluating the module argument \\`",
                      "' in \"",
                      '":',
                    ], [() => (nixScope.name), () => (nixScope.key)])
                  )));
                defGetter(nixScope, "extraArgs", (nixScope) =>
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                        nixScope.addErrorContext(
                          nixScope.context(nixScope.name),
                        )(operators.selectOrDefault(
                          nixScope.args,
                          [nixScope.name],
                          nixScope.addErrorContext(
                            new InterpolatedString([
                              "noting that argument `",
                              "` is not externally provided, so querying `_module.args` instead, requiring `config`",
                            ], [() => (nixScope.name)]),
                          )(nixScope.config["_module"]["args"][nixScope.name]),
                        ))
                      ))
                    )),
                  )(nixScope.functionArgs(nixScope.f)));
                return nixScope.f(
                  operators.merge(nixScope.args, nixScope.extraArgs),
                );
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mergeModules",
      (nixScope) =>
        createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "modules", null, {}, (nixScope) => (
            nixScope["mergeModules'"](nixScope.prefix)(nixScope.modules)(
              nixScope.concatMap(
                createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                  nixScope.map(
                    createFunc(/*arg:*/ "config", null, {}, (nixScope) => (
                      { "file": nixScope.m["_file"], "config": nixScope.config }
                    )),
                  )(nixScope.pushDownProperties(nixScope.m["config"]))
                )),
              )(nixScope.modules),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "mergeModules'",
      (nixScope) =>
        createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "modules", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "configs", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "declsByName", (nixScope) =>
                  nixScope.zipAttrsWith(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.v
                      ))
                    )),
                  )(
                    nixScope.map(
                      createFunc(/*arg:*/ "module", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "subtree", (nixScope) =>
                            nixScope.module["options"]);
                          return (operators.ifThenElse(
                            operators.negate(
                              nixScope.isAttrs(nixScope.subtree),
                            ),
                            () => (nixScope.throw(
                              new InterpolatedString([
                                "\n              An option declaration for \\`",
                                "' has type\n              \\`",
                                "' rather than an attribute set.\n              Did you mean to define this outside of \\`options'?\n            ",
                              ], [
                                () => (nixScope.concatStringsSep(".")(
                                  nixScope.prefix,
                                )),
                                () => (nixScope.typeOf(nixScope.subtree)),
                              ]),
                            )),
                            () => (nixScope.mapAttrs(
                              createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                                createFunc(
                                  /*arg:*/ "option",
                                  null,
                                  {},
                                  (nixScope) => (
                                    createScope((nixScope) => {
                                      const obj = {};
                                      obj._file = nixScope.module._file;
                                      obj.pos = nixScope.unsafeGetAttrPos(
                                        nixScope.n,
                                      )(nixScope.subtree);
                                      obj.options = nixScope.option;
                                      return obj;
                                    })
                                  ),
                                )
                              )),
                            )(nixScope.subtree)),
                          ));
                        })
                      )),
                    )(nixScope.modules),
                  ));
                defGetter(nixScope, "checkedConfigs", (nixScope) =>
                  ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          "all (\n          c:\n          # TODO: I have my doubts that this error would occur when option definitions are not matched.\n          #       The implementation of this check used to be tied to a superficially similar check for\n          #       options, so maybe that's why this is here.\n          isAttrs c.config\n          || throw ''\n            In module `${c.file}', you're trying to define a value of type `${typeOf c.config}'\n            rather than an attribute set for the option\n            `${concatStringsSep \".\" prefix}'!\n\n            This usually happens if `${concatStringsSep \".\" prefix}' has option\n            definitions inside that are not matched. Please check how to properly define\n            this option by e.g. referring to `man 5 configuration.nix'!\n          ''\n        ) configs",
                      );
                    }
                    return nixScope.configs;
                  })(
                    nixScope.all(
                      createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
                        operators.or(
                          nixScope.isAttrs(nixScope.c["config"]),
                          nixScope.throw(
                            new InterpolatedString([
                              "\n            In module \\`",
                              "', you're trying to define a value of type \\`",
                              "'\n            rather than an attribute set for the option\n            \\`",
                              "'!\n\n            This usually happens if \\`",
                              "' has option\n            definitions inside that are not matched. Please check how to properly define\n            this option by e.g. referring to \\`man 5 configuration.nix'!\n          ",
                            ], [
                              () => (nixScope.c["file"]),
                              () => (nixScope.typeOf(nixScope.c["config"])),
                              () => (nixScope.concatStringsSep(".")(
                                nixScope.prefix,
                              )),
                              () => (nixScope.concatStringsSep(".")(
                                nixScope.prefix,
                              )),
                            ]),
                          ),
                        )
                      )),
                    )(nixScope.configs),
                  ));
                defGetter(nixScope, "pushedDownDefinitionsByName", (nixScope) =>
                  nixScope.zipAttrsWith(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      nixScope.concatLists
                    )),
                  )(
                    nixScope.map(
                      createFunc(/*arg:*/ "module", null, {}, (nixScope) => (
                        nixScope.mapAttrs(
                          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "value",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.map(
                                  createFunc(
                                    /*arg:*/ "config",
                                    null,
                                    {},
                                    (nixScope) => (
                                      createScope((nixScope) => {
                                        const obj = {};
                                        obj.file = nixScope.module.file;
                                        obj.config = nixScope.config;
                                        return obj;
                                      })
                                    ),
                                  ),
                                )(nixScope.pushDownProperties(nixScope.value))
                              ),
                            )
                          )),
                        )(nixScope.module["config"])
                      )),
                    )(nixScope.checkedConfigs),
                  ));
                defGetter(nixScope, "rawDefinitionsByName", (nixScope) =>
                  nixScope.zipAttrsWith(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.v
                      ))
                    )),
                  )(
                    nixScope.map(
                      createFunc(/*arg:*/ "module", null, {}, (nixScope) => (
                        nixScope.mapAttrs(
                          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "value",
                              null,
                              {},
                              (nixScope) => (
                                createScope((nixScope) => {
                                  const obj = {};
                                  obj.file = nixScope.module.file;
                                  obj.value = nixScope.value;
                                  return obj;
                                })
                              ),
                            )
                          )),
                        )(nixScope.module["config"])
                      )),
                    )(nixScope.checkedConfigs),
                  ));
                defGetter(nixScope, "optionTreeToOption", (nixScope) =>
                  createFunc(/*arg:*/ "decl", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      nixScope.isOption(nixScope.decl["options"]),
                      () => (nixScope.decl),
                      () => (operators.merge(nixScope.decl, {
                        "options": nixScope.mkOption(
                          {
                            "type": nixScope.types["submoduleWith"](
                              {
                                "modules": [
                                  { "options": nixScope.decl["options"] },
                                ],
                                "shorthandOnlyDefinesConfig": null,
                              },
                            ),
                          },
                        ),
                      })),
                    )
                  )));
                defGetter(nixScope, "resultsByName", (nixScope) =>
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "decls", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "loc", (nixScope) =>
                            operators.listConcat(nixScope.prefix, [
                              nixScope.name,
                            ]));
                          defGetter(nixScope, "defns", (nixScope) =>
                            operators.selectOrDefault(
                              nixScope.pushedDownDefinitionsByName,
                              [nixScope.name],
                              [],
                            ));
                          defGetter(nixScope, "defns'", (nixScope) =>
                            operators.selectOrDefault(
                              nixScope.rawDefinitionsByName,
                              [nixScope.name],
                              [],
                            ));
                          defGetter(nixScope, "optionDecls", (nixScope) =>
                            nixScope.filter(
                              createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                                operators.and(
                                  operators.hasAttr(
                                    nixScope.m["options"],
                                    "_type",
                                  ),
                                  operators.or(
                                    operators.equal(
                                      nixScope.m["options"]["_type"],
                                      "option",
                                    ),
                                    nixScope.throwDeclarationTypeError(
                                      nixScope.loc,
                                    )(nixScope.m["options"]["_type"])(
                                      nixScope.m["_file"],
                                    ),
                                  ),
                                )
                              )),
                            )(nixScope.decls));
                          return (operators.ifThenElse(
                            operators.equal(
                              nixScope.length(nixScope.optionDecls),
                              nixScope.length(nixScope.decls),
                            ),
                            () => (/*let*/ createScope((nixScope) => {
                              defGetter(nixScope, "opt", (nixScope) =>
                                nixScope.fixupOptionType(nixScope.loc)(
                                  nixScope.mergeOptionDecls(nixScope.loc)(
                                    nixScope.decls,
                                  ),
                                ));
                              return ({
                                "matchedOptions": nixScope.evalOptionValue(
                                  nixScope.loc,
                                )(nixScope.opt)(nixScope["defns'"]),
                                "unmatchedDefns": [],
                              });
                            })),
                            () => (operators.ifThenElse(
                              operators.notEqual(nixScope.optionDecls, []),
                              () => (operators.ifThenElse(
                                nixScope.all(
                                  createFunc(
                                    /*arg:*/ "x",
                                    null,
                                    {},
                                    (nixScope) => (
                                      operators.equal(
                                        operators.selectOrDefault(nixScope.x, [
                                          "options",
                                          "type",
                                          "name",
                                        ], null),
                                        "submodule",
                                      )
                                    ),
                                  ),
                                )(nixScope.optionDecls),
                                () => (/*let*/ createScope((nixScope) => {
                                  defGetter(nixScope, "opt", (nixScope) =>
                                    nixScope.fixupOptionType(nixScope.loc)(
                                      nixScope.mergeOptionDecls(nixScope.loc)(
                                        nixScope.map(
                                          nixScope.optionTreeToOption,
                                        )(nixScope.decls),
                                      ),
                                    ));
                                  return ({
                                    "matchedOptions": nixScope.evalOptionValue(
                                      nixScope.loc,
                                    )(nixScope.opt)(nixScope["defns'"]),
                                    "unmatchedDefns": [],
                                  });
                                })),
                                () => (/*let*/ createScope((nixScope) => {
                                  defGetter(
                                    nixScope,
                                    "nonOptions",
                                    (nixScope) =>
                                      nixScope.filter(
                                        createFunc(
                                          /*arg:*/ "m",
                                          null,
                                          {},
                                          (nixScope) => (
                                            operators.negate(
                                              nixScope.isOption(
                                                nixScope.m["options"],
                                              ),
                                            )
                                          ),
                                        ),
                                      )(nixScope.decls),
                                  );
                                  return nixScope.throw(
                                    new InterpolatedString([
                                      "The option `",
                                      "' in module `",
                                      "' would be a parent of the following options, but its type `",
                                      "' does not support nested options.",
                                      "",
                                    ], [
                                      () => (nixScope.showOption(nixScope.loc)),
                                      () => ((nixScope.head(
                                        nixScope.optionDecls,
                                      ))["_file"]),
                                      () => (operators.selectOrDefault(
                                        nixScope.head(nixScope.optionDecls),
                                        ["options", "type", "description"],
                                        "<no description>",
                                      )),
                                      () => (nixScope.showRawDecls(
                                        nixScope.loc,
                                      )(nixScope.nonOptions)),
                                    ]),
                                  );
                                })),
                              )),
                              () => (nixScope["mergeModules'"](nixScope.loc)(
                                nixScope.decls,
                              )(nixScope.defns)),
                            )),
                          ));
                        })
                      ))
                    )),
                  )(nixScope.declsByName));
                defGetter(nixScope, "matchedOptions", (nixScope) =>
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.v["matchedOptions"]
                      ))
                    )),
                  )(nixScope.resultsByName));
                defGetter(nixScope, "unmatchedDefnsByName", (nixScope) =>
                  operators.merge(
                    nixScope.mapAttrs(
                      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                          nixScope.v["unmatchedDefns"]
                        ))
                      )),
                    )(nixScope.resultsByName),
                    nixScope.removeAttrs(nixScope.rawDefinitionsByName)(
                      nixScope.attrNames(nixScope.matchedOptions),
                    ),
                  ));
                return ({
                  "matchedOptions": nixScope.matchedOptions,
                  "unmatchedDefns":
                    (operators.ifThenElse(
                      operators.equal(nixScope.configs, []),
                      () => [],
                      () => (nixScope.concatLists(
                        nixScope.mapAttrsToList(
                          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "defs",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.map(
                                  createFunc(
                                    /*arg:*/ "def",
                                    null,
                                    {},
                                    (nixScope) => (
                                      operators.merge(
                                        nixScope.def,
                                        {
                                          "prefix": operators.listConcat(
                                            [nixScope.name],
                                            operators.selectOrDefault(
                                              nixScope.def,
                                              ["prefix"],
                                              [],
                                            ),
                                          ),
                                        },
                                      )
                                    ),
                                  ),
                                )(nixScope.defs)
                              ),
                            )
                          )),
                        )(nixScope.unmatchedDefnsByName),
                      )),
                    )),
                });
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "throwDeclarationTypeError",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "actualTag", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "name", (nixScope) =>
                  nixScope.lib["strings"]["escapeNixIdentifier"](
                    nixScope.lib["lists"]["last"](nixScope.loc),
                  ));
                defGetter(
                  nixScope,
                  "path",
                  (nixScope) => nixScope.showOption(nixScope.loc),
                );
                defGetter(
                  nixScope,
                  "depth",
                  (nixScope) => nixScope.length(nixScope.loc),
                );
                defGetter(nixScope, "paragraphs", (nixScope) =>
                  operators.listConcat(
                    [
                      new InterpolatedString([
                        "In module ",
                        ": expected an option declaration at option path `",
                        "` but got an attribute set with type ",
                        "",
                      ], [
                        () => (nixScope.file),
                        () => (nixScope.path),
                        () => (nixScope.actualTag),
                      ]),
                    ],
                    nixScope.optional(
                      operators.equal(nixScope.actualTag, "option-type"),
                    )(
                      new InterpolatedString([
                        "\n        When declaring an option, you must wrap the type in a \\`mkOption\\` call. It should look somewhat like:\n            ",
                        "\n            ",
                        " = lib.mkOption {\n              description = ...;\n              type = <the type you wrote for ",
                        ">;\n              ...\n            };\n      ",
                      ], [
                        () => (nixScope.comment),
                        () => (nixScope.name),
                        () => (nixScope.name),
                      ]),
                    ),
                  ));
                defGetter(
                  nixScope,
                  "comment",
                  (nixScope) =>
                    nixScope.optionalString(
                      operators.greaterThan(nixScope.depth, 1n),
                    )(
                      new InterpolatedString(["    # ", ""], [
                        () => (nixScope.showOption(nixScope.loc)),
                      ]),
                    ),
                );
                return nixScope.throw(
                  nixScope.concatStringsSep("")(nixScope.paragraphs),
                );
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mergeOptionDecls",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "opts", null, {}, (nixScope) => (
            nixScope["foldl'"](
              createFunc(/*arg:*/ "res", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "t", (nixScope) =>
                      nixScope.res["type"]);
                    defGetter(nixScope, "t'", (nixScope) =>
                      nixScope.opt["options"]["type"]);
                    defGetter(nixScope, "mergedType", (nixScope) =>
                      nixScope.t["typeMerge"](nixScope["t'"]["functor"]));
                    defGetter(nixScope, "typesMergeable", (nixScope) =>
                      operators.notEqual(nixScope.mergedType, null));
                    defGetter(nixScope, "addDeprecatedWrapped", (nixScope) =>
                      createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
                        operators.merge(
                          nixScope.t,
                          {
                            "functor": operators.merge(
                              nixScope.t["functor"],
                              {
                                "wrapped": nixScope.t["functor"]
                                  ["wrappedDeprecationMessage"](
                                    { "loc": nixScope.loc },
                                  ),
                              },
                            ),
                          },
                        )
                      )));
                    defGetter(
                      nixScope,
                      "typeSet",
                      (
                        nixScope,
                      ) => (operators.ifThenElse(
                        operators.hasAttr(nixScope.opt["options"], "type"),
                        () => (operators.ifThenElse(
                          operators.hasAttr(nixScope.res, "type"),
                          () => (operators.ifThenElse(
                            nixScope.typesMergeable,
                            () => ({
                              "type":
                                (operators.ifThenElse(
                                  operators.hasAttrPath(
                                    nixScope.mergedType,
                                    "functor",
                                    "wrappedDeprecationMessage",
                                  ),
                                  () => (nixScope.addDeprecatedWrapped(
                                    nixScope.mergedType,
                                  )),
                                  () => (nixScope.mergedType),
                                )),
                            }),
                            () => (nixScope.throw(
                              new InterpolatedString([
                                "The option `",
                                "' in `",
                                "' is already declared in ",
                                ".",
                              ], [
                                () => (nixScope.showOption(nixScope.loc)),
                                () => (nixScope.opt["_file"]),
                                () => (nixScope.showFiles(
                                  nixScope.res["declarations"],
                                )),
                              ]),
                            )),
                          )),
                          () => (operators.ifThenElse(
                            operators.hasAttrPath(
                              nixScope.opt["options"]["type"],
                              "functor",
                              "wrappedDeprecationMessage",
                            ),
                            () => ({
                              "type": nixScope.addDeprecatedWrapped(
                                nixScope.opt["options"]["type"],
                              ),
                            }),
                            () => ({}),
                          )),
                        )),
                        () => ({}),
                      )),
                    );
                    defGetter(nixScope, "bothHave", (nixScope) =>
                      createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                        operators.and(
                          operators.hasAttr(
                            nixScope.opt["options"],
                            nixScope.k,
                          ),
                          operators.hasAttr(nixScope.res, nixScope.k),
                        )
                      )));
                    return (operators.ifThenElse(
                      operators.or(
                        operators.or(
                          operators.or(
                            nixScope.bothHave("default"),
                            nixScope.bothHave("example"),
                          ),
                          nixScope.bothHave("description"),
                        ),
                        nixScope.bothHave("apply"),
                      ),
                      () => (nixScope.throw(
                        new InterpolatedString([
                          "The option `",
                          "' in `",
                          "' is already declared in ",
                          ".",
                        ], [
                          () => (nixScope.showOption(nixScope.loc)),
                          () => (nixScope.opt["_file"]),
                          () => (nixScope.showFiles(
                            nixScope.res["declarations"],
                          )),
                        ]),
                      )),
                      () => (/*let*/ createScope((nixScope) => {
                        defGetter(nixScope, "getSubModules", (nixScope) =>
                          operators.selectOrDefault(nixScope.opt, [
                            "options",
                            "type",
                            "getSubModules",
                          ], null));
                        defGetter(
                          nixScope,
                          "submodules",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            operators.notEqual(nixScope.getSubModules, null),
                            () => (operators.listConcat(
                              nixScope.map(
                                nixScope.setDefaultModuleLocation(
                                  nixScope.opt["_file"],
                                ),
                              )(nixScope.getSubModules),
                              nixScope.res["options"],
                            )),
                            () => (nixScope.res["options"]),
                          )),
                        );
                        return operators.merge(
                          nixScope.opt["options"],
                          operators.merge(
                            nixScope.res,
                            operators.merge({
                              "declarations": operators.listConcat(
                                nixScope.res["declarations"],
                                [nixScope.opt["_file"]],
                              ),
                              "declarationPositions": operators.listConcat(
                                nixScope.res["declarationPositions"],
                                operators.ifThenElse(
                                  operators.notEqual(nixScope.opt["pos"], null),
                                  () => [nixScope.opt["pos"]],
                                  () => [
                                    {
                                      "file": nixScope.opt["_file"],
                                      "line": null,
                                      "column": null,
                                    },
                                  ],
                                ),
                              ),
                              "options": nixScope.submodules,
                            }, nixScope.typeSet),
                          ),
                        );
                      })),
                    ));
                  })
                ))
              )),
            )({
              "loc": nixScope.loc,
              "declarations": [],
              "declarationPositions": [],
              "options": [],
            })(nixScope.opts)
          ))
        )),
    );
    defGetter(
      nixScope,
      "evalOptionValue",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "defs'", (nixScope) =>
                  operators.listConcat(
                    nixScope.optional(
                      operators.hasAttr(nixScope.opt, "default"),
                    )({
                      "file": nixScope.head(nixScope.opt["declarations"]),
                      "value": nixScope.mkOptionDefault(
                        nixScope.opt["default"],
                      ),
                    }),
                    nixScope.defs,
                  ));
                defGetter(
                  nixScope,
                  "res",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.and(
                      operators.selectOrDefault(
                        nixScope.opt,
                        ["readOnly"],
                        false,
                      ),
                      operators.greaterThan(
                        nixScope.length(nixScope["defs'"]),
                        1n,
                      ),
                    ),
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "separateDefs", (nixScope) =>
                        nixScope.map(
                          createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                            operators.merge(
                              nixScope.def,
                              {
                                "value":
                                  (nixScope.mergeDefinitions(nixScope.loc)(
                                    nixScope.opt["type"],
                                  )([nixScope.def]))["mergedValue"],
                              },
                            )
                          )),
                        )(nixScope["defs'"]));
                      return nixScope.throw(
                        new InterpolatedString([
                          "The option `",
                          "' is read-only, but it's set multiple times. Definition values:",
                          "",
                        ], [
                          () => (nixScope.showOption(nixScope.loc)),
                          () => (nixScope.showDefs(nixScope.separateDefs)),
                        ]),
                      );
                    })),
                    () => (nixScope.mergeDefinitions(nixScope.loc)(
                      nixScope.opt["type"],
                    )(nixScope["defs'"])),
                  )),
                );
                defGetter(
                  nixScope,
                  "value",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.hasAttr(nixScope.opt, "apply"),
                    () => (nixScope.opt["apply"](nixScope.res["mergedValue"])),
                    () => (nixScope.res["mergedValue"]),
                  )),
                );
                defGetter(nixScope, "warnDeprecation", (nixScope) =>
                  nixScope.warnIf(
                    operators.notEqual(
                      nixScope.opt["type"]["deprecationMessage"],
                      null,
                    ),
                  )(
                    new InterpolatedString([
                      "The type `types.",
                      "' of option `",
                      "' defined in ",
                      " is deprecated. ",
                      "",
                    ], [
                      () => (nixScope.opt["type"]["name"]),
                      () => (nixScope.showOption(nixScope.loc)),
                      () => (nixScope.showFiles(nixScope.opt["declarations"])),
                      () => (nixScope.opt["type"]["deprecationMessage"]),
                    ]),
                  ));
                return operators.merge(
                  nixScope.warnDeprecation(nixScope.opt),
                  createScope((nixScope) => {
                    const obj = {};
                    obj.value = nixScope.addErrorContext(
                      new InterpolatedString([
                        "while evaluating the option `",
                        "':",
                      ], [() => (nixScope.showOption(nixScope.loc))]),
                    )(nixScope.value);
                    obj.highestPrio = nixScope.res["defsFinal'"].highestPrio;
                    obj.definitions = nixScope.map(
                      createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                        nixScope.def["value"]
                      )),
                    )(nixScope.res["defsFinal"]);
                    obj.files = nixScope.map(
                      createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                        nixScope.def["file"]
                      )),
                    )(nixScope.res["defsFinal"]);
                    obj.definitionsWithLocations = nixScope.res["defsFinal"];
                    obj.isDefined = nixScope.res.isDefined;
                    obj.__toString = createFunc(
                      /*arg:*/ "_",
                      null,
                      {},
                      (nixScope) => (
                        nixScope.showOption(nixScope.loc)
                      ),
                    );
                    return obj;
                  }),
                );
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mergeDefinitions",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              /*rec*/ createScope((nixScope) => {
                defGetter(nixScope, "defsFinal'", (nixScope) =>
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "defs'", (nixScope) =>
                      nixScope.concatMap(
                        createFunc(/*arg:*/ "m", null, {}, (nixScope) => (
                          nixScope.map(
                            createFunc(
                              /*arg:*/ "value",
                              null,
                              {},
                              (nixScope) => (
                                operators.ifThenElse(
                                  operators.equal(
                                    operators.selectOrDefault(nixScope.value, [
                                      "_type",
                                    ], null),
                                    "definition",
                                  ),
                                  () => (nixScope.value),
                                  () => (createScope((nixScope) => {
                                    const obj = {};
                                    obj.file = nixScope.m.file;
                                    obj.value = nixScope.value;
                                    return obj;
                                  })),
                                )
                              ),
                            ),
                          )(
                            nixScope.addErrorContext(
                              new InterpolatedString([
                                "while evaluating definitions from `",
                                "':",
                              ], [() => (nixScope.m["file"])]),
                            )(nixScope.dischargeProperties(
                              nixScope.m["value"],
                            )),
                          )
                        )),
                      )(nixScope.defs));
                    defGetter(
                      nixScope,
                      "defs''",
                      (nixScope) =>
                        nixScope["filterOverrides'"](nixScope["defs'"]),
                    );
                    defGetter(
                      nixScope,
                      "defs'''",
                      (
                        nixScope,
                      ) => (operators.ifThenElse(
                        nixScope.any(
                          createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                            operators.equal(
                              operators.selectOrDefault(nixScope.def, [
                                "value",
                                "_type",
                              ], ""),
                              "order",
                            )
                          )),
                        )(nixScope["defs''"]["values"]),
                        () => (nixScope.sortProperties(
                          nixScope["defs''"]["values"],
                        )),
                        () => (nixScope["defs''"]["values"]),
                      )),
                    );
                    return createScope((nixScope) => {
                      const obj = {};
                      obj.values = nixScope["defs'''"];
                      obj.highestPrio = nixScope["defs''"].highestPrio;
                      return obj;
                    });
                  }));
                defGetter(
                  nixScope,
                  "defsFinal",
                  (nixScope) => nixScope["defsFinal'"]["values"],
                );
                defGetter(
                  nixScope,
                  "mergedValue",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    nixScope.isDefined,
                    () => (operators.ifThenElse(
                      nixScope.all(
                        createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                          nixScope.type["check"](nixScope.def["value"])
                        )),
                      )(nixScope.defsFinal),
                      () => (nixScope.type["merge"](nixScope.loc)(
                        nixScope.defsFinal,
                      )),
                      () => (/*let*/ createScope((nixScope) => {
                        defGetter(nixScope, "allInvalid", (nixScope) =>
                          nixScope.filter(
                            createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                              operators.negate(
                                nixScope.type["check"](nixScope.def["value"]),
                              )
                            )),
                          )(nixScope.defsFinal));
                        return nixScope.throw(
                          new InterpolatedString([
                            "A definition for option `",
                            "' is not of type `",
                            "'. Definition values:",
                            "",
                          ], [
                            () => (nixScope.showOption(nixScope.loc)),
                            () => (nixScope.type["description"]),
                            () => (nixScope.showDefs(nixScope.allInvalid)),
                          ]),
                        );
                      })),
                    )),
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "The option `",
                        "' was accessed but has no value defined. Try setting the option.",
                      ], [() => (nixScope.showOption(nixScope.loc))]),
                    )),
                  )),
                );
                defGetter(
                  nixScope,
                  "isDefined",
                  (nixScope) => operators.notEqual(nixScope.defsFinal, []),
                );
                defGetter(
                  nixScope,
                  "optionalValue",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    nixScope.isDefined,
                    () => ({ "value": nixScope.mergedValue }),
                    () => ({}),
                  )),
                );
                return nixScope;
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "pushDownProperties",
      (nixScope) =>
        createFunc(/*arg:*/ "cfg", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(
              operators.selectOrDefault(nixScope.cfg, ["_type"], ""),
              "merge",
            ),
            () => (nixScope.concatMap(nixScope.pushDownProperties)(
              nixScope.cfg["contents"],
            )),
            () => (operators.ifThenElse(
              operators.equal(
                operators.selectOrDefault(nixScope.cfg, ["_type"], ""),
                "if",
              ),
              () => (nixScope.map(
                nixScope.mapAttrs(
                  createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      nixScope.mkIf(nixScope.cfg["condition"])(nixScope.v)
                    ))
                  )),
                ),
              )(nixScope.pushDownProperties(nixScope.cfg["content"]))),
              () => (operators.ifThenElse(
                operators.equal(
                  operators.selectOrDefault(nixScope.cfg, ["_type"], ""),
                  "override",
                ),
                () => (nixScope.map(
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.mkOverride(nixScope.cfg["priority"])(
                          nixScope.v,
                        )
                      ))
                    )),
                  ),
                )(nixScope.pushDownProperties(nixScope.cfg["content"]))),
                () => [nixScope.cfg],
              )),
            )),
          )
        )),
    );
    defGetter(
      nixScope,
      "dischargeProperties",
      (nixScope) =>
        createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(
              operators.selectOrDefault(nixScope.def, ["_type"], ""),
              "merge",
            ),
            () => (nixScope.concatMap(nixScope.dischargeProperties)(
              nixScope.def["contents"],
            )),
            () => (operators.ifThenElse(
              operators.equal(
                operators.selectOrDefault(nixScope.def, ["_type"], ""),
                "if",
              ),
              () => (operators.ifThenElse(
                nixScope.isBool(nixScope.def["condition"]),
                () => (operators.ifThenElse(
                  nixScope.def["condition"],
                  () => (nixScope.dischargeProperties(nixScope.def["content"])),
                  () => [],
                )),
                () => (nixScope.throw(
                  "‘mkIf’ called with a non-Boolean condition",
                )),
              )),
              () => [nixScope.def],
            )),
          )
        )),
    );
    defGetter(
      nixScope,
      "filterOverrides",
      (nixScope) =>
        createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
          (nixScope["filterOverrides'"](nixScope.defs))["values"]
        )),
    );
    defGetter(
      nixScope,
      "filterOverrides'",
      (nixScope) =>
        createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "getPrio", (nixScope) =>
              createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(
                    operators.selectOrDefault(
                      nixScope.def,
                      ["value", "_type"],
                      "",
                    ),
                    "override",
                  ),
                  () => (nixScope.def["value"]["priority"]),
                  () => (nixScope.defaultOverridePriority),
                )
              )));
            defGetter(nixScope, "highestPrio", (nixScope) =>
              nixScope["foldl'"](
                createFunc(/*arg:*/ "prio", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                    nixScope.min(nixScope.getPrio(nixScope.def))(nixScope.prio)
                  ))
                )),
              )(9999n)(nixScope.defs));
            defGetter(nixScope, "strip", (nixScope) =>
              createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(
                    operators.selectOrDefault(
                      nixScope.def,
                      ["value", "_type"],
                      "",
                    ),
                    "override",
                  ),
                  () => (operators.merge(
                    nixScope.def,
                    { "value": nixScope.def["value"]["content"] },
                  )),
                  () => (nixScope.def),
                )
              )));
            return ({
              "values": nixScope.concatMap(
                createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.equal(
                      nixScope.getPrio(nixScope.def),
                      nixScope.highestPrio,
                    ),
                    () => [nixScope.strip(nixScope.def)],
                    () => [],
                  )
                )),
              )(nixScope.defs),
              "highestPrio": nixScope.highestPrio,
            });
          })
        )),
    );
    defGetter(
      nixScope,
      "sortProperties",
      (nixScope) =>
        createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "strip", (nixScope) =>
              createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(
                    operators.selectOrDefault(
                      nixScope.def,
                      ["value", "_type"],
                      "",
                    ),
                    "order",
                  ),
                  () => (operators.merge(
                    nixScope.def,
                    createScope((nixScope) => {
                      const obj = {};
                      obj.value = nixScope.def["value"]["content"];
                      obj.priority = nixScope.def["value"].priority;
                      return obj;
                    }),
                  )),
                  () => (nixScope.def),
                )
              )));
            defGetter(
              nixScope,
              "defs'",
              (nixScope) => nixScope.map(nixScope.strip)(nixScope.defs),
            );
            defGetter(nixScope, "compare", (nixScope) =>
              createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                  operators.lessThan(
                    operators.selectOrDefault(
                      nixScope.a,
                      ["priority"],
                      nixScope.defaultOrderPriority,
                    ),
                    operators.selectOrDefault(
                      nixScope.b,
                      ["priority"],
                      nixScope.defaultOrderPriority,
                    ),
                  )
                ))
              )));
            return nixScope.sort(nixScope.compare)(nixScope["defs'"]);
          })
        )),
    );
    defGetter(
      nixScope,
      "fixupOptionType",
      (nixScope) =>
        createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.equal(
                operators.selectOrDefault(nixScope.opt, [
                  "type",
                  "getSubModules",
                ], null),
                null,
              ),
              () => (operators.merge(
                nixScope.opt,
                {
                  "type": operators.selectOrDefault(
                    nixScope.opt,
                    ["type"],
                    nixScope.types["unspecified"],
                  ),
                },
              )),
              () => (operators.merge(
                nixScope.opt,
                {
                  "type": nixScope.opt["type"]["substSubModules"](
                    nixScope.opt["options"],
                  ),
                  "options": [],
                },
              )),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "mergeAttrDefinitionsWithPrio",
      (nixScope) =>
        createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "defsByAttr", (nixScope) =>
              nixScope.zipAttrs(
                nixScope.concatLists(
                  nixScope.concatMap(createFunc({}, "def", {}, (nixScope) => (
                    nixScope.map(
                      nixScope.mapAttrsToList(
                        createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            createScope((nixScope) => {
                              const obj = {};
                              obj[nixScope.k] = operators.merge(
                                nixScope.def,
                                { "value": nixScope.value },
                              );
                              return obj;
                            })
                          ))
                        )),
                      ),
                    )(nixScope.pushDownProperties(nixScope.value))
                  )))(nixScope.opt["definitionsWithLocations"]),
                ),
              ));
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'opt.type.name == "attrsOf" || opt.type.name == "lazyAttrsOf"',
                );
              }
              return nixScope.mapAttrs(
                createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "merging", (nixScope) =>
                        nixScope.mergeDefinitions(
                          operators.listConcat(nixScope.opt["loc"], [
                            nixScope.k,
                          ]),
                        )(nixScope.opt["type"]["nestedTypes"]["elemType"])(
                          nixScope.v,
                        ));
                      return createScope((nixScope) => {
                        const obj = {};
                        obj.value = nixScope.merging["mergedValue"];
                        obj.highestPrio =
                          nixScope.merging["defsFinal'"].highestPrio;
                        return obj;
                      });
                    })
                  ))
                )),
              )(nixScope.defsByAttr);
            })(
              operators.or(
                operators.equal(nixScope.opt["type"]["name"], "attrsOf"),
                operators.equal(nixScope.opt["type"]["name"], "lazyAttrsOf"),
              ),
            );
          })
        )),
    );
    defGetter(
      nixScope,
      "mkIf",
      (nixScope) =>
        createFunc(/*arg:*/ "condition", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
            {
              "_type": "if",
              "condition": nixScope.condition,
              "content": nixScope.content,
            }
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkAssert",
      (nixScope) =>
        createFunc(/*arg:*/ "assertion", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "message", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
              nixScope.mkIf(
                operators.ifThenElse(
                  nixScope.assertion,
                  () => (true),
                  () => (nixScope.throw(
                    new InterpolatedString(["Failed assertion: ", ""], [
                      () => (nixScope.message),
                    ]),
                  )),
                ),
              )(nixScope.content)
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkMerge",
      (nixScope) =>
        createFunc(/*arg:*/ "contents", null, {}, (nixScope) => (
          { "_type": "merge", "contents": nixScope.contents }
        )),
    );
    defGetter(
      nixScope,
      "mkDefinition",
      (nixScope) =>
        createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
          operators.merge(nixScope.args, { "_type": "definition" })
        )),
    );
    defGetter(
      nixScope,
      "mkOverride",
      (nixScope) =>
        createFunc(/*arg:*/ "priority", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
            {
              "_type": "override",
              "priority": nixScope.priority,
              "content": nixScope.content,
            }
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkOptionDefault",
      (nixScope) => nixScope.mkOverride(1500n),
    );
    defGetter(nixScope, "mkDefault", (nixScope) => nixScope.mkOverride(1000n));
    defGetter(
      nixScope,
      "mkImageMediaOverride",
      (nixScope) => nixScope.mkOverride(60n),
    );
    defGetter(nixScope, "mkForce", (nixScope) => nixScope.mkOverride(50n));
    defGetter(nixScope, "mkVMOverride", (nixScope) => nixScope.mkOverride(10n));
    defGetter(
      nixScope,
      "defaultPriority",
      (nixScope) =>
        nixScope.warnIf(nixScope.oldestSupportedReleaseIsAtLeast(2305n))(
          "lib.modules.defaultPriority is deprecated, please use lib.modules.defaultOverridePriority instead.",
        )(nixScope.defaultOverridePriority),
    );
    defGetter(
      nixScope,
      "mkFixStrictness",
      (nixScope) =>
        nixScope.warn(
          "lib.mkFixStrictness has no effect and will be removed. It returns its argument unmodified, so you can just remove any calls.",
        )(nixScope.id),
    );
    defGetter(
      nixScope,
      "mkOrder",
      (nixScope) =>
        createFunc(/*arg:*/ "priority", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
            {
              "_type": "order",
              "priority": nixScope.priority,
              "content": nixScope.content,
            }
          ))
        )),
    );
    defGetter(nixScope, "mkBefore", (nixScope) => nixScope.mkOrder(500n));
    defGetter(nixScope, "mkAfter", (nixScope) => nixScope.mkOrder(1500n));
    defGetter(
      nixScope,
      "mkAliasDefinitions",
      (nixScope) => nixScope.mkAliasAndWrapDefinitions(nixScope.id),
    );
    defGetter(
      nixScope,
      "mkAliasAndWrapDefinitions",
      (nixScope) =>
        createFunc(/*arg:*/ "wrap", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "option", null, {}, (nixScope) => (
            nixScope.mkAliasIfDef(nixScope.option)(
              nixScope.wrap(nixScope.mkMerge(nixScope.option["definitions"])),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkAliasAndWrapDefsWithPriority",
      (nixScope) =>
        createFunc(/*arg:*/ "wrap", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "option", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "prio", (nixScope) =>
                operators.selectOrDefault(
                  nixScope.option,
                  ["highestPrio"],
                  nixScope.defaultOverridePriority,
                ));
              defGetter(nixScope, "defsWithPrio", (nixScope) =>
                nixScope.map(nixScope.mkOverride(nixScope.prio))(
                  nixScope.option["definitions"],
                ));
              return nixScope.mkAliasIfDef(nixScope.option)(
                nixScope.wrap(nixScope.mkMerge(nixScope.defsWithPrio)),
              );
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkAliasIfDef",
      (nixScope) =>
        createFunc(/*arg:*/ "option", null, {}, (nixScope) => (
          nixScope.mkIf(
            operators.and(
              nixScope.isOption(nixScope.option),
              nixScope.option["isDefined"],
            ),
          )
        )),
    );
    defGetter(
      nixScope,
      "fixMergeModules",
      (nixScope) =>
        createFunc(/*arg:*/ "modules", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
            nixScope.evalModules(
              {
                "modules": nixScope.modules,
                "args": nixScope.args,
                "check": false,
              },
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkRemovedOptionModule",
      (nixScope) =>
        createFunc(/*arg:*/ "optionName", null, {}, (nixScope) => (
          createFunc(
            /*arg:*/ "replacementInstructions",
            null,
            {},
            (nixScope) => (
              createFunc({}, null, {}, (nixScope) => (
                createScope((nixScope) => {
                  const obj = {};
                  obj.options = nixScope.setAttrByPath(nixScope.optionName)(
                    nixScope.mkOption(
                      {
                        "visible": false,
                        "apply": createFunc(
                          /*arg:*/ "x",
                          null,
                          {},
                          (nixScope) => (
                            nixScope.throw(
                              new InterpolatedString([
                                "The option `",
                                "' can no longer be used since it's been removed. ",
                                "",
                              ], [
                                () => (nixScope.showOption(
                                  nixScope.optionName,
                                )),
                                () => (nixScope.replacementInstructions),
                              ]),
                            )
                          ),
                        ),
                      },
                    ),
                  );
                  if (obj["config"] === undefined) obj["config"] = {};
                  obj["config"]["assertions"] = /*let*/ createScope(
                    (nixScope) => {
                      defGetter(nixScope, "opt", (nixScope) =>
                        nixScope.getAttrFromPath(nixScope.optionName)(
                          nixScope.options,
                        ));
                      return [{
                        "assertion": operators.negate(
                          nixScope.opt["isDefined"],
                        ),
                        "message":
                          (new InterpolatedString([
                            "\n              The option definition \\`",
                            "' in ",
                            " no longer has any effect; please remove it.\n              ",
                            "\n            ",
                          ], [
                            () => (nixScope.showOption(nixScope.optionName)),
                            () => (nixScope.showFiles(nixScope.opt["files"])),
                            () => (nixScope.replacementInstructions),
                          ])),
                      }];
                    },
                  );
                  return obj;
                })
              ))
            ),
          )
        )),
    );
    defGetter(
      nixScope,
      "mkRenamedOptionModule",
      (nixScope) =>
        createFunc(/*arg:*/ "from", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "to", null, {}, (nixScope) => (
            nixScope.doRename({
              "from": nixScope.from,
              "to": nixScope.to,
              "visible": false,
              "warn": true,
              "use": nixScope.trace(
                new InterpolatedString([
                  "Obsolete option `",
                  "' is used. It was renamed to `",
                  "'.",
                ], [
                  () => (nixScope.showOption(nixScope.from)),
                  () => (nixScope.showOption(nixScope.to)),
                ]),
              ),
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkRenamedOptionModuleWith",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          nixScope.doRename({
            "from": nixScope.from,
            "to": nixScope.to,
            "visible": false,
            "warn": nixScope.oldestSupportedReleaseIsAtLeast(
              nixScope.sinceRelease,
            ),
            "use": nixScope.warnIf(
              nixScope.oldestSupportedReleaseIsAtLeast(nixScope.sinceRelease),
            )(
              new InterpolatedString([
                "Obsolete option `",
                "' is used. It was renamed to `",
                "'.",
              ], [
                () => (nixScope.showOption(nixScope.from)),
                () => (nixScope.showOption(nixScope.to)),
              ]),
            ),
          })
        )),
    );
    defGetter(
      nixScope,
      "mkMergedOptionModule",
      (nixScope) =>
        createFunc(/*arg:*/ "from", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "to", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "mergeFn", null, {}, (nixScope) => (
              createFunc({}, null, {}, (nixScope) => (
                {
                  "options": nixScope["foldl'"](nixScope.recursiveUpdate)({})(
                    nixScope.map(
                      createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                        nixScope.setAttrByPath(nixScope.path)(
                          nixScope.mkOption(
                            {
                              "visible": false,
                              "default": "_mkMergedOptionModule",
                            },
                          ),
                        )
                      )),
                    )(nixScope.from),
                  ),
                  "config": operators.merge(
                    {
                      "warnings": nixScope.filter(
                        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                          operators.notEqual(nixScope.x, "")
                        )),
                      )(
                        nixScope.map(
                          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                            /*let*/ createScope((nixScope) => {
                              defGetter(nixScope, "val", (nixScope) =>
                                nixScope.getAttrFromPath(nixScope.f)(
                                  nixScope.config,
                                ));
                              defGetter(nixScope, "opt", (nixScope) =>
                                nixScope.getAttrFromPath(nixScope.f)(
                                  nixScope.options,
                                ));
                              return nixScope.optionalString(
                                operators.notEqual(
                                  nixScope.val,
                                  "_mkMergedOptionModule",
                                ),
                              )(
                                new InterpolatedString([
                                  "The option `",
                                  "' defined in ",
                                  " has been changed to `",
                                  "' that has a different type. Please read `",
                                  "' documentation and update your configuration accordingly.",
                                ], [
                                  () => (nixScope.showOption(nixScope.f)),
                                  () => (nixScope.showFiles(
                                    nixScope.opt["files"],
                                  )),
                                  () => (nixScope.showOption(nixScope.to)),
                                  () => (nixScope.showOption(nixScope.to)),
                                ]),
                              );
                            })
                          )),
                        )(nixScope.from),
                      ),
                    },
                    nixScope.setAttrByPath(nixScope.to)(
                      nixScope.mkMerge(
                        nixScope.optional(
                          nixScope.any(
                            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                              operators.notEqual(
                                nixScope.getAttrFromPath(nixScope.f)(
                                  nixScope.config,
                                ),
                                "_mkMergedOptionModule",
                              )
                            )),
                          )(nixScope.from),
                        )(nixScope.mergeFn(nixScope.config)),
                      ),
                    ),
                  ),
                }
              ))
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkChangedOptionModule",
      (nixScope) =>
        createFunc(/*arg:*/ "from", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "to", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "changeFn", null, {}, (nixScope) => (
              nixScope.mkMergedOptionModule([nixScope.from])(nixScope.to)(
                nixScope.changeFn,
              )
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkAliasOptionModule",
      (nixScope) =>
        createFunc(/*arg:*/ "from", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "to", null, {}, (nixScope) => (
            nixScope.doRename(
              {
                "from": nixScope.from,
                "to": nixScope.to,
                "visible": true,
                "warn": false,
                "use": nixScope.id,
              },
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "mkAliasOptionModuleMD",
      (nixScope) => nixScope.mkAliasOptionModule,
    );
    defGetter(
      nixScope,
      "mkDerivedConfig",
      (nixScope) =>
        createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            nixScope.mkOverride(
              operators.selectOrDefault(
                nixScope.opt,
                ["highestPrio"],
                nixScope.defaultOverridePriority,
              ),
            )(nixScope.f(nixScope.opt["value"]))
          ))
        )),
    );
    defGetter(
      nixScope,
      "doRename",
      (nixScope) =>
        createFunc(
          {
            "withPriority": (nixScope) => (true),
            "condition": (nixScope) => (true),
          },
          null,
          {},
          (nixScope) => (
            createFunc({}, null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "fromOpt",
                  (nixScope) =>
                    nixScope.getAttrFromPath(nixScope.from)(nixScope.options),
                );
                defGetter(
                  nixScope,
                  "toOf",
                  (nixScope) =>
                    nixScope.attrByPath(nixScope.to)(
                      nixScope.abort(
                        new InterpolatedString([
                          "Renaming error: option `",
                          "' does not exist.",
                        ], [() => (nixScope.showOption(nixScope.to))]),
                      ),
                    ),
                );
                defGetter(
                  nixScope,
                  "toType",
                  (nixScope) =>
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "opt", (nixScope) =>
                        nixScope.attrByPath(nixScope.to)({})(nixScope.options));
                      return operators.selectOrDefault(
                        nixScope.opt,
                        ["type"],
                        nixScope.types["submodule"]({}),
                      );
                    }),
                );
                return ({
                  "options": nixScope.setAttrByPath(nixScope.from)(
                    operators.merge(
                      nixScope.mkOption({
                        "visible": nixScope.visible,
                        "description":
                          (new InterpolatedString(
                            ["Alias of {option}`", "`."],
                            [() => (nixScope.showOption(nixScope.to))],
                          )),
                        "apply": createFunc(
                          /*arg:*/ "x",
                          null,
                          {},
                          (nixScope) => (
                            nixScope.use(nixScope.toOf(nixScope.config))
                          ),
                        ),
                      }),
                      nixScope.optionalAttrs(
                        operators.notEqual(nixScope.toType, null),
                      )({ "type": nixScope.toType }),
                    ),
                  ),
                  "config": nixScope.mkIf(nixScope.condition)(
                    nixScope.mkMerge([
                      nixScope.optionalAttrs(
                        operators.hasAttr(nixScope.options, "warnings"),
                      )({
                        "warnings": nixScope.optional(
                          operators.and(
                            nixScope.warn,
                            nixScope.fromOpt["isDefined"],
                          ),
                        )(
                          new InterpolatedString([
                            "The option `",
                            "' defined in ",
                            " has been renamed to `",
                            "'.",
                          ], [
                            () => (nixScope.showOption(nixScope.from)),
                            () => (nixScope.showFiles(
                              nixScope.fromOpt["files"],
                            )),
                            () => (nixScope.showOption(nixScope.to)),
                          ]),
                        ),
                      }),
                      operators.ifThenElse(
                        nixScope.withPriority,
                        () => (nixScope.mkAliasAndWrapDefsWithPriority(
                          nixScope.setAttrByPath(nixScope.to),
                        )(nixScope.fromOpt)),
                        () => (nixScope.mkAliasAndWrapDefinitions(
                          nixScope.setAttrByPath(nixScope.to),
                        )(nixScope.fromOpt)),
                      ),
                    ]),
                  ),
                });
              })
            ))
          ),
        ),
    );
    defGetter(
      nixScope,
      "importApply",
      (nixScope) =>
        createFunc(/*arg:*/ "modulePath", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "staticArg", null, {}, (nixScope) => (
            nixScope.lib["setDefaultModuleLocation"](nixScope.modulePath)(
              nixScope.import(nixScope.modulePath)(nixScope.staticArg),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "importJSON",
      (nixScope) =>
        createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
          {
            "_file": nixScope.file,
            "config": nixScope.lib["importJSON"](nixScope.file),
          }
        )),
    );
    defGetter(
      nixScope,
      "importTOML",
      (nixScope) =>
        createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
          {
            "_file": nixScope.file,
            "config": nixScope.lib["importTOML"](nixScope.file),
          }
        )),
    );
    defGetter(
      nixScope,
      "private",
      (nixScope) =>
        nixScope.mapAttrs(createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
          nixScope.warn(
            new InterpolatedString([
              "External use of `lib.modules.",
              "` is deprecated. If your use case isn't covered by non-deprecated functions, we'd like to know more and perhaps support your use case well, instead of providing access to these low level functions. In this case please open an issue in https://github.com/nixos/nixpkgs/issues/.",
            ], [() => (nixScope.k)]),
          )
        )))({
          "applyModuleArgsIfFunction": nixScope.applyModuleArgsIfFunction,
          "dischargeProperties": nixScope.dischargeProperties,
          "mergeModules": nixScope.mergeModules,
          "mergeModules'": nixScope["mergeModules'"],
          "pushDownProperties": nixScope.pushDownProperties,
          "unifyModuleSyntax": nixScope.unifyModuleSyntax,
          "collectModules": nixScope.collectModules(null),
        }),
    );
    defGetter(
      nixScope,
      "messages",
      (nixScope) =>
        /*let*/ createScope((nixScope) => {
          nixScope.concatMapStringsSep =
            nixScope.lib["strings"]["concatMapStringsSep"];
          nixScope.escapeNixString = nixScope.lib["strings"]["escapeNixString"];
          nixScope.trim = nixScope.lib["strings"]["trim"];
          defGetter(nixScope, "into_fallback_file_maybe", (nixScope) =>
            createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
              nixScope.optionalString(
                operators.and(
                  operators.notEqual(nixScope.file, null),
                  operators.notEqual(nixScope.file, nixScope.unknownModule),
                ),
              )(
                new InterpolatedString([
                  ", while trying to load a module into ",
                  "",
                ], [() => (nixScope.toString(nixScope.file))]),
              )
            )));
          defGetter(nixScope, "into_prefix_maybe", (nixScope) =>
            createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
              nixScope.optionalString(operators.notEqual(nixScope.prefix, []))(
                new InterpolatedString([
                  ", while trying to load a module into ",
                  "",
                ], [
                  () => (nixScope.code(nixScope.showOption(nixScope.prefix))),
                ]),
              )
            )));
          defGetter(
            nixScope,
            "lines",
            (nixScope) => nixScope.concatMapStringsSep("")(nixScope.trim),
          );
          defGetter(
            nixScope,
            "paragraphs",
            (nixScope) => nixScope.concatMapStringsSep("")(nixScope.trim),
          );
          defGetter(nixScope, "optionalMatch", (nixScope) =>
            createFunc(/*arg:*/ "cases", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.and(
                    nixScope.isString(nixScope.value),
                    operators.hasAttr(nixScope.cases, nixScope.value),
                  ),
                  () => [nixScope.cases[nixScope.value]],
                  () => [],
                )
              ))
            )));
          defGetter(
            nixScope,
            "esc",
            (nixScope) => nixScope.builtins["fromJSON"]("u001b"),
          );
          defGetter(
            nixScope,
            "warn",
            (nixScope) =>
              createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                new InterpolatedString(["", "[1;35m", "", "[0m"], [
                  () => (nixScope.esc),
                  () => (nixScope.s),
                  () => (nixScope.esc),
                ])
              )),
          );
          defGetter(
            nixScope,
            "good",
            (nixScope) =>
              createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                new InterpolatedString(["", "[1;32m", "", "[0m"], [
                  () => (nixScope.esc),
                  () => (nixScope.s),
                  () => (nixScope.esc),
                ])
              )),
          );
          defGetter(
            nixScope,
            "code",
            (nixScope) =>
              createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                new InterpolatedString(["", "[1m", "", "[0m"], [
                  () => (nixScope.esc),
                  () => (nixScope.s),
                  () => (nixScope.esc),
                ])
              )),
          );
          return ({
            "not_a_module": createFunc(
              { "expectedClass": (nixScope) => (null) },
              null,
              {},
              (nixScope) => (
                nixScope.paragraphs(
                  operators.listConcat(
                    [
                      new InterpolatedString([
                        "\n              Expected a module, but found a value of type ",
                        "",
                        "",
                        ".\n              A module is typically loaded by adding it to the ",
                        " attribute of an existing module, or in the ",
                        " argument of various functions.\n              Please make sure that each of the list items is a module, and not a different kind of value.\n            ",
                      ], [
                        () => (nixScope.warn(
                          nixScope.escapeNixString(nixScope._type),
                        )),
                        () => (nixScope.into_fallback_file_maybe(
                          nixScope.fallbackFile,
                        )),
                        () => (nixScope.into_prefix_maybe(nixScope.prefix)),
                        () => (nixScope.code("imports = [ ... ];")),
                        () => (nixScope.code("modules = [ ... ];")),
                      ]),
                    ],
                    nixScope.optionalMatch({
                      "configuration": nixScope.trim(`
                      If you really mean to import this configuration, instead please only import the modules that make up the configuration.
                      You may have to create a \`let\` binding, file or attribute to give yourself access to the relevant modules.
                      While loading a configuration into the module system is a very sensible idea, it can not be done cleanly in practice.
                    `),
                      "flake": nixScope.lines(
                        operators.listConcat(
                          [nixScope.trim(
                            new InterpolatedString([
                              "\n                  Perhaps you forgot to select an attribute name?\n                  Instead of, for example,\n                      ",
                              "\n                  you need to write something like\n                      ",
                              "",
                              "\n                ",
                            ], [
                              () => (nixScope.warn("inputs.someflake")),
                              () => (nixScope.warn("inputs.someflake")),
                              () => (operators.ifThenElse(
                                operators.equal(nixScope.expectedClass, null),
                                () => (nixScope.good(
                                  ".modules.someApp.default",
                                )),
                                () => (nixScope.good(
                                  new InterpolatedString([
                                    ".modules.",
                                    ".default",
                                  ], [() => (nixScope.expectedClass)]),
                                )),
                              )),
                            ]),
                          )],
                          nixScope.optionalMatch({
                            "nixos": nixScope.trim(
                              new InterpolatedString([
                                "\n                  or\n                      ",
                                "",
                                "\n                ",
                              ], [
                                () => (nixScope.warn("inputs.someflake")),
                                () => (nixScope.good(".nixosModules.default")),
                              ]),
                            ),
                            "darwin": nixScope.trim(
                              new InterpolatedString([
                                "\n                  or\n                      ",
                                "",
                                "\n                ",
                              ], [
                                () => (nixScope.warn("inputs.someflake")),
                                () => (nixScope.good(".darwinModules.default")),
                              ]),
                            ),
                          })(nixScope.expectedClass),
                        ),
                      ),
                    })(nixScope._type),
                  ),
                )
              ),
            ),
          });
        }),
    );
    return operators.merge(nixScope.private, {
      "defaultOrderPriority": nixScope.defaultOrderPriority,
      "defaultOverridePriority": nixScope.defaultOverridePriority,
      "defaultPriority": nixScope.defaultPriority,
      "doRename": nixScope.doRename,
      "evalModules": nixScope.evalModules,
      "evalOptionValue": nixScope.evalOptionValue,
      "filterOverrides": nixScope.filterOverrides,
      "filterOverrides'": nixScope["filterOverrides'"],
      "fixMergeModules": nixScope.fixMergeModules,
      "fixupOptionType": nixScope.fixupOptionType,
      "importApply": nixScope.importApply,
      "importJSON": nixScope.importJSON,
      "importTOML": nixScope.importTOML,
      "mergeDefinitions": nixScope.mergeDefinitions,
      "mergeAttrDefinitionsWithPrio": nixScope.mergeAttrDefinitionsWithPrio,
      "mergeOptionDecls": nixScope.mergeOptionDecls,
      "mkAfter": nixScope.mkAfter,
      "mkAliasAndWrapDefinitions": nixScope.mkAliasAndWrapDefinitions,
      "mkAliasAndWrapDefsWithPriority": nixScope.mkAliasAndWrapDefsWithPriority,
      "mkAliasDefinitions": nixScope.mkAliasDefinitions,
      "mkAliasIfDef": nixScope.mkAliasIfDef,
      "mkAliasOptionModule": nixScope.mkAliasOptionModule,
      "mkAliasOptionModuleMD": nixScope.mkAliasOptionModuleMD,
      "mkAssert": nixScope.mkAssert,
      "mkBefore": nixScope.mkBefore,
      "mkChangedOptionModule": nixScope.mkChangedOptionModule,
      "mkDefault": nixScope.mkDefault,
      "mkDefinition": nixScope.mkDefinition,
      "mkDerivedConfig": nixScope.mkDerivedConfig,
      "mkFixStrictness": nixScope.mkFixStrictness,
      "mkForce": nixScope.mkForce,
      "mkIf": nixScope.mkIf,
      "mkImageMediaOverride": nixScope.mkImageMediaOverride,
      "mkMerge": nixScope.mkMerge,
      "mkMergedOptionModule": nixScope.mkMergedOptionModule,
      "mkOptionDefault": nixScope.mkOptionDefault,
      "mkOrder": nixScope.mkOrder,
      "mkOverride": nixScope.mkOverride,
      "mkRemovedOptionModule": nixScope.mkRemovedOptionModule,
      "mkRenamedOptionModule": nixScope.mkRenamedOptionModule,
      "mkRenamedOptionModuleWith": nixScope.mkRenamedOptionModuleWith,
      "mkVMOverride": nixScope.mkVMOverride,
      "setDefaultModuleLocation": nixScope.setDefaultModuleLocation,
      "sortProperties": nixScope.sortProperties,
    });
  })
));
