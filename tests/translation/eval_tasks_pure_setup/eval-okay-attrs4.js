import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.as = createScope((nixScope) => {
    const obj = {};
    if (obj["x"] === undefined) obj["x"] = {};
    if (obj["x"]["y"] === undefined) obj["x"]["y"] = {};
    obj["x"]["y"]["z"] = 123n;
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["c"] = 456n;
    return obj;
  });
  defGetter(nixScope, "bs", (nixScope) => null);
  return [
    operators.hasAttr(nixScope.as, "x"),
    operators.hasAttr(nixScope.as, "y"),
    operators.hasAttrPath(nixScope.as, "x", "y", "z"),
    operators.hasAttrPath(nixScope.as, "x", "y", "z", "a"),
    operators.hasAttrPath(nixScope.as, "x", "y", "a"),
    operators.hasAttrPath(nixScope.as, "a", "b", "c"),
    operators.hasAttr(nixScope.bs, "x"),
    operators.hasAttrPath(nixScope.bs, "x", "y", "z"),
  ];
});
