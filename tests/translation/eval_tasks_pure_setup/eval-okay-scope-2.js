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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-scope-2.nix";

export default (apply(
  apply(
    createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
      createFunc({}, null, { args: { "x": false } }, nixScope, (nixScope) => (
        /*rec*/ createScope(nixScope, (nixScope) => {
          defGetter(nixScope, "x", (nixScope) => (1n));
          defGetter(nixScope, "y", (nixScope) => (nixScope.x));
          const __result = {};
          Object.defineProperty(__result, "x", {
            enumerable: true,
            configurable: true,
            get() {
              return nixScope.x;
            },
          });
          Object.defineProperty(__result, "y", {
            enumerable: true,
            configurable: true,
            get() {
              return nixScope.y;
            },
          });
          return __result;
        })
      ))
    )),
    mkThunk(() => (2n)),
  ),
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "x", () => (3n));
    return obj;
  }))),
))["y"];
