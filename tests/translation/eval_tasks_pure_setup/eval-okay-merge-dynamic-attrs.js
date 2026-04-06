import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default createScope((nixScope) => {
  const obj = {};
  obj.set1 = { "a": 1n };
  obj.set1 = createScope((nixScope) => {
    const obj = {};
    {
      const __k = new InterpolatedString(["", ""], [
        () => (operators.add("b", "")),
      ]);
      if (__k !== null) obj[__k] = 2n;
    }
    return obj;
  });
  obj.set2 = createScope((nixScope) => {
    const obj = {};
    {
      const __k = new InterpolatedString(["", ""], [
        () => (operators.add("b", "")),
      ]);
      if (__k !== null) obj[__k] = 2n;
    }
    return obj;
  });
  obj.set2 = { "a": 1n };
  if (obj["set3"] === undefined) obj["set3"] = {};
  obj["set3"]["a"] = 1n;
  if (obj["set3"] === undefined) obj["set3"] = {};
  {
    const __k = new InterpolatedString(["", ""], [
      () => (operators.add("b", "")),
    ]);
    if (__k !== null) obj["set3"][__k] = 2n;
  }
  if (obj["set4"] === undefined) obj["set4"] = {};
  {
    const __k = new InterpolatedString(["", ""], [
      () => (operators.add("b", "")),
    ]);
    if (__k !== null) obj["set4"][__k] = 2n;
  }
  if (obj["set4"] === undefined) obj["set4"] = {};
  obj["set4"]["a"] = 1n;
  return obj;
});
