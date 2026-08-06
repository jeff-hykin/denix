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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-deepseq.nix";

export default apply(
  apply(
    nixScope.builtins["deepSeq"],
    mkThunk(() => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "as",
        (nixScope) => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (123n));
          defGetter(obj, "y", () => (nixScope.as));
          return obj;
        })),
      );
      return nixScope.as;
    }))),
  ),
  mkThunk(() => (456n)),
);
