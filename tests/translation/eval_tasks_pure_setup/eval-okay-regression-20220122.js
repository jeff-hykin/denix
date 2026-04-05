import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regression-20220122.nix";
const operators = runtime.operators;

export default operators.add(
  (createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
    nixScope._
  )))(1n),
  (createFunc(/*arg:*/ "__", null, {}, (nixScope) => (
    nixScope.__
  )))(2n),
);
