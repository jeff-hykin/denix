import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-eq-derivations.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "drvA1",
    (nixScope) =>
      nixScope.derivation(
        { "name": "a", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvA2",
    (nixScope) =>
      nixScope.derivation(
        { "name": "a", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvA3",
    (nixScope) =>
      operators.merge(
        nixScope.derivation(
          { "name": "a", "builder": "/foo", "system": "i686-linux" },
        ),
        { "dummy": 1n },
      ),
  );
  defGetter(
    nixScope,
    "drvC1",
    (nixScope) =>
      nixScope.derivation(
        { "name": "c", "builder": "/foo", "system": "i686-linux" },
      ),
  );
  defGetter(
    nixScope,
    "drvC2",
    (nixScope) =>
      nixScope.derivation(
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
