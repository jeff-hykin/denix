import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-toxml2.nix";
const operators = runtime.operators;

export default nixScope.builtins["toXML"]([
  operators.add("a", "b"),
  10n,
  /*rec*/ createScope((nixScope) => {
    nixScope.x = "x";
    defGetter(nixScope, "y", (nixScope) => nixScope.x);
    return nixScope;
  }),
]);
