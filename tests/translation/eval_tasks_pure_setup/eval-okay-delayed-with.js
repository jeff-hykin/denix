import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
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
          "b": nixScope.derivation(
            {
              "name": "b",
              "system": nixScope.builtins["currentSystem"],
              "builder": "/bin/sh",
              "args": ["-c", "touch $out"],
              "a": nixScope.a,
            },
          ),
          "c": nixScope.b,
        });
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.pkgs));
  defGetter(
    nixScope,
    "packageOverrides",
    (nixScope) =>
      createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
        ((_withAttrs) => {
          const nixScope = {
            ...runtime.scopeStack.slice(-1)[0],
            ..._withAttrs,
          };
          runtime.scopeStack.push(nixScope);
          try {
            return ({
              "b": nixScope.derivation(
                operators.merge(
                  nixScope.b["drvAttrs"],
                  {
                    "name": new InterpolatedString(["", "-overridden"], [
                      () => (nixScope.b["name"]),
                    ]),
                  },
                ),
              ),
            });
          } finally {
            runtime.scopeStack.pop();
          }
        })(nixScope.pkgs)
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
  return (new InterpolatedString(["", " ", " ", ""], [
    () => (nixScope.pkgs["a"]["b"]["name"]),
    () => (nixScope.pkgs["c"]["name"]),
    () => (nixScope.pkgs["b"]["a"]["name"]),
  ]));
});
