import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default operators.add(
  (createFunc(/*arg:*/ "__curPosFoo", null, {}, (nixScope) => (
    nixScope.__curPosFoo
  )))(1n),
  (createFunc(/*arg:*/ "__curPosBar", null, {}, (nixScope) => (
    nixScope.__curPosBar
  )))(2n),
);
