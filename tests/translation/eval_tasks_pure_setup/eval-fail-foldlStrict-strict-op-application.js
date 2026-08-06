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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-foldlStrict-strict-op-application.nix";

export default //
apply(
  apply(
    apply(
      nixScope.builtins["foldl'"],
      mkThunk(
        () => (createFunc(/*arg:*/ "_", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "f", null, {}, nixScope, (nixScope) => (
            apply(nixScope.f, mkThunk(() => (null)))
          ))
        )))
      ),
    ),
    mkThunk(() => (null)),
  ),
  mkThunk(() => [
    createFunc(/*arg:*/ "_", null, {}, nixScope, (nixScope) => (
      apply(
        nixScope.throw,
        mkThunk(() => ("Not the final value, but is still forced!")),
      )
    )),
    createFunc(/*arg:*/ "_", null, {}, nixScope, (nixScope) => (
      23n
    )),
  ]),
);
