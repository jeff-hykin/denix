import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "lst",
    (nixScope) =>
      nixScope.builtins["foldl'"](
        createFunc(/*arg:*/ "acc", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.listConcat(nixScope.acc, [nixScope.x])
          ))
        )),
      )([])([42n, nixScope.throw("this shouldn't be evaluated")]),
  );
  return nixScope.builtins["head"](nixScope.lst);
});
