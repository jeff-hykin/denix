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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-derivation-legacy.nix";

export default (apply(
  nixScope.builtins["derivationStrict"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "name", () => ("eval-okay-derivation-legacy"));
    defGetter(obj, "system", () => ("x86_64-linux"));
    defGetter(obj, "builder", () => ("/dontcare"));
    defGetter(obj, "__structuredAttrs", () => (true));
    defGetter(obj, "allowedReferences", () => []);
    defGetter(obj, "disallowedReferences", () => []);
    defGetter(obj, "allowedRequisites", () => []);
    defGetter(obj, "disallowedRequisites", () => []);
    defGetter(obj, "maxSize", () => (1234n));
    defGetter(obj, "maxClosureSize", () => (12345n));
    return obj;
  }))),
))["out"];
