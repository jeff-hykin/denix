import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + "builtins ? currentSystem");
  }
  return ((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + "!builtins ? __currentSystem");
    }
    return /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "x",
        (
          nixScope,
        ) => (operators.ifThenElse(
          operators.hasAttr(nixScope.builtins, "dirOf"),
          () => (nixScope.builtins["dirOf"](new Path(["/foo/bar"], []))),
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
          () => (nixScope.builtins["fnord"]("foo")),
          () => (""),
        )),
      );
      return operators.add(nixScope.x, nixScope.y);
    });
  })(operators.negate(operators.hasAttr(nixScope.builtins, "__currentSystem")));
})(operators.hasAttr(nixScope.builtins, "currentSystem"));
