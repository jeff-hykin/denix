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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-scope-7.nix";

export default /*rec*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "y", () => (nixScope.x["y"]));
  defGetter(nixScope, "x", (nixScope) => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "y", () => (1n));
    return obj;
  })));
  const __result = {};
  Object.defineProperty(__result, "y", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.y;
    },
  });
  Object.defineProperty(__result, "x", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.x;
    },
  });
  return __result;
})["y"];
