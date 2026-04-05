import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-comments.nix";
const operators = runtime.operators;

export default //
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
                                                operators.add("a", "b"),
                                                "c",
                                              ),
                                              "d",
                                            ),
                                            "e",
                                          ),
                                          "f",
                                        ),
                                        "g",
                                      ),
                                      "h",
                                    ),
                                    "i",
                                  ),
                                  "j",
                                ),
                                "k",
                              ),
                              "l",
                            ),
                            "m",
                          ),
                          "n",
                        ),
                        "o",
                      ),
                      "p",
                    ),
                    "q",
                  ),
                  "r",
                ),
                "s",
              ),
              "t",
            ),
            "u",
          ),
          "v",
        ),
        "w",
      ),
      "x",
    ),
    new InterpolatedString(["", ""], [() => ("y")]),
  ),
  "z",
); /* EOF */
