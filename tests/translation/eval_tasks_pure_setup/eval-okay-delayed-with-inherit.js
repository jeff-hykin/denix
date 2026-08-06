import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-delayed-with-inherit.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "pkgs_", (nixScope) => (((nixScope) => {
    runtime.scopeStack.push(nixScope);
    try {
      return createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "a",
          () => (apply(
            nixScope.derivation,
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "name", () => ("a"));
              defGetter(
                obj,
                "system",
                () => (nixScope.builtins["currentSystem"]),
              );
              defGetter(obj, "builder", () => ("/bin/sh"));
              defGetter(obj, "args", () => ["-c", "touch $out"]);
              defGetter(obj, "b", () => (nixScope.b));
              return obj;
            }))),
          )),
        );
        defGetter(obj, "b", () => (nixScope.b));
        return obj;
      });
    } finally {
      runtime.scopeStack.pop();
    }
  })(runtime.withScope(nixScope, () => (nixScope.pkgs)))));
  defGetter(
    nixScope,
    "packageOverrides",
    (nixScope) => (createFunc(/*arg:*/ "p", null, {}, nixScope, (nixScope) => (
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "b",
          () => (apply(
            nixScope.derivation,
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "name", () => ("b-overridden"));
              defGetter(
                obj,
                "system",
                () => (nixScope.builtins["currentSystem"]),
              );
              defGetter(obj, "builder", () => ("/bin/sh"));
              defGetter(obj, "args", () => ["-c", "touch $out"]);
              return obj;
            }))),
          )),
        );
        return obj;
      })
    ))),
  );
  defGetter(
    nixScope,
    "pkgs",
    (
      nixScope,
    ) => (operators.merge(
      nixScope.pkgs_,
      apply(nixScope.packageOverrides, mkThunk(() => (nixScope.pkgs_))),
    )),
  );
  return nixScope.pkgs["a"]["b"]["name"];
});
