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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-undeclared-arg.nix";
const operators = runtime.operators;

export default apply(
  createFunc(
    {},
    null,
    { args: { "x": false, "z": false } },
    nixScope,
    (nixScope) => (
      operators.add(nixScope.x, nixScope.z)
    ),
  ),
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "x", () => ("foo"));
    defGetter(obj, "y", () => ("bla"));
    defGetter(obj, "z", () => ("bar"));
    return obj;
  }))),
);
