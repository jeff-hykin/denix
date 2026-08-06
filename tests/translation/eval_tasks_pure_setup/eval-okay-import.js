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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-import.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "overrides",
    (nixScope) => (operators.merge(
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "import",
          () => (createFunc(/*arg:*/ "fn", null, {}, nixScope, (nixScope) => (
            apply(
              apply(nixScope.scopedImport, mkThunk(() => (nixScope.overrides))),
              mkThunk(() => (nixScope.fn)),
            )
          ))),
        );
        defGetter(
          obj,
          "scopedImport",
          () => (createFunc(
            /*arg:*/ "attrs",
            null,
            {},
            nixScope,
            (nixScope) => (
              createFunc(/*arg:*/ "fn", null, {}, nixScope, (nixScope) => (
                apply(
                  apply(
                    nixScope.scopedImport,
                    mkThunk(
                      () => (operators.merge(
                        nixScope.overrides,
                        nixScope.attrs,
                      ))
                    ),
                  ),
                  mkThunk(() => (nixScope.fn)),
                )
              ))
            ),
          )),
        );
        defGetter(
          obj,
          "builtins",
          () => (operators.merge(nixScope.builtins, nixScope.overrides)),
        );
        return obj;
      }),
      apply(
        nixScope.import,
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
          ], []))
        ),
      ),
    )),
  );
  return apply(
    apply(nixScope.scopedImport, mkThunk(() => (nixScope.overrides))),
    mkThunk(
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/imported.nix",
      ], []))
    ),
  );
});
