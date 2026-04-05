{
  bar = builtins.readFileType ../source_code/nix_lang/readDir/bar;
  foo = builtins.readFileType ../source_code/nix_lang/readDir/foo;
  linked = builtins.readFileType ../source_code/nix_lang/readDir/linked;
  ldir = builtins.readFileType ../source_code/nix_lang/readDir/ldir;
}
