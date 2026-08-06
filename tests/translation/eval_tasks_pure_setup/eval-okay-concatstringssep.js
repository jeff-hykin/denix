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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-concatstringssep.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(
        apply(nixScope.concatStringsSep, mkThunk(() => (""))),
        mkThunk(() => []),
      ),
      apply(
        apply(nixScope.concatStringsSep, mkThunk(() => (""))),
        mkThunk(() => ["foo", "bar", "xyzzy"]),
      ),
      apply(
        apply(nixScope.concatStringsSep, mkThunk(() => (", "))),
        mkThunk(() => ["foo", "bar", "xyzzy"]),
      ),
      apply(
        apply(nixScope.concatStringsSep, mkThunk(() => (", "))),
        mkThunk(() => ["foo"]),
      ),
      apply(
        apply(nixScope.concatStringsSep, mkThunk(() => (", "))),
        mkThunk(() => []),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
