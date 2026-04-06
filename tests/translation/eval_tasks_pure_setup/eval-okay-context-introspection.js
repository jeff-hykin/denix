import {
  createRuntime,
  InterpolatedString,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
      nixScope.derivation(
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
        obj[
          new InterpolatedString(["", ""], [
            () => (nixScope.builtins["unsafeDiscardStringContext"](
              nixScope.path,
            )),
          ])
        ] = { "path": true };
        obj[
          new InterpolatedString(["", ""], [
            () => (nixScope.builtins["unsafeDiscardStringContext"](
              nixScope.drv["drvPath"],
            )),
          ])
        ] = { "outputs": ["foo", "out"], "allOutputs": true };
        return obj;
      }),
  );
  defGetter(
    nixScope,
    "legit-context",
    (nixScope) => nixScope.builtins["getContext"](nixScope["combo-path"]),
  );
  defGetter(
    nixScope,
    "reconstructed-path",
    (nixScope) =>
      nixScope.builtins["appendContext"](
        nixScope.builtins["unsafeDiscardStringContext"](nixScope["combo-path"]),
      )(nixScope["desired-context"]),
  );
  defGetter(
    nixScope,
    "etaRule",
    (nixScope) =>
      createFunc(/*arg:*/ "str", null, {}, (nixScope) => (
        operators.equal(
          nixScope.str,
          nixScope.builtins["appendContext"](
            nixScope.builtins["unsafeDiscardStringContext"](nixScope.str),
          )(nixScope.builtins["getContext"](nixScope.str)),
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
          nixScope.builtins["addDrvOutputDependencies"](
            nixScope.builtins["unsafeDiscardOutputDependency"](nixScope.str),
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
          nixScope.builtins["addDrvOutputDependencies"](nixScope.str),
          nixScope.builtins["addDrvOutputDependencies"](
            nixScope.builtins["addDrvOutputDependencies"](nixScope.str),
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
          nixScope.etaRule(nixScope.str),
          nixScope.almostEtaRule(nixScope.str),
          nixScope.addDrvOutputDependencies_idempotent(nixScope.str),
        ],
      ),
  );
  return operators.listConcat(
    [
      operators.equal(nixScope["legit-context"], nixScope["desired-context"]),
      operators.equal(nixScope["reconstructed-path"], nixScope["combo-path"]),
      nixScope.etaRule("foo"),
      nixScope.etaRule(nixScope.drv["foo"]["outPath"]),
    ],
    nixScope.builtins["concatMap"](nixScope.rules)([
      nixScope.drv["drvPath"],
      nixScope.builtins["addDrvOutputDependencies"](nixScope.drv["drvPath"]),
      nixScope.builtins["unsafeDiscardOutputDependency"](
        nixScope.drv["drvPath"],
      ),
    ]),
  );
});
