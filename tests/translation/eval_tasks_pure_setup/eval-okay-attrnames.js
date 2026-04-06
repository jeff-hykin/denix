import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "attrs",
        (nixScope) =>
          operators.merge(
            { "y": "y", "x": "x", "foo": "foo" },
            /*rec*/ createScope((nixScope) => {
              nixScope.x = "newx";
              defGetter(nixScope, "bar", (nixScope) => nixScope.x);
              const __result = {};
              Object.defineProperty(__result, "x", {
                enumerable: true,
                get() {
                  return nixScope.x;
                },
              });
              Object.defineProperty(__result, "bar", {
                enumerable: true,
                get() {
                  return nixScope.bar;
                },
              });
              return __result;
            }),
          ),
      );
      defGetter(
        nixScope,
        "names",
        (nixScope) => apply(nixScope.builtins["attrNames"], nixScope.attrs),
      );
      defGetter(
        nixScope,
        "values",
        (nixScope) =>
          apply(
            apply(
              nixScope.map,
              createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
                apply(
                  apply(nixScope.builtins["getAttr"], nixScope.name),
                  nixScope.attrs,
                )
              )),
            ),
            nixScope.names,
          ),
      );
      return ((_cond) => {
        if (!_cond) {
          throw new Error(
            "assertion failed: " + "values == builtins.attrValues attrs",
          );
        }
        return apply(nixScope.concat, nixScope.values);
      })(
        operators.equal(
          nixScope.values,
          apply(nixScope.builtins["attrValues"], nixScope.attrs),
        ),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
