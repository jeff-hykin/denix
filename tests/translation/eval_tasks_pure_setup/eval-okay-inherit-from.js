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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-inherit-from.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  nixScope.x = {};
  nixScope.y = {};
  defGetter(
    nixScope,
    "a",
    () => (apply(
      apply(nixScope.builtins["trace"], mkThunk(() => ("used"))),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => (1n));
        defGetter(obj, "b", () => (2n));
        return obj;
      }))),
    )["a"]),
  );
  defGetter(
    nixScope,
    "b",
    () => (apply(
      apply(nixScope.builtins["trace"], mkThunk(() => ("used"))),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => (1n));
        defGetter(obj, "b", () => (2n));
        return obj;
      }))),
    )["b"]),
  );
  defGetter(
    nixScope,
    "merged",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "inner", () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "d", () => (nixScope.y.d));
        return obj;
      })));
      defGetter(obj, "inner", () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "c", () => (nixScope.x.c));
        return obj;
      })));
      return obj;
    })),
  );
  defGetter(nixScope.x, "c", () => (3n));
  defGetter(nixScope.y, "d", () => (4n));
  return [
    nixScope.a,
    nixScope.b,
    /*rec*/ createScope(nixScope, (nixScope) => {
      nixScope.x = {};
      nixScope.__overrides = {};
      defGetter(nixScope, "c", () => (nixScope.x["c"]));
      defGetter(nixScope, "d", () => (nixScope.y["d"]));
      defGetter(nixScope.x, "c", () => []);
      defGetter(nixScope.__overrides["y"], "d", () => []);
      const __result = {};
      Object.defineProperty(__result, "c", {
        enumerable: true,
        configurable: true,
        get() {
          return nixScope.c;
        },
      });
      Object.defineProperty(__result, "d", {
        enumerable: true,
        configurable: true,
        get() {
          return nixScope.d;
        },
      });
      Object.defineProperty(__result, "x", {
        enumerable: true,
        configurable: true,
        get() {
          return nixScope.x;
        },
      });
      Object.defineProperty(__result, "__overrides", {
        enumerable: true,
        configurable: true,
        get() {
          return nixScope.__overrides;
        },
      });
      return __result;
    }),
    nixScope.merged,
  ];
});
