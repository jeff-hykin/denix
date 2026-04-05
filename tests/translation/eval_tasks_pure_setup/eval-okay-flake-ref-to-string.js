import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-flake-ref-to-string.nix";

export default nixScope.builtins["flakeRefToString"](
  {
    "type": "github",
    "owner": "NixOS",
    "repo": "nixpkgs",
    "ref": "23.05",
    "dir": "lib",
  },
);
