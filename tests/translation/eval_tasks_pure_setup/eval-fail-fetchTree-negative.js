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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-fetchTree-negative.nix";

export default apply(
  nixScope.builtins["fetchTree"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "type", () => ("file"));
    defGetter(obj, "url", () => ("file://eval-fail-fetchTree-negative.nix"));
    defGetter(obj, "owner", () => (-1n));
    return obj;
  }))),
);
