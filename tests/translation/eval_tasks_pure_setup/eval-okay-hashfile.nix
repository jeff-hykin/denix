let
  paths = [
    ../source_code/nix_lang/data
    ../source_code/nix_lang/binary-data
  ];
in
builtins.concatLists (
  map (hash: map (builtins.hashFile hash) paths) [
    "md5"
    "sha1"
    "sha256"
    "sha512"
  ]
)
