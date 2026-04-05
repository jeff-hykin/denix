import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-overflowing-mul.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.a = 4294967297n;
  return operators.multiply(
    operators.multiply(nixScope.a, nixScope.a),
    nixScope.a,
  );
});
