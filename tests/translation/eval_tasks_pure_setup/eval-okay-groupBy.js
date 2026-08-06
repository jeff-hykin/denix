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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-groupBy.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(
        nixScope.builtins["groupBy"],
        mkThunk(
          () => (createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
            apply(
              apply(
                apply(nixScope.builtins["substring"], mkThunk(() => (0n))),
                mkThunk(() => (1n)),
              ),
              mkThunk(
                () => (apply(
                  apply(
                    nixScope.builtins["hashString"],
                    mkThunk(() => ("sha256")),
                  ),
                  mkThunk(
                    () => (apply(
                      nixScope.toString,
                      mkThunk(() => (nixScope.n)),
                    ))
                  ),
                ))
              ),
            )
          )))
        ),
      ),
      mkThunk(
        () => (apply(
          apply(nixScope.range, mkThunk(() => (0n))),
          mkThunk(() => (31n)),
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
