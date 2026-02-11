export default createFunc(
  { "lib": (nixScope) => (nixScope.import(new Path(["../."], []))) },
  null,
  {},
  (nixScope) => (
    /*let*/ createScope((nixScope) => {
      nixScope.isAttrs = nixScope.builtins["isAttrs"];
      nixScope.isPath = nixScope.builtins["isPath"];
      nixScope.isString = nixScope.builtins["isString"];
      nixScope.nixVersion = nixScope.builtins["nixVersion"];
      nixScope.pathExists = nixScope.builtins["pathExists"];
      nixScope.readDir = nixScope.builtins["readDir"];
      nixScope.split = nixScope.builtins["split"];
      nixScope.trace = nixScope.builtins["trace"];
      nixScope.typeOf = nixScope.builtins["typeOf"];
      nixScope.fetchGit = nixScope.builtins["fetchGit"];
      nixScope.attrNames = nixScope.lib["attrsets"]["attrNames"];
      nixScope.attrValues = nixScope.lib["attrsets"]["attrValues"];
      nixScope.mapAttrs = nixScope.lib["attrsets"]["mapAttrs"];
      nixScope.mapAttrsToList = nixScope.lib["attrsets"]["mapAttrsToList"];
      nixScope.optionalAttrs = nixScope.lib["attrsets"]["optionalAttrs"];
      nixScope.zipAttrsWith = nixScope.lib["attrsets"]["zipAttrsWith"];
      nixScope.pathType = nixScope.lib["filesystem"]["pathType"];
      nixScope.all = nixScope.lib["lists"]["all"];
      nixScope.commonPrefix = nixScope.lib["lists"]["commonPrefix"];
      nixScope.concatLists = nixScope.lib["lists"]["concatLists"];
      nixScope.elemAt = nixScope.lib["lists"]["elemAt"];
      nixScope.filter = nixScope.lib["lists"]["filter"];
      nixScope.findFirst = nixScope.lib["lists"]["findFirst"];
      nixScope.findFirstIndex = nixScope.lib["lists"]["findFirstIndex"];
      nixScope["foldl'"] = nixScope.lib["lists"]["foldl'"];
      nixScope.head = nixScope.lib["lists"]["head"];
      nixScope.length = nixScope.lib["lists"]["length"];
      nixScope.sublist = nixScope.lib["lists"]["sublist"];
      nixScope.tail = nixScope.lib["lists"]["tail"];
      nixScope.append = nixScope.lib["path"]["append"];
      nixScope.splitRoot = nixScope.lib["path"]["splitRoot"];
      nixScope.hasStorePathPrefix = nixScope.lib["path"]["hasStorePathPrefix"];
      nixScope.splitStorePath = nixScope.lib["path"]["splitStorePath"];
      nixScope.components = nixScope.lib["path"]["subpath"]["components"];
      nixScope.join = nixScope.lib["path"]["subpath"]["join"];
      nixScope.isStringLike = nixScope.lib["strings"]["isStringLike"];
      nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
      nixScope.substring = nixScope.lib["strings"]["substring"];
      nixScope.stringLength = nixScope.lib["strings"]["stringLength"];
      nixScope.hasSuffix = nixScope.lib["strings"]["hasSuffix"];
      nixScope.versionAtLeast = nixScope.lib["strings"]["versionAtLeast"];
      nixScope.inPureEvalMode = nixScope.lib["trivial"]["inPureEvalMode"];
      return /*rec*/ createScope((nixScope) => {
        nixScope._currentVersion = 3n;
        nixScope._fetchGitSubmodulesMinver = "2.4";
        nixScope._fetchGitShallowMinver = "2.4";
        defGetter(
          nixScope,
          "migrations",
          (
            nixScope,
          ) => [
            createFunc(/*arg:*/ "filesetV0", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "parts",
                  (nixScope) =>
                    nixScope.splitRoot(nixScope.filesetV0["_internalBase"]),
                );
                return operators.merge(
                  nixScope.filesetV0,
                  {
                    "_internalVersion": 1n,
                    "_internalBaseRoot": nixScope.parts["root"],
                    "_internalBaseComponents": nixScope.components(
                      nixScope.parts["subpath"],
                    ),
                  },
                );
              })
            )),
            createFunc(/*arg:*/ "filesetV1", null, {}, (nixScope) => (
              operators.merge(nixScope.filesetV1, { "_internalVersion": 2n })
            )),
            createFunc(/*arg:*/ "filesetV2", null, {}, (nixScope) => (
              operators.merge(
                nixScope.filesetV2,
                {
                  "_internalIsEmptyWithoutBase": false,
                  "_internalVersion": 3n,
                },
              )
            )),
          ],
        );
        defGetter(nixScope, "_noEvalMessage", (nixScope) => `
        lib.fileset: Directly evaluating a file set is not supported.
          To turn it into a usable source, use \`lib.fileset.toSource\`.
          To pretty-print the contents, use \`lib.fileset.trace\` or \`lib.fileset.traceVal\`.`);
        defGetter(
          nixScope,
          "_emptyWithoutBase",
          (nixScope) => ({
            "_type": "fileset",
            "_internalVersion": nixScope._currentVersion,
            "_internalIsEmptyWithoutBase": true,
            "_noEval": nixScope.throw(nixScope._noEvalMessage),
          }),
        );
        defGetter(nixScope, "_create", (nixScope) =>
          createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "parts",
                  (nixScope) => nixScope.splitRoot(nixScope.base),
                );
                return ({
                  "_type": "fileset",
                  "_internalVersion": nixScope._currentVersion,
                  "_internalIsEmptyWithoutBase": false,
                  "_internalBase": nixScope.base,
                  "_internalBaseRoot": nixScope.parts["root"],
                  "_internalBaseComponents": nixScope.components(
                    nixScope.parts["subpath"],
                  ),
                  "_internalTree": nixScope.tree,
                  "_noEval": nixScope.throw(nixScope._noEvalMessage),
                });
              })
            ))
          )));
        defGetter(nixScope, "_coerce", (nixScope) =>
          createFunc(/*arg:*/ "context", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(
                  operators.selectOrDefault(nixScope.value, ["_type"], ""),
                  "fileset",
                ),
                () => (operators.ifThenElse(
                  operators.greaterThan(
                    nixScope.value["_internalVersion"],
                    nixScope._currentVersion,
                  ),
                  () => (nixScope.throw(
                    new InterpolatedString([
                      "\n          ",
                      " is a file set created from a future version of the file set library with a different internal representation:\n              - Internal version of the file set: ",
                      "\n              - Internal version of the library: ",
                      "\n              Make sure to update your Nixpkgs to have a newer version of \\`lib.fileset\\`.",
                    ], [
                      () => (nixScope.context),
                      () => (nixScope.toString(
                        nixScope.value["_internalVersion"],
                      )),
                      () => (nixScope.toString(nixScope._currentVersion)),
                    ]),
                  )),
                  () => (operators.ifThenElse(
                    operators.lessThan(
                      nixScope.value["_internalVersion"],
                      nixScope._currentVersion,
                    ),
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "migrationsToApply", (nixScope) =>
                        nixScope.sublist(nixScope.value["_internalVersion"])(
                          operators.subtract(
                            nixScope._currentVersion,
                            nixScope.value["_internalVersion"],
                          ),
                        )(nixScope.migrations));
                      return nixScope["foldl'"](
                        createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                          createFunc(
                            /*arg:*/ "migration",
                            null,
                            {},
                            (nixScope) => (
                              nixScope.migration(nixScope.value)
                            ),
                          )
                        )),
                      )(nixScope.value)(nixScope.migrationsToApply);
                    })),
                    () => (nixScope.value),
                  )),
                )),
                () => (operators.ifThenElse(
                  operators.negate(nixScope.isPath(nixScope.value)),
                  () => (operators.ifThenElse(
                    operators.hasAttr(nixScope.value, "_isLibCleanSourceWith"),
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "\n          ",
                        " is a \\`lib.sources\\`-based value, but it should be a file set or a path instead.\n              To convert a \\`lib.sources\\`-based value to a file set you can use \\`lib.fileset.fromSource\\`.\n              Note that this only works for sources created from paths.",
                      ], [() => (nixScope.context)]),
                    )),
                    () => (operators.ifThenElse(
                      nixScope.isStringLike(nixScope.value),
                      () => (nixScope.throw(
                        new InterpolatedString([
                          "\n          ",
                          ' ("',
                          '") is a string-like value, but it should be a file set or a path instead.\n              Paths represented as strings are not supported by \\`lib.fileset\\`, use \\`lib.sources\\` or derivations instead.',
                        ], [
                          () => (nixScope.context),
                          () => (nixScope.toString(nixScope.value)),
                        ]),
                      )),
                      () => (nixScope.throw(
                        new InterpolatedString([
                          "",
                          " is of type ",
                          ", but it should be a file set or a path instead.",
                        ], [
                          () => (nixScope.context),
                          () => (nixScope.typeOf(nixScope.value)),
                        ]),
                      )),
                    )),
                  )),
                  () => (operators.ifThenElse(
                    operators.negate(nixScope.pathExists(nixScope.value)),
                    () => (nixScope.throw(
                      new InterpolatedString([
                        "\n        ",
                        " (",
                        ") is a path that does not exist.\n            To create a file set from a path that may not exist, use \\`lib.fileset.maybeMissing\\`.",
                      ], [
                        () => (nixScope.context),
                        () => (nixScope.toString(nixScope.value)),
                      ]),
                    )),
                    () => (nixScope._singleton(nixScope.value)),
                  )),
                )),
              )
            ))
          )));
        defGetter(nixScope, "_coerceMany", (nixScope) =>
          createFunc(/*arg:*/ "functionContext", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "list", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "filesets", (nixScope) =>
                  nixScope.map(createFunc({}, null, {}, (nixScope) => (
                    nixScope._coerce(
                      new InterpolatedString(["", ": ", ""], [
                        () => (nixScope.functionContext),
                        () => (nixScope.context),
                      ]),
                    )(nixScope.value)
                  )))(nixScope.list));
                defGetter(nixScope, "firstWithBase", (nixScope) =>
                  nixScope.findFirst(
                    createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
                      operators.negate(
                        nixScope.fileset["_internalIsEmptyWithoutBase"],
                      )
                    )),
                  )(null)(nixScope.filesets));
                defGetter(nixScope, "firstBaseRoot", (nixScope) =>
                  nixScope.firstWithBase["_internalBaseRoot"]);
                defGetter(nixScope, "differentIndex", (nixScope) =>
                  nixScope.findFirstIndex(
                    createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
                      operators.and(
                        operators.negate(
                          nixScope.fileset["_internalIsEmptyWithoutBase"],
                        ),
                        operators.notEqual(
                          nixScope.firstBaseRoot,
                          nixScope.fileset["_internalBaseRoot"],
                        ),
                      )
                    )),
                  )(null)(nixScope.filesets));
                return (operators.ifThenElse(
                  operators.and(
                    operators.notEqual(nixScope.firstWithBase, null),
                    operators.notEqual(nixScope.differentIndex, null),
                  ),
                  () => (nixScope.throw(
                    new InterpolatedString([
                      "\n        ",
                      ": Filesystem roots are not the same:\n            ",
                      ': Filesystem root is "',
                      '"\n            ',
                      ': Filesystem root is "',
                      '"\n            Different filesystem roots are not supported.',
                    ], [
                      () => (nixScope.functionContext),
                      () => ((nixScope.head(nixScope.list))["context"]),
                      () => (nixScope.toString(nixScope.firstBaseRoot)),
                      () => ((nixScope.elemAt(nixScope.list)(
                        nixScope.differentIndex,
                      ))["context"]),
                      () => (nixScope.toString(
                        (nixScope.elemAt(nixScope.filesets)(
                          nixScope.differentIndex,
                        ))["_internalBaseRoot"],
                      )),
                    ]),
                  )),
                  () => (nixScope.filesets),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_singleton", (nixScope) =>
          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "type", (nixScope) =>
                nixScope.pathType(nixScope.path));
              return (operators.ifThenElse(
                operators.equal(nixScope.type, "directory"),
                () => (nixScope._create(nixScope.path)(nixScope.type)),
                () => (nixScope._create(nixScope.dirOf(nixScope.path))(
                  createScope((nixScope) => {
                    const obj = {};
                    obj[nixScope.baseNameOf(nixScope.path)] = nixScope.type;
                    return obj;
                  }),
                )),
              ));
            })
          )));
        defGetter(nixScope, "_directoryEntries", (nixScope) =>
          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(nixScope.value, "directory"),
                () => (nixScope.readDir(nixScope.path)),
                () => (operators.merge(
                  nixScope.mapAttrs(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                        null
                      ))
                    )),
                  )(nixScope.readDir(nixScope.path)),
                  nixScope.value,
                )),
              )
            ))
          )));
        defGetter(nixScope, "_normaliseTreeFilter", (nixScope) =>
          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.or(
                  operators.equal(nixScope.tree, "directory"),
                  nixScope.isAttrs(nixScope.tree),
                ),
                () => (/*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "entries",
                    (nixScope) =>
                      nixScope._directoryEntries(nixScope.path)(nixScope.tree),
                  );
                  defGetter(nixScope, "normalisedSubtrees", (nixScope) =>
                    nixScope.mapAttrs(
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        nixScope._normaliseTreeFilter(
                          operators.add(
                            nixScope.path,
                            new InterpolatedString(["/", ""], [
                              () => (nixScope.name),
                            ]),
                          ),
                        )
                      )),
                    )(nixScope.entries));
                  defGetter(
                    nixScope,
                    "subtreeValues",
                    (nixScope) =>
                      nixScope.attrValues(nixScope.normalisedSubtrees),
                  );
                  return (operators.ifThenElse(
                    nixScope.all(nixScope.isNull)(nixScope.subtreeValues),
                    () => (null),
                    () => (operators.ifThenElse(
                      nixScope.all(nixScope.isString)(nixScope.subtreeValues),
                      () => ("directory"),
                      () => (nixScope.normalisedSubtrees),
                    )),
                  ));
                })),
                () => (nixScope.tree),
              )
            ))
          )));
        defGetter(nixScope, "_normaliseTreeMinimal", (nixScope) =>
          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.or(
                  operators.equal(nixScope.tree, "directory"),
                  nixScope.isAttrs(nixScope.tree),
                ),
                () => (/*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "entries",
                    (nixScope) =>
                      nixScope._directoryEntries(nixScope.path)(nixScope.tree),
                  );
                  defGetter(nixScope, "normalisedSubtrees", (nixScope) =>
                    nixScope.mapAttrs(
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        nixScope._normaliseTreeMinimal(
                          operators.add(
                            nixScope.path,
                            new InterpolatedString(["/", ""], [
                              () => (nixScope.name),
                            ]),
                          ),
                        )
                      )),
                    )(nixScope.entries));
                  defGetter(
                    nixScope,
                    "subtreeValues",
                    (nixScope) =>
                      nixScope.attrValues(nixScope.normalisedSubtrees),
                  );
                  return (operators.ifThenElse(
                    nixScope.all(
                      createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                        operators.equal(nixScope.value, "emptyDir")
                      )),
                    )(nixScope.subtreeValues),
                    () => ("emptyDir"),
                    () => (operators.ifThenElse(
                      operators.or(
                        operators.equal(nixScope.tree, "directory"),
                        nixScope.all(
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            nixScope.isString(nixScope.value)
                          )),
                        )(nixScope.subtreeValues),
                      ),
                      () => ("directory"),
                      () => (operators.ifThenElse(
                        nixScope.all(
                          createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
                            operators.or(
                              nixScope.isNull(nixScope.value),
                              operators.equal(nixScope.value, "emptyDir"),
                            )
                          )),
                        )(nixScope.subtreeValues),
                        () => (null),
                        () => (nixScope.normalisedSubtrees),
                      )),
                    )),
                  ));
                })),
                () => (nixScope.tree),
              )
            ))
          )));
        defGetter(nixScope, "_printMinimalTree", (nixScope) =>
          createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "treeSuffix", (nixScope) =>
                  createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      nixScope.isAttrs(nixScope.tree),
                      () => (""),
                      () => (operators.ifThenElse(
                        operators.equal(nixScope.tree, "directory"),
                        () => (" (all files in directory)"),
                        () => (new InterpolatedString([" (", ")"], [
                          () => (nixScope.tree),
                        ])),
                      )),
                    )
                  )));
                defGetter(nixScope, "traceTreeAttrs", (nixScope) =>
                  createFunc(/*arg:*/ "prevLine", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "indent", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
                        nixScope["foldl'"](
                          createFunc(
                            /*arg:*/ "prevLine",
                            null,
                            {},
                            (nixScope) => (
                              createFunc(
                                /*arg:*/ "name",
                                null,
                                {},
                                (nixScope) => (
                                  /*let*/ createScope((nixScope) => {
                                    defGetter(nixScope, "subtree", (nixScope) =>
                                      nixScope.tree[nixScope.name]);
                                    defGetter(
                                      nixScope,
                                      "thisLine",
                                      (nixScope) =>
                                        nixScope.trace(
                                          new InterpolatedString([
                                            "",
                                            "- ",
                                            "",
                                            "",
                                          ], [
                                            () => (nixScope.indent),
                                            () => (nixScope.name),
                                            () => (nixScope.treeSuffix(
                                              nixScope.subtree,
                                            )),
                                          ]),
                                        )(nixScope.prevLine),
                                    );
                                    return (operators.ifThenElse(
                                      operators.or(
                                        operators.equal(nixScope.subtree, null),
                                        operators.equal(
                                          nixScope.subtree,
                                          "emptyDir",
                                        ),
                                      ),
                                      () => (nixScope.prevLine),
                                      () => (operators.ifThenElse(
                                        nixScope.isAttrs(nixScope.subtree),
                                        () => (nixScope.traceTreeAttrs(
                                          nixScope.thisLine,
                                        )(
                                          new InterpolatedString(["", "  "], [
                                            () => (nixScope.indent),
                                          ]),
                                        )(nixScope.subtree)),
                                        () => (nixScope.thisLine),
                                      )),
                                    ));
                                  })
                                ),
                              )
                            ),
                          ),
                        )(nixScope.prevLine)(nixScope.attrNames(nixScope.tree))
                      ))
                    ))
                  )));
                defGetter(
                  nixScope,
                  "firstLine",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.or(
                      operators.equal(nixScope.tree, null),
                      operators.equal(nixScope.tree, "emptyDir"),
                    ),
                    () => (nixScope.trace("(empty)")(null)),
                    () => (nixScope.trace(
                      new InterpolatedString(["", "", ""], [
                        () => (nixScope.toString(nixScope.base)),
                        () => (nixScope.treeSuffix(nixScope.tree)),
                      ]),
                    )(null)),
                  )),
                );
                return (operators.ifThenElse(
                  nixScope.isAttrs(nixScope.tree),
                  () => (nixScope.traceTreeAttrs(nixScope.firstLine)("")(
                    nixScope.tree,
                  )),
                  () => (nixScope.firstLine),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_printFileset", (nixScope) =>
          createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.fileset["_internalIsEmptyWithoutBase"],
              () => (nixScope.trace("(empty)")(null)),
              () => (nixScope._printMinimalTree(
                nixScope.fileset["_internalBase"],
              )(
                nixScope._normaliseTreeMinimal(
                  nixScope.fileset["_internalBase"],
                )(nixScope.fileset["_internalTree"]),
              )),
            )
          )));
        defGetter(nixScope, "_toSourceFilter", (nixScope) =>
          createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "tree", (nixScope) =>
                nixScope._normaliseTreeFilter(
                  nixScope.fileset["_internalBase"],
                )(nixScope.fileset["_internalTree"]));
              defGetter(
                nixScope,
                "baseString",
                (
                  nixScope,
                ) => (operators.ifThenElse(
                  operators.equal(
                    nixScope.fileset["_internalBaseComponents"],
                    [],
                  ),
                  () => ("/"),
                  () => (operators.add(
                    operators.add(
                      "/",
                      nixScope.concatStringsSep("/")(
                        nixScope.fileset["_internalBaseComponents"],
                      ),
                    ),
                    "/",
                  )),
                )),
              );
              defGetter(nixScope, "baseLength", (nixScope) =>
                nixScope.stringLength(nixScope.baseString));
              defGetter(nixScope, "inTree", (nixScope) =>
                createFunc(/*arg:*/ "components", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(nixScope, "recurse", (nixScope) =>
                      createFunc(/*arg:*/ "index", null, {}, (nixScope) => (
                        createFunc(
                          /*arg:*/ "localTree",
                          null,
                          {},
                          (nixScope) => (
                            operators.ifThenElse(
                              nixScope.isAttrs(nixScope.localTree),
                              () => (operators.ifThenElse(
                                operators.greaterThanOrEqual(
                                  nixScope.index,
                                  nixScope.length(nixScope.components),
                                ),
                                () => (true),
                                () => (nixScope.recurse(
                                  operators.add(nixScope.index, 2n),
                                )(
                                  nixScope
                                    .localTree[
                                      nixScope.elemAt(nixScope.components)(
                                        nixScope.index,
                                      )
                                    ],
                                )),
                              )),
                              () => (operators.notEqual(
                                nixScope.localTree,
                                null,
                              )),
                            )
                          ),
                        )
                      )));
                    return nixScope.recurse(0n)(nixScope.tree);
                  })
                )));
              defGetter(nixScope, "empty", (nixScope) =>
                createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                    false
                  ))
                )));
              defGetter(nixScope, "nonEmpty", (nixScope) =>
                createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "pathSlash", (nixScope) =>
                        operators.add(nixScope.path, "/"));
                      return operators.and(
                        operators.ifThenElse(
                          operators.equal(
                            nixScope.substring(0n)(
                              nixScope.stringLength(nixScope.pathSlash),
                            )(nixScope.baseString),
                            nixScope.pathSlash,
                          ),
                          () => (true),
                          () => (operators.ifThenElse(
                            operators.notEqual(
                              nixScope.substring(0n)(nixScope.baseLength)(
                                nixScope.pathSlash,
                              ),
                              nixScope.baseString,
                            ),
                            () => (false),
                            () => (nixScope.inTree(
                              nixScope.split("/")(
                                nixScope.substring(nixScope.baseLength)(-1n)(
                                  nixScope.path,
                                ),
                              ),
                            )),
                          )),
                        ),
                        operators.or(
                          operators.notEqual(nixScope.type, "unknown"),
                          nixScope.throw(
                            new InterpolatedString([
                              "\n            lib.fileset.toSource: \\`fileset\\` contains a file that cannot be added to the store: ",
                              "\n                This file is neither a regular file nor a symlink, the only file types supported by the Nix store.\n                Therefore the file set cannot be added to the Nix store as is. Make sure to not include that file to avoid this error.",
                            ], [() => (nixScope.path)]),
                          ),
                        ),
                      );
                    })
                  ))
                )));
              return (operators.ifThenElse(
                operators.or(
                  nixScope.fileset["_internalIsEmptyWithoutBase"],
                  operators.equal(nixScope.tree, null),
                ),
                () => (nixScope.empty),
                () => (nixScope.nonEmpty),
              ));
            })
          )));
        defGetter(nixScope, "_fromSourceFilter", (nixScope) =>
          createFunc(/*arg:*/ "root", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "sourceFilter", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "fromDirEntry", (nixScope) =>
                  createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "pathString", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          operators.negate(
                            nixScope.sourceFilter(nixScope.pathString)(
                              nixScope.type,
                            ),
                          ),
                          () => (null),
                          () => (operators.ifThenElse(
                            operators.equal(nixScope.type, "directory"),
                            () => (nixScope.fromDir(nixScope.path)(
                              nixScope.pathString,
                            )),
                            () => (nixScope.type),
                          )),
                        )
                      ))
                    ))
                  )));
                defGetter(nixScope, "fromDir", (nixScope) =>
                  createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "pathString", null, {}, (nixScope) => (
                      nixScope.mapAttrs(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          nixScope.fromDirEntry(
                            operators.add(
                              nixScope.path,
                              new InterpolatedString(["/", ""], [
                                () => (nixScope.name),
                              ]),
                            ),
                          )(operators.add(
                            nixScope.pathString,
                            new InterpolatedString(["/", ""], [
                              () => (nixScope.name),
                            ]),
                          ))
                        )),
                      )(nixScope.readDir(nixScope.path))
                    ))
                  )));
                defGetter(nixScope, "rootPathType", (nixScope) =>
                  nixScope.pathType(nixScope.root));
                defGetter(nixScope, "rootString", (nixScope) =>
                  operators.add(
                    "/",
                    nixScope.concatStringsSep("/")(
                      nixScope.components(
                        (nixScope.splitRoot(nixScope.root))["subpath"],
                      ),
                    ),
                  ));
                return (operators.ifThenElse(
                  operators.equal(nixScope.rootPathType, "directory"),
                  () => (nixScope._create(nixScope.root)(
                    nixScope.fromDir(nixScope.root)(nixScope.rootString),
                  )),
                  () => (nixScope._create(nixScope.dirOf(nixScope.root))(
                    createScope((nixScope) => {
                      const obj = {};
                      obj[nixScope.baseNameOf(nixScope.root)] =
                        nixScope.rootPathType;
                      return obj;
                    }),
                  )),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_toList", (nixScope) =>
          createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "recurse", (nixScope) =>
                createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      nixScope.isAttrs(nixScope.tree),
                      () => (nixScope.concatLists(
                        nixScope.mapAttrsToList(
                          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                            createFunc(
                              /*arg:*/ "value",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.recurse(
                                  operators.add(
                                    nixScope.path,
                                    new InterpolatedString(["/", ""], [
                                      () => (nixScope.name),
                                    ]),
                                  ),
                                )(nixScope.value)
                              ),
                            )
                          )),
                        )(nixScope.tree),
                      )),
                      () => (operators.ifThenElse(
                        operators.equal(nixScope.tree, "directory"),
                        () => (nixScope.recurse(nixScope.path)(
                          nixScope.readDir(nixScope.path),
                        )),
                        () => (operators.ifThenElse(
                          operators.equal(nixScope.tree, null),
                          () => [],
                          () => [nixScope.path],
                        )),
                      )),
                    )
                  ))
                )));
              return (operators.ifThenElse(
                nixScope.fileset["_internalIsEmptyWithoutBase"],
                () => [],
                () => (nixScope.recurse(nixScope.fileset["_internalBase"])(
                  nixScope.fileset["_internalTree"],
                )),
              ));
            })
          )));
        defGetter(nixScope, "_shortenTreeBase", (nixScope) =>
          createFunc(/*arg:*/ "targetBaseComponents", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "recurse", (nixScope) =>
                  createFunc(/*arg:*/ "index", null, {}, (nixScope) => (
                    operators.ifThenElse(
                      operators.lessThan(
                        nixScope.index,
                        nixScope.length(
                          nixScope.fileset["_internalBaseComponents"],
                        ),
                      ),
                      () => (createScope((nixScope) => {
                        const obj = {};
                        obj[
                          nixScope.elemAt(
                            nixScope.fileset["_internalBaseComponents"],
                          )(nixScope.index)
                        ] = nixScope.recurse(operators.add(nixScope.index, 1n));
                        return obj;
                      })),
                      () => (nixScope.fileset["_internalTree"]),
                    )
                  )));
                return nixScope.recurse(
                  nixScope.length(nixScope.targetBaseComponents),
                );
              })
            ))
          )));
        defGetter(nixScope, "_lengthenTreeBase", (nixScope) =>
          createFunc(/*arg:*/ "targetBaseComponents", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "recurse", (nixScope) =>
                  createFunc(/*arg:*/ "index", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        operators.and(
                          nixScope.isAttrs(nixScope.tree),
                          operators.lessThan(
                            nixScope.index,
                            nixScope.length(nixScope.targetBaseComponents),
                          ),
                        ),
                        () => (nixScope.recurse(
                          operators.add(nixScope.index, 1n),
                        )(operators.selectOrDefault(nixScope.tree, [
                          nixScope.elemAt(nixScope.targetBaseComponents)(
                            nixScope.index,
                          ),
                        ], null))),
                        () => (nixScope.tree),
                      )
                    ))
                  )));
                return nixScope.recurse(
                  nixScope.length(nixScope.fileset["_internalBaseComponents"]),
                )(nixScope.fileset["_internalTree"]);
              })
            ))
          )));
        defGetter(nixScope, "_unionMany", (nixScope) =>
          createFunc(/*arg:*/ "filesets", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "filesetsWithBase", (nixScope) =>
                nixScope.filter(
                  createFunc(/*arg:*/ "fileset", null, {}, (nixScope) => (
                    operators.negate(
                      nixScope.fileset["_internalIsEmptyWithoutBase"],
                    )
                  )),
                )(nixScope.filesets));
              defGetter(nixScope, "firstWithBase", (nixScope) =>
                nixScope.head(nixScope.filesetsWithBase));
              defGetter(nixScope, "commonBaseComponents", (nixScope) =>
                nixScope["foldl'"](
                  createFunc(/*arg:*/ "components", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "el", null, {}, (nixScope) => (
                      nixScope.commonPrefix(nixScope.components)(
                        nixScope.el["_internalBaseComponents"],
                      )
                    ))
                  )),
                )(nixScope.firstWithBase["_internalBaseComponents"])(
                  nixScope.tail(nixScope.filesetsWithBase),
                ));
              defGetter(nixScope, "commonBase", (nixScope) =>
                nixScope.append(nixScope.firstWithBase["_internalBaseRoot"])(
                  nixScope.join(nixScope.commonBaseComponents),
                ));
              defGetter(nixScope, "trees", (nixScope) =>
                nixScope.map(
                  nixScope._shortenTreeBase(nixScope.commonBaseComponents),
                )(nixScope.filesetsWithBase));
              defGetter(nixScope, "resultTree", (nixScope) =>
                nixScope._unionTrees(nixScope.trees));
              return (operators.ifThenElse(
                operators.equal(nixScope.filesetsWithBase, []),
                () => (nixScope._emptyWithoutBase),
                () => (nixScope._create(nixScope.commonBase)(
                  nixScope.resultTree,
                )),
              ));
            })
          )));
        defGetter(nixScope, "_unionTrees", (nixScope) =>
          createFunc(/*arg:*/ "trees", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "stringIndex", (nixScope) =>
                nixScope.findFirstIndex(nixScope.isString)(null)(
                  nixScope.trees,
                ));
              defGetter(nixScope, "withoutNull", (nixScope) =>
                nixScope.filter(
                  createFunc(/*arg:*/ "tree", null, {}, (nixScope) => (
                    operators.notEqual(nixScope.tree, null)
                  )),
                )(nixScope.trees));
              return (operators.ifThenElse(
                operators.notEqual(nixScope.stringIndex, null),
                () => (nixScope.elemAt(nixScope.trees)(nixScope.stringIndex)),
                () => (operators.ifThenElse(
                  operators.equal(nixScope.withoutNull, []),
                  () => (null),
                  () => (nixScope.zipAttrsWith(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                      nixScope._unionTrees
                    )),
                  )(nixScope.withoutNull)),
                )),
              ));
            })
          )));
        defGetter(nixScope, "_intersection", (nixScope) =>
          createFunc(/*arg:*/ "fileset1", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fileset2", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "commonBaseComponentsLength", (nixScope) =>
                  nixScope.length(
                    nixScope.commonPrefix(
                      nixScope.fileset1["_internalBaseComponents"],
                    )(nixScope.fileset2["_internalBaseComponents"]),
                  ));
                defGetter(
                  nixScope,
                  "longestBaseFileset",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.equal(
                      nixScope.commonBaseComponentsLength,
                      nixScope.length(
                        nixScope.fileset1["_internalBaseComponents"],
                      ),
                    ),
                    () => (nixScope.fileset2),
                    () => (operators.ifThenElse(
                      operators.equal(
                        nixScope.commonBaseComponentsLength,
                        nixScope.length(
                          nixScope.fileset2["_internalBaseComponents"],
                        ),
                      ),
                      () => (nixScope.fileset1),
                      () => (null),
                    )),
                  )),
                );
                defGetter(nixScope, "resultIsEmptyWithoutBase", (nixScope) =>
                  operators.or(
                    operators.or(
                      nixScope.fileset1["_internalIsEmptyWithoutBase"],
                      nixScope.fileset2["_internalIsEmptyWithoutBase"],
                    ),
                    operators.equal(nixScope.longestBaseFileset, null),
                  ));
                defGetter(nixScope, "tree1", (nixScope) =>
                  nixScope._lengthenTreeBase(
                    nixScope.longestBaseFileset["_internalBaseComponents"],
                  )(nixScope.fileset1));
                defGetter(nixScope, "tree2", (nixScope) =>
                  nixScope._lengthenTreeBase(
                    nixScope.longestBaseFileset["_internalBaseComponents"],
                  )(nixScope.fileset2));
                defGetter(nixScope, "resultTree", (nixScope) =>
                  nixScope._intersectTree(nixScope.tree1)(nixScope.tree2));
                return (operators.ifThenElse(
                  nixScope.resultIsEmptyWithoutBase,
                  () => (nixScope._emptyWithoutBase),
                  () => (nixScope._create(
                    nixScope.longestBaseFileset["_internalBase"],
                  )(nixScope.resultTree)),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_intersectTree", (nixScope) =>
          createFunc(/*arg:*/ "lhs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "rhs", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.and(
                  nixScope.isAttrs(nixScope.lhs),
                  nixScope.isAttrs(nixScope.rhs),
                ),
                () => (nixScope.mapAttrs(
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    nixScope._intersectTree(nixScope.lhs[nixScope.name])
                  )),
                )(
                  nixScope.builtins["intersectAttrs"](nixScope.lhs)(
                    nixScope.rhs,
                  ),
                )),
                () => (operators.ifThenElse(
                  operators.or(
                    operators.equal(nixScope.lhs, null),
                    nixScope.isString(nixScope.rhs),
                  ),
                  () => (nixScope.lhs),
                  () => (nixScope.rhs),
                )),
              )
            ))
          )));
        defGetter(nixScope, "_difference", (nixScope) =>
          createFunc(/*arg:*/ "positive", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "negative", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "commonBaseComponentsLength", (nixScope) =>
                  nixScope.length(
                    nixScope.commonPrefix(
                      nixScope.positive["_internalBaseComponents"],
                    )(nixScope.negative["_internalBaseComponents"]),
                  ));
                defGetter(
                  nixScope,
                  "negativeTreeWithPositiveBase",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.equal(
                      nixScope.commonBaseComponentsLength,
                      nixScope.length(
                        nixScope.positive["_internalBaseComponents"],
                      ),
                    ),
                    () => (nixScope._shortenTreeBase(
                      nixScope.positive["_internalBaseComponents"],
                    )(nixScope.negative)),
                    () => (operators.ifThenElse(
                      operators.equal(
                        nixScope.commonBaseComponentsLength,
                        nixScope.length(
                          nixScope.negative["_internalBaseComponents"],
                        ),
                      ),
                      () => (nixScope._lengthenTreeBase(
                        nixScope.positive["_internalBaseComponents"],
                      )(nixScope.negative)),
                      () => (null),
                    )),
                  )),
                );
                defGetter(nixScope, "resultingTree", (nixScope) =>
                  nixScope._differenceTree(nixScope.positive["_internalBase"])(
                    nixScope.positive["_internalTree"],
                  )(nixScope.negativeTreeWithPositiveBase));
                return (operators.ifThenElse(
                  nixScope.positive["_internalIsEmptyWithoutBase"],
                  () => (nixScope._emptyWithoutBase),
                  () => (operators.ifThenElse(
                    nixScope.negative["_internalIsEmptyWithoutBase"],
                    () => (nixScope.positive),
                    () => (nixScope._create(nixScope.positive["_internalBase"])(
                      nixScope.resultingTree,
                    )),
                  )),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_differenceTree", (nixScope) =>
          createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "lhs", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "rhs", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.or(
                    operators.equal(nixScope.lhs, null),
                    nixScope.isString(nixScope.rhs),
                  ),
                  () => (null),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.rhs, null),
                    () => (nixScope.lhs),
                    () => (nixScope.mapAttrs(
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        createFunc(
                          /*arg:*/ "lhsValue",
                          null,
                          {},
                          (nixScope) => (
                            nixScope._differenceTree(
                              operators.add(
                                nixScope.path,
                                new InterpolatedString(["/", ""], [
                                  () => (nixScope.name),
                                ]),
                              ),
                            )(nixScope.lhsValue)(
                              operators.selectOrDefault(nixScope.rhs, [
                                nixScope.name,
                              ], null),
                            )
                          ),
                        )
                      )),
                    )(nixScope._directoryEntries(nixScope.path)(nixScope.lhs))),
                  )),
                )
              ))
            ))
          )));
        defGetter(nixScope, "_fileFilter", (nixScope) =>
          createFunc(/*arg:*/ "predicate", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "root", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "fromFile", (nixScope) =>
                  createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                      operators.ifThenElse(
                        nixScope.predicate(
                          {
                            "name": nixScope.name,
                            "type": nixScope.type,
                            "hasExt": createFunc(
                              /*arg:*/ "ext",
                              null,
                              {},
                              (nixScope) => (
                                nixScope.hasSuffix(
                                  new InterpolatedString([".", ""], [
                                    () => (nixScope.ext),
                                  ]),
                                )(nixScope.name)
                              ),
                            ),
                            "lib.fileset.fileFilter: The predicate function passed as the first argument must be able to handle extra attributes for future compatibility. If you're using `{ name, file, hasExt }:`, use `{ name, file, hasExt, ... }:` instead.":
                              null,
                          },
                        ),
                        () => (nixScope.type),
                        () => (null),
                      )
                    ))
                  )));
                defGetter(nixScope, "fromDir", (nixScope) =>
                  createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                    nixScope.mapAttrs(
                      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                        createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                          operators.ifThenElse(
                            operators.equal(nixScope.type, "directory"),
                            () => (nixScope.fromDir(
                              operators.add(
                                nixScope.path,
                                new InterpolatedString(["/", ""], [
                                  () => (nixScope.name),
                                ]),
                              ),
                            )),
                            () => (nixScope.fromFile(nixScope.name)(
                              nixScope.type,
                            )),
                          )
                        ))
                      )),
                    )(nixScope.readDir(nixScope.path))
                  )));
                defGetter(nixScope, "rootType", (nixScope) =>
                  nixScope.pathType(nixScope.root));
                return (operators.ifThenElse(
                  operators.equal(nixScope.rootType, "directory"),
                  () => (nixScope._create(nixScope.root)(
                    nixScope.fromDir(nixScope.root),
                  )),
                  () => (nixScope._create(nixScope.dirOf(nixScope.root))(
                    createScope((nixScope) => {
                      const obj = {};
                      obj[nixScope.baseNameOf(nixScope.root)] = nixScope
                        .fromFile(nixScope.baseNameOf(nixScope.root))(
                          nixScope.rootType,
                        );
                      return obj;
                    }),
                  )),
                ));
              })
            ))
          )));
        defGetter(nixScope, "_mirrorStorePath", (nixScope) =>
          createFunc(/*arg:*/ "localPath", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "storePath", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(nixScope, "recurse", (nixScope) =>
                  createFunc(
                    /*arg:*/ "focusedStorePath",
                    null,
                    {},
                    (nixScope) => (
                      nixScope.mapAttrs(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                          createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                            operators.ifThenElse(
                              operators.equal(nixScope.type, "directory"),
                              () => (nixScope.recurse(
                                operators.add(
                                  nixScope.focusedStorePath,
                                  new InterpolatedString(["/", ""], [
                                    () => (nixScope.name),
                                  ]),
                                ),
                              )),
                              () => (nixScope.type),
                            )
                          ))
                        )),
                      )(nixScope.builtins["readDir"](nixScope.focusedStorePath))
                    ),
                  ));
                return nixScope._create(nixScope.localPath)(
                  nixScope.recurse(nixScope.storePath),
                );
              })
            ))
          )));
        defGetter(nixScope, "_fromFetchGit", (nixScope) =>
          createFunc(/*arg:*/ "function", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "argument", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                createFunc(
                  /*arg:*/ "extraFetchGitAttrs",
                  null,
                  {},
                  (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(
                        nixScope,
                        "tryStorePath",
                        (
                          nixScope,
                        ) => (operators.ifThenElse(
                          nixScope.pathExists(
                            operators.add(nixScope.path, "/.git"),
                          ),
                          () => (nixScope.throw(
                            new InterpolatedString([
                              "\n            lib.fileset.",
                              ": The ",
                              " (",
                              ') is a store path within a working tree of a Git repository.\n                This indicates that a source directory was imported into the store using a method such as \\`import "${./.}"\\` or \\`path:.\\`.\n                This function currently does not support such a use case, since it currently relies on \\`builtins.fetchGit\\`.\n                You could make this work by using a fetcher such as \\`fetchGit\\` instead of copying the whole repository.\n                If you can\'t avoid copying the repo to the store, see https://github.com/NixOS/nix/issues/9292.',
                            ], [
                              () => (nixScope.function),
                              () => (nixScope.argument),
                              () => (nixScope.toString(nixScope.path)),
                            ]),
                          )),
                          () => (nixScope._singleton(nixScope.path)),
                        )),
                      );
                      defGetter(nixScope, "tryFetchGit", (nixScope) =>
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "fetchResult", (nixScope) =>
                            nixScope.fetchGit(
                              operators.merge(
                                { "url": nixScope.path },
                                operators.merge(
                                  nixScope.optionalAttrs(
                                    nixScope.versionAtLeast(
                                      nixScope.nixVersion,
                                    )(nixScope._fetchGitShallowMinver),
                                  )({ "shallow": true }),
                                  nixScope.extraFetchGitAttrs,
                                ),
                              ),
                            ));
                          return (operators.ifThenElse(
                            operators.negate(
                              nixScope.pathExists(
                                operators.add(nixScope.path, "/.git"),
                              ),
                            ),
                            () => (nixScope.throw(
                              new InterpolatedString([
                                "lib.fileset.",
                                ": Expected the ",
                                " (",
                                ") to point to a local working tree of a Git repository, but it's not.",
                              ], [
                                () => (nixScope.function),
                                () => (nixScope.argument),
                                () => (nixScope.toString(nixScope.path)),
                              ]),
                            )),
                            () => (nixScope._mirrorStorePath(nixScope.path)(
                              nixScope.fetchResult["outPath"],
                            )),
                          ));
                        }));
                      return (operators.ifThenElse(
                        operators.negate(nixScope.isPath(nixScope.path)),
                        () => (nixScope.throw(
                          new InterpolatedString([
                            "lib.fileset.",
                            ": Expected the ",
                            " to be a path, but it's a ",
                            " instead.",
                          ], [
                            () => (nixScope.function),
                            () => (nixScope.argument),
                            () => (nixScope.typeOf(nixScope.path)),
                          ]),
                        )),
                        () => (operators.ifThenElse(
                          operators.notEqual(
                            nixScope.pathType(nixScope.path),
                            "directory",
                          ),
                          () => (nixScope.throw(
                            new InterpolatedString([
                              "lib.fileset.",
                              ": Expected the ",
                              " (",
                              ") to be a directory, but it's a file instead.",
                            ], [
                              () => (nixScope.function),
                              () => (nixScope.argument),
                              () => (nixScope.toString(nixScope.path)),
                            ]),
                          )),
                          () => (operators.ifThenElse(
                            nixScope.hasStorePathPrefix(nixScope.path),
                            () => (nixScope.tryStorePath),
                            () => (nixScope.tryFetchGit),
                          )),
                        )),
                      ));
                    })
                  ),
                )
              ))
            ))
          )));
        return nixScope;
      });
    })
  ),
);
