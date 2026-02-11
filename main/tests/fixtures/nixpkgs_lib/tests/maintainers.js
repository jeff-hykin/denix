export default //
//
//
createFunc(
  {
    "pkgs": (nixScope) => (nixScope.import(new Path(["../.."], []))({})),
    "lib": (nixScope) => (nixScope.pkgs["lib"]),
  },
  null,
  {},
  (nixScope) => (
    /*let*/ createScope((nixScope) => {
      defGetter(nixScope, "checkMaintainer", (nixScope) =>
        createFunc(/*arg:*/ "handle", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "uncheckedAttrs", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "prefix",
                (nixScope) => ["lib", "maintainers", nixScope.handle],
              );
              defGetter(nixScope, "checkedAttrs", (nixScope) =>
                (nixScope.lib["modules"]["evalModules"]({
                  "prefix": nixScope.prefix,
                  "modules": [
                    new Path(["./maintainer-module.nix"], []),
                    {
                      "_file": nixScope.toString(
                        new Path(["../../maintainers/maintainer-list.nix"], []),
                      ),
                      "config": nixScope.uncheckedAttrs,
                    },
                  ],
                }))["config"]);
              defGetter(nixScope, "checks", (nixScope) =>
                operators.listConcat(
                  nixScope.lib["optional"](
                    operators.and(
                      operators.notEqual(nixScope.checkedAttrs["github"], null),
                      operators.equal(nixScope.checkedAttrs["githubId"], null),
                    ),
                  )(
                    new InterpolatedString([
                      "\n          echo ",
                      "': If \\`github\\` is specified, \\`githubId\\` must be too.'\n          # Calling this too often would hit non-authenticated API limits, but this\n          # shouldn't happen since such errors will get fixed rather quickly\n          info=$(curl -sS https://api.github.com/users/",
                      ')\n          id=$(jq -r \'.id\' <<< "$info")\n          echo "The GitHub ID for GitHub user ',
                      ' is $id:"\n          echo -e "    githubId = $id;\\n"\n        ',
                    ], [
                      () => (nixScope.lib["escapeShellArg"](
                        nixScope.lib["showOption"](nixScope.prefix),
                      )),
                      () => (nixScope.checkedAttrs["github"]),
                      () => (nixScope.checkedAttrs["github"]),
                    ]),
                  ),
                  operators.listConcat(
                    nixScope.lib["optional"](
                      operators.and(
                        operators.and(
                          operators.equal(nixScope.checkedAttrs["email"], null),
                          operators.equal(
                            nixScope.checkedAttrs["github"],
                            null,
                          ),
                        ),
                        operators.equal(nixScope.checkedAttrs["matrix"], null),
                      ),
                    )(
                      new InterpolatedString([
                        "\n              echo ",
                        "': At least one of \\`email\\`, \\`github\\` or \\`matrix\\` must be specified, so that users know how to reach you.'\n            ",
                      ], [
                        () => (nixScope.lib["escapeShellArg"](
                          nixScope.lib["showOption"](nixScope.prefix),
                        )),
                      ]),
                    ),
                    nixScope.lib["optional"](
                      operators.and(
                        operators.notEqual(
                          nixScope.checkedAttrs["email"],
                          null,
                        ),
                        nixScope.lib["hasSuffix"]("noreply.github.com")(
                          nixScope.checkedAttrs["email"],
                        ),
                      ),
                    )(
                      new InterpolatedString([
                        "\n              echo ",
                        "': If an email address is given, it should allow people to reach you. If you do not want that, you can just provide \\`github\\` or \\`matrix\\` instead.'\n            ",
                      ], [
                        () => (nixScope.lib["escapeShellArg"](
                          nixScope.lib["showOption"](nixScope.prefix),
                        )),
                      ]),
                    ),
                  ),
                ));
              return nixScope.lib["deepSeq"](nixScope.checkedAttrs)(
                nixScope.checks,
              );
            })
          ))
        )));
      defGetter(nixScope, "missingGithubIds", (nixScope) =>
        nixScope.lib["concatLists"](
          nixScope.lib["mapAttrsToList"](nixScope.checkMaintainer)(
            nixScope.lib["maintainers"],
          ),
        ));
      defGetter(nixScope, "success", (nixScope) =>
        nixScope.pkgs["runCommand"]("checked-maintainers-success")({})(
          "mkdir $out",
        ));
      defGetter(nixScope, "failure", (nixScope) =>
        nixScope.pkgs["runCommand"]("checked-maintainers-failure")({
          "nativeBuildInputs": [nixScope.pkgs["curl"], nixScope.pkgs["jq"]],
          "outputHash":
            (new InterpolatedString(["sha256:", ""], [
              () => (nixScope.lib["fakeSha256"]),
            ])),
          "outputHAlgo": "sha256",
          "outputHashMode": "flat",
          "SSL_CERT_FILE":
            (new InterpolatedString(["", "/etc/ssl/certs/ca-bundle.crt"], [
              () => (nixScope.pkgs["cacert"]),
            ])),
        })(
          new InterpolatedString(["\n        ", "\n        exit 1\n      "], [
            () => (nixScope.lib["concatStringsSep"]("")(
              nixScope.missingGithubIds,
            )),
          ]),
        ));
      return (operators.ifThenElse(
        operators.equal(nixScope.missingGithubIds, []),
        () => (nixScope.success),
        () => (nixScope.failure),
      ));
    })
  ),
);
