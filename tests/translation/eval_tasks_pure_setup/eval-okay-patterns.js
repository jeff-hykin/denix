import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-patterns.nix";
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "f",
    (nixScope) =>
      createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
        operators.add(operators.add(nixScope.x, nixScope.args["y"]), nixScope.z)
      )),
  );
  defGetter(
    nixScope,
    "g",
    (nixScope) =>
      createFunc({}, "args", {}, (nixScope) => (
        nixScope.f(nixScope.args)
      )),
  );
  defGetter(
    nixScope,
    "h",
    (nixScope) =>
      createFunc(
        {
          "x": (nixScope) => ("d"),
          "y": (nixScope) => (nixScope.x),
          "z": (nixScope) => (nixScope.args["x"]),
        },
        "args",
        {},
        (nixScope) => (
          operators.add(operators.add(nixScope.x, nixScope.y), nixScope.z)
        ),
      ),
  );
  defGetter(
    nixScope,
    "j",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        operators.add(operators.add(nixScope.x, nixScope.y), nixScope.z)
      )),
  );
  return operators.add(
    operators.add(
      operators.add(
        operators.add(
          nixScope.f({ "x": "a", "y": "b", "z": "c" }),
          nixScope.g({ "x": "x", "y": "y", "z": "z" }),
        ),
        nixScope.h({ "x": "D" }),
      ),
      nixScope.h({ "x": "D", "y": "E", "z": "F" }),
    ),
    nixScope.j({ "x": "i", "y": "j", "z": "k", "bla": "bla", "foo": "bar" }),
  );
});
