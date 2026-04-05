import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-equal-function-attrset-identical.nix";
const operators = runtime.operators;

export default //
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "f",
    (nixScope) =>
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      )),
  );
  return operators.equal({ "a": nixScope.f }, { "a": nixScope.f });
});
