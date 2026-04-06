import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
//
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "long",
    (nixScope) =>
      nixScope.builtins["genList"](
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        )),
      )(100000n),
  );
  defGetter(
    nixScope,
    "reverseLinkedList",
    (nixScope) =>
      nixScope.builtins["foldl'"](
        createFunc(/*arg:*/ "tail", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "head", null, {}, (nixScope) => (
            { "head": nixScope.head, "tail": nixScope.tail }
          ))
        )),
      )(null)(nixScope.long),
  );
  return nixScope.builtins["deepSeq"](nixScope.reverseLinkedList)(
    nixScope.throw(
      "unexpected success; expected a controlled stack overflow instead",
    ),
  );
});
