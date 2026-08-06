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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-scope-4.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.x = "a";
  nixScope.y = "b";
  defGetter(
    nixScope,
    "f",
    (nixScope) =>
      createFunc(
        { "x": (nixScope) => (nixScope.y), "y": (nixScope) => (nixScope.x) },
        null,
        { args: { "x": true, "y": true } },
        nixScope,
        (nixScope) => (
          operators.add(nixScope.x, nixScope.y)
        ),
      ),
  );
  return operators.add(
    apply(
      nixScope.f,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "x", () => ("c"));
        return obj;
      }))),
    ),
    apply(
      nixScope.f,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "y", () => ("d"));
        return obj;
      }))),
    ),
  );
});
