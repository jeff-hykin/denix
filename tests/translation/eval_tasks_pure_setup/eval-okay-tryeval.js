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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-tryeval.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(
    obj,
    "x",
    () => (apply(nixScope.builtins["tryEval"], mkThunk(() => ("x")))),
  );
  defGetter(
    obj,
    "y",
    () => (apply(
      nixScope.builtins["tryEval"],
      mkThunk(() => (((_cond) => {
        if (!_cond) {
          throw new Error("assertion failed: " + "false");
        }
        return "y";
      })(false))),
    )),
  );
  defGetter(
    obj,
    "z",
    () => (apply(
      nixScope.builtins["tryEval"],
      mkThunk(() => (apply(nixScope.throw, mkThunk(() => ("bla"))))),
    )),
  );
  return obj;
});
