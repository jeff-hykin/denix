import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(
        apply(
          nixScope.any,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [],
      ),
      apply(
        apply(
          nixScope.any,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [2n, 3n, 4n],
      ),
      apply(
        apply(
          nixScope.any,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [1n, 2n, 3n, 4n],
      ),
      apply(
        apply(
          nixScope.any,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [4n, 3n, 2n, 1n],
      ),
      apply(
        apply(
          nixScope.all,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [],
      ),
      apply(
        apply(
          nixScope.all,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [1n],
      ),
      apply(
        apply(
          nixScope.all,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [1n, 2n, 3n],
      ),
      apply(
        apply(
          nixScope.all,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.equal(nixScope.x, 1n)
          )),
        ),
        [1n, 1n, 1n],
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
