import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addDrvOutputDependencies-wrong-element-kind.nix";

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "drv",
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
  return nixScope.builtins["addDrvOutputDependencies"](nixScope.drv["outPath"]);
});
