import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "throwAfter",
    (nixScope) =>
      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
        operators.ifThenElse(
          operators.greaterThan(nixScope.n, 0n),
          () => (apply(
            nixScope.throwAfter,
            operators.subtract(nixScope.n, 1n),
          )),
          () => (apply(nixScope.throw, "Uh oh!")),
        )
      )),
  );
  return apply(nixScope.throwAfter, 2n);
});
