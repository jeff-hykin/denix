import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-substring.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      nixScope.s = "foobar";
      return operators.add(
        operators.add(
          operators.add(
            operators.add(
              operators.add(
                operators.add(
                  operators.add(
                    operators.add(
                      operators.add(
                        operators.add(
                          operators.add(
                            operators.add(
                              operators.add(
                                operators.add(
                                  nixScope.substring(1n)(2n)(nixScope.s),
                                  "x",
                                ),
                                nixScope.substring(0n)(
                                  nixScope.stringLength(nixScope.s),
                                )(nixScope.s),
                              ),
                              "y",
                            ),
                            nixScope.substring(3n)(100n)(nixScope.s),
                          ),
                          "z",
                        ),
                        nixScope.substring(2n)(
                          nixScope.sub(nixScope.stringLength(nixScope.s))(3n),
                        )(nixScope.s),
                      ),
                      "a",
                    ),
                    nixScope.substring(3n)(0n)(nixScope.s),
                  ),
                  "b",
                ),
                nixScope.substring(3n)(1n)(nixScope.s),
              ),
              "c",
            ),
            nixScope.substring(5n)(10n)("perl"),
          ),
          "_",
        ),
        nixScope.substring(3n)(-1n)("tebbad"),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
