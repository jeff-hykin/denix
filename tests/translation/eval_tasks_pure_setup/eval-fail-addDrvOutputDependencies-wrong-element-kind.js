import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "drv",
    (nixScope) =>
      apply(
        nixScope.derivation,
        {
          "name": "fail",
          "builder": "/bin/false",
          "system": "x86_64-linux",
          "outputs": ["out", "foo"],
        },
      ),
  );
  return apply(
    nixScope.builtins["addDrvOutputDependencies"],
    nixScope.drv["outPath"],
  );
});
