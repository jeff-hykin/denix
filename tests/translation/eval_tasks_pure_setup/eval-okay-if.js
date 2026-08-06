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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-if.nix";
const operators = runtime.operators;

export default (operators.ifThenElse(
  operators.notEqual("foo", operators.add("f", "oo")),
  () => (1n),
  () => (operators.ifThenElse(false, () => (2n), () => (3n))),
));
