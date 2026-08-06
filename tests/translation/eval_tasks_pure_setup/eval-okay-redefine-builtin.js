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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-redefine-builtin.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "throw",
    (nixScope) => (apply(nixScope.abort, mkThunk(() => ("Error!")))),
  );
  return (apply(
    nixScope.builtins["tryEval"],
    mkThunk(
      () => ((nixScope.builtins.findFile(nixScope.builtins.nixPath))("foobaz"))
    ),
  ))["success"];
});
