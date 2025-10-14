{
    description = "A shim for nixpkgs.callPackage";

    inputs = {
        static.url = "path:./static.yaml";
        static.flake = false;
        # libSource.url = "github:divnix/nixpkgs.lib";
        # flakeUtils.url = "github:numtide/flake-utils";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05"; 
        # makeCallPackageFlake.url = "github:jeff-hykin/denix/6077a2bf165411fd2f75c7bd6517d70ddf804080/?dir=decentralizer/examples/flakes/createCallPackage";
    };
    
    outputs = { self, nixpkgs, static, ... }:
        {
            static = static;
            lib = {
                static = static;
                makeCallPackage = (system: nixpkgs.legacyPackages.${system}.callPackage);
                makeMkDerivation = (system: nixpkgs.legacyPackages.${system}.mkDerivation);
            };
        }
    ;
}
