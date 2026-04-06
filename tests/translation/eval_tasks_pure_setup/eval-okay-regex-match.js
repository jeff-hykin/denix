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
      defGetter(
        nixScope,
        "matches",
        (nixScope) =>
          createFunc(/*arg:*/ "pat", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
              operators.notEqual(
                apply(apply(nixScope.match, nixScope.pat), nixScope.s),
                null,
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "splitFN",
        (nixScope) => apply(nixScope.match, "((.*)/)?([^/]*)\\.(nix|cc)"),
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
                                      apply(nixScope.splitFN, "foobar.cc"),
                                      [null, null, "foobar", "cc"],
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    apply(
                                      nixScope.splitFN,
                                      "/path/to/foobar.nix",
                                    ),
                                    ["/path/to/", "/path/to", "foobar", "nix"],
                                  ),
                                );
                              })(
                                operators.equal(
                                  apply(
                                    apply(
                                      nixScope.match,
                                      "[[:space:]]+([[:upper:]]+)[[:space:]]+",
                                    ),
                                    "  FOO   ",
                                  ),
                                  ["FOO"],
                                ),
                              );
                            })(
                              operators.equal(
                                apply(
                                  apply(nixScope.match, "(.*)\\.nix"),
                                  "foobar.nix",
                                ),
                                ["foobar"],
                              ),
                            );
                          })(
                            operators.negate(
                              apply(
                                apply(
                                  nixScope.matches,
                                  "[[:space:]]+([[:upper:]]+)[[:space:]]+",
                                ),
                                "  foo   ",
                              ),
                            ),
                          );
                        })(
                          apply(
                            apply(
                              nixScope.matches,
                              "[[:space:]]+([^[:space:]]+)[[:space:]]+",
                            ),
                            "  foo   ",
                          ),
                        );
                      })(
                        operators.negate(
                          apply(apply(nixScope.matches, "fo*"), "foobar"),
                        ),
                      );
                    })(
                      operators.negate(
                        apply(apply(nixScope.matches, "fo{1,2}"), "fooo"),
                      ),
                    );
                  })(apply(apply(nixScope.matches, "fo{1,2}"), "foo"));
                })(apply(apply(nixScope.matches, "fo+"), "foo"));
              })(apply(apply(nixScope.matches, "fo*"), "foo"));
            })(apply(apply(nixScope.matches, "fo*"), "fo"));
          })(operators.negate(apply(apply(nixScope.matches, "fo+"), "f")));
        })(apply(apply(nixScope.matches, "fo*"), "f"));
      })(apply(apply(nixScope.matches, "foobar"), "foobar"));
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
