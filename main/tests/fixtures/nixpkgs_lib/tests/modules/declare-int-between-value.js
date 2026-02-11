export default createFunc({}, null, {}, (nixScope) => (
  {
    "options":
      ({
        "value": nixScope.lib["mkOption"](
          { "type": nixScope.lib["types"]["ints"]["between"](-21n)(43n) },
        ),
      }),
  }
));
