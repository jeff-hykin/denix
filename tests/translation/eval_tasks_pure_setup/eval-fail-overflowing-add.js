import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-overflowing-add.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.a = 9223372036854775807n;
  nixScope.b = 1n;
  return operators.add(nixScope.a, nixScope.b);
});
