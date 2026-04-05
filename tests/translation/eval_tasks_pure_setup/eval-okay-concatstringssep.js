import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-concatstringssep.nix";

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
