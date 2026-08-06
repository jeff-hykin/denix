import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-undeclared-arg-import.nix";

export default apply(
  apply(
    nixScope.import,
    mkThunk(
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/non-eval-trivial-lambda-formals.nix",
      ], []))
    ),
  ),
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => ("a"));
    defGetter(obj, "b", () => ("b"));
    return obj;
  }))),
);
