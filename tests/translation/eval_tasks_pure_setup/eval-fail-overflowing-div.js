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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-overflowing-div.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "intMin",
    (nixScope) => (operators.subtract(-9223372036854775807n, 1n)),
  );
  defGetter(nixScope, "b", (nixScope) => (-1n));
  return apply(
    apply(nixScope.builtins["seq"], mkThunk(() => (nixScope.intMin))),
    mkThunk(
      () => (apply(
        apply(nixScope.builtins["seq"], mkThunk(() => (nixScope.b))),
        mkThunk(() => (operators.divide(nixScope.intMin, nixScope.b))),
      ))
    ),
  );
});
