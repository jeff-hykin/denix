import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-context.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.s = new InterpolatedString(["foo ", " bar"], [
    () => (nixScope.builtins["substring"](33n)(100n)(
      nixScope.baseNameOf(
        new InterpolatedString(["", ""], [
          () => (new Path(["./eval-okay-context.nix"], [])),
        ]),
      ),
    )),
  ]);
  return (operators.ifThenElse(
    operators.notEqual(nixScope.s, "foo eval-okay-context.nix bar"),
    () => (nixScope.abort("context not discarded")),
    () => (nixScope.builtins["unsafeDiscardStringContext"](nixScope.s)),
  ));
});
