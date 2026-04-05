let

  overrides = {
    import = fn: scopedImport overrides fn;

    scopedImport = attrs: fn: scopedImport (overrides // attrs) fn;

    builtins = builtins // overrides;
  }
  // import ../source_code/nix_lang/lib.nix;

in
scopedImport overrides ./imported.nix
