{
  description = "flake A: builds a package using flake B's outputs";
  inputs.b.url = "path:/Users/jeffhykin/repos/denix/examples/flake-b";
  outputs = { self, b }:
    let system = builtins.currentSystem; in {
      packages.${system}.default = derivation {
        name = "uses-flake-b";
        inherit system;
        builder = "/bin/sh";
        PATH = "/usr/bin:/bin";
        msg = b.message;
        n = builtins.toString (b.lib.double 21);
        args = [ "-c" "printf '%s (n=%s)\\n' \"$msg\" \"$n\" > $out" ];
      };
    };
}
