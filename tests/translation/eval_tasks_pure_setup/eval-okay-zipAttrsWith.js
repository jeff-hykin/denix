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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-zipAttrsWith.nix";

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "str",
        (
          nixScope,
        ) => (apply(
          apply(nixScope.builtins["hashString"], mkThunk(() => ("sha256"))),
          mkThunk(() => ("test")),
        )),
      );
      return apply(
        apply(
          nixScope.builtins["zipAttrsWith"],
          mkThunk(
            () => (createFunc(/*arg:*/ "n", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "v", null, {}, nixScope, (nixScope) => (
                createScope(nixScope, (nixScope) => {
                  const obj = {};
                  defGetter(obj, "n", () => (nixScope.n));
                  defGetter(obj, "v", () => (nixScope.v));
                  return obj;
                })
              ))
            )))
          ),
        ),
        mkThunk(
          () => (apply(
            apply(
              nixScope.map,
              mkThunk(
                () => (createFunc(
                  /*arg:*/ "n",
                  null,
                  {},
                  nixScope,
                  (nixScope) => (
                    createScope(nixScope, (nixScope) => {
                      const obj = {};
                      set(obj, [
                        apply(
                          apply(
                            apply(
                              nixScope.builtins["substring"],
                              mkThunk(() => (nixScope.n)),
                            ),
                            mkThunk(() => (1n)),
                          ),
                          mkThunk(() => (nixScope.str)),
                        ),
                      ], () => (nixScope.n));
                      return obj;
                    })
                  ),
                ))
              ),
            ),
            mkThunk(
              () => (apply(
                apply(nixScope.range, mkThunk(() => (0n))),
                mkThunk(() => (31n)),
              ))
            ),
          ))
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
