import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*rec*/ createScope((nixScope) => {
  nixScope.y = nixScope.x["y"];
  nixScope.x = { "y": 1n };
  const __result = {};
  Object.defineProperty(__result, "y", {
    enumerable: true,
    get() {
      return nixScope.y;
    },
  });
  Object.defineProperty(__result, "x", {
    enumerable: true,
    get() {
      return nixScope.x;
    },
  });
  return __result;
})["y"];
