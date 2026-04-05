import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-missing-arg.nix";
const operators = runtime.operators;

export default (createFunc({}, null, {}, (nixScope) => (
  operators.add(operators.add(nixScope.x, nixScope.y), nixScope.z)
)))({ "x": "foo", "z": "bar" });
