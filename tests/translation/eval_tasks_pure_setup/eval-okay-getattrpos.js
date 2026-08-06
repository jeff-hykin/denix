import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-getattrpos.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "as", (nixScope) => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "foo", () => ("bar"));
    return obj;
  })));
  defGetter(
    nixScope,
    "pos",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("foo"))),
      mkThunk(() => (nixScope.as)),
    )),
  );
  return createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "column", () => (nixScope.pos.column));
    defGetter(obj, "line", () => (nixScope.pos.line));
    defGetter(
      obj,
      "file",
      () => (apply(nixScope.baseNameOf, mkThunk(() => (nixScope.pos["file"])))),
    );
    return obj;
  });
});
