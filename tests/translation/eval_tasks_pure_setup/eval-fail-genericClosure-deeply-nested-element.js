import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

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
      apply(
        apply(nixScope.builtins["deepSeq"], nixScope.finite),
        nixScope.finite,
      ),
  );
  return apply(
    apply(nixScope.builtins["seq"], nixScope.finiteVal),
    apply(nixScope.builtins["genericClosure"], {
      "startSet": [
        {
          "infinite": apply(
            nixScope.import,
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
          apply(
            nixScope.import,
            new Path(["../source_code/nix_lang/infinite-nesting.nix"], []),
          ),
        ],
      ),
    }),
  );
});
