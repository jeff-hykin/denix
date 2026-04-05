import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-inherit-attr-pos.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.d = 0n;
  nixScope.x = 1n;
  nixScope.y = { "d": nixScope.d, "x": nixScope.x };
  nixScope.z = createScope((nixScope) => {
    const obj = {};
    obj.d = nixScope.y.d;
    obj.x = nixScope.y.x;
    return obj;
  });
  return [
    nixScope.builtins["unsafeGetAttrPos"]("d")(nixScope.y),
    nixScope.builtins["unsafeGetAttrPos"]("x")(nixScope.y),
    nixScope.builtins["unsafeGetAttrPos"]("d")(nixScope.z),
    nixScope.builtins["unsafeGetAttrPos"]("x")(nixScope.z),
  ];
});
