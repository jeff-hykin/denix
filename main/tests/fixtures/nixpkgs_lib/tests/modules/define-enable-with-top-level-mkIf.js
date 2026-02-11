export default createFunc({}, null, {}, (nixScope) => (
  { "imports": [nixScope.lib["mkIf"](true)({ "enable": true })] }
));
