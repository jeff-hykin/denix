import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-closure.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "closure",
    (nixScope) =>
      nixScope.builtins["genericClosure"](
        {
          "startSet": [{ "key": 80n }],
          "operator": createFunc(
            { "foo": (nixScope) => (false) },
            null,
            {},
            (nixScope) => (
              operators.ifThenElse(
                nixScope.builtins["lessThan"](nixScope.key)(0n),
                () => [],
                () => [
                  { "key": nixScope.builtins["sub"](nixScope.key)(9n) },
                  {
                    "key": nixScope.builtins["sub"](nixScope.key)(13n),
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
      (nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])))
        ["sortBy"](createFunc(/*arg:*/ "a", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "b", null, {}, (nixScope) => (
            nixScope.builtins["lessThan"](nixScope.a["key"])(nixScope.b["key"])
          ))
        ))),
  );
  return nixScope.sort(nixScope.closure);
});
