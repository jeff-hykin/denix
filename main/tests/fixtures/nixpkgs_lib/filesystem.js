export default /**
  Functions for querying information about the filesystem
  without copying any files to the Nix store.
*/ createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.readDir = nixScope.builtins["readDir"];
    nixScope.pathExists = nixScope.builtins["pathExists"];
    nixScope.toString = nixScope.builtins["toString"];
    nixScope.pathIsDirectory = nixScope.lib["filesystem"]["pathIsDirectory"];
    nixScope.pathIsRegularFile =
      nixScope.lib["filesystem"]["pathIsRegularFile"];
    nixScope.pathType = nixScope.lib["filesystem"]["pathType"];
    nixScope.packagesFromDirectoryRecursive =
      nixScope.lib["filesystem"]["packagesFromDirectoryRecursive"];
    nixScope.hasSuffix = nixScope.lib["strings"]["hasSuffix"];
    return ({
      "pathType": operators.selectOrDefault(
        nixScope.builtins,
        ["readFileType"],
        createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.negate(nixScope.pathExists(nixScope.path)),
            () => (nixScope.abort(
              new InterpolatedString([
                "lib.filesystem.pathType: Path ",
                " does not exist.",
              ], [() => (nixScope.toString(nixScope.path))]),
            )),
            () => (operators.ifThenElse(
              operators.equal(nixScope.dirOf(nixScope.path), nixScope.path),
              () => ("directory"),
              () => ((nixScope.readDir(nixScope.dirOf(nixScope.path)))[
                nixScope.baseNameOf(nixScope.path)
              ]),
            )),
          )
        )),
      ),
      "pathIsDirectory": createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        operators.and(
          nixScope.pathExists(nixScope.path),
          operators.equal(nixScope.pathType(nixScope.path), "directory"),
        )
      )),
      "pathIsRegularFile": createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        operators.and(
          nixScope.pathExists(nixScope.path),
          operators.equal(nixScope.pathType(nixScope.path), "regular"),
        )
      )),
      "haskellPathsInDir": createFunc(/*arg:*/ "root", null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "root-files", {
            enumerable: true,
            get() {
              return nixScope.builtins["attrNames"](
                nixScope.builtins["readDir"](nixScope.root),
              );
            },
          });
          Object.defineProperty(nixScope, "root-files-with-paths", {
            enumerable: true,
            get() {
              return nixScope.map(
                createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
                  {
                    "name": nixScope.file,
                    "value": operators.add(
                      nixScope.root,
                      new InterpolatedString(["/", ""], [
                        () => (nixScope.file),
                      ]),
                    ),
                  }
                )),
              )(nixScope["root-files"]);
            },
          });
          Object.defineProperty(nixScope, "cabal-subdirs", {
            enumerable: true,
            get() {
              return nixScope.builtins["filter"](
                createFunc({}, null, {}, (nixScope) => (
                  nixScope.builtins["pathExists"](
                    operators.add(
                      nixScope.value,
                      new InterpolatedString(["/", ".cabal"], [
                        () => (nixScope.name),
                      ]),
                    ),
                  )
                )),
              )(nixScope["root-files-with-paths"]);
            },
          });
          return nixScope.builtins["listToAttrs"](nixScope["cabal-subdirs"]);
        })
      )),
      "locateDominatingFile": createFunc(
        /*arg:*/ "pattern",
        null,
        {},
        (nixScope) => (
          createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "go", {
                enumerable: true,
                get() {
                  return createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "files", {
                        enumerable: true,
                        get() {
                          return nixScope.builtins["attrNames"](
                            nixScope.builtins["readDir"](nixScope.path),
                          );
                        },
                      });
                      Object.defineProperty(nixScope, "matches", {
                        enumerable: true,
                        get() {
                          return nixScope.builtins["filter"](
                            createFunc(
                              /*arg:*/ "match",
                              null,
                              {},
                              (nixScope) => (
                                operators.notEqual(nixScope.match, null)
                              ),
                            ),
                          )(
                            nixScope.map(
                              nixScope.builtins["match"](nixScope.pattern),
                            )(nixScope.files),
                          );
                        },
                      });
                      return (operators.ifThenElse(
                        operators.notEqual(
                          nixScope.builtins["length"](nixScope.matches),
                          0n,
                        ),
                        () => ({
                          "path": nixScope.path,
                          "matches": nixScope.matches,
                        }),
                        () => (operators.ifThenElse(
                          operators.equal(nixScope.path, new Path(["/."], [])),
                          () => (null),
                          () => (nixScope.go(nixScope.dirOf(nixScope.path))),
                        )),
                      ));
                    })
                  ));
                },
              });
              Object.defineProperty(nixScope, "parent", {
                enumerable: true,
                get() {
                  return nixScope.dirOf(nixScope.file);
                },
              });
              Object.defineProperty(nixScope, "isDir", {
                enumerable: true,
                get() {
                  return /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "base", {
                      enumerable: true,
                      get() {
                        return nixScope.baseNameOf(nixScope.file);
                      },
                    });
                    Object.defineProperty(nixScope, "type", {
                      enumerable: true,
                      get() {
                        return operators.selectOrDefault(
                          nixScope.builtins["readDir"](nixScope.parent),
                          [nixScope.base],
                          null,
                        );
                      },
                    });
                    return operators.or(
                      operators.equal(nixScope.file, new Path(["/."], [])),
                      operators.equal(nixScope.type, "directory"),
                    );
                  });
                },
              });
              return nixScope.go(
                operators.ifThenElse(
                  nixScope.isDir,
                  () => (nixScope.file),
                  () => (nixScope.parent),
                ),
              );
            })
          ))
        ),
      ),
      "listFilesRecursive": createFunc(/*arg:*/ "dir", null, {}, (nixScope) => (
        nixScope.lib["flatten"](
          nixScope.lib["mapAttrsToList"](
            createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.type, "directory"),
                  () => (nixScope.lib["filesystem"]["listFilesRecursive"](
                    operators.add(
                      nixScope.dir,
                      new InterpolatedString(["/", ""], [
                        () => (nixScope.name),
                      ]),
                    ),
                  )),
                  () => (operators.add(
                    nixScope.dir,
                    new InterpolatedString(["/", ""], [() => (nixScope.name)]),
                  )),
                )
              ))
            )),
          )(nixScope.builtins["readDir"](nixScope.dir)),
        )
      )),
      "packagesFromDirectoryRecursive": /*let*/ createScope((nixScope) => {
        nixScope.concatMapAttrs = nixScope.lib["concatMapAttrs"];
        nixScope.id = nixScope.lib["id"];
        nixScope.makeScope = nixScope.lib["makeScope"];
        nixScope.recurseIntoAttrs = nixScope.lib["recurseIntoAttrs"];
        nixScope.removeSuffix = nixScope.lib["removeSuffix"];
        Object.defineProperty(nixScope, "processDir", {
          enumerable: true,
          get() {
            return createFunc({}, "args", {}, (nixScope) => (
              nixScope.concatMapAttrs(
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      Object.defineProperty(nixScope, "path", {
                        enumerable: true,
                        get() {
                          return operators.add(
                            nixScope.directory,
                            new InterpolatedString(["/", ""], [
                              () => (nixScope.name),
                            ]),
                          );
                        },
                      });
                      return (operators.ifThenElse(
                        operators.equal(nixScope.type, "directory"),
                        () => (createScope((nixScope) => {
                          const obj = {};
                          obj[
                            new InterpolatedString(["", ""], [
                              () => (nixScope.name),
                            ])
                          ] = nixScope.packagesFromDirectoryRecursive(
                            operators.merge(
                              nixScope.args,
                              { "directory": nixScope.path },
                            ),
                          );
                          return obj;
                        })),
                        () => (operators.ifThenElse(
                          operators.and(
                            operators.equal(nixScope.type, "regular"),
                            nixScope.hasSuffix(".nix")(nixScope.name),
                          ),
                          () => (createScope((nixScope) => {
                            const obj = {};
                            obj[
                              new InterpolatedString(["", ""], [
                                () => (nixScope.removeSuffix(".nix")(
                                  nixScope.name,
                                )),
                              ])
                            ] = nixScope.callPackage(nixScope.path)({});
                            return obj;
                          })),
                          () => (operators.ifThenElse(
                            operators.equal(nixScope.type, "regular"),
                            () => ({}),
                            () => (nixScope.throw(
                              new InterpolatedString([
                                "\n              lib.filesystem.packagesFromDirectoryRecursive: Unsupported file type ",
                                " at path ",
                                "\n            ",
                              ], [
                                () => (nixScope.type),
                                () => (nixScope.toString(nixScope.path)),
                              ]),
                            )),
                          )),
                        )),
                      ));
                    })
                  ))
                )),
              )(nixScope.builtins["readDir"](nixScope.directory))
            ));
          },
        });
        return createFunc(
          {
            "newScope": (
              nixScope,
            ) => (nixScope.throw(
              "lib.packagesFromDirectoryRecursive: newScope wasn't passed in args",
            )),
          },
          "args",
          {},
          (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "defaultPath", {
                enumerable: true,
                get() {
                  return operators.add(nixScope.directory, "/package.nix");
                },
              });
              return (operators.ifThenElse(
                nixScope.pathExists(nixScope.defaultPath),
                () => (nixScope.callPackage(nixScope.defaultPath)({})),
                () => (operators.ifThenElse(
                  operators.hasAttr(nixScope.args, "newScope"),
                  () => (nixScope.recurseIntoAttrs(
                    nixScope.makeScope(nixScope.newScope)(
                      createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
                        nixScope.processDir(
                          operators.merge(
                            nixScope.args,
                            createScope((nixScope) => {
                              const obj = {};
                              obj["callPackage"] = nixScope.self["callPackage"];
                              obj["newScope"] = nixScope.self["newScope"];
                              return obj;
                            }),
                          ),
                        )
                      )),
                    ),
                  )),
                  () => (nixScope.processDir(nixScope.args)),
                )),
              ));
            })
          ),
        );
      }),
      "resolveDefaultNix": createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
        operators.ifThenElse(
          nixScope.pathIsDirectory(nixScope.v),
          () => (operators.add(nixScope.v, "/default.nix")),
          () => (operators.ifThenElse(
            operators.and(
              nixScope.lib["isString"](nixScope.v),
              nixScope.hasSuffix("/")(nixScope.v),
            ),
            () => (operators.add(nixScope.v, "default.nix")),
            () => (nixScope.v),
          )),
        )
      )),
    });
  })
));
