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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-foldlStrict.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(
        apply(
          nixScope.builtins["foldl'"],
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
                operators.add(nixScope.x, nixScope.y)
              ))
            )))
          ),
        ),
        mkThunk(() => (0n)),
      ),
      mkThunk(
        () => (apply(
          apply(nixScope.range, mkThunk(() => (1n))),
          mkThunk(() => (1000n)),
        ))
      ),
    );
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
