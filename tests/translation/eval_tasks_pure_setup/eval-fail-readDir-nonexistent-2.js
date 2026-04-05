import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-readDir-nonexistent-2.nix";

export default ({
  "relativePath": nixScope.builtins["readDir"](
    new Path(["./this/path/really/should/not/exist"], []),
  ),
});
