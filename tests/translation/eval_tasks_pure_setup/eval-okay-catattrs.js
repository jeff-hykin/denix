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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-catattrs.nix";

export default apply(
  apply(nixScope.builtins["catAttrs"], mkThunk(() => ("a"))),
  mkThunk(() => [
    createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "a", () => (1n));
      return obj;
    }),
    createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "b", () => (0n));
      return obj;
    }),
    createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "a", () => (2n));
      return obj;
    }),
  ]),
);
