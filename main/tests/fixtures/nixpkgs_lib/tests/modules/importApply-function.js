export default createFunc({}, null, {}, (nixScope) => (
  createFunc({}, null, {}, (nixScope) => (
    { "value": nixScope.foo }
  ))
));
