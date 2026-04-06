import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.a = "xyzzy";
  nixScope.as = { "a": "foo", "b": "bar" };
  nixScope.bs = { "a": "bar" };
  defGetter(nixScope, "x", (nixScope) =>
    ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
      runtime.scopeStack.push(nixScope);
      try {
        return operators.add(nixScope.a, nixScope.b);
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.as));
  defGetter(nixScope, "y", (nixScope) =>
    ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
      runtime.scopeStack.push(nixScope);
      try {
        return ((_withAttrs) => {
          const nixScope = {
            ...runtime.scopeStack.slice(-1)[0],
            ..._withAttrs,
          };
          runtime.scopeStack.push(nixScope);
          try {
            return operators.add(nixScope.a, nixScope.b);
          } finally {
            runtime.scopeStack.pop();
          }
        })(nixScope.bs);
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.as));
  return operators.add(nixScope.x, nixScope.y);
});
