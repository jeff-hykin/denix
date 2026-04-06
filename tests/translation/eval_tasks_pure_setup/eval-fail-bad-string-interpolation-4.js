import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "ha",
    (nixScope) =>
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          {
            "a": nixScope.x(nixScope.y),
            "b": nixScope.x(nixScope.y),
            "c": nixScope.x(nixScope.y),
            "d": nixScope.x(nixScope.y),
            "e": nixScope.x(nixScope.y),
            "f": nixScope.x(nixScope.y),
            "g": nixScope.x(nixScope.y),
            "h": nixScope.x(nixScope.y),
            "j": nixScope.x(nixScope.y),
          }
        ))
      )),
  );
  defGetter(
    nixScope,
    "has",
    (nixScope) =>
      nixScope.ha(
        nixScope.ha(
          nixScope.ha(
            nixScope.ha(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              nixScope.x
            ))),
          ),
        ),
      )("ha"),
  );
  defGetter(
    nixScope,
    "pkgs",
    (nixScope) => nixScope.builtins["deepSeq"](nixScope.has)(nixScope.has),
  );
  return (new InterpolatedString(["", ""], [() => (nixScope.pkgs)]));
});
