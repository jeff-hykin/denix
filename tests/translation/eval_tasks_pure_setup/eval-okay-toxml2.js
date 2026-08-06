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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-toxml2.nix";
const operators = runtime.operators;

export default apply(
  nixScope.builtins["toXML"],
  mkThunk(
    () => [
      operators.add("a", "b"),
      10n,
      /*rec*/ createScope(nixScope, (nixScope) => {
        defGetter(nixScope, "x", (nixScope) => ("x"));
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
      }),
    ]
  ),
);
