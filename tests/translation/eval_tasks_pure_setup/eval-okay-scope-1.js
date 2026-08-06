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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-scope-1.nix";

export default (apply(
  apply(
    createFunc({}, null, { args: { "x": false } }, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (1n));
          defGetter(obj, "y", () => (nixScope.x));
          return obj;
        })
      ))
    )),
    mkThunk(() => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "x", () => (2n));
      return obj;
    }))),
  ),
  mkThunk(() => (3n)),
))["y"];
