import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-convertHash.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "hashAlgos",
    (
      nixScope,
    ) => [
      "md5",
      "md5",
      "md5",
      "sha1",
      "sha1",
      "sha1",
      "sha256",
      "sha256",
      "sha256",
      "sha512",
      "sha512",
      "sha512",
    ],
  );
  defGetter(
    nixScope,
    "hashesBase16",
    (
      nixScope,
    ) => (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-hashstring.exp",
        ], []))
      ),
    )),
  );
  defGetter(
    nixScope,
    "map2",
    (nixScope) => (createFunc(/*arg:*/ "f", null, {}, nixScope, (nixScope) => (
      createFunc(
        {},
        null,
        { args: { "fsts": false, "snds": false } },
        nixScope,
        (nixScope) => (
          operators.ifThenElse(
            operators.equal(nixScope.fsts, []),
            () => [],
            () => (operators.listConcat(
              [apply(
                apply(
                  nixScope.f,
                  mkThunk(
                    () => (apply(
                      nixScope.builtins["head"],
                      mkThunk(() => (nixScope.fsts)),
                    ))
                  ),
                ),
                mkThunk(
                  () => (apply(
                    nixScope.builtins["head"],
                    mkThunk(() => (nixScope.snds)),
                  ))
                ),
              )],
              apply(
                apply(nixScope.map2, mkThunk(() => (nixScope.f))),
                mkThunk(() => (createScope(nixScope, (nixScope) => {
                  const obj = {};
                  defGetter(
                    obj,
                    "fsts",
                    () => (apply(
                      nixScope.builtins["tail"],
                      mkThunk(() => (nixScope.fsts)),
                    )),
                  );
                  defGetter(
                    obj,
                    "snds",
                    () => (apply(
                      nixScope.builtins["tail"],
                      mkThunk(() => (nixScope.snds)),
                    )),
                  );
                  return obj;
                }))),
              ),
            )),
          )
        ),
      )
    ))),
  );
  defGetter(
    nixScope,
    "map2'",
    (nixScope) => (createFunc(/*arg:*/ "f", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "fsts", null, {}, nixScope, (nixScope) => (
        createFunc(/*arg:*/ "snds", null, {}, nixScope, (nixScope) => (
          apply(
            apply(nixScope.map2, mkThunk(() => (nixScope.f))),
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "fsts", () => (nixScope.fsts));
              defGetter(obj, "snds", () => (nixScope.snds));
              return obj;
            }))),
          )
        ))
      ))
    ))),
  );
  defGetter(
    nixScope,
    "getOutputHashes",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "hashes", null, {}, nixScope, (nixScope) => (
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "hashesBase16",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hash",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(obj, "hash", () => (nixScope.hash));
                              defGetter(
                                obj,
                                "hashAlgo",
                                () => (nixScope.hashAlgo),
                              );
                              defGetter(obj, "toHashFormat", () => ("base16"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesNix32",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hash",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(obj, "hash", () => (nixScope.hash));
                              defGetter(
                                obj,
                                "hashAlgo",
                                () => (nixScope.hashAlgo),
                              );
                              defGetter(obj, "toHashFormat", () => ("nix32"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesBase32",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hash",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(obj, "hash", () => (nixScope.hash));
                              defGetter(
                                obj,
                                "hashAlgo",
                                () => (nixScope.hashAlgo),
                              );
                              defGetter(obj, "toHashFormat", () => ("base32"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesBase64",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hash",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(obj, "hash", () => (nixScope.hash));
                              defGetter(
                                obj,
                                "hashAlgo",
                                () => (nixScope.hashAlgo),
                              );
                              defGetter(obj, "toHashFormat", () => ("base64"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesSRI",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hash",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(obj, "hash", () => (nixScope.hash));
                              defGetter(
                                obj,
                                "hashAlgo",
                                () => (nixScope.hashAlgo),
                              );
                              defGetter(obj, "toHashFormat", () => ("sri"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        return obj;
      })
    ))),
  );
  defGetter(
    nixScope,
    "getOutputHashesColon",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "hashes", null, {}, nixScope, (nixScope) => (
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "hashesBase16",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(
                                obj,
                                "hash",
                                () => (operators.add(
                                  operators.add(nixScope.hashAlgo, ":"),
                                  nixScope.hashBody,
                                )),
                              );
                              defGetter(obj, "toHashFormat", () => ("base16"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesNix32",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(
                                obj,
                                "hash",
                                () => (operators.add(
                                  operators.add(nixScope.hashAlgo, ":"),
                                  nixScope.hashBody,
                                )),
                              );
                              defGetter(obj, "toHashFormat", () => ("nix32"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesBase32",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(
                                obj,
                                "hash",
                                () => (operators.add(
                                  operators.add(nixScope.hashAlgo, ":"),
                                  nixScope.hashBody,
                                )),
                              );
                              defGetter(obj, "toHashFormat", () => ("base32"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesBase64",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(
                                obj,
                                "hash",
                                () => (operators.add(
                                  operators.add(nixScope.hashAlgo, ":"),
                                  nixScope.hashBody,
                                )),
                              );
                              defGetter(obj, "toHashFormat", () => ("base64"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        defGetter(
          obj,
          "hashesSRI",
          () => (apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          apply(
                            nixScope.builtins["convertHash"],
                            mkThunk(() => (createScope(nixScope, (nixScope) => {
                              const obj = {};
                              defGetter(
                                obj,
                                "hash",
                                () => (operators.add(
                                  operators.add(nixScope.hashAlgo, ":"),
                                  nixScope.hashBody,
                                )),
                              );
                              defGetter(obj, "toHashFormat", () => ("sri"));
                              return obj;
                            }))),
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.hashes)),
          )),
        );
        return obj;
      })
    ))),
  );
  defGetter(
    nixScope,
    "outputHashes",
    (
      nixScope,
    ) => (apply(
      nixScope.getOutputHashes,
      mkThunk(() => (nixScope.hashesBase16)),
    )),
  );
  return ((_cond) => {
    if (!_cond) {
      throw new Error(
        "assertion failed: " +
          'map2\' (s1: s2: s1 + s2) [ "a" "b" ] [ "c" "d" ] == [\n    "ac"\n    "bd"\n  ]',
      );
    }
    return ((_cond) => {
      if (!_cond) {
        throw new Error(
          "assertion failed: " + "outputHashes.hashesBase16 == hashesBase16",
        );
      }
      return ((_cond) => {
        if (!_cond) {
          throw new Error(
            "assertion failed: " +
              'outputHashes.hashesSRI\n  == (map2\' (hashAlgo: hashBody: hashAlgo + "-" + hashBody) hashAlgos outputHashes.hashesBase64)',
          );
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " +
                "builtins.all (x: getOutputHashes x == outputHashes) (builtins.attrValues outputHashes)",
            );
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  "builtins.all (x: getOutputHashesColon x == outputHashes) (\n  with outputHashes",
              );
            }
            return nixScope.outputHashes;
          })(
            apply(
              apply(
                nixScope.builtins["all"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "x",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      operators.equal(
                        apply(
                          nixScope.getOutputHashesColon,
                          mkThunk(() => (nixScope.x)),
                        ),
                        nixScope.outputHashes,
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (((nixScope) => {
                runtime.scopeStack.push(nixScope);
                try {
                  return [
                    nixScope.hashesBase16,
                    nixScope.hashesBase32,
                    nixScope.hashesBase64,
                  ];
                } finally {
                  runtime.scopeStack.pop();
                }
              })(runtime.withScope(nixScope, () => (nixScope.outputHashes))))),
            ),
          );
        })(
          apply(
            apply(
              nixScope.builtins["all"],
              mkThunk(
                () => (createFunc(
                  /*arg:*/ "x",
                  null,
                  {},
                  nixScope,
                  (nixScope) => (
                    operators.equal(
                      apply(
                        nixScope.getOutputHashes,
                        mkThunk(() => (nixScope.x)),
                      ),
                      nixScope.outputHashes,
                    )
                  ),
                ))
              ),
            ),
            mkThunk(
              () => (apply(
                nixScope.builtins["attrValues"],
                mkThunk(() => (nixScope.outputHashes)),
              ))
            ),
          ),
        );
      })(
        operators.equal(
          nixScope.outputHashes["hashesSRI"],
          apply(
            apply(
              apply(
                nixScope["map2'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "hashAlgo",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "hashBody",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          operators.add(
                            operators.add(nixScope.hashAlgo, "-"),
                            nixScope.hashBody,
                          )
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.hashAlgos)),
            ),
            mkThunk(() => (nixScope.outputHashes["hashesBase64"])),
          ),
        ),
      );
    })(
      operators.equal(
        nixScope.outputHashes["hashesBase16"],
        nixScope.hashesBase16,
      ),
    );
  })(
    operators.equal(
      apply(
        apply(
          apply(
            nixScope["map2'"],
            mkThunk(
              () => (createFunc(
                /*arg:*/ "s1",
                null,
                {},
                nixScope,
                (nixScope) => (
                  createFunc(/*arg:*/ "s2", null, {}, nixScope, (nixScope) => (
                    operators.add(nixScope.s1, nixScope.s2)
                  ))
                ),
              ))
            ),
          ),
          mkThunk(() => ["a", "b"]),
        ),
        mkThunk(() => ["c", "d"]),
      ),
      ["ac", "bd"],
    ),
  );
});
