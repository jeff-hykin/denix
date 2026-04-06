import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  nixScope.overrides = { "a": 2n, "b": 3n };
  return (/*rec*/ createScope((nixScope) => {
    nixScope.a = 1n;
    defGetter(nixScope, "__overrides", (nixScope) => nixScope.overrides);
    defGetter(nixScope, "x", (nixScope) => nixScope.a);
    const __result = {};
    Object.defineProperty(__result, "__overrides", {
      enumerable: true,
      get() {
        return nixScope.__overrides;
      },
    });
    Object.defineProperty(__result, "x", {
      enumerable: true,
      get() {
        return nixScope.x;
      },
    });
    Object.defineProperty(__result, "a", {
      enumerable: true,
      get() {
        return nixScope.a;
      },
    });
    return __result;
  }))["x"];
});
