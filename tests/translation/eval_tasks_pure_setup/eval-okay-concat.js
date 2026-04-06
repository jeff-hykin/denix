import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default operators.listConcat(
  [1n, 2n, 3n],
  operators.listConcat([4n, 5n, 6n], [7n, 8n, 9n]),
);
