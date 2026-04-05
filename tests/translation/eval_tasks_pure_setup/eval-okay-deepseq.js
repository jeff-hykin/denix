import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-deepseq.nix";

export default nixScope.builtins["deepSeq"](/*let*/ createScope((nixScope) => {
  defGetter(nixScope, "as", (nixScope) => ({ "x": 123n, "y": nixScope.as }));
  return nixScope.as;
}))(456n);
