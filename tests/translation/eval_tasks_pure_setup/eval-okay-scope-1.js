import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-scope-1.nix";

export default ((createFunc({}, null, {}, (nixScope) => (
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    { "x": 1n, "y": nixScope.x }
  ))
)))({ "x": 2n })(3n))["y"];
