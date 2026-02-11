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
      defGetter(
        nixScope,
        "addMetaAttrs",
        (nixScope) =>
          createFunc(/*arg:*/ "newAttrs", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "dontDistribute",
        (nixScope) =>
          createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
            nixScope.addMetaAttrs({ "hydraPlatforms": [] })(nixScope.drv)
          )),
      );
      defGetter(
        nixScope,
        "setName",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
              operators.merge(nixScope.drv, { "name": nixScope.name })
            ))
          )),
      );
      defGetter(
        nixScope,
        "updateName",
        (nixScope) =>
          createFunc(/*arg:*/ "updater", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "drv", null, {}, (nixScope) => (
              operators.merge(
                nixScope.drv,
                { "name": nixScope.updater(nixScope.drv["name"]) },
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "appendToName",
        (nixScope) =>
          createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
            nixScope.updateName(
              createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "x", (nixScope) =>
                    nixScope.builtins["parseDrvName"](nixScope.name));
                  return (new InterpolatedString(["", "-", "-", ""], [
                    () => (nixScope.x["name"]),
                    () => (nixScope.suffix),
                    () => (nixScope.x["version"]),
                  ]));
                })
              )),
            )
          )),
      );
      defGetter(
        nixScope,
        "mapDerivationAttrset",
        (nixScope) =>
          createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "setPrio",
        (nixScope) =>
          createFunc(/*arg:*/ "priority", null, {}, (nixScope) => (
            nixScope.addMetaAttrs({ "priority": nixScope.priority })
          )),
      );
      defGetter(nixScope, "lowPrio", (nixScope) => nixScope.setPrio(10n));
      defGetter(
        nixScope,
        "lowPrioSet",
        (nixScope) =>
          createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
            nixScope.mapDerivationAttrset(nixScope.lowPrio)(nixScope.set)
          )),
      );
      defGetter(nixScope, "hiPrio", (nixScope) => nixScope.setPrio(-10n));
      defGetter(
        nixScope,
        "hiPrioSet",
        (nixScope) =>
          createFunc(/*arg:*/ "set", null, {}, (nixScope) => (
            nixScope.mapDerivationAttrset(nixScope.hiPrio)(nixScope.set)
          )),
      );
      defGetter(
        nixScope,
        "platformMatch",
        (nixScope) =>
          createFunc(/*arg:*/ "platform", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "availableOn",
        (nixScope) =>
          createFunc(/*arg:*/ "platform", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "licensesSpdx",
        (nixScope) =>
          nixScope["mapAttrs'"](
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
          ),
      );
      defGetter(
        nixScope,
        "getLicenseFromSpdxId",
        (nixScope) =>
          createFunc(/*arg:*/ "licstr", null, {}, (nixScope) => (
            nixScope.getLicenseFromSpdxIdOr(nixScope.licstr)(
              nixScope.lib["warn"](
                new InterpolatedString([
                  "getLicenseFromSpdxId: No license matches the given SPDX ID: ",
                  "",
                ], [() => (nixScope.licstr)]),
              )({ "shortName": nixScope.licstr }),
            )
          )),
      );
      defGetter(
        nixScope,
        "getLicenseFromSpdxIdOr",
        (nixScope) =>
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "lowercaseLicenses", (nixScope) =>
              nixScope.lib["mapAttrs'"](
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                    {
                      "name": nixScope.lib["toLower"](nixScope.name),
                      "value": nixScope.value,
                    }
                  ))
                )),
              )(nixScope.licensesSpdx));
            return createFunc(/*arg:*/ "licstr", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "default", null, {}, (nixScope) => (
                operators.selectOrDefault(nixScope.lowercaseLicenses, [
                  nixScope.lib["toLower"](nixScope.licstr),
                ], nixScope.default)
              ))
            ));
          }),
      );
      defGetter(
        nixScope,
        "getExe",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
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
          )),
      );
      defGetter(
        nixScope,
        "getExe'",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
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
          )),
      );
      return nixScope;
    });
  })
));
