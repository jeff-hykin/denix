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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-deepseq.nix";

export default apply(
  apply(
    nixScope.builtins["deepSeq"],
    mkThunk(() => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "x",
        () => (apply(nixScope.abort, mkThunk(() => ("foo")))),
      );
      return obj;
    }))),
  ),
  mkThunk(() => (456n)),
);
