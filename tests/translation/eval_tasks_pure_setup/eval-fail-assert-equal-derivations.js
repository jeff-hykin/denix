import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-assert-equal-derivations.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error(
      "assertion failed: " + '{\n    foo = {\n      type = "derivation"',
    );
  }
  return nixScope.throw("unreachable");
})(
  operators.equal(
    {
      "foo": {
        "type": "derivation",
        "outPath": "/nix/store/0",
        "ignored": nixScope.abort("not ignored"),
      },
    },
    {
      "foo": {
        "type": "derivation",
        "outPath": "/nix/store/1",
        "ignored": nixScope.abort("not ignored"),
      },
    },
  ),
);
