import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-overrides.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.overrides = { "a": 2n, "b": 3n };
  return (/*rec*/ createScope((nixScope) => {
    nixScope.a = 1n;
    defGetter(nixScope, "__overrides", (nixScope) => nixScope.overrides);
    defGetter(nixScope, "x", (nixScope) => nixScope.a);
    return nixScope;
  }))["x"];
});
