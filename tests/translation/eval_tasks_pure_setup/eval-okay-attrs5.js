import {
  createRuntime,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrs5.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "as",
        (nixScope) => (createScope(nixScope, (nixScope) => {
          const obj = {};
          set(obj, ["x", "y", "z"], () => (123n));
          set(obj, ["a", "b", "c"], () => (456n));
          return obj;
        })),
      );
      defGetter(
        nixScope,
        "bs",
        (nixScope) => (createScope(nixScope, (nixScope) => {
          const obj = {};
          set(obj, ["f-o-o", "bar"], () => ("foo"));
          return obj;
        })),
      );
      defGetter(
        nixScope,
        "or",
        (
          nixScope,
        ) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
            (nixScope.x) || (nixScope.y)
          ))
        ))),
      );
      return [
        nixScope.as["x"]["y"]["z"],
        operators.selectOrDefault(nixScope.as, ["foo"], mkThunk(() => ("foo"))),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          mkThunk(() => (nixScope.as["a"]["b"]["c"])),
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["a", "b", "c"],
          mkThunk(() => (nixScope.as["x"]["y"]["z"])),
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          mkThunk(
            () => (operators.selectOrDefault(
              nixScope.bs,
              ["f-o-o", "bar"],
              mkThunk(() => ("xyzzy")),
            ))
          ),
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          mkThunk(
            () => (operators.selectOrDefault(
              nixScope.bs,
              ["bar", "foo"],
              mkThunk(() => ("xyzzy")),
            ))
          ),
        ),
        operators.selectOrDefault(
          123n,
          ["bla"],
          mkThunk(
            () => (operators.selectOrDefault(
              null,
              ["foo"],
              mkThunk(() => ("xyzzy")),
            ))
          ),
        ),
        apply(
          apply(
            apply(nixScope.fold, mkThunk(() => (nixScope.or))),
            mkThunk(() => []),
          ),
          mkThunk(() => [true, false, false]),
        ),
      ];
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(
  runtime.withScope(
    nixScope,
    () => (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
        ], []))
      ),
    )),
  ),
);
