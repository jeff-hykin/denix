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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-closure.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "closure",
    (
      nixScope,
    ) => (apply(
      nixScope.builtins["genericClosure"],
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "startSet", () => [createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "key", () => (80n));
          return obj;
        })]);
        defGetter(
          obj,
          "operator",
          () => (createFunc(
            { "foo": (nixScope) => (false) },
            null,
            { args: { "key": false, "foo": true } },
            nixScope,
            (nixScope) => (
              operators.ifThenElse(
                apply(
                  apply(
                    nixScope.builtins["lessThan"],
                    mkThunk(() => (nixScope.key)),
                  ),
                  mkThunk(() => (0n)),
                ),
                () => [],
                () => [
                  createScope(nixScope, (nixScope) => {
                    const obj = {};
                    defGetter(
                      obj,
                      "key",
                      () => (apply(
                        apply(
                          nixScope.builtins["sub"],
                          mkThunk(() => (nixScope.key)),
                        ),
                        mkThunk(() => (9n)),
                      )),
                    );
                    return obj;
                  }),
                  createScope(nixScope, (nixScope) => {
                    const obj = {};
                    defGetter(
                      obj,
                      "key",
                      () => (apply(
                        apply(
                          nixScope.builtins["sub"],
                          mkThunk(() => (nixScope.key)),
                        ),
                        mkThunk(() => (13n)),
                      )),
                    );
                    defGetter(obj, "foo", () => (true));
                    return obj;
                  }),
                ],
              )
            ),
          )),
        );
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "sort",
    (
      nixScope,
    ) => (apply(
      (apply(
        nixScope.import,
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
          ], []))
        ),
      ))["sortBy"],
      mkThunk(
        () => (createFunc(/*arg:*/ "a", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "b", null, {}, nixScope, (nixScope) => (
            apply(
              apply(
                nixScope.builtins["lessThan"],
                mkThunk(() => (nixScope.a["key"])),
              ),
              mkThunk(() => (nixScope.b["key"])),
            )
          ))
        )))
      ),
    )),
  );
  return apply(nixScope.sort, mkThunk(() => (nixScope.closure)));
});
