export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.genAttrs = nixScope.lib["genAttrs"];
    nixScope.isString = nixScope.lib["isString"];
    nixScope.mapAttrs = nixScope.lib["mapAttrs"];
    nixScope.removeAttrs = nixScope.lib["removeAttrs"];
    nixScope.throwIfNot = nixScope.lib["throwIfNot"];
    Object.defineProperty(nixScope, "showMaybeAttrPosPre", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "attrName", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                Object.defineProperty(nixScope, "pos", {
                  enumerable: true,
                  get() {
                    return nixScope.builtins["unsafeGetAttrPos"](
                      nixScope.attrName,
                    )(nixScope.v);
                  },
                });
                return (operators.ifThenElse(
                  operators.equal(nixScope.pos, null),
                  () => (""),
                  () => (new InterpolatedString(["", "", ":", ":", ""], [
                    () => (nixScope.prefix),
                    () => (nixScope.pos["file"]),
                    () => (nixScope.toString(nixScope.pos["line"])),
                    () => (nixScope.toString(nixScope.pos["column"])),
                  ])),
                ));
              })
            ))
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "showMaybePackagePosPre", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "prefix", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.and(
                operators.hasAttrPath(nixScope.pkg, "meta", "position"),
                nixScope.isString(nixScope.pkg["meta"]["position"]),
              ),
              () => (new InterpolatedString(["", "", ""], [
                () => (nixScope.prefix),
                () => (nixScope.pkg["meta"]["position"]),
              ])),
              () => (""),
            )
          ))
        ));
      },
    });
    return ({
      "lazyDerivation": createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "checked", {
            enumerable: true,
            get() {
              return nixScope.throwIfNot(
                operators.equal(
                  operators.selectOrDefault(
                    nixScope.derivation,
                    ["type"],
                    null,
                  ),
                  "derivation",
                ),
              )("lazyDerivation: input must be a derivation.")(
                nixScope.throwIfNot,
              )(operators.equal(
                nixScope.derivation["outputs"],
                nixScope.outputs,
              ))(
                new InterpolatedString([
                  "\n            lib.lazyDerivation: The derivation ",
                  " has outputs that don't match the assumed outputs.\n\n            Assumed outputs passed to lazyDerivation",
                  ":\n                ",
                  ";\n\n            Actual outputs of the derivation",
                  ":\n                ",
                  "\n\n            If the outputs are known ahead of evaluating the derivation,\n            then update the lazyDerivation call to match the actual outputs, in the same order.\n            If lazyDerivation is passed a literal value, just change it to the actual outputs.\n            As a result it will work as before / as intended.\n\n            Otherwise, when the outputs are dynamic and can't be known ahead of time, it won't\n            be possible to add laziness, but lib.lazyDerivation may still be useful for trimming\n            the attributes.\n            If you want to keep trimming the attributes, make sure that the package is in a\n            variable (don't evaluate it twice!) and pass the variable and its outputs attribute\n            to lib.lazyDerivation. This largely defeats laziness, but keeps the trimming.\n            If none of the above works for you, replace the lib.lazyDerivation call by the\n            expression in the derivation argument.\n          ",
                ], [
                  () => (operators.selectOrDefault(nixScope.derivation, [
                    "name",
                  ], "<unknown>")),
                  () => (nixScope.showMaybeAttrPosPre(",")("outputs")(
                    nixScope.args,
                  )),
                  () => (nixScope.lib["generators"]["toPretty"](
                    { "multiline": false },
                  )(nixScope.outputs)),
                  () => (nixScope.showMaybePackagePosPre(",")(
                    nixScope.derivation,
                  )),
                  () => (nixScope.lib["generators"]["toPretty"](
                    { "multiline": false },
                  )(nixScope.derivation["outputs"])),
                ]),
              )(nixScope.derivation);
            },
          });
          return operators.merge(
            createScope((nixScope) => {
              const obj = {};
              obj["type"] = "derivation";
              obj["outPath"] = nixScope.checked["outPath"];
              obj["outputName"] = nixScope.checked["outputName"];
              obj["drvPath"] = nixScope.checked["drvPath"];
              obj["name"] = nixScope.checked["name"];
              obj["system"] = nixScope.checked["system"];
              obj["outputs"] = nixScope.outputs;
              obj["meta"] = operators.selectOrDefault(
                nixScope.args,
                ["meta"],
                nixScope.checked["meta"],
              );
              return obj;
            }),
            operators.merge(
              nixScope.genAttrs(nixScope.outputs)(
                createFunc(/*arg:*/ "outputName", null, {}, (nixScope) => (
                  nixScope.checked[nixScope.outputName]
                )),
              ),
              nixScope.passthru,
            ),
          );
        })
      )),
      "optionalDrvAttr": createFunc(/*arg:*/ "cond", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
          operators.ifThenElse(
            nixScope.cond,
            () => (nixScope.value),
            () => (null),
          )
        ))
      )),
      "warnOnInstantiate": createFunc(/*arg:*/ "msg", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "drvToWrap", {
              enumerable: true,
              get() {
                return nixScope.removeAttrs(nixScope.drv)([
                  "meta",
                  "name",
                  "type",
                  "outputName",
                ]);
              },
            });
            return operators.merge(
              nixScope.drv,
              nixScope.mapAttrs(
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  nixScope.lib["warn"](nixScope.msg)
                )),
              )(nixScope.drvToWrap),
            );
          })
        ))
      )),
    });
  })
));
