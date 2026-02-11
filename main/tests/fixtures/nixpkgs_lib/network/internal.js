export default createFunc(
  { "lib": (nixScope) => (nixScope.import(new Path(["../."], []))) },
  null,
  {},
  (nixScope) => (
    /*let*/ createScope((nixScope) => {
      nixScope.map = nixScope.builtins["map"];
      nixScope.match = nixScope.builtins["match"];
      nixScope.genList = nixScope.builtins["genList"];
      nixScope.length = nixScope.builtins["length"];
      nixScope.concatMap = nixScope.builtins["concatMap"];
      nixScope.head = nixScope.builtins["head"];
      nixScope.toString = nixScope.builtins["toString"];
      nixScope.lists = nixScope.lib["lists"];
      nixScope.strings = nixScope.lib["strings"];
      nixScope.trivial = nixScope.lib["trivial"];
      nixScope.last = nixScope.lib["lists"]["last"];
      nixScope.ipv6Bits = 128n;
      nixScope.ipv6Pieces = 8n;
      nixScope.ipv6PieceBits = 16n;
      nixScope.ipv6PieceMaxValue = 65535n;
      return /*let*/ createScope((nixScope) => {
        Object.defineProperty(nixScope, "expandIpv6", {
          enumerable: true,
          get() {
            return createFunc(/*arg:*/ "addr", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.equal(
                  nixScope.match("^[0-9A-Fa-f:]+$")(nixScope.addr),
                  null,
                ),
                () => (nixScope.throw(
                  new InterpolatedString([
                    "",
                    " contains malformed characters for IPv6 address",
                  ], [() => (nixScope.addr)]),
                )),
                () => (/*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "pieces", {
                    enumerable: true,
                    get() {
                      return nixScope.strings["splitString"](":")(
                        nixScope.addr,
                      );
                    },
                  });
                  Object.defineProperty(nixScope, "piecesNoEmpty", {
                    enumerable: true,
                    get() {
                      return nixScope.lists["remove"]("")(nixScope.pieces);
                    },
                  });
                  Object.defineProperty(nixScope, "piecesNoEmptyLen", {
                    enumerable: true,
                    get() {
                      return nixScope.length(nixScope.piecesNoEmpty);
                    },
                  });
                  Object.defineProperty(nixScope, "zeros", {
                    enumerable: true,
                    get() {
                      return nixScope.genList(
                        createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
                          "0"
                        )),
                      )(operators.subtract(
                        nixScope.ipv6Pieces,
                        nixScope.piecesNoEmptyLen,
                      ));
                    },
                  });
                  Object.defineProperty(nixScope, "hasPrefix", {
                    enumerable: true,
                    get() {
                      return nixScope.strings["hasPrefix"]("::")(nixScope.addr);
                    },
                  });
                  Object.defineProperty(nixScope, "hasSuffix", {
                    enumerable: true,
                    get() {
                      return nixScope.strings["hasSuffix"]("::")(nixScope.addr);
                    },
                  });
                  Object.defineProperty(nixScope, "hasInfix", {
                    enumerable: true,
                    get() {
                      return nixScope.strings["hasInfix"]("::")(nixScope.addr);
                    },
                  });
                  return (operators.ifThenElse(
                    operators.equal(nixScope.addr, "::"),
                    () => (nixScope.zeros),
                    () => (operators.ifThenElse(
                      /*let*/ createScope((nixScope) => {
                        Object.defineProperty(nixScope, "emptyCount", {
                          enumerable: true,
                          get() {
                            return operators.subtract(
                              nixScope.length(nixScope.pieces),
                              nixScope.piecesNoEmptyLen,
                            );
                          },
                        });
                        Object.defineProperty(nixScope, "emptyExpected", {
                          enumerable: true,
                          get() {
                            return (operators.ifThenElse(
                              operators.or(
                                nixScope.hasPrefix,
                                nixScope.hasSuffix,
                              ),
                              () => (2n),
                              () => (operators.ifThenElse(
                                nixScope.hasInfix,
                                () => (1n),
                                () => (0n),
                              )),
                            ));
                          },
                        });
                        return operators.or(
                          operators.or(
                            operators.notEqual(
                              nixScope.emptyCount,
                              nixScope.emptyExpected,
                            ),
                            operators.and(
                              nixScope.hasInfix,
                              operators.greaterThanOrEqual(
                                nixScope.piecesNoEmptyLen,
                                nixScope.ipv6Pieces,
                              ),
                            ),
                          ),
                          operators.and(
                            operators.negate(nixScope.hasInfix),
                            operators.notEqual(
                              nixScope.piecesNoEmptyLen,
                              nixScope.ipv6Pieces,
                            ),
                          ),
                        );
                      }),
                      () => (nixScope.throw(
                        new InterpolatedString([
                          "",
                          " is not a valid IPv6 address",
                        ], [() => (nixScope.addr)]),
                      )),
                      () => (operators.ifThenElse(
                        nixScope.hasPrefix,
                        () => (operators.listConcat(
                          nixScope.zeros,
                          nixScope.piecesNoEmpty,
                        )),
                        () => (operators.ifThenElse(
                          nixScope.hasSuffix,
                          () => (operators.listConcat(
                            nixScope.piecesNoEmpty,
                            nixScope.zeros,
                          )),
                          () => (operators.ifThenElse(
                            nixScope.hasInfix,
                            () => (nixScope.concatMap(
                              createFunc(
                                /*arg:*/ "piece",
                                null,
                                {},
                                (nixScope) => (
                                  operators.ifThenElse(
                                    operators.equal(nixScope.piece, ""),
                                    () => (nixScope.zeros),
                                    () => [nixScope.piece],
                                  )
                                ),
                              ),
                            )(nixScope.pieces)),
                            () => (nixScope.pieces),
                          )),
                        )),
                      )),
                    )),
                  ));
                })),
              )
            ));
          },
        });
        Object.defineProperty(nixScope, "parseExpandedIpv6", {
          enumerable: true,
          get() {
            return createFunc(/*arg:*/ "addr", null, {}, (nixScope) => (
              ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " +
                      'lib.assertMsg (\n      length addr == ipv6Pieces\n    ) "parseExpandedIpv6: expected list of integers with ${ipv6Pieces} elements"',
                  );
                }
                return /*let*/ createScope((nixScope) => {
                  Object.defineProperty(nixScope, "u16FromHexStr", {
                    enumerable: true,
                    get() {
                      return createFunc(
                        /*arg:*/ "hex",
                        null,
                        {},
                        (nixScope) => (
                          /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "parsed", {
                              enumerable: true,
                              get() {
                                return nixScope.trivial["fromHexString"](
                                  nixScope.hex,
                                );
                              },
                            });
                            return (operators.ifThenElse(
                              operators.and(
                                operators.lessThanOrEqual(0n, nixScope.parsed),
                                operators.lessThanOrEqual(
                                  nixScope.parsed,
                                  nixScope.ipv6PieceMaxValue,
                                ),
                              ),
                              () => (nixScope.parsed),
                              () => (nixScope.throw(
                                new InterpolatedString([
                                  "0x",
                                  " is not a valid u16 integer",
                                ], [() => (nixScope.hex)]),
                              )),
                            ));
                          })
                        ),
                      );
                    },
                  });
                  return nixScope.map(
                    createFunc(/*arg:*/ "piece", null, {}, (nixScope) => (
                      nixScope.u16FromHexStr(nixScope.piece)
                    )),
                  )(nixScope.addr);
                });
              })(
                nixScope.lib["assertMsg"](
                  operators.equal(
                    nixScope.length(nixScope.addr),
                    nixScope.ipv6Pieces,
                  ),
                )(
                  new InterpolatedString([
                    "parseExpandedIpv6: expected list of integers with ",
                    " elements",
                  ], [() => (nixScope.ipv6Pieces)]),
                ),
              )
            ));
          },
        });
        return /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "parseIpv6FromString", {
            enumerable: true,
            get() {
              return createFunc(/*arg:*/ "addr", null, {}, (nixScope) => (
                nixScope.parseExpandedIpv6(nixScope.expandIpv6(nixScope.addr))
              ));
            },
          });
          return ({
            "_ipv6":
              ({
                "toStringFromExpandedIp": createFunc(
                  /*arg:*/ "pieces",
                  null,
                  {},
                  (nixScope) => (
                    nixScope.strings["concatMapStringsSep"](":")(
                      createFunc(/*arg:*/ "piece", null, {}, (nixScope) => (
                        nixScope.strings["toLower"](
                          nixScope.trivial["toHexString"](nixScope.piece),
                        )
                      )),
                    )(nixScope.pieces)
                  ),
                ),
                "split": createFunc(/*arg:*/ "addr", null, {}, (nixScope) => (
                  /*let*/ createScope((nixScope) => {
                    Object.defineProperty(nixScope, "splitted", {
                      enumerable: true,
                      get() {
                        return nixScope.strings["splitString"]("/")(
                          nixScope.addr,
                        );
                      },
                    });
                    Object.defineProperty(nixScope, "splittedLength", {
                      enumerable: true,
                      get() {
                        return nixScope.length(nixScope.splitted);
                      },
                    });
                    return (operators.ifThenElse(
                      operators.equal(nixScope.splittedLength, 1n),
                      () => ({
                        "address": nixScope.parseIpv6FromString(nixScope.addr),
                        "prefixLength": nixScope.ipv6Bits,
                      }),
                      () => (operators.ifThenElse(
                        operators.equal(nixScope.splittedLength, 2n),
                        () => ({
                          "address": nixScope.parseIpv6FromString(
                            nixScope.head(nixScope.splitted),
                          ),
                          "prefixLength": /*let*/ createScope((nixScope) => {
                            Object.defineProperty(nixScope, "n", {
                              enumerable: true,
                              get() {
                                return nixScope.strings["toInt"](
                                  nixScope.last(nixScope.splitted),
                                );
                              },
                            });
                            return (operators.ifThenElse(
                              operators.and(
                                operators.lessThanOrEqual(1n, nixScope.n),
                                operators.lessThanOrEqual(
                                  nixScope.n,
                                  nixScope.ipv6Bits,
                                ),
                              ),
                              () => (nixScope.n),
                              () => (nixScope.throw(
                                new InterpolatedString([
                                  "",
                                  " IPv6 subnet should be in range [1;",
                                  "], got ",
                                  "",
                                ], [
                                  () => (nixScope.addr),
                                  () => (nixScope.toString(nixScope.ipv6Bits)),
                                  () => (nixScope.toString(nixScope.n)),
                                ]),
                              )),
                            ));
                          }),
                        }),
                        () => (nixScope.throw(
                          new InterpolatedString([
                            "",
                            " is not a valid IPv6 address in CIDR notation",
                          ], [() => (nixScope.addr)]),
                        )),
                      )),
                    ));
                  })
                )),
              }),
          });
        });
      });
    })
  ),
);
