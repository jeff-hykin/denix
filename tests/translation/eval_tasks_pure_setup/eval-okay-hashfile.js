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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-hashfile.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "paths",
    (
      nixScope,
    ) => [
      new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/data",
      ], []),
      new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/binary-data",
      ], []),
    ],
  );
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
                        nixScope.builtins["hashFile"],
                        mkThunk(() => (nixScope.hash)),
                      ))
                    ),
                  ),
                  mkThunk(() => (nixScope.paths)),
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
