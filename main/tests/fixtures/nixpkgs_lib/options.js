import { createRuntime } from "../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
    defGetter(nixScope, "prioritySuggestion", (nixScope) => `
        Use \`lib.mkForce value\` or \`lib.mkDefault value\` to change the priority on any of these definitions.
      `);
    return /*rec*/ createScope((nixScope) => {
      nixScope.unknownModule = "<unknown-file>";
      defGetter(
        nixScope,
        "isOption",
        (nixScope) => nixScope.lib["isType"]("option"),
      );
      defGetter(nixScope, "mkOption", (nixScope) =>
        createFunc(
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
        ));
      defGetter(
        nixScope,
        "mkEnableOption",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "mkPackageOption",
        (nixScope) =>
          createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
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
                    defGetter(
                      nixScope,
                      "name'",
                      (
                        nixScope,
                      ) => (operators.ifThenElse(
                        nixScope.isList(nixScope.name),
                        () => (nixScope.last(nixScope.name)),
                        () => (nixScope.name),
                      )),
                    );
                    defGetter(
                      nixScope,
                      "default'",
                      (nixScope) => nixScope.toList(nixScope.default),
                    );
                    defGetter(
                      nixScope,
                      "defaultText",
                      (nixScope) => nixScope.showAttrPath(nixScope["default'"]),
                    );
                    defGetter(nixScope, "defaultValue", (nixScope) =>
                      nixScope.attrByPath(nixScope["default'"])(
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
                      )(nixScope.pkgs));
                    defGetter(
                      nixScope,
                      "defaults",
                      (
                        nixScope,
                      ) => (operators.ifThenElse(
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
                      )),
                    );
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
          )),
      );
      defGetter(
        nixScope,
        "mkPackageOptionMD",
        (nixScope) =>
          nixScope.lib["warn"](
            "mkPackageOptionMD is deprecated and will be removed in 25.05; please use mkPackageOption.",
          )(nixScope.mkPackageOption),
      );
      defGetter(
        nixScope,
        "mkSinkUndeclaredOptions",
        (nixScope) =>
          createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "mergeDefaultOption",
        (nixScope) =>
          createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "list",
                  (nixScope) => nixScope.getValues(nixScope.defs),
                );
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
          )),
      );
      defGetter(
        nixScope,
        "mergeOneOption",
        (nixScope) => nixScope.mergeUniqueOption({ "message": "" }),
      );
      defGetter(
        nixScope,
        "mergeUniqueOption",
        (nixScope) =>
          createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "mergeEqualOption",
        (nixScope) =>
          createFunc(/*arg:*/ "loc", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "getValues",
        (nixScope) =>
          nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x["value"]
          ))),
      );
      defGetter(
        nixScope,
        "getFiles",
        (nixScope) =>
          nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x["file"]
          ))),
      );
      defGetter(
        nixScope,
        "optionAttrSetToDocList",
        (nixScope) => nixScope["optionAttrSetToDocList'"]([]),
      );
      defGetter(
        nixScope,
        "optionAttrSetToDocList'",
        (nixScope) =>
          createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "options", null, {}, (nixScope) => (
              nixScope.concatMap(
                createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "name", (nixScope) =>
                      nixScope.showOption(nixScope.opt["loc"]));
                    defGetter(nixScope, "docOption", (nixScope) =>
                      operators.merge(
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
                          "internal": operators.selectOrDefault(nixScope.opt, [
                            "internal",
                          ], false),
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
                          "readOnly": operators.selectOrDefault(nixScope.opt, [
                            "readOnly",
                          ], false),
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
                                operators.hasAttr(nixScope.opt, "defaultText"),
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
                              obj.relatedPackages =
                                nixScope.opt.relatedPackages;
                              return obj;
                            })),
                          ),
                        ),
                      ));
                    defGetter(nixScope, "subOptions", (nixScope) =>
                      /*let*/ createScope((nixScope) => {
                        defGetter(nixScope, "ss", (nixScope) =>
                          nixScope.opt["type"]["getSubOptions"](
                            nixScope.opt["loc"],
                          ));
                        return (operators.ifThenElse(
                          operators.notEqual(nixScope.ss, {}),
                          () => (nixScope["optionAttrSetToDocList'"](
                            nixScope.opt["loc"],
                          )(nixScope.ss)),
                          () => [],
                        ));
                      }));
                    defGetter(nixScope, "subOptionsVisible", (nixScope) =>
                      operators.and(
                        nixScope.docOption["visible"],
                        operators.notEqual(
                          operators.selectOrDefault(
                            nixScope.opt,
                            ["visible"],
                            null,
                          ),
                          "shallow",
                        ),
                      ));
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
          )),
      );
      defGetter(
        nixScope,
        "scrubOptionValue",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "renderOptionValue",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "literalExpression",
        (nixScope) =>
          createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.negate(nixScope.isString(nixScope.text)),
              () => (nixScope.throw("literalExpression expects a string.")),
              () => ({ "_type": "literalExpression", "text": nixScope.text }),
            )
          )),
      );
      defGetter(
        nixScope,
        "literalExample",
        (nixScope) =>
          nixScope.lib["warn"](
            "lib.literalExample is deprecated, use lib.literalExpression instead, or use lib.literalMD for a non-Nix description.",
          )(nixScope.literalExpression),
      );
      defGetter(
        nixScope,
        "literalMD",
        (nixScope) =>
          createFunc(/*arg:*/ "text", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.negate(nixScope.isString(nixScope.text)),
              () => (nixScope.throw("literalMD expects a string.")),
              () => ({ "_type": "literalMD", "text": nixScope.text }),
            )
          )),
      );
      defGetter(
        nixScope,
        "showOption",
        (nixScope) =>
          createFunc(/*arg:*/ "parts", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "isNamedPlaceholder",
                (nixScope) => nixScope.builtins["match"]("<(.*)>"),
              );
              defGetter(nixScope, "escapeOptionPart", (nixScope) =>
                createFunc(/*arg:*/ "part", null, {}, (nixScope) => (
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
                )));
              return (nixScope.concatStringsSep("."))(
                nixScope.map(nixScope.escapeOptionPart)(nixScope.parts),
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "showFiles",
        (nixScope) =>
          createFunc(/*arg:*/ "files", null, {}, (nixScope) => (
            nixScope.concatStringsSep(" and ")(
              nixScope.map(createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                new InterpolatedString(["`", "'"], [() => (nixScope.f)])
              )))(nixScope.files),
            )
          )),
      );
      defGetter(
        nixScope,
        "showDefs",
        (nixScope) =>
          createFunc(/*arg:*/ "defs", null, {}, (nixScope) => (
            nixScope.concatMapStrings(
              createFunc(/*arg:*/ "def", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "prettyEval", (nixScope) =>
                    nixScope.builtins["tryEval"](
                      nixScope.lib["generators"]["toPretty"]({})(
                        nixScope.lib["generators"]["withRecursion"](
                          { "depthLimit": 10n, "throwOnDepthLimit": false },
                        )(nixScope.def["value"]),
                      ),
                    ));
                  defGetter(nixScope, "lines", (nixScope) =>
                    nixScope.filter(
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        operators.negate(nixScope.isList(nixScope.v))
                      )),
                    )(
                      nixScope.builtins["split"]("")(
                        nixScope.prettyEval["value"],
                      ),
                    ));
                  defGetter(nixScope, "value", (nixScope) =>
                    nixScope.concatStringsSep("    ")(
                      operators.listConcat(
                        nixScope.take(5n)(nixScope.lines),
                        nixScope.optional(
                          operators.greaterThan(
                            nixScope.length(nixScope.lines),
                            5n,
                          ),
                        )("..."),
                      ),
                    ));
                  defGetter(
                    nixScope,
                    "result",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
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
                    )),
                  );
                  return (new InterpolatedString(["- In `", "'", ""], [
                    () => (nixScope.def["file"]),
                    () => (nixScope.result),
                  ]));
                })
              )),
            )(nixScope.defs)
          )),
      );
      defGetter(
        nixScope,
        "showOptionWithDefLocs",
        (nixScope) =>
          createFunc(/*arg:*/ "opt", null, {}, (nixScope) => (
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
          )),
      );
      return nixScope;
    });
  })
));
