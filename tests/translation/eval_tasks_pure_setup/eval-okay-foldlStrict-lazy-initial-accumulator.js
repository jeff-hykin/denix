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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-foldlStrict-lazy-initial-accumulator.nix";

export default //
//
apply(
  apply(
    apply(
      nixScope.builtins["foldl'"],
      mkThunk(
        () => (createFunc(/*arg:*/ "_", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            nixScope.x
          ))
        )))
      ),
    ),
    mkThunk(
      () => (apply(nixScope.throw, mkThunk(() => ("This is never forced"))))
    ),
  ),
  mkThunk(() => ["but the results of applying op are", 42n]),
);
