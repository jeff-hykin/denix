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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-genericClosure-operator-not-list.nix";

export default apply(
  nixScope.builtins["genericClosure"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "startSet", () => [createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "key", () => (1n));
      return obj;
    })]);
    defGetter(
      obj,
      "operator",
      () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
        "not a list"
      ))),
    );
    return obj;
  }))),
);
