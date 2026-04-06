import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
/*let*/ createScope((nixScope) => {
  defGetter(nixScope, "x", (nixScope) => nixScope.__curPos);
  defGetter(nixScope, "y", (nixScope) => nixScope.__curPos);
  return [
    nixScope.x["line"],
    nixScope.x["column"],
    nixScope.y["line"],
    nixScope.y["column"],
  ];
});
