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
        "n1",
        (nixScope) => apply(nixScope.builtins["floor"], 23.5),
      );
      defGetter(
        nixScope,
        "n2",
        (nixScope) => apply(nixScope.builtins["ceil"], 23.5),
      );
      defGetter(
        nixScope,
        "n3",
        (nixScope) => apply(nixScope.builtins["floor"], 23n),
      );
      defGetter(
        nixScope,
        "n4",
        (nixScope) => apply(nixScope.builtins["ceil"], 23n),
      );
      return apply(
        apply(nixScope.builtins["concatStringsSep"], ";"),
        apply(apply(nixScope.map, nixScope.toString), [
          nixScope.n1,
          nixScope.n2,
          nixScope.n3,
          nixScope.n4,
        ]),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
