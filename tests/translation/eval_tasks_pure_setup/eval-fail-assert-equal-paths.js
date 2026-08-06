import {
  createRuntime,
  Path,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-equal-paths.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "./foo == ./bar");
  }
  return apply(nixScope.throw, mkThunk(() => ("unreachable")));
})(
  operators.equal(
    new Path([
      "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/foo",
    ], []),
    new Path([
      "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/bar",
    ], []),
  ),
);
