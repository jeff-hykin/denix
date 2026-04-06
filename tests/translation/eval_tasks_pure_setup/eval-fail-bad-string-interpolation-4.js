import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
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
            "a": apply(nixScope.x, nixScope.y),
            "b": apply(nixScope.x, nixScope.y),
            "c": apply(nixScope.x, nixScope.y),
            "d": apply(nixScope.x, nixScope.y),
            "e": apply(nixScope.x, nixScope.y),
            "f": apply(nixScope.x, nixScope.y),
            "g": apply(nixScope.x, nixScope.y),
            "h": apply(nixScope.x, nixScope.y),
            "j": apply(nixScope.x, nixScope.y),
          }
        ))
      )),
  );
  defGetter(
    nixScope,
    "has",
    (nixScope) =>
      apply(
        apply(
          nixScope.ha,
          apply(
            nixScope.ha,
            apply(
              nixScope.ha,
              apply(
                nixScope.ha,
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  nixScope.x
                )),
              ),
            ),
          ),
        ),
        "ha",
      ),
  );
  defGetter(
    nixScope,
    "pkgs",
    (nixScope) =>
      apply(apply(nixScope.builtins["deepSeq"], nixScope.has), nixScope.has),
  );
  return (new InterpolatedString(["", ""], [() => (nixScope.pkgs)]));
});
