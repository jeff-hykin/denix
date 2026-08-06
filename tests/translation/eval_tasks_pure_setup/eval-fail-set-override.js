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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-set-override.nix";

export default /*rec*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "__overrides", (nixScope) => (1n));
  const __result = {};
  Object.defineProperty(__result, "__overrides", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.__overrides;
    },
  });
  return __result;
});
