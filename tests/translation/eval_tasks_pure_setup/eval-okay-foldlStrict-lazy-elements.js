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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-foldlStrict-lazy-elements.nix";
const operators = runtime.operators;

export default //
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "lst",
    (
      nixScope,
    ) => (apply(
      apply(
        apply(
          nixScope.builtins["foldl'"],
          mkThunk(
            () => (createFunc(
              /*arg:*/ "acc",
              null,
              {},
              nixScope,
              (nixScope) => (
                createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
                  operators.listConcat(nixScope.acc, [nixScope.x])
                ))
              ),
            ))
          ),
        ),
        mkThunk(() => []),
      ),
      mkThunk(
        () => [
          42n,
          apply(nixScope.throw, mkThunk(() => ("this shouldn't be evaluated"))),
        ]
      ),
    )),
  );
  return apply(nixScope.builtins["head"], mkThunk(() => (nixScope.lst)));
});
