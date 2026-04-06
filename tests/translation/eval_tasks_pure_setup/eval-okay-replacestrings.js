import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      nixScope.replaceStrings(["o"])(["a"])("foobar"),
      nixScope.replaceStrings(["o"])([""])("foobar"),
      nixScope.replaceStrings(["oo"])(["u"])("foobar"),
      nixScope.replaceStrings(["oo", "a"])(["a", "oo"])("foobar"),
      nixScope.replaceStrings(["oo", "oo"])(["u", "i"])("foobar"),
      nixScope.replaceStrings([""])(["X"])("abc"),
      nixScope.replaceStrings([""])(["X"])(""),
      nixScope.replaceStrings(["-"])(["_"])("a-b"),
      nixScope.replaceStrings(["oo", "XX"])([
        "u",
        nixScope.throw("unreachable"),
      ])("foobar"),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
