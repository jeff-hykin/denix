export default createFunc({}, null, {}, (nixScope) => (
  ((_cond) => {
    if (!_cond) {
      throw new Error("assertion failed: " + 'a == "a"');
    }
    return ((_cond) => {
      if (!_cond) {
        throw new Error("assertion failed: " + 'e == "e"');
      }
      return "d";
    })(operators.equal(nixScope.e, "e"));
  })(operators.equal(nixScope.a, "a"))
));
