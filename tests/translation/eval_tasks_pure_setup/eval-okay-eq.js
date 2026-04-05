import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-eq.nix";
const operators = runtime.operators;

export default operators.equal([
  "foobar",
  /*rec*/ createScope((nixScope) => {
    nixScope.x = 1n;
    defGetter(nixScope, "y", (nixScope) => nixScope.x);
    return nixScope;
  }),
], [operators.add("foo", "bar"), { "x": 1n, "y": 1n }]);
