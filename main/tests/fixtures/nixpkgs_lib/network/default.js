export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope._ipv6 =
      nixScope.import(new Path(["./internal.nix"], []))(
        { "lib": nixScope.lib },
      )["_ipv6"];
    return ({
      "ipv6":
        ({
          "fromString": createFunc(/*arg:*/ "addr", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "splittedAddr", {
                enumerable: true,
                get() {
                  return nixScope._ipv6["split"](nixScope.addr);
                },
              });
              Object.defineProperty(nixScope, "addrInternal", {
                enumerable: true,
                get() {
                  return nixScope.splittedAddr["address"];
                },
              });
              Object.defineProperty(nixScope, "prefixLength", {
                enumerable: true,
                get() {
                  return nixScope.splittedAddr["prefixLength"];
                },
              });
              Object.defineProperty(nixScope, "address", {
                enumerable: true,
                get() {
                  return nixScope._ipv6["toStringFromExpandedIp"](
                    nixScope.addrInternal,
                  );
                },
              });
              return ({
                "address": nixScope.address,
                "prefixLength": nixScope.prefixLength,
              });
            })
          )),
        }),
    });
  })
));
