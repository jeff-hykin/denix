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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-toxml.nix";

export default //
//
apply(
  nixScope.builtins["toXML"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => ("s"));
    return obj;
  }))),
);
