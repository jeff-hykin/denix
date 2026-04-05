import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-tryeval-failed-thunk-reeval.nix";

export default //
/*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "foo",
    (nixScope) =>
      nixScope.builtins["trace"]("throwing")(nixScope.throw)("nope"),
  );
  return nixScope.builtins["seq"](
    (nixScope.builtins["tryEval"](nixScope.foo))["success"],
  )(nixScope.builtins["seq"])(
    (nixScope.builtins["tryEval"](nixScope.foo))["success"],
  )("done");
});
