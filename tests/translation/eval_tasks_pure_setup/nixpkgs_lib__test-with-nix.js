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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/nixpkgs_lib__test-with-nix.nix";

export default apply(
  nixScope.import,
  mkThunk(
    () => (new Path([
      "/Users/jeffhykin/repos/denix/tests/translation/source_code/nixpkgs_lib/lib/tests/test-with-nix.nix",
    ], []))
  ),
);
