export default createFunc(
  {
    "system": (nixScope) => (nixScope.builtins["currentSystem"]),
    "pkgs": (
      nixScope,
    ) => (operators.merge(
      nixScope.import(new Path(["../.."], []))(
        {
          "system": nixScope.system,
          "config": ({ "permittedInsecurePackages": ["nix-2.3.18"] }),
        },
      ),
      {
        "lib": nixScope.throw(
          "pkgs.lib accessed, but the lib tests should use nixpkgs' lib path directly!",
        ),
      },
    )),
    "pkgsBB": (nixScope) => (nixScope.pkgs["pkgsBuildBuild"]),
    "nix": (nixScope) => (nixScope["pkgs-nixVersions"]["stable"]),
    "nixVersions": (
      nixScope,
    ) => [
      nixScope["pkgs-nixVersions"]["minimum"],
      nixScope.nix,
      nixScope["pkgs-nixVersions"]["latest"],
    ],
    "pkgs-nixVersions": (
      nixScope,
    ) => (nixScope.import(new Path(["./nix-for-tests.nix"], []))(
      { "pkgs": nixScope.pkgsBB },
    )),
  },
  null,
  {},
  (nixScope) => (
    /*let*/ createScope((nixScope) => {
      Object.defineProperty(nixScope, "lib", {
        enumerable: true,
        get() {
          return nixScope.import(new Path(["../."], []));
        },
      });
      Object.defineProperty(nixScope, "testWithNix", {
        enumerable: true,
        get() {
          return createFunc(/*arg:*/ "nix", null, {}, (nixScope) => (
            nixScope.import(new Path(["./test-with-nix.nix"], []))(
              {
                "lib": nixScope.lib,
                "nix": nixScope.nix,
                "pkgs": nixScope.pkgsBB,
              },
            )
          ));
        },
      });
      return nixScope.pkgsBB["symlinkJoin"]({
        "name": "nixpkgs-lib-tests",
        "paths": operators.listConcat(
          nixScope.map(nixScope.testWithNix)(nixScope.nixVersions),
          [
            nixScope.import(new Path(["./maintainers.nix"], []))(
              {
                "pkgs": nixScope.pkgs,
                "lib": nixScope.import(new Path(["../."], [])),
              },
            ),
            nixScope.import(new Path(["./teams.nix"], []))(
              {
                "pkgs": nixScope.pkgs,
                "lib": nixScope.import(new Path(["../."], [])),
              },
            ),
          ],
        ),
      });
    })
  ),
);
