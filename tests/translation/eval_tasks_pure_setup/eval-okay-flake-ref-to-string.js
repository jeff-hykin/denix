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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-flake-ref-to-string.nix";

export default apply(
  nixScope.builtins["flakeRefToString"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "type", () => ("github"));
    defGetter(obj, "owner", () => ("NixOS"));
    defGetter(obj, "repo", () => ("nixpkgs"));
    defGetter(obj, "ref", () => ("23.05"));
    defGetter(obj, "dir", () => ("lib"));
    return obj;
  }))),
);
