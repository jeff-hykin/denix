import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*rec*/ createScope((nixScope) => {
  nixScope.__overrides = 1n;
  const __result = {};
  Object.defineProperty(__result, "__overrides", {
    enumerable: true,
    get() {
      return nixScope.__overrides;
    },
  });
  return __result;
});
