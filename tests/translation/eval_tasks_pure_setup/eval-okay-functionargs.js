import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "stdenvFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        { "name": "stdenv" }
      )),
  );
  defGetter(
    nixScope,
    "stdenv2Fun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        { "name": "stdenv2" }
      )),
  );
  defGetter(
    nixScope,
    "fetchurlFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        ((_cond) => {
          if (!_cond) {
            throw new Error("assertion failed: " + 'stdenv.name == "stdenv"');
          }
          return ({ "name": "fetchurl" });
        })(operators.equal(nixScope.stdenv["name"], "stdenv"))
      )),
  );
  defGetter(
    nixScope,
    "atermFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        {
          "name": new InterpolatedString(["aterm-", ""], [
            () => (nixScope.stdenv["name"]),
          ]),
        }
      )),
  );
  defGetter(
    nixScope,
    "aterm2Fun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        {
          "name": new InterpolatedString(["aterm2-", ""], [
            () => (nixScope.stdenv["name"]),
          ]),
        }
      )),
  );
  defGetter(
    nixScope,
    "nixFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        {
          "name": new InterpolatedString(["nix-", "-", ""], [
            () => (nixScope.stdenv["name"]),
            () => (nixScope.aterm["name"]),
          ]),
        }
      )),
  );
  defGetter(
    nixScope,
    "mplayerFun",
    (nixScope) =>
      createFunc(
        {
          "enableX11": (nixScope) => (false),
          "xorg": (nixScope) => (null),
          "enableFoo": (nixScope) => (true),
          "foo": (nixScope) => (null),
        },
        null,
        {},
        (nixScope) => (
          ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " + 'stdenv.name == "stdenv2"',
              );
            }
            return ((_cond) => {
              if (!_cond) {
                throw new Error(
                  "assertion failed: " +
                    'enableX11 -> xorg.libXv.name == "libXv"',
                );
              }
              return ((_cond) => {
                if (!_cond) {
                  throw new Error(
                    "assertion failed: " + "enableFoo -> foo != null",
                  );
                }
                return ({
                  "name": new InterpolatedString(["mplayer-", ".", "-", ""], [
                    () => (nixScope.stdenv["name"]),
                    () => (nixScope.xorg["libXv"]["name"]),
                    () => (nixScope.xorg["libX11"]["name"]),
                  ]),
                });
              })(
                operators.implication(
                  nixScope.enableFoo,
                  operators.notEqual(nixScope.foo, null),
                ),
              );
            })(
              operators.implication(
                nixScope.enableX11,
                operators.equal(nixScope.xorg["libXv"]["name"], "libXv"),
              ),
            );
          })(operators.equal(nixScope.stdenv["name"], "stdenv2"))
        ),
      ),
  );
  defGetter(
    nixScope,
    "makeOverridable",
    (nixScope) =>
      createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "origArgs", null, {}, (nixScope) => (
          operators.merge(
            nixScope.f(nixScope.origArgs),
            {
              "override": createFunc(
                /*arg:*/ "newArgs",
                null,
                {},
                (nixScope) => (
                  nixScope.makeOverridable(nixScope.f)(
                    operators.merge(
                      nixScope.origArgs,
                      operators.ifThenElse(
                        nixScope.builtins["isFunction"](nixScope.newArgs),
                        () => (nixScope.newArgs(nixScope.origArgs)),
                        () => (nixScope.newArgs),
                      ),
                    ),
                  )
                ),
              ),
            },
          )
        ))
      )),
  );
  defGetter(
    nixScope,
    "callPackage_",
    (nixScope) =>
      createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "args", null, {}, (nixScope) => (
            nixScope.makeOverridable(nixScope.f)(
              operators.merge(
                nixScope.builtins["intersectAttrs"](
                  nixScope.builtins["functionArgs"](nixScope.f),
                )(nixScope.pkgs),
                nixScope.args,
              ),
            )
          ))
        ))
      )),
  );
  defGetter(
    nixScope,
    "allPackages",
    (nixScope) =>
      createFunc(
        {
          "overrides": (
            nixScope,
          ) => (createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "pkgsPrev", null, {}, (nixScope) => (
              {}
            ))
          ))),
        },
        null,
        {},
        (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(
              nixScope,
              "callPackage",
              (nixScope) => nixScope.callPackage_(nixScope.pkgs),
            );
            defGetter(
              nixScope,
              "pkgs",
              (nixScope) =>
                operators.merge(
                  nixScope.pkgsStd,
                  nixScope.overrides(nixScope.pkgs)(nixScope.pkgsStd),
                ),
            );
            defGetter(nixScope, "pkgsStd", (nixScope) => ({
              "pkgs": nixScope.pkgs,
              "stdenv": nixScope.callPackage(nixScope.stdenvFun)({}),
              "stdenv2": nixScope.callPackage(nixScope.stdenv2Fun)({}),
              "fetchurl": nixScope.callPackage(nixScope.fetchurlFun)({}),
              "aterm": nixScope.callPackage(nixScope.atermFun)({}),
              "xorg": nixScope.callPackage(nixScope.xorgFun)({}),
              "mplayer": nixScope.callPackage(nixScope.mplayerFun)(
                { "stdenv": nixScope.pkgs["stdenv2"], "enableFoo": false },
              ),
              "nix": nixScope.callPackage(nixScope.nixFun)({}),
            }));
            return nixScope.pkgs;
          })
        ),
      ),
  );
  defGetter(
    nixScope,
    "libX11Fun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        { "name": "libX11" }
      )),
  );
  defGetter(
    nixScope,
    "libX11_2Fun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        { "name": "libX11_2" }
      )),
  );
  defGetter(
    nixScope,
    "libXvFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        { "name": "libXv" }
      )),
  );
  defGetter(
    nixScope,
    "xorgFun",
    (nixScope) =>
      createFunc({}, null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          defGetter(nixScope, "callPackage", (nixScope) =>
            nixScope.callPackage_(
              operators.merge(nixScope.pkgs, nixScope.pkgs["xorg"]),
            ));
          return ({
            "libX11": nixScope.callPackage(nixScope.libX11Fun)({}),
            "libXv": nixScope.callPackage(nixScope.libXvFun)({}),
          });
        })
      )),
  );
  return /*let*/ createScope((nixScope) => {
    defGetter(nixScope, "pkgs", (nixScope) => nixScope.allPackages({}));
    defGetter(
      nixScope,
      "pkgs2",
      (nixScope) =>
        nixScope.allPackages(
          {
            "overrides": createFunc(/*arg:*/ "pkgs", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "pkgsPrev", null, {}, (nixScope) => (
                {
                  "stdenv": nixScope.pkgs["stdenv2"],
                  "nix": nixScope.pkgsPrev["nix"]["override"](
                    {
                      "aterm": nixScope.aterm2Fun(createScope((nixScope) => {
                        const obj = {};
                        obj.stdenv = nixScope.pkgs.stdenv;
                        obj.fetchurl = nixScope.pkgs.fetchurl;
                        return obj;
                      })),
                    },
                  ),
                  "xorg": operators.merge(
                    nixScope.pkgsPrev["xorg"],
                    {
                      "libX11": nixScope.libX11_2Fun(createScope((nixScope) => {
                        const obj = {};
                        obj.stdenv = nixScope.pkgs.stdenv;
                        obj.fetchurl = nixScope.pkgs.fetchurl;
                        return obj;
                      })),
                    },
                  ),
                }
              ))
            )),
          },
        ),
    );
    return [
      nixScope.pkgs["stdenv"]["name"],
      nixScope.pkgs["fetchurl"]["name"],
      nixScope.pkgs["aterm"]["name"],
      nixScope.pkgs2["aterm"]["name"],
      nixScope.pkgs["xorg"]["libX11"]["name"],
      nixScope.pkgs["xorg"]["libXv"]["name"],
      nixScope.pkgs["mplayer"]["name"],
      nixScope.pkgs2["mplayer"]["name"],
      nixScope.pkgs["nix"]["name"],
      nixScope.pkgs2["nix"]["name"],
    ];
  });
});
