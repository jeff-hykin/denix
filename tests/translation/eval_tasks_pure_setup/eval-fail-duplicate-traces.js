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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-duplicate-traces.nix";
const operators = runtime.operators;

export default //
//
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "throwAfter",
    (nixScope) => (createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
      operators.ifThenElse(
        operators.greaterThan(nixScope.n, 0n),
        () => (apply(
          nixScope.throwAfter,
          mkThunk(() => (operators.subtract(nixScope.n, 1n))),
        )),
        () => (apply(nixScope.throw, mkThunk(() => ("Uh oh!")))),
      )
    ))),
  );
  return apply(nixScope.throwAfter, mkThunk(() => (2n)));
});
