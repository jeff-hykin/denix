import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-zipAttrsWith.nix";

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "str",
        (nixScope) => nixScope.builtins["hashString"]("sha256")("test"),
      );
      return nixScope.builtins["zipAttrsWith"](
        createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            { "n": nixScope.n, "v": nixScope.v }
          ))
        )),
      )(
        nixScope.map(createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj[nixScope.builtins["substring"](nixScope.n)(1n)(nixScope.str)] =
              nixScope.n;
            return obj;
          })
        )))(nixScope.range(0n)(31n)),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
