import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-undeclared-arg.nix";
const operators = runtime.operators;

export default (createFunc({}, null, {}, (nixScope) => (
  operators.add(nixScope.x, nixScope.z)
)))({ "x": "foo", "y": "bla", "z": "bar" });
