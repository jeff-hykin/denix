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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-search-path.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return ((nixScope) => {
      runtime.scopeStack.push(nixScope);
      try {
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " + "isFunction (import <nix/fetchurl.nix>)",
            );
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error("assertion failed: " + "length __nixPath == 5");
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'length (filter (x: baseNameOf x.path == "dir4") __nixPath) == 1',
                );
              }
              return operators.add(
                operators.add(
                  operators.add(
                    operators.add(
                      apply(
                        nixScope.import,
                        mkThunk(
                          () => ((nixScope.builtins.findFile(
                            nixScope.builtins.nixPath,
                          ))("a.nix"))
                        ),
                      ),
                      apply(
                        nixScope.import,
                        mkThunk(
                          () => ((nixScope.builtins.findFile(
                            nixScope.builtins.nixPath,
                          ))("b.nix"))
                        ),
                      ),
                    ),
                    apply(
                      nixScope.import,
                      mkThunk(
                        () => ((nixScope.builtins.findFile(
                          nixScope.builtins.nixPath,
                        ))("c.nix"))
                      ),
                    ),
                  ),
                  apply(
                    nixScope.import,
                    mkThunk(
                      () => ((nixScope.builtins.findFile(
                        nixScope.builtins.nixPath,
                      ))("dir5/c.nix"))
                    ),
                  ),
                ),
                /*let*/ createScope(nixScope, (nixScope) => {
                  defGetter(
                    nixScope,
                    "__nixPath",
                    (nixScope) => [
                      createScope(nixScope, (nixScope) => {
                        const obj = {};
                        defGetter(
                          obj,
                          "path",
                          () => (new Path([
                            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/dir2",
                          ], [])),
                        );
                        return obj;
                      }),
                      createScope(nixScope, (nixScope) => {
                        const obj = {};
                        defGetter(
                          obj,
                          "path",
                          () => (new Path([
                            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/dir1",
                          ], [])),
                        );
                        return obj;
                      }),
                    ],
                  );
                  return apply(
                    nixScope.import,
                    mkThunk(
                      () => ((nixScope.builtins.findFile(
                        nixScope.builtins.nixPath,
                      ))("a.nix"))
                    ),
                  );
                }),
              );
            })(
              operators.equal(
                apply(
                  nixScope.length,
                  mkThunk(
                    () => (apply(
                      apply(
                        nixScope.filter,
                        mkThunk(
                          () => (createFunc(
                            /*arg:*/ "x",
                            null,
                            {},
                            nixScope,
                            (nixScope) => (
                              operators.equal(
                                apply(
                                  nixScope.baseNameOf,
                                  mkThunk(() => (nixScope.x["path"])),
                                ),
                                "dir4",
                              )
                            ),
                          ))
                        ),
                      ),
                      mkThunk(() => (nixScope.__nixPath)),
                    ))
                  ),
                ),
                1n,
              ),
            );
          })(
            operators.equal(
              apply(nixScope.length, mkThunk(() => (nixScope.__nixPath))),
              5n,
            ),
          );
        })(
          apply(
            nixScope.isFunction,
            mkThunk(
              () => (apply(
                nixScope.import,
                mkThunk(
                  () => ((nixScope.builtins.findFile(
                    nixScope.builtins.nixPath,
                  ))("nix/fetchurl.nix"))
                ),
              ))
            ),
          ),
        );
      } finally {
        runtime.scopeStack.pop();
      }
    })(runtime.withScope(nixScope, () => (nixScope.builtins)));
  } finally {
    runtime.scopeStack.pop();
  }
})(
  runtime.withScope(
    nixScope,
    () => (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
        ], []))
      ),
    )),
  ),
);
