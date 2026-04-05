import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-substring-context.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      nixScope.s = new InterpolatedString(["", ""], [
        () => (nixScope.builtins["derivation"](
          { "name": "test", "builder": "/bin/sh", "system": "x86_64-linux" },
        )),
      ]);
      return (operators.ifThenElse(
        operators.equal(
          nixScope.getContext(nixScope.s),
          nixScope.getContext(
            new InterpolatedString(["", ""], [
              () => (operators.add(
                nixScope.substring(0n)(0n)(nixScope.s),
                nixScope.unsafeDiscardStringContext(nixScope.s),
              )),
            ]),
          ),
        ),
        () => ("okay"),
        () => (nixScope.throw("empty substring should preserve context")),
      ));
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
