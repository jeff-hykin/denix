import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.A = "a";
  nixScope.Z = "z";
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
    nixScope.builtins["hasAttr"](nixScope.A)(nixScope.as),
    () => (nixScope.builtins["getAttr"](nixScope.A)(nixScope.as)),
    () => (((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + "builtins.hasAttr Z as");
      }
      return nixScope.builtins["getAttr"](nixScope.Z)(nixScope.as);
    })(nixScope.builtins["hasAttr"](nixScope.Z)(nixScope.as))),
  ));
});
