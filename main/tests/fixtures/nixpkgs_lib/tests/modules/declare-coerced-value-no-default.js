export default createFunc({}, null, {}, (nixScope) => (
  {
    "options": ({
      "value": nixScope.lib["mkOption"](
        {
          "type": nixScope.lib["types"]["coercedTo"](
            nixScope.lib["types"]["int"],
          )(nixScope.builtins["toString"])(nixScope.lib["types"]["str"]),
        },
      ),
    }),
  }
));
