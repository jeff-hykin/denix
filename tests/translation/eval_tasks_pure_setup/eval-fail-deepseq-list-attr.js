import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
apply(
  apply(nixScope.builtins["deepSeq"], [
    1n,
    { "a": 2n, "b": apply(nixScope.throw, "error in attr in list element") },
    3n,
  ]),
  "unexpected success",
);
