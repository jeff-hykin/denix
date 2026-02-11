export default createFunc({}, null, {}, (nixScope) => (
  { "options": ({ "result": nixScope.lib["types"]["str"] }) }
));
