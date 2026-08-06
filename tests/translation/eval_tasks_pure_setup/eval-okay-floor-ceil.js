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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-floor-ceil.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "n1",
        (
          nixScope,
        ) => (apply(nixScope.builtins["floor"], mkThunk(() => (23.5)))),
      );
      defGetter(
        nixScope,
        "n2",
        (nixScope) => (apply(nixScope.builtins["ceil"], mkThunk(() => (23.5)))),
      );
      defGetter(
        nixScope,
        "n3",
        (nixScope) => (apply(nixScope.builtins["floor"], mkThunk(() => (23n)))),
      );
      defGetter(
        nixScope,
        "n4",
        (nixScope) => (apply(nixScope.builtins["ceil"], mkThunk(() => (23n)))),
      );
      return apply(
        apply(nixScope.builtins["concatStringsSep"], mkThunk(() => (";"))),
        mkThunk(
          () => (apply(
            apply(nixScope.map, mkThunk(() => (nixScope.toString))),
            mkThunk(() => [nixScope.n1, nixScope.n2, nixScope.n3, nixScope.n4]),
          ))
        ),
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
