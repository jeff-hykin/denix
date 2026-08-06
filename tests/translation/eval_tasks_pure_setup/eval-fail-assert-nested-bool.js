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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-nested-bool.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "{ a.b = [ { c.d = true");
  }
  return apply(nixScope.abort, mkThunk(() => ("unreachable")));
})(operators.equal(
  createScope(nixScope, (nixScope) => {
    const obj = {};
    set(obj, ["a", "b"], () => [createScope(nixScope, (nixScope) => {
      const obj = {};
      set(obj, ["c", "d"], () => (true));
      return obj;
    })]);
    return obj;
  }),
  createScope(nixScope, (nixScope) => {
    const obj = {};
    set(obj, ["a", "b"], () => [createScope(nixScope, (nixScope) => {
      const obj = {};
      set(obj, ["c", "d"], () => (false));
      return obj;
    })]);
    return obj;
  }),
));
