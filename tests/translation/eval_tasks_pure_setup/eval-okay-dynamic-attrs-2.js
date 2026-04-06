import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default createScope((nixScope) => {
  const obj = {};
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"][new InterpolatedString(["", ""], [() => ("b")])] = true;
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"][new InterpolatedString(["", ""], [() => ("c")])] = false;
  return obj;
})["a"]["b"];
