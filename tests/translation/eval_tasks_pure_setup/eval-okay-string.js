import {
  createRuntime,
  InterpolatedString,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-string.nix";
const operators = runtime.operators;

export default operators.add(
  operators.add(
    operators.add(
      operators.add(
        operators.add(
          operators.add(
            operators.add(
              operators.add(
                operators.add(
                  operators.add("foo", "bar"),
                  apply(
                    nixScope.toString,
                    mkThunk(
                      () => (operators.add(
                        new Path(["/a/b"], []),
                        new Path(["/c/d"], []),
                      ))
                    ),
                  ),
                ),
                apply(
                  nixScope.toString,
                  mkThunk(
                    () => (operators.add(
                      operators.add(new Path(["/foo/bar"], []), "/../xyzzy/."),
                      "/foo.txt",
                    ))
                  ),
                ),
              ),
              operators.add(
                "/../foo",
                apply(
                  nixScope.toString,
                  mkThunk(() => (new Path(["/x/y"], []))),
                ),
              ),
            ),
            'escape: "quote" \n \\',
          ),
          "end\nof\nline",
        ),
        new InterpolatedString(["foo", "blaat"], [
          () => (operators.ifThenElse(
            true,
            () => (new InterpolatedString(["b", ""], [
              () => (operators.add("a", "r")),
            ])),
            () => ("xyzzy"),
          )),
        ]),
      ),
      "foo$bar",
    ),
    '$"$"',
  ),
  "$",
);
