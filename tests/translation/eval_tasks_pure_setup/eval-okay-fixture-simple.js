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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-fixture-simple.nix";

export default //
createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(obj, "foo", () => (42n));
  defGetter(obj, "bar", () => ("hello"));
  return obj;
});
