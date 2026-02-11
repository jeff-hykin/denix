export default createFunc({}, null, {}, (nixScope) => (
  nixScope.lib["mkForce"]({ "enable": false })
));
