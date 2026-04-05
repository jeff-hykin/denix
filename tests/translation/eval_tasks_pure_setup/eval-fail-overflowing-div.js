import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-overflowing-div.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "intMin",
    (nixScope) => operators.subtract(-9223372036854775807n, 1n),
  );
  defGetter(nixScope, "b", (nixScope) => -1n);
  return nixScope.builtins["seq"](nixScope.intMin)(
    nixScope.builtins["seq"](nixScope.b)(
      operators.divide(nixScope.intMin, nixScope.b),
    ),
  );
});
