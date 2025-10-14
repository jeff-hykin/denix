{
    description = "Program which generates ASCII pictures of a cow with a message";

    inputs = {
        static.url = "path:./static.json";
        static.flake = false;
        libSource.url = "github:divnix/nixpkgs.lib";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
        flakeUtils.url = "github:numtide/flake-utils";
        # makeCallPackageFlake.url = "github:jeff-hykin/denix/6077a2bf165411fd2f75c7bd6517d70ddf804080/?dir=decentralizer/examples/flakes/createCallPackage";
    };
    
    outputs = { self, static, libSource, flakeUtils, nixpkgs, ... }:
        let
            staticData = builtins.fromJSON (builtins.readFile static.path);
            lib = libSource.lib;
        in
            flake-utils.lib.eachSystem staticData.meta.platforms (system:
                let
                    pkgs = nixpkgs.legacyPackages.${system};
                in
                    {
                        packages = {
                            default = (pkgs.callPackage
                                (/* FIXME: */{
                                    lib,
                                    fetchFromGitHub,
                                    makeWrapper,
                                    nix-update-script,
                                    perl,
                                    stdenv,
                                    testers,
                                }:
                                
                                stdenv.mkDerivation (finalAttrs: {
                                    pname = "cowsay";
                                    version = "3.8.4";
                                
                                    outputs = [
                                        "out"
                                        "man"
                                    ];
                                
                                    src = fetchFromGitHub {
                                        owner = "cowsay-org";
                                        repo = "cowsay";
                                        rev = "v${finalAttrs.version}";
                                        hash = "sha256-m3Rndw0rnTBLhs15KqokzIOWuYl6aoPqEu2MHWpXRCs=";
                                    };
                                
                                    nativeBuildInputs = [ makeWrapper ];
                                
                                    buildInputs = [ perl ];
                                
                                    makeFlags = [ "prefix=${placeholder "out"}" ];
                                
                                    postInstall = ''
                                        wrapProgram $out/bin/cowsay \
                                            --suffix COWPATH : $out/share/cowsay/cows
                                    '';
                                
                                    passthru = {
                                        updateScript = nix-update-script { };
                                        tests.version = testers.testVersion {
                                            package = finalAttrs.finalPackage;
                                            command = "cowsay --version";
                                        };
                                    };
                                
                                    meta = with lib; {
                                        description = "Program which generates ASCII pictures of a cow with a message";
                                        homepage = "https://cowsay.diamonds";
                                        changelog = "https://github.com/cowsay-org/cowsay/releases/tag/v${finalAttrs.version}";
                                        license = licenses.gpl3Only;
                                        platforms = platforms.all;
                                        maintainers = with maintainers; [
                                            rob
                                            anthonyroussel
                                        ];
                                        mainProgram = "cowsay";
                                    };
                                })/* FIXME: */
                                
                                )
                                {}
                            );
                        };
                    }
            )
    ;
}