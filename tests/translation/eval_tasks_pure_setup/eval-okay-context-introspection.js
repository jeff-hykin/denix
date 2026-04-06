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
  nixScope.path = new InterpolatedString(["", ""], [
    () => (new Path(["./eval-okay-context-introspection.nix"], [])),
  ]);
  nixScope["combo-path"] = new InterpolatedString(["", "", "", "", ""], [
    () => (nixScope.path),
    () => (nixScope.drv["outPath"]),
    () => (nixScope.drv["foo"]["outPath"]),
    () => (nixScope.drv["drvPath"]),
  ]);
  defGetter(
    nixScope,
    "drv",
    (nixScope) =>
      apply(
        nixScope.derivation,
        {
          "name": "fail",
          "builder": "/bin/false",
          "system": "x86_64-linux",
          "outputs": ["out", "foo"],
        },
      ),
  );
  defGetter(
    nixScope,
    "desired-context",
    (nixScope) =>
      createScope((nixScope) => {
        const obj = {};
        {
          const __k = new InterpolatedString(["", ""], [
            () => (apply(
              nixScope.builtins["unsafeDiscardStringContext"],
              nixScope.path,
            )),
          ]);
          if (__k !== null) obj[__k] = { "path": true };
        }
        {
          const __k = new InterpolatedString(["", ""], [
            () => (apply(
              nixScope.builtins["unsafeDiscardStringContext"],
              nixScope.drv["drvPath"],
            )),
          ]);
          if (__k !== null) {
            obj[__k] = { "outputs": ["foo", "out"], "allOutputs": true };
          }
        }
        return obj;
      }),
  );
  defGetter(
    nixScope,
    "legit-context",
    (nixScope) =>
      apply(nixScope.builtins["getContext"], nixScope["combo-path"]),
  );
  defGetter(
    nixScope,
    "reconstructed-path",
    (nixScope) =>
      apply(
        apply(
          nixScope.builtins["appendContext"],
          apply(
            nixScope.builtins["unsafeDiscardStringContext"],
            nixScope["combo-path"],
          ),
        ),
        nixScope["desired-context"],
      ),
  );
  defGetter(
    nixScope,
    "etaRule",
    (nixScope) =>
      createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
        operators.equal(
          nixScope.str,
          apply(
            apply(
              nixScope.builtins["appendContext"],
              apply(
                nixScope.builtins["unsafeDiscardStringContext"],
                nixScope.str,
              ),
            ),
            apply(nixScope.builtins["getContext"], nixScope.str),
          ),
        )
      )),
  );
  defGetter(
    nixScope,
    "almostEtaRule",
    (nixScope) =>
      createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
        operators.equal(
          nixScope.str,
          apply(
            nixScope.builtins["addDrvOutputDependencies"],
            apply(
              nixScope.builtins["unsafeDiscardOutputDependency"],
              nixScope.str,
            ),
          ),
        )
      )),
  );
  defGetter(
    nixScope,
    "addDrvOutputDependencies_idempotent",
    (nixScope) =>
      createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
        operators.equal(
          apply(nixScope.builtins["addDrvOutputDependencies"], nixScope.str),
          apply(
            nixScope.builtins["addDrvOutputDependencies"],
            apply(nixScope.builtins["addDrvOutputDependencies"], nixScope.str),
          ),
        )
      )),
  );
  defGetter(
    nixScope,
    "rules",
    (nixScope) =>
      createFunc(
        /*arg:*/ "str",
        null,
        {},
        (
          nixScope,
        ) => [
          apply(nixScope.etaRule, nixScope.str),
          apply(nixScope.almostEtaRule, nixScope.str),
          apply(nixScope.addDrvOutputDependencies_idempotent, nixScope.str),
        ],
      ),
  );
  return operators.listConcat(
    [
      operators.equal(nixScope["legit-context"], nixScope["desired-context"]),
      operators.equal(nixScope["reconstructed-path"], nixScope["combo-path"]),
      apply(nixScope.etaRule, "foo"),
      apply(nixScope.etaRule, nixScope.drv["foo"]["outPath"]),
    ],
    apply(apply(nixScope.builtins["concatMap"], nixScope.rules), [
      nixScope.drv["drvPath"],
      apply(
        nixScope.builtins["addDrvOutputDependencies"],
        nixScope.drv["drvPath"],
      ),
      apply(
        nixScope.builtins["unsafeDiscardOutputDependency"],
        nixScope.drv["drvPath"],
      ),
    ]),
  );
});
