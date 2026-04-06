import {
  createRuntime,
  InterpolatedString,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.s = new InterpolatedString(["foo ", " bar"], [
    () => (apply(
      apply(apply(nixScope.builtins["substring"], 33n), 100n),
      apply(
        nixScope.baseNameOf,
        new InterpolatedString(["", ""], [
          () => (new Path(["./eval-okay-context.nix"], [])),
        ]),
      ),
    )),
  ]);
  return (operators.ifThenElse(
    operators.notEqual(nixScope.s, "foo eval-okay-context.nix bar"),
    () => (apply(nixScope.abort, "context not discarded")),
    () => (apply(nixScope.builtins["unsafeDiscardStringContext"], nixScope.s)),
  ));
});
