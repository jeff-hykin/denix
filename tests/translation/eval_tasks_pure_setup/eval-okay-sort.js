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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-sort.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(
        apply(nixScope.sort, mkThunk(() => (nixScope.lessThan))),
        mkThunk(() => [483n, 249n, 526n, 147n, 42n, 77n]),
      ),
      apply(
        apply(
          nixScope.sort,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
                operators.lessThan(nixScope.y, nixScope.x)
              ))
            )))
          ),
        ),
        mkThunk(() => [483n, 249n, 526n, 147n, 42n, 77n]),
      ),
      apply(
        apply(nixScope.sort, mkThunk(() => (nixScope.lessThan))),
        mkThunk(() => ["foo", "bar", "xyzzy", "fnord"]),
      ),
      apply(
        apply(
          nixScope.sort,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
                operators.lessThan(nixScope.x["key"], nixScope.y["key"])
              ))
            )))
          ),
        ),
        mkThunk(() => [
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("fnord"));
            return obj;
          }),
        ]),
      ),
      apply(
        apply(
          nixScope.sort,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
                operators.lessThan(nixScope.x["key"], nixScope.y["key"])
              ))
            )))
          ),
        ),
        mkThunk(() => [
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo2"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar2"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar3"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar4"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo3"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (3n));
            defGetter(obj, "value", () => ("baz"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (3n));
            defGetter(obj, "value", () => ("baz2"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo4"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (3n));
            defGetter(obj, "value", () => ("baz3"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo5"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo6"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (2n));
            defGetter(obj, "value", () => ("bar5"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (3n));
            defGetter(obj, "value", () => ("baz4"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo7"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (4n));
            defGetter(obj, "value", () => ("biz1"));
            return obj;
          }),
          createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "key", () => (1n));
            defGetter(obj, "value", () => ("foo8"));
            return obj;
          }),
        ]),
      ),
      apply(
        apply(nixScope.sort, mkThunk(() => (nixScope.lessThan))),
        mkThunk(
          () => [[1n, 6n], [], [2n, 3n], [3n], [1n, 5n], [2n], [1n], [], [
            1n,
            4n,
          ], [3n]]
        ),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
