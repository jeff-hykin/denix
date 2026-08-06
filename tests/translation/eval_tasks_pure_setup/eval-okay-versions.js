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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-versions.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "name1", (nixScope) => ("hello-1.0.2"));
  defGetter(nixScope, "name2", (nixScope) => ("hello"));
  defGetter(nixScope, "name3", (nixScope) => ("915resolution-0.5.2"));
  defGetter(nixScope, "name4", (nixScope) => ("xf86-video-i810-1.7.4"));
  defGetter(nixScope, "name5", (nixScope) => ("name-that-ends-with-dash--1.0"));
  defGetter(nixScope, "eq", (nixScope) => (0n));
  defGetter(
    nixScope,
    "lt",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["sub"], mkThunk(() => (0n))),
      mkThunk(() => (1n)),
    )),
  );
  defGetter(nixScope, "gt", (nixScope) => (1n));
  defGetter(
    nixScope,
    "versionTest",
    (nixScope) => (createFunc(/*arg:*/ "v1", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "v2", null, {}, nixScope, (nixScope) => (
        createFunc(/*arg:*/ "expected", null, {}, nixScope, (nixScope) => (
          /*let*/ createScope(nixScope, (nixScope) => {
            defGetter(
              nixScope,
              "d1",
              (
                nixScope,
              ) => (apply(
                apply(
                  nixScope.builtins["compareVersions"],
                  mkThunk(() => (nixScope.v1)),
                ),
                mkThunk(() => (nixScope.v2)),
              )),
            );
            defGetter(
              nixScope,
              "d2",
              (
                nixScope,
              ) => (apply(
                apply(
                  nixScope.builtins["compareVersions"],
                  mkThunk(() => (nixScope.v2)),
                ),
                mkThunk(() => (nixScope.v1)),
              )),
            );
            return ((operators.equal(
              nixScope.d1,
              apply(
                apply(nixScope.builtins["sub"], mkThunk(() => (0n))),
                mkThunk(() => (nixScope.d2)),
              ),
            )) && (operators.equal(nixScope.d1, nixScope.expected)));
          })
        ))
      ))
    ))),
  );
  defGetter(
    nixScope,
    "tests",
    (
      nixScope,
    ) => [
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name1)),
        ))["name"],
        "hello",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name1)),
        ))["version"],
        "1.0.2",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name2)),
        ))["name"],
        "hello",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name2)),
        ))["version"],
        "",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name3)),
        ))["name"],
        "915resolution",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name3)),
        ))["version"],
        "0.5.2",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name4)),
        ))["name"],
        "xf86-video-i810",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name4)),
        ))["version"],
        "1.7.4",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name5)),
        ))["name"],
        "name-that-ends-with-dash",
      ),
      operators.equal(
        (apply(
          nixScope.builtins["parseDrvName"],
          mkThunk(() => (nixScope.name5)),
        ))["version"],
        "-1.0",
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("1.0"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.1"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.eq)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.5"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.gt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("3.1"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.gt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3.1"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.gt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3.1"))),
          mkThunk(() => ("2.3a")),
        ),
        mkThunk(() => (nixScope.gt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3pre1"))),
          mkThunk(() => ("2.3")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3pre3"))),
          mkThunk(() => ("2.3pre12")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3a"))),
          mkThunk(() => ("2.3c")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3pre1"))),
          mkThunk(() => ("2.3c")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
      apply(
        apply(
          apply(nixScope.versionTest, mkThunk(() => ("2.3pre1"))),
          mkThunk(() => ("2.3q")),
        ),
        mkThunk(() => (nixScope.lt)),
      ),
    ],
  );
  return apply(
    (apply(
      nixScope.import,
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
        ], []))
      ),
    ))["and"],
    mkThunk(() => (nixScope.tests)),
  );
});
