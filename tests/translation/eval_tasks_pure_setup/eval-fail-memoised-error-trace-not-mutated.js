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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-memoised-error-trace-not-mutated.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "a",
    (nixScope) => (apply(nixScope.throw, mkThunk(() => ("nope")))),
  );
  defGetter(
    nixScope,
    "b",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["addErrorContext"], mkThunk(() => ("forcing b"))),
      mkThunk(() => (nixScope.a)),
    )),
  );
  defGetter(
    nixScope,
    "c",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["addErrorContext"], mkThunk(() => ("forcing c"))),
      mkThunk(() => (nixScope.a)),
    )),
  );
  defGetter(
    nixScope,
    "d",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["addErrorContext"], mkThunk(() => ("forcing d"))),
      mkThunk(() => (nixScope.a)),
    )),
  );
  return apply(
    apply(
      nixScope.builtins["seq"],
      mkThunk(
        () => (apply(nixScope.builtins["tryEval"], mkThunk(() => (nixScope.b))))
      ),
    ),
    mkThunk(
      () => (apply(
        apply(
          nixScope.builtins["seq"],
          mkThunk(
            () => (apply(
              nixScope.builtins["tryEval"],
              mkThunk(() => (nixScope.c)),
            ))
          ),
        ),
        mkThunk(() => (nixScope.d)),
      ))
    ),
  );
});
