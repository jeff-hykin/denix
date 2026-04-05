import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-duplicate-traces.nix";
const operators = runtime.operators;

export default //
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "throwAfter",
    (nixScope) =>
      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
        operators.ifThenElse(
          operators.greaterThan(nixScope.n, 0n),
          () => (nixScope.throwAfter(operators.subtract(nixScope.n, 1n))),
          () => (nixScope.throw("Uh oh!")),
        )
      )),
  );
  return nixScope.throwAfter(2n);
});
