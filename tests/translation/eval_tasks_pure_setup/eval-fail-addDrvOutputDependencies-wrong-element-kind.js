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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addDrvOutputDependencies-wrong-element-kind.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "drv",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("fail"));
        defGetter(obj, "builder", () => ("/bin/false"));
        defGetter(obj, "system", () => ("x86_64-linux"));
        defGetter(obj, "outputs", () => ["out", "foo"]);
        return obj;
      }))),
    )),
  );
  return apply(
    nixScope.builtins["addDrvOutputDependencies"],
    mkThunk(() => (nixScope.drv["outPath"])),
  );
});
