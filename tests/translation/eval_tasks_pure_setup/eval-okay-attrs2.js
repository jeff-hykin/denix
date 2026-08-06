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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrs2.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.A = "a";
  nixScope.Z = "z";
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
    apply(
      apply(nixScope.builtins["hasAttr"], mkThunk(() => (nixScope.A))),
      mkThunk(() => (nixScope.as)),
    ),
    () => (apply(
      apply(nixScope.builtins["getAttr"], mkThunk(() => (nixScope.A))),
      mkThunk(() => (nixScope.as)),
    )),
    () => (((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + "builtins.hasAttr Z as");
      }
      return apply(
        apply(nixScope.builtins["getAttr"], mkThunk(() => (nixScope.Z))),
        mkThunk(() => (nixScope.as)),
      );
    })(
      apply(
        apply(nixScope.builtins["hasAttr"], mkThunk(() => (nixScope.Z))),
        mkThunk(() => (nixScope.as)),
      ),
    )),
  ));
});
