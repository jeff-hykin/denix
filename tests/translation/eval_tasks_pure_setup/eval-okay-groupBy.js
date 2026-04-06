import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return apply(
      apply(
        nixScope.builtins["groupBy"],
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          apply(
            apply(apply(nixScope.builtins["substring"], 0n), 1n),
            apply(
              apply(nixScope.builtins["hashString"], "sha256"),
              apply(nixScope.toString, nixScope.n),
            ),
          )
        )),
      ),
      apply(apply(nixScope.range, 0n), 31n),
    );
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
