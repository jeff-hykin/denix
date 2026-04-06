import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

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
    apply(apply(nixScope.builtins["unsafeGetAttrPos"], "d"), nixScope.y),
    apply(apply(nixScope.builtins["unsafeGetAttrPos"], "x"), nixScope.y),
    apply(apply(nixScope.builtins["unsafeGetAttrPos"], "d"), nixScope.z),
    apply(apply(nixScope.builtins["unsafeGetAttrPos"], "x"), nixScope.z),
  ];
});
