import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
//
createScope((nixScope) => {
  const obj = {};
  obj.a = /*rec*/ createScope((nixScope) => {
    nixScope.d = 2n;
    defGetter(nixScope, "b", (nixScope) => operators.add(nixScope.c, 1n));
    const __result = {};
    Object.defineProperty(__result, "b", {
      enumerable: true,
      get() {
        return nixScope.b;
      },
    });
    Object.defineProperty(__result, "d", {
      enumerable: true,
      get() {
        return nixScope.d;
      },
    });
    return __result;
  });
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"]["c"] = operators.add(nixScope.d, 3n);
  return obj;
})["a"]["b"];
