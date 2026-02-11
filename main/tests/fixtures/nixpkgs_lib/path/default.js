export default //
//
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.isString = nixScope.builtins["isString"];
    nixScope.isPath = nixScope.builtins["isPath"];
    nixScope.split = nixScope.builtins["split"];
    nixScope.match = nixScope.builtins["match"];
    nixScope.typeOf = nixScope.builtins["typeOf"];
    nixScope.storeDir = nixScope.builtins["storeDir"];
    nixScope.length = nixScope.lib["lists"]["length"];
    nixScope.head = nixScope.lib["lists"]["head"];
    nixScope.last = nixScope.lib["lists"]["last"];
    nixScope.genList = nixScope.lib["lists"]["genList"];
    nixScope.elemAt = nixScope.lib["lists"]["elemAt"];
    nixScope.all = nixScope.lib["lists"]["all"];
    nixScope.concatMap = nixScope.lib["lists"]["concatMap"];
    nixScope["foldl'"] = nixScope.lib["lists"]["foldl'"];
    nixScope.take = nixScope.lib["lists"]["take"];
    nixScope.drop = nixScope.lib["lists"]["drop"];
    nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
    nixScope.substring = nixScope.lib["strings"]["substring"];
    nixScope.assertMsg = nixScope.lib["asserts"]["assertMsg"];
    nixScope.isValid = nixScope.lib["path"]["subpath"]["isValid"];
    Object.defineProperty(nixScope, "listHasPrefix", {
      enumerable: true,
      get() {
        return nixScope.lib["lists"]["hasPrefix"];
      },
    });
    Object.defineProperty(nixScope, "subpathInvalidReason", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.negate(nixScope.isString(nixScope.value)),
            () => (new InterpolatedString([
              "The given value is of type ",
              ", but a string was expected",
            ], [() => (nixScope.builtins["typeOf"](nixScope.value))])),
            () => (operators.ifThenElse(
              operators.equal(nixScope.value, ""),
              () => ("The given string is empty"),
              () => (operators.ifThenElse(
                operators.equal(
                  nixScope.substring(0n)(1n)(nixScope.value),
                  "/",
                ),
                () => (new InterpolatedString([
                  "The given string ",
                  " starts with a `/`, representing an absolute path",
                ], [() => (nixScope.value)])),
                () => (operators.ifThenElse(
                  operators.notEqual(
                    nixScope.match("(.*/)?")(nixScope.value),
                    null,
                  ),
                  () => (new InterpolatedString([
                    "The given string ",
                    " contains a `..` component, which is not allowed in subpaths",
                  ], [() => (nixScope.value)])),
                  () => (null),
                )),
              )),
            )),
          )
        ));
      },
    });
    Object.defineProperty(nixScope, "splitRelPath", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "parts", {
              enumerable: true,
              get() {
                return nixScope.split("/+(")(nixScope.path);
              },
            });
            Object.defineProperty(nixScope, "partCount", {
              enumerable: true,
              get() {
                return operators.add(
                  operators.divide(nixScope.length(nixScope.parts), 2n),
                  1n,
                );
              },
            });
            Object.defineProperty(nixScope, "skipStart", {
              enumerable: true,
              get() {
                return (operators.ifThenElse(
                  operators.equal(nixScope.head(nixScope.parts), "."),
                  () => (1n),
                  () => (0n),
                ));
              },
            });
            Object.defineProperty(nixScope, "skipEnd", {
              enumerable: true,
              get() {
                return (operators.ifThenElse(
                  operators.or(
                    operators.equal(nixScope.last(nixScope.parts), "."),
                    operators.equal(nixScope.last(nixScope.parts), ""),
                  ),
                  () => (1n),
                  () => (0n),
                ));
              },
            });
            Object.defineProperty(nixScope, "componentCount", {
              enumerable: true,
              get() {
                return operators.subtract(
                  operators.subtract(nixScope.partCount, nixScope.skipEnd),
                  nixScope.skipStart,
                );
              },
            });
            return (operators.ifThenElse(
              operators.equal(nixScope.path, "."),
              () => [],
              () => (nixScope.genList(
                createFunc(/*arg:*/ "index", null, {}, (nixScope) => (
                  nixScope.elemAt(nixScope.parts)(
                    operators.multiply(
                      operators.add(nixScope.skipStart, nixScope.index),
                      2n,
                    ),
                  )
                )),
              )(nixScope.componentCount)),
            ));
          })
        ));
      },
    });
    Object.defineProperty(nixScope, "joinRelPath", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "components", null, {}, (nixScope) => (
          operators.add(
            "./",
            operators.ifThenElse(
              operators.equal(nixScope.components, []),
              () => ("."),
              () => (nixScope.concatStringsSep("/")(nixScope.components)),
            ),
          )
        ));
      },
    });
    Object.defineProperty(nixScope, "deconstructPath", {
      enumerable: true,
      get() {
        return /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "recurse", {
            enumerable: true,
            get() {
              return createFunc(/*arg:*/ "components", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.equal(
                      nixScope.base,
                      nixScope.dirOf(nixScope.base),
                    ),
                    () => ({
                      "root": nixScope.base,
                      "components": nixScope.components,
                    }),
                    () => (nixScope.recurse(
                      operators.listConcat(
                        [nixScope.baseNameOf(nixScope.base)],
                        nixScope.components,
                      ),
                    )(nixScope.dirOf(nixScope.base))),
                  )
                ))
              ));
            },
          });
          return nixScope.recurse([]);
        });
      },
    });
    Object.defineProperty(nixScope, "storeDirComponents", {
      enumerable: true,
      get() {
        return nixScope.splitRelPath(operators.add("./", nixScope.storeDir));
      },
    });
    Object.defineProperty(nixScope, "storeDirLength", {
      enumerable: true,
      get() {
        return nixScope.length(nixScope.storeDirComponents);
      },
    });
    Object.defineProperty(nixScope, "componentsHaveStorePathPrefix", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "components", null, {}, (nixScope) => (
          operators.or(
            operators.and(
              operators.and(
                nixScope.listHasPrefix(nixScope.storeDirComponents)(
                  nixScope.components,
                ),
                operators.notEqual(
                  nixScope.storeDirComponents,
                  nixScope.components,
                ),
              ),
              operators.notEqual(
                nixScope.match(".{32}-.+")(
                  nixScope.elemAt(nixScope.components)(nixScope.storeDirLength),
                ),
                null,
              ),
            ),
            operators.and(
              operators.notEqual(nixScope.components, []),
              operators.notEqual(
                nixScope.match("[0-9a-z]{52}")(
                  nixScope.head(nixScope.components),
                ),
                null,
              ),
            ),
          )
        ));
      },
    });
    return createScope((nixScope) => {
      const obj = {};
      obj["append"] = createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "subpath", null, {}, (nixScope) => (
          ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  "assertMsg (isPath path)\n      ''lib.path.append: The first argument is of type ${builtins.typeOf path}, but a path was expected''",
              );
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    "assertMsg (isValid subpath) ''\n      lib.path.append: Second argument is not a valid subpath string:\n          ${subpathInvalidReason subpath}''",
                );
              }
              return operators.add(
                nixScope.path,
                operators.add("/", nixScope.subpath),
              );
            })(
              nixScope.assertMsg(nixScope.isValid(nixScope.subpath))(
                new InterpolatedString([
                  "\n      lib.path.append: Second argument is not a valid subpath string:\n          ",
                  "",
                ], [() => (nixScope.subpathInvalidReason(nixScope.subpath))]),
              ),
            );
          })(
            nixScope.assertMsg(nixScope.isPath(nixScope.path))(
              new InterpolatedString([
                "lib.path.append: The first argument is of type ",
                ", but a path was expected",
              ], [() => (nixScope.builtins["typeOf"](nixScope.path))]),
            ),
          )
        ))
      ));
      obj["hasPrefix"] = createFunc(/*arg:*/ "path1", null, {}, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " +
                'assertMsg (isPath path1)\n      "lib.path.hasPrefix: First argument is of type ${typeOf path1}, but a path was expected"',
            );
          }
          return /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "path1Deconstructed", {
              enumerable: true,
              get() {
                return nixScope.deconstructPath(nixScope.path1);
              },
            });
            return createFunc(/*arg:*/ "path2", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'assertMsg (isPath path2)\n      "lib.path.hasPrefix: Second argument is of type ${typeOf path2}, but a path was expected"',
                  );
                }
                return /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "path2Deconstructed", {
                    enumerable: true,
                    get() {
                      return nixScope.deconstructPath(nixScope.path2);
                    },
                  });
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          'assertMsg (path1Deconstructed.root == path2Deconstructed.root) \'\'\n      lib.path.hasPrefix: Filesystem roots must be the same for both paths, but paths with different roots were given:\n          first argument: "${toString path1}" with root "${toString path1Deconstructed.root}"\n          second argument: "${toString path2}" with root "${toString path2Deconstructed.root}"\'\'',
                      );
                    }
                    return operators.equal(
                      nixScope.take(
                        nixScope.length(
                          nixScope.path1Deconstructed["components"],
                        ),
                      )(nixScope.path2Deconstructed["components"]),
                      nixScope.path1Deconstructed["components"],
                    );
                  })(
                    nixScope.assertMsg(
                      operators.equal(
                        nixScope.path1Deconstructed["root"],
                        nixScope.path2Deconstructed["root"],
                      ),
                    )(
                      new InterpolatedString([
                        '\n      lib.path.hasPrefix: Filesystem roots must be the same for both paths, but paths with different roots were given:\n          first argument: "',
                        '" with root "',
                        '"\n          second argument: "',
                        '" with root "',
                        '"',
                      ], [
                        () => (nixScope.toString(nixScope.path1)),
                        () => (nixScope.toString(
                          nixScope.path1Deconstructed["root"],
                        )),
                        () => (nixScope.toString(nixScope.path2)),
                        () => (nixScope.toString(
                          nixScope.path2Deconstructed["root"],
                        )),
                      ]),
                    ),
                  );
                });
              })(
                nixScope.assertMsg(nixScope.isPath(nixScope.path2))(
                  new InterpolatedString([
                    "lib.path.hasPrefix: Second argument is of type ",
                    ", but a path was expected",
                  ], [() => (nixScope.typeOf(nixScope.path2))]),
                ),
              )
            ));
          });
        })(
          nixScope.assertMsg(nixScope.isPath(nixScope.path1))(
            new InterpolatedString([
              "lib.path.hasPrefix: First argument is of type ",
              ", but a path was expected",
            ], [() => (nixScope.typeOf(nixScope.path1))]),
          ),
        )
      ));
      obj["removePrefix"] = createFunc(
        /*arg:*/ "path1",
        null,
        {},
        (nixScope) => (
          ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  'assertMsg (isPath path1)\n      "lib.path.removePrefix: First argument is of type ${typeOf path1}, but a path was expected."',
              );
            }
            return /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "path1Deconstructed", {
                enumerable: true,
                get() {
                  return nixScope.deconstructPath(nixScope.path1);
                },
              });
              Object.defineProperty(nixScope, "path1Length", {
                enumerable: true,
                get() {
                  return nixScope.length(
                    nixScope.path1Deconstructed["components"],
                  );
                },
              });
              return createFunc(/*arg:*/ "path2", null, {}, (nixScope) => (
                ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " +
                        'assertMsg (isPath path2)\n      "lib.path.removePrefix: Second argument is of type ${typeOf path2}, but a path was expected."',
                    );
                  }
                  return /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "path2Deconstructed", {
                      enumerable: true,
                      get() {
                        return nixScope.deconstructPath(nixScope.path2);
                      },
                    });
                    Object.defineProperty(nixScope, "success", {
                      enumerable: true,
                      get() {
                        return operators.equal(
                          nixScope.take(nixScope.path1Length)(
                            nixScope.path2Deconstructed["components"],
                          ),
                          nixScope.path1Deconstructed["components"],
                        );
                      },
                    });
                    Object.defineProperty(nixScope, "components", {
                      enumerable: true,
                      get() {
                        return (operators.ifThenElse(
                          nixScope.success,
                          () => (nixScope.drop(nixScope.path1Length)(
                            nixScope.path2Deconstructed["components"],
                          )),
                          () => (nixScope.throw(
                            new InterpolatedString([
                              'lib.path.removePrefix: The first path argument "',
                              '" is not a component-wise prefix of the second path argument "',
                              '".',
                            ], [
                              () => (nixScope.toString(nixScope.path1)),
                              () => (nixScope.toString(nixScope.path2)),
                            ]),
                          )),
                        ));
                      },
                    });
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " +
                            'assertMsg (path1Deconstructed.root == path2Deconstructed.root) \'\'\n      lib.path.removePrefix: Filesystem roots must be the same for both paths, but paths with different roots were given:\n          first argument: "${toString path1}" with root "${toString path1Deconstructed.root}"\n          second argument: "${toString path2}" with root "${toString path2Deconstructed.root}"\'\'',
                        );
                      }
                      return nixScope.joinRelPath(nixScope.components);
                    })(
                      nixScope.assertMsg(
                        operators.equal(
                          nixScope.path1Deconstructed["root"],
                          nixScope.path2Deconstructed["root"],
                        ),
                      )(
                        new InterpolatedString([
                          '\n      lib.path.removePrefix: Filesystem roots must be the same for both paths, but paths with different roots were given:\n          first argument: "',
                          '" with root "',
                          '"\n          second argument: "',
                          '" with root "',
                          '"',
                        ], [
                          () => (nixScope.toString(nixScope.path1)),
                          () => (nixScope.toString(
                            nixScope.path1Deconstructed["root"],
                          )),
                          () => (nixScope.toString(nixScope.path2)),
                          () => (nixScope.toString(
                            nixScope.path2Deconstructed["root"],
                          )),
                        ]),
                      ),
                    );
                  });
                })(
                  nixScope.assertMsg(nixScope.isPath(nixScope.path2))(
                    new InterpolatedString([
                      "lib.path.removePrefix: Second argument is of type ",
                      ", but a path was expected.",
                    ], [() => (nixScope.typeOf(nixScope.path2))]),
                  ),
                )
              ));
            });
          })(
            nixScope.assertMsg(nixScope.isPath(nixScope.path1))(
              new InterpolatedString([
                "lib.path.removePrefix: First argument is of type ",
                ", but a path was expected.",
              ], [() => (nixScope.typeOf(nixScope.path1))]),
            ),
          )
        ),
      );
      obj["splitRoot"] = createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " +
                'assertMsg (isPath path)\n      "lib.path.splitRoot: Argument is of type ${typeOf path}, but a path was expected"',
            );
          }
          return /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "deconstructed", {
              enumerable: true,
              get() {
                return nixScope.deconstructPath(nixScope.path);
              },
            });
            return ({
              "root": nixScope.deconstructed["root"],
              "subpath": nixScope.joinRelPath(
                nixScope.deconstructed["components"],
              ),
            });
          });
        })(
          nixScope.assertMsg(nixScope.isPath(nixScope.path))(
            new InterpolatedString([
              "lib.path.splitRoot: Argument is of type ",
              ", but a path was expected",
            ], [() => (nixScope.typeOf(nixScope.path))]),
          ),
        )
      ));
      obj["hasStorePathPrefix"] = createFunc(
        /*arg:*/ "path",
        null,
        {},
        (nixScope) => (
          /*let*/ createScope((nixScope) => {
            Object.defineProperty(nixScope, "deconstructed", {
              enumerable: true,
              get() {
                return nixScope.deconstructPath(nixScope.path);
              },
            });
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'assertMsg (isPath path)\n      "lib.path.hasStorePathPrefix: Argument is of type ${typeOf path}, but a path was expected"',
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'assertMsg\n      # This function likely breaks or needs adjustment if used with other filesystem roots, if they ever get implemented.\n      # Let\'s try to error nicely in such a case, though it\'s unclear how an implementation would work even and whether this could be detected.\n      # See also https://github.com/NixOS/nix/pull/6530#discussion_r1422843117\n      (deconstructed.root == /. && toString deconstructed.root == "/")\n      "lib.path.hasStorePathPrefix: Argument has a filesystem root (${toString deconstructed.root}) that\'s not /, which is currently not supported."',
                  );
                }
                return nixScope.componentsHaveStorePathPrefix(
                  nixScope.deconstructed["components"],
                );
              })(
                nixScope.assertMsg(
                  operators.and(
                    operators.equal(
                      nixScope.deconstructed["root"],
                      new Path(["/."], []),
                    ),
                    operators.equal(
                      nixScope.toString(nixScope.deconstructed["root"]),
                      "/",
                    ),
                  ),
                )(
                  new InterpolatedString([
                    "lib.path.hasStorePathPrefix: Argument has a filesystem root (",
                    ") that's not /, which is currently not supported.",
                  ], [
                    () => (nixScope.toString(nixScope.deconstructed["root"])),
                  ]),
                ),
              );
            })(
              nixScope.assertMsg(nixScope.isPath(nixScope.path))(
                new InterpolatedString([
                  "lib.path.hasStorePathPrefix: Argument is of type ",
                  ", but a path was expected",
                ], [() => (nixScope.typeOf(nixScope.path))]),
              ),
            );
          })
        ),
      );
      if (obj["subpath"] === undefined) obj["subpath"] = {};
      obj["subpath"]["isValid"] = createFunc(
        /*arg:*/ "value",
        null,
        {},
        (nixScope) => (
          operators.equal(nixScope.subpathInvalidReason(nixScope.value), null)
        ),
      );
      if (obj["subpath"] === undefined) obj["subpath"] = {};
      obj["subpath"]["join"] = createFunc(
        /*arg:*/ "subpaths",
        null,
        {},
        (nixScope) => (
          operators.ifThenElse(
            nixScope.all(nixScope.isValid)(nixScope.subpaths),
            () => (nixScope.joinRelPath(
              nixScope.concatMap(nixScope.splitRelPath)(nixScope.subpaths),
            )),
            () => (nixScope["foldl'"](
              createFunc(/*arg:*/ "i", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    nixScope.isValid(nixScope.path),
                    () => (operators.add(nixScope.i, 1n)),
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "\n            lib.path.subpath.join: Element at index ",
                        " is not a valid subpath string:\n                ",
                        "",
                      ], [
                        () => (nixScope.toString(nixScope.i)),
                        () => (nixScope.subpathInvalidReason(nixScope.path)),
                      ]),
                    )),
                  )
                ))
              )),
            )(0n)(nixScope.subpaths)),
          )
        ),
      );
      if (obj["subpath"] === undefined) obj["subpath"] = {};
      obj["subpath"]["components"] = createFunc(
        /*arg:*/ "subpath",
        null,
        {},
        (nixScope) => (
          ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  "assertMsg (isValid subpath) ''\n      lib.path.subpath.components: Argument is not a valid subpath string:\n          ${subpathInvalidReason subpath}''",
              );
            }
            return nixScope.splitRelPath(nixScope.subpath);
          })(
            nixScope.assertMsg(nixScope.isValid(nixScope.subpath))(
              new InterpolatedString([
                "\n      lib.path.subpath.components: Argument is not a valid subpath string:\n          ",
                "",
              ], [() => (nixScope.subpathInvalidReason(nixScope.subpath))]),
            ),
          )
        ),
      );
      if (obj["subpath"] === undefined) obj["subpath"] = {};
      obj["subpath"]["normalise"] = createFunc(
        /*arg:*/ "subpath",
        null,
        {},
        (nixScope) => (
          ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  "assertMsg (isValid subpath) ''\n      lib.path.subpath.normalise: Argument is not a valid subpath string:\n          ${subpathInvalidReason subpath}''",
              );
            }
            return nixScope.joinRelPath(
              nixScope.splitRelPath(nixScope.subpath),
            );
          })(
            nixScope.assertMsg(nixScope.isValid(nixScope.subpath))(
              new InterpolatedString([
                "\n      lib.path.subpath.normalise: Argument is not a valid subpath string:\n          ",
                "",
              ], [() => (nixScope.subpathInvalidReason(nixScope.subpath))]),
            ),
          )
        ),
      );
      return obj;
    });
  })
));
