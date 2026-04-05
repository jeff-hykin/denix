import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-getenv.nix";
const operators = runtime.operators;

export default operators.add(
  nixScope.builtins["getEnv"]("TEST_VAR"),
  operators.ifThenElse(
    operators.equal(nixScope.builtins["getEnv"]("NO_SUCH_VAR"), ""),
    () => ("bar"),
    () => ("bla"),
  ),
);
