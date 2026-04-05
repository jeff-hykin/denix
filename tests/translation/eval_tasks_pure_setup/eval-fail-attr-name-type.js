import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-attr-name-type.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.attrs = createScope((nixScope) => {
    const obj = {};
    if (obj["puppy"] === undefined) obj["puppy"] = {};
    obj["puppy"]["doggy"] = {};
    return obj;
  });
  nixScope.key = 1n;
  return nixScope.attrs["puppy"][nixScope.key];
});
