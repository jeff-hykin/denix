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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-types.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(nixScope.isNull, mkThunk(() => (null))),
      apply(
        nixScope.isNull,
        mkThunk(
          () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            nixScope.x
          )))
        ),
      ),
      apply(
        nixScope.isFunction,
        mkThunk(
          () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            nixScope.x
          )))
        ),
      ),
      apply(nixScope.isFunction, mkThunk(() => ("fnord"))),
      apply(nixScope.isString, mkThunk(() => (operators.add("foo", "bar")))),
      apply(nixScope.isString, mkThunk(() => ["x"])),
      apply(nixScope.isInt, mkThunk(() => (operators.add(1n, 2n)))),
      apply(
        nixScope.isInt,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (123n));
          return obj;
        }))),
      ),
      apply(nixScope.isInt, mkThunk(() => (operators.divide(1n, 2n)))),
      apply(nixScope.isInt, mkThunk(() => (operators.add(1n, 1n)))),
      apply(nixScope.isInt, mkThunk(() => (operators.divide(1n, 2n)))),
      apply(nixScope.isInt, mkThunk(() => (operators.multiply(1n, 2n)))),
      apply(nixScope.isInt, mkThunk(() => (operators.subtract(1n, 2n)))),
      apply(nixScope.isFloat, mkThunk(() => (1.2))),
      apply(nixScope.isFloat, mkThunk(() => (operators.add(1n, 1.0)))),
      apply(nixScope.isFloat, mkThunk(() => (operators.divide(1n, 2.0)))),
      apply(nixScope.isFloat, mkThunk(() => (operators.multiply(1n, 2.0)))),
      apply(nixScope.isFloat, mkThunk(() => (operators.subtract(1n, 2.0)))),
      apply(nixScope.isBool, mkThunk(() => ((true) && (false)))),
      apply(nixScope.isBool, mkThunk(() => (null))),
      apply(nixScope.isPath, mkThunk(() => (new Path(["/nix/store"], [])))),
      apply(
        nixScope.isPath,
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
          ], []))
        ),
      ),
      apply(
        nixScope.isAttrs,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (123n));
          return obj;
        }))),
      ),
      apply(nixScope.isAttrs, mkThunk(() => (null))),
      apply(nixScope.typeOf, mkThunk(() => (operators.multiply(3n, 4n)))),
      apply(nixScope.typeOf, mkThunk(() => (true))),
      apply(nixScope.typeOf, mkThunk(() => ("xyzzy"))),
      apply(nixScope.typeOf, mkThunk(() => (null))),
      apply(
        nixScope.typeOf,
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "x", () => (456n));
          return obj;
        }))),
      ),
      apply(nixScope.typeOf, mkThunk(() => [1n, 2n, 3n])),
      apply(
        nixScope.typeOf,
        mkThunk(
          () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
            nixScope.x
          )))
        ),
      ),
      apply(
        nixScope.typeOf,
        mkThunk(
          () => (apply(
            createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
                nixScope.x
              ))
            )),
            mkThunk(() => (1n)),
          ))
        ),
      ),
      apply(nixScope.typeOf, mkThunk(() => (nixScope.map))),
      apply(
        nixScope.typeOf,
        mkThunk(
          () => (apply(
            nixScope.map,
            mkThunk(
              () => (createFunc(
                /*arg:*/ "x",
                null,
                {},
                nixScope,
                (nixScope) => (
                  nixScope.x
                ),
              ))
            ),
          ))
        ),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
