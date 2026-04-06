import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "overrides",
    (nixScope) =>
      operators.merge(
        {
          "import": createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
            nixScope.scopedImport(nixScope.overrides)(nixScope.fn)
          )),
          "scopedImport": createFunc(/*arg:*/ "attrs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "fn", null, {}, (nixScope) => (
              nixScope.scopedImport(
                operators.merge(nixScope.overrides, nixScope.attrs),
              )(nixScope.fn)
            ))
          )),
          "builtins": operators.merge(nixScope.builtins, nixScope.overrides),
        },
        nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])),
      ),
  );
  return nixScope.scopedImport(nixScope.overrides)(
    new Path(["./imported.nix"], []),
  );
});
