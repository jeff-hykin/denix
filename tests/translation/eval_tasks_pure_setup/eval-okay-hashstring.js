import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-hashstring.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "strings", (nixScope) => ["", "text 1", "text 2"]);
  return apply(
    nixScope.builtins["concatLists"],
    mkThunk(
      () => (apply(
        apply(
          nixScope.map,
          mkThunk(
            () => (createFunc(
              /*arg:*/ "hash",
              null,
              {},
              nixScope,
              (nixScope) => (
                apply(
                  apply(
                    nixScope.map,
                    mkThunk(
                      () => (apply(
                        nixScope.builtins["hashString"],
                        mkThunk(() => (nixScope.hash)),
                      ))
                    ),
                  ),
                  mkThunk(() => (nixScope.strings)),
                )
              ),
            ))
          ),
        ),
        mkThunk(() => ["md5", "sha1", "sha256", "sha512"]),
      ))
    ),
  );
});
