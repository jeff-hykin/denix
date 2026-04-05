import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-null-dynamic-attrs.nix";
const operators = runtime.operators;

export default operators.equal(
  createScope((nixScope) => {
    const obj = {};
    obj[null] = true;
    return obj;
  }),
  {},
);
