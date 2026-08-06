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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-deprecate-cursed-or.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "cursed0",
    (
      nixScope,
    ) => (apply(
      nixScope.builtins["length"],
      mkThunk(() => (/*let*/ createScope(nixScope, (nixScope) => {
        defGetter(nixScope, "or", (nixScope) => (1n));
        return [
          createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            nixScope.x
          )),
          nixScope.or,
        ];
      }))),
    )),
  );
  defGetter(
    nixScope,
    "cursed1",
    (nixScope) => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(nixScope, "or", (nixScope) => (1n));
      return apply(
        apply(
          createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            operators.multiply(nixScope.x, 2n)
          )),
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.add(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => (nixScope.or)),
      );
    })),
  );
  defGetter(
    nixScope,
    "cursed2",
    (nixScope) => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(nixScope, "or", (nixScope) => (1n));
      return apply(
        operators.selectOrDefault(
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "a", () => (2n));
            return obj;
          }),
          ["a"],
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              nixScope.x
            )))
          ),
        ),
        mkThunk(() => (nixScope.or)),
      );
    })),
  );
  defGetter(
    nixScope,
    "allowed0",
    (nixScope) => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "or",
        (
          nixScope,
        ) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
          nixScope.x
        ))),
      );
      return apply(
        apply(nixScope.map, mkThunk(() => (nixScope.or))),
        mkThunk(() => []),
      );
    })),
  );
  defGetter(
    nixScope,
    "allowed1",
    (nixScope) => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "f",
        (
          nixScope,
        ) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
          nixScope.x
        ))),
      );
      defGetter(nixScope, "or", (nixScope) => (nixScope.f));
      return apply(
        nixScope.f,
        mkThunk(() => (apply(nixScope.f, mkThunk(() => (nixScope.or))))),
      );
    })),
  );
  return 0n;
});
