export default /**
  String manipulation functions.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.length = nixScope.builtins["length"];
    nixScope.warnIf = nixScope.lib["trivial"]["warnIf"];
    defGetter(
      nixScope,
      "asciiTable",
      (nixScope) => nixScope.import(new Path(["./ascii-table.nix"], [])),
    );
    return /*rec*/ createScope((nixScope) => {
      nixScope.compareVersions = nixScope.builtins["compareVersions"];
      nixScope.elem = nixScope.builtins["elem"];
      nixScope.elemAt = nixScope.builtins["elemAt"];
      nixScope.filter = nixScope.builtins["filter"];
      nixScope.fromJSON = nixScope.builtins["fromJSON"];
      nixScope.genList = nixScope.builtins["genList"];
      nixScope.head = nixScope.builtins["head"];
      nixScope.isInt = nixScope.builtins["isInt"];
      nixScope.isList = nixScope.builtins["isList"];
      nixScope.isAttrs = nixScope.builtins["isAttrs"];
      nixScope.isPath = nixScope.builtins["isPath"];
      nixScope.isString = nixScope.builtins["isString"];
      nixScope.match = nixScope.builtins["match"];
      nixScope.parseDrvName = nixScope.builtins["parseDrvName"];
      nixScope.readFile = nixScope.builtins["readFile"];
      nixScope.replaceStrings = nixScope.builtins["replaceStrings"];
      nixScope.split = nixScope.builtins["split"];
      nixScope.storeDir = nixScope.builtins["storeDir"];
      nixScope.stringLength = nixScope.builtins["stringLength"];
      nixScope.substring = nixScope.builtins["substring"];
      nixScope.tail = nixScope.builtins["tail"];
      nixScope.toJSON = nixScope.builtins["toJSON"];
      nixScope.typeOf = nixScope.builtins["typeOf"];
      nixScope.unsafeDiscardStringContext =
        nixScope.builtins["unsafeDiscardStringContext"];
      defGetter(
        nixScope,
        "concatStrings",
        (nixScope) => nixScope.builtins["concatStringsSep"](""),
      );
      defGetter(
        nixScope,
        "concatMapStrings",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.concatStrings(nixScope.map(nixScope.f)(nixScope.list))
            ))
          )),
      );
      defGetter(
        nixScope,
        "concatImapStrings",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              nixScope.concatStrings(
                nixScope.lib["imap1"](nixScope.f)(nixScope.list),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "intersperse",
        (nixScope) =>
          createFunc(/*arg:*/ "separator", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.or(
                  operators.equal(nixScope.list, []),
                  operators.equal(nixScope.length(nixScope.list), 1n),
                ),
                () => (nixScope.list),
                () => (nixScope.tail(
                  nixScope.lib["concatMap"](
                    createFunc(
                      /*arg:*/ "x",
                      null,
                      {},
                      (nixScope) => [nixScope.separator, nixScope.x],
                    ),
                  )(nixScope.list),
                )),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "concatStringsSep",
        (nixScope) => nixScope.builtins["concatStringsSep"],
      );
      defGetter(
        nixScope,
        "concatMapStringsSep",
        (nixScope) =>
          createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                nixScope.concatStringsSep(nixScope.sep)(
                  nixScope.map(nixScope.f)(nixScope.list),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "concatImapStringsSep",
        (nixScope) =>
          createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
                nixScope.concatStringsSep(nixScope.sep)(
                  nixScope.lib["imap1"](nixScope.f)(nixScope.list),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "concatMapAttrsStringSep",
        (nixScope) =>
          createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
                nixScope.concatStringsSep(nixScope.sep)(
                  nixScope.lib["attrValues"](
                    nixScope.lib["mapAttrs"](nixScope.f)(nixScope.attrs),
                  ),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "concatLines",
        (nixScope) =>
          nixScope.concatMapStrings(
            createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
              operators.add(nixScope.s, "")
            )),
          ),
      );
      defGetter(
        nixScope,
        "replaceString",
        (nixScope) =>
          createFunc(/*arg:*/ "from", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "to", null, {}, (nixScope) => (
              nixScope.replaceStrings([nixScope.from])([nixScope.to])
            ))
          )),
      );
      defGetter(
        nixScope,
        "replicate",
        (nixScope) =>
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
              nixScope.concatStrings(
                nixScope.lib["lists"]["replicate"](nixScope.n)(nixScope.s),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "trim",
        (nixScope) => nixScope.trimWith({ "start": true, "end": true }),
      );
      defGetter(
        nixScope,
        "trimWith",
        (nixScope) =>
          createFunc(
            { "start": (nixScope) => (false), "end": (nixScope) => (false) },
            null,
            {},
            (nixScope) => (
              /*let*/ createScope((nixScope) => {
                nixScope.chars = " ";
                defGetter(
                  nixScope,
                  "regex",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.and(nixScope.start, nixScope.end),
                    () => (new InterpolatedString(
                      ["[", "]*(.*[^", "])[", "]*"],
                      [
                        () => (nixScope.chars),
                        () => (nixScope.chars),
                        () => (nixScope.chars),
                      ],
                    )),
                    () => (operators.ifThenElse(
                      nixScope.start,
                      () => (new InterpolatedString(["[", "]*(.*)"], [
                        () => (nixScope.chars),
                      ])),
                      () => (operators.ifThenElse(
                        nixScope.end,
                        () => (new InterpolatedString(["(.*[^", "])[", "]*"], [
                          () => (nixScope.chars),
                          () => (nixScope.chars),
                        ])),
                        () => ("(.*)"),
                      )),
                    )),
                  )),
                );
                return createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "res",
                      (nixScope) => nixScope.match(nixScope.regex)(nixScope.s),
                    );
                    return nixScope.optionalString(
                      operators.notEqual(nixScope.res, null),
                    )(nixScope.head(nixScope.res));
                  })
                ));
              })
            ),
          ),
      );
      defGetter(
        nixScope,
        "makeSearchPath",
        (nixScope) =>
          createFunc(/*arg:*/ "subDir", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "paths", null, {}, (nixScope) => (
              nixScope.concatStringsSep(":")(
                nixScope.map(
                  createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                    operators.add(
                      operators.add(nixScope.path, "/"),
                      nixScope.subDir,
                    )
                  )),
                )(
                  nixScope.filter(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      operators.notEqual(nixScope.x, null)
                    )),
                  )(nixScope.paths),
                ),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "makeSearchPathOutput",
        (nixScope) =>
          createFunc(/*arg:*/ "output", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "subDir", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
                nixScope.makeSearchPath(nixScope.subDir)(
                  nixScope.map(nixScope.lib["getOutput"](nixScope.output))(
                    nixScope.pkgs,
                  ),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "makeLibraryPath",
        (nixScope) => nixScope.makeSearchPathOutput("lib")("lib"),
      );
      defGetter(
        nixScope,
        "makeIncludePath",
        (nixScope) => nixScope.makeSearchPathOutput("dev")("include"),
      );
      defGetter(
        nixScope,
        "makeBinPath",
        (nixScope) => nixScope.makeSearchPathOutput("bin")("bin"),
      );
      defGetter(
        nixScope,
        "normalizePath",
        (nixScope) =>
          createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
            nixScope.warnIf(nixScope.isPath(nixScope.s))(
              new InterpolatedString([
                "\n        lib.strings.normalizePath: The argument (",
                ') is a path value, but only strings are supported.\n            Path values are always normalised in Nix, so there\'s no need to call this function on them.\n            This function also copies the path to the Nix store and returns the store path, the same as "${path}" will, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.',
              ], [() => (nixScope.toString(nixScope.s))]),
            )(
              nixScope.builtins["foldl'"](
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.and(
                        operators.equal(nixScope.y, "/"),
                        nixScope.hasSuffix("/")(nixScope.x),
                      ),
                      () => (nixScope.x),
                      () => (operators.add(nixScope.x, nixScope.y)),
                    )
                  ))
                )),
              )("")(nixScope.stringToCharacters(nixScope.s)),
            )
          )),
      );
      defGetter(
        nixScope,
        "optionalString",
        (nixScope) =>
          createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "string", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.cond,
                () => (nixScope.string),
                () => (""),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "hasPrefix",
        (nixScope) =>
          createFunc(/*arg:*/ "pref", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
              nixScope.warnIf(nixScope.isPath(nixScope.pref))(
                new InterpolatedString([
                  "\n        lib.strings.hasPrefix: The first argument (",
                  ") is a path value, but only strings are supported.\n            There is almost certainly a bug in the calling code, since this function always returns \\`false\\` in such a case.\n            This function also copies the path to the Nix store, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.\n            You might want to use \\`lib.path.hasPrefix\\` instead, which correctly supports paths.",
                ], [() => (nixScope.toString(nixScope.pref))]),
              )(operators.equal(
                nixScope.substring(0n)(nixScope.stringLength(nixScope.pref))(
                  nixScope.str,
                ),
                nixScope.pref,
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "hasSuffix",
        (nixScope) =>
          createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "lenContent",
                  (nixScope) => nixScope.stringLength(nixScope.content),
                );
                defGetter(
                  nixScope,
                  "lenSuffix",
                  (nixScope) => nixScope.stringLength(nixScope.suffix),
                );
                return nixScope.warnIf(nixScope.isPath(nixScope.suffix))(
                  new InterpolatedString([
                    "\n        lib.strings.hasSuffix: The first argument (",
                    ") is a path value, but only strings are supported.\n            There is almost certainly a bug in the calling code, since this function always returns \\`false\\` in such a case.\n            This function also copies the path to the Nix store, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.",
                  ], [() => (nixScope.toString(nixScope.suffix))]),
                )(operators.and(
                  operators.greaterThanOrEqual(
                    nixScope.lenContent,
                    nixScope.lenSuffix,
                  ),
                  operators.equal(
                    nixScope.substring(
                      operators.subtract(
                        nixScope.lenContent,
                        nixScope.lenSuffix,
                      ),
                    )(nixScope.lenContent)(nixScope.content),
                    nixScope.suffix,
                  ),
                ));
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "hasInfix",
        (nixScope) =>
          createFunc(/*arg:*/ "infix", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "content", null, {}, (nixScope) => (
              nixScope.warnIf(nixScope.isPath(nixScope.infix))(
                new InterpolatedString([
                  "\n        lib.strings.hasInfix: The first argument (",
                  ") is a path value, but only strings are supported.\n            There is almost certainly a bug in the calling code, since this function always returns \\`false\\` in such a case.\n            This function also copies the path to the Nix store, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.",
                ], [() => (nixScope.toString(nixScope.infix))]),
              )(operators.notEqual(
                nixScope.builtins["match"](
                  new InterpolatedString([".*", ".*"], [
                    () => (nixScope.escapeRegex(nixScope.infix)),
                  ]),
                )(new InterpolatedString(["", ""], [() => (nixScope.content)])),
                null,
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "stringToCharacters",
        (nixScope) =>
          createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
            nixScope.genList(createFunc(/*arg:*/ "p", null, {}, (nixScope) => (
              nixScope.substring(nixScope.p)(1n)(nixScope.s)
            )))(nixScope.stringLength(nixScope.s))
          )),
      );
      defGetter(
        nixScope,
        "stringAsChars",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
              nixScope.concatStrings(
                nixScope.map(nixScope.f)(
                  nixScope.stringToCharacters(nixScope.s),
                ),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "charToInt",
        (nixScope) =>
          createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
            nixScope.builtins["getAttr"](nixScope.c)(nixScope.asciiTable)
          )),
      );
      defGetter(
        nixScope,
        "escape",
        (nixScope) =>
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            nixScope.replaceStrings(nixScope.list)(
              nixScope.map(createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
                new InterpolatedString(["", ""], [() => (nixScope.c)])
              )))(nixScope.list),
            )
          )),
      );
      defGetter(
        nixScope,
        "escapeC",
        (nixScope) =>
          createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
            nixScope.replaceStrings(nixScope.list)(
              nixScope.map(createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
                new InterpolatedString(["x", ""], [
                  () => (nixScope.fixedWidthString(2n)("0")(
                    nixScope.toLower(
                      nixScope.lib["toHexString"](
                        nixScope.charToInt(nixScope.c),
                      ),
                    ),
                  )),
                ])
              )))(nixScope.list),
            )
          )),
      );
      defGetter(
        nixScope,
        "escapeURL",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            nixScope.unreserved = [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
              "a",
              "b",
              "c",
              "d",
              "e",
              "f",
              "g",
              "h",
              "i",
              "j",
              "k",
              "l",
              "m",
              "n",
              "o",
              "p",
              "q",
              "r",
              "s",
              "t",
              "u",
              "v",
              "w",
              "x",
              "y",
              "z",
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "-",
              "_",
              ".",
              "~",
            ];
            defGetter(nixScope, "toEscape", (nixScope) =>
              nixScope.builtins["removeAttrs"](nixScope.asciiTable)(
                nixScope.unreserved,
              ));
            return nixScope.replaceStrings(
              nixScope.builtins["attrNames"](nixScope.toEscape),
            )(
              nixScope.lib["mapAttrsToList"](
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "c", null, {}, (nixScope) => (
                    new InterpolatedString(["%", ""], [
                      () => (nixScope.fixedWidthString(2n)("0")(
                        nixScope.lib["toHexString"](nixScope.c),
                      )),
                    ])
                  ))
                )),
              )(nixScope.toEscape),
            );
          }),
      );
      defGetter(
        nixScope,
        "escapeShellArg",
        (nixScope) =>
          createFunc(/*arg:*/ "arg", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "string",
                (nixScope) => nixScope.toString(nixScope.arg),
              );
              return (operators.ifThenElse(
                operators.equal(
                  nixScope.match("[[:alnum:],._+:@%/-]+")(nixScope.string),
                  null,
                ),
                () => (new InterpolatedString(["'", "'"], [
                  () => (nixScope.replaceString("'")("'")(nixScope.string)),
                ])),
                () => (nixScope.string),
              ));
            })
          )),
      );
      defGetter(
        nixScope,
        "escapeShellArgs",
        (nixScope) =>
          nixScope.concatMapStringsSep(" ")(nixScope.escapeShellArg),
      );
      defGetter(
        nixScope,
        "isValidPosixName",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            operators.notEqual(
              nixScope.match("[a-zA-Z_][a-zA-Z0-9_]*")(nixScope.name),
              null,
            )
          )),
      );
      defGetter(
        nixScope,
        "toShellVar",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              nixScope.lib["throwIfNot"](
                nixScope.isValidPosixName(nixScope.name),
              )(
                new InterpolatedString([
                  "toShellVar: ",
                  " is not a valid shell variable name",
                ], [() => (nixScope.name)]),
              )(operators.ifThenElse(
                operators.and(
                  nixScope.isAttrs(nixScope.value),
                  operators.negate(nixScope.isStringLike(nixScope.value)),
                ),
                () => (new InterpolatedString(["declare -A ", "=(", ")"], [
                  () => (nixScope.name),
                  () => (nixScope.concatStringsSep(" ")(
                    nixScope.lib["mapAttrsToList"](
                      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                          new InterpolatedString(["[", "]=", ""], [
                            () => (nixScope.escapeShellArg(nixScope.n)),
                            () => (nixScope.escapeShellArg(nixScope.v)),
                          ])
                        ))
                      )),
                    )(nixScope.value),
                  )),
                ])),
                () => (operators.ifThenElse(
                  nixScope.isList(nixScope.value),
                  () => (new InterpolatedString(["declare -a ", "=(", ")"], [
                    () => (nixScope.name),
                    () => (nixScope.escapeShellArgs(nixScope.value)),
                  ])),
                  () => (new InterpolatedString(["", "=", ""], [
                    () => (nixScope.name),
                    () => (nixScope.escapeShellArg(nixScope.value)),
                  ])),
                )),
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "toShellVars",
        (nixScope) =>
          createFunc(/*arg:*/ "vars", null, {}, (nixScope) => (
            nixScope.concatStringsSep("")(
              nixScope.lib["mapAttrsToList"](nixScope.toShellVar)(
                nixScope.vars,
              ),
            )
          )),
      );
      defGetter(
        nixScope,
        "escapeNixString",
        (nixScope) =>
          createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
            nixScope.escape(["$"])(nixScope.toJSON(nixScope.s))
          )),
      );
      defGetter(
        nixScope,
        "escapeRegex",
        (nixScope) =>
          nixScope.escape(nixScope.stringToCharacters("[{()^$?*+|.")),
      );
      defGetter(
        nixScope,
        "escapeNixIdentifier",
        (nixScope) =>
          createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.notEqual(
                nixScope.match("[a-zA-Z_][a-zA-Z0-9_'-]*")(nixScope.s),
                null,
              ),
              () => (nixScope.s),
              () => (nixScope.escapeNixString(nixScope.s)),
            )
          )),
      );
      defGetter(
        nixScope,
        "escapeXML",
        (nixScope) =>
          nixScope.builtins["replaceStrings"](["", "'", "<", ">", "&"])([
            "&quot;",
            "&apos;",
            "&lt;",
            "&gt;",
            "&amp;",
          ]),
      );
      defGetter(
        nixScope,
        "replaceChars",
        (nixScope) =>
          nixScope.lib["warn"](
            "lib.replaceChars is a deprecated alias of lib.replaceStrings.",
          )(nixScope.builtins["replaceStrings"]),
      );
      defGetter(
        nixScope,
        "lowerChars",
        (nixScope) => nixScope.stringToCharacters("abcdefghijklmnopqrstuvwxyz"),
      );
      defGetter(
        nixScope,
        "upperChars",
        (nixScope) => nixScope.stringToCharacters("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      );
      defGetter(
        nixScope,
        "toLower",
        (nixScope) =>
          nixScope.replaceStrings(nixScope.upperChars)(nixScope.lowerChars),
      );
      defGetter(
        nixScope,
        "toUpper",
        (nixScope) =>
          nixScope.replaceStrings(nixScope.lowerChars)(nixScope.upperChars),
      );
      defGetter(
        nixScope,
        "toSentenceCase",
        (nixScope) =>
          createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
            nixScope.lib["throwIfNot"](nixScope.isString(nixScope.str))(
              new InterpolatedString([
                "toSentenceCase does only accepts string values, but got ",
                "",
              ], [() => (nixScope.typeOf(nixScope.str))]),
            )(/*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "firstChar",
                (nixScope) => nixScope.substring(0n)(1n)(nixScope.str),
              );
              defGetter(
                nixScope,
                "rest",
                (nixScope) =>
                  nixScope.substring(1n)(nixScope.stringLength(nixScope.str))(
                    nixScope.str,
                  ),
              );
              return nixScope.addContextFrom(nixScope.str)(
                operators.add(
                  nixScope.toUpper(nixScope.firstChar),
                  nixScope.toLower(nixScope.rest),
                ),
              );
            }))
          )),
      );
      defGetter(
        nixScope,
        "toCamelCase",
        (nixScope) =>
          createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
            nixScope.lib["throwIfNot"](nixScope.isString(nixScope.str))(
              new InterpolatedString([
                "toCamelCase does only accepts string values, but got ",
                "",
              ], [() => (nixScope.typeOf(nixScope.str))]),
            )(/*let*/ createScope((nixScope) => {
              defGetter(nixScope, "separators", (nixScope) =>
                nixScope.splitStringBy(
                  createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "curr", null, {}, (nixScope) => (
                      nixScope.elem(nixScope.curr)(["-", "_", " "])
                    ))
                  )),
                )(false)(nixScope.str));
              defGetter(nixScope, "parts", (nixScope) =>
                nixScope.lib["flatten"](
                  nixScope.map(
                    nixScope.splitStringBy(
                      createFunc(/*arg:*/ "prev", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "curr", null, {}, (nixScope) => (
                          operators.and(
                            operators.notEqual(
                              nixScope.match("[a-z]")(nixScope.prev),
                              null,
                            ),
                            operators.notEqual(
                              nixScope.match("[A-Z]")(nixScope.curr),
                              null,
                            ),
                          )
                        ))
                      )),
                    )(true),
                  )(nixScope.separators),
                ));
              defGetter(
                nixScope,
                "first",
                (
                  nixScope,
                ) => (operators.ifThenElse(
                  operators.greaterThan(nixScope.length(nixScope.parts), 0n),
                  () => (nixScope.toLower(nixScope.head(nixScope.parts))),
                  () => (""),
                )),
              );
              defGetter(
                nixScope,
                "rest",
                (
                  nixScope,
                ) => (operators.ifThenElse(
                  operators.greaterThan(nixScope.length(nixScope.parts), 1n),
                  () => (nixScope.map(nixScope.toSentenceCase)(
                    nixScope.tail(nixScope.parts),
                  )),
                  () => [],
                )),
              );
              return nixScope.concatStrings(
                nixScope.map(nixScope.addContextFrom(nixScope.str))(
                  operators.listConcat([nixScope.first], nixScope.rest),
                ),
              );
            }))
          )),
      );
      defGetter(
        nixScope,
        "addContextFrom",
        (nixScope) =>
          createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "target", null, {}, (nixScope) => (
              operators.add(
                nixScope.substring(0n)(0n)(nixScope.src),
                nixScope.target,
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "splitString",
        (nixScope) =>
          createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "splits", (nixScope) =>
                  nixScope.builtins["filter"](nixScope.builtins["isString"])(
                    nixScope.builtins["split"](
                      nixScope.escapeRegex(nixScope.toString(nixScope.sep)),
                    )(nixScope.toString(nixScope.s)),
                  ));
                return nixScope.map(nixScope.addContextFrom(nixScope.s))(
                  nixScope.splits,
                );
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "splitStringBy",
        (nixScope) =>
          createFunc(/*arg:*/ "predicate", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "keepSplit", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "len",
                    (nixScope) => nixScope.stringLength(nixScope.str),
                  );
                  defGetter(nixScope, "go", (nixScope) =>
                    createFunc(/*arg:*/ "pos", null, {}, (nixScope) => (
                      createFunc(
                        /*arg:*/ "currentPart",
                        null,
                        {},
                        (nixScope) => (
                          createFunc(
                            /*arg:*/ "result",
                            null,
                            {},
                            (nixScope) => (
                              operators.ifThenElse(
                                operators.equal(nixScope.pos, nixScope.len),
                                () => (operators.listConcat(nixScope.result, [
                                  nixScope.currentPart,
                                ])),
                                () => (/*let*/ createScope((nixScope) => {
                                  defGetter(nixScope, "currChar", (nixScope) =>
                                    nixScope.substring(nixScope.pos)(1n)(
                                      nixScope.str,
                                    ));
                                  defGetter(
                                    nixScope,
                                    "prevChar",
                                    (
                                      nixScope,
                                    ) => (operators.ifThenElse(
                                      operators.greaterThan(nixScope.pos, 0n),
                                      () => (nixScope.substring(
                                        operators.subtract(nixScope.pos, 1n),
                                      )(1n)(nixScope.str)),
                                      () => (""),
                                    )),
                                  );
                                  defGetter(nixScope, "isSplit", (nixScope) =>
                                    nixScope.predicate(nixScope.prevChar)(
                                      nixScope.currChar,
                                    ));
                                  return (operators.ifThenElse(
                                    nixScope.isSplit,
                                    () => (/*let*/ createScope((nixScope) => {
                                      defGetter(
                                        nixScope,
                                        "newResult",
                                        (nixScope) =>
                                          operators.listConcat(
                                            nixScope.result,
                                            [nixScope.currentPart],
                                          ),
                                      );
                                      defGetter(
                                        nixScope,
                                        "newCurrentPart",
                                        (
                                          nixScope,
                                        ) => (operators.ifThenElse(
                                          nixScope.keepSplit,
                                          () => (nixScope.currChar),
                                          () => (""),
                                        )),
                                      );
                                      return nixScope.go(
                                        operators.add(nixScope.pos, 1n),
                                      )(nixScope.newCurrentPart)(
                                        nixScope.newResult,
                                      );
                                    })),
                                    () => (nixScope.go(
                                      operators.add(nixScope.pos, 1n),
                                    )(operators.add(
                                      nixScope.currentPart,
                                      nixScope.currChar,
                                    ))(nixScope.result)),
                                  ));
                                })),
                              )
                            ),
                          )
                        ),
                      )
                    )));
                  return (operators.ifThenElse(
                    operators.equal(nixScope.len, 0n),
                    () => [nixScope.addContextFrom(nixScope.str)("")],
                    () => (nixScope.map(nixScope.addContextFrom(nixScope.str))(
                      nixScope.go(0n)("")([]),
                    )),
                  ));
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "removePrefix",
        (nixScope) =>
          createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
              nixScope.warnIf(nixScope.isPath(nixScope.prefix))(
                new InterpolatedString([
                  "\n        lib.strings.removePrefix: The first argument (",
                  ") is a path value, but only strings are supported.\n            There is almost certainly a bug in the calling code, since this function never removes any prefix in such a case.\n            This function also copies the path to the Nix store, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.",
                ], [() => (nixScope.toString(nixScope.prefix))]),
              )(/*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "preLen",
                  (nixScope) => nixScope.stringLength(nixScope.prefix),
                );
                return (operators.ifThenElse(
                  operators.equal(
                    nixScope.substring(0n)(nixScope.preLen)(nixScope.str),
                    nixScope.prefix,
                  ),
                  () => (nixScope.substring(nixScope.preLen)(-1n)(
                    nixScope.str,
                  )),
                  () => (nixScope.str),
                ));
              }))
            ))
          )),
      );
      defGetter(
        nixScope,
        "removeSuffix",
        (nixScope) =>
          createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
              nixScope.warnIf(nixScope.isPath(nixScope.suffix))(
                new InterpolatedString([
                  "\n        lib.strings.removeSuffix: The first argument (",
                  ") is a path value, but only strings are supported.\n            There is almost certainly a bug in the calling code, since this function never removes any suffix in such a case.\n            This function also copies the path to the Nix store, which may not be what you want.\n            This behavior is deprecated and will throw an error in the future.",
                ], [() => (nixScope.toString(nixScope.suffix))]),
              )(/*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "sufLen",
                  (nixScope) => nixScope.stringLength(nixScope.suffix),
                );
                defGetter(
                  nixScope,
                  "sLen",
                  (nixScope) => nixScope.stringLength(nixScope.str),
                );
                return (operators.ifThenElse(
                  operators.and(
                    operators.lessThanOrEqual(nixScope.sufLen, nixScope.sLen),
                    operators.equal(
                      nixScope.suffix,
                      nixScope.substring(
                        operators.subtract(nixScope.sLen, nixScope.sufLen),
                      )(nixScope.sufLen)(nixScope.str),
                    ),
                  ),
                  () => (nixScope.substring(0n)(
                    operators.subtract(nixScope.sLen, nixScope.sufLen),
                  )(nixScope.str)),
                  () => (nixScope.str),
                ));
              }))
            ))
          )),
      );
      defGetter(
        nixScope,
        "versionOlder",
        (nixScope) =>
          createFunc(/*arg:*/ "v1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v2", null, {}, (nixScope) => (
              operators.equal(
                nixScope.compareVersions(nixScope.v2)(nixScope.v1),
                1n,
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "versionAtLeast",
        (nixScope) =>
          createFunc(/*arg:*/ "v1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v2", null, {}, (nixScope) => (
              operators.negate(nixScope.versionOlder(nixScope.v1)(nixScope.v2))
            ))
          )),
      );
      defGetter(
        nixScope,
        "getName",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "parse", (nixScope) =>
              createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
                (nixScope.parseDrvName(nixScope.drv))["name"]
              )));
            return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.isString(nixScope.x),
                () => (nixScope.parse(nixScope.x)),
                () => (operators.selectOrDefault(
                  nixScope.x,
                  ["pname"],
                  nixScope.parse(nixScope.x["name"]),
                )),
              )
            ));
          }),
      );
      defGetter(
        nixScope,
        "getVersion",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "parse", (nixScope) =>
              createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
                (nixScope.parseDrvName(nixScope.drv))["version"]
              )));
            return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.isString(nixScope.x),
                () => (nixScope.parse(nixScope.x)),
                () => (operators.selectOrDefault(
                  nixScope.x,
                  ["version"],
                  nixScope.parse(nixScope.x["name"]),
                )),
              )
            ));
          }),
      );
      defGetter(
        nixScope,
        "nameFromURL",
        (nixScope) =>
          createFunc(/*arg:*/ "url", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "sep", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "components",
                  (nixScope) => nixScope.splitString("/")(nixScope.url),
                );
                defGetter(
                  nixScope,
                  "filename",
                  (nixScope) => nixScope.lib["last"](nixScope.components),
                );
                defGetter(
                  nixScope,
                  "name",
                  (nixScope) =>
                    nixScope.head(
                      nixScope.splitString(nixScope.sep)(nixScope.filename),
                    ),
                );
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error("assertion failed: " + "name != filename");
                  }
                  return nixScope.name;
                })(operators.notEqual(nixScope.name, nixScope.filename));
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "cmakeOptionType",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            nixScope.types = [
              "BOOL",
              "FILEPATH",
              "PATH",
              "STRING",
              "INTERNAL",
              "LIST",
            ];
            return createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                  ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " + "(elem (toUpper type) types)",
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " + "(isString feature)",
                        );
                      }
                      return ((_cond) => {
                        if (!_cond) {
                          throw new Error(
                            "assertion failed: " + "(isString value)",
                          );
                        }
                        return (new InterpolatedString(["-D", ":", "=", ""], [
                          () => (nixScope.feature),
                          () => (nixScope.toUpper(nixScope.type)),
                          () => (nixScope.value),
                        ]));
                      })(nixScope.isString(nixScope.value));
                    })(nixScope.isString(nixScope.feature));
                  })(
                    nixScope.elem(nixScope.toUpper(nixScope.type))(
                      nixScope.types,
                    ),
                  )
                ))
              ))
            ));
          }),
      );
      defGetter(
        nixScope,
        "cmakeBool",
        (nixScope) =>
          createFunc(/*arg:*/ "condition", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "(lib.isString condition)",
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error("assertion failed: " + "(lib.isBool flag)");
                  }
                  return nixScope.cmakeOptionType("bool")(nixScope.condition)(
                    nixScope.lib["toUpper"](
                      nixScope.lib["boolToString"](nixScope.flag),
                    ),
                  );
                })(nixScope.lib["isBool"](nixScope.flag));
              })(nixScope.lib["isString"](nixScope.condition))
            ))
          )),
      );
      defGetter(
        nixScope,
        "cmakeFeature",
        (nixScope) =>
          createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "(lib.isString feature)",
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " + "(lib.isString value)",
                    );
                  }
                  return nixScope.cmakeOptionType("string")(nixScope.feature)(
                    nixScope.value,
                  );
                })(nixScope.lib["isString"](nixScope.value));
              })(nixScope.lib["isString"](nixScope.feature))
            ))
          )),
      );
      defGetter(
        nixScope,
        "mesonOption",
        (nixScope) =>
          createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "(lib.isString feature)",
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " + "(lib.isString value)",
                    );
                  }
                  return (new InterpolatedString(["-D", "=", ""], [
                    () => (nixScope.feature),
                    () => (nixScope.value),
                  ]));
                })(nixScope.lib["isString"](nixScope.value));
              })(nixScope.lib["isString"](nixScope.feature))
            ))
          )),
      );
      defGetter(
        nixScope,
        "mesonBool",
        (nixScope) =>
          createFunc(/*arg:*/ "condition", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "(lib.isString condition)",
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error("assertion failed: " + "(lib.isBool flag)");
                  }
                  return nixScope.mesonOption(nixScope.condition)(
                    nixScope.lib["boolToString"](nixScope.flag),
                  );
                })(nixScope.lib["isBool"](nixScope.flag));
              })(nixScope.lib["isString"](nixScope.condition))
            ))
          )),
      );
      defGetter(
        nixScope,
        "mesonEnable",
        (nixScope) =>
          createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "(lib.isString feature)",
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error("assertion failed: " + "(lib.isBool flag)");
                  }
                  return nixScope.mesonOption(nixScope.feature)(
                    operators.ifThenElse(
                      nixScope.flag,
                      () => ("enabled"),
                      () => ("disabled"),
                    ),
                  );
                })(nixScope.lib["isBool"](nixScope.flag));
              })(nixScope.lib["isString"](nixScope.feature))
            ))
          )),
      );
      defGetter(
        nixScope,
        "enableFeature",
        (nixScope) =>
          createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "lib.isBool flag");
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " + "lib.isString feature",
                    );
                  }
                  return (new InterpolatedString(["--", "-", ""], [
                    () => (operators.ifThenElse(
                      nixScope.flag,
                      () => ("enable"),
                      () => ("disable"),
                    )),
                    () => (nixScope.feature),
                  ]));
                })(nixScope.lib["isString"](nixScope.feature));
              })(nixScope.lib["isBool"](nixScope.flag))
            ))
          )),
      );
      defGetter(
        nixScope,
        "enableFeatureAs",
        (nixScope) =>
          createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                operators.add(
                  nixScope.enableFeature(nixScope.flag)(nixScope.feature),
                  nixScope.optionalString(nixScope.flag)(
                    new InterpolatedString(["=", ""], [() => (nixScope.value)]),
                  ),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "withFeature",
        (nixScope) =>
          createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "isString feature");
                }
                return (new InterpolatedString(["--", "-", ""], [
                  () => (operators.ifThenElse(
                    nixScope.flag,
                    () => ("with"),
                    () => ("without"),
                  )),
                  () => (nixScope.feature),
                ]));
              })(nixScope.isString(nixScope.feature))
            ))
          )),
      );
      defGetter(
        nixScope,
        "withFeatureAs",
        (nixScope) =>
          createFunc(/*arg:*/ "flag", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                operators.add(
                  nixScope.withFeature(nixScope.flag)(nixScope.feature),
                  nixScope.optionalString(nixScope.flag)(
                    new InterpolatedString(["=", ""], [() => (nixScope.value)]),
                  ),
                )
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "fixedWidthString",
        (nixScope) =>
          createFunc(/*arg:*/ "width", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "filler", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "strw",
                    (nixScope) => nixScope.lib["stringLength"](nixScope.str),
                  );
                  defGetter(
                    nixScope,
                    "reqWidth",
                    (nixScope) =>
                      operators.subtract(
                        nixScope.width,
                        nixScope.lib["stringLength"](nixScope.filler),
                      ),
                  );
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          'lib.assertMsg (strw <= width)\n      "fixedWidthString: requested string length (${toString width}) must not be shorter than actual length (${toString strw})"',
                      );
                    }
                    return (operators.ifThenElse(
                      operators.equal(nixScope.strw, nixScope.width),
                      () => (nixScope.str),
                      () => (operators.add(
                        nixScope.filler,
                        nixScope.fixedWidthString(nixScope.reqWidth)(
                          nixScope.filler,
                        )(nixScope.str),
                      )),
                    ));
                  })(
                    nixScope.lib["assertMsg"](
                      operators.lessThanOrEqual(nixScope.strw, nixScope.width),
                    )(
                      new InterpolatedString([
                        "fixedWidthString: requested string length (",
                        ") must not be shorter than actual length (",
                        ")",
                      ], [
                        () => (nixScope.toString(nixScope.width)),
                        () => (nixScope.toString(nixScope.strw)),
                      ]),
                    ),
                  );
                })
              ))
            ))
          )),
      );
      defGetter(
        nixScope,
        "fixedWidthNumber",
        (nixScope) =>
          createFunc(/*arg:*/ "width", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
              nixScope.fixedWidthString(nixScope.width)("0")(
                nixScope.toString(nixScope.n),
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "floatToString",
        (nixScope) =>
          createFunc(/*arg:*/ "float", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "result",
                (nixScope) => nixScope.toString(nixScope.float),
              );
              defGetter(
                nixScope,
                "precise",
                (nixScope) =>
                  operators.equal(
                    nixScope.float,
                    nixScope.fromJSON(nixScope.result),
                  ),
              );
              return nixScope.lib["warnIf"](operators.negate(nixScope.precise))(
                new InterpolatedString([
                  "Imprecise conversion from float to string ",
                  "",
                ], [() => (nixScope.result)]),
              )(nixScope.result);
            })
          )),
      );
      defGetter(
        nixScope,
        "isCoercibleToString",
        (nixScope) =>
          nixScope.lib["warnIf"](
            nixScope.lib["oldestSupportedReleaseIsAtLeast"](2305n),
          )("lib.strings.isCoercibleToString is deprecated in favor of either isStringLike or isConvertibleWithToString. Only use the latter if it needs to return true for null, numbers, booleans and list of similarly coercibles.")(
            nixScope.isConvertibleWithToString,
          ),
      );
      defGetter(
        nixScope,
        "isConvertibleWithToString",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            nixScope.types = ["null", "int", "float", "bool"];
            return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.or(
                operators.or(
                  nixScope.isStringLike(nixScope.x),
                  nixScope.elem(nixScope.typeOf(nixScope.x))(nixScope.types),
                ),
                operators.and(
                  nixScope.isList(nixScope.x),
                  nixScope.lib["all"](nixScope.isConvertibleWithToString)(
                    nixScope.x,
                  ),
                ),
              )
            ));
          }),
      );
      defGetter(
        nixScope,
        "isStringLike",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.or(
              operators.or(
                operators.or(
                  nixScope.isString(nixScope.x),
                  nixScope.isPath(nixScope.x),
                ),
                operators.hasAttr(nixScope.x, "outPath"),
              ),
              operators.hasAttr(nixScope.x, "__toString"),
            )
          )),
      );
      defGetter(
        nixScope,
        "isStorePath",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.isStringLike(nixScope.x),
              () => (/*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "str",
                  (nixScope) => nixScope.toString(nixScope.x),
                );
                return operators.and(
                  operators.equal(
                    nixScope.substring(0n)(1n)(nixScope.str),
                    "/",
                  ),
                  operators.or(
                    operators.equal(
                      nixScope.dirOf(nixScope.str),
                      nixScope.storeDir,
                    ),
                    operators.notEqual(
                      nixScope.builtins["match"]("/[0-9a-z]{52}")(nixScope.str),
                      null,
                    ),
                  ),
                );
              })),
              () => (false),
            )
          )),
      );
      defGetter(
        nixScope,
        "toInt",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "matchStripInput",
              (nixScope) =>
                nixScope.match("[[:space:]]*(-?[[:digit:]]+)[[:space:]]*"),
            );
            defGetter(
              nixScope,
              "matchLeadingZero",
              (nixScope) => nixScope.match("0[[:digit:]]+"),
            );
            return createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                nixScope.generalError = new InterpolatedString([
                  "toInt: Could not convert ",
                  " to int.",
                ], [() => (nixScope.escapeNixString(nixScope.str))]);
                defGetter(
                  nixScope,
                  "strippedInput",
                  (nixScope) => nixScope.matchStripInput(nixScope.str),
                );
                defGetter(
                  nixScope,
                  "isLeadingZero",
                  (nixScope) =>
                    operators.equal(
                      nixScope.matchLeadingZero(
                        nixScope.head(nixScope.strippedInput),
                      ),
                      [],
                    ),
                );
                defGetter(
                  nixScope,
                  "parsedInput",
                  (nixScope) =>
                    nixScope.fromJSON(nixScope.head(nixScope.strippedInput)),
                );
                return (operators.ifThenElse(
                  operators.equal(nixScope.strippedInput, null),
                  () => (nixScope.throw(nixScope.generalError)),
                  () => (operators.ifThenElse(
                    nixScope.isLeadingZero,
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "toInt: Ambiguity in interpretation of ",
                        " between octal and zero padded integer.",
                      ], [() => (nixScope.escapeNixString(nixScope.str))]),
                    )),
                    () => (operators.ifThenElse(
                      operators.negate(nixScope.isInt(nixScope.parsedInput)),
                      () => (nixScope.throw(nixScope.generalError)),
                      () => (nixScope.parsedInput),
                    )),
                  )),
                ));
              })
            ));
          }),
      );
      defGetter(
        nixScope,
        "toIntBase10",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "matchStripInput",
              (nixScope) =>
                nixScope.match("[[:space:]]*0*(-?[[:digit:]]+)[[:space:]]*"),
            );
            defGetter(
              nixScope,
              "matchZero",
              (nixScope) => nixScope.match("0+"),
            );
            return createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                nixScope.generalError = new InterpolatedString([
                  "toIntBase10: Could not convert ",
                  " to int.",
                ], [() => (nixScope.escapeNixString(nixScope.str))]);
                defGetter(
                  nixScope,
                  "strippedInput",
                  (nixScope) => nixScope.matchStripInput(nixScope.str),
                );
                defGetter(
                  nixScope,
                  "isZero",
                  (nixScope) =>
                    operators.equal(
                      nixScope.matchZero(nixScope.head(nixScope.strippedInput)),
                      [],
                    ),
                );
                defGetter(
                  nixScope,
                  "parsedInput",
                  (nixScope) =>
                    nixScope.fromJSON(nixScope.head(nixScope.strippedInput)),
                );
                return (operators.ifThenElse(
                  operators.equal(nixScope.strippedInput, null),
                  () => (nixScope.throw(nixScope.generalError)),
                  () => (operators.ifThenElse(
                    nixScope.isZero,
                    () => (0n),
                    () => (operators.ifThenElse(
                      operators.negate(nixScope.isInt(nixScope.parsedInput)),
                      () => (nixScope.throw(nixScope.generalError)),
                      () => (nixScope.parsedInput),
                    )),
                  )),
                ));
              })
            ));
          }),
      );
      defGetter(
        nixScope,
        "readPathsFromFile",
        (nixScope) =>
          nixScope.lib["warn"](
            "lib.readPathsFromFile is deprecated, use a list instead.",
          )(createFunc(/*arg:*/ "rootPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "lines", (nixScope) =>
                  nixScope.lib["splitString"]("")(
                    nixScope.readFile(nixScope.file),
                  ));
                defGetter(nixScope, "removeComments", (nixScope) =>
                  nixScope.lib["filter"](
                    createFunc(/*arg:*/ "line", null, {}, (nixScope) => (
                      operators.and(
                        operators.notEqual(nixScope.line, ""),
                        operators.negate(
                          nixScope.lib["hasPrefix"]("#")(nixScope.line),
                        ),
                      )
                    )),
                  ));
                defGetter(nixScope, "relativePaths", (nixScope) =>
                  nixScope.removeComments(nixScope.lines));
                defGetter(nixScope, "absolutePaths", (nixScope) =>
                  nixScope.map(
                    createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                      operators.add(
                        nixScope.rootPath,
                        new InterpolatedString(["/", ""], [
                          () => (nixScope.path),
                        ]),
                      )
                    )),
                  )(nixScope.relativePaths));
                return nixScope.absolutePaths;
              })
            ))
          ))),
      );
      defGetter(
        nixScope,
        "fileContents",
        (nixScope) =>
          createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
            nixScope.removeSuffix("")(nixScope.readFile(nixScope.file))
          )),
      );
      defGetter(
        nixScope,
        "sanitizeDerivationName",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "okRegex",
              (nixScope) =>
                nixScope.match("[[:alnum:]+_?=-][[:alnum:]+._?=-]*"),
            );
            return createFunc(/*arg:*/ "string", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.and(
                  operators.lessThanOrEqual(
                    nixScope.stringLength(nixScope.string),
                    207n,
                  ),
                  operators.notEqual(nixScope.okRegex(nixScope.string), null),
                ),
                () => (nixScope.unsafeDiscardStringContext(nixScope.string)),
                () => (nixScope.lib["pipe"](nixScope.string)([
                  nixScope.unsafeDiscardStringContext,
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    nixScope.elemAt(nixScope.match(".*(.*)")(nixScope.x))(0n)
                  )),
                  nixScope.split("[^[:alnum:]+._?=-]+"),
                  nixScope.concatMapStrings(
                    createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.lib["isList"](nixScope.s),
                        () => ("-"),
                        () => (nixScope.s),
                      )
                    )),
                  ),
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    nixScope.substring(
                      nixScope.lib["max"](
                        operators.subtract(
                          nixScope.stringLength(nixScope.x),
                          207n,
                        ),
                      )(0n),
                    )(-1n)(nixScope.x)
                  )),
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.equal(nixScope.stringLength(nixScope.x), 0n),
                      () => ("unknown"),
                      () => (nixScope.x),
                    )
                  )),
                ])),
              )
            ));
          }),
      );
      defGetter(
        nixScope,
        "levenshtein",
        (nixScope) =>
          createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "arr", (nixScope) =>
                  nixScope.lib["genList"](
                    createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                      nixScope.lib["genList"](
                        createFunc(/*arg:*/ "j", null, {}, (nixScope) => (
                          nixScope.dist(nixScope.i)(nixScope.j)
                        )),
                      )(operators.add(nixScope.stringLength(nixScope.b), 1n))
                    )),
                  )(operators.add(nixScope.stringLength(nixScope.a), 1n)));
                defGetter(nixScope, "d", (nixScope) =>
                  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                      nixScope.lib["elemAt"](
                        nixScope.lib["elemAt"](nixScope.arr)(nixScope.x),
                      )(nixScope.y)
                    ))
                  )));
                defGetter(nixScope, "dist", (nixScope) =>
                  createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "j", null, {}, (nixScope) => (
                      /*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "c",
                          (
                            nixScope,
                          ) => (operators.ifThenElse(
                            operators.equal(
                              nixScope.substring(
                                operators.subtract(nixScope.i, 1n),
                              )(1n)(nixScope.a),
                              nixScope.substring(
                                operators.subtract(nixScope.j, 1n),
                              )(1n)(nixScope.b),
                            ),
                            () => (0n),
                            () => (1n),
                          )),
                        );
                        return (operators.ifThenElse(
                          operators.equal(nixScope.j, 0n),
                          () => (nixScope.i),
                          () => (operators.ifThenElse(
                            operators.equal(nixScope.i, 0n),
                            () => (nixScope.j),
                            () => (nixScope.lib["min"](
                              nixScope.lib["min"](
                                operators.add(
                                  nixScope.d(
                                    operators.subtract(nixScope.i, 1n),
                                  )(nixScope.j),
                                  1n,
                                ),
                              )(operators.add(
                                nixScope.d(nixScope.i)(
                                  operators.subtract(nixScope.j, 1n),
                                ),
                                1n,
                              )),
                            )(operators.add(
                              nixScope.d(operators.subtract(nixScope.i, 1n))(
                                operators.subtract(nixScope.j, 1n),
                              ),
                              nixScope.c,
                            ))),
                          )),
                        ));
                      })
                    ))
                  )));
                return nixScope.d(nixScope.stringLength(nixScope.a))(
                  nixScope.stringLength(nixScope.b),
                );
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "commonPrefixLength",
        (nixScope) =>
          createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "m", (nixScope) =>
                  nixScope.lib["min"](nixScope.stringLength(nixScope.a))(
                    nixScope.stringLength(nixScope.b),
                  ));
                defGetter(nixScope, "go", (nixScope) =>
                  createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.greaterThanOrEqual(nixScope.i, nixScope.m),
                      () => (nixScope.m),
                      () => (operators.ifThenElse(
                        operators.equal(
                          nixScope.substring(nixScope.i)(1n)(nixScope.a),
                          nixScope.substring(nixScope.i)(1n)(nixScope.b),
                        ),
                        () => (nixScope.go(operators.add(nixScope.i, 1n))),
                        () => (nixScope.i),
                      )),
                    )
                  )));
                return nixScope.go(0n);
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "commonSuffixLength",
        (nixScope) =>
          createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "m", (nixScope) =>
                  nixScope.lib["min"](nixScope.stringLength(nixScope.a))(
                    nixScope.stringLength(nixScope.b),
                  ));
                defGetter(nixScope, "go", (nixScope) =>
                  createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.greaterThanOrEqual(nixScope.i, nixScope.m),
                      () => (nixScope.m),
                      () => (operators.ifThenElse(
                        operators.equal(
                          nixScope.substring(
                            operators.subtract(
                              operators.subtract(
                                nixScope.stringLength(nixScope.a),
                                nixScope.i,
                              ),
                              1n,
                            ),
                          )(1n)(nixScope.a),
                          nixScope.substring(
                            operators.subtract(
                              operators.subtract(
                                nixScope.stringLength(nixScope.b),
                                nixScope.i,
                              ),
                              1n,
                            ),
                          )(1n)(nixScope.b),
                        ),
                        () => (nixScope.go(operators.add(nixScope.i, 1n))),
                        () => (nixScope.i),
                      )),
                    )
                  )));
                return nixScope.go(0n);
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "levenshteinAtMost",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "infixDifferAtMost1", (nixScope) =>
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                  operators.and(
                    operators.lessThanOrEqual(
                      nixScope.stringLength(nixScope.x),
                      1n,
                    ),
                    operators.lessThanOrEqual(
                      nixScope.stringLength(nixScope.y),
                      1n,
                    ),
                  )
                ))
              )));
            defGetter(nixScope, "infixDifferAtMost2", (nixScope) =>
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "xlen",
                      (nixScope) => nixScope.stringLength(nixScope.x),
                    );
                    defGetter(
                      nixScope,
                      "ylen",
                      (nixScope) => nixScope.stringLength(nixScope.y),
                    );
                    defGetter(
                      nixScope,
                      "diff",
                      (nixScope) =>
                        operators.subtract(nixScope.xlen, nixScope.ylen),
                    );
                    defGetter(
                      nixScope,
                      "xinfix",
                      (nixScope) =>
                        nixScope.substring(1n)(
                          operators.subtract(nixScope.xlen, 2n),
                        )(nixScope.x),
                    );
                    defGetter(
                      nixScope,
                      "yinfix",
                      (nixScope) =>
                        nixScope.substring(1n)(
                          operators.subtract(nixScope.ylen, 2n),
                        )(nixScope.y),
                    );
                    defGetter(
                      nixScope,
                      "xdelr",
                      (nixScope) =>
                        nixScope.substring(0n)(
                          operators.subtract(nixScope.xlen, 1n),
                        )(nixScope.x),
                    );
                    defGetter(
                      nixScope,
                      "xdell",
                      (nixScope) =>
                        nixScope.substring(1n)(
                          operators.subtract(nixScope.xlen, 1n),
                        )(nixScope.x),
                    );
                    defGetter(
                      nixScope,
                      "ydelr",
                      (nixScope) =>
                        nixScope.substring(0n)(
                          operators.subtract(nixScope.ylen, 1n),
                        )(nixScope.y),
                    );
                    defGetter(
                      nixScope,
                      "ydell",
                      (nixScope) =>
                        nixScope.substring(1n)(
                          operators.subtract(nixScope.ylen, 1n),
                        )(nixScope.y),
                    );
                    return (operators.ifThenElse(
                      operators.equal(nixScope.diff, 2n),
                      () => (operators.equal(nixScope.xinfix, nixScope.y)),
                      () => (operators.ifThenElse(
                        operators.equal(nixScope.diff, 1n),
                        () => (operators.or(
                          operators.equal(nixScope.xinfix, nixScope.ydelr),
                          operators.equal(nixScope.xinfix, nixScope.ydell),
                        )),
                        () => (operators.or(
                          operators.or(
                            operators.equal(nixScope.xinfix, nixScope.yinfix),
                            operators.equal(nixScope.xdelr, nixScope.ydell),
                          ),
                          operators.equal(nixScope.xdell, nixScope.ydelr),
                        )),
                      )),
                    ));
                  })
                ))
              )));
            return createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.lessThanOrEqual(nixScope.k, 0n),
                () => (createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                    operators.equal(nixScope.a, nixScope.b)
                  ))
                ))),
                () => (/*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "f", (nixScope) =>
                    createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "alen", (nixScope) =>
                            nixScope.stringLength(nixScope.a));
                          defGetter(nixScope, "blen", (nixScope) =>
                            nixScope.stringLength(nixScope.b));
                          defGetter(nixScope, "prelen", (nixScope) =>
                            nixScope.commonPrefixLength(nixScope.a)(
                              nixScope.b,
                            ));
                          defGetter(nixScope, "suflen", (nixScope) =>
                            nixScope.commonSuffixLength(nixScope.a)(
                              nixScope.b,
                            ));
                          defGetter(nixScope, "presuflen", (nixScope) =>
                            operators.add(nixScope.prelen, nixScope.suflen));
                          defGetter(nixScope, "ainfix", (nixScope) =>
                            nixScope.substring(nixScope.prelen)(
                              operators.subtract(
                                nixScope.alen,
                                nixScope.presuflen,
                              ),
                            )(nixScope.a));
                          defGetter(nixScope, "binfix", (nixScope) =>
                            nixScope.substring(nixScope.prelen)(
                              operators.subtract(
                                nixScope.blen,
                                nixScope.presuflen,
                              ),
                            )(nixScope.b));
                          return (operators.ifThenElse(
                            operators.lessThan(nixScope.alen, nixScope.blen),
                            () => (nixScope.f(nixScope.b)(nixScope.a)),
                            () => (operators.ifThenElse(
                              operators.greaterThan(
                                operators.subtract(
                                  nixScope.alen,
                                  nixScope.blen,
                                ),
                                nixScope.k,
                              ),
                              () => (false),
                              () => (operators.ifThenElse(
                                operators.equal(nixScope.k, 1n),
                                () => (nixScope.infixDifferAtMost1(
                                  nixScope.ainfix,
                                )(nixScope.binfix)),
                                () => (operators.ifThenElse(
                                  operators.equal(nixScope.k, 2n),
                                  () => (nixScope.infixDifferAtMost2(
                                    nixScope.ainfix,
                                  )(nixScope.binfix)),
                                  () => (operators.lessThanOrEqual(
                                    nixScope.levenshtein(nixScope.ainfix)(
                                      nixScope.binfix,
                                    ),
                                    nixScope.k,
                                  )),
                                )),
                              )),
                            )),
                          ));
                        })
                      ))
                    )));
                  return nixScope.f;
                })),
              )
            ));
          }),
      );
      return nixScope;
    });
  })
));
