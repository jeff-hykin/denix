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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-nested-with.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return ((nixScope) => {
      runtime.scopeStack.push(nixScope);
      try {
        return nixScope.x;
      } finally {
        runtime.scopeStack.pop();
      }
    })(runtime.withScope(nixScope, () => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "x", () => (2n));
      return obj;
    }))));
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(obj, "x", () => (1n));
  return obj;
}))));
