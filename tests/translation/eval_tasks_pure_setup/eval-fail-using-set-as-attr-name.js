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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-using-set-as-attr-name.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "attr",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "foo", () => ("bar"));
      return obj;
    })),
  );
  defGetter(nixScope, "key", (nixScope) => ({}));
  return nixScope.attr[nixScope.key];
});
