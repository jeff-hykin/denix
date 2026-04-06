import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default [
  nixScope.builtins["add"](2n)(3n),
  nixScope.builtins["add"](2n)(2n),
  nixScope.builtins["typeOf"](nixScope.builtins["add"](2n)(2n)),
  operators.add("t", "t"),
  nixScope.builtins["typeOf"](nixScope.builtins["add"](2.0)(2n)),
  nixScope.builtins["add"](2.0)(2n),
];
