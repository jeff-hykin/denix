import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default nixScope.builtins["toJSON"]({
  "a": 123n,
  "b": -456n,
  "c": "foo",
  "d": 'foo\n"bar"',
  "e": true,
  "f": false,
  "g": [1n, 2n, 3n],
  "h": ["a", ["b", { "foo\nbar": {} }]],
  "i": operators.add(1n, 2n),
  "j": 1.44,
  "k": {
    "__toString": createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
      nixScope.self["a"]
    )),
    "a": "foo",
  },
});
