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
    return apply(apply(nixScope.trace, [operators.add(1n, 1n)]), [
      null,
      nixScope.toString,
      apply(nixScope.deepSeq, "x"),
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
