import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
                                  apply(
                                    apply(apply(nixScope.substring, 1n), 2n),
                                    nixScope.s,
                                  ),
                                  "x",
                                ),
                                apply(
                                  apply(
                                    apply(nixScope.substring, 0n),
                                    apply(nixScope.stringLength, nixScope.s),
                                  ),
                                  nixScope.s,
                                ),
                              ),
                              "y",
                            ),
                            apply(
                              apply(apply(nixScope.substring, 3n), 100n),
                              nixScope.s,
                            ),
                          ),
                          "z",
                        ),
                        apply(
                          apply(
                            apply(nixScope.substring, 2n),
                            apply(
                              apply(
                                nixScope.sub,
                                apply(nixScope.stringLength, nixScope.s),
                              ),
                              3n,
                            ),
                          ),
                          nixScope.s,
                        ),
                      ),
                      "a",
                    ),
                    apply(apply(apply(nixScope.substring, 3n), 0n), nixScope.s),
                  ),
                  "b",
                ),
                apply(apply(apply(nixScope.substring, 3n), 1n), nixScope.s),
              ),
              "c",
            ),
            apply(apply(apply(nixScope.substring, 5n), 10n), "perl"),
          ),
          "_",
        ),
        apply(apply(apply(nixScope.substring, 3n), -1n), "tebbad"),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
