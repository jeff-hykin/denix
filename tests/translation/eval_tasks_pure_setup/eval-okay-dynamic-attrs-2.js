import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-dynamic-attrs-2.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  set(
    obj,
    ["a", new InterpolatedString(["", ""], [() => ("b")])],
    () => (true),
  );
  set(
    obj,
    ["a", new InterpolatedString(["", ""], [() => ("c")])],
    () => (false),
  );
  return obj;
})["a"]["b"];
