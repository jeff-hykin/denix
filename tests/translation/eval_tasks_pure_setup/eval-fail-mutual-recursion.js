import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "throwAfterB",
    (nixScope) =>
      createFunc(/*arg:*/ "recurse", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.greaterThan(nixScope.n, 0n),
            () => (apply(
              apply(nixScope.throwAfterB, nixScope.recurse),
              operators.subtract(nixScope.n, 1n),
            )),
            () => (operators.ifThenElse(
              nixScope.recurse,
              () => (apply(apply(nixScope.throwAfterA, false), 10n)),
              () => (apply(nixScope.throw, "Uh oh!")),
            )),
          )
        ))
      )),
  );
  defGetter(
    nixScope,
    "throwAfterA",
    (nixScope) =>
      createFunc(/*arg:*/ "recurse", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.greaterThan(nixScope.n, 0n),
            () => (apply(
              apply(nixScope.throwAfterA, nixScope.recurse),
              operators.subtract(nixScope.n, 1n),
            )),
            () => (operators.ifThenElse(
              nixScope.recurse,
              () => (apply(apply(nixScope.throwAfterB, true), 10n)),
              () => (apply(nixScope.throw, "Uh oh!")),
            )),
          )
        ))
      )),
  );
  return apply(apply(nixScope.throwAfterA, true), 10n);
});
