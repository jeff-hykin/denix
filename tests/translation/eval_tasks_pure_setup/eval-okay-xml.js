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
  return nixScope;
});
