with import ../source_code/nix_lang/lib.nix;

let {

  body = concat [
    "foo"
    "bar"
    "bla"
    "test"
  ];

}
