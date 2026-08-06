import {
  createRuntime,
  InterpolatedString,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-context.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "s",
    (
      nixScope,
    ) => (new InterpolatedString(["foo ", " bar"], [
      () => (apply(
        apply(
          apply(nixScope.builtins["substring"], mkThunk(() => (33n))),
          mkThunk(() => (100n)),
        ),
        mkThunk(
          () => (apply(
            nixScope.baseNameOf,
            mkThunk(
              () => (new InterpolatedString(["", ""], [
                () => (new Path([
                  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-context.nix",
                ], [])),
              ]))
            ),
          ))
        ),
      )),
    ])),
  );
  return (operators.ifThenElse(
    operators.notEqual(nixScope.s, "foo eval-okay-context.nix bar"),
    () => (apply(nixScope.abort, mkThunk(() => ("context not discarded")))),
    () => (apply(
      nixScope.builtins["unsafeDiscardStringContext"],
      mkThunk(() => (nixScope.s)),
    )),
  ));
});
