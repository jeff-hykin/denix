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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-substring.nix";

export default apply(
  apply(
    apply(
      nixScope.builtins["substring"],
      mkThunk(
        () => (apply(
          apply(nixScope.builtins["sub"], mkThunk(() => (0n))),
          mkThunk(() => (1n)),
        ))
      ),
    ),
    mkThunk(() => (1n)),
  ),
  mkThunk(() => ("x")),
);
