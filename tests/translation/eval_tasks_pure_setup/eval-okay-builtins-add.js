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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-builtins-add.nix";
const operators = runtime.operators;

export default [
  apply(
    apply(nixScope.builtins["add"], mkThunk(() => (2n))),
    mkThunk(() => (3n)),
  ),
  apply(
    apply(nixScope.builtins["add"], mkThunk(() => (2n))),
    mkThunk(() => (2n)),
  ),
  apply(
    nixScope.builtins["typeOf"],
    mkThunk(
      () => (apply(
        apply(nixScope.builtins["add"], mkThunk(() => (2n))),
        mkThunk(() => (2n)),
      ))
    ),
  ),
  operators.add("t", "t"),
  apply(
    nixScope.builtins["typeOf"],
    mkThunk(
      () => (apply(
        apply(nixScope.builtins["add"], mkThunk(() => (2.0))),
        mkThunk(() => (2n)),
      ))
    ),
  ),
  apply(
    apply(nixScope.builtins["add"], mkThunk(() => (2.0))),
    mkThunk(() => (2n)),
  ),
];
