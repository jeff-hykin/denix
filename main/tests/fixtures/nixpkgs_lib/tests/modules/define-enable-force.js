export default createFunc({}, null, {}, (nixScope) => (
  { "enable": nixScope.lib["mkForce"](false) }
));
