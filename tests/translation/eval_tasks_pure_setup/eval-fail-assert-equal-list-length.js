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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-equal-list-length.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "[\n    1\n    0\n  ] == [ 10 ]");
  }
  return apply(nixScope.throw, mkThunk(() => ("unreachable")));
})(operators.equal([1n, 0n], [10n]));
