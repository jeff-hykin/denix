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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-overflowing-add.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "a", (nixScope) => (9223372036854775807n));
  defGetter(nixScope, "b", (nixScope) => (1n));
  return operators.add(nixScope.a, nixScope.b);
});
