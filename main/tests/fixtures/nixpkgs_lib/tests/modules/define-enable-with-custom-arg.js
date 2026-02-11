export default createFunc({}, null, {}, (nixScope) => (
  { "config": ({ "enable": nixScope.custom }) }
));
