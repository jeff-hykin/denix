import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  nixScope.attrs = createScope((nixScope) => {
    const obj = {};
    if (obj["puppy"] === undefined) obj["puppy"] = {};
    obj["puppy"]["doggy"] = {};
    return obj;
  });
  nixScope.key = 1n;
  return nixScope.attrs["puppy"][nixScope.key];
});
