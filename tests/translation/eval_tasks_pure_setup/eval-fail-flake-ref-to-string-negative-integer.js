import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-flake-ref-to-string-negative-integer.nix";

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "n", (nixScope) => -1n);
  return nixScope.builtins["seq"](nixScope.n)(
    nixScope.builtins["flakeRefToString"](
      {
        "type": "github",
        "owner": "NixOS",
        "repo": nixScope.n,
        "ref": "23.05",
        "dir": "lib",
      },
    ),
  );
});
