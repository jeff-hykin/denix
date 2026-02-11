export default createFunc({}, null, {}, (nixScope) => (
  { "options": ({ "result": nixScope.lib["evalModules"]({ "modules": [] }) }) }
));
