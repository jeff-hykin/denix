import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "foo",
    (nixScope) =>
      apply(
        apply(apply(nixScope.builtins["trace"], "throwing"), nixScope.throw),
        "nope",
      ),
  );
  return apply(
    apply(
      apply(
        apply(
          nixScope.builtins["seq"],
          (apply(nixScope.builtins["tryEval"], nixScope.foo))["success"],
        ),
        nixScope.builtins["seq"],
      ),
      (apply(nixScope.builtins["tryEval"], nixScope.foo))["success"],
    ),
    "done",
  );
});
