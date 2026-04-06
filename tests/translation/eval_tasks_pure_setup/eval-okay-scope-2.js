import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default (apply(
  apply(
    createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
      createFunc({}, null, {}, (nixScope) => (
        /*rec*/ createScope((nixScope) => {
          nixScope.x = 1n;
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
        })
      ))
    )),
    2n,
  ),
  { "x": 3n },
))["y"];
