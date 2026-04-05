import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regex-split.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return ((_cond) => {
      if (!_cond) {
        throw new Error(
          "assertion failed: " +
            'split "foobar" "foobar" == [\n    ""\n    [ ]\n    ""\n  ]',
        );
      }
      return ((_cond) => {
        if (!_cond) {
          throw new Error(
            "assertion failed: " +
              'split "fo*" "f" == [\n    ""\n    [ ]\n    ""\n  ]',
          );
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " + 'split "fo+" "f" == [ "f" ]',
            );
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  'split "fo*" "fo" == [\n    ""\n    [ ]\n    ""\n  ]',
              );
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'split "fo*" "foo" == [\n    ""\n    [ ]\n    ""\n  ]',
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'split "fo+" "foo" == [\n    ""\n    [ ]\n    ""\n  ]',
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " +
                        'split "fo{1,2}" "foo" == [\n    ""\n    [ ]\n    ""\n  ]',
                    );
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          'split "fo{1,2}" "fooo" == [\n    ""\n    [ ]\n    "o"\n  ]',
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " +
                            'split "fo*" "foobar" == [\n    ""\n    [ ]\n    "bar"\n  ]',
                        );
                      }
                      return ((_cond) => {
                        if (!_cond) {
                          throw new Error(
                            "assertion failed: " +
                              'split "(fo*)" "f" == [\n    ""\n    [ "f" ]\n    ""\n  ]',
                          );
                        }
                        return ((_cond) => {
                          if (!_cond) {
                            throw new Error(
                              "assertion failed: " +
                                'split "(fo+)" "f" == [ "f" ]',
                            );
                          }
                          return ((_cond) => {
                            if (!_cond) {
                              throw new Error(
                                "assertion failed: " +
                                  'split "(fo*)" "fo" == [\n    ""\n    [ "fo" ]\n    ""\n  ]',
                              );
                            }
                            return ((_cond) => {
                              if (!_cond) {
                                throw new Error(
                                  "assertion failed: " +
                                    'split "(f)(o*)" "f" == [\n    ""\n    [\n      "f"\n      ""\n    ]\n    ""\n  ]',
                                );
                              }
                              return ((_cond) => {
                                if (!_cond) {
                                  throw new Error(
                                    "assertion failed: " +
                                      'split "(f)(o*)" "foo" == [\n    ""\n    [\n      "f"\n      "oo"\n    ]\n    ""\n  ]',
                                  );
                                }
                                return ((_cond) => {
                                  if (!_cond) {
                                    throw new Error(
                                      "assertion failed: " +
                                        'split "(fo+)" "foo" == [\n    ""\n    [ "foo" ]\n    ""\n  ]',
                                    );
                                  }
                                  return ((_cond) => {
                                    if (!_cond) {
                                      throw new Error(
                                        "assertion failed: " +
                                          'split "(fo{1,2})" "foo" == [\n    ""\n    [ "foo" ]\n    ""\n  ]',
                                      );
                                    }
                                    return ((_cond) => {
                                      if (!_cond) {
                                        throw new Error(
                                          "assertion failed: " +
                                            'split "(fo{1,2})" "fooo" == [\n    ""\n    [ "foo" ]\n    "o"\n  ]',
                                        );
                                      }
                                      return ((_cond) => {
                                        if (!_cond) {
                                          throw new Error(
                                            "assertion failed: " +
                                              'split "(fo*)" "foobar" == [\n    ""\n    [ "foo" ]\n    "bar"\n  ]',
                                          );
                                        }
                                        return ((_cond) => {
                                          if (!_cond) {
                                            throw new Error(
                                              "assertion failed: " +
                                                'split "(o+)" "oooofoooo" == [\n    ""\n    [ "oooo" ]\n    "f"\n    [ "oooo" ]\n    ""\n  ]',
                                            );
                                          }
                                          return ((_cond) => {
                                            if (!_cond) {
                                              throw new Error(
                                                "assertion failed: " +
                                                  'split "(b)" "foobarbaz" == [\n    "foo"\n    [ "b" ]\n    "ar"\n    [ "b" ]\n    "az"\n  ]',
                                              );
                                            }
                                            return ((_cond) => {
                                              if (!_cond) {
                                                throw new Error(
                                                  "assertion failed: " +
                                                    'split "[[:space:]]+|([\',.!?])" \'\'\n    Nix Rocks!\n    That\'s why I use it.\n  \'\' == [\n    "Nix"\n    [ null ]\n    "Rocks"\n    [ "!" ]\n    ""\n    [ null ]\n    "That"\n    [ "\'" ]\n    "s"\n    [ null ]\n    "why"\n    [ null ]\n    "I"\n    [ null ]\n    "use"\n    [ null ]\n    "it"\n    [ "." ]\n    ""\n    [ null ]\n    ""\n  ]',
                                                );
                                              }
                                              return ((_cond) => {
                                                if (!_cond) {
                                                  throw new Error(
                                                    "assertion failed: " +
                                                      'split "(a)b" "abc" == [\n    ""\n    [ "a" ]\n    "c"\n  ]',
                                                  );
                                                }
                                                return ((_cond) => {
                                                  if (!_cond) {
                                                    throw new Error(
                                                      "assertion failed: " +
                                                        'split "([ac])" "abc" == [\n    ""\n    [ "a" ]\n    "b"\n    [ "c" ]\n    ""\n  ]',
                                                    );
                                                  }
                                                  return ((_cond) => {
                                                    if (!_cond) {
                                                      throw new Error(
                                                        "assertion failed: " +
                                                          'split "(a)|(c)" "abc" == [\n    ""\n    [\n      "a"\n      null\n    ]\n    "b"\n    [\n      null\n      "c"\n    ]\n    ""\n  ]',
                                                      );
                                                    }
                                                    return ((_cond) => {
                                                      if (!_cond) {
                                                        throw new Error(
                                                          "assertion failed: " +
                                                            'split "([[:upper:]]+)" "  FOO   " == [\n    "  "\n    [ "FOO" ]\n    "   "\n  ]',
                                                        );
                                                      }
                                                      return true;
                                                    })(
                                                      operators.equal(
                                                        nixScope.split(
                                                          "([[:upper:]]+)",
                                                        )("  FOO   "),
                                                        ["  ", ["FOO"], "   "],
                                                      ),
                                                    );
                                                  })(
                                                    operators.equal(
                                                      nixScope.split("(a)|(c)")(
                                                        "abc",
                                                      ),
                                                      ["", ["a", null], "b", [
                                                        null,
                                                        "c",
                                                      ], ""],
                                                    ),
                                                  );
                                                })(
                                                  operators.equal(
                                                    nixScope.split("([ac])")(
                                                      "abc",
                                                    ),
                                                    ["", ["a"], "b", ["c"], ""],
                                                  ),
                                                );
                                              })(
                                                operators.equal(
                                                  nixScope.split("(a)b")("abc"),
                                                  ["", ["a"], "c"],
                                                ),
                                              );
                                            })(
                                              operators.equal(
                                                nixScope.split(
                                                  "[[:space:]]+|([',.!?])",
                                                )(`
    Nix Rocks!
    That's why I use it.
  `),
                                                [
                                                  "Nix",
                                                  [null],
                                                  "Rocks",
                                                  ["!"],
                                                  "",
                                                  [null],
                                                  "That",
                                                  ["'"],
                                                  "s",
                                                  [null],
                                                  "why",
                                                  [null],
                                                  "I",
                                                  [null],
                                                  "use",
                                                  [null],
                                                  "it",
                                                  ["."],
                                                  "",
                                                  [null],
                                                  "",
                                                ],
                                              ),
                                            );
                                          })(
                                            operators.equal(
                                              nixScope.split("(b)")(
                                                "foobarbaz",
                                              ),
                                              ["foo", ["b"], "ar", ["b"], "az"],
                                            ),
                                          );
                                        })(
                                          operators.equal(
                                            nixScope.split("(o+)")("oooofoooo"),
                                            ["", ["oooo"], "f", ["oooo"], ""],
                                          ),
                                        );
                                      })(
                                        operators.equal(
                                          nixScope.split("(fo*)")("foobar"),
                                          ["", ["foo"], "bar"],
                                        ),
                                      );
                                    })(
                                      operators.equal(
                                        nixScope.split("(fo{1,2})")("fooo"),
                                        ["", ["foo"], "o"],
                                      ),
                                    );
                                  })(
                                    operators.equal(
                                      nixScope.split("(fo{1,2})")("foo"),
                                      ["", ["foo"], ""],
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    nixScope.split("(fo+)")("foo"),
                                    ["", ["foo"], ""],
                                  ),
                                );
                              })(
                                operators.equal(
                                  nixScope.split("(f)(o*)")("foo"),
                                  ["", ["f", "oo"], ""],
                                ),
                              );
                            })(
                              operators.equal(nixScope.split("(f)(o*)")("f"), [
                                "",
                                ["f", ""],
                                "",
                              ]),
                            );
                          })(
                            operators.equal(nixScope.split("(fo*)")("fo"), [
                              "",
                              ["fo"],
                              "",
                            ]),
                          );
                        })(
                          operators.equal(nixScope.split("(fo+)")("f"), ["f"]),
                        );
                      })(
                        operators.equal(nixScope.split("(fo*)")("f"), ["", [
                          "f",
                        ], ""]),
                      );
                    })(
                      operators.equal(nixScope.split("fo*")("foobar"), [
                        "",
                        [],
                        "bar",
                      ]),
                    );
                  })(
                    operators.equal(nixScope.split("fo{1,2}")("fooo"), [
                      "",
                      [],
                      "o",
                    ]),
                  );
                })(
                  operators.equal(nixScope.split("fo{1,2}")("foo"), [
                    "",
                    [],
                    "",
                  ]),
                );
              })(operators.equal(nixScope.split("fo+")("foo"), ["", [], ""]));
            })(operators.equal(nixScope.split("fo*")("foo"), ["", [], ""]));
          })(operators.equal(nixScope.split("fo*")("fo"), ["", [], ""]));
        })(operators.equal(nixScope.split("fo+")("f"), ["f"]));
      })(operators.equal(nixScope.split("fo*")("f"), ["", [], ""]));
    })(operators.equal(nixScope.split("foobar")("foobar"), ["", [], ""]));
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
