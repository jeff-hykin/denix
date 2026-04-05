import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-dynamic-attrs-inherit-2.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.a = {};
  nixScope.a["b"] = 1n;
  return ({});
});
