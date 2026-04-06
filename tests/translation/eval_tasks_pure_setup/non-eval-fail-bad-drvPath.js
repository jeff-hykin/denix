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
  defGetter(nixScope, "package", (nixScope) => ({
    "type": "derivation",
    "name": "cachix-1.7.3",
    "system": nixScope.builtins["currentSystem"],
    "outputs": ["out"],
    "drvPath": new InterpolatedString([
      "",
      "/2chwzswhhmpxbgc981i2vcz7xj4d1in9-cachix-1.7.3-bin",
    ], [() => (nixScope.builtins["storeDir"])]),
    "outputName": "out",
    "outPath": new InterpolatedString([
      "",
      "/2chwzswhhmpxbgc981i2vcz7xj4d1in9-cachix-1.7.3-bin",
    ], [() => (nixScope.builtins["storeDir"])]),
    "out": nixScope.package,
  }));
  return nixScope.package;
});
