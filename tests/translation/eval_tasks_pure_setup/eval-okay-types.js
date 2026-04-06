import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      apply(nixScope.isNull, null),
      apply(
        nixScope.isNull,
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        )),
      ),
      apply(
        nixScope.isFunction,
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        )),
      ),
      apply(nixScope.isFunction, "fnord"),
      apply(nixScope.isString, operators.add("foo", "bar")),
      apply(nixScope.isString, ["x"]),
      apply(nixScope.isInt, operators.add(1n, 2n)),
      apply(nixScope.isInt, { "x": 123n }),
      apply(nixScope.isInt, operators.divide(1n, 2n)),
      apply(nixScope.isInt, operators.add(1n, 1n)),
      apply(nixScope.isInt, operators.divide(1n, 2n)),
      apply(nixScope.isInt, operators.multiply(1n, 2n)),
      apply(nixScope.isInt, operators.subtract(1n, 2n)),
      apply(nixScope.isFloat, 1.2),
      apply(nixScope.isFloat, operators.add(1n, 1.0)),
      apply(nixScope.isFloat, operators.divide(1n, 2.0)),
      apply(nixScope.isFloat, operators.multiply(1n, 2.0)),
      apply(nixScope.isFloat, operators.subtract(1n, 2.0)),
      apply(nixScope.isBool, operators.and(true, false)),
      apply(nixScope.isBool, null),
      apply(nixScope.isPath, new Path(["/nix/store"], [])),
      apply(nixScope.isPath, new Path(["./."], [])),
      apply(nixScope.isAttrs, { "x": 123n }),
      apply(nixScope.isAttrs, null),
      apply(nixScope.typeOf, operators.multiply(3n, 4n)),
      apply(nixScope.typeOf, true),
      apply(nixScope.typeOf, "xyzzy"),
      apply(nixScope.typeOf, null),
      apply(nixScope.typeOf, { "x": 456n }),
      apply(nixScope.typeOf, [1n, 2n, 3n]),
      apply(
        nixScope.typeOf,
        createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        )),
      ),
      apply(
        nixScope.typeOf,
        apply(
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              nixScope.x
            ))
          )),
          1n,
        ),
      ),
      apply(nixScope.typeOf, nixScope.map),
      apply(
        nixScope.typeOf,
        apply(
          nixScope.map,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x
          )),
        ),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
