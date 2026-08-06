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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-with.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.a = "xyzzy";
  nixScope.as = createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => ("foo"));
    defGetter(obj, "b", () => ("bar"));
    return obj;
  });
  nixScope.bs = createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => ("bar"));
    return obj;
  });
  defGetter(nixScope, "x", (nixScope) =>
    ((nixScope) => {
      runtime.scopeStack.push(nixScope);
      try {
        return operators.add(nixScope.a, nixScope.b);
      } finally {
        runtime.scopeStack.pop();
      }
    })(runtime.withScope(nixScope, () => (nixScope.as))));
  defGetter(nixScope, "y", (nixScope) =>
    ((nixScope) => {
      runtime.scopeStack.push(nixScope);
      try {
        return ((nixScope) => {
          runtime.scopeStack.push(nixScope);
          try {
            return operators.add(nixScope.a, nixScope.b);
          } finally {
            runtime.scopeStack.pop();
          }
        })(runtime.withScope(nixScope, () => (nixScope.bs)));
      } finally {
        runtime.scopeStack.pop();
      }
    })(runtime.withScope(nixScope, () => (nixScope.as))));
  return operators.add(nixScope.x, nixScope.y);
});
