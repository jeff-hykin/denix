import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-derivation-structuredAttrs-stack-overflow.nix";

export default //
//
apply(
  nixScope.derivation,
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "name", () => ("test"));
    defGetter(obj, "system", () => ("x86_64-linux"));
    defGetter(obj, "builder", () => ("/bin/sh"));
    defGetter(obj, "__structuredAttrs", () => (true));
    defGetter(
      obj,
      "nested",
      () => (/*let*/ createScope(nixScope, (nixScope) => {
        defGetter(
          nixScope,
          "long",
          (
            nixScope,
          ) => (apply(
            apply(
              nixScope.builtins["genList"],
              mkThunk(
                () => (createFunc(
                  /*arg:*/ "x",
                  null,
                  {},
                  nixScope,
                  (nixScope) => (
                    nixScope.x
                  ),
                ))
              ),
            ),
            mkThunk(() => (100000n)),
          )),
        );
        defGetter(
          nixScope,
          "reverseLinkedList",
          (
            nixScope,
          ) => (apply(
            apply(
              apply(
                nixScope.builtins["foldl'"],
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "tail",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      createFunc(
                        /*arg:*/ "head",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          createScope(nixScope, (nixScope) => {
                            const obj = {};
                            defGetter(obj, "head", () => (nixScope.head));
                            defGetter(obj, "tail", () => (nixScope.tail));
                            return obj;
                          })
                        ),
                      )
                    ),
                  ))
                ),
              ),
              mkThunk(() => (null)),
            ),
            mkThunk(() => (nixScope.long)),
          )),
        );
        return nixScope.reverseLinkedList;
      })),
    );
    return obj;
  }))),
);
