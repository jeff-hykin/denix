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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-flatten.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      nixScope.l = ["1", "2", ["3", ["4"], ["5", "6"]], "7"];
      return apply(
        nixScope.concat,
        mkThunk(() => (apply(nixScope.flatten, mkThunk(() => (nixScope.l))))),
      );
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
