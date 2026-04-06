import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ({
  "set": createScope((nixScope) => {
    const obj = {};
    {
      const __k = new InterpolatedString(["", ""], [
        () => (operators.add("", "b")),
      ]);
      if (__k !== null) obj[__k] = 1n;
    }
    return obj;
  }),
  "set": createScope((nixScope) => {
    const obj = {};
    {
      const __k = new InterpolatedString(["", ""], [
        () => (operators.add("b", "")),
      ]);
      if (__k !== null) obj[__k] = 2n;
    }
    return obj;
  }),
});
