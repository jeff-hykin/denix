import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  nixScope.strings = ["", "text 1", "text 2"];
  return apply(
    nixScope.builtins["concatLists"],
    apply(
      apply(
        nixScope.map,
        createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
          apply(
            apply(
              nixScope.map,
              apply(nixScope.builtins["hashString"], nixScope.hash),
            ),
            nixScope.strings,
          )
        )),
      ),
      ["md5", "sha1", "sha256", "sha512"],
    ),
  );
});
