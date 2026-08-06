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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-tryeval-failed-thunk-reeval.nix";

export default //
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "foo",
    (
      nixScope,
    ) => (apply(
      apply(
        apply(nixScope.builtins["trace"], mkThunk(() => ("throwing"))),
        mkThunk(() => (nixScope.throw)),
      ),
      mkThunk(() => ("nope")),
    )),
  );
  return apply(
    apply(
      apply(
        apply(
          nixScope.builtins["seq"],
          mkThunk(
            () => ((apply(
              nixScope.builtins["tryEval"],
              mkThunk(() => (nixScope.foo)),
            ))["success"])
          ),
        ),
        mkThunk(() => (nixScope.builtins["seq"])),
      ),
      mkThunk(
        () => ((apply(
          nixScope.builtins["tryEval"],
          mkThunk(() => (nixScope.foo)),
        ))["success"])
      ),
    ),
    mkThunk(() => ("done")),
  );
});
