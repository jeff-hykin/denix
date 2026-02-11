export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "defaultSourceType",
      (nixScope) =>
        createFunc(/*arg:*/ "tname", null, {}, (nixScope) => (
          { "shortName": nixScope.tname, "isSource": false }
        )),
    );
    return nixScope.lib["mapAttrs"](
      createFunc(/*arg:*/ "tname", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "tset", null, {}, (nixScope) => (
          operators.merge(
            nixScope.defaultSourceType(nixScope.tname),
            nixScope.tset,
          )
        ))
      )),
    )({
      "fromSource": ({ "isSource": true }),
      "binaryNativeCode": {},
      "binaryBytecode": {},
      "binaryFirmware": {},
    });
  })
));
