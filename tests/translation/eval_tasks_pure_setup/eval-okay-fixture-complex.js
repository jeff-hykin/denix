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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-fixture-complex.nix";
const operators = runtime.operators;

export default //
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "helper",
    (nixScope) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
      operators.multiply(nixScope.x, 2n)
    ))),
  );
  defGetter(nixScope, "data", (nixScope) => [1n, 2n, 3n, 4n, 5n]);
  return createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(
      obj,
      "doubled",
      () => (apply(
        apply(nixScope.builtins["map"], mkThunk(() => (nixScope.helper))),
        mkThunk(() => (nixScope.data)),
      )),
    );
    defGetter(
      obj,
      "sum",
      () => (apply(
        apply(
          apply(
            nixScope.builtins["foldl'"],
            mkThunk(() => (nixScope.builtins["add"])),
          ),
          mkThunk(() => (0n)),
        ),
        mkThunk(() => (nixScope.data)),
      )),
    );
    return obj;
  });
});
