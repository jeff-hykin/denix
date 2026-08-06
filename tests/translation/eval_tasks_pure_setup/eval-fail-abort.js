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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-abort.nix";
const operators = runtime.operators;

export default (operators.ifThenElse(
  true,
  () => (apply(nixScope.abort, mkThunk(() => ("this should fail")))),
  () => (1n),
));
