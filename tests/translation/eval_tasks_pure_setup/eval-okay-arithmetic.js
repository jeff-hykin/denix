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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-arithmetic.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      nixScope.x = 12n;
      defGetter(
        nixScope,
        "err",
        (nixScope) => apply(nixScope.abort, mkThunk(() => ("urgh"))),
      );
      return apply(
        nixScope.sum,
        mkThunk(
          () => [
            apply(
              nixScope.sum,
              mkThunk(
                () => (apply(
                  apply(nixScope.range, mkThunk(() => (1n))),
                  mkThunk(() => (50n)),
                ))
              ),
            ),
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
              operators.add(
                3n,
                operators.multiply(
                  4n,
                  apply(
                    apply(nixScope.const, mkThunk(() => (5n))),
                    mkThunk(() => (0n)),
                  ),
                ),
              ),
              operators.divide(6n, apply(nixScope.id, mkThunk(() => (2n)))),
            ),
            apply(
              apply(nixScope.builtins["bitAnd"], mkThunk(() => (12n))),
              mkThunk(() => (10n)),
            ),
            apply(
              apply(nixScope.builtins["bitOr"], mkThunk(() => (12n))),
              mkThunk(() => (10n)),
            ),
            apply(
              apply(nixScope.builtins["bitXor"], mkThunk(() => (12n))),
              mkThunk(() => (10n)),
            ),
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
              operators.lessThan(
                operators.add(1n, operators.multiply(2n, 3n)),
                7n,
              ),
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
          ]
        ),
      );
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
