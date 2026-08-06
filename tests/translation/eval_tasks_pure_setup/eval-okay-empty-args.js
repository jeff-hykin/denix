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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-empty-args.nix";

export default apply(
  apply(
    createFunc({}, null, { args: {} }, nixScope, (nixScope) => (
      createFunc(
        {},
        null,
        { args: { "x": false, "y": false } },
        nixScope,
        (nixScope) => (
          new InterpolatedString(["", "", ""], [
            () => (nixScope.x),
            () => (nixScope.y),
          ])
        ),
      )
    )),
    mkThunk(() => ({})),
  ),
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "x", () => ("a"));
    defGetter(obj, "y", () => ("b"));
    return obj;
  }))),
);
