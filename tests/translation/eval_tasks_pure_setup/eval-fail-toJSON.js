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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-toJSON.nix";

export default apply(
  nixScope.builtins["toJSON"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    set(
      obj,
      ["a", "b"],
      () => [
        true,
        false,
        "it's a bird",
        createScope(nixScope, (nixScope) => {
          const obj = {};
          set(
            obj,
            ["c", "d"],
            () => (apply(nixScope.throw, mkThunk(() => ("hah no")))),
          );
          return obj;
        }),
      ],
    );
    return obj;
  }))),
);
