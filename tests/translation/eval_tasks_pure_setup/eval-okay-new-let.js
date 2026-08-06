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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-new-let.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "f",
    (nixScope) => (createFunc(/*arg:*/ "z", null, {}, nixScope, (nixScope) => (
      /*let*/ createScope(nixScope, (nixScope) => {
        defGetter(nixScope, "x", (nixScope) => ("foo"));
        defGetter(nixScope, "y", (nixScope) => ("bar"));
        defGetter(nixScope, "body", (nixScope) => (1n));
        return operators.add(operators.add(nixScope.z, nixScope.x), nixScope.y);
      })
    ))),
  );
  defGetter(nixScope, "arg", (nixScope) => ("xyzzy"));
  return apply(nixScope.f, mkThunk(() => (nixScope.arg)));
});
