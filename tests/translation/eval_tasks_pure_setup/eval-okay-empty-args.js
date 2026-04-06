import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default apply(
  apply(
    createFunc({}, null, {}, (nixScope) => (
      createFunc({}, null, {}, (nixScope) => (
        new InterpolatedString(["", "", ""], [
          () => (nixScope.x),
          () => (nixScope.y),
        ])
      ))
    )),
    {},
  ),
  { "x": "a", "y": "b" },
);
