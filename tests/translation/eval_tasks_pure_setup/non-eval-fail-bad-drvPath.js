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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/non-eval-fail-bad-drvPath.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "package",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "type", () => ("derivation"));
      defGetter(obj, "name", () => ("cachix-1.7.3"));
      defGetter(obj, "system", () => (nixScope.builtins["currentSystem"]));
      defGetter(obj, "outputs", () => ["out"]);
      defGetter(
        obj,
        "drvPath",
        () => (new InterpolatedString([
          "",
          "/2chwzswhhmpxbgc981i2vcz7xj4d1in9-cachix-1.7.3-bin",
        ], [() => (nixScope.builtins["storeDir"])])),
      );
      defGetter(obj, "outputName", () => ("out"));
      defGetter(
        obj,
        "outPath",
        () => (new InterpolatedString([
          "",
          "/2chwzswhhmpxbgc981i2vcz7xj4d1in9-cachix-1.7.3-bin",
        ], [() => (nixScope.builtins["storeDir"])])),
      );
      defGetter(obj, "out", () => (nixScope.package));
      return obj;
    })),
  );
  return nixScope.package;
});
