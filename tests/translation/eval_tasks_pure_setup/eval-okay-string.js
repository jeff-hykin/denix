import {
  createRuntime,
  InterpolatedString,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
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
                  nixScope.toString(
                    operators.add(
                      new Path(["/a/b"], []),
                      new Path(["/c/d"], []),
                    ),
                  ),
                ),
                nixScope.toString(
                  operators.add(
                    operators.add(new Path(["/foo/bar"], []), "/../xyzzy/."),
                    "/foo.txt",
                  ),
                ),
              ),
              operators.add(
                "/../foo",
                nixScope.toString(new Path(["/x/y"], [])),
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
