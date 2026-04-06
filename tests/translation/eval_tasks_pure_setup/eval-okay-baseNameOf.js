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
                                                      nixScope.baseNameOf(
                                                        new Path(
                                                          ["./foo/bar"],
                                                          [],
                                                        ),
                                                      ),
                                                      "bar",
                                                    ),
                                                  );
                                                })(
                                                  operators.equal(
                                                    nixScope.baseNameOf(
                                                      new Path(["./foo"], []),
                                                    ),
                                                    "foo",
                                                  ),
                                                );
                                              })(
                                                operators.equal(
                                                  nixScope.baseNameOf("a//"),
                                                  "",
                                                ),
                                              );
                                            })(
                                              operators.equal(
                                                nixScope.baseNameOf("a//b"),
                                                "b",
                                              ),
                                            );
                                          })(
                                            operators.equal(
                                              nixScope.baseNameOf("C:a"),
                                              "C:a",
                                            ),
                                          );
                                        })(
                                          operators.equal(
                                            nixScope.baseNameOf("a\\b"),
                                            "a\\b",
                                          ),
                                        );
                                      })(
                                        operators.equal(
                                          nixScope.baseNameOf("a/b/c/d."),
                                          "d.",
                                        ),
                                      );
                                    })(
                                      operators.equal(
                                        nixScope.baseNameOf("a/b/c/d"),
                                        "d",
                                      ),
                                    );
                                  })(
                                    operators.equal(
                                      nixScope.baseNameOf("a/b/c.."),
                                      "c..",
                                    ),
                                  );
                                })(
                                  operators.equal(
                                    nixScope.baseNameOf("a/b/c."),
                                    "c.",
                                  ),
                                );
                              })(
                                operators.equal(
                                  nixScope.baseNameOf("a/b/c"),
                                  "c",
                                ),
                              );
                            })(
                              operators.equal(
                                nixScope.baseNameOf("a/b.."),
                                "b..",
                              ),
                            );
                          })(
                            operators.equal(nixScope.baseNameOf("a/b."), "b."),
                          );
                        })(operators.equal(nixScope.baseNameOf("a/b"), "b"));
                      })(operators.equal(nixScope.baseNameOf("a/.."), ".."));
                    })(operators.equal(nixScope.baseNameOf("a/."), "."));
                  })(operators.equal(nixScope.baseNameOf("a/"), "a"));
                })(operators.equal(nixScope.baseNameOf("a.b.."), "a.b.."));
              })(operators.equal(nixScope.baseNameOf("a.b."), "a.b."));
            })(operators.equal(nixScope.baseNameOf("a.b"), "a.b"));
          })(operators.equal(nixScope.baseNameOf("a.."), "a.."));
        })(operators.equal(nixScope.baseNameOf("a."), "a."));
      })(operators.equal(nixScope.baseNameOf("a"), "a"));
    })(operators.equal(nixScope.baseNameOf(".."), ".."));
  })(operators.equal(nixScope.baseNameOf("."), "."));
})(operators.equal(nixScope.baseNameOf(""), ""));
