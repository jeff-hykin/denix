import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.name1 = "hello-1.0.2";
  nixScope.name2 = "hello";
  nixScope.name3 = "915resolution-0.5.2";
  nixScope.name4 = "xf86-video-i810-1.7.4";
  nixScope.name5 = "name-that-ends-with-dash--1.0";
  nixScope.eq = 0n;
  nixScope.gt = 1n;
  defGetter(
    nixScope,
    "lt",
    (nixScope) => apply(apply(nixScope.builtins["sub"], 0n), 1n),
  );
  defGetter(
    nixScope,
    "versionTest",
    (nixScope) =>
      createFunc(/*arg:*/ "v1", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "v2", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "expected", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "d1", (nixScope) =>
                apply(
                  apply(nixScope.builtins["compareVersions"], nixScope.v1),
                  nixScope.v2,
                ));
              defGetter(nixScope, "d2", (nixScope) =>
                apply(
                  apply(nixScope.builtins["compareVersions"], nixScope.v2),
                  nixScope.v1,
                ));
              return operators.and(
                operators.equal(
                  nixScope.d1,
                  apply(apply(nixScope.builtins["sub"], 0n), nixScope.d2),
                ),
                operators.equal(nixScope.d1, nixScope.expected),
              );
            })
          ))
        ))
      )),
  );
  defGetter(
    nixScope,
    "tests",
    (
      nixScope,
    ) => [
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name1))["name"],
        "hello",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name1))["version"],
        "1.0.2",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name2))["name"],
        "hello",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name2))["version"],
        "",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name3))["name"],
        "915resolution",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name3))["version"],
        "0.5.2",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name4))["name"],
        "xf86-video-i810",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name4))["version"],
        "1.7.4",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name5))["name"],
        "name-that-ends-with-dash",
      ),
      operators.equal(
        (apply(nixScope.builtins["parseDrvName"], nixScope.name5))["version"],
        "-1.0",
      ),
      apply(apply(apply(nixScope.versionTest, "1.0"), "2.3"), nixScope.lt),
      apply(apply(apply(nixScope.versionTest, "2.1"), "2.3"), nixScope.lt),
      apply(apply(apply(nixScope.versionTest, "2.3"), "2.3"), nixScope.eq),
      apply(apply(apply(nixScope.versionTest, "2.5"), "2.3"), nixScope.gt),
      apply(apply(apply(nixScope.versionTest, "3.1"), "2.3"), nixScope.gt),
      apply(apply(apply(nixScope.versionTest, "2.3.1"), "2.3"), nixScope.gt),
      apply(apply(apply(nixScope.versionTest, "2.3.1"), "2.3a"), nixScope.gt),
      apply(apply(apply(nixScope.versionTest, "2.3pre1"), "2.3"), nixScope.lt),
      apply(
        apply(apply(nixScope.versionTest, "2.3pre3"), "2.3pre12"),
        nixScope.lt,
      ),
      apply(apply(apply(nixScope.versionTest, "2.3a"), "2.3c"), nixScope.lt),
      apply(apply(apply(nixScope.versionTest, "2.3pre1"), "2.3c"), nixScope.lt),
      apply(apply(apply(nixScope.versionTest, "2.3pre1"), "2.3q"), nixScope.lt),
    ],
  );
  return apply(
    (apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])))[
      "and"
    ],
    nixScope.tests,
  );
});
