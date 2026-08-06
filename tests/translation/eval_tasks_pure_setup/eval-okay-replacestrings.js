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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-replacestrings.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["o"])),
          mkThunk(() => ["a"]),
        ),
        mkThunk(() => ("foobar")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["o"])),
          mkThunk(() => [""]),
        ),
        mkThunk(() => ("foobar")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["oo"])),
          mkThunk(() => ["u"]),
        ),
        mkThunk(() => ("foobar")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["oo", "a"])),
          mkThunk(() => ["a", "oo"]),
        ),
        mkThunk(() => ("foobar")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["oo", "oo"])),
          mkThunk(() => ["u", "i"]),
        ),
        mkThunk(() => ("foobar")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => [""])),
          mkThunk(() => ["X"]),
        ),
        mkThunk(() => ("abc")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => [""])),
          mkThunk(() => ["X"]),
        ),
        mkThunk(() => ("")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["-"])),
          mkThunk(() => ["_"]),
        ),
        mkThunk(() => ("a-b")),
      ),
      apply(
        apply(
          apply(nixScope.replaceStrings, mkThunk(() => ["oo", "XX"])),
          mkThunk(
            () => ["u", apply(nixScope.throw, mkThunk(() => ("unreachable")))]
          ),
        ),
        mkThunk(() => ("foobar")),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
