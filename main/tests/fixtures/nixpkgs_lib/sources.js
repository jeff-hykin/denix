export default //
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.match = nixScope.lib["strings"]["match"];
    nixScope.split = nixScope.lib["strings"]["split"];
    nixScope.storeDir = nixScope.lib["strings"]["storeDir"];
    nixScope.boolToString = nixScope.lib["boolToString"];
    nixScope.filter = nixScope.lib["filter"];
    nixScope.isString = nixScope.lib["isString"];
    nixScope.readFile = nixScope.lib["readFile"];
    nixScope.pathIsRegularFile =
      nixScope.lib["filesystem"]["pathIsRegularFile"];
    defGetter(
      nixScope,
      "cleanSourceFilter",
      (nixScope) =>
        createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "baseName",
                (nixScope) =>
                  nixScope.baseNameOf(nixScope.toString(nixScope.name)),
              );
              return operators.negate(
                operators.or(
                  operators.or(
                    operators.or(
                      operators.or(
                        operators.or(
                          operators.or(
                            operators.or(
                              operators.or(
                                operators.equal(nixScope.baseName, ".git"),
                                operators.and(
                                  operators.equal(nixScope.type, "directory"),
                                  operators.or(
                                    operators.or(
                                      operators.or(
                                        operators.equal(
                                          nixScope.baseName,
                                          ".svn",
                                        ),
                                        operators.equal(
                                          nixScope.baseName,
                                          "CVS",
                                        ),
                                      ),
                                      operators.equal(nixScope.baseName, ".hg"),
                                    ),
                                    operators.equal(nixScope.baseName, ".jj"),
                                  ),
                                ),
                              ),
                              nixScope.lib["hasSuffix"]("~")(nixScope.baseName),
                            ),
                            operators.notEqual(
                              nixScope.match("^")(nixScope.baseName),
                              null,
                            ),
                          ),
                          operators.notEqual(
                            nixScope.match("^")(nixScope.baseName),
                            null,
                          ),
                        ),
                        nixScope.lib["hasSuffix"](".o")(nixScope.baseName),
                      ),
                      nixScope.lib["hasSuffix"](".so")(nixScope.baseName),
                    ),
                    operators.and(
                      operators.equal(nixScope.type, "symlink"),
                      nixScope.lib["hasPrefix"]("result")(nixScope.baseName),
                    ),
                  ),
                  operators.equal(nixScope.type, "unknown"),
                ),
              );
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "cleanSource",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          nixScope.cleanSourceWith(
            { "filter": nixScope.cleanSourceFilter, "src": nixScope.src },
          )
        )),
    );
    defGetter(
      nixScope,
      "cleanSourceWith",
      (nixScope) =>
        createFunc(
          {
            "filter": (
              nixScope,
            ) => (createFunc(/*arg:*/ "_path", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "_type", null, {}, (nixScope) => (
                true
              ))
            ))),
            "name": (nixScope) => (null),
          },
          null,
          {},
          (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "orig",
                (nixScope) => nixScope.toSourceAttributes(nixScope.src),
              );
              return nixScope.fromSourceAttributes(createScope((nixScope) => {
                const obj = {};
                obj.origSrc = nixScope.orig.origSrc;
                obj.filter = createFunc(
                  /*arg:*/ "path",
                  null,
                  {},
                  (nixScope) => (
                    createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                      operators.and(
                        nixScope.filter(nixScope.path)(nixScope.type),
                        nixScope.orig["filter"](nixScope.path)(nixScope.type),
                      )
                    ))
                  ),
                );
                obj.name = operators.ifThenElse(
                  operators.notEqual(nixScope.name, null),
                  () => (nixScope.name),
                  () => (nixScope.orig["name"]),
                );
                return obj;
              }));
            })
          ),
        ),
    );
    defGetter(
      nixScope,
      "trace",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "attrs",
              (nixScope) => nixScope.toSourceAttributes(nixScope.src),
            );
            return operators.merge(
              nixScope.fromSourceAttributes(
                operators.merge(
                  nixScope.attrs,
                  {
                    "filter": createFunc(
                      /*arg:*/ "path",
                      null,
                      {},
                      (nixScope) => (
                        createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            defGetter(
                              nixScope,
                              "r",
                              (nixScope) =>
                                nixScope.attrs["filter"](nixScope.path)(
                                  nixScope.type,
                                ),
                            );
                            return nixScope.builtins["trace"](
                              new InterpolatedString([
                                "",
                                ".filter ",
                                " = ",
                                "",
                              ], [
                                () => (nixScope.attrs["name"]),
                                () => (nixScope.path),
                                () => (nixScope.boolToString(nixScope.r)),
                              ]),
                            )(nixScope.r);
                          })
                        ))
                      ),
                    ),
                  },
                ),
              ),
              {
                "satisfiesSubpathInvariant": operators.and(
                  operators.hasAttr(nixScope.src, "satisfiesSubpathInvariant"),
                  nixScope.src["satisfiesSubpathInvariant"],
                ),
              },
            );
          })
        )),
    );
    defGetter(
      nixScope,
      "sourceByRegex",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "regexes", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "isFiltered",
                (nixScope) =>
                  operators.hasAttr(nixScope.src, "_isLibCleanSourceWith"),
              );
              defGetter(
                nixScope,
                "origSrc",
                (
                  nixScope,
                ) => (operators.ifThenElse(
                  nixScope.isFiltered,
                  () => (nixScope.src["origSrc"]),
                  () => (nixScope.src),
                )),
              );
              return nixScope.lib["cleanSourceWith"](
                {
                  "filter":
                    (createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "relPath", (nixScope) =>
                            nixScope.lib["removePrefix"](
                              operators.add(
                                nixScope.toString(nixScope.origSrc),
                                "/",
                              ),
                            )(nixScope.toString(nixScope.path)));
                          return nixScope.lib["any"](
                            createFunc(/*arg:*/ "re", null, {}, (nixScope) => (
                              operators.notEqual(
                                nixScope.match(nixScope.re)(nixScope.relPath),
                                null,
                              )
                            )),
                          )(nixScope.regexes);
                        })
                      ))
                    ))),
                  "src": nixScope.src,
                },
              );
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "sourceFilesBySuffices",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "exts", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "filter", (nixScope) =>
                createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "type", null, {}, (nixScope) => (
                    /*let*/ createScope((nixScope) => {
                      defGetter(
                        nixScope,
                        "base",
                        (nixScope) =>
                          nixScope.baseNameOf(nixScope.toString(nixScope.name)),
                      );
                      return operators.or(
                        operators.equal(nixScope.type, "directory"),
                        nixScope.lib["any"](
                          createFunc(/*arg:*/ "ext", null, {}, (nixScope) => (
                            nixScope.lib["hasSuffix"](nixScope.ext)(
                              nixScope.base,
                            )
                          )),
                        )(nixScope.exts),
                      );
                    })
                  ))
                )));
              return nixScope.cleanSourceWith(
                { "filter": nixScope.filter, "src": nixScope.src },
              );
            })
          ))
        )),
    );
    defGetter(
      nixScope,
      "pathIsGitRepo",
      (nixScope) =>
        createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
          operators.hasAttr(
            nixScope._commitIdFromGitRepoOrError(nixScope.path),
            "value",
          )
        )),
    );
    defGetter(
      nixScope,
      "commitIdFromGitRepo",
      (nixScope) =>
        createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "commitIdOrError",
              (nixScope) => nixScope._commitIdFromGitRepoOrError(nixScope.path),
            );
            return operators.selectOrDefault(nixScope.commitIdOrError, [
              "value",
            ], nixScope.throw(nixScope.commitIdOrError["error"]));
          })
        )),
    );
    defGetter(
      nixScope,
      "_commitIdFromGitRepoOrError",
      (nixScope) =>
        /*let*/ createScope((nixScope) => {
          defGetter(nixScope, "readCommitFromFile", (nixScope) =>
            createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(nixScope, "fileName", (nixScope) =>
                    operators.add(
                      nixScope.path,
                      new InterpolatedString(["/", ""], [
                        () => (nixScope.file),
                      ]),
                    ));
                  defGetter(
                    nixScope,
                    "packedRefsName",
                    (nixScope) => operators.add(nixScope.path, "/packed-refs"),
                  );
                  defGetter(nixScope, "absolutePath", (nixScope) =>
                    createFunc(/*arg:*/ "base", null, {}, (nixScope) => (
                      createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
                        operators.ifThenElse(
                          nixScope.lib["hasPrefix"]("/")(nixScope.path),
                          () => (nixScope.path),
                          () => (nixScope.toString(
                            operators.add(
                              new Path(["/."], []),
                              new InterpolatedString(["", "/", ""], [
                                () => (nixScope.base),
                                () => (nixScope.path),
                              ]),
                            ),
                          )),
                        )
                      ))
                    )));
                  return (operators.ifThenElse(
                    nixScope.pathIsRegularFile(nixScope.path),
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(
                        nixScope,
                        "m",
                        (nixScope) =>
                          nixScope.match("^gitdir: (.*)$")(
                            nixScope.lib["fileContents"](nixScope.path),
                          ),
                      );
                      return (operators.ifThenElse(
                        operators.equal(nixScope.m, null),
                        () => ({
                          "error": operators.add(
                            "File contains no gitdir reference: ",
                            nixScope.path,
                          ),
                        }),
                        () => (/*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "gitDir", (nixScope) =>
                            nixScope.absolutePath(
                              nixScope.dirOf(nixScope.path),
                            )(nixScope.lib["head"](nixScope.m)));
                          defGetter(
                            nixScope,
                            "commonDir''",
                            (
                              nixScope,
                            ) => (operators.ifThenElse(
                              nixScope.pathIsRegularFile(
                                new InterpolatedString(["", "/commondir"], [
                                  () => (nixScope.gitDir),
                                ]),
                              ),
                              () => (nixScope.lib["fileContents"](
                                new InterpolatedString(["", "/commondir"], [
                                  () => (nixScope.gitDir),
                                ]),
                              )),
                              () => (nixScope.gitDir),
                            )),
                          );
                          defGetter(nixScope, "commonDir'", (nixScope) =>
                            nixScope.lib["removeSuffix"]("/")(
                              nixScope["commonDir''"],
                            ));
                          defGetter(nixScope, "commonDir", (nixScope) =>
                            nixScope.absolutePath(nixScope.gitDir)(
                              nixScope["commonDir'"],
                            ));
                          defGetter(nixScope, "refFile", (nixScope) =>
                            nixScope.lib["removePrefix"](
                              new InterpolatedString(["", "/"], [
                                () => (nixScope.commonDir),
                              ]),
                            )(
                              new InterpolatedString(["", "/", ""], [
                                () => (nixScope.gitDir),
                                () => (nixScope.file),
                              ]),
                            ));
                          return nixScope.readCommitFromFile(nixScope.refFile)(
                            nixScope.commonDir,
                          );
                        })),
                      ));
                    })),
                    () => (operators.ifThenElse(
                      nixScope.pathIsRegularFile(nixScope.fileName),
                      () => (/*let*/ createScope((nixScope) => {
                        defGetter(
                          nixScope,
                          "fileContent",
                          (nixScope) =>
                            nixScope.lib["fileContents"](nixScope.fileName),
                        );
                        defGetter(
                          nixScope,
                          "matchRef",
                          (nixScope) =>
                            nixScope.match("^ref: (.*)$")(nixScope.fileContent),
                        );
                        return (operators.ifThenElse(
                          operators.equal(nixScope.matchRef, null),
                          () => ({ "value": nixScope.fileContent }),
                          () => (nixScope.readCommitFromFile(
                            nixScope.lib["head"](nixScope.matchRef),
                          )(nixScope.path)),
                        ));
                      })),
                      () => (operators.ifThenElse(
                        nixScope.pathIsRegularFile(nixScope.packedRefsName),
                        () => (/*let*/ createScope((nixScope) => {
                          defGetter(
                            nixScope,
                            "fileContent",
                            (nixScope) =>
                              nixScope.readFile(nixScope.packedRefsName),
                          );
                          defGetter(
                            nixScope,
                            "matchRef",
                            (nixScope) =>
                              nixScope.match(
                                new InterpolatedString(["([a-z0-9]+) ", ""], [
                                  () => (nixScope.file),
                                ]),
                              ),
                          );
                          defGetter(
                            nixScope,
                            "isRef",
                            (nixScope) =>
                              createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                                operators.and(
                                  nixScope.isString(nixScope.s),
                                  operators.notEqual(
                                    nixScope.matchRef(nixScope.s),
                                    null,
                                  ),
                                )
                              )),
                          );
                          defGetter(
                            nixScope,
                            "refs",
                            (nixScope) =>
                              nixScope.filter(nixScope.isRef)(
                                nixScope.split("")(nixScope.fileContent),
                              ),
                          );
                          return (operators.ifThenElse(
                            operators.equal(nixScope.refs, []),
                            () => ({
                              "error": operators.add(
                                operators.add(
                                  operators.add(
                                    "Could not find ",
                                    nixScope.file,
                                  ),
                                  " in ",
                                ),
                                nixScope.packedRefsName,
                              ),
                            }),
                            () => ({
                              "value": nixScope.lib["head"](
                                nixScope.matchRef(
                                  nixScope.lib["head"](nixScope.refs),
                                ),
                              ),
                            }),
                          ));
                        })),
                        () => ({
                          "error": operators.add(
                            "Not a .git directory: ",
                            nixScope.toString(nixScope.path),
                          ),
                        }),
                      )),
                    )),
                  ));
                })
              ))
            )));
          return nixScope.readCommitFromFile("HEAD");
        }),
    );
    defGetter(
      nixScope,
      "pathHasContext",
      (nixScope) =>
        operators.selectOrDefault(
          nixScope.builtins,
          ["hasContext"],
          nixScope.lib["hasPrefix"](nixScope.storeDir),
        ),
    );
    defGetter(
      nixScope,
      "canCleanSource",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          operators.or(
            operators.hasAttr(nixScope.src, "_isLibCleanSourceWith"),
            operators.negate(
              nixScope.pathHasContext(nixScope.toString(nixScope.src)),
            ),
          )
        )),
    );
    defGetter(
      nixScope,
      "toSourceAttributes",
      (nixScope) =>
        createFunc(/*arg:*/ "src", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "isFiltered",
              (nixScope) =>
                operators.hasAttr(nixScope.src, "_isLibCleanSourceWith"),
            );
            return ({
              "origSrc":
                (operators.ifThenElse(
                  nixScope.isFiltered,
                  () => (nixScope.src["origSrc"]),
                  () => (nixScope.src),
                )),
              "filter":
                (operators.ifThenElse(
                  nixScope.isFiltered,
                  () => (nixScope.src["filter"]),
                  () => (createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                    createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                      true
                    ))
                  ))),
                )),
              "name":
                (operators.ifThenElse(
                  nixScope.isFiltered,
                  () => (nixScope.src["name"]),
                  () => ("source"),
                )),
            });
          })
        )),
    );
    defGetter(
      nixScope,
      "fromSourceAttributes",
      (nixScope) =>
        createFunc({}, null, {}, (nixScope) => (
          {
            "_isLibCleanSourceWith": true,
            "origSrc": nixScope.origSrc,
            "filter": nixScope.filter,
            "name": nixScope.name,
            "outPath": nixScope.builtins["path"](
              {
                "filter": nixScope.filter,
                "name": nixScope.name,
                "path": nixScope.origSrc,
              },
            ),
          }
        )),
    );
    defGetter(
      nixScope,
      "urlToName",
      (nixScope) =>
        createFunc(/*arg:*/ "url", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            nixScope.stringLength = nixScope.lib["strings"]["stringLength"];
            defGetter(nixScope, "base", (nixScope) =>
              nixScope.baseNameOf(
                nixScope.lib["removeSuffix"]("/")(
                  nixScope.lib["last"](
                    nixScope.lib["splitString"](":")(
                      nixScope.toString(nixScope.url),
                    ),
                  ),
                ),
              ));
            defGetter(nixScope, "removeExt", (nixScope) =>
              createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "matchExt",
                    (nixScope) => nixScope.match("(.*)")(nixScope.name),
                  );
                  return (operators.ifThenElse(
                    operators.notEqual(nixScope.matchExt, null),
                    () => (nixScope.lib["head"](nixScope.matchExt)),
                    () => (nixScope.name),
                  ));
                })
              )));
            defGetter(nixScope, "shrink", (nixScope) =>
              createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    defGetter(
                      nixScope,
                      "v",
                      (nixScope) => nixScope.f(nixScope.x),
                    );
                    return (operators.ifThenElse(
                      operators.lessThan(
                        nixScope.stringLength(nixScope.v),
                        nixScope.stringLength(nixScope.x),
                      ),
                      () => (nixScope.shrink(nixScope.f)(nixScope.v)),
                      () => (nixScope.x),
                    ));
                  })
                ))
              )));
            return nixScope.shrink(nixScope.removeExt)(nixScope.base);
          })
        )),
    );
    defGetter(
      nixScope,
      "shortRev",
      (nixScope) =>
        createFunc(/*arg:*/ "rev", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "baseRev",
              (nixScope) =>
                nixScope.baseNameOf(nixScope.toString(nixScope.rev)),
            );
            defGetter(
              nixScope,
              "matchHash",
              (nixScope) => nixScope.match("[a-f0-9]+")(nixScope.baseRev),
            );
            defGetter(
              nixScope,
              "matchVer",
              (nixScope) =>
                nixScope.match("([A-Za-z]+[-_. ]?)*(v)?([0-9.]+.*)")(
                  nixScope.baseRev,
                ),
            );
            return (operators.ifThenElse(
              operators.notEqual(nixScope.matchHash, null),
              () => (nixScope.builtins["substring"](0n)(7n)(nixScope.baseRev)),
              () => (operators.ifThenElse(
                operators.notEqual(nixScope.matchVer, null),
                () => (nixScope.lib["last"](nixScope.matchVer)),
                () => (nixScope.baseRev),
              )),
            ));
          })
        )),
    );
    defGetter(
      nixScope,
      "revOrTag",
      (nixScope) =>
        createFunc(/*arg:*/ "rev", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "tag", null, {}, (nixScope) => (
            operators.ifThenElse(
              operators.notEqual(nixScope.tag, null),
              () => (nixScope.tag),
              () => (operators.ifThenElse(
                operators.notEqual(nixScope.rev, null),
                () => (nixScope.rev),
                () => ("HEAD"),
              )),
            )
          ))
        )),
    );
    defGetter(
      nixScope,
      "repoRevToNameFull",
      (nixScope) =>
        createFunc(/*arg:*/ "repo_", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "rev_", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "suffix_", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "repo",
                  (nixScope) => nixScope.urlToName(nixScope.repo_),
                );
                defGetter(
                  nixScope,
                  "rev",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.notEqual(nixScope.rev_, null),
                    () => (new InterpolatedString(["-", ""], [
                      () => (nixScope.shortRev(nixScope.rev_)),
                    ])),
                    () => (""),
                  )),
                );
                defGetter(
                  nixScope,
                  "suffix",
                  (
                    nixScope,
                  ) => (operators.ifThenElse(
                    operators.notEqual(nixScope.suffix_, null),
                    () => (new InterpolatedString(["-", ""], [
                      () => (nixScope.suffix_),
                    ])),
                    () => (""),
                  )),
                );
                return (new InterpolatedString(["", "", "", "-source"], [
                  () => (nixScope.repo),
                  () => (nixScope.rev),
                  () => (nixScope.suffix),
                ]));
              })
            ))
          ))
        )),
    );
    defGetter(
      nixScope,
      "repoRevToName",
      (nixScope) =>
        createFunc(/*arg:*/ "kind", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(nixScope.kind, "source"),
            () => (createFunc(/*arg:*/ "repo", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "rev", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
                  "source"
                ))
              ))
            ))),
            () => (operators.ifThenElse(
              operators.equal(nixScope.kind, "versioned"),
              () => (createFunc(/*arg:*/ "repo", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "rev", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "suffix", null, {}, (nixScope) => (
                    nixScope.repoRevToNameFull(nixScope.repo)(nixScope.rev)(
                      null,
                    )
                  ))
                ))
              ))),
              () => (operators.ifThenElse(
                operators.equal(nixScope.kind, "full"),
                () => (nixScope.repoRevToNameFull),
                () => (nixScope.throw("repoRevToName: invalid kind")),
              )),
            )),
          )
        )),
    );
    return ({
      "pathType": nixScope.lib["warnIf"](
        nixScope.lib["oldestSupportedReleaseIsAtLeast"](2305n),
      )("lib.sources.pathType has been moved to lib.filesystem.pathType.")(
        nixScope.lib["filesystem"]["pathType"],
      ),
      "pathIsDirectory": nixScope.lib["warnIf"](
        nixScope.lib["oldestSupportedReleaseIsAtLeast"](2305n),
      )("lib.sources.pathIsDirectory has been moved to lib.filesystem.pathIsDirectory.")(
        nixScope.lib["filesystem"]["pathIsDirectory"],
      ),
      "pathIsRegularFile": nixScope.lib["warnIf"](
        nixScope.lib["oldestSupportedReleaseIsAtLeast"](2305n),
      )("lib.sources.pathIsRegularFile has been moved to lib.filesystem.pathIsRegularFile.")(
        nixScope.lib["filesystem"]["pathIsRegularFile"],
      ),
      "pathIsGitRepo": nixScope.pathIsGitRepo,
      "commitIdFromGitRepo": nixScope.commitIdFromGitRepo,
      "cleanSource": nixScope.cleanSource,
      "cleanSourceWith": nixScope.cleanSourceWith,
      "cleanSourceFilter": nixScope.cleanSourceFilter,
      "pathHasContext": nixScope.pathHasContext,
      "canCleanSource": nixScope.canCleanSource,
      "urlToName": nixScope.urlToName,
      "shortRev": nixScope.shortRev,
      "revOrTag": nixScope.revOrTag,
      "repoRevToName": nixScope.repoRevToName,
      "sourceByRegex": nixScope.sourceByRegex,
      "sourceFilesBySuffices": nixScope.sourceFilesBySuffices,
      "trace": nixScope.trace,
    });
  })
));
