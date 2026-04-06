import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ({
  "x": apply(nixScope.builtins["tryEval"], "x"),
  "y": apply(
    nixScope.builtins["tryEval"],
    ((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + "false");
      }
      return "y";
    })(false),
  ),
  "z": apply(nixScope.builtins["tryEval"], apply(nixScope.throw, "bla")),
});
