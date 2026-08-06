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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-genericClosure-deeply-nested-element.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "finite",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "a0", () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a1", () => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "a2", () => (createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "a3", () => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "a4", () => (createScope(nixScope, (nixScope) => {
                const obj = {};
                defGetter(
                  obj,
                  "a5",
                  () => (createScope(nixScope, (nixScope) => {
                    const obj = {};
                    defGetter(
                      obj,
                      "a6",
                      () => (createScope(nixScope, (nixScope) => {
                        const obj = {};
                        defGetter(
                          obj,
                          "a7",
                          () => (createScope(nixScope, (nixScope) => {
                            const obj = {};
                            defGetter(
                              obj,
                              "a8",
                              () => (createScope(nixScope, (nixScope) => {
                                const obj = {};
                                defGetter(obj, "a9", () => ("deep"));
                                return obj;
                              })),
                            );
                            return obj;
                          })),
                        );
                        return obj;
                      })),
                    );
                    return obj;
                  })),
                );
                return obj;
              })));
              return obj;
            })));
            return obj;
          })));
          return obj;
        })));
        return obj;
      })));
      return obj;
    })),
  );
  defGetter(
    nixScope,
    "finiteVal",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["deepSeq"], mkThunk(() => (nixScope.finite))),
      mkThunk(() => (nixScope.finite)),
    )),
  );
  return apply(
    apply(nixScope.builtins["seq"], mkThunk(() => (nixScope.finiteVal))),
    mkThunk(
      () => (apply(
        nixScope.builtins["genericClosure"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "startSet",
            () => [createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(
                obj,
                "infinite",
                () => (apply(
                  nixScope.import,
                  mkThunk(
                    () => (new Path([
                      "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/infinite-nesting.nix",
                    ], []))
                  ),
                )),
              );
              defGetter(obj, "finite", () => (nixScope.finiteVal));
              return obj;
            })],
          );
          defGetter(
            obj,
            "operator",
            () => (createFunc(
              /*arg:*/ "x",
              null,
              {},
              nixScope,
              (
                nixScope,
              ) => [
                apply(
                  nixScope.import,
                  mkThunk(
                    () => (new Path([
                      "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/infinite-nesting.nix",
                    ], []))
                  ),
                ),
              ],
            )),
          );
          return obj;
        }))),
      ))
    ),
  );
});
