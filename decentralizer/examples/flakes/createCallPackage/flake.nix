{
    description = "A shim for nixpkgs.callPackage";

    inputs = {
        # libSource.url = "github:divnix/nixpkgs.lib";
        # flakeUtils.url = "github:numtide/flake-utils";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05"; 
        nixpkgs.url = "github:jeff-hykin/denix/master/?dir=decentralizer/examples/flakes/createCallPackage.nix";
        # inputs.some-dep.url = "github:username/repo?dir=path/to/subdir";
        # git@github.com:jeff-hykin/denix.git 
    };

    outputs = { self, nixpkgs, ... }:
        {
            lib = {
                makeCallPackage = (system: nixpkgs.legacyPackages.${system}.callPackage);
            };
        }
    ;
}
