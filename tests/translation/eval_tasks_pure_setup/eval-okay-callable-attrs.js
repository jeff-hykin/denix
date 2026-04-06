import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default (operators.merge(
  {
    "__functor": createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.and(nixScope.self["foo"], nixScope.x)
      ))
    )),
    "foo": false,
  },
  { "foo": true },
))(true);
