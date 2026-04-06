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
    "x",
    (nixScope) =>
      createFunc(/*arg:*/ "arg", null, {}, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'arg == "y"');
          }
          return 123n;
        })(operators.equal(nixScope.arg, "y"))
      )),
  );
  return apply(nixScope.x, "x");
});
