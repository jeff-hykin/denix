export default createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
  { "imports": [{ "key": "explicit-key" }] }
));
