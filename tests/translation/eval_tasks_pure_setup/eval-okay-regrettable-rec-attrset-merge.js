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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regrettable-rec-attrset-merge.nix";
const operators = runtime.operators;

export default //
//
createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(obj, "a", () => (/*rec*/ createScope(nixScope, (nixScope) => {
    defGetter(nixScope, "b", (nixScope) => (operators.add(nixScope.c, 1n)));
    defGetter(nixScope, "d", (nixScope) => (2n));
    const __result = {};
    Object.defineProperty(__result, "b", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.b;
      },
    });
    Object.defineProperty(__result, "d", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.d;
      },
    });
    return __result;
  })));
  set(obj, ["a", "c"], () => (operators.add(nixScope.d, 3n)));
  return obj;
})["a"]["b"];
