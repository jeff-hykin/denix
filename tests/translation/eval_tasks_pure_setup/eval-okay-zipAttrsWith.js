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
        "str",
        (nixScope) =>
          apply(apply(nixScope.builtins["hashString"], "sha256"), "test"),
      );
      return apply(
        apply(
          nixScope.builtins["zipAttrsWith"],
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              { "n": nixScope.n, "v": nixScope.v }
            ))
          )),
        ),
        apply(
          apply(
            nixScope.map,
            createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
              createScope((nixScope) => {
                const obj = {};
                {
                  const __k = apply(
                    apply(
                      apply(nixScope.builtins["substring"], nixScope.n),
                      1n,
                    ),
                    nixScope.str,
                  );
                  if (__k !== null) obj[__k] = nixScope.n;
                }
                return obj;
              })
            )),
          ),
          apply(apply(nixScope.range, 0n), 31n),
        ),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
