import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error(
      "assertion failed: " + '{\n    foo = {\n      type = "derivation"',
    );
  }
  return apply(nixScope.throw, "unreachable");
})(
  operators.equal(
    {
      "foo": {
        "type": "derivation",
        "outPath": "/nix/store/0",
        "ignored": apply(nixScope.abort, "not ignored"),
      },
    },
    {
      "foo": {
        "type": "derivation",
        "outPath": "/nix/store/1",
        "ignored": apply(nixScope.abort, "not ignored"),
      },
    },
  ),
);
