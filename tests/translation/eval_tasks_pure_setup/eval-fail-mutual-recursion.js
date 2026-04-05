import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "throwAfterB",
    (nixScope) =>
      createFunc(/*arg:*/ "recurse", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.greaterThan(nixScope.n, 0n),
            () => (nixScope.throwAfterB(nixScope.recurse)(
              operators.subtract(nixScope.n, 1n),
            )),
            () => (operators.ifThenElse(
              nixScope.recurse,
              () => (nixScope.throwAfterA(false)(10n)),
              () => (nixScope.throw("Uh oh!")),
            )),
          )
        ))
      )),
  );
  defGetter(
    nixScope,
    "throwAfterA",
    (nixScope) =>
      createFunc(/*arg:*/ "recurse", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.greaterThan(nixScope.n, 0n),
            () => (nixScope.throwAfterA(nixScope.recurse)(
              operators.subtract(nixScope.n, 1n),
            )),
            () => (operators.ifThenElse(
              nixScope.recurse,
              () => (nixScope.throwAfterB(true)(10n)),
              () => (nixScope.throw("Uh oh!")),
            )),
          )
        ))
      )),
  );
  return nixScope.throwAfterA(true)(10n);
});
