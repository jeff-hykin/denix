import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "drvA1",
    (nixScope) =>
      apply(
        nixScope.derivation,
        { "name": "a", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvA2",
    (nixScope) =>
      apply(
        nixScope.derivation,
        { "name": "a", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvA3",
    (nixScope) =>
      operators.merge(
        apply(
          nixScope.derivation,
          { "name": "a", "builder": "/foo", "system": "i686-linux" },
        ),
        { "dummy": 1n },
      ),
  );
  defGetter(
    nixScope,
    "drvC1",
    (nixScope) =>
      apply(
        nixScope.derivation,
        { "name": "c", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvC2",
    (nixScope) =>
      apply(
        nixScope.derivation,
        { "name": "c", "builder": "/bar", "system": "i686-linux" },
      ),
  );
  return [
    operators.equal(nixScope.drvA1, nixScope.drvA1),
    operators.equal(nixScope.drvA1, nixScope.drvA2),
    operators.equal(nixScope.drvA1, nixScope.drvA3),
    operators.equal(nixScope.drvC1, nixScope.drvC2),
  ];
});
