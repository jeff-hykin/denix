export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "lib",
    (nixScope) => nixScope.import(new Path(["../../.."], [])),
  );
  defGetter(
    nixScope,
    "evaluation",
    (nixScope) =>
      nixScope.lib["evalModules"](
        {
          "modules": [
            {},
            createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
              {}
            )),
            new Path(["./a.nix"], []),
            new Path(["./b.nix"], []),
          ],
        },
      ),
  );
  defGetter(nixScope, "actual", (nixScope) => nixScope.evaluation["graph"]);
  defGetter(
    nixScope,
    "expected",
    (
      nixScope,
    ) => [
      {
        "key": ":anon-1",
        "file": "<unknown-file>",
        "imports": [],
        "disabled": false,
      },
      {
        "key": ":anon-2",
        "file": "<unknown-file>",
        "imports": [],
        "disabled": false,
      },
      {
        "key": nixScope.toString(new Path(["./a.nix"], [])),
        "file": nixScope.toString(new Path(["./a.nix"], [])),
        "imports": [{
          "key":
            (new InterpolatedString(["", ":anon-1"], [
              () => (nixScope.toString(new Path(["./a.nix"], []))),
            ])),
          "file": nixScope.toString(new Path(["./a.nix"], [])),
          "imports": [{
            "key":
              (new InterpolatedString(["", ":anon-1:anon-1"], [
                () => (nixScope.toString(new Path(["./a.nix"], []))),
              ])),
            "file": nixScope.toString(new Path(["./a.nix"], [])),
            "imports": [],
            "disabled": false,
          }],
          "disabled": false,
        }],
        "disabled": false,
      },
      {
        "key": nixScope.toString(new Path(["./b.nix"], [])),
        "file": nixScope.toString(new Path(["./b.nix"], [])),
        "imports": [
          {
            "key": "explicit-key",
            "file": nixScope.toString(new Path(["./b.nix"], [])),
            "imports": [],
            "disabled": false,
          },
        ],
        "disabled": true,
      },
    ],
  );
  return ((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + "actual == expected");
    }
    return null;
  })(operators.equal(nixScope.actual, nixScope.expected));
});
