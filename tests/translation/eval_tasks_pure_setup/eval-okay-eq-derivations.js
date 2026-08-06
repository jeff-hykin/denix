import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-eq-derivations.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "drvA1",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("a"));
        defGetter(obj, "builder", () => ("/foo"));
        defGetter(obj, "system", () => ("i686-linux"));
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "drvA2",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("a"));
        defGetter(obj, "builder", () => ("/foo"));
        defGetter(obj, "system", () => ("i686-linux"));
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "drvA3",
    (
      nixScope,
    ) => (operators.merge(
      apply(
        nixScope.derivation,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "name", () => ("a"));
          defGetter(obj, "builder", () => ("/foo"));
          defGetter(obj, "system", () => ("i686-linux"));
          return obj;
        }))),
      ),
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "dummy", () => (1n));
        return obj;
      }),
    )),
  );
  defGetter(
    nixScope,
    "drvC1",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("c"));
        defGetter(obj, "builder", () => ("/foo"));
        defGetter(obj, "system", () => ("i686-linux"));
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "drvC2",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("c"));
        defGetter(obj, "builder", () => ("/bar"));
        defGetter(obj, "system", () => ("i686-linux"));
        return obj;
      }))),
    )),
  );
  return [
    operators.equal(nixScope.drvA1, nixScope.drvA1),
    operators.equal(nixScope.drvA1, nixScope.drvA2),
    operators.equal(nixScope.drvA1, nixScope.drvA3),
    operators.equal(nixScope.drvC1, nixScope.drvC2),
  ];
});
