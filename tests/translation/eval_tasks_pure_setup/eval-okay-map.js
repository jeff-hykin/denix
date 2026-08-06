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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-map.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      nixScope.concat,
      mkThunk(
        () => (apply(
          apply(
            nixScope.map,
            mkThunk(
              () => (createFunc(
                /*arg:*/ "x",
                null,
                {},
                nixScope,
                (nixScope) => (
                  operators.add(nixScope.x, "bar")
                ),
              ))
            ),
          ),
          mkThunk(() => ["foo", "bla", "xyzzy"]),
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
