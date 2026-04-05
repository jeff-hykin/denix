import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-groupBy.nix";

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return nixScope.builtins["groupBy"](
      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
        nixScope.builtins["substring"](0n)(1n)(
          nixScope.builtins["hashString"]("sha256")(
            nixScope.toString(nixScope.n),
          ),
        )
      )),
    )(nixScope.range(0n)(31n));
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
