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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrs.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "as",
    (nixScope) =>
      operators.merge(
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (123n));
          defGetter(obj, "y", () => (456n));
          return obj;
        }),
        operators.merge(
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "z", () => (789n));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "z", () => (987n));
            return obj;
          }),
        ),
      ),
  );
  return (operators.ifThenElse(
    operators.hasAttr(nixScope.as, "a"),
    () => (nixScope.as["a"]),
    () => (((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + "as ? z");
      }
      return nixScope.as["z"];
    })(operators.hasAttr(nixScope.as, "z"))),
  ));
});
