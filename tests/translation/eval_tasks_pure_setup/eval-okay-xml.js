import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*rec*/ createScope((nixScope) => {
  nixScope.x = 123n;
  nixScope.y = 567.890;
  nixScope.a = "foo";
  nixScope.b = "bar";
  defGetter(nixScope, "c", (nixScope) => operators.add("foo", "bar"));
  defGetter(
    nixScope,
    "f",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        operators.ifThenElse(nixScope.y, () => (nixScope.x), () => (nixScope.z))
      )),
  );
  defGetter(
    nixScope,
    "id",
    (nixScope) =>
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      )),
  );
  defGetter(
    nixScope,
    "at",
    (nixScope) =>
      createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
        nixScope.x
      )),
  );
  defGetter(
    nixScope,
    "ellipsis",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        nixScope.x
      )),
  );
  const __result = {};
  Object.defineProperty(__result, "x", {
    enumerable: true,
    get() {
      return nixScope.x;
    },
  });
  Object.defineProperty(__result, "y", {
    enumerable: true,
    get() {
      return nixScope.y;
    },
  });
  Object.defineProperty(__result, "a", {
    enumerable: true,
    get() {
      return nixScope.a;
    },
  });
  Object.defineProperty(__result, "b", {
    enumerable: true,
    get() {
      return nixScope.b;
    },
  });
  Object.defineProperty(__result, "c", {
    enumerable: true,
    get() {
      return nixScope.c;
    },
  });
  Object.defineProperty(__result, "f", {
    enumerable: true,
    get() {
      return nixScope.f;
    },
  });
  Object.defineProperty(__result, "id", {
    enumerable: true,
    get() {
      return nixScope.id;
    },
  });
  Object.defineProperty(__result, "at", {
    enumerable: true,
    get() {
      return nixScope.at;
    },
  });
  Object.defineProperty(__result, "ellipsis", {
    enumerable: true,
    get() {
      return nixScope.ellipsis;
    },
  });
  return __result;
});
