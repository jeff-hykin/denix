import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-genericClosure-element-not-attrset.nix";

export default nixScope.builtins["genericClosure"](
  {
    "startSet": ["not an attrset"],
    "operator": createFunc(/*arg:*/ "x", null, {}, (nixScope) => []),
  },
);
