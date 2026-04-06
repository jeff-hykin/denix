import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
//
apply(
  apply(
    apply(
      nixScope.builtins["foldl'"],
      createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        ))
      )),
    ),
    apply(nixScope.throw, "This is never forced"),
  ),
  ["but the results of applying op are", 42n],
);
