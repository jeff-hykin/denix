import { createRuntime } from "../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();

export default /*let*/ createScope((nixScope) => {
  nixScope.fakeHash = nixScope.lib["fakeHash"];
  nixScope.fakeSha256 = nixScope.lib["fakeSha256"];
  nixScope.fakeSha512 = nixScope.lib["fakeSha512"];
  nixScope.flip = nixScope.lib["flip"];
  nixScope.functionArgs = nixScope.lib["functionArgs"];
  nixScope.runTests = nixScope.lib["runTests"];
  nixScope.normalizeHash = nixScope.lib["fetchers"]["normalizeHash"];
  nixScope.withNormalizedHash = nixScope.lib["fetchers"]["withNormalizedHash"];
  nixScope.sri256 = "sha256-d6xi4mKdjkX2JFicDIv5niSzpyI0m/Hnm8GGAIU04kY=";
  nixScope.sri512 =
    "sha512-AXFyVo7jiZ5we10fxZ5E9qfPjSfqkizY2apCzORKFVYZaNhCIVbooY+J4cYST00ztLf0EjivIBPPdtIYFUMfzQ==";
  defGetter(
    nixScope,
    "lib",
    (nixScope) => nixScope.import(new Path(["./.."], [])),
  );
  defGetter(
    nixScope,
    "testingThrow",
    (nixScope) =>
      createFunc(/*arg:*/ "expr", null, {}, (nixScope) => (
        {
          "expr": ((_withAttrs) => {
            const nixScope = {
              ...runtime.scopeStack.slice(-1)[0],
              ..._withAttrs,
            };
            runtime.scopeStack.push(nixScope);
            try {
              return nixScope.tryEval(
                nixScope.seq(nixScope.expr)("didn't throw"),
              );
            } finally {
              runtime.scopeStack.pop();
            }
          })(nixScope.builtins),
          "expected": ({ "success": false, "value": false }),
        }
      )),
  );
  defGetter(
    nixScope,
    "unionOfDisjoints",
    (nixScope) =>
      nixScope.lib["foldl"](nixScope.lib["attrsets"]["unionOfDisjoint"])({}),
  );
  defGetter(
    nixScope,
    "genTests",
    (nixScope) =>
      createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createScope((nixScope) => {
            const obj = {};
            obj[
              new InterpolatedString(["test", "AlreadyNormalized"], [
                () => (nixScope.n),
              ])
            ] = {
              "expr": nixScope.f({})(
                { "outputHash": "", "outputHashAlgo": "md42" },
              ),
              "expected": ({ "outputHash": "", "outputHashAlgo": "md42" }),
            };
            obj[
              new InterpolatedString(["test", "EmptySha256"], [
                () => (nixScope.n),
              ])
            ] = {
              "expr": nixScope.f({})({ "sha256": "" }),
              "expected":
                ({
                  "outputHash": nixScope.fakeSha256,
                  "outputHashAlgo": "sha256",
                }),
            };
            obj[
              new InterpolatedString(["test", "EmptySha512"], [
                () => (nixScope.n),
              ])
            ] = {
              "expr": nixScope.f({ "hashTypes": ["sha512"] })({ "sha512": "" }),
              "expected":
                ({
                  "outputHash": nixScope.fakeSha512,
                  "outputHashAlgo": "sha512",
                }),
            };
            obj[
              new InterpolatedString(["test", "EmptyHash"], [
                () => (nixScope.n),
              ])
            ] = {
              "expr": nixScope.f({})({ "hash": "" }),
              "expected":
                ({ "outputHash": nixScope.fakeHash, "outputHashAlgo": null }),
            };
            obj[
              new InterpolatedString(["test", "Sri256"], [() => (nixScope.n)])
            ] = {
              "expr": nixScope.f({})({ "hash": nixScope.sri256 }),
              "expected":
                ({ "outputHash": nixScope.sri256, "outputHashAlgo": null }),
            };
            obj[
              new InterpolatedString(["test", "Sri512"], [() => (nixScope.n)])
            ] = {
              "expr": nixScope.f({})({ "hash": nixScope.sri512 }),
              "expected":
                ({ "outputHash": nixScope.sri512, "outputHashAlgo": null }),
            };
            obj[
              new InterpolatedString(["test", "PreservesAttrs"], [
                () => (nixScope.n),
              ])
            ] = {
              "expr": nixScope.f({})(
                { "hash": "aaaa", "destination": "Earth" },
              ),
              "expected":
                ({
                  "outputHash": "aaaa",
                  "outputHashAlgo": null,
                  "destination": "Earth",
                }),
            };
            obj[
              new InterpolatedString(["test", "RejectsSha1ByDefault"], [
                () => (nixScope.n),
              ])
            ] = nixScope.testingThrow(nixScope.f({})({ "sha1": "" }));
            obj[
              new InterpolatedString(["test", "RejectsSha512ByDefault"], [
                () => (nixScope.n),
              ])
            ] = nixScope.testingThrow(nixScope.f({})({ "sha512": "" }));
            obj[
              new InterpolatedString(["test", "ThrowsOnMissing"], [
                () => (nixScope.n),
              ])
            ] = nixScope.testingThrow(nixScope.f({})({ "gibi": false }));
            return obj;
          })
        ))
      )),
  );
  return nixScope.runTests(
    nixScope.unionOfDisjoints([
      nixScope.genTests("NormalizeHash")(nixScope.normalizeHash),
      nixScope.genTests("WithNormalized")(
        nixScope.flip(nixScope.withNormalizedHash)(
          createFunc({}, "args", {}, (nixScope) => (
            nixScope.args
          )),
        ),
      ),
      {
        "testNormalizeNotRequiredEquivalent":
          ({
            "expr": nixScope.normalizeHash({ "required": false })(
              { "hash": "", "prof": "shadoko" },
            ),
            "expected": nixScope.normalizeHash({})(
              { "hash": "", "prof": "shadoko" },
            ),
          }),
        "testNormalizeNotRequiredPassthru": createScope((nixScope) => {
          const obj = {};
          obj.expr = nixScope.normalizeHash({ "required": false })(
            { "ga bu": "zo meu" },
          );
          if (obj["expected"] === undefined) obj["expected"] = {};
          obj["expected"]["ga bu"] = "zo meu";
          return obj;
        }),
        "testOptionalArg": createScope((nixScope) => {
          const obj = {};
          obj.expr = nixScope.withNormalizedHash({})(
            createFunc(
              {
                "outputHash": (nixScope) => (""),
                "outputHashAlgo": (nixScope) => (null),
              },
              "args",
              {},
              (nixScope) => (
                nixScope.args
              ),
            ),
          )({ "author": "Jacques Rouxel" });
          if (obj["expected"] === undefined) {
            obj["expected"] = {};
          }
          obj["expected"]["author"] = "Jacques Rouxel";
          return obj;
        }),
        "testOptionalArgMetadata": createScope((nixScope) => {
          const obj = {};
          obj.expr = nixScope.functionArgs(
            nixScope.withNormalizedHash({})(
              createFunc(
                {
                  "outputHash": (nixScope) => (""),
                  "outputHashAlgo": (nixScope) => (null),
                },
                null,
                {},
                (nixScope) => (
                  {}
                ),
              ),
            ),
          );
          if (obj["expected"] === undefined) obj["expected"] = {};
          obj["expected"]["hash"] = true;
          return obj;
        }),
        "testPreservesArgsMetadata":
          ({
            "expr": nixScope.functionArgs(
              nixScope.withNormalizedHash({})(
                createFunc(
                  { "pumping": (nixScope) => (true) },
                  null,
                  {},
                  (nixScope) => (
                    {}
                  ),
                ),
              ),
            ),
            "expected": ({ "hash": false, "pumping": true }),
          }),
        "testRejectsMissingHashArg": nixScope.testingThrow(
          nixScope.withNormalizedHash({})(
            createFunc({}, null, {}, (nixScope) => (
              {}
            )),
          ),
        ),
        "testRejectsMissingAlgoArg": nixScope.testingThrow(
          nixScope.withNormalizedHash({})(
            createFunc({}, null, {}, (nixScope) => (
              {}
            )),
          ),
        ),
      },
    ]),
  );
});
