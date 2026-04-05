import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-deprecate-cursed-or.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "cursed0",
    (nixScope) =>
      nixScope.builtins["length"](/*let*/ createScope((nixScope) => {
        nixScope.or = 1n;
        return [
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          )),
          nixScope.or,
        ];
      })),
  );
  defGetter(
    nixScope,
    "cursed1",
    (nixScope) =>
      /*let*/ createScope((nixScope) => {
        nixScope.or = 1n;
        return (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          operators.multiply(nixScope.x, 2n)
        )))(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          operators.add(nixScope.x, 1n)
        )))(nixScope.or);
      }),
  );
  defGetter(
    nixScope,
    "cursed2",
    (nixScope) =>
      /*let*/ createScope((nixScope) => {
        nixScope.or = 1n;
        return operators.selectOrDefault(
          { "a": 2n },
          ["a"],
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          )),
        )(nixScope.or);
      }),
  );
  defGetter(
    nixScope,
    "allowed0",
    (nixScope) =>
      /*let*/ createScope((nixScope) => {
        defGetter(
          nixScope,
          "or",
          (nixScope) => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          ))),
        );
        return nixScope.map(nixScope.or)([]);
      }),
  );
  defGetter(
    nixScope,
    "allowed1",
    (nixScope) =>
      /*let*/ createScope((nixScope) => {
        defGetter(
          nixScope,
          "f",
          (nixScope) => (createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          ))),
        );
        defGetter(nixScope, "or", (nixScope) => nixScope.f);
        return nixScope.f(nixScope.f(nixScope.or));
      }),
  );
  return 0n;
});
