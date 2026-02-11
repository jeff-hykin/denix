export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.pkgs = {};
    nixScope.pkgs["hello"] = { "type": "derivation", "pname": "hello" };
    return ({
      "options": ({
        "package": nixScope.lib["mkPackageOption"](nixScope.pkgs)("hello")({}),
        "namedPackage": nixScope.lib["mkPackageOption"](nixScope.pkgs)("Hello")(
          { "default": ["hello"] },
        ),
        "namedPackageSingletonDefault": nixScope.lib["mkPackageOption"](
          nixScope.pkgs,
        )("Hello")({ "default": "hello" }),
        "pathPackage": nixScope.lib["mkPackageOption"](nixScope.pkgs)([
          "hello",
        ])({}),
        "packageWithExample": nixScope.lib["mkPackageOption"](nixScope.pkgs)(
          "hello",
        )({ "example": "pkgs.hello.override { stdenv = pkgs.clangStdenv; }" }),
        "packageWithPathExample": nixScope.lib["mkPackageOption"](
          nixScope.pkgs,
        )("hello")({ "example": ["hello"] }),
        "packageWithExtraDescription": nixScope.lib["mkPackageOption"](
          nixScope.pkgs,
        )("hello")({ "extraDescription": "Example extra description." }),
        "undefinedPackage": nixScope.lib["mkPackageOption"](nixScope.pkgs)(
          "hello",
        )({ "default": null }),
        "nullablePackage": nixScope.lib["mkPackageOption"](nixScope.pkgs)(
          "hello",
        )({ "nullable": true, "default": null }),
        "nullablePackageWithDefault": nixScope.lib["mkPackageOption"](
          nixScope.pkgs,
        )("hello")({ "nullable": true }),
        "packageWithPkgsText": nixScope.lib["mkPackageOption"](nixScope.pkgs)(
          "hello",
        )({ "pkgsText": "myPkgs" }),
        "packageFromOtherSet": /*let*/ createScope((nixScope) => {
          defGetter(
            nixScope,
            "myPkgs",
            (nixScope) => ({
              "hello": operators.merge(
                nixScope.pkgs["hello"],
                { "pname": "hello-other" },
              ),
            }),
          );
          return nixScope.lib["mkPackageOption"](nixScope.myPkgs)("hello")({});
        }),
        "packageInvalidIdentifier": /*let*/ createScope((nixScope) => {
          nixScope.myPkgs = {};
          nixScope.myPkgs['"123"']['"with\\"quote"'] = createScope(
            (nixScope) => {
              const obj = {};
              obj.hello = nixScope.pkgs.hello;
              return obj;
            },
          );
          return nixScope.lib["mkPackageOption"](nixScope.myPkgs)([
            "123",
            "with",
            "hello",
          ])({});
        }),
        "packageInvalidIdentifierExample": nixScope.lib["mkPackageOption"](
          nixScope.pkgs,
        )("hello")({ "example": ["123", "with", "hello"] }),
      }),
    });
  })
));
