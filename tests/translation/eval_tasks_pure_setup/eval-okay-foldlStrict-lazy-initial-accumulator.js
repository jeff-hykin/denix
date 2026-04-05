import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-foldlStrict-lazy-initial-accumulator.nix";

export default //
//
nixScope.builtins["foldl'"](createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    nixScope.x
  ))
)))(nixScope.throw("This is never forced"))([
  "but the results of applying op are",
  42n,
]);
