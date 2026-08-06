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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-print.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(nixScope.trace, mkThunk(() => [operators.add(1n, 1n)])),
      mkThunk(
        () => [
          null,
          nixScope.toString,
          apply(nixScope.deepSeq, mkThunk(() => ("x"))),
          createFunc(/*arg:*/ "a", null, {}, nixScope, (nixScope) => (
            nixScope.a
          )),
          /*let*/ createScope(nixScope, (nixScope) => {
            defGetter(nixScope, "x", (nixScope) => [nixScope.x]);
            return nixScope.x;
          }),
        ]
      ),
    );
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
