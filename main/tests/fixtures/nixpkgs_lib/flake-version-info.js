export default //
//
//
//
//
//
//
//
createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "finalLib", null, {}, (nixScope) => (
    createFunc(/*arg:*/ "prevLib", null, {}, (nixScope) => (
      {
        "trivial": operators.merge(nixScope.prevLib["trivial"], {
          "versionSuffix":
            (new InterpolatedString([".", ".", ""], [
              () => (nixScope.finalLib["substring"](0n)(8n)(
                operators.selectOrDefault(
                  nixScope.self,
                  ["lastModifiedDate"],
                  "19700101",
                ),
              )),
              () => (operators.selectOrDefault(
                nixScope.self,
                ["shortRev"],
                "dirty",
              )),
            ])),
          "revisionWithDefault": createFunc(
            /*arg:*/ "default",
            null,
            {},
            (nixScope) => (
              operators.selectOrDefault(
                nixScope.self,
                ["rev"],
                nixScope.default,
              )
            ),
          ),
        }),
      }
    ))
  ))
));
