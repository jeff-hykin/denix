export default /**
  Instantiate the library tests for a given Nix version.

  IMPORTANT:
  This is used by the github.com/NixOS/nix CI.
  This is used by Lix's CI (see flake.nix in the Lix repo).

  Try not to change the interface of this file, or if you need to, ping the
  Nix AND Lix maintainers (`nix eval -f . lib.teams.lix`) for help. Thank you!
*/ createFunc({}, null, {}, (nixScope) => (
  nixScope.pkgs["runCommand"](
    new InterpolatedString(["nixpkgs-lib-tests-nix-", ""], [
      () => (nixScope.nix["version"]),
    ]),
  )({
    "buildInputs": [
      nixScope.import(new Path(["./check-eval.nix"], [])),
      nixScope.import(new Path(["./fetchers.nix"], [])),
      nixScope.import(new Path(["../path/tests"], []))(
        { "pkgs": nixScope.pkgs },
      ),
    ],
    "nativeBuildInputs": operators.listConcat(
      [nixScope.nix, nixScope.pkgs["gitMinimal"]],
      nixScope.lib["optional"](
        nixScope.pkgs["stdenv"]["hostPlatform"]["isLinux"],
      )(nixScope.pkgs["inotify-tools"]),
    ),
    "strictDeps": true,
  })(
    new InterpolatedString([
      '\n    datadir="',
      '/share"\n    export TEST_ROOT=$(pwd)/test-tmp\n    export HOME=$(mktemp -d)\n    export NIX_BUILD_HOOK=\n    export NIX_CONF_DIR=$TEST_ROOT/etc\n    export NIX_LOCALSTATE_DIR=$TEST_ROOT/var\n    export NIX_LOG_DIR=$TEST_ROOT/var/log/nix\n    export NIX_STATE_DIR=$TEST_ROOT/var/nix\n    export NIX_STORE_DIR=$TEST_ROOT/store\n    export PAGER=cat\n    cacheDir=$TEST_ROOT/binary-cache\n\n    nix-store --init\n\n    cp -r ',
      ' lib\n    echo "Running lib/tests/modules.sh"\n    bash lib/tests/modules.sh\n\n    echo "Checking lib.version"\n    nix-instantiate lib -A version --eval || {\n      echo "lib.version does not evaluate when lib is isolated from the rest of the nixpkgs tree"\n      exit 1\n    }\n\n    echo "Running lib/tests/filesystem.sh"\n    TEST_LIB=$PWD/lib bash lib/tests/filesystem.sh\n\n    echo "Running lib/tests/sources.sh"\n    TEST_LIB=$PWD/lib bash lib/tests/sources.sh\n\n    echo "Running lib/tests/network.sh"\n    TEST_LIB=$PWD/lib bash lib/tests/network.sh\n\n    echo "Running lib/fileset/tests.sh"\n    TEST_LIB=$PWD/lib bash lib/fileset/tests.sh\n\n    echo "Running lib/tests/systems.nix"\n    [[ $(nix-instantiate --eval --strict lib/tests/systems.nix | tee /dev/stderr) == \'[ ]\' ]];\n\n    mkdir $out\n    echo success > $out/',
      "\n  ",
    ], [
      () => (nixScope.nix),
      () => (new Path(["../."], [])),
      () => (nixScope.nix["version"]),
    ]),
  )
));
