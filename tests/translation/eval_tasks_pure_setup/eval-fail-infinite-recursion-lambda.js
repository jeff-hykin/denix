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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-infinite-recursion-lambda.nix";

export default apply(
  createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
    apply(nixScope.x, mkThunk(() => (nixScope.x)))
  )),
  mkThunk(() => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
    apply(nixScope.x, mkThunk(() => (nixScope.x)))
  )))),
);
