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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-flake-ref-to-string-negative-integer.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "n", (nixScope) => (-1n));
  return apply(
    apply(nixScope.builtins["seq"], mkThunk(() => (nixScope.n))),
    mkThunk(
      () => (apply(
        nixScope.builtins["flakeRefToString"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "type", () => ("github"));
          defGetter(obj, "owner", () => ("NixOS"));
          defGetter(obj, "repo", () => (nixScope.n));
          defGetter(obj, "ref", () => ("23.05"));
          defGetter(obj, "dir", () => ("lib"));
          return obj;
        }))),
      ))
    ),
  );
});
