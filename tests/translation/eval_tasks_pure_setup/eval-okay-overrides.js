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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-overrides.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "overrides",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "a", () => (2n));
      defGetter(obj, "b", () => (3n));
      return obj;
    })),
  );
  return (/*rec*/ createScope(nixScope, (nixScope) => {
    defGetter(nixScope, "__overrides", (nixScope) => (nixScope.overrides));
    defGetter(nixScope, "x", (nixScope) => (nixScope.a));
    defGetter(nixScope, "a", (nixScope) => (1n));
    const __result = {};
    Object.defineProperty(__result, "__overrides", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.__overrides;
      },
    });
    Object.defineProperty(__result, "x", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.x;
      },
    });
    Object.defineProperty(__result, "a", {
      enumerable: true,
      configurable: true,
      get() {
        return nixScope.a;
      },
    });
    return __result;
  }))["x"];
});
