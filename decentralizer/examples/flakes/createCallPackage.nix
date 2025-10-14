{
    description = "A shim for nixpkgs.callPackage";

    inputs = {
        # libSource.url = "github:divnix/nixpkgs.lib";
        # flakeUtils.url = "github:numtide/flake-utils";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05"; 
    };

    outputs = { self, nixpkgs, ... }:
        {
            lib = {
                makeCallPackage = (system: nixpkgs.legacyPackages.${system}.callPackage);
            };
        }
    ;
}
