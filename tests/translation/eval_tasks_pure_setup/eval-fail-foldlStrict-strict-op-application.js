import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-foldlStrict-strict-op-application.nix";

export default //
nixScope.builtins["foldl'"](createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
    nixScope.f(null)
  ))
)))(null)([
  createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
    nixScope.throw("Not the final value, but is still forced!")
  )),
  createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
    23n
  )),
]);
