import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-nested-list-items.nix";
const operators = runtime.operators;

export default //
//
//
//
//
//
//
//
//
operators.add(
  "",
  /*let*/ createScope((nixScope) => {
    nixScope.v = [[1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n], [1n, 2n, 3n, 4n]];
    return nixScope.builtins["deepSeq"](nixScope.v)(nixScope.v);
  }),
);
