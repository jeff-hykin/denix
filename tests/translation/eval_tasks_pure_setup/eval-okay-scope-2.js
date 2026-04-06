import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ((createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
  createFunc({}, null, {}, (nixScope) => (
    /*rec*/ createScope((nixScope) => {
      nixScope.x = 1n;
      defGetter(nixScope, "y", (nixScope) => nixScope.x);
      return nixScope;
    })
  ))
)))(2n)({ "x": 3n }))["y"];
