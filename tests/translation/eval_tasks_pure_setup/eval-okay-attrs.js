import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "as",
    (nixScope) =>
      operators.merge(
        { "x": 123n, "y": 456n },
        operators.merge({ "z": 789n }, { "z": 987n }),
      ),
  );
  return (operators.ifThenElse(
    operators.hasAttr(nixScope.as, "a"),
    () => (nixScope.as["a"]),
    () => (((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + "as ? z");
      }
      return nixScope.as["z"];
    })(operators.hasAttr(nixScope.as, "z"))),
  ));
});
