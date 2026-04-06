import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ({
  "x": nixScope.builtins["tryEval"]("x"),
  "y": nixScope.builtins["tryEval"](((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + "false");
    }
    return "y";
  })(false)),
  "z": nixScope.builtins["tryEval"](nixScope.throw("bla")),
});
