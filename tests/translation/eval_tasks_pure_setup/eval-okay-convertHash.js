import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.hashAlgos = [
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
  ];
  defGetter(
    nixScope,
    "hashesBase16",
    (nixScope) =>
      apply(nixScope.import, new Path(["./eval-okay-hashstring.exp"], [])),
  );
  defGetter(
    nixScope,
    "map2",
    (nixScope) =>
      createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc({}, null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(nixScope.fsts, []),
            () => [],
            () => (operators.listConcat(
              [apply(
                apply(
                  nixScope.f,
                  apply(nixScope.builtins["head"], nixScope.fsts),
                ),
                apply(nixScope.builtins["head"], nixScope.snds),
              )],
              apply(
                apply(nixScope.map2, nixScope.f),
                {
                  "fsts": apply(nixScope.builtins["tail"], nixScope.fsts),
                  "snds": apply(nixScope.builtins["tail"], nixScope.snds),
                },
              ),
            )),
          )
        ))
      )),
  );
  defGetter(
    nixScope,
    "map2'",
    (nixScope) =>
      createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "fsts", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "snds", null, {}, (nixScope) => (
            apply(
              apply(nixScope.map2, nixScope.f),
              { "fsts": nixScope.fsts, "snds": nixScope.snds },
            )
          ))
        ))
      )),
  );
  defGetter(
    nixScope,
    "getOutputHashes",
    (nixScope) =>
      createFunc(/*arg:*/ "hashes", null, {}, (nixScope) => (
        {
          "hashesBase16": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": nixScope.hash,
                        "hashAlgo": nixScope.hashAlgo,
                        "toHashFormat": "base16",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesNix32": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": nixScope.hash,
                        "hashAlgo": nixScope.hashAlgo,
                        "toHashFormat": "nix32",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesBase32": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": nixScope.hash,
                        "hashAlgo": nixScope.hashAlgo,
                        "toHashFormat": "base32",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesBase64": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": nixScope.hash,
                        "hashAlgo": nixScope.hashAlgo,
                        "toHashFormat": "base64",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesSRI": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": nixScope.hash,
                        "hashAlgo": nixScope.hashAlgo,
                        "toHashFormat": "sri",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
        }
      )),
  );
  defGetter(
    nixScope,
    "getOutputHashesColon",
    (nixScope) =>
      createFunc(/*arg:*/ "hashes", null, {}, (nixScope) => (
        {
          "hashesBase16": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": operators.add(
                          operators.add(nixScope.hashAlgo, ":"),
                          nixScope.hashBody,
                        ),
                        "toHashFormat": "base16",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesNix32": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": operators.add(
                          operators.add(nixScope.hashAlgo, ":"),
                          nixScope.hashBody,
                        ),
                        "toHashFormat": "nix32",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesBase32": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": operators.add(
                          operators.add(nixScope.hashAlgo, ":"),
                          nixScope.hashBody,
                        ),
                        "toHashFormat": "base32",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesBase64": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": operators.add(
                          operators.add(nixScope.hashAlgo, ":"),
                          nixScope.hashBody,
                        ),
                        "toHashFormat": "base64",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
          "hashesSRI": apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    apply(
                      nixScope.builtins["convertHash"],
                      {
                        "hash": operators.add(
                          operators.add(nixScope.hashAlgo, ":"),
                          nixScope.hashBody,
                        ),
                        "toHashFormat": "sri",
                      },
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.hashes,
          ),
        }
      )),
  );
  defGetter(
    nixScope,
    "outputHashes",
    (nixScope) => apply(nixScope.getOutputHashes, nixScope.hashesBase16),
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
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  operators.equal(
                    apply(nixScope.getOutputHashesColon, nixScope.x),
                    nixScope.outputHashes,
                  )
                )),
              ),
              ((_withAttrs) => {
                const nixScope = {
                  ...runtime.scopeStack.slice(-1)[0],
                  ..._withAttrs,
                };
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
              })(nixScope.outputHashes),
            ),
          );
        })(
          apply(
            apply(
              nixScope.builtins["all"],
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                operators.equal(
                  apply(nixScope.getOutputHashes, nixScope.x),
                  nixScope.outputHashes,
                )
              )),
            ),
            apply(nixScope.builtins["attrValues"], nixScope.outputHashes),
          ),
        );
      })(
        operators.equal(
          nixScope.outputHashes["hashesSRI"],
          apply(
            apply(
              apply(
                nixScope["map2'"],
                createFunc(/*arg:*/ "hashAlgo", null, {}, (nixScope) => (
                  createFunc(/*arg:*/ "hashBody", null, {}, (nixScope) => (
                    operators.add(
                      operators.add(nixScope.hashAlgo, "-"),
                      nixScope.hashBody,
                    )
                  ))
                )),
              ),
              nixScope.hashAlgos,
            ),
            nixScope.outputHashes["hashesBase64"],
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
            createFunc(/*arg:*/ "s1", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "s2", null, {}, (nixScope) => (
                operators.add(nixScope.s1, nixScope.s2)
              ))
            )),
          ),
          ["a", "b"],
        ),
        ["c", "d"],
      ),
      ["ac", "bd"],
    ),
  );
});
