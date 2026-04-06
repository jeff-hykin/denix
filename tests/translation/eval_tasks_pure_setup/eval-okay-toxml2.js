import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default apply(nixScope.builtins["toXML"], [
  operators.add("a", "b"),
  10n,
  /*rec*/ createScope((nixScope) => {
    nixScope.x = "x";
    defGetter(nixScope, "y", (nixScope) => nixScope.x);
    const __result = {};
    Object.defineProperty(__result, "x", {
      enumerable: true,
      get() {
        return nixScope.x;
      },
    });
    Object.defineProperty(__result, "y", {
      enumerable: true,
      get() {
        return nixScope.y;
      },
    });
    return __result;
  }),
]);
