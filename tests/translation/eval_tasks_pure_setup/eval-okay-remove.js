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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-remove.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.attrs = createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "x", () => (123n));
    defGetter(obj, "y", () => (456n));
    return obj;
  });
  return (apply(
    apply(nixScope.removeAttrs, mkThunk(() => (nixScope.attrs))),
    mkThunk(() => ["x"]),
  ))["y"];
});
