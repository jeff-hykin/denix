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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-readDir-nonexistent-2.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(
    obj,
    "relativePath",
    () => (apply(
      nixScope.builtins["readDir"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/this/path/really/should/not/exist",
        ], []))
      ),
    )),
  );
  return obj;
});
