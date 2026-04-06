import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "{ a.b = [ { c.d = true");
  }
  return nixScope.abort("unreachable");
})(operators.equal(
  createScope((nixScope) => {
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["b"] = [createScope((nixScope) => {
      const obj = {};
      if (obj["c"] === undefined) obj["c"] = {};
      obj["c"]["d"] = true;
      return obj;
    })];
    return obj;
  }),
  createScope((nixScope) => {
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["b"] = [createScope((nixScope) => {
      const obj = {};
      if (obj["c"] === undefined) obj["c"] = {};
      obj["c"]["d"] = false;
      return obj;
    })];
    return obj;
  }),
));
