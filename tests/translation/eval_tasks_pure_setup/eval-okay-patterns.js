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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-patterns.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "f",
    (
      nixScope,
    ) => (createFunc(
      {},
      "args",
      { args: { "x": false, "y": false, "z": false } },
      nixScope,
      (nixScope) => (
        operators.add(operators.add(nixScope.x, nixScope.args["y"]), nixScope.z)
      ),
    )),
  );
  defGetter(
    nixScope,
    "g",
    (
      nixScope,
    ) => (createFunc(
      {},
      "args",
      { args: { "x": false, "y": false, "z": false } },
      nixScope,
      (nixScope) => (
        apply(nixScope.f, mkThunk(() => (nixScope.args)))
      ),
    )),
  );
  defGetter(
    nixScope,
    "h",
    (
      nixScope,
    ) => (createFunc(
      {
        "x": (nixScope) => ("d"),
        "y": (nixScope) => (nixScope.x),
        "z": (nixScope) => (nixScope.args["x"]),
      },
      "args",
      { args: { "x": true, "y": true, "z": true } },
      nixScope,
      (nixScope) => (
        operators.add(operators.add(nixScope.x, nixScope.y), nixScope.z)
      ),
    )),
  );
  defGetter(
    nixScope,
    "j",
    (
      nixScope,
    ) => (createFunc(
      {},
      null,
      { args: { "x": false, "y": false, "z": false }, ellipsis: true },
      nixScope,
      (nixScope) => (
        operators.add(operators.add(nixScope.x, nixScope.y), nixScope.z)
      ),
    )),
  );
  return operators.add(
    operators.add(
      operators.add(
        operators.add(
          apply(
            nixScope.f,
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "x", () => ("a"));
              defGetter(obj, "y", () => ("b"));
              defGetter(obj, "z", () => ("c"));
              return obj;
            }))),
          ),
          apply(
            nixScope.g,
            mkThunk(() => (createScope(nixScope, (nixScope) => {
              const obj = {};
              defGetter(obj, "x", () => ("x"));
              defGetter(obj, "y", () => ("y"));
              defGetter(obj, "z", () => ("z"));
              return obj;
            }))),
          ),
        ),
        apply(
          nixScope.h,
          mkThunk(() => (createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "x", () => ("D"));
            return obj;
          }))),
        ),
      ),
      apply(
        nixScope.h,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => ("D"));
          defGetter(obj, "y", () => ("E"));
          defGetter(obj, "z", () => ("F"));
          return obj;
        }))),
      ),
    ),
    apply(
      nixScope.j,
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "x", () => ("i"));
        defGetter(obj, "y", () => ("j"));
        defGetter(obj, "z", () => ("k"));
        defGetter(obj, "bla", () => ("bla"));
        defGetter(obj, "foo", () => ("bar"));
        return obj;
      }))),
    ),
  );
});
