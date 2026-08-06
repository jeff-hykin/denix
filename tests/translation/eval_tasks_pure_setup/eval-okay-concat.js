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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-concat.nix";
const operators = runtime.operators;

export default operators.listConcat(
  [1n, 2n, 3n],
  operators.listConcat([4n, 5n, 6n], [7n, 8n, 9n]),
);
