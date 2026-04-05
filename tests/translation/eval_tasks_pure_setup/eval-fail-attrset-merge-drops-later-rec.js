import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-attrset-merge-drops-later-rec.nix";
const operators = runtime.operators;

export default createScope((nixScope) => {
  const obj = {};
  obj.a = /*rec*/ createScope((nixScope) => {
    nixScope.d = 3n;
    defGetter(nixScope, "c", (nixScope) => operators.add(nixScope.d, 2n));
    return nixScope;
  });
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"]["b"] = 1n;
  return obj;
})["c"];
