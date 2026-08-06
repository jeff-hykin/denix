import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrnames.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "attrs",
        (nixScope) => (operators.merge(
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "y", () => ("y"));
            defGetter(obj, "x", () => ("x"));
            defGetter(obj, "foo", () => ("foo"));
            return obj;
          }),
          /*rec*/ createScope(nixScope, (nixScope) => {
            defGetter(nixScope, "x", (nixScope) => ("newx"));
            defGetter(nixScope, "bar", (nixScope) => (nixScope.x));
            const __result = {};
            Object.defineProperty(__result, "x", {
              enumerable: true,
              configurable: true,
              get() {
                return nixScope.x;
              },
            });
            Object.defineProperty(__result, "bar", {
              enumerable: true,
              configurable: true,
              get() {
                return nixScope.bar;
              },
            });
            return __result;
          }),
        )),
      );
      defGetter(
        nixScope,
        "names",
        (
          nixScope,
        ) => (apply(
          nixScope.builtins["attrNames"],
          mkThunk(() => (nixScope.attrs)),
        )),
      );
      defGetter(
        nixScope,
        "values",
        (
          nixScope,
        ) => (apply(
          apply(
            nixScope.map,
            mkThunk(
              () => (createFunc(
                /*arg:*/ "name",
                null,
                {},
                nixScope,
                (nixScope) => (
                  apply(
                    apply(
                      nixScope.builtins["getAttr"],
                      mkThunk(() => (nixScope.name)),
                    ),
                    mkThunk(() => (nixScope.attrs)),
                  )
                ),
              ))
            ),
          ),
          mkThunk(() => (nixScope.names)),
        )),
      );
      return ((_cond) => {
        if (!_cond) {
          throw new Error(
            "assertion failed: " + "values == builtins.attrValues attrs",
          );
        }
        return apply(nixScope.concat, mkThunk(() => (nixScope.values)));
      })(
        operators.equal(
          nixScope.values,
          apply(
            nixScope.builtins["attrValues"],
            mkThunk(() => (nixScope.attrs)),
          ),
        ),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(
  runtime.withScope(
    nixScope,
    () => (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
        ], []))
      ),
    )),
  ),
);
