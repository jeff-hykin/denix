import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
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
      nixScope.isNull(null),
      nixScope.isNull(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      ))),
      nixScope.isFunction(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      ))),
      nixScope.isFunction("fnord"),
      nixScope.isString(operators.add("foo", "bar")),
      nixScope.isString(["x"]),
      nixScope.isInt(operators.add(1n, 2n)),
      nixScope.isInt({ "x": 123n }),
      nixScope.isInt(operators.divide(1n, 2n)),
      nixScope.isInt(operators.add(1n, 1n)),
      nixScope.isInt(operators.divide(1n, 2n)),
      nixScope.isInt(operators.multiply(1n, 2n)),
      nixScope.isInt(operators.subtract(1n, 2n)),
      nixScope.isFloat(1.2),
      nixScope.isFloat(operators.add(1n, 1.0)),
      nixScope.isFloat(operators.divide(1n, 2.0)),
      nixScope.isFloat(operators.multiply(1n, 2.0)),
      nixScope.isFloat(operators.subtract(1n, 2.0)),
      nixScope.isBool(operators.and(true, false)),
      nixScope.isBool(null),
      nixScope.isPath(new Path(["/nix/store"], [])),
      nixScope.isPath(new Path(["./."], [])),
      nixScope.isAttrs({ "x": 123n }),
      nixScope.isAttrs(null),
      nixScope.typeOf(operators.multiply(3n, 4n)),
      nixScope.typeOf(true),
      nixScope.typeOf("xyzzy"),
      nixScope.typeOf(null),
      nixScope.typeOf({ "x": 456n }),
      nixScope.typeOf([1n, 2n, 3n]),
      nixScope.typeOf(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        nixScope.x
      ))),
      nixScope.typeOf((createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          nixScope.x
        ))
      )))(1n)),
      nixScope.typeOf(nixScope.map),
      nixScope.typeOf(
        nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
          nixScope.x
        ))),
      ),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
