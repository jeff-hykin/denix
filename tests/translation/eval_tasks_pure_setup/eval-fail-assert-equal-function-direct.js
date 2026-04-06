import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
//
((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "(x: x) == (x: x)");
  }
  return apply(nixScope.abort, "unreachable");
})(operators.equal(
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    nixScope.x
  )),
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    nixScope.x
  )),
));
