import {
  createRuntime,
  InterpolatedString,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-substring-context.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "s",
        (
          nixScope,
        ) => (new InterpolatedString(["", ""], [
          () => (apply(
            nixScope.builtins["derivation"],
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "name", () => ("test"));
              defGetter(obj, "builder", () => ("/bin/sh"));
              defGetter(obj, "system", () => ("x86_64-linux"));
              return obj;
            }))),
          )),
        ])),
      );
      return (operators.ifThenElse(
        operators.equal(
          apply(nixScope.getContext, mkThunk(() => (nixScope.s))),
          apply(
            nixScope.getContext,
            mkThunk(
              () => (new InterpolatedString(["", ""], [
                () => (operators.add(
                  apply(
                    apply(
                      apply(nixScope.substring, mkThunk(() => (0n))),
                      mkThunk(() => (0n)),
                    ),
                    mkThunk(() => (nixScope.s)),
                  ),
                  apply(
                    nixScope.unsafeDiscardStringContext,
                    mkThunk(() => (nixScope.s)),
                  ),
                )),
              ]))
            ),
          ),
        ),
        () => ("okay"),
        () => (apply(
          nixScope.throw,
          mkThunk(() => ("empty substring should preserve context")),
        )),
      ));
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
