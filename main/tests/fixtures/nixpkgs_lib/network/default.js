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
              defGetter(
                nixScope,
                "splittedAddr",
                (nixScope) => nixScope._ipv6["split"](nixScope.addr),
              );
              defGetter(
                nixScope,
                "addrInternal",
                (nixScope) => nixScope.splittedAddr["address"],
              );
              defGetter(
                nixScope,
                "prefixLength",
                (nixScope) => nixScope.splittedAddr["prefixLength"],
              );
              defGetter(
                nixScope,
                "address",
                (nixScope) =>
                  nixScope._ipv6["toStringFromExpandedIp"](
                    nixScope.addrInternal,
                  ),
              );
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
