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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-substring.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(nixScope, "s", (nixScope) => ("foobar"));
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
                                    apply(
                                      apply(
                                        nixScope.substring,
                                        mkThunk(() => (1n)),
                                      ),
                                      mkThunk(() => (2n)),
                                    ),
                                    mkThunk(() => (nixScope.s)),
                                  ),
                                  "x",
                                ),
                                apply(
                                  apply(
                                    apply(
                                      nixScope.substring,
                                      mkThunk(() => (0n)),
                                    ),
                                    mkThunk(
                                      () => (apply(
                                        nixScope.stringLength,
                                        mkThunk(() => (nixScope.s)),
                                      ))
                                    ),
                                  ),
                                  mkThunk(() => (nixScope.s)),
                                ),
                              ),
                              "y",
                            ),
                            apply(
                              apply(
                                apply(nixScope.substring, mkThunk(() => (3n))),
                                mkThunk(() => (100n)),
                              ),
                              mkThunk(() => (nixScope.s)),
                            ),
                          ),
                          "z",
                        ),
                        apply(
                          apply(
                            apply(nixScope.substring, mkThunk(() => (2n))),
                            mkThunk(
                              () => (apply(
                                apply(
                                  nixScope.sub,
                                  mkThunk(
                                    () => (apply(
                                      nixScope.stringLength,
                                      mkThunk(() => (nixScope.s)),
                                    ))
                                  ),
                                ),
                                mkThunk(() => (3n)),
                              ))
                            ),
                          ),
                          mkThunk(() => (nixScope.s)),
                        ),
                      ),
                      "a",
                    ),
                    apply(
                      apply(
                        apply(nixScope.substring, mkThunk(() => (3n))),
                        mkThunk(() => (0n)),
                      ),
                      mkThunk(() => (nixScope.s)),
                    ),
                  ),
                  "b",
                ),
                apply(
                  apply(
                    apply(nixScope.substring, mkThunk(() => (3n))),
                    mkThunk(() => (1n)),
                  ),
                  mkThunk(() => (nixScope.s)),
                ),
              ),
              "c",
            ),
            apply(
              apply(
                apply(nixScope.substring, mkThunk(() => (5n))),
                mkThunk(() => (10n)),
              ),
              mkThunk(() => ("perl")),
            ),
          ),
          "_",
        ),
        apply(
          apply(
            apply(nixScope.substring, mkThunk(() => (3n))),
            mkThunk(() => (-1n)),
          ),
          mkThunk(() => ("tebbad")),
        ),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
