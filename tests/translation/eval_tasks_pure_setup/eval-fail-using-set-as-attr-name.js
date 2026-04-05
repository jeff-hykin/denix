import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-using-set-as-attr-name.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.attr = { "foo": "bar" };
  nixScope.key = {};
  return nixScope.attr[nixScope.key];
});
