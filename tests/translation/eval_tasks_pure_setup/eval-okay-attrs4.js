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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrs4.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "as", (nixScope) => (createScope(nixScope, (nixScope) => {
    const obj = {};
    set(obj, ["x", "y", "z"], () => (123n));
    set(obj, ["a", "b", "c"], () => (456n));
    return obj;
  })));
  defGetter(nixScope, "bs", (nixScope) => (null));
  return [
    operators.hasAttr(nixScope.as, "x"),
    operators.hasAttr(nixScope.as, "y"),
    operators.hasAttrPath(nixScope.as, "x", "y", "z"),
    operators.hasAttrPath(nixScope.as, "x", "y", "z", "a"),
    operators.hasAttrPath(nixScope.as, "x", "y", "a"),
    operators.hasAttrPath(nixScope.as, "a", "b", "c"),
    operators.hasAttr(nixScope.bs, "x"),
    operators.hasAttrPath(nixScope.bs, "x", "y", "z"),
  ];
});
