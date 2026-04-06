import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(apply(apply(nixScope.replaceStrings, ["o"]), ["a"]), "foobar"),
      apply(apply(apply(nixScope.replaceStrings, ["o"]), [""]), "foobar"),
      apply(apply(apply(nixScope.replaceStrings, ["oo"]), ["u"]), "foobar"),
      apply(
        apply(apply(nixScope.replaceStrings, ["oo", "a"]), ["a", "oo"]),
        "foobar",
      ),
      apply(
        apply(apply(nixScope.replaceStrings, ["oo", "oo"]), ["u", "i"]),
        "foobar",
      ),
      apply(apply(apply(nixScope.replaceStrings, [""]), ["X"]), "abc"),
      apply(apply(apply(nixScope.replaceStrings, [""]), ["X"]), ""),
      apply(apply(apply(nixScope.replaceStrings, ["-"]), ["_"]), "a-b"),
      apply(
        apply(apply(nixScope.replaceStrings, ["oo", "XX"]), [
          "u",
          apply(nixScope.throw, "unreachable"),
        ]),
        "foobar",
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
