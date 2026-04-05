import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addDrvOutputDependencies-multi-elem-context.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope["combo-path"] = new InterpolatedString(["", "", ""], [
    () => (nixScope.drv0["drvPath"]),
    () => (nixScope.drv1["drvPath"]),
  ]);
  defGetter(
    nixScope,
    "drv0",
    (nixScope) =>
      nixScope.derivation(
        {
          "name": "fail",
          "builder": "/bin/false",
          "system": "x86_64-linux",
          "outputs": ["out", "foo"],
        },
      ),
  );
  defGetter(
    nixScope,
    "drv1",
    (nixScope) =>
      nixScope.derivation(
        {
          "name": "fail-2",
          "builder": "/bin/false",
          "system": "x86_64-linux",
          "outputs": ["out", "foo"],
        },
      ),
  );
  return nixScope.builtins["addDrvOutputDependencies"](nixScope["combo-path"]);
});
