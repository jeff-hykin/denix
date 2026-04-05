import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-print.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return nixScope.trace([operators.add(1n, 1n)])([
      null,
      nixScope.toString,
      nixScope.deepSeq("x"),
      createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
        nixScope.a
      )),
      /*let*/ createScope((nixScope) => {
        defGetter(nixScope, "x", (nixScope) => [nixScope.x]);
        return nixScope.x;
      }),
    ]);
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
