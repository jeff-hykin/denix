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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-getattrpos-functionargs.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "fun",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "foo": false } },
      nixScope,
      (nixScope) => (
        {}
      ),
    )),
  );
  defGetter(
    nixScope,
    "pos",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("foo"))),
      mkThunk(
        () => (apply(
          nixScope.builtins["functionArgs"],
          mkThunk(() => (nixScope.fun)),
        ))
      ),
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
