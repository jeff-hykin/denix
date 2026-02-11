export default createFunc({}, null, {}, (nixScope) => (
  {
    "options":
      ({ "foo": nixScope.lib["mkOption"]({ "default": nixScope._class }) }),
  }
));
