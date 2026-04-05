import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-genericClosure-deeply-nested-element.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.finite = {
    "a0": {
      "a1": {
        "a2": {
          "a3": {
            "a4": { "a5": { "a6": { "a7": { "a8": { "a9": "deep" } } } } },
          },
        },
      },
    },
  };
  defGetter(
    nixScope,
    "finiteVal",
    (nixScope) =>
      nixScope.builtins["deepSeq"](nixScope.finite)(nixScope.finite),
  );
  return nixScope.builtins["seq"](nixScope.finiteVal)(
    nixScope.builtins["genericClosure"]({
      "startSet": [
        {
          "infinite": nixScope.import(
            new Path(["../source_code/nix_lang/infinite-nesting.nix"], []),
          ),
          "finite": nixScope.finiteVal,
        },
      ],
      "operator": createFunc(
        /*arg:*/ "x",
        null,
        {},
        (
          nixScope,
        ) => [
          nixScope.import(
            new Path(["../source_code/nix_lang/infinite-nesting.nix"], []),
          ),
        ],
      ),
    }),
  );
});
