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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-partition.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(
        nixScope.builtins["partition"],
        mkThunk(
          () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            operators.equal(
              operators.multiply(operators.divide(nixScope.x, 2n), 2n),
              nixScope.x,
            )
          )))
        ),
      ),
      mkThunk(
        () => (apply(
          nixScope.builtins["concatLists"],
          mkThunk(
            () => [
              apply(
                apply(nixScope.range, mkThunk(() => (0n))),
                mkThunk(() => (10n)),
              ),
              apply(
                apply(nixScope.range, mkThunk(() => (100n))),
                mkThunk(() => (110n)),
              ),
            ]
          ),
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
