import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-undeclared-arg-import.nix";

export default nixScope.import(
  new Path(["../source_code/nix_lang/non-eval-trivial-lambda-formals.nix"], []),
)({ "a": "a", "b": "b" });
