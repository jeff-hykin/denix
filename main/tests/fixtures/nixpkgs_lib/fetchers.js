export default //
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "commonH",
      (nixScope) =>
        createFunc(/*arg:*/ "hashTypes", null, {}, (nixScope) => (
          /*rec*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "hashNames",
              (nixScope) => operators.listConcat(["hash"], nixScope.hashTypes),
            );
            defGetter(
              nixScope,
              "hashSet",
              (nixScope) =>
                nixScope.lib["genAttrs"](nixScope.hashNames)(
                  nixScope.lib["const"]({}),
                ),
            );
            return nixScope;
          })
        )),
    );
    defGetter(
      nixScope,
      "fakeH",
      (nixScope) => ({
        "hash": nixScope.lib["fakeHash"],
        "sha256": nixScope.lib["fakeSha256"],
        "sha512": nixScope.lib["fakeSha512"],
      }),
    );
    return /*rec*/ createScope((nixScope) => {
      nixScope.proxyImpureEnvVars = [
        "http_proxy",
        "https_proxy",
        "ftp_proxy",
        "all_proxy",
        "no_proxy",
        "HTTP_PROXY",
        "HTTPS_PROXY",
        "FTP_PROXY",
        "ALL_PROXY",
        "NO_PROXY",
        "NIX_SSL_CERT_FILE",
      ];
      defGetter(
        nixScope,
        "normalizeHash",
        (nixScope) =>
          createFunc(
            {
              "hashTypes": (nixScope) => ["sha256"],
              "required": (nixScope) => (true),
            },
            null,
            {},
            (nixScope) => (
              /*let*/ createScope((nixScope) => {
                nixScope.concatMapStringsSep =
                  nixScope.lib["concatMapStringsSep"];
                nixScope.head = nixScope.lib["head"];
                nixScope.tail = nixScope.lib["tail"];
                nixScope.throwIf = nixScope.lib["throwIf"];
                nixScope.attrsToList = nixScope.lib["attrsets"]["attrsToList"];
                nixScope.intersectAttrs =
                  nixScope.lib["attrsets"]["intersectAttrs"];
                nixScope.removeAttrs = nixScope.lib["attrsets"]["removeAttrs"];
                nixScope.optionalAttrs =
                  nixScope.lib["attrsets"]["optionalAttrs"];
                nixScope.hashNames =
                  nixScope.commonH(nixScope.hashTypes)["hashNames"];
                nixScope.hashSet =
                  nixScope.commonH(nixScope.hashTypes)["hashSet"];
                return createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                  operators.ifThenElse(
                    operators.hasAttr(nixScope.args, "outputHash"),
                    () => (nixScope.args),
                    () => (/*let*/ createScope((nixScope) => {
                      defGetter(nixScope, "h", (nixScope) =>
                        /*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "hashesAsNVPairs", (nixScope) =>
                            nixScope.attrsToList(
                              nixScope.intersectAttrs(nixScope.hashSet)(
                                nixScope.args,
                              ),
                            ));
                          return (operators.ifThenElse(
                            operators.equal(nixScope.hashesAsNVPairs, []),
                            () => (nixScope.throwIf(nixScope.required)(
                              "fetcher called without `hash`",
                            )(null)),
                            () => (operators.ifThenElse(
                              operators.notEqual(
                                nixScope.tail(nixScope.hashesAsNVPairs),
                                [],
                              ),
                              () => (nixScope.throw(
                                new InterpolatedString([
                                  "fetcher called with mutually-incompatible arguments: ",
                                  "",
                                ], [
                                  () => (nixScope.concatMapStringsSep(", ")(
                                    createFunc(
                                      /*arg:*/ "a",
                                      null,
                                      {},
                                      (nixScope) => (
                                        nixScope.a["name"]
                                      ),
                                    ),
                                  )(nixScope.hashesAsNVPairs)),
                                ]),
                              )),
                              () => (nixScope.head(nixScope.hashesAsNVPairs)),
                            )),
                          ));
                        }));
                      return operators.merge(
                        nixScope.removeAttrs(nixScope.args)(nixScope.hashNames),
                        nixScope.optionalAttrs(
                          operators.notEqual(nixScope.h, null),
                        )({
                          "outputHashAlgo":
                            (operators.ifThenElse(
                              operators.equal(nixScope.h["name"], "hash"),
                              () => (null),
                              () => (nixScope.h["name"]),
                            )),
                          "outputHash":
                            (operators.ifThenElse(
                              operators.equal(nixScope.h["value"], ""),
                              () => (operators.selectOrDefault(
                                nixScope.fakeH,
                                [nixScope.h["name"]],
                                nixScope.throw(
                                  new InterpolatedString([
                                    "no “fake hash” defined for ",
                                    "",
                                  ], [() => (nixScope.h["name"])]),
                                ),
                              )),
                              () => (nixScope.h["value"]),
                            )),
                        }),
                      );
                    })),
                  )
                ));
              })
            ),
          ),
      );
      defGetter(
        nixScope,
        "withNormalizedHash",
        (nixScope) =>
          createFunc(
            { "hashTypes": (nixScope) => ["sha256"] },
            null,
            {},
            (nixScope) => (
              createFunc(/*arg:*/ "fetcher", null, {}, (nixScope) => (
                /*let*/ createScope((nixScope) => {
                  nixScope.intersectAttrs =
                    nixScope.lib["attrsets"]["intersectAttrs"];
                  nixScope.removeAttrs =
                    nixScope.lib["attrsets"]["removeAttrs"];
                  nixScope.functionArgs =
                    nixScope.lib["trivial"]["functionArgs"];
                  nixScope.setFunctionArgs =
                    nixScope.lib["trivial"]["setFunctionArgs"];
                  nixScope.hashSet =
                    nixScope.commonH(nixScope.hashTypes)["hashSet"];
                  defGetter(
                    nixScope,
                    "fArgs",
                    (nixScope) => nixScope.functionArgs(nixScope.fetcher),
                  );
                  defGetter(nixScope, "normalize", (nixScope) =>
                    nixScope.normalizeHash(
                      {
                        "hashTypes": nixScope.hashTypes,
                        "required": operators.negate(
                          nixScope.fArgs["outputHash"],
                        ),
                      },
                    ));
                  return ((_cond) => {
                    if (!_cond) {
                      throw new Error(
                        "assertion failed: " +
                          "fArgs ? outputHash && fArgs ? outputHashAlgo",
                      );
                    }
                    return ((_cond) => {
                      if (!_cond) {
                        throw new Error(
                          "assertion failed: " +
                            "intersectAttrs fArgs hashSet == { }",
                        );
                      }
                      return nixScope.setFunctionArgs(
                        createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
                          nixScope.fetcher(nixScope.normalize(nixScope.args))
                        )),
                      )(operators.merge(
                        nixScope.removeAttrs(nixScope.fArgs)([
                          "outputHash",
                          "outputHashAlgo",
                        ]),
                        { "hash": nixScope.fArgs["outputHash"] },
                      ));
                    })(
                      operators.equal(
                        nixScope.intersectAttrs(nixScope.fArgs)(
                          nixScope.hashSet,
                        ),
                        {},
                      ),
                    );
                  })(
                    operators.and(
                      operators.hasAttr(nixScope.fArgs, "outputHash"),
                      operators.hasAttr(nixScope.fArgs, "outputHashAlgo"),
                    ),
                  );
                })
              ))
            ),
          ),
      );
      return nixScope;
    });
  })
));
