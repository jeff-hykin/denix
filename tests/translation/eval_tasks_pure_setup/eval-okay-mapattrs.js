import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-mapattrs.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return nixScope.builtins["mapAttrs"](
      createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
          operators.add(operators.add(nixScope.name, "-"), nixScope.value)
        ))
      )),
    )({ "x": "foo", "y": "bar" });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
