import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addDrvOutputDependencies-multi-elem-context.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "drv0",
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
  defGetter(
    nixScope,
    "drv1",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("fail-2"));
        defGetter(obj, "builder", () => ("/bin/false"));
        defGetter(obj, "system", () => ("x86_64-linux"));
        defGetter(obj, "outputs", () => ["out", "foo"]);
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "combo-path",
    (
      nixScope,
    ) => (new InterpolatedString(["", "", ""], [
      () => (nixScope.drv0["drvPath"]),
      () => (nixScope.drv1["drvPath"]),
    ])),
  );
  return apply(
    nixScope.builtins["addDrvOutputDependencies"],
    mkThunk(() => (nixScope["combo-path"])),
  );
});
