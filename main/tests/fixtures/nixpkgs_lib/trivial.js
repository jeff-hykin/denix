export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.isFunction = nixScope.lib["trivial"]["isFunction"];
    nixScope.isInt = nixScope.lib["trivial"]["isInt"];
    nixScope.functionArgs = nixScope.lib["trivial"]["functionArgs"];
    nixScope.pathExists = nixScope.lib["trivial"]["pathExists"];
    nixScope.release = nixScope.lib["trivial"]["release"];
    nixScope.setFunctionArgs = nixScope.lib["trivial"]["setFunctionArgs"];
    nixScope.toBaseDigits = nixScope.lib["trivial"]["toBaseDigits"];
    nixScope.version = nixScope.lib["trivial"]["version"];
    nixScope.versionSuffix = nixScope.lib["trivial"]["versionSuffix"];
    nixScope.warn = nixScope.lib["trivial"]["warn"];
    nixScope.isString = nixScope.lib["isString"];
    return createScope((nixScope) => {
      const obj = {};
      obj.id = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      ));
      obj.const = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          nixScope.x
        ))
      ));
      obj.pipe = nixScope.builtins["foldl'"](
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            nixScope.f(nixScope.x)
          ))
        )),
      );
      obj.concat = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.listConcat(nixScope.x, nixScope.y)
        ))
      ));
      obj.or = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.or(nixScope.x, nixScope.y)
        ))
      ));
      obj.and = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.and(nixScope.x, nixScope.y)
        ))
      ));
      obj.xor = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.notEqual(
            operators.negate(nixScope.x),
            operators.negate(nixScope.y),
          )
        ))
      ));
      obj.bitNot = nixScope.builtins["sub"](-1n);
      obj.boolToString = createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
        operators.ifThenElse(nixScope.b, () => ("true"), () => ("false"))
      ));
      obj.mergeAttrs = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.merge(nixScope.x, nixScope.y)
        ))
      ));
      obj.flip = createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
            nixScope.f(nixScope.b)(nixScope.a)
          ))
        ))
      ));
      obj.defaultTo = createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "maybeValue", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.notEqual(nixScope.maybeValue, null),
            () => (nixScope.maybeValue),
            () => (nixScope.default),
          )
        ))
      ));
      obj.mapNullable = createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(nixScope.a, null),
            () => (nixScope.a),
            () => (nixScope.f(nixScope.a)),
          )
        ))
      ));
      obj.pathExists = nixScope.builtins.pathExists;
      obj.readFile = nixScope.builtins.readFile;
      obj.isBool = nixScope.builtins.isBool;
      obj.isInt = nixScope.builtins.isInt;
      obj.isFloat = nixScope.builtins.isFloat;
      obj.add = nixScope.builtins.add;
      obj.sub = nixScope.builtins.sub;
      obj.lessThan = nixScope.builtins.lessThan;
      obj.seq = nixScope.builtins.seq;
      obj.deepSeq = nixScope.builtins.deepSeq;
      obj.genericClosure = nixScope.builtins.genericClosure;
      obj.bitAnd = nixScope.builtins.bitAnd;
      obj.bitOr = nixScope.builtins.bitOr;
      obj.bitXor = nixScope.builtins.bitXor;
      obj.version = operators.add(nixScope.release, nixScope.versionSuffix);
      obj.release = nixScope.lib["strings"]["fileContents"](
        new Path(["./.version"], []),
      );
      obj.oldestSupportedRelease = 2505n;
      obj.isInOldestRelease = nixScope.lib["warnIf"](
        nixScope.lib["oldestSupportedReleaseIsAtLeast"](2411n),
      )("lib.isInOldestRelease is deprecated. Use lib.oldestSupportedReleaseIsAtLeast instead.")(
        nixScope.lib["oldestSupportedReleaseIsAtLeast"],
      );
      obj.oldestSupportedReleaseIsAtLeast = createFunc(
        /*arg:*/ "release",
        null,
        {},
        (nixScope) => (
          operators.lessThanOrEqual(
            nixScope.release,
            nixScope.lib["trivial"]["oldestSupportedRelease"],
          )
        ),
      );
      obj.codeName = "Xantusia";
      obj.versionSuffix = /*let*/ createScope((nixScope) => {
        nixScope.suffixFile = new Path(["../.version-suffix"], []);
        return (operators.ifThenElse(
          nixScope.pathExists(nixScope.suffixFile),
          () => (nixScope.lib["strings"]["fileContents"](nixScope.suffixFile)),
          () => ("pre-git"),
        ));
      });
      obj.revisionWithDefault = createFunc(
        /*arg:*/ "default",
        null,
        {},
        (nixScope) => (
          /*let*/ createScope((nixScope) => {
            nixScope.revisionFile = new InterpolatedString([
              "",
              "/.git-revision",
            ], [() => (nixScope.toString(new Path(["./.."], [])))]);
            nixScope.gitRepo = new InterpolatedString(["", "/.git"], [
              () => (nixScope.toString(new Path(["./.."], []))),
            ]);
            return (operators.ifThenElse(
              nixScope.lib["pathIsGitRepo"](nixScope.gitRepo),
              () => (nixScope.lib["commitIdFromGitRepo"](nixScope.gitRepo)),
              () => (operators.ifThenElse(
                nixScope.lib["pathExists"](nixScope.revisionFile),
                () => (nixScope.lib["fileContents"](nixScope.revisionFile)),
                () => (nixScope.default),
              )),
            ));
          })
        ),
      );
      obj.nixpkgsVersion = nixScope.warn(
        "lib.nixpkgsVersion is a deprecated alias of lib.version.",
      )(nixScope.version);
      obj.inNixShell = operators.notEqual(
        nixScope.builtins["getEnv"]("IN_NIX_SHELL"),
        "",
      );
      obj.inPureEvalMode = operators.negate(
        operators.hasAttr(nixScope.builtins, "currentSystem"),
      );
      obj.min = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.lessThan(nixScope.x, nixScope.y),
            () => (nixScope.x),
            () => (nixScope.y),
          )
        ))
      ));
      obj.max = createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.greaterThan(nixScope.x, nixScope.y),
            () => (nixScope.x),
            () => (nixScope.y),
          )
        ))
      ));
      obj.mod = createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "int", null, {}, (nixScope) => (
          operators.subtract(
            nixScope.base,
            operators.multiply(
              nixScope.int,
              nixScope.builtins["div"](nixScope.base)(nixScope.int),
            ),
          )
        ))
      ));
      obj.compare = createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.lessThan(nixScope.a, nixScope.b),
            () => (-1n),
            () => (operators.ifThenElse(
              operators.greaterThan(nixScope.a, nixScope.b),
              () => (1n),
              () => (0n),
            )),
          )
        ))
      ));
      obj.splitByAndCompare = createFunc(/*arg:*/ "p", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "yes", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "no", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
                operators.ifThenElse(
                  nixScope.p(nixScope.a),
                  () => (operators.ifThenElse(
                    nixScope.p(nixScope.b),
                    () => (nixScope.yes(nixScope.a)(nixScope.b)),
                    () => (-1n),
                  )),
                  () => (operators.ifThenElse(
                    nixScope.p(nixScope.b),
                    () => (1n),
                    () => (nixScope.no(nixScope.a)(nixScope.b)),
                  )),
                )
              ))
            ))
          ))
        ))
      ));
      obj.importJSON = createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        nixScope.builtins["fromJSON"](
          nixScope.builtins["readFile"](nixScope.path),
        )
      ));
      obj.importTOML = createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        nixScope.builtins["fromTOML"](
          nixScope.builtins["readFile"](nixScope.path),
        )
      ));
      obj.warn = operators.selectOrDefault(
        nixScope.builtins,
        ["warn"],
        /*let*/ createScope((nixScope) => {
          defGetter(nixScope, "mustAbort", (nixScope) =>
            nixScope.lib["elem"](
              nixScope.builtins["getEnv"]("NIX_ABORT_ON_WARN"),
            )(["1", "true", "yes"]));
          return createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "isString msg");
                }
                return (operators.ifThenElse(
                  nixScope.mustAbort,
                  () => (nixScope.builtins["trace"](
                    new InterpolatedString([
                      "\u001b[1;31mevaluation warning:\u001b[0m ",
                      "",
                    ], [() => (nixScope.msg)]),
                  )(nixScope.abort(
                    "NIX_ABORT_ON_WARN=true; warnings are treated as unrecoverable errors.",
                  ))),
                  () => (nixScope.builtins["trace"](
                    new InterpolatedString([
                      "\u001b[1;35mevaluation warning:\u001b[0m ",
                      "",
                    ], [() => (nixScope.msg)]),
                  )(nixScope.v)),
                ));
              })(nixScope.isString(nixScope.msg))
            ))
          ));
        }),
      );
      obj.warnIf = createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.cond,
            () => (nixScope.warn(nixScope.msg)),
            () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
          )
        ))
      ));
      obj.warnIfNot = createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.cond,
            () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
            () => (nixScope.warn(nixScope.msg)),
          )
        ))
      ));
      obj.throwIfNot = createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.cond,
            () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
            () => (nixScope.throw(nixScope.msg)),
          )
        ))
      ));
      obj.throwIf = createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.cond,
            () => (nixScope.throw(nixScope.msg)),
            () => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
          )
        ))
      ));
      obj.checkListOfEnum = createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "valid", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "given", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "unexpected",
                (nixScope) =>
                  nixScope.lib["subtractLists"](nixScope.valid)(nixScope.given),
              );
              return nixScope.lib["throwIfNot"](
                operators.equal(nixScope.unexpected, []),
              )(
                new InterpolatedString([
                  "",
                  ": ",
                  " unexpected; valid ones: ",
                  "",
                ], [
                  () => (nixScope.msg),
                  () => (nixScope.builtins["concatStringsSep"](", ")(
                    nixScope.builtins["map"](nixScope.builtins["toString"])(
                      nixScope.unexpected,
                    ),
                  )),
                  () => (nixScope.builtins["concatStringsSep"](", ")(
                    nixScope.builtins["map"](nixScope.builtins["toString"])(
                      nixScope.valid,
                    ),
                  )),
                ]),
              );
            })
          ))
        ))
      ));
      obj.info = createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
        nixScope.builtins["trace"](
          new InterpolatedString(["INFO: ", ""], [() => (nixScope.msg)]),
        )
      ));
      obj.showWarnings = createFunc(
        /*arg:*/ "warnings",
        null,
        {},
        (nixScope) => (
          createFunc(/*arg:*/ "res", null, {}, (nixScope) => (
            nixScope.lib["foldr"](
              createFunc(/*arg:*/ "w", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  nixScope.warn(nixScope.w)(nixScope.x)
                ))
              )),
            )(nixScope.res)(nixScope.warnings)
          ))
        ),
      );
      obj.setFunctionArgs = createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
          {
            "__functor": createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
              nixScope.f
            )),
            "__functionArgs": nixScope.args,
          }
        ))
      ));
      obj.functionArgs = createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        operators.ifThenElse(
          operators.hasAttr(nixScope.f, "__functor"),
          () => (operators.selectOrDefault(
            nixScope.f,
            ["__functionArgs"],
            nixScope.functionArgs(nixScope.f["__functor"](nixScope.f)),
          )),
          () => (nixScope.builtins["functionArgs"](nixScope.f)),
        )
      ));
      obj.isFunction = createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        operators.or(
          nixScope.builtins["isFunction"](nixScope.f),
          operators.and(
            operators.hasAttr(nixScope.f, "__functor"),
            nixScope.isFunction(nixScope.f["__functor"](nixScope.f)),
          ),
        )
      ));
      obj.mirrorFunctionArgs = createFunc(
        /*arg:*/ "f",
        null,
        {},
        (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "fArgs",
              (nixScope) => nixScope.functionArgs(nixScope.f),
            );
            return createFunc(/*arg:*/ "g", null, {}, (nixScope) => (
              nixScope.setFunctionArgs(nixScope.g)(nixScope.fArgs)
            ));
          })
        ),
      );
      obj.toFunction = createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
        operators.ifThenElse(
          nixScope.isFunction(nixScope.v),
          () => (nixScope.v),
          () => (createFunc(/*arg:*/ "k", null, {}, (nixScope) => (
            nixScope.v
          ))),
        )
      ));
      obj.fromHexString = createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          defGetter(
            nixScope,
            "noPrefix",
            (nixScope) =>
              nixScope.lib["strings"]["removePrefix"]("0x")(
                nixScope.lib["strings"]["toLower"](nixScope.value),
              ),
          );
          return /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "parsed",
              (nixScope) =>
                nixScope.builtins["fromTOML"](
                  new InterpolatedString(["v=0x", ""], [
                    () => (nixScope.noPrefix),
                  ]),
                ),
            );
            return nixScope.parsed["v"];
          });
        })
      ));
      obj.toHexString = /*let*/ createScope((nixScope) => {
        nixScope.hexDigits = {
          "10": "A",
          "11": "B",
          "12": "C",
          "13": "D",
          "14": "E",
          "15": "F",
        };
        defGetter(
          nixScope,
          "toHexDigit",
          (nixScope) =>
            createFunc(/*arg:*/ "d", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.lessThan(nixScope.d, 10n),
                () => (nixScope.toString(nixScope.d)),
                () => (nixScope.hexDigits[nixScope.toString(nixScope.d)]),
              )
            )),
        );
        return createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
          nixScope.lib["concatMapStrings"](nixScope.toHexDigit)(
            nixScope.toBaseDigits(16n)(nixScope.i),
          )
        ));
      });
      obj.toBaseDigits = createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "go",
              (nixScope) =>
                createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.lessThan(nixScope.i, nixScope.base),
                    () => [nixScope.i],
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "r", (nixScope) =>
                        operators.subtract(
                          nixScope.i,
                          operators.multiply(
                            operators.divide(nixScope.i, nixScope.base),
                            nixScope.base,
                          ),
                        ));
                      defGetter(nixScope, "q", (nixScope) =>
                        operators.divide(
                          operators.subtract(nixScope.i, nixScope.r),
                          nixScope.base,
                        ));
                      return operators.listConcat(
                        [nixScope.r],
                        nixScope.go(nixScope.q),
                      );
                    })),
                  )
                )),
            );
            return ((_cond) => {
              if (!_cond) {
                throw new Error("assertion failed: " + "(isInt base)");
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + "(isInt i)");
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error("assertion failed: " + "(base >= 2)");
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error("assertion failed: " + "(i >= 0)");
                    }
                    return nixScope.lib["reverseList"](nixScope.go(nixScope.i));
                  })(operators.greaterThanOrEqual(nixScope.i, 0n));
                })(operators.greaterThanOrEqual(nixScope.base, 2n));
              })(nixScope.isInt(nixScope.i));
            })(nixScope.isInt(nixScope.base));
          })
        ))
      ));
      return obj;
    });
  })
));
