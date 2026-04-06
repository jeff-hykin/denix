import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default operators.add(
  apply(
    createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
      nixScope._
    )),
    1n,
  ),
  apply(
    createFunc(/*arg:*/ "__", null, {}, (nixScope) => (
      nixScope.__
    )),
    2n,
  ),
);
