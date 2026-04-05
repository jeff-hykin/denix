import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-infinite-recursion-lambda.nix";

export default (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
  nixScope.x(nixScope.x)
)))(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
  nixScope.x(nixScope.x)
)));
