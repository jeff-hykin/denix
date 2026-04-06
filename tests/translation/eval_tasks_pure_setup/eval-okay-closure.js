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

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "closure",
    (nixScope) =>
      apply(
        nixScope.builtins["genericClosure"],
        {
          "startSet": [{ "key": 80n }],
          "operator": createFunc(
            { "foo": (nixScope) => (false) },
            null,
            {},
            (nixScope) => (
              operators.ifThenElse(
                apply(apply(nixScope.builtins["lessThan"], nixScope.key), 0n),
                () => [],
                () => [
                  {
                    "key": apply(
                      apply(nixScope.builtins["sub"], nixScope.key),
                      9n,
                    ),
                  },
                  {
                    "key": apply(
                      apply(nixScope.builtins["sub"], nixScope.key),
                      13n,
                    ),
                    "foo": true,
                  },
                ],
              )
            ),
          ),
        },
      ),
  );
  defGetter(
    nixScope,
    "sort",
    (nixScope) =>
      apply(
        (apply(
          nixScope.import,
          new Path(["../source_code/nix_lang/lib.nix"], []),
        ))["sortBy"],
        createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
            apply(
              apply(nixScope.builtins["lessThan"], nixScope.a["key"]),
              nixScope.b["key"],
            )
          ))
        )),
      ),
  );
  return apply(nixScope.sort, nixScope.closure);
});
