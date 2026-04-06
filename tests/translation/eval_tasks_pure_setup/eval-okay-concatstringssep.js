import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      nixScope.concatStringsSep("")([]),
      nixScope.concatStringsSep("")(["foo", "bar", "xyzzy"]),
      nixScope.concatStringsSep(", ")(["foo", "bar", "xyzzy"]),
      nixScope.concatStringsSep(", ")(["foo"]),
      nixScope.concatStringsSep(", ")([]),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
