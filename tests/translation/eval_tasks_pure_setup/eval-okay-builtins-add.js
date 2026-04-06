import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default [
  apply(apply(nixScope.builtins["add"], 2n), 3n),
  apply(apply(nixScope.builtins["add"], 2n), 2n),
  apply(
    nixScope.builtins["typeOf"],
    apply(apply(nixScope.builtins["add"], 2n), 2n),
  ),
  operators.add("t", "t"),
  apply(
    nixScope.builtins["typeOf"],
    apply(apply(nixScope.builtins["add"], 2.0), 2n),
  ),
  apply(apply(nixScope.builtins["add"], 2.0), 2n),
];
