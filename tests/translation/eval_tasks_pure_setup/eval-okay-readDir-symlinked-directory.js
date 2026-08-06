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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-readDir-symlinked-directory.nix";

export default apply(
  nixScope.builtins["readDir"],
  mkThunk(
    () => (new Path([
      "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/readDir/ldir",
    ], []))
  ),
);
