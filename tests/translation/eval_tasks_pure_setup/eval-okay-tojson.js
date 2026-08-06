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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-tojson.nix";
const operators = runtime.operators;

export default apply(
  nixScope.builtins["toJSON"],
  mkThunk(() => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => (123n));
    defGetter(obj, "b", () => (-456n));
    defGetter(obj, "c", () => ("foo"));
    defGetter(obj, "d", () => ('foo\n"bar"'));
    defGetter(obj, "e", () => (true));
    defGetter(obj, "f", () => (false));
    defGetter(obj, "g", () => [1n, 2n, 3n]);
    defGetter(obj, "h", () => ["a", [
      "b",
      createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "foo\nbar", () => ({}));
        return obj;
      }),
    ]]);
    defGetter(obj, "i", () => (operators.add(1n, 2n)));
    defGetter(obj, "j", () => (1.44));
    defGetter(obj, "k", () => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "__toString",
        () => (createFunc(/*arg:*/ "self", null, {}, nixScope, (nixScope) => (
          nixScope.self["a"]
        ))),
      );
      defGetter(obj, "a", () => ("foo"));
      return obj;
    })));
    return obj;
  }))),
);
