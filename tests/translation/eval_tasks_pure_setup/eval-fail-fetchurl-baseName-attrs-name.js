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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-fetchurl-baseName-attrs-name.nix";

export default apply(
  nixScope.builtins["fetchurl"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "url", () => ("https://example.com/foo.tar.gz"));
    defGetter(obj, "name", () => ("~wobble~"));
    return obj;
  }))),
);
