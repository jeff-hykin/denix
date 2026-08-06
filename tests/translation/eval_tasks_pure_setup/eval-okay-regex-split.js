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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regex-split.nix";
const operators = runtime.operators;

export default ((nixScope) => {
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
                                                        apply(
                                                          apply(
                                                            nixScope.split,
                                                            mkThunk(
                                                              () => ("([[:upper:]]+)")
                                                            ),
                                                          ),
                                                          mkThunk(
                                                            () => ("  FOO   ")
                                                          ),
                                                        ),
                                                        ["  ", ["FOO"], "   "],
                                                      ),
                                                    );
                                                  })(
                                                    operators.equal(
                                                      apply(
                                                        apply(
                                                          nixScope.split,
                                                          mkThunk(
                                                            () => ("(a)|(c)")
                                                          ),
                                                        ),
                                                        mkThunk(() => ("abc")),
                                                      ),
                                                      ["", ["a", null], "b", [
                                                        null,
                                                        "c",
                                                      ], ""],
                                                    ),
                                                  );
                                                })(
                                                  operators.equal(
                                                    apply(
                                                      apply(
                                                        nixScope.split,
                                                        mkThunk(
                                                          () => ("([ac])")
                                                        ),
                                                      ),
                                                      mkThunk(() => ("abc")),
                                                    ),
                                                    ["", ["a"], "b", ["c"], ""],
                                                  ),
                                                );
                                              })(
                                                operators.equal(
                                                  apply(
                                                    apply(
                                                      nixScope.split,
                                                      mkThunk(() => ("(a)b")),
                                                    ),
                                                    mkThunk(() => ("abc")),
                                                  ),
                                                  ["", ["a"], "c"],
                                                ),
                                              );
                                            })(
                                              operators.equal(
                                                apply(
                                                  apply(
                                                    nixScope.split,
                                                    mkThunk(
                                                      () => ("[[:space:]]+|([',.!?])")
                                                    ),
                                                  ),
                                                  mkThunk(
                                                    () => ("Nix Rocks!\nThat's why I use it.\n")
                                                  ),
                                                ),
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
                                              apply(
                                                apply(
                                                  nixScope.split,
                                                  mkThunk(() => ("(b)")),
                                                ),
                                                mkThunk(() => ("foobarbaz")),
                                              ),
                                              ["foo", ["b"], "ar", ["b"], "az"],
                                            ),
                                          );
                                        })(
                                          operators.equal(
                                            apply(
                                              apply(
                                                nixScope.split,
                                                mkThunk(() => ("(o+)")),
                                              ),
                                              mkThunk(() => ("oooofoooo")),
                                            ),
                                            ["", ["oooo"], "f", ["oooo"], ""],
                                          ),
                                        );
                                      })(
                                        operators.equal(
                                          apply(
                                            apply(
                                              nixScope.split,
                                              mkThunk(() => ("(fo*)")),
                                            ),
                                            mkThunk(() => ("foobar")),
                                          ),
                                          ["", ["foo"], "bar"],
                                        ),
                                      );
                                    })(
                                      operators.equal(
                                        apply(
                                          apply(
                                            nixScope.split,
                                            mkThunk(() => ("(fo{1,2})")),
                                          ),
                                          mkThunk(() => ("fooo")),
                                        ),
                                        ["", ["foo"], "o"],
                                      ),
                                    );
                                  })(
                                    operators.equal(
                                      apply(
                                        apply(
                                          nixScope.split,
                                          mkThunk(() => ("(fo{1,2})")),
                                        ),
                                        mkThunk(() => ("foo")),
                                      ),
                                      ["", ["foo"], ""],
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    apply(
                                      apply(
                                        nixScope.split,
                                        mkThunk(() => ("(fo+)")),
                                      ),
                                      mkThunk(() => ("foo")),
                                    ),
                                    ["", ["foo"], ""],
                                  ),
                                );
                              })(
                                operators.equal(
                                  apply(
                                    apply(
                                      nixScope.split,
                                      mkThunk(() => ("(f)(o*)")),
                                    ),
                                    mkThunk(() => ("foo")),
                                  ),
                                  ["", ["f", "oo"], ""],
                                ),
                              );
                            })(
                              operators.equal(
                                apply(
                                  apply(
                                    nixScope.split,
                                    mkThunk(() => ("(f)(o*)")),
                                  ),
                                  mkThunk(() => ("f")),
                                ),
                                ["", ["f", ""], ""],
                              ),
                            );
                          })(
                            operators.equal(
                              apply(
                                apply(nixScope.split, mkThunk(() => ("(fo*)"))),
                                mkThunk(() => ("fo")),
                              ),
                              ["", ["fo"], ""],
                            ),
                          );
                        })(
                          operators.equal(
                            apply(
                              apply(nixScope.split, mkThunk(() => ("(fo+)"))),
                              mkThunk(() => ("f")),
                            ),
                            ["f"],
                          ),
                        );
                      })(
                        operators.equal(
                          apply(
                            apply(nixScope.split, mkThunk(() => ("(fo*)"))),
                            mkThunk(() => ("f")),
                          ),
                          ["", ["f"], ""],
                        ),
                      );
                    })(
                      operators.equal(
                        apply(
                          apply(nixScope.split, mkThunk(() => ("fo*"))),
                          mkThunk(() => ("foobar")),
                        ),
                        ["", [], "bar"],
                      ),
                    );
                  })(
                    operators.equal(
                      apply(
                        apply(nixScope.split, mkThunk(() => ("fo{1,2}"))),
                        mkThunk(() => ("fooo")),
                      ),
                      ["", [], "o"],
                    ),
                  );
                })(
                  operators.equal(
                    apply(
                      apply(nixScope.split, mkThunk(() => ("fo{1,2}"))),
                      mkThunk(() => ("foo")),
                    ),
                    ["", [], ""],
                  ),
                );
              })(
                operators.equal(
                  apply(
                    apply(nixScope.split, mkThunk(() => ("fo+"))),
                    mkThunk(() => ("foo")),
                  ),
                  ["", [], ""],
                ),
              );
            })(
              operators.equal(
                apply(
                  apply(nixScope.split, mkThunk(() => ("fo*"))),
                  mkThunk(() => ("foo")),
                ),
                ["", [], ""],
              ),
            );
          })(
            operators.equal(
              apply(
                apply(nixScope.split, mkThunk(() => ("fo*"))),
                mkThunk(() => ("fo")),
              ),
              ["", [], ""],
            ),
          );
        })(
          operators.equal(
            apply(
              apply(nixScope.split, mkThunk(() => ("fo+"))),
              mkThunk(() => ("f")),
            ),
            ["f"],
          ),
        );
      })(
        operators.equal(
          apply(
            apply(nixScope.split, mkThunk(() => ("fo*"))),
            mkThunk(() => ("f")),
          ),
          ["", [], ""],
        ),
      );
    })(
      operators.equal(
        apply(
          apply(nixScope.split, mkThunk(() => ("foobar"))),
          mkThunk(() => ("foobar")),
        ),
        ["", [], ""],
      ),
    );
  } finally {
    runtime.scopeStack.pop();
  }
})(runtime.withScope(nixScope, () => (nixScope.builtins)));
