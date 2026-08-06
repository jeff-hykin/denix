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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-mapattrs.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(
        nixScope.builtins["mapAttrs"],
        mkThunk(
          () => (createFunc(/*arg:*/ "name", null, {}, nixScope, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, nixScope, (nixScope) => (
              operators.add(operators.add(nixScope.name, "-"), nixScope.value)
            ))
          )))
        ),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "x", () => ("foo"));
        defGetter(obj, "y", () => ("bar"));
        return obj;
      }))),
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
