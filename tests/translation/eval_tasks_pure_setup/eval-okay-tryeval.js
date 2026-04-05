import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-tryeval.nix";

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
