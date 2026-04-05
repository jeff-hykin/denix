import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-equal-function-direct.nix";
const operators = runtime.operators;

export default //
//
((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "(x: x) == (x: x)");
  }
  return nixScope.abort("unreachable");
})(operators.equal(
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    nixScope.x
  )),
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    nixScope.x
  )),
));
