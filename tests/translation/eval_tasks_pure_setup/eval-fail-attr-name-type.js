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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-attr-name-type.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "attrs",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      set(obj, ["puppy", "doggy"], () => ({}));
      return obj;
    })),
  );
  defGetter(nixScope, "key", (nixScope) => (1n));
  return nixScope.attrs["puppy"][nixScope.key];
});
