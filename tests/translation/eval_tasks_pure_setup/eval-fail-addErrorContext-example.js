import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addErrorContext-example.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "countDown",
    (nixScope) =>
      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
        operators.ifThenElse(
          operators.equal(nixScope.n, 0n),
          () => (nixScope.throw("kaboom")),
          () => (nixScope.builtins["addErrorContext"](
            new InterpolatedString(["while counting down; n = ", ""], [
              () => (nixScope.toString(nixScope.n)),
            ]),
          )(operators.add(
            "x",
            nixScope.countDown(operators.subtract(nixScope.n, 1n)),
          ))),
        )
      )),
  );
  return nixScope.countDown(10n);
});
