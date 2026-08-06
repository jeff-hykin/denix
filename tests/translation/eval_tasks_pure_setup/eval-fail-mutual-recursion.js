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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-mutual-recursion.nix";
const operators = runtime.operators;

export default //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "throwAfterB",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "recurse", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
        operators.ifThenElse(
          operators.greaterThan(nixScope.n, 0n),
          () => (apply(
            apply(nixScope.throwAfterB, mkThunk(() => (nixScope.recurse))),
            mkThunk(() => (operators.subtract(nixScope.n, 1n))),
          )),
          () => (operators.ifThenElse(
            nixScope.recurse,
            () => (apply(
              apply(nixScope.throwAfterA, mkThunk(() => (false))),
              mkThunk(() => (10n)),
            )),
            () => (apply(nixScope.throw, mkThunk(() => ("Uh oh!")))),
          )),
        )
      ))
    ))),
  );
  defGetter(
    nixScope,
    "throwAfterA",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "recurse", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
        operators.ifThenElse(
          operators.greaterThan(nixScope.n, 0n),
          () => (apply(
            apply(nixScope.throwAfterA, mkThunk(() => (nixScope.recurse))),
            mkThunk(() => (operators.subtract(nixScope.n, 1n))),
          )),
          () => (operators.ifThenElse(
            nixScope.recurse,
            () => (apply(
              apply(nixScope.throwAfterB, mkThunk(() => (true))),
              mkThunk(() => (10n)),
            )),
            () => (apply(nixScope.throw, mkThunk(() => ("Uh oh!")))),
          )),
        )
      ))
    ))),
  );
  return apply(
    apply(nixScope.throwAfterA, mkThunk(() => (true))),
    mkThunk(() => (10n)),
  );
});
