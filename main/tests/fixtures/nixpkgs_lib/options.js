import { createRuntime } from "../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope } = createRuntime();
const operators = runtime.operators;

export default /**
  Module System option handling.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.all = nixScope.lib["all"];
    nixScope.collect = nixScope.lib["collect"];
    nixScope.concatLists = nixScope.lib["concatLists"];
    nixScope.concatMap = nixScope.lib["concatMap"];
    nixScope.concatMapStringsSep = nixScope.lib["concatMapStringsSep"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope["foldl'"] = nixScope.lib["foldl'"];
    nixScope.head = nixScope.lib["head"];
    nixScope.tail = nixScope.lib["tail"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.isBool = nixScope.lib["isBool"];
    nixScope.isDerivation = nixScope.lib["isDerivation"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.isInt = nixScope.lib["isInt"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.isString = nixScope.lib["isString"];
    nixScope.length = nixScope.lib["length"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.optional = nixScope.lib["optional"];
    nixScope.optionals = nixScope.lib["optionals"];
    nixScope.take = nixScope.lib["take"];
    nixScope.attrByPath = nixScope.lib["attrsets"]["attrByPath"];
    nixScope.optionalAttrs = nixScope.lib["attrsets"]["optionalAttrs"];
    nixScope.showAttrPath = nixScope.lib["attrsets"]["showAttrPath"];
    nixScope.concatMapStrings = nixScope.lib["strings"]["concatMapStrings"];
    nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
    nixScope.mkOptionType = nixScope.lib["types"]["mkOptionType"];
    nixScope.last = nixScope.lib["lists"]["last"];
    nixScope.toList = nixScope.lib["lists"]["toList"];
    Object.defineProperty(nixScope, "prioritySuggestion", {
      enumerable: true,
      get() {
        return `
        Use \`lib.mkForce value\` or \`lib.mkDefault value\` to change the priority on any of these definitions.
      `;
      },
    });
    return /*rec*/ createScope((nixScope) => {
      nixScope.unknownModule = "<unknown-file>";
      Object.defineProperty(nixScope, "isOption", {
        enumerable: true,
        get() {
          return nixScope.lib["isType"]("option");
        },
      });
      Object.defineProperty(nixScope, "mkOption", {
        enumerable: true,
        get() {
          return createFunc(
            {
              "default": (nixScope) => (null),
              "defaultText": (nixScope) => (null),
              "example": (nixScope) => (null),
              "description": (nixScope) => (null),
              "relatedPackages": (nixScope) => (null),
              "type": (nixScope) => (null),
              "apply": (nixScope) => (null),
              "internal": (nixScope) => (null),
              "visible": (nixScope) => (null),
              "readOnly": (nixScope) => (null),
            },
            "attrs",
            {},
            (nixScope) => (
              operators.merge(nixScope.attrs, { "_type": "option" })
            ),
          );
        },
      });
      Object.defineProperty(nixScope, "mkEnableOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            nixScope.mkOption(
              {
                "default": false,
                "example": true,
                "description":
                  (new InterpolatedString(["Whether to enable ", "."], [
                    () => (nixScope.name),
                  ])),
                "type": nixScope.lib["types"]["bool"],
              },
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "mkPackageOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
              createFunc(
                {
                  "nullable": (nixScope) => (false),
                  "default": (nixScope) => (nixScope.name),
                  "example": (nixScope) => (null),
                  "extraDescription": (nixScope) => (""),
                  "pkgsText": (nixScope) => ("pkgs"),
                },
                null,
                {},
                (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "name'", {
                      enumerable: true,
                      get() {
                        return (operators.ifThenElse(
                          nixScope.isList(nixScope.name),
                          () => (nixScope.last(nixScope.name)),
                          () => (nixScope.name),
                        ));
                      },
                    });
                    Object.defineProperty(nixScope, "default'", {
                      enumerable: true,
                      get() {
                        return nixScope.toList(nixScope.default);
                      },
                    });
                    Object.defineProperty(nixScope, "defaultText", {
                      enumerable: true,
                      get() {
                        return nixScope.showAttrPath(nixScope["default'"]);
                      },
                    });
                    Object.defineProperty(nixScope, "defaultValue", {
                      enumerable: true,
                      get() {
                        return nixScope.attrByPath(nixScope["default'"])(
                          nixScope.throw(
                            new InterpolatedString([
                              "",
                              " cannot be found in ",
                              "",
                            ], [
                              () => (nixScope.defaultText),
                              () => (nixScope.pkgsText),
                            ]),
                          ),
                        )(nixScope.pkgs);
                      },
                    });
                    Object.defineProperty(nixScope, "defaults", {
                      enumerable: true,
                      get() {
                        return (operators.ifThenElse(
                          operators.notEqual(nixScope.default, null),
                          () => ({
                            "default": nixScope.defaultValue,
                            "defaultText": nixScope.literalExpression(
                              new InterpolatedString(["", ".", ""], [
                                () => (nixScope.pkgsText),
                                () => (nixScope.defaultText),
                              ]),
                            ),
                          }),
                          () => (nixScope.optionalAttrs(nixScope.nullable)(
                            { "default": null },
                          )),
                        ));
                      },
                    });
                    return nixScope.mkOption(
                      operators.merge(
                        nixScope.defaults,
                        operators.merge(
                          {
                            "description": operators.add(
                              operators.add(
                                new InterpolatedString([
                                  "The ",
                                  " package to use.",
                                ], [() => (nixScope["name'"])]),
                                operators.ifThenElse(
                                  operators.equal(
                                    nixScope.extraDescription,
                                    "",
                                  ),
                                  () => (""),
                                  () => (" "),
                                ),
                              ),
                              nixScope.extraDescription,
                            ),
                            "type": ((_withAttrs) => {
                              const nixScope = {
                                ...runtime.scopeStack.slice(-1)[0],
                                ..._withAttrs,
                              };
                              runtime.scopeStack.push(nixScope);
                              try {
                                return (operators.ifThenElse(
                                  nixScope.nullable,
                                  () => (nixScope.nullOr),
                                  () => (nixScope.lib["id"]),
                                ))(nixScope.package);
                              } finally {
                                runtime.scopeStack.pop();
                              }
                            })(nixScope.lib["types"]),
                          },
                          nixScope.optionalAttrs(
                            operators.notEqual(nixScope.example, null),
                          )({
                            "example": nixScope.literalExpression(
                              operators.ifThenElse(
                                nixScope.isList(nixScope.example),
                                () => (new InterpolatedString(["", ".", ""], [
                                  () => (nixScope.pkgsText),
                                  () => (nixScope.showAttrPath(
                                    nixScope.example,
                                  )),
                                ])),
                                () => (nixScope.example),
                              ),
                            ),
                          }),
                        ),
                      ),
                    );
                  })
                ),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mkPackageOptionMD", {
        enumerable: true,
        get() {
          return nixScope.lib["warn"](
            "mkPackageOptionMD is deprecated and will be removed in 25.05; please use mkPackageOption.",
          )(nixScope.mkPackageOption);
        },
      });
      Object.defineProperty(nixScope, "mkSinkUndeclaredOptions", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            nixScope.mkOption(operators.merge({
              "internal": true,
              "visible": false,
              "default": false,
              "description": "Sink for option definitions.",
              "type": nixScope.mkOptionType(
                {
                  "name": "sink",
                  "check": createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    true
                  )),
                  "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
                      false
                    ))
                  )),
                },
              ),
              "apply": createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                nixScope.throw(
                  "Option value is not readable because the option is not declared.",
                )
              )),
            }, nixScope.attrs))
          ));
        },
      });
      Object.defineProperty(nixScope, "mergeDefaultOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "list", {
                  enumerable: true,
                  get() {
                    return nixScope.getValues(nixScope.defs);
                  },
                });
                return (operators.ifThenElse(
                  operators.equal(nixScope.length(nixScope.list), 1n),
                  () => (nixScope.head(nixScope.list)),
                  () => (operators.ifThenElse(
                    nixScope.all(nixScope.isFunction)(nixScope.list),
                    () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      nixScope.mergeDefaultOption(nixScope.loc)(
                        nixScope.map(
                          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                            nixScope.f(nixScope.x)
                          )),
                        )(nixScope.list),
                      )
                    ))),
                    () => (operators.ifThenElse(
                      nixScope.all(nixScope.isList)(nixScope.list),
                      () => (nixScope.concatLists(nixScope.list)),
                      () => (operators.ifThenElse(
                        nixScope.all(nixScope.isAttrs)(nixScope.list),
                        () => (nixScope["foldl'"](nixScope.lib["mergeAttrs"])(
                          {},
                        )(nixScope.list)),
                        () => (operators.ifThenElse(
                          nixScope.all(nixScope.isBool)(nixScope.list),
                          () => (nixScope["foldl'"](nixScope.lib["or"])(false)(
                            nixScope.list,
                          )),
                          () => (operators.ifThenElse(
                            nixScope.all(nixScope.isString)(nixScope.list),
                            () => (nixScope.lib["concatStrings"](
                              nixScope.list,
                            )),
                            () => (operators.ifThenElse(
                              operators.and(
                                nixScope.all(nixScope.isInt)(nixScope.list),
                                nixScope.all(
                                  createFunc(
                                    /*arg:*/ "x",
                                    null,
                                    {},
                                    (nixScope) => (
                                      operators.equal(
                                        nixScope.x,
                                        nixScope.head(nixScope.list),
                                      )
                                    ),
                                  ),
                                )(nixScope.list),
                              ),
                              () => (nixScope.head(nixScope.list)),
                              () => (nixScope.throw(
                                new InterpolatedString([
                                  "Cannot merge definitions of `",
                                  "'. Definition values:",
                                  "",
                                ], [
                                  () => (nixScope.showOption(nixScope.loc)),
                                  () => (nixScope.showDefs(nixScope.defs)),
                                ]),
                              )),
                            )),
                          )),
                        )),
                      )),
                    )),
                  )),
                ));
              })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mergeOneOption", {
        enumerable: true,
        get() {
          return nixScope.mergeUniqueOption({ "message": "" });
        },
      });
      Object.defineProperty(nixScope, "mergeUniqueOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.length(nixScope.defs), 1n),
                  () => (nixScope.merge(nixScope.loc)(nixScope.defs)),
                  () => (((_cond) => {
                    if (!_cond) {
                      throw new Error("assertion failed: " + "length defs > 1");
                    }
                    return nixScope.throw(
                      new InterpolatedString([
                        "The option `",
                        "' is defined multiple times while it's expected to be unique.",
                        "Definition values:",
                        "",
                        "",
                      ], [
                        () => (nixScope.showOption(nixScope.loc)),
                        () => (nixScope.message),
                        () => (nixScope.showDefs(nixScope.defs)),
                        () => (nixScope.prioritySuggestion),
                      ]),
                    );
                  })(
                    operators.greaterThan(nixScope.length(nixScope.defs), 1n),
                  )),
                )
              ))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "mergeEqualOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(nixScope.defs, []),
                () => (nixScope.abort("This case should never happen.")),
                () => (operators.ifThenElse(
                  operators.equal(nixScope.length(nixScope.defs), 1n),
                  () => ((nixScope.head(nixScope.defs))["value"]),
                  () => ((nixScope["foldl'"](
                    createFunc(/*arg:*/ "first", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.notEqual(
                            nixScope.def["value"],
                            nixScope.first["value"],
                          ),
                          () => (nixScope.throw(
                            new InterpolatedString([
                              "The option `",
                              "' has conflicting definition values:",
                              "",
                              "",
                            ], [
                              () => (nixScope.showOption(nixScope.loc)),
                              () => (nixScope.showDefs([
                                nixScope.first,
                                nixScope.def,
                              ])),
                              () => (nixScope.prioritySuggestion),
                            ]),
                          )),
                          () => (nixScope.first),
                        )
                      ))
                    )),
                  )(nixScope.head(nixScope.defs))(
                    nixScope.tail(nixScope.defs),
                  ))["value"]),
                )),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "getValues", {
        enumerable: true,
        get() {
          return nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x["value"]
          )));
        },
      });
      Object.defineProperty(nixScope, "getFiles", {
        enumerable: true,
        get() {
          return nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x["file"]
          )));
        },
      });
      Object.defineProperty(nixScope, "optionAttrSetToDocList", {
        enumerable: true,
        get() {
          return nixScope["optionAttrSetToDocList'"]([]);
        },
      });
      Object.defineProperty(nixScope, "optionAttrSetToDocList'", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "options", null, {}, (nixScope) => (
              nixScope.concatMap(
                createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "name", {
                      enumerable: true,
                      get() {
                        return nixScope.showOption(nixScope.opt["loc"]);
                      },
                    });
                    Object.defineProperty(nixScope, "docOption", {
                      enumerable: true,
                      get() {
                        return operators.merge(
                          {
                            "loc": nixScope.opt["loc"],
                            "name": nixScope.name,
                            "description": operators.selectOrDefault(
                              nixScope.opt,
                              ["description"],
                              null,
                            ),
                            "declarations": nixScope.filter(
                              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                                operators.notEqual(
                                  nixScope.x,
                                  nixScope.unknownModule,
                                )
                              )),
                            )(nixScope.opt["declarations"]),
                            "internal": operators.selectOrDefault(
                              nixScope.opt,
                              ["internal"],
                              false,
                            ),
                            "visible":
                              (operators.ifThenElse(
                                operators.and(
                                  operators.hasAttr(nixScope.opt, "visible"),
                                  operators.equal(
                                    nixScope.opt["visible"],
                                    "shallow",
                                  ),
                                ),
                                () => (true),
                                () => (operators.selectOrDefault(nixScope.opt, [
                                  "visible",
                                ], true)),
                              )),
                            "readOnly": operators.selectOrDefault(
                              nixScope.opt,
                              ["readOnly"],
                              false,
                            ),
                            "type": operators.selectOrDefault(nixScope.opt, [
                              "type",
                              "description",
                            ], "unspecified"),
                          },
                          operators.merge(
                            nixScope.optionalAttrs(
                              operators.hasAttr(nixScope.opt, "example"),
                            )({
                              "example": nixScope.builtins["addErrorContext"](
                                new InterpolatedString([
                                  "while evaluating the example of option `",
                                  "`",
                                ], [() => (nixScope.name)]),
                              )(nixScope.renderOptionValue(
                                nixScope.opt["example"],
                              )),
                            }),
                            operators.merge(
                              nixScope.optionalAttrs(
                                operators.or(
                                  operators.hasAttr(
                                    nixScope.opt,
                                    "defaultText",
                                  ),
                                  operators.hasAttr(nixScope.opt, "default"),
                                ),
                              )({
                                "default": nixScope.builtins["addErrorContext"](
                                  new InterpolatedString([
                                    "while evaluating the ",
                                    " of option `",
                                    "`",
                                  ], [
                                    () => (operators.ifThenElse(
                                      operators.hasAttr(
                                        nixScope.opt,
                                        "defaultText",
                                      ),
                                      () => ("defaultText"),
                                      () => ("default value"),
                                    )),
                                    () => (nixScope.name),
                                  ]),
                                )(nixScope.renderOptionValue(
                                  operators.selectOrDefault(nixScope.opt, [
                                    "defaultText",
                                  ], nixScope.opt["default"]),
                                )),
                              }),
                              nixScope.optionalAttrs(
                                operators.and(
                                  operators.hasAttr(
                                    nixScope.opt,
                                    "relatedPackages",
                                  ),
                                  operators.notEqual(
                                    nixScope.opt["relatedPackages"],
                                    null,
                                  ),
                                ),
                              )(createScope((nixScope) => {
                                const obj = {};
                                obj["relatedPackages"] =
                                  nixScope.opt["relatedPackages"];
                                return obj;
                              })),
                            ),
                          ),
                        );
                      },
                    });
                    Object.defineProperty(nixScope, "subOptions", {
                      enumerable: true,
                      get() {
                        return /*let*/ createScope((nixScope) => {
                          Object.defineProperty(nixScope, "ss", {
                            enumerable: true,
                            get() {
                              return nixScope.opt["type"]["getSubOptions"](
                                nixScope.opt["loc"],
                              );
                            },
                          });
                          return (operators.ifThenElse(
                            operators.notEqual(nixScope.ss, {}),
                            () => (nixScope["optionAttrSetToDocList'"](
                              nixScope.opt["loc"],
                            )(nixScope.ss)),
                            () => [],
                          ));
                        });
                      },
                    });
                    Object.defineProperty(nixScope, "subOptionsVisible", {
                      enumerable: true,
                      get() {
                        return operators.and(
                          nixScope.docOption["visible"],
                          operators.notEqual(
                            operators.selectOrDefault(
                              nixScope.opt,
                              ["visible"],
                              null,
                            ),
                            "shallow",
                          ),
                        );
                      },
                    });
                    return operators.listConcat(
                      [nixScope.docOption],
                      nixScope.optionals(nixScope.subOptionsVisible)(
                        nixScope.subOptions,
                      ),
                    );
                  })
                )),
              )(nixScope.collect(nixScope.isOption)(nixScope.options))
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "scrubOptionValue", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isDerivation(nixScope.x),
              () => ({
                "type": "derivation",
                "drvPath": nixScope.x["name"],
                "outPath": nixScope.x["name"],
                "name": nixScope.x["name"],
              }),
              () => (operators.ifThenElse(
                nixScope.isList(nixScope.x),
                () => (nixScope.map(nixScope.scrubOptionValue)(nixScope.x)),
                () => (operators.ifThenElse(
                  nixScope.isAttrs(nixScope.x),
                  () => (nixScope.mapAttrs(
                    createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.scrubOptionValue(nixScope.v)
                      ))
                    )),
                  )(nixScope.removeAttrs(nixScope.x)(["_args"]))),
                  () => (nixScope.x),
                )),
              )),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "renderOptionValue", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.and(
                operators.hasAttr(nixScope.v, "_type"),
                operators.hasAttr(nixScope.v, "text"),
              ),
              () => (nixScope.v),
              () => (nixScope.literalExpression(
                nixScope.lib["generators"]["toPretty"](
                  { "multiline": true, "allowPrettyValues": true },
                )(nixScope.v),
              )),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "literalExpression", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.negate(nixScope.isString(nixScope.text)),
              () => (nixScope.throw("literalExpression expects a string.")),
              () => ({ "_type": "literalExpression", "text": nixScope.text }),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "literalExample", {
        enumerable: true,
        get() {
          return nixScope.lib["warn"](
            "lib.literalExample is deprecated, use lib.literalExpression instead, or use lib.literalMD for a non-Nix description.",
          )(nixScope.literalExpression);
        },
      });
      Object.defineProperty(nixScope, "literalMD", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.negate(nixScope.isString(nixScope.text)),
              () => (nixScope.throw("literalMD expects a string.")),
              () => ({ "_type": "literalMD", "text": nixScope.text }),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "showOption", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "parts", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "isNamedPlaceholder", {
                enumerable: true,
                get() {
                  return nixScope.builtins["match"]("<(.*)>");
                },
              });
              Object.defineProperty(nixScope, "escapeOptionPart", {
                enumerable: true,
                get() {
                  return createFunc(/*arg:*/ "part", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.or(
                        operators.equal(nixScope.part, "*"),
                        operators.notEqual(
                          nixScope.isNamedPlaceholder(nixScope.part),
                          null,
                        ),
                      ),
                      () => (nixScope.part),
                      () => (nixScope.lib["strings"]["escapeNixIdentifier"](
                        nixScope.part,
                      )),
                    )
                  ));
                },
              });
              return (nixScope.concatStringsSep("."))(
                nixScope.map(nixScope.escapeOptionPart)(nixScope.parts),
              );
            })
          ));
        },
      });
      Object.defineProperty(nixScope, "showFiles", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "files", null, {}, (nixScope) => (
            nixScope.concatStringsSep(" and ")(
              nixScope.map(createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                new InterpolatedString(["`", "'"], [() => (nixScope.f)])
              )))(nixScope.files),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "showDefs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
            nixScope.concatMapStrings(
              createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "prettyEval", {
                    enumerable: true,
                    get() {
                      return nixScope.builtins["tryEval"](
                        nixScope.lib["generators"]["toPretty"]({})(
                          nixScope.lib["generators"]["withRecursion"](
                            { "depthLimit": 10n, "throwOnDepthLimit": false },
                          )(nixScope.def["value"]),
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "lines", {
                    enumerable: true,
                    get() {
                      return nixScope.filter(
                        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                          operators.negate(nixScope.isList(nixScope.v))
                        )),
                      )(
                        nixScope.builtins["split"]("")(
                          nixScope.prettyEval["value"],
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "value", {
                    enumerable: true,
                    get() {
                      return nixScope.concatStringsSep("    ")(
                        operators.listConcat(
                          nixScope.take(5n)(nixScope.lines),
                          nixScope.optional(
                            operators.greaterThan(
                              nixScope.length(nixScope.lines),
                              5n,
                            ),
                          )("..."),
                        ),
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "result", {
                    enumerable: true,
                    get() {
                      return (operators.ifThenElse(
                        operators.negate(nixScope.prettyEval["success"]),
                        () => (""),
                        () => (operators.ifThenElse(
                          operators.greaterThan(
                            nixScope.length(nixScope.lines),
                            1n,
                          ),
                          () => (operators.add(":", nixScope.value)),
                          () => (operators.add(": ", nixScope.value)),
                        )),
                      ));
                    },
                  });
                  return (new InterpolatedString(["- In `", "'", ""], [
                    () => (nixScope.def["file"]),
                    () => (nixScope.result),
                  ]));
                })
              )),
            )(nixScope.defs)
          ));
        },
      });
      Object.defineProperty(nixScope, "showOptionWithDefLocs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
            new InterpolatedString([
              "\n    ",
              ", with values defined in:\n    ",
              "\n  ",
            ], [
              () => (nixScope.showOption(nixScope.opt["loc"])),
              () => (nixScope.concatMapStringsSep("")(
                createFunc(/*arg:*/ "defFile", null, {}, (nixScope) => (
                  new InterpolatedString(["  - ", ""], [
                    () => (nixScope.defFile),
                  ])
                )),
              )(nixScope.opt["files"])),
            ])
          ));
        },
      });
      return nixScope;
    });
  })
));
