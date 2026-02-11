export default createFunc({}, null, {}, (nixScope) => (
  {
    "imports": [{ "value": nixScope.lib["mkDefault"]("def") }],
    "value": nixScope.lib["mkMerge"]([
      nixScope.lib["mkIf"](false)("nope"),
      "yes",
    ]),
  }
));
