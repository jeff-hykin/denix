import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-dynamic-attrs-2.nix";

export default createScope((nixScope) => {
  const obj = {};
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"][new InterpolatedString(["", ""], [() => ("b")])] = true;
  if (obj["a"] === undefined) obj["a"] = {};
  obj["a"][new InterpolatedString(["", ""], [() => ("c")])] = false;
  return obj;
})["a"]["b"];
