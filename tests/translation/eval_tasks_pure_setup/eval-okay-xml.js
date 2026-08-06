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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-xml.nix";
const operators = runtime.operators;

export default /*rec*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "x", (nixScope) => (123n));
  defGetter(nixScope, "y", (nixScope) => (567.890));
  defGetter(nixScope, "a", (nixScope) => ("foo"));
  defGetter(nixScope, "b", (nixScope) => ("bar"));
  defGetter(nixScope, "c", (nixScope) => (operators.add("foo", "bar")));
  defGetter(
    nixScope,
    "f",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "z": false, "x": false, "y": false } },
      nixScope,
      (nixScope) => (
        operators.ifThenElse(nixScope.y, () => (nixScope.x), () => (nixScope.z))
      ),
    )),
  );
  defGetter(
    nixScope,
    "id",
    (nixScope) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
      nixScope.x
    ))),
  );
  defGetter(
    nixScope,
    "at",
    (
      nixScope,
    ) => (createFunc(
      {},
      "args",
      { args: { "x": false, "y": false, "z": false } },
      nixScope,
      (nixScope) => (
        nixScope.x
      ),
    )),
  );
  defGetter(
    nixScope,
    "ellipsis",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "x": false, "y": false, "z": false }, ellipsis: true },
      nixScope,
      (nixScope) => (
        nixScope.x
      ),
    )),
  );
  const __result = {};
  Object.defineProperty(__result, "x", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.x;
    },
  });
  Object.defineProperty(__result, "y", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.y;
    },
  });
  Object.defineProperty(__result, "a", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.a;
    },
  });
  Object.defineProperty(__result, "b", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.b;
    },
  });
  Object.defineProperty(__result, "c", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.c;
    },
  });
  Object.defineProperty(__result, "f", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.f;
    },
  });
  Object.defineProperty(__result, "id", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.id;
    },
  });
  Object.defineProperty(__result, "at", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.at;
    },
  });
  Object.defineProperty(__result, "ellipsis", {
    enumerable: true,
    configurable: true,
    get() {
      return nixScope.ellipsis;
    },
  });
  return __result;
});
