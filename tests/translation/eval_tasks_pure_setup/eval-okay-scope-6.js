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
    "f",
    (nixScope) =>
      createFunc(
        { "x": (nixScope) => (nixScope.y), "y": (nixScope) => (nixScope.x) },
        null,
        {},
        (nixScope) => (
          operators.add(nixScope.x, nixScope.y)
        ),
      ),
  );
  return operators.add(
    apply(nixScope.f, { "x": "c" }),
    apply(nixScope.f, { "y": "d" }),
  );
});
