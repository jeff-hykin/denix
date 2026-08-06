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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-elem.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "xs",
        (
          nixScope,
        ) => (apply(
          apply(nixScope.range, mkThunk(() => (10n))),
          mkThunk(() => (40n)),
        )),
      );
      return [
        apply(
          apply(nixScope.builtins["elem"], mkThunk(() => (23n))),
          mkThunk(() => (nixScope.xs)),
        ),
        apply(
          apply(nixScope.builtins["elem"], mkThunk(() => (42n))),
          mkThunk(() => (nixScope.xs)),
        ),
        apply(
          apply(nixScope.builtins["elemAt"], mkThunk(() => (nixScope.xs))),
          mkThunk(() => (20n)),
        ),
      ];
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(
  runtime.withScope(
    nixScope,
    () => (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
        ], []))
      ),
    )),
  ),
);
