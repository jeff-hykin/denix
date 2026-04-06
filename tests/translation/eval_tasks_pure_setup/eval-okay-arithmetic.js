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
    return /*let*/ createScope((nixScope) => {
      nixScope.x = 12n;
      defGetter(nixScope, "err", (nixScope) => nixScope.abort("urgh"));
      return nixScope.sum([
        nixScope.sum(nixScope.range(1n)(50n)),
        operators.add(123n, 456n),
        operators.add(
          operators.add(operators.add(0n, -10n), operators.negative(-11n)),
          operators.negative(nixScope.x),
        ),
        operators.subtract(operators.subtract(10n, 7n), -2n),
        operators.subtract(10n, operators.subtract(6n, -1n)),
        operators.add(operators.subtract(10n, 1n), 2n),
        operators.multiply(operators.multiply(3n, 4n), 5n),
        operators.divide(operators.divide(56088n, 123n), 2n),
        operators.subtract(
          operators.add(3n, operators.multiply(4n, nixScope.const(5n)(0n))),
          operators.divide(6n, nixScope.id(2n)),
        ),
        nixScope.builtins["bitAnd"](12n)(10n),
        nixScope.builtins["bitOr"](12n)(10n),
        nixScope.builtins["bitXor"](12n)(10n),
        operators.ifThenElse(
          operators.lessThan(3n, 7n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.lessThan(7n, 3n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.lessThan(3n, 3n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.lessThanOrEqual(3n, 7n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.lessThanOrEqual(7n, 3n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.lessThanOrEqual(3n, 3n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.greaterThan(3n, 7n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.greaterThan(7n, 3n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.greaterThan(3n, 3n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.greaterThanOrEqual(3n, 7n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.greaterThanOrEqual(7n, 3n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.greaterThanOrEqual(3n, 3n),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.equal(
            operators.greaterThan(2n, 1n),
            operators.lessThan(1n, 2n),
          ),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.greaterThanOrEqual(
            operators.add(1n, operators.multiply(2n, 3n)),
            7n,
          ),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.lessThan(operators.add(1n, operators.multiply(2n, 3n)), 7n),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.lessThan("aa", "ab"),
          () => (1n),
          () => (nixScope.err),
        ),
        operators.ifThenElse(
          operators.lessThan("aa", "aa"),
          () => (nixScope.err),
          () => (1n),
        ),
        operators.ifThenElse(
          operators.lessThan("foo", "foobar"),
          () => (1n),
          () => (nixScope.err),
        ),
      ]);
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
