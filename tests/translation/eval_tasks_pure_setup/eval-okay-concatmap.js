import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      nixScope.builtins["concatMap"](
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          operators.ifThenElse(
            operators.equal(
              operators.multiply(operators.divide(nixScope.x, 2n), 2n),
              nixScope.x,
            ),
            () => [],
            () => [nixScope.x],
          )
        )),
      )(nixScope.range(0n)(10n)),
      nixScope.builtins["concatMap"](
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          operators.listConcat([nixScope.x], ["z"])
        )),
      )(["a", "b"]),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
