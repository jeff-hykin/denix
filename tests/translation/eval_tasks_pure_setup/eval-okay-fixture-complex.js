import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
/*let*/ createScope((nixScope) => {
  nixScope.data = [1n, 2n, 3n, 4n, 5n];
  defGetter(
    nixScope,
    "helper",
    (nixScope) =>
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.multiply(nixScope.x, 2n)
      )),
  );
  return ({
    "doubled": apply(
      apply(nixScope.builtins["map"], nixScope.helper),
      nixScope.data,
    ),
    "sum": apply(
      apply(apply(nixScope.builtins["foldl'"], nixScope.builtins["add"]), 0n),
      nixScope.data,
    ),
  });
});
