export default /**
  Functions that generate widespread file
  formats from nix data structures.

  They all follow a similar interface:

  ```nix
  generator { config-attrs } data
  ```

  `config-attrs` are “holes” in the generators
  with sensible default implementations that
  can be overwritten. The default implementations
  are mostly generators themselves, called with
  their respective default values; they can be reused.

  Tests can be found in ./tests/misc.nix

  Further Documentation can be found [here](#sec-generators).
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.addErrorContext = nixScope.lib["addErrorContext"];
    nixScope.assertMsg = nixScope.lib["assertMsg"];
    nixScope.attrNames = nixScope.lib["attrNames"];
    nixScope.concatLists = nixScope.lib["concatLists"];
    nixScope.concatMapStringsSep = nixScope.lib["concatMapStringsSep"];
    nixScope.concatStrings = nixScope.lib["concatStrings"];
    nixScope.concatStringsSep = nixScope.lib["concatStringsSep"];
    nixScope.const = nixScope.lib["const"];
    nixScope.elem = nixScope.lib["elem"];
    nixScope.escape = nixScope.lib["escape"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope.flatten = nixScope.lib["flatten"];
    nixScope.foldl = nixScope.lib["foldl"];
    nixScope.functionArgs = nixScope.lib["functionArgs"];
    nixScope.gvariant = nixScope.lib["gvariant"];
    nixScope.hasInfix = nixScope.lib["hasInfix"];
    nixScope.head = nixScope.lib["head"];
    nixScope.id = nixScope.lib["id"];
    nixScope.init = nixScope.lib["init"];
    nixScope.isAttrs = nixScope.lib["isAttrs"];
    nixScope.isBool = nixScope.lib["isBool"];
    nixScope.isDerivation = nixScope.lib["isDerivation"];
    nixScope.isFloat = nixScope.lib["isFloat"];
    nixScope.isFunction = nixScope.lib["isFunction"];
    nixScope.isInt = nixScope.lib["isInt"];
    nixScope.isList = nixScope.lib["isList"];
    nixScope.isPath = nixScope.lib["isPath"];
    nixScope.isString = nixScope.lib["isString"];
    nixScope.last = nixScope.lib["last"];
    nixScope.length = nixScope.lib["length"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.mapAttrsToList = nixScope.lib["mapAttrsToList"];
    nixScope.optionals = nixScope.lib["optionals"];
    nixScope.recursiveUpdate = nixScope.lib["recursiveUpdate"];
    nixScope.replaceStrings = nixScope.lib["replaceStrings"];
    nixScope.reverseList = nixScope.lib["reverseList"];
    nixScope.splitString = nixScope.lib["splitString"];
    nixScope.tail = nixScope.lib["tail"];
    nixScope.toList = nixScope.lib["toList"];
    nixScope.escapeNixIdentifier =
      nixScope.lib["strings"]["escapeNixIdentifier"];
    nixScope.floatToString = nixScope.lib["strings"]["floatToString"];
    nixScope.match = nixScope.lib["strings"]["match"];
    nixScope.split = nixScope.lib["strings"]["split"];
    nixScope.toJSON = nixScope.lib["strings"]["toJSON"];
    nixScope.typeOf = nixScope.lib["strings"]["typeOf"];
    nixScope.escapeXML = nixScope.lib["strings"]["escapeXML"];
    return operators.merge(
      /*rec*/ createScope((nixScope) => {
        defGetter(nixScope, "mkValueStringDefault", (nixScope) =>
          createFunc({}, null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "err", (nixScope) =>
                  createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      nixScope.abort(
                        operators.add(
                          "generators.mkValueStringDefault: ",
                          new InterpolatedString(["", " not supported: ", ""], [
                            () => (nixScope.t),
                            () => (nixScope.toPretty({})(nixScope.v)),
                          ]),
                        ),
                      )
                    ))
                  )));
                return (operators.ifThenElse(
                  nixScope.isInt(nixScope.v),
                  () => (nixScope.toString(nixScope.v)),
                  () => (operators.ifThenElse(
                    nixScope.isDerivation(nixScope.v),
                    () => (nixScope.toString(nixScope.v)),
                    () => (operators.ifThenElse(
                      nixScope.isString(nixScope.v),
                      () => (nixScope.v),
                      () => (operators.ifThenElse(
                        operators.equal(true, nixScope.v),
                        () => ("true"),
                        () => (operators.ifThenElse(
                          operators.equal(false, nixScope.v),
                          () => ("false"),
                          () => (operators.ifThenElse(
                            operators.equal(null, nixScope.v),
                            () => ("null"),
                            () => (operators.ifThenElse(
                              nixScope.isList(nixScope.v),
                              () => (nixScope.err("lists")(nixScope.v)),
                              () => (operators.ifThenElse(
                                nixScope.isAttrs(nixScope.v),
                                () => (nixScope.err("attrsets")(nixScope.v)),
                                () => (operators.ifThenElse(
                                  nixScope.isFunction(nixScope.v),
                                  () => (nixScope.err("functions")(nixScope.v)),
                                  () => (operators.ifThenElse(
                                    nixScope.isFloat(nixScope.v),
                                    () => (nixScope.floatToString(nixScope.v)),
                                    () => (nixScope.err("this value is")(
                                      nixScope.toString(nixScope.v),
                                    )),
                                  )),
                                )),
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
          )));
        defGetter(nixScope, "mkKeyValueDefault", (nixScope) =>
          createFunc(
            {
              "mkValueString": (
                nixScope,
              ) => (nixScope.mkValueStringDefault({})),
            },
            null,
            {},
            (nixScope) => (
              createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                    new InterpolatedString(["", "", "", ""], [
                      () => (nixScope.escape([nixScope.sep])(nixScope.k)),
                      () => (nixScope.sep),
                      () => (nixScope.mkValueString(nixScope.v)),
                    ])
                  ))
                ))
              ))
            ),
          ));
        defGetter(nixScope, "toKeyValue", (nixScope) =>
          createFunc(
            {
              "mkKeyValue": (nixScope) => (nixScope.mkKeyValueDefault({})("=")),
              "listsAsDuplicateKeys": (nixScope) => (false),
              "indent": (nixScope) => (""),
            },
            null,
            {},
            (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "mkLine", (nixScope) =>
                  createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      operators.add(
                        operators.add(
                          nixScope.indent,
                          nixScope.mkKeyValue(nixScope.k)(nixScope.v),
                        ),
                        "",
                      )
                    ))
                  )));
                defGetter(
                  nixScope,
                  "mkLines",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    nixScope.listsAsDuplicateKeys,
                    () => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.map(nixScope.mkLine(nixScope.k))(
                          operators.ifThenElse(
                            nixScope.isList(nixScope.v),
                            () => (nixScope.v),
                            () => [nixScope.v],
                          ),
                        )
                      ))
                    ))),
                    () => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                      createFunc(
                        /*arg:*/ "v",
                        null,
                        {},
                        (nixScope) => [nixScope.mkLine(nixScope.k)(nixScope.v)],
                      )
                    ))),
                  )),
                );
                return createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                  nixScope.concatStrings(
                    nixScope.concatLists(
                      nixScope.mapAttrsToList(nixScope.mkLines)(nixScope.attrs),
                    ),
                  )
                ));
              })
            ),
          ));
        defGetter(nixScope, "toINI", (nixScope) =>
          createFunc(
            {
              "mkSectionName": (
                nixScope,
              ) => (createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                nixScope.escape(["[", "]"])(nixScope.name)
              ))),
              "mkKeyValue": (nixScope) => (nixScope.mkKeyValueDefault({})("=")),
              "listsAsDuplicateKeys": (nixScope) => (false),
            },
            null,
            {},
            (nixScope) => (
              createFunc(/*arg:*/ "attrsOfAttrs", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "mapAttrsToStringsSep", (nixScope) =>
                    createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "mapFn", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                          nixScope.concatStringsSep(nixScope.sep)(
                            nixScope.mapAttrsToList(nixScope.mapFn)(
                              nixScope.attrs,
                            ),
                          )
                        ))
                      ))
                    )));
                  defGetter(nixScope, "mkSection", (nixScope) =>
                    createFunc(/*arg:*/ "sectName", null, {}, (nixScope) => (
                      createFunc(
                        /*arg:*/ "sectValues",
                        null,
                        {},
                        (nixScope) => (
                          operators.add(
                            new InterpolatedString([
                              "\n          [",
                              "]\n        ",
                            ], [
                              () => (nixScope.mkSectionName(nixScope.sectName)),
                            ]),
                            nixScope.toKeyValue(
                              {
                                "mkKeyValue": nixScope.mkKeyValue,
                                "listsAsDuplicateKeys":
                                  nixScope.listsAsDuplicateKeys,
                              },
                            )(nixScope.sectValues),
                          )
                        ),
                      )
                    )));
                  return nixScope.mapAttrsToStringsSep("")(nixScope.mkSection)(
                    nixScope.attrsOfAttrs,
                  );
                })
              ))
            ),
          ));
        defGetter(nixScope, "toINIWithGlobalSection", (nixScope) =>
          createFunc(
            {
              "mkSectionName": (
                nixScope,
              ) => (createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                nixScope.escape(["[", "]"])(nixScope.name)
              ))),
              "mkKeyValue": (nixScope) => (nixScope.mkKeyValueDefault({})("=")),
              "listsAsDuplicateKeys": (nixScope) => (false),
            },
            null,
            {},
            (nixScope) => (
              createFunc(
                { "sections": (nixScope) => ({}) },
                null,
                {},
                (nixScope) => (
                  operators.add(
                    operators.ifThenElse(
                      operators.equal(nixScope.globalSection, {}),
                      () => (""),
                      () => (operators.add(
                        nixScope.toKeyValue(
                          {
                            "mkKeyValue": nixScope.mkKeyValue,
                            "listsAsDuplicateKeys":
                              nixScope.listsAsDuplicateKeys,
                          },
                        )(nixScope.globalSection),
                        "",
                      )),
                    ),
                    nixScope.toINI(
                      {
                        "mkSectionName": nixScope.mkSectionName,
                        "mkKeyValue": nixScope.mkKeyValue,
                        "listsAsDuplicateKeys": nixScope.listsAsDuplicateKeys,
                      },
                    )(nixScope.sections),
                  )
                ),
              )
            ),
          ));
        defGetter(nixScope, "toGitINI", (nixScope) =>
          createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "mkSectionName", (nixScope) =>
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "containsQuote", (nixScope) =>
                      nixScope.hasInfix(`"`)(nixScope.name));
                    defGetter(nixScope, "sections", (nixScope) =>
                      nixScope.splitString(".")(nixScope.name));
                    defGetter(nixScope, "section", (nixScope) =>
                      nixScope.head(nixScope.sections));
                    defGetter(nixScope, "subsections", (nixScope) =>
                      nixScope.tail(nixScope.sections));
                    defGetter(nixScope, "subsection", (nixScope) =>
                      nixScope.concatStringsSep(".")(nixScope.subsections));
                    return (operators.ifThenElse(
                      operators.or(
                        nixScope.containsQuote,
                        operators.equal(nixScope.subsections, []),
                      ),
                      () => (nixScope.name),
                      () => (new InterpolatedString(["", ' "', '"'], [
                        () => (nixScope.section),
                        () => (nixScope.subsection),
                      ])),
                    ));
                  })
                )));
              defGetter(nixScope, "mkValueString", (nixScope) =>
                createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "escapedV",
                      (
                        nixScope,
                      ) => (new InterpolatedString(['"', '"'], [
                        () => (nixScope.replaceStrings(["", "	", `"`, ""])([
                          "n",
                          "t",
                          `\\"`,
                          "",
                        ])(nixScope.v)),
                      ])),
                    );
                    return nixScope.mkValueStringDefault({})(
                      operators.ifThenElse(
                        nixScope.isString(nixScope.v),
                        () => (nixScope.escapedV),
                        () => (nixScope.v),
                      ),
                    );
                  })
                )));
              defGetter(nixScope, "mkKeyValue", (nixScope) =>
                createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "mkKeyValue", (nixScope) =>
                        nixScope.mkKeyValueDefault(
                          { "mkValueString": nixScope.mkValueString },
                        )(" = ")(nixScope.k));
                      return nixScope.concatStringsSep("")(
                        nixScope.map(
                          createFunc(/*arg:*/ "kv", null, {}, (nixScope) => (
                            operators.add("", nixScope.mkKeyValue(nixScope.kv))
                          )),
                        )(nixScope.toList(nixScope.v)),
                      );
                    })
                  ))
                )));
              defGetter(nixScope, "gitFlattenAttrs", (nixScope) =>
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "recurse", (nixScope) =>
                    createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.and(
                            nixScope.isAttrs(nixScope.value),
                            operators.negate(
                              nixScope.isDerivation(nixScope.value),
                            ),
                          ),
                          () => (nixScope.mapAttrsToList(
                            createFunc(
                              /*arg:*/ "name",
                              null,
                              {},
                              (nixScope) => (
                                createFunc(
                                  /*arg:*/ "value",
                                  null,
                                  {},
                                  (nixScope) => (
                                    nixScope.recurse(
                                      operators.listConcat(
                                        [nixScope.name],
                                        nixScope.path,
                                      ),
                                    )(nixScope.value)
                                  ),
                                )
                              ),
                            ),
                          )(nixScope.value)),
                          () => (operators.ifThenElse(
                            operators.greaterThan(
                              nixScope.length(nixScope.path),
                              1n,
                            ),
                            () => (createScope((nixScope) => {
                              const obj = {};
                              if (
                                obj[
                                  nixScope.concatStringsSep(".")(
                                    nixScope.reverseList(
                                      nixScope.tail(nixScope.path),
                                    ),
                                  )
                                ] === undefined
                              ) {
                                obj[
                                  nixScope.concatStringsSep(".")(
                                    nixScope.reverseList(
                                      nixScope.tail(nixScope.path),
                                    ),
                                  )
                                ] = {};
                              }
                              obj[
                                nixScope.concatStringsSep(".")(
                                  nixScope.reverseList(
                                    nixScope.tail(nixScope.path),
                                  ),
                                )
                              ][nixScope.head(nixScope.path)] = nixScope.value;
                              return obj;
                            })),
                            () => (createScope((nixScope) => {
                              const obj = {};
                              obj[nixScope.head(nixScope.path)] =
                                nixScope.value;
                              return obj;
                            })),
                          )),
                        )
                      ))
                    )));
                  return createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                    nixScope.foldl(nixScope.recursiveUpdate)({})(
                      nixScope.flatten(nixScope.recurse([])(nixScope.attrs)),
                    )
                  ));
                }));
              defGetter(nixScope, "toINI_", (nixScope) =>
                nixScope.toINI(
                  {
                    "mkKeyValue": nixScope.mkKeyValue,
                    "mkSectionName": nixScope.mkSectionName,
                  },
                ));
              return nixScope.toINI_(nixScope.gitFlattenAttrs(nixScope.attrs));
            })
          )));
        defGetter(nixScope, "mkDconfKeyValue", (nixScope) =>
          nixScope.mkKeyValueDefault(
            {
              "mkValueString": createFunc(
                /*arg:*/ "v",
                null,
                {},
                (nixScope) => (
                  nixScope.toString(nixScope.gvariant["mkValue"](nixScope.v))
                ),
              ),
            },
          )("="));
        defGetter(nixScope, "toDconfINI", (nixScope) =>
          nixScope.toINI({ "mkKeyValue": nixScope.mkDconfKeyValue }));
        defGetter(nixScope, "withRecursion", (nixScope) =>
          createFunc(
            { "throwOnDepthLimit": (nixScope) => (true) },
            null,
            {},
            (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "isInt depthLimit");
                }
                return /*let*/ createScope((nixScope) => {
                  nixScope.specialAttrs = [
                    "__functor",
                    "__functionArgs",
                    "__toString",
                    "__pretty",
                  ];
                  defGetter(nixScope, "stepIntoAttr", (nixScope) =>
                    createFunc(/*arg:*/ "evalNext", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          nixScope.elem(nixScope.name)(nixScope.specialAttrs),
                          () => (nixScope.id),
                          () => (nixScope.evalNext),
                        )
                      ))
                    )));
                  defGetter(nixScope, "transform", (nixScope) =>
                    createFunc(/*arg:*/ "depth", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.and(
                          operators.notEqual(nixScope.depthLimit, null),
                          operators.greaterThan(
                            nixScope.depth,
                            nixScope.depthLimit,
                          ),
                        ),
                        () => (operators.ifThenElse(
                          nixScope.throwOnDepthLimit,
                          () => (nixScope.throw(
                            new InterpolatedString([
                              "Exceeded maximum eval-depth limit of ",
                              " while trying to evaluate with `generators.withRecursion'!",
                            ], [
                              () => (nixScope.toString(nixScope.depthLimit)),
                            ]),
                          )),
                          () => (nixScope.const("<unevaluated>")),
                        )),
                        () => (nixScope.id),
                      )
                    )));
                  defGetter(nixScope, "mapAny", (nixScope) =>
                    createFunc(/*arg:*/ "depth", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "evalNext", (nixScope) =>
                            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                              nixScope.mapAny(
                                operators.add(nixScope.depth, 1n),
                              )(
                                nixScope.transform(
                                  operators.add(nixScope.depth, 1n),
                                )(nixScope.x),
                              )
                            )));
                          return (operators.ifThenElse(
                            nixScope.isAttrs(nixScope.v),
                            () => (nixScope.mapAttrs(
                              nixScope.stepIntoAttr(nixScope.evalNext),
                            )(nixScope.v)),
                            () => (operators.ifThenElse(
                              nixScope.isList(nixScope.v),
                              () => (nixScope.map(nixScope.evalNext)(
                                nixScope.v,
                              )),
                              () => (nixScope.transform(
                                operators.add(nixScope.depth, 1n),
                              )(nixScope.v)),
                            )),
                          ));
                        })
                      ))
                    )));
                  return nixScope.mapAny(0n);
                });
              })(nixScope.isInt(nixScope.depthLimit))
            ),
          ));
        defGetter(nixScope, "toPretty", (nixScope) =>
          createFunc(
            {
              "allowPrettyValues": (nixScope) => (false),
              "multiline": (nixScope) => (true),
              "indent": (nixScope) => (""),
            },
            null,
            {},
            (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "go", (nixScope) =>
                  createFunc(/*arg:*/ "indent", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "introSpace",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            nixScope.multiline,
                            () => (new InterpolatedString(["", "  "], [
                              () => (nixScope.indent),
                            ])),
                            () => (" "),
                          )),
                        );
                        defGetter(
                          nixScope,
                          "outroSpace",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            nixScope.multiline,
                            () => (new InterpolatedString(["", ""], [
                              () => (nixScope.indent),
                            ])),
                            () => (" "),
                          )),
                        );
                        return (operators.ifThenElse(
                          nixScope.isInt(nixScope.v),
                          () => (nixScope.toString(nixScope.v)),
                          () => (operators.ifThenElse(
                            nixScope.isFloat(nixScope.v),
                            () => (nixScope.builtins["toJSON"](nixScope.v)),
                            () => (operators.ifThenElse(
                              nixScope.isString(nixScope.v),
                              () => (/*let*/ createScope((nixScope) => {
                                defGetter(nixScope, "lines", (nixScope) =>
                                  nixScope.filter(
                                    createFunc(
                                      /*arg:*/ "v",
                                      null,
                                      {},
                                      (nixScope) => (
                                        operators.negate(
                                          nixScope.isList(nixScope.v),
                                        )
                                      ),
                                    ),
                                  )(nixScope.split("")(nixScope.v)));
                                defGetter(
                                  nixScope,
                                  "escapeSingleline",
                                  (nixScope) => nixScope.escape(["", "", "$"]),
                                );
                                defGetter(
                                  nixScope,
                                  "escapeMultiline",
                                  (nixScope) =>
                                    nixScope.replaceStrings(["$", "''"])([
                                      "''",
                                      "'''",
                                    ]),
                                );
                                defGetter(
                                  nixScope,
                                  "singlelineResult",
                                  (nixScope) =>
                                    operators.add(
                                      operators.add(
                                        "",
                                        nixScope.concatStringsSep("n")(
                                          nixScope.map(
                                            nixScope.escapeSingleline,
                                          )(nixScope.lines),
                                        ),
                                      ),
                                      "",
                                    ),
                                );
                                defGetter(
                                  nixScope,
                                  "multilineResult",
                                  (nixScope) =>
                                    /*let*/ createScope((nixScope) => {
                                      defGetter(
                                        nixScope,
                                        "escapedLines",
                                        (nixScope) =>
                                          nixScope.map(
                                            nixScope.escapeMultiline,
                                          )(nixScope.lines),
                                      );
                                      defGetter(
                                        nixScope,
                                        "lastLine",
                                        (nixScope) =>
                                          nixScope.last(nixScope.escapedLines),
                                      );
                                      return operators.add(
                                        operators.add(
                                          operators.add(
                                            operators.add(
                                              "''",
                                              nixScope.introSpace,
                                            ),
                                            nixScope.concatStringsSep(
                                              nixScope.introSpace,
                                            )(nixScope.init(
                                              nixScope.escapedLines,
                                            )),
                                          ),
                                          operators.ifThenElse(
                                            operators.equal(
                                              nixScope.lastLine,
                                              "",
                                            ),
                                            () => (nixScope.outroSpace),
                                            () => (operators.add(
                                              nixScope.introSpace,
                                              nixScope.lastLine,
                                            )),
                                          ),
                                        ),
                                        "''",
                                      );
                                    }),
                                );
                                return (operators.ifThenElse(
                                  operators.and(
                                    nixScope.multiline,
                                    operators.greaterThan(
                                      nixScope.length(nixScope.lines),
                                      1n,
                                    ),
                                  ),
                                  () => (nixScope.multilineResult),
                                  () => (nixScope.singlelineResult),
                                ));
                              })),
                              () => (operators.ifThenElse(
                                operators.equal(true, nixScope.v),
                                () => ("true"),
                                () => (operators.ifThenElse(
                                  operators.equal(false, nixScope.v),
                                  () => ("false"),
                                  () => (operators.ifThenElse(
                                    operators.equal(null, nixScope.v),
                                    () => ("null"),
                                    () => (operators.ifThenElse(
                                      nixScope.isPath(nixScope.v),
                                      () => (nixScope.toString(nixScope.v)),
                                      () => (operators.ifThenElse(
                                        nixScope.isList(nixScope.v),
                                        () => (operators.ifThenElse(
                                          operators.equal(nixScope.v, []),
                                          () => ("[ ]"),
                                          () => (operators.add(
                                            operators.add(
                                              operators.add(
                                                operators.add(
                                                  "[",
                                                  nixScope.introSpace,
                                                ),
                                                nixScope.concatMapStringsSep(
                                                  nixScope.introSpace,
                                                )(nixScope.go(
                                                  operators.add(
                                                    nixScope.indent,
                                                    "  ",
                                                  ),
                                                ))(nixScope.v),
                                              ),
                                              nixScope.outroSpace,
                                            ),
                                            "]",
                                          )),
                                        )),
                                        () => (operators.ifThenElse(
                                          nixScope.isFunction(nixScope.v),
                                          () => (/*let*/ createScope(
                                            (nixScope) => {
                                              defGetter(
                                                nixScope,
                                                "fna",
                                                (nixScope) =>
                                                  nixScope.functionArgs(
                                                    nixScope.v,
                                                  ),
                                              );
                                              defGetter(
                                                nixScope,
                                                "showFnas",
                                                (nixScope) =>
                                                  nixScope.concatStringsSep(
                                                    ", ",
                                                  )(
                                                    nixScope.mapAttrsToList(
                                                      createFunc(
                                                        /*arg:*/ "name",
                                                        null,
                                                        {},
                                                        (nixScope) => (
                                                          createFunc(
                                                            /*arg:*/ "hasDefVal",
                                                            null,
                                                            {},
                                                            (nixScope) => (
                                                              operators
                                                                .ifThenElse(
                                                                  nixScope
                                                                    .hasDefVal,
                                                                  () => (operators
                                                                    .add(
                                                                      nixScope
                                                                        .name,
                                                                      "?",
                                                                    )),
                                                                  () => (nixScope
                                                                    .name),
                                                                )
                                                            ),
                                                          )
                                                        ),
                                                      ),
                                                    )(nixScope.fna),
                                                  ),
                                              );
                                              return (operators.ifThenElse(
                                                operators.equal(
                                                  nixScope.fna,
                                                  {},
                                                ),
                                                () => ("<function>"),
                                                () => (new InterpolatedString([
                                                  "<function, args: {",
                                                  "}>",
                                                ], [
                                                  () => (nixScope.showFnas),
                                                ])),
                                              ));
                                            },
                                          )),
                                          () => (operators.ifThenElse(
                                            nixScope.isAttrs(nixScope.v),
                                            () => (operators.ifThenElse(
                                              operators.and(
                                                operators.and(
                                                  nixScope.allowPrettyValues,
                                                  operators.hasAttr(
                                                    nixScope.v,
                                                    "__pretty",
                                                  ),
                                                ),
                                                operators.hasAttr(
                                                  nixScope.v,
                                                  "val",
                                                ),
                                              ),
                                              () => (nixScope.v["__pretty"](
                                                nixScope.v["val"],
                                              )),
                                              () => (operators.ifThenElse(
                                                operators.equal(nixScope.v, {}),
                                                () => ("{ }"),
                                                () => (operators.ifThenElse(
                                                  operators.and(
                                                    operators.hasAttr(
                                                      nixScope.v,
                                                      "type",
                                                    ),
                                                    operators.equal(
                                                      nixScope.v["type"],
                                                      "derivation",
                                                    ),
                                                  ),
                                                  () => (new InterpolatedString(
                                                    ["<derivation ", ">"],
                                                    [() => (operators
                                                      .selectOrDefault(
                                                        nixScope.v,
                                                        ["name"],
                                                        "???",
                                                      ))],
                                                  )),
                                                  () => (operators.add(
                                                    operators.add(
                                                      operators.add(
                                                        operators.add(
                                                          "{",
                                                          nixScope.introSpace,
                                                        ),
                                                        nixScope
                                                          .concatStringsSep(
                                                            nixScope.introSpace,
                                                          )(
                                                            nixScope
                                                              .mapAttrsToList(
                                                                createFunc(
                                                                  /*arg:*/ "name",
                                                                  null,
                                                                  {},
                                                                  (
                                                                    nixScope,
                                                                  ) => (
                                                                    createFunc(
                                                                      /*arg:*/ "value",
                                                                      null,
                                                                      {},
                                                                      (
                                                                        nixScope,
                                                                      ) => (
                                                                        new InterpolatedString(
                                                                          [
                                                                            "",
                                                                            " = ",
                                                                            ";",
                                                                          ],
                                                                          [
                                                                            () => (nixScope
                                                                              .escapeNixIdentifier(
                                                                                nixScope
                                                                                  .name,
                                                                              )),
                                                                            () => (nixScope
                                                                              .addErrorContext(
                                                                                new InterpolatedString(
                                                                                  [
                                                                                    "while evaluating an attribute `",
                                                                                    "`",
                                                                                  ],
                                                                                  [() => (nixScope
                                                                                    .name)],
                                                                                ),
                                                                              )(
                                                                                nixScope
                                                                                  .go(
                                                                                    operators
                                                                                      .add(
                                                                                        nixScope
                                                                                          .indent,
                                                                                        "  ",
                                                                                      ),
                                                                                  )(
                                                                                    nixScope
                                                                                      .value,
                                                                                  ),
                                                                              )),
                                                                          ],
                                                                        )
                                                                      ),
                                                                    )
                                                                  ),
                                                                ),
                                                              )(nixScope.v),
                                                          ),
                                                      ),
                                                      nixScope.outroSpace,
                                                    ),
                                                    "}",
                                                  )),
                                                )),
                                              )),
                                            )),
                                            () => (nixScope.abort(
                                              new InterpolatedString([
                                                "generators.toPretty: should never happen (v = ",
                                                ")",
                                              ], [() => (nixScope.v)]),
                                            )),
                                          )),
                                        )),
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
                  )));
                return nixScope.go(nixScope.indent);
              })
            ),
          ));
        defGetter(nixScope, "toPlist", (nixScope) =>
          createFunc(
            { "escape": (nixScope) => (false) },
            null,
            {},
            (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "expr", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.equal(nixScope.x, null),
                          () => (""),
                          () => (operators.ifThenElse(
                            nixScope.isBool(nixScope.x),
                            () => (nixScope.bool(nixScope.ind)(nixScope.x)),
                            () => (operators.ifThenElse(
                              nixScope.isInt(nixScope.x),
                              () => (nixScope.int(nixScope.ind)(nixScope.x)),
                              () => (operators.ifThenElse(
                                nixScope.isString(nixScope.x),
                                () => (nixScope.str(nixScope.ind)(nixScope.x)),
                                () => (operators.ifThenElse(
                                  nixScope.isList(nixScope.x),
                                  () => (nixScope.list(nixScope.ind)(
                                    nixScope.x,
                                  )),
                                  () => (operators.ifThenElse(
                                    nixScope.isAttrs(nixScope.x),
                                    () => (nixScope.attrs(nixScope.ind)(
                                      nixScope.x,
                                    )),
                                    () => (operators.ifThenElse(
                                      nixScope.isPath(nixScope.x),
                                      () => (nixScope.str(nixScope.ind)(
                                        nixScope.toString(nixScope.x),
                                      )),
                                      () => (operators.ifThenElse(
                                        nixScope.isFloat(nixScope.x),
                                        () => (nixScope.float(nixScope.ind)(
                                          nixScope.x,
                                        )),
                                        () => (nixScope.abort(
                                          new InterpolatedString([
                                            "generators.toPlist: should never happen (v = ",
                                            ")",
                                          ], [() => (nixScope.v)]),
                                        )),
                                      )),
                                    )),
                                  )),
                                )),
                              )),
                            )),
                          )),
                        )
                      ))
                    )));
                  defGetter(nixScope, "literal", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        operators.add(nixScope.ind, nixScope.x)
                      ))
                    )));
                  defGetter(
                    nixScope,
                    "maybeEscapeXML",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      nixScope.escape,
                      () => (nixScope.escapeXML),
                      () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.x
                      ))),
                    )),
                  );
                  defGetter(nixScope, "bool", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.literal(nixScope.ind)(
                          operators.ifThenElse(
                            nixScope.x,
                            () => ("<true/>"),
                            () => ("<false/>"),
                          ),
                        )
                      ))
                    )));
                  defGetter(nixScope, "int", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.literal(nixScope.ind)(
                          new InterpolatedString(["<integer>", "</integer>"], [
                            () => (nixScope.toString(nixScope.x)),
                          ]),
                        )
                      ))
                    )));
                  defGetter(nixScope, "str", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.literal(nixScope.ind)(
                          new InterpolatedString(["<string>", "</string>"], [
                            () => (nixScope.maybeEscapeXML(nixScope.x)),
                          ]),
                        )
                      ))
                    )));
                  defGetter(nixScope, "key", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.literal(nixScope.ind)(
                          new InterpolatedString(["<key>", "</key>"], [
                            () => (nixScope.maybeEscapeXML(nixScope.x)),
                          ]),
                        )
                      ))
                    )));
                  defGetter(nixScope, "float", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.literal(nixScope.ind)(
                          new InterpolatedString(["<real>", "</real>"], [
                            () => (nixScope.toString(nixScope.x)),
                          ]),
                        )
                      ))
                    )));
                  defGetter(nixScope, "indent", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      nixScope.expr(
                        new InterpolatedString(["", ""], [
                          () => (nixScope.ind),
                        ]),
                      )
                    )));
                  defGetter(nixScope, "item", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      nixScope.concatMapStringsSep("")(
                        nixScope.indent(nixScope.ind),
                      )
                    )));
                  defGetter(nixScope, "list", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.concatStringsSep("")([
                          nixScope.literal(nixScope.ind)("<array>"),
                          nixScope.item(nixScope.ind)(nixScope.x),
                          nixScope.literal(nixScope.ind)("</array>"),
                        ])
                      ))
                    )));
                  defGetter(nixScope, "attrs", (nixScope) =>
                    createFunc(/*arg:*/ "ind", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                        nixScope.concatStringsSep("")([
                          nixScope.literal(nixScope.ind)("<dict>"),
                          nixScope.attr(nixScope.ind)(nixScope.x),
                          nixScope.literal(nixScope.ind)("</dict>"),
                        ])
                      ))
                    )));
                  defGetter(nixScope, "attr", (nixScope) =>
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "attrFilter", (nixScope) =>
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            operators.and(
                              operators.notEqual(nixScope.name, "_module"),
                              operators.notEqual(nixScope.value, null),
                            )
                          ))
                        )));
                      return createFunc(
                        /*arg:*/ "ind",
                        null,
                        {},
                        (nixScope) => (
                          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                            nixScope.concatStringsSep("")(
                              nixScope.flatten(
                                nixScope.mapAttrsToList(
                                  createFunc(
                                    /*arg:*/ "name",
                                    null,
                                    {},
                                    (nixScope) => (
                                      createFunc(
                                        /*arg:*/ "value",
                                        null,
                                        {},
                                        (nixScope) => (
                                          nixScope.optionals(
                                            nixScope.attrFilter(nixScope.name)(
                                              nixScope.value,
                                            ),
                                          )([
                                            nixScope.key(
                                              new InterpolatedString(["", ""], [
                                                () => (nixScope.ind),
                                              ]),
                                            )(nixScope.name),
                                            nixScope.expr(
                                              new InterpolatedString(["", ""], [
                                                () => (nixScope.ind),
                                              ]),
                                            )(nixScope.value),
                                          ])
                                        ),
                                      )
                                    ),
                                  ),
                                )(nixScope.x),
                              ),
                            )
                          ))
                        ),
                      );
                    }));
                  return nixScope.lib["warnIf"](
                    operators.and(
                      operators.negate(nixScope.escape),
                      nixScope.lib["oldestSupportedReleaseIsAtLeast"](2505n),
                    ),
                  )("Using `lib.generators.toPlist` without `escape = true` is deprecated")(
                    new InterpolatedString([
                      '\n        <?xml version="1.0" encoding="UTF-8"?>\n        <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n        <plist version="1.0">\n        ',
                      "\n        </plist>",
                    ], [() => (nixScope.expr("")(nixScope.v))]),
                  );
                })
              ))
            ),
          ));
        defGetter(nixScope, "toDhall", (nixScope) =>
          createFunc({}, "args", {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "concatItems", (nixScope) =>
                  nixScope.concatStringsSep(", "));
                return (operators.ifThenElse(
                  nixScope.isAttrs(nixScope.v),
                  () => (new InterpolatedString(["{ ", " }"], [
                    () => (nixScope.concatItems(
                      nixScope.mapAttrsToList(
                        createFunc(/*arg:*/ "key", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            new InterpolatedString(["", " = ", ""], [
                              () => (nixScope.key),
                              () => (nixScope.toDhall(nixScope.args)(
                                nixScope.value,
                              )),
                            ])
                          ))
                        )),
                      )(nixScope.v),
                    )),
                  ])),
                  () => (operators.ifThenElse(
                    nixScope.isList(nixScope.v),
                    () => (new InterpolatedString(["[ ", " ]"], [
                      () => (nixScope.concatItems(
                        nixScope.map(nixScope.toDhall(nixScope.args))(
                          nixScope.v,
                        ),
                      )),
                    ])),
                    () => (operators.ifThenElse(
                      nixScope.isInt(nixScope.v),
                      () => (new InterpolatedString(["", "", ""], [
                        () => (operators.ifThenElse(
                          operators.lessThan(nixScope.v, 0n),
                          () => (""),
                          () => ("+"),
                        )),
                        () => (nixScope.toString(nixScope.v)),
                      ])),
                      () => (operators.ifThenElse(
                        nixScope.isBool(nixScope.v),
                        () => (operators.ifThenElse(
                          nixScope.v,
                          () => ("True"),
                          () => ("False"),
                        )),
                        () => (operators.ifThenElse(
                          nixScope.isFunction(nixScope.v),
                          () => (nixScope.abort(
                            "generators.toDhall: cannot convert a function to Dhall",
                          )),
                          () => (operators.ifThenElse(
                            operators.equal(nixScope.v, null),
                            () => (nixScope.abort(
                              "generators.toDhall: cannot convert a null to Dhall",
                            )),
                            () => (nixScope.toJSON(nixScope.v)),
                          )),
                        )),
                      )),
                    )),
                  )),
                ));
              })
            ))
          )));
        defGetter(nixScope, "toLua", (nixScope) =>
          createFunc(
            {
              "multiline": (nixScope) => (true),
              "indent": (nixScope) => (""),
              "asBindings": (nixScope) => (false),
            },
            "args",
            {},
            (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  nixScope.innerIndent = new InterpolatedString(["", "  "], [
                    () => (nixScope.indent),
                  ]);
                  defGetter(
                    nixScope,
                    "introSpace",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      nixScope.multiline,
                      () => (new InterpolatedString(["", ""], [
                        () => (nixScope.innerIndent),
                      ])),
                      () => (" "),
                    )),
                  );
                  defGetter(
                    nixScope,
                    "outroSpace",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      nixScope.multiline,
                      () => (new InterpolatedString(["", ""], [
                        () => (nixScope.indent),
                      ])),
                      () => (" "),
                    )),
                  );
                  defGetter(nixScope, "innerArgs", (nixScope) =>
                    operators.merge(
                      nixScope.args,
                      {
                        "indent":
                          (operators.ifThenElse(
                            nixScope.asBindings,
                            () => (nixScope.indent),
                            () => (nixScope.innerIndent),
                          )),
                        "asBindings": false,
                      },
                    ));
                  defGetter(nixScope, "concatItems", (nixScope) =>
                    nixScope.concatStringsSep(
                      new InterpolatedString([",", ""], [
                        () => (nixScope.introSpace),
                      ]),
                    ));
                  defGetter(nixScope, "isLuaInline", (nixScope) =>
                    createFunc(
                      { "_type": (nixScope) => (null) },
                      null,
                      {},
                      (nixScope) => (
                        operators.equal(nixScope._type, "lua-inline")
                      ),
                    ));
                  defGetter(nixScope, "generatedBindings", (nixScope) =>
                    ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " +
                            'assertMsg (badVarNames == [ ]) "Bad Lua var names: ${toPretty { } badVarNames}"',
                        );
                      }
                      return nixScope.concatStrings(
                        nixScope.mapAttrsToList(
                          createFunc(/*arg:*/ "key", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "value",
                              null,
                              {},
                              (nixScope) => (
                                new InterpolatedString(["", "", " = ", ""], [
                                  () => (nixScope.indent),
                                  () => (nixScope.key),
                                  () => (nixScope.toLua(nixScope.innerArgs)(
                                    nixScope.value,
                                  )),
                                ])
                              ),
                            )
                          )),
                        )(nixScope.v),
                      );
                    })(
                      nixScope.assertMsg(
                        operators.equal(nixScope.badVarNames, []),
                      )(
                        new InterpolatedString(["Bad Lua var names: ", ""], [
                          () => (nixScope.toPretty({})(nixScope.badVarNames)),
                        ]),
                      ),
                    ));
                  defGetter(
                    nixScope,
                    "matchVarName",
                    (nixScope) => nixScope.match("[[:alpha:]_][[:alnum:]_]*("),
                  );
                  defGetter(
                    nixScope,
                    "badVarNames",
                    (nixScope) =>
                      nixScope.filter(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          operators.equal(
                            nixScope.matchVarName(nixScope.name),
                            null,
                          )
                        )),
                      )(nixScope.attrNames(nixScope.v)),
                  );
                  return (operators.ifThenElse(
                    nixScope.asBindings,
                    () => (nixScope.generatedBindings),
                    () => (operators.ifThenElse(
                      operators.equal(nixScope.v, null),
                      () => ("nil"),
                      () => (operators.ifThenElse(
                        operators.or(
                          operators.or(
                            operators.or(
                              nixScope.isInt(nixScope.v),
                              nixScope.isFloat(nixScope.v),
                            ),
                            nixScope.isString(nixScope.v),
                          ),
                          nixScope.isBool(nixScope.v),
                        ),
                        () => (nixScope.toJSON(nixScope.v)),
                        () => (operators.ifThenElse(
                          operators.or(
                            nixScope.isPath(nixScope.v),
                            nixScope.isDerivation(nixScope.v),
                          ),
                          () => (nixScope.toJSON(
                            new InterpolatedString(["", ""], [
                              () => (nixScope.v),
                            ]),
                          )),
                          () => (operators.ifThenElse(
                            nixScope.isList(nixScope.v),
                            () => (operators.ifThenElse(
                              operators.equal(nixScope.v, []),
                              () => ("{}"),
                              () => (new InterpolatedString(
                                ["{", "", "", "}"],
                                [
                                  () => (nixScope.introSpace),
                                  () => (nixScope.concatItems(
                                    nixScope.map(
                                      createFunc(
                                        /*arg:*/ "value",
                                        null,
                                        {},
                                        (nixScope) => (
                                          new InterpolatedString(["", ""], [
                                            () => (nixScope.toLua(
                                              nixScope.innerArgs,
                                            )(nixScope.value)),
                                          ])
                                        ),
                                      ),
                                    )(nixScope.v),
                                  )),
                                  () => (nixScope.outroSpace),
                                ],
                              )),
                            )),
                            () => (operators.ifThenElse(
                              nixScope.isAttrs(nixScope.v),
                              () => (operators.ifThenElse(
                                nixScope.isLuaInline(nixScope.v),
                                () => (new InterpolatedString(["(", ")"], [
                                  () => (nixScope.v["expr"]),
                                ])),
                                () => (operators.ifThenElse(
                                  operators.equal(nixScope.v, {}),
                                  () => ("{}"),
                                  () => (new InterpolatedString([
                                    "{",
                                    "",
                                    "",
                                    "}",
                                  ], [
                                    () => (nixScope.introSpace),
                                    () => (nixScope.concatItems(
                                      nixScope.mapAttrsToList(
                                        createFunc(
                                          /*arg:*/ "key",
                                          null,
                                          {},
                                          (nixScope) => (
                                            createFunc(
                                              /*arg:*/ "value",
                                              null,
                                              {},
                                              (nixScope) => (
                                                new InterpolatedString([
                                                  "[",
                                                  "] = ",
                                                  "",
                                                ], [
                                                  () => (nixScope.toJSON(
                                                    nixScope.key,
                                                  )),
                                                  () => (nixScope.toLua(
                                                    nixScope.innerArgs,
                                                  )(nixScope.value)),
                                                ])
                                              ),
                                            )
                                          ),
                                        ),
                                      )(nixScope.v),
                                    )),
                                    () => (nixScope.outroSpace),
                                  ])),
                                )),
                              )),
                              () => (nixScope.abort(
                                new InterpolatedString([
                                  "generators.toLua: type ",
                                  " is unsupported",
                                ], [() => (nixScope.typeOf(nixScope.v))]),
                              )),
                            )),
                          )),
                        )),
                      )),
                    )),
                  ));
                })
              ))
            ),
          ));
        defGetter(nixScope, "mkLuaInline", (nixScope) =>
          createFunc(/*arg:*/ "expr", null, {}, (nixScope) => (
            { "_type": "lua-inline", "expr": nixScope.expr }
          )));
        return nixScope;
      }),
      {
        "toJSON": createFunc({}, null, {}, (nixScope) => (
          nixScope.lib["strings"]["toJSON"]
        )),
        "toYAML": createFunc({}, null, {}, (nixScope) => (
          nixScope.lib["strings"]["toJSON"]
        )),
      },
    );
  })
));
