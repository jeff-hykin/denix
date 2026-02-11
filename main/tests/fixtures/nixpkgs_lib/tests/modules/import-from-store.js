export default createFunc({}, null, {}, (nixScope) => (
  {
    "imports": [
      new InterpolatedString(["", ""], [
        () => (nixScope.builtins["toFile"]("drv")("{}")),
      ]),
      new Path(["./declare-enable.nix"], []),
      new Path(["./define-enable.nix"], []),
    ],
  }
));
