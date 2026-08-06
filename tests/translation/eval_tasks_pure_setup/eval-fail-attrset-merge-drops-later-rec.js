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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-attrset-merge-drops-later-rec.nix";
const operators = runtime.operators;

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(obj, "a", () => (/*rec*/ createScope(nixScope, (nixScope) => {
    defGetter(nixScope, "c", (nixScope) => (operators.add(nixScope.d, 2n)));
    defGetter(nixScope, "d", (nixScope) => (3n));
    const __result = {};
    Object.defineProperty(__result, "c", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.c;
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
  set(obj, ["a", "b"], () => (1n));
  return obj;
})["c"];
