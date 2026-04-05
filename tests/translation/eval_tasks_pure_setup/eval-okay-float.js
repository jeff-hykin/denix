import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-float.nix";
const operators = runtime.operators;

export default [
  1.1 + 2.3,
  nixScope.builtins["add"](0.5 + 0.5)(2.0 + 0.5),
  operators.multiply(0.5 + 0.5, 2.0 + 0.5),
  operators.divide(1.5 + 1.5, 0.5 * 4.0),
];
