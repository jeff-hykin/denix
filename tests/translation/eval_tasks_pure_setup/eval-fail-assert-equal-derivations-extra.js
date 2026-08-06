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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-equal-derivations-extra.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error(
      "assertion failed: " + '{\n    foo = {\n      type = "derivation"',
    );
  }
  return apply(nixScope.throw, mkThunk(() => ("unreachable")));
})(operators.equal(
  createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "foo", () => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "type", () => ("derivation"));
      defGetter(obj, "outPath", () => ("/nix/store/0"));
      return obj;
    })));
    return obj;
  }),
  createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "foo", () => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "type", () => ("derivation"));
      defGetter(obj, "outPath", () => ("/nix/store/1"));
      defGetter(obj, "devious", () => (true));
      return obj;
    })));
    return obj;
  }),
));
