export default createFunc({}, null, {}, (nixScope) => (
  {
    "disabledModules": [
      nixScope.toString(new Path(["./define-enable.nix"], [])),
    ],
  }
));
