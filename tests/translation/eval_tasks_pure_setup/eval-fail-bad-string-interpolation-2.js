import {
  createRuntime,
  InterpolatedString,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-bad-string-interpolation-2.nix";

export default (new InterpolatedString(["", ""], [
  () => (new Path([
    "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/fnord",
  ], [])),
]));
