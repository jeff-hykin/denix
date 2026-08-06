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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-deepseq-list-attr.nix";

export default //
apply(
  apply(
    nixScope.builtins["deepSeq"],
    mkThunk(() => [
      1n,
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => (2n));
        defGetter(
          obj,
          "b",
          () => (apply(
            nixScope.throw,
            mkThunk(() => ("error in attr in list element")),
          )),
        );
        return obj;
      }),
      3n,
    ]),
  ),
  mkThunk(() => ("unexpected success")),
);
