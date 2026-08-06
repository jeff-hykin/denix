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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regex-match.nix";
const operators = runtime.operators;

export default ((nixScope) => {
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope(nixScope, (nixScope) => {
      defGetter(
        nixScope,
        "matches",
        (
          nixScope,
        ) => (createFunc(/*arg:*/ "pat", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "s", null, {}, nixScope, (nixScope) => (
            operators.notEqual(
              apply(
                apply(nixScope.match, mkThunk(() => (nixScope.pat))),
                mkThunk(() => (nixScope.s)),
              ),
              null,
            )
          ))
        ))),
      );
      defGetter(
        nixScope,
        "splitFN",
        (
          nixScope,
        ) => (apply(
          nixScope.match,
          mkThunk(() => ("((.*)/)?([^/]*)\\.(nix|cc)")),
        )),
      );
      return ((_cond) => {
        if (!_cond) {
          throw new Error("assertion failed: " + 'matches "foobar" "foobar"');
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'matches "fo*" "f"');
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error("assertion failed: " + '!matches "fo+" "f"');
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error("assertion failed: " + 'matches "fo*" "fo"');
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error("assertion failed: " + 'matches "fo*" "foo"');
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " + 'matches "fo+" "foo"',
                    );
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " + 'matches "fo{1,2}" "foo"',
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " + '!matches "fo{1,2}" "fooo"',
                        );
                      }
                      return ((_cond) => {
                        if (!_cond) {
                          throw new Error(
                            "assertion failed: " + '!matches "fo*" "foobar"',
                          );
                        }
                        return ((_cond) => {
                          if (!_cond) {
                            throw new Error(
                              "assertion failed: " +
                                'matches "[[:space:]]+([^[:space:]]+)[[:space:]]+" "  foo   "',
                            );
                          }
                          return ((_cond) => {
                            if (!_cond) {
                              throw new Error(
                                "assertion failed: " +
                                  '!matches "[[:space:]]+([[:upper:]]+)[[:space:]]+" "  foo   "',
                              );
                            }
                            return ((_cond) => {
                              if (!_cond) {
                                throw new Error(
                                  "assertion failed: " +
                                    'match "(.*)\\\\.nix" "foobar.nix" == [ "foobar" ]',
                                );
                              }
                              return ((_cond) => {
                                if (!_cond) {
                                  throw new Error(
                                    "assertion failed: " +
                                      'match "[[:space:]]+([[:upper:]]+)[[:space:]]+" "  FOO   " == [ "FOO" ]',
                                  );
                                }
                                return ((_cond) => {
                                  if (!_cond) {
                                    throw new Error(
                                      "assertion failed: " +
                                        'splitFN "/path/to/foobar.nix" == [\n    "/path/to/"\n    "/path/to"\n    "foobar"\n    "nix"\n  ]',
                                    );
                                  }
                                  return ((_cond) => {
                                    if (!_cond) {
                                      throw new Error(
                                        "assertion failed: " +
                                          'splitFN "foobar.cc" == [\n    null\n    null\n    "foobar"\n    "cc"\n  ]',
                                      );
                                    }
                                    return true;
                                  })(
                                    operators.equal(
                                      apply(
                                        nixScope.splitFN,
                                        mkThunk(() => ("foobar.cc")),
                                      ),
                                      [null, null, "foobar", "cc"],
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    apply(
                                      nixScope.splitFN,
                                      mkThunk(() => ("/path/to/foobar.nix")),
                                    ),
                                    ["/path/to/", "/path/to", "foobar", "nix"],
                                  ),
                                );
                              })(
                                operators.equal(
                                  apply(
                                    apply(
                                      nixScope.match,
                                      mkThunk(
                                        () => ("[[:space:]]+([[:upper:]]+)[[:space:]]+")
                                      ),
                                    ),
                                    mkThunk(() => ("  FOO   ")),
                                  ),
                                  ["FOO"],
                                ),
                              );
                            })(
                              operators.equal(
                                apply(
                                  apply(
                                    nixScope.match,
                                    mkThunk(() => ("(.*)\\.nix")),
                                  ),
                                  mkThunk(() => ("foobar.nix")),
                                ),
                                ["foobar"],
                              ),
                            );
                          })(
                            operators.negate(
                              apply(
                                apply(
                                  nixScope.matches,
                                  mkThunk(
                                    () => ("[[:space:]]+([[:upper:]]+)[[:space:]]+")
                                  ),
                                ),
                                mkThunk(() => ("  foo   ")),
                              ),
                            ),
                          );
                        })(
                          apply(
                            apply(
                              nixScope.matches,
                              mkThunk(
                                () => ("[[:space:]]+([^[:space:]]+)[[:space:]]+")
                              ),
                            ),
                            mkThunk(() => ("  foo   ")),
                          ),
                        );
                      })(
                        operators.negate(
                          apply(
                            apply(nixScope.matches, mkThunk(() => ("fo*"))),
                            mkThunk(() => ("foobar")),
                          ),
                        ),
                      );
                    })(
                      operators.negate(
                        apply(
                          apply(nixScope.matches, mkThunk(() => ("fo{1,2}"))),
                          mkThunk(() => ("fooo")),
                        ),
                      ),
                    );
                  })(
                    apply(
                      apply(nixScope.matches, mkThunk(() => ("fo{1,2}"))),
                      mkThunk(() => ("foo")),
                    ),
                  );
                })(
                  apply(
                    apply(nixScope.matches, mkThunk(() => ("fo+"))),
                    mkThunk(() => ("foo")),
                  ),
                );
              })(
                apply(
                  apply(nixScope.matches, mkThunk(() => ("fo*"))),
                  mkThunk(() => ("foo")),
                ),
              );
            })(
              apply(
                apply(nixScope.matches, mkThunk(() => ("fo*"))),
                mkThunk(() => ("fo")),
              ),
            );
          })(
            operators.negate(
              apply(
                apply(nixScope.matches, mkThunk(() => ("fo+"))),
                mkThunk(() => ("f")),
              ),
            ),
          );
        })(
          apply(
            apply(nixScope.matches, mkThunk(() => ("fo*"))),
            mkThunk(() => ("f")),
          ),
        );
      })(
        apply(
          apply(nixScope.matches, mkThunk(() => ("foobar"))),
          mkThunk(() => ("foobar")),
        ),
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
