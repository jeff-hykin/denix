export default /**
  Some functions for manipulating meta attributes, as well as the
  name attribute.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.matchAttrs = nixScope.lib["matchAttrs"];
    nixScope.any = nixScope.lib["any"];
    nixScope.all = nixScope.lib["all"];
    nixScope.isDerivation = nixScope.lib["isDerivation"];
    nixScope.getBin = nixScope.lib["getBin"];
    nixScope.assertMsg = nixScope.lib["assertMsg"];
    nixScope["mapAttrs'"] = nixScope.lib["attrsets"]["mapAttrs'"];
    nixScope.filterAttrs = nixScope.lib["attrsets"]["filterAttrs"];
    nixScope.isString = nixScope.builtins["isString"];
    nixScope.match = nixScope.builtins["match"];
    nixScope.typeOf = nixScope.builtins["typeOf"];
    return /*rec*/ createScope((nixScope) => {
      nixScope.defaultPriority = 5n;
      Object.defineProperty(nixScope, "addMetaAttrs", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "newAttrs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
              operators.merge(
                nixScope.drv,
                {
                  "meta": operators.merge(
                    operators.selectOrDefault(nixScope.drv, ["meta"], {}),
                    nixScope.newAttrs,
                  ),
                },
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "dontDistribute", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            nixScope.addMetaAttrs({ "hydraPlatforms": [] })(nixScope.drv)
          ));
        },
      });
      Object.defineProperty(nixScope, "setName", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
              operators.merge(nixScope.drv, { "name": nixScope.name })
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "updateName", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "updater", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
              operators.merge(
                nixScope.drv,
                { "name": nixScope.updater(nixScope.drv["name"]) },
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "appendToName", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
            nixScope.updateName(
              createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "x", {
                    enumerable: true,
                    get() {
                      return nixScope.builtins["parseDrvName"](nixScope.name);
                    },
                  });
                  return (new InterpolatedString(["", "-", "-", ""], [
                    () => (nixScope.x["name"]),
                    () => (nixScope.suffix),
                    () => (nixScope.x["version"]),
                  ]));
                })
              )),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "mapDerivationAttrset", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
              nixScope.lib["mapAttrs"](
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      nixScope.lib["isDerivation"](nixScope.pkg),
                      () => (nixScope.f(nixScope.pkg)),
                      () => (nixScope.pkg),
                    )
                  ))
                )),
              )(nixScope.set)
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "setPrio", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "priority", null, {}, (nixScope) => (
            nixScope.addMetaAttrs({ "priority": nixScope.priority })
          ));
        },
      });
      Object.defineProperty(nixScope, "lowPrio", {
        enumerable: true,
        get() {
          return nixScope.setPrio(10n);
        },
      });
      Object.defineProperty(nixScope, "lowPrioSet", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
            nixScope.mapDerivationAttrset(nixScope.lowPrio)(nixScope.set)
          ));
        },
      });
      Object.defineProperty(nixScope, "hiPrio", {
        enumerable: true,
        get() {
          return nixScope.setPrio(-10n);
        },
      });
      Object.defineProperty(nixScope, "hiPrioSet", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
            nixScope.mapDerivationAttrset(nixScope.hiPrio)(nixScope.set)
          ));
        },
      });
      Object.defineProperty(nixScope, "platformMatch", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "platform", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              operators.ifThenElse(
                nixScope.isString(nixScope.elem),
                () => (operators.and(
                  operators.hasAttr(nixScope.platform, "system"),
                  operators.equal(nixScope.elem, nixScope.platform["system"]),
                )),
                () => (nixScope.matchAttrs(
                  operators.ifThenElse(
                    operators.hasAttr(nixScope.elem, "parsed"),
                    () => (nixScope.elem),
                    () => ({ "parsed": nixScope.elem }),
                  ),
                )(nixScope.platform)),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "availableOn", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "platform", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pkg", null, {}, (nixScope) => (
              operators.and(
                operators.or(
                  operators.negate(
                    operators.hasAttrPath(nixScope.pkg, "meta", "platforms"),
                  ),
                  nixScope.any(nixScope.platformMatch(nixScope.platform))(
                    nixScope.pkg["meta"]["platforms"],
                  ),
                ),
                nixScope.all(
                  createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
                    operators.negate(
                      nixScope.platformMatch(nixScope.platform)(nixScope.elem),
                    )
                  )),
                )(operators.selectOrDefault(nixScope.pkg, [
                  "meta",
                  "badPlatforms",
                ], [])),
              )
            ))
          ));
        },
      });
      Object.defineProperty(nixScope, "licensesSpdx", {
        enumerable: true,
        get() {
          return nixScope["mapAttrs'"](
            createFunc(/*arg:*/ "_key", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "license", null, {}, (nixScope) => (
                {
                  "name": nixScope.license["spdxId"],
                  "value": nixScope.license,
                }
              ))
            )),
          )(
            nixScope.filterAttrs(
              createFunc(/*arg:*/ "_key", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "license", null, {}, (nixScope) => (
                  operators.hasAttr(nixScope.license, "spdxId")
                ))
              )),
            )(nixScope.lib["licenses"]),
          );
        },
      });
      Object.defineProperty(nixScope, "getLicenseFromSpdxId", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "licstr", null, {}, (nixScope) => (
            nixScope.getLicenseFromSpdxIdOr(nixScope.licstr)(
              nixScope.lib["warn"](
                new InterpolatedString([
                  "getLicenseFromSpdxId: No license matches the given SPDX ID: ",
                  "",
                ], [() => (nixScope.licstr)]),
              )({ "shortName": nixScope.licstr }),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "getLicenseFromSpdxIdOr", {
        enumerable: true,
        get() {
          return /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "lowercaseLicenses", {
              enumerable: true,
              get() {
                return nixScope.lib["mapAttrs'"](
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                      {
                        "name": nixScope.lib["toLower"](nixScope.name),
                        "value": nixScope.value,
                      }
                    ))
                  )),
                )(nixScope.licensesSpdx);
              },
            });
            return createFunc(/*arg:*/ "licstr", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
                operators.selectOrDefault(nixScope.lowercaseLicenses, [
                  nixScope.lib["toLower"](nixScope.licstr),
                ], nixScope.default)
              ))
            ));
          });
        },
      });
      Object.defineProperty(nixScope, "getExe", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope["getExe'"](nixScope.x)(
              operators.selectOrDefault(
                nixScope.x,
                ["meta", "mainProgram"],
                nixScope.lib["warn"](
                  new InterpolatedString([
                    "getExe: Package ",
                    " does not have the meta.mainProgram attribute. We'll assume that the main program has the same name for now, but this behavior is deprecated, because it leads to surprising errors when the assumption does not hold. If the package has a main program, please set `meta.mainProgram` in its definition to make this warning go away. Otherwise, if the package does not have a main program, or if you don't control its definition, use getExe' to specify the name to the program, such as lib.getExe' foo bar.",
                  ], [
                    () => (nixScope.lib["strings"]["escapeNixIdentifier"](
                      operators.selectOrDefault(
                        nixScope.x,
                        ["meta", "name"],
                        operators.selectOrDefault(
                          nixScope.x,
                          ["pname"],
                          nixScope.x["name"],
                        ),
                      ),
                    )),
                  ]),
                )(nixScope.lib["getName"])(nixScope.x),
              ),
            )
          ));
        },
      });
      Object.defineProperty(nixScope, "getExe'", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'assertMsg (isDerivation x)\n      "lib.meta.getExe\': The first argument is of type ${typeOf x}, but it should be a derivation instead."',
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " +
                        'assertMsg (isString y)\n      "lib.meta.getExe\': The second argument is of type ${typeOf y}, but it should be a string instead."',
                    );
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          'assertMsg (match ".*/.*" y == null)\n      "lib.meta.getExe\': The second argument \\"${y}\\" is a nested path with a \\"/\\" character, but it should just be the name of the executable instead."',
                      );
                    }
                    return (new InterpolatedString(["", "/bin/", ""], [
                      () => (nixScope.getBin(nixScope.x)),
                      () => (nixScope.y),
                    ]));
                  })(
                    nixScope.assertMsg(
                      operators.equal(
                        nixScope.match(".*/.*")(nixScope.y),
                        null,
                      ),
                    )(
                      new InterpolatedString([
                        "lib.meta.getExe': The second argument ",
                        " is a nested path with a / character, but it should just be the name of the executable instead.",
                      ], [() => (nixScope.y)]),
                    ),
                  );
                })(
                  nixScope.assertMsg(nixScope.isString(nixScope.y))(
                    new InterpolatedString([
                      "lib.meta.getExe': The second argument is of type ",
                      ", but it should be a string instead.",
                    ], [() => (nixScope.typeOf(nixScope.y))]),
                  ),
                );
              })(
                nixScope.assertMsg(nixScope.isDerivation(nixScope.x))(
                  new InterpolatedString([
                    "lib.meta.getExe': The first argument is of type ",
                    ", but it should be a derivation instead.",
                  ], [() => (nixScope.typeOf(nixScope.x))]),
                ),
              )
            ))
          ));
        },
      });
      return nixScope;
    });
  })
));
