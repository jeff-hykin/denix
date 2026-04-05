with import ../source_code/nix_lang/lib.nix;

builtins.mapAttrs (name: value: name + "-" + value) {
  x = "foo";
  y = "bar";
}
