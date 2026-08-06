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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-listtoattrs.nix";
const operators = runtime.operators;

export default //
((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "asi",
        (
          nixScope,
        ) => (createFunc(/*arg:*/ "name", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "value", null, {}, nixScope, (nixScope) => (
            createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "name", () => (nixScope.name));
              defGetter(obj, "value", () => (nixScope.value));
              return obj;
            })
          ))
        ))),
      );
      defGetter(
        nixScope,
        "list",
        (
          nixScope,
        ) => [
          apply(
            apply(nixScope.asi, mkThunk(() => ("a"))),
            mkThunk(() => ("A")),
          ),
          apply(
            apply(nixScope.asi, mkThunk(() => ("b"))),
            mkThunk(() => ("B")),
          ),
        ],
      );
      defGetter(
        nixScope,
        "a",
        (
          nixScope,
        ) => (apply(
          nixScope.builtins["listToAttrs"],
          mkThunk(() => (nixScope.list)),
        )),
      );
      defGetter(
        nixScope,
        "b",
        (
          nixScope,
        ) => (apply(
          nixScope.builtins["listToAttrs"],
          mkThunk(() => (operators.listConcat(nixScope.list, nixScope.list))),
        )),
      );
      defGetter(
        nixScope,
        "r",
        (
          nixScope,
        ) => (apply(
          nixScope.builtins["listToAttrs"],
          mkThunk(
            () => [
              apply(
                apply(nixScope.asi, mkThunk(() => ("result"))),
                mkThunk(() => [nixScope.a, nixScope.b]),
              ),
              apply(
                apply(nixScope.asi, mkThunk(() => ("throw"))),
                mkThunk(
                  () => (apply(
                    nixScope.throw,
                    mkThunk(() => ("this should not be thrown")),
                  ))
                ),
              ),
            ]
          ),
        )),
      );
      defGetter(
        nixScope,
        "x",
        (
          nixScope,
        ) => (apply(
          nixScope.builtins["listToAttrs"],
          mkThunk(
            () => [
              apply(
                apply(nixScope.asi, mkThunk(() => ("foo"))),
                mkThunk(() => ("bar")),
              ),
              apply(
                apply(nixScope.asi, mkThunk(() => ("foo"))),
                mkThunk(() => ("bla")),
              ),
            ]
          ),
        )),
      );
      return operators.add(
        apply(
          nixScope.concat,
          mkThunk(
            () => (apply(
              apply(
                nixScope.map,
                mkThunk(
                  () => (createFunc(
                    /*arg:*/ "x",
                    null,
                    {},
                    nixScope,
                    (nixScope) => (
                      nixScope.x["a"]
                    ),
                  ))
                ),
              ),
              mkThunk(() => (nixScope.r["result"])),
            ))
          ),
        ),
        nixScope.x["foo"],
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
