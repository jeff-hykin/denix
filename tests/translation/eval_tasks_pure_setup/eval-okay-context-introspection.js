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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-context-introspection.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "drv",
    (
      nixScope,
    ) => (apply(
      nixScope.derivation,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "name", () => ("fail"));
        defGetter(obj, "builder", () => ("/bin/false"));
        defGetter(obj, "system", () => ("x86_64-linux"));
        defGetter(obj, "outputs", () => ["out", "foo"]);
        return obj;
      }))),
    )),
  );
  defGetter(
    nixScope,
    "path",
    (
      nixScope,
    ) => (new InterpolatedString(["", ""], [
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-context-introspection.nix",
      ], [])),
    ])),
  );
  defGetter(
    nixScope,
    "desired-context",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      set(obj, [
        new InterpolatedString(["", ""], [
          () => (apply(
            nixScope.builtins["unsafeDiscardStringContext"],
            mkThunk(() => (nixScope.path)),
          )),
        ]),
      ], () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "path", () => (true));
        return obj;
      })));
      set(obj, [
        new InterpolatedString(["", ""], [
          () => (apply(
            nixScope.builtins["unsafeDiscardStringContext"],
            mkThunk(() => (nixScope.drv["drvPath"])),
          )),
        ]),
      ], () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "outputs", () => ["foo", "out"]);
        defGetter(obj, "allOutputs", () => (true));
        return obj;
      })));
      return obj;
    })),
  );
  defGetter(
    nixScope,
    "combo-path",
    (
      nixScope,
    ) => (new InterpolatedString(["", "", "", "", ""], [
      () => (nixScope.path),
      () => (nixScope.drv["outPath"]),
      () => (nixScope.drv["foo"]["outPath"]),
      () => (nixScope.drv["drvPath"]),
    ])),
  );
  defGetter(
    nixScope,
    "legit-context",
    (
      nixScope,
    ) => (apply(
      nixScope.builtins["getContext"],
      mkThunk(() => (nixScope["combo-path"])),
    )),
  );
  defGetter(
    nixScope,
    "reconstructed-path",
    (
      nixScope,
    ) => (apply(
      apply(
        nixScope.builtins["appendContext"],
        mkThunk(
          () => (apply(
            nixScope.builtins["unsafeDiscardStringContext"],
            mkThunk(() => (nixScope["combo-path"])),
          ))
        ),
      ),
      mkThunk(() => (nixScope["desired-context"])),
    )),
  );
  defGetter(
    nixScope,
    "etaRule",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "str", null, {}, nixScope, (nixScope) => (
      operators.equal(
        nixScope.str,
        apply(
          apply(
            nixScope.builtins["appendContext"],
            mkThunk(
              () => (apply(
                nixScope.builtins["unsafeDiscardStringContext"],
                mkThunk(() => (nixScope.str)),
              ))
            ),
          ),
          mkThunk(
            () => (apply(
              nixScope.builtins["getContext"],
              mkThunk(() => (nixScope.str)),
            ))
          ),
        ),
      )
    ))),
  );
  defGetter(
    nixScope,
    "almostEtaRule",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "str", null, {}, nixScope, (nixScope) => (
      operators.equal(
        nixScope.str,
        apply(
          nixScope.builtins["addDrvOutputDependencies"],
          mkThunk(
            () => (apply(
              nixScope.builtins["unsafeDiscardOutputDependency"],
              mkThunk(() => (nixScope.str)),
            ))
          ),
        ),
      )
    ))),
  );
  defGetter(
    nixScope,
    "addDrvOutputDependencies_idempotent",
    (
      nixScope,
    ) => (createFunc(/*arg:*/ "str", null, {}, nixScope, (nixScope) => (
      operators.equal(
        apply(
          nixScope.builtins["addDrvOutputDependencies"],
          mkThunk(() => (nixScope.str)),
        ),
        apply(
          nixScope.builtins["addDrvOutputDependencies"],
          mkThunk(
            () => (apply(
              nixScope.builtins["addDrvOutputDependencies"],
              mkThunk(() => (nixScope.str)),
            ))
          ),
        ),
      )
    ))),
  );
  defGetter(
    nixScope,
    "rules",
    (
      nixScope,
    ) => (createFunc(
      /*arg:*/ "str",
      null,
      {},
      nixScope,
      (
        nixScope,
      ) => [
        apply(nixScope.etaRule, mkThunk(() => (nixScope.str))),
        apply(nixScope.almostEtaRule, mkThunk(() => (nixScope.str))),
        apply(
          nixScope.addDrvOutputDependencies_idempotent,
          mkThunk(() => (nixScope.str)),
        ),
      ],
    )),
  );
  return operators.listConcat(
    [
      operators.equal(nixScope["legit-context"], nixScope["desired-context"]),
      operators.equal(nixScope["reconstructed-path"], nixScope["combo-path"]),
      apply(nixScope.etaRule, mkThunk(() => ("foo"))),
      apply(nixScope.etaRule, mkThunk(() => (nixScope.drv["foo"]["outPath"]))),
    ],
    apply(
      apply(nixScope.builtins["concatMap"], mkThunk(() => (nixScope.rules))),
      mkThunk(
        () => [
          nixScope.drv["drvPath"],
          apply(
            nixScope.builtins["addDrvOutputDependencies"],
            mkThunk(() => (nixScope.drv["drvPath"])),
          ),
          apply(
            nixScope.builtins["unsafeDiscardOutputDependency"],
            mkThunk(() => (nixScope.drv["drvPath"])),
          ),
        ]
      ),
    ),
  );
});
