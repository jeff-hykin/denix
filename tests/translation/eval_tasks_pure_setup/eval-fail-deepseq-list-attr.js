import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-deepseq-list-attr.nix";

export default //
nixScope.builtins["deepSeq"]([
  1n,
  { "a": 2n, "b": nixScope.throw("error in attr in list element") },
  3n,
])("unexpected success");
