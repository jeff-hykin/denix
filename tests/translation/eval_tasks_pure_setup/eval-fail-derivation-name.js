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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-derivation-name.nix";

export default apply(
  nixScope.derivation,
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "name", () => ("~jiggle~"));
    defGetter(obj, "system", () => ("some-system"));
    defGetter(obj, "builder", () => ("/dontcare"));
    return obj;
  }))),
);
