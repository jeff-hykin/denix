with import ../source_code/nix_lang/lib.nix;

concat (
  map (x: x + "bar") [
    "foo"
    "bla"
    "xyzzy"
  ]
)
