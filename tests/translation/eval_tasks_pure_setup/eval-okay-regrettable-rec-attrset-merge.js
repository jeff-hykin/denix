import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regrettable-rec-attrset-merge.nix";
const operators = runtime.operators;

export default //
//
createScope((nixScope) => {
  const obj = {};
  obj.a = /*rec*/ createScope((nixScope) => {
    nixScope.d = 2n;
    defGetter(nixScope, "b", (nixScope) => operators.add(nixScope.c, 1n));
    return nixScope;
  });
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"]["c"] = operators.add(nixScope.d, 3n);
  return obj;
})["a"]["b"];
