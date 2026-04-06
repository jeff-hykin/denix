import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  nixScope["combo-path"] = new InterpolatedString(["", "", ""], [
    () => (nixScope.drv0["drvPath"]),
    () => (nixScope.drv1["drvPath"]),
  ]);
  defGetter(
    nixScope,
    "drv0",
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
  defGetter(
    nixScope,
    "drv1",
    (nixScope) =>
      apply(
        nixScope.derivation,
        {
          "name": "fail-2",
          "builder": "/bin/false",
          "system": "x86_64-linux",
          "outputs": ["out", "foo"],
        },
      ),
  );
  return apply(
    nixScope.builtins["addDrvOutputDependencies"],
    nixScope["combo-path"],
  );
});
