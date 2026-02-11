export default createFunc({}, null, {}, (nixScope) => (
  { "disabledModules": [new Path(["./declare-enable.nix"], [])] }
));
