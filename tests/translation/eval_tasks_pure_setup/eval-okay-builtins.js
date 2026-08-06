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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-builtins.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "builtins ? currentSystem");
  }
  return ((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + "!builtins ? __currentSystem");
    }
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "x",
        (
          nixScope,
        ) => (operators.ifThenElse(
          operators.hasAttr(nixScope.builtins, "dirOf"),
          () => (apply(
            nixScope.builtins["dirOf"],
            mkThunk(() => (new Path(["/foo/bar"], []))),
          )),
          () => (""),
        )),
      );
      defGetter(
        nixScope,
        "y",
        (
          nixScope,
        ) => (operators.ifThenElse(
          operators.hasAttr(nixScope.builtins, "fnord"),
          () => (apply(nixScope.builtins["fnord"], mkThunk(() => ("foo")))),
          () => (""),
        )),
      );
      return operators.add(nixScope.x, nixScope.y);
    });
  })(operators.negate(operators.hasAttr(nixScope.builtins, "__currentSystem")));
})(operators.hasAttr(nixScope.builtins, "currentSystem"));
