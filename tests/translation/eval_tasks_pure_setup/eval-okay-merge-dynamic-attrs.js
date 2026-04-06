import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
    obj[new InterpolatedString(["", ""], [() => (operators.add("b", ""))])] =
      2n;
    return obj;
  });
  obj.set2 = createScope((nixScope) => {
    const obj = {};
    obj[new InterpolatedString(["", ""], [() => (operators.add("b", ""))])] =
      2n;
    return obj;
  });
  obj.set2 = { "a": 1n };
  if (obj["set3"] === undefined) obj["set3"] = {};
  obj["set3"]["a"] = 1n;
  if (obj["set3"] === undefined) obj["set3"] = {};
  obj["set3"][
    new InterpolatedString(["", ""], [() => (operators.add("b", ""))])
  ] = 2n;
  if (obj["set4"] === undefined) obj["set4"] = {};
  obj["set4"][
    new InterpolatedString(["", ""], [() => (operators.add("b", ""))])
  ] = 2n;
  if (obj["set4"] === undefined) obj["set4"] = {};
  obj["set4"]["a"] = 1n;
  return obj;
});
