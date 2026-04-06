import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      nixScope.s = new InterpolatedString(["", ""], [
        () => (apply(
          nixScope.builtins["derivation"],
          { "name": "test", "builder": "/bin/sh", "system": "x86_64-linux" },
        )),
      ]);
      return (operators.ifThenElse(
        operators.equal(
          apply(nixScope.getContext, nixScope.s),
          apply(
            nixScope.getContext,
            new InterpolatedString(["", ""], [
              () => (operators.add(
                apply(apply(apply(nixScope.substring, 0n), 0n), nixScope.s),
                apply(nixScope.unsafeDiscardStringContext, nixScope.s),
              )),
            ]),
          ),
        ),
        () => ("okay"),
        () => (apply(
          nixScope.throw,
          "empty substring should preserve context",
        )),
      ));
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
