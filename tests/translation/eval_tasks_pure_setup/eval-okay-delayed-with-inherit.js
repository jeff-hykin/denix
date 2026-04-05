import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-delayed-with-inherit.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "pkgs_", (nixScope) =>
    ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
      runtime.scopeStack.push(nixScope);
      try {
        return ({
          "a": nixScope.derivation(
            {
              "name": "a",
              "system": nixScope.builtins["currentSystem"],
              "builder": "/bin/sh",
              "args": ["-c", "touch $out"],
              "b": nixScope.b,
            },
          ),
          "b": nixScope.b,
        });
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.pkgs));
  defGetter(
    nixScope,
    "packageOverrides",
    (nixScope) =>
      createFunc(/*arg:*/ "p", null, {}, (nixScope) => (
        {
          "b": nixScope.derivation(
            {
              "name": "b-overridden",
              "system": nixScope.builtins["currentSystem"],
              "builder": "/bin/sh",
              "args": ["-c", "touch $out"],
            },
          ),
        }
      )),
  );
  defGetter(
    nixScope,
    "pkgs",
    (nixScope) =>
      operators.merge(
        nixScope.pkgs_,
        nixScope.packageOverrides(nixScope.pkgs_),
      ),
  );
  return nixScope.pkgs["a"]["b"]["name"];
});
