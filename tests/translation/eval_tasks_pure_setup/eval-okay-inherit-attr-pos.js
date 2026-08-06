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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-inherit-attr-pos.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "d", (nixScope) => (0n));
  defGetter(nixScope, "x", (nixScope) => (1n));
  defGetter(nixScope, "y", (nixScope) => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "d", () => (nixScope.d));
    defGetter(obj, "x", () => (nixScope.x));
    return obj;
  })));
  defGetter(nixScope, "z", (nixScope) => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "d", () => (nixScope.y.d));
    defGetter(obj, "x", () => (nixScope.y.x));
    return obj;
  })));
  return [
    apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("d"))),
      mkThunk(() => (nixScope.y)),
    ),
    apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("x"))),
      mkThunk(() => (nixScope.y)),
    ),
    apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("d"))),
      mkThunk(() => (nixScope.z)),
    ),
    apply(
      apply(nixScope.builtins["unsafeGetAttrPos"], mkThunk(() => ("x"))),
      mkThunk(() => (nixScope.z)),
    ),
  ];
});
