import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  nixScope.as = { "foo": "bar" };
  defGetter(
    nixScope,
    "pos",
    (nixScope) => nixScope.builtins["unsafeGetAttrPos"]("foo")(nixScope.as),
  );
  return createScope((nixScope) => {
    const obj = {};
    obj.column = nixScope.pos.column;
    obj.line = nixScope.pos.line;
    obj.file = nixScope.baseNameOf(nixScope.pos["file"]);
    return obj;
  });
});
