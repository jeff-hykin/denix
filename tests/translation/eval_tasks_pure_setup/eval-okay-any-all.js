import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-any-all.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      nixScope.any(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([]),
      nixScope.any(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([2n, 3n, 4n]),
      nixScope.any(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([1n, 2n, 3n, 4n]),
      nixScope.any(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([4n, 3n, 2n, 1n]),
      nixScope.all(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([]),
      nixScope.all(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([1n]),
      nixScope.all(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([1n, 2n, 3n]),
      nixScope.all(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.equal(nixScope.x, 1n)
      )))([1n, 1n, 1n]),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
