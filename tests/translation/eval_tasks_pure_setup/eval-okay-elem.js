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
    return /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "xs",
        (nixScope) => apply(apply(nixScope.range, 10n), 40n),
      );
      return [
        apply(apply(nixScope.builtins["elem"], 23n), nixScope.xs),
        apply(apply(nixScope.builtins["elem"], 42n), nixScope.xs),
        apply(apply(nixScope.builtins["elemAt"], nixScope.xs), 20n),
      ];
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
