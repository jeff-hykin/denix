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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-callable-attrs.nix";
const operators = runtime.operators;

export default apply(
  operators.merge(
    createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "__functor",
        () => (createFunc(/*arg:*/ "self", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            (nixScope.self["foo"]) && (nixScope.x)
          ))
        ))),
      );
      defGetter(obj, "foo", () => (false));
      return obj;
    }),
    createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "foo", () => (true));
      return obj;
    }),
  ),
  mkThunk(() => (true)),
);
