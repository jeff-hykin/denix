import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
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
                      nixScope.import(
                        (nixScope["builtins"]["findFile"](
                          nixScope["builtins"]["nixPath"](),
                        ))("a.nix"),
                      ),
                      nixScope.import(
                        (nixScope["builtins"]["findFile"](
                          nixScope["builtins"]["nixPath"](),
                        ))("b.nix"),
                      ),
                    ),
                    nixScope.import(
                      (nixScope["builtins"]["findFile"](
                        nixScope["builtins"]["nixPath"](),
                      ))("c.nix"),
                    ),
                  ),
                  nixScope.import(
                    (nixScope["builtins"]["findFile"](
                      nixScope["builtins"]["nixPath"](),
                    ))("dir5/c.nix"),
                  ),
                ),
                /*let*/ createScope((nixScope) => {
                  nixScope.__nixPath = [
                    { "path": new Path(["../source_code/nix_lang/dir2"], []) },
                    { "path": new Path(["../source_code/nix_lang/dir1"], []) },
                  ];
                  return nixScope.import(
                    (nixScope["builtins"]["findFile"](
                      nixScope["builtins"]["nixPath"](),
                    ))("a.nix"),
                  );
                }),
              );
            })(
              operators.equal(
                nixScope.length(
                  nixScope.filter(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                      operators.equal(
                        nixScope.baseNameOf(nixScope.x["path"]),
                        "dir4",
                      )
                    )),
                  )(nixScope.__nixPath),
                ),
                1n,
              ),
            );
          })(operators.equal(nixScope.length(nixScope.__nixPath), 5n));
        })(
          nixScope.isFunction(
            nixScope.import(
              (nixScope["builtins"]["findFile"](
                nixScope["builtins"]["nixPath"](),
              ))("nix/fetchurl.nix"),
            ),
          ),
        );
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.builtins);
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
