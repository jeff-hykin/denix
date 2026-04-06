import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
nixScope.builtins["foldl'"](createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
    nixScope.f(null)
  ))
)))(null)([
  createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
    nixScope.throw("Not the final value, but is still forced!")
  )),
  createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
    23n
  )),
]);
