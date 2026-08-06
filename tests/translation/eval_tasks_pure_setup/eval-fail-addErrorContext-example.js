import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-addErrorContext-example.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "countDown",
    (nixScope) => (createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
      operators.ifThenElse(
        operators.equal(nixScope.n, 0n),
        () => (apply(nixScope.throw, mkThunk(() => ("kaboom")))),
        () => (apply(
          apply(
            nixScope.builtins["addErrorContext"],
            mkThunk(
              () => (new InterpolatedString(["while counting down; n = ", ""], [
                () => (apply(nixScope.toString, mkThunk(() => (nixScope.n)))),
              ]))
            ),
          ),
          mkThunk(
            () => (operators.add(
              "x",
              apply(
                nixScope.countDown,
                mkThunk(() => (operators.subtract(nixScope.n, 1n))),
              ),
            ))
          ),
        )),
      )
    ))),
  );
  return apply(nixScope.countDown, mkThunk(() => (10n)));
});
