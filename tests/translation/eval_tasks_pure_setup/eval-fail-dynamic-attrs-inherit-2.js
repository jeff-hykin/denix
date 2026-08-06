import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-dynamic-attrs-inherit-2.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.a = {};
  defGetter(nixScope.a, "b", () => (1n));
  return createScope(nixScope, (nixScope) => {
    const obj = {};
    return obj;
  });
});
