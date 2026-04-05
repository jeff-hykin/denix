import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-new-let.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.arg = "xyzzy";
  defGetter(
    nixScope,
    "f",
    (nixScope) =>
      createFunc(/*arg:*/ "z", null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          nixScope.x = "foo";
          nixScope.y = "bar";
          nixScope.body = 1n;
          return operators.add(
            operators.add(nixScope.z, nixScope.x),
            nixScope.y,
          );
        })
      )),
  );
  return nixScope.f(nixScope.arg);
});
