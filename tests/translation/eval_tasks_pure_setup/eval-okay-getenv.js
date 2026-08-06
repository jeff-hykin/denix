import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-getenv.nix";
const operators = runtime.operators;

export default operators.add(
  apply(nixScope.builtins["getEnv"], mkThunk(() => ("TEST_VAR"))),
  operators.ifThenElse(
    operators.equal(
      apply(nixScope.builtins["getEnv"], mkThunk(() => ("NO_SUCH_VAR"))),
      "",
    ),
    () => ("bar"),
    () => ("bla"),
  ),
);
