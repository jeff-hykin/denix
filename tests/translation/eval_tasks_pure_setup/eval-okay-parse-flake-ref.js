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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-parse-flake-ref.nix";

export default apply(
  nixScope.builtins["parseFlakeRef"],
  mkThunk(() => ("github:NixOS/nixpkgs/23.05?dir=lib")),
);
