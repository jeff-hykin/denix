import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "a", (nixScope) => nixScope.throw("nope"));
  defGetter(
    nixScope,
    "b",
    (nixScope) => nixScope.builtins["addErrorContext"]("forcing b")(nixScope.a),
  );
  defGetter(
    nixScope,
    "c",
    (nixScope) => nixScope.builtins["addErrorContext"]("forcing c")(nixScope.a),
  );
  defGetter(
    nixScope,
    "d",
    (nixScope) => nixScope.builtins["addErrorContext"]("forcing d")(nixScope.a),
  );
  return nixScope.builtins["seq"](nixScope.builtins["tryEval"](nixScope.b))(
    nixScope.builtins["seq"](nixScope.builtins["tryEval"](nixScope.c))(
      nixScope.d,
    ),
  );
});
