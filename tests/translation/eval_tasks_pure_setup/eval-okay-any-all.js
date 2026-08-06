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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-any-all.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(
        apply(
          nixScope.any,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => []),
      ),
      apply(
        apply(
          nixScope.any,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [2n, 3n, 4n]),
      ),
      apply(
        apply(
          nixScope.any,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [1n, 2n, 3n, 4n]),
      ),
      apply(
        apply(
          nixScope.any,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [4n, 3n, 2n, 1n]),
      ),
      apply(
        apply(
          nixScope.all,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => []),
      ),
      apply(
        apply(
          nixScope.all,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [1n]),
      ),
      apply(
        apply(
          nixScope.all,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [1n, 2n, 3n]),
      ),
      apply(
        apply(
          nixScope.all,
          mkThunk(
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              operators.equal(nixScope.x, 1n)
            )))
          ),
        ),
        mkThunk(() => [1n, 1n, 1n]),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
