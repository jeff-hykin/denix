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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-baseNameOf.nix";
const operators = runtime.operators;

export default ((_cond) => {
  if (!_cond) {
    throw new Error("assertion failed: " + 'baseNameOf "" == ""');
  }
  return ((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + 'baseNameOf "." == "."');
    }
    return ((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + 'baseNameOf ".." == ".."');
      }
      return ((_cond) => {
        if (!_cond) {
          throw new Error("assertion failed: " + 'baseNameOf "a" == "a"');
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'baseNameOf "a." == "a."');
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " + 'baseNameOf "a.." == "a.."',
              );
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " + 'baseNameOf "a.b" == "a.b"',
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + 'baseNameOf "a.b." == "a.b."',
                  );
                }
                return ((_cond) => {
                  if (!_cond) {
                    throw new Error(
                      "assertion failed: " + 'baseNameOf "a.b.." == "a.b.."',
                    );
                  }
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " + 'baseNameOf "a/" == "a"',
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " + 'baseNameOf "a/." == "."',
                        );
                      }
                      return ((_cond) => {
                        if (!_cond) {
                          throw new Error(
                            "assertion failed: " + 'baseNameOf "a/.." == ".."',
                          );
                        }
                        return ((_cond) => {
                          if (!_cond) {
                            throw new Error(
                              "assertion failed: " + 'baseNameOf "a/b" == "b"',
                            );
                          }
                          return ((_cond) => {
                            if (!_cond) {
                              throw new Error(
                                "assertion failed: " +
                                  'baseNameOf "a/b." == "b."',
                              );
                            }
                            return ((_cond) => {
                              if (!_cond) {
                                throw new Error(
                                  "assertion failed: " +
                                    'baseNameOf "a/b.." == "b.."',
                                );
                              }
                              return ((_cond) => {
                                if (!_cond) {
                                  throw new Error(
                                    "assertion failed: " +
                                      'baseNameOf "a/b/c" == "c"',
                                  );
                                }
                                return ((_cond) => {
                                  if (!_cond) {
                                    throw new Error(
                                      "assertion failed: " +
                                        'baseNameOf "a/b/c." == "c."',
                                    );
                                  }
                                  return ((_cond) => {
                                    if (!_cond) {
                                      throw new Error(
                                        "assertion failed: " +
                                          'baseNameOf "a/b/c.." == "c.."',
                                      );
                                    }
                                    return ((_cond) => {
                                      if (!_cond) {
                                        throw new Error(
                                          "assertion failed: " +
                                            'baseNameOf "a/b/c/d" == "d"',
                                        );
                                      }
                                      return ((_cond) => {
                                        if (!_cond) {
                                          throw new Error(
                                            "assertion failed: " +
                                              'baseNameOf "a/b/c/d." == "d."',
                                          );
                                        }
                                        return ((_cond) => {
                                          if (!_cond) {
                                            throw new Error(
                                              "assertion failed: " +
                                                'baseNameOf "a\\\\b" == "a\\\\b"',
                                            );
                                          }
                                          return ((_cond) => {
                                            if (!_cond) {
                                              throw new Error(
                                                "assertion failed: " +
                                                  'baseNameOf "C:a" == "C:a"',
                                              );
                                            }
                                            return ((_cond) => {
                                              if (!_cond) {
                                                throw new Error(
                                                  "assertion failed: " +
                                                    'baseNameOf "a//b" == "b"',
                                                );
                                              }
                                              return ((_cond) => {
                                                if (!_cond) {
                                                  throw new Error(
                                                    "assertion failed: " +
                                                      'baseNameOf "a//" == ""',
                                                  );
                                                }
                                                return ((_cond) => {
                                                  if (!_cond) {
                                                    throw new Error(
                                                      "assertion failed: " +
                                                        'baseNameOf ./foo == "foo"',
                                                    );
                                                  }
                                                  return ((_cond) => {
                                                    if (!_cond) {
                                                      throw new Error(
                                                        "assertion failed: " +
                                                          'baseNameOf ./foo/bar == "bar"',
                                                      );
                                                    }
                                                    return "ok";
                                                  })(
                                                    operators.equal(
                                                      apply(
                                                        nixScope.baseNameOf,
                                                        mkThunk(
                                                          () => (new Path([
                                                            "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/foo/bar",
                                                          ], []))
                                                        ),
                                                      ),
                                                      "bar",
                                                    ),
                                                  );
                                                })(
                                                  operators.equal(
                                                    apply(
                                                      nixScope.baseNameOf,
                                                      mkThunk(
                                                        () => (new Path([
                                                          "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/foo",
                                                        ], []))
                                                      ),
                                                    ),
                                                    "foo",
                                                  ),
                                                );
                                              })(
                                                operators.equal(
                                                  apply(
                                                    nixScope.baseNameOf,
                                                    mkThunk(() => ("a//")),
                                                  ),
                                                  "",
                                                ),
                                              );
                                            })(
                                              operators.equal(
                                                apply(
                                                  nixScope.baseNameOf,
                                                  mkThunk(() => ("a//b")),
                                                ),
                                                "b",
                                              ),
                                            );
                                          })(
                                            operators.equal(
                                              apply(
                                                nixScope.baseNameOf,
                                                mkThunk(() => ("C:a")),
                                              ),
                                              "C:a",
                                            ),
                                          );
                                        })(
                                          operators.equal(
                                            apply(
                                              nixScope.baseNameOf,
                                              mkThunk(() => ("a\\b")),
                                            ),
                                            "a\\b",
                                          ),
                                        );
                                      })(
                                        operators.equal(
                                          apply(
                                            nixScope.baseNameOf,
                                            mkThunk(() => ("a/b/c/d.")),
                                          ),
                                          "d.",
                                        ),
                                      );
                                    })(
                                      operators.equal(
                                        apply(
                                          nixScope.baseNameOf,
                                          mkThunk(() => ("a/b/c/d")),
                                        ),
                                        "d",
                                      ),
                                    );
                                  })(
                                    operators.equal(
                                      apply(
                                        nixScope.baseNameOf,
                                        mkThunk(() => ("a/b/c..")),
                                      ),
                                      "c..",
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    apply(
                                      nixScope.baseNameOf,
                                      mkThunk(() => ("a/b/c.")),
                                    ),
                                    "c.",
                                  ),
                                );
                              })(
                                operators.equal(
                                  apply(
                                    nixScope.baseNameOf,
                                    mkThunk(() => ("a/b/c")),
                                  ),
                                  "c",
                                ),
                              );
                            })(
                              operators.equal(
                                apply(
                                  nixScope.baseNameOf,
                                  mkThunk(() => ("a/b..")),
                                ),
                                "b..",
                              ),
                            );
                          })(
                            operators.equal(
                              apply(
                                nixScope.baseNameOf,
                                mkThunk(() => ("a/b.")),
                              ),
                              "b.",
                            ),
                          );
                        })(
                          operators.equal(
                            apply(nixScope.baseNameOf, mkThunk(() => ("a/b"))),
                            "b",
                          ),
                        );
                      })(
                        operators.equal(
                          apply(nixScope.baseNameOf, mkThunk(() => ("a/.."))),
                          "..",
                        ),
                      );
                    })(
                      operators.equal(
                        apply(nixScope.baseNameOf, mkThunk(() => ("a/."))),
                        ".",
                      ),
                    );
                  })(
                    operators.equal(
                      apply(nixScope.baseNameOf, mkThunk(() => ("a/"))),
                      "a",
                    ),
                  );
                })(
                  operators.equal(
                    apply(nixScope.baseNameOf, mkThunk(() => ("a.b.."))),
                    "a.b..",
                  ),
                );
              })(
                operators.equal(
                  apply(nixScope.baseNameOf, mkThunk(() => ("a.b."))),
                  "a.b.",
                ),
              );
            })(
              operators.equal(
                apply(nixScope.baseNameOf, mkThunk(() => ("a.b"))),
                "a.b",
              ),
            );
          })(
            operators.equal(
              apply(nixScope.baseNameOf, mkThunk(() => ("a.."))),
              "a..",
            ),
          );
        })(
          operators.equal(
            apply(nixScope.baseNameOf, mkThunk(() => ("a."))),
            "a.",
          ),
        );
      })(
        operators.equal(apply(nixScope.baseNameOf, mkThunk(() => ("a"))), "a"),
      );
    })(
      operators.equal(apply(nixScope.baseNameOf, mkThunk(() => (".."))), ".."),
    );
  })(operators.equal(apply(nixScope.baseNameOf, mkThunk(() => ("."))), "."));
})(operators.equal(apply(nixScope.baseNameOf, mkThunk(() => (""))), ""));
