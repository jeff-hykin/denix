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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "x",
    (nixScope) =>
      createFunc(/*arg:*/ "arg", null, {}, nixScope, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'arg == "y"');
          }
          return 123n;
        })(operators.equal(nixScope.arg, "y"))
      )),
  );
  return apply(nixScope.x, mkThunk(() => ("x")));
});
