import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default createScope((nixScope) => {
  const obj = {};
  if (obj["a"] === undefined) obj["a"] = {};
  {
    const __k = new InterpolatedString(["", ""], [() => ("b")]);
    if (__k !== null) obj["a"][__k] = true;
  }
  if (obj["a"] === undefined) obj["a"] = {};
  {
    const __k = new InterpolatedString(["", ""], [() => ("c")]);
    if (__k !== null) obj["a"][__k] = false;
  }
  return obj;
})["a"]["b"];
