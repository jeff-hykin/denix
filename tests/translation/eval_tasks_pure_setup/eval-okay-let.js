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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-let.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.x = "foo";
  nixScope.y = "bar";
  return operators.add(nixScope.x, nixScope.y);
});
