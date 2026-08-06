{
    description = "A two-derivation closure: parent reads its dependency's output";

    inputs = { };

    outputs = { self }:
        let
            system = builtins.currentSystem;
            dep = derivation {
                name = "closure-dep";
                inherit system;
                builder = "/bin/sh";
                PATH = "/usr/bin:/bin"; # impure demo — uses host coreutils
                args = [ "-c" "echo 'hello from dep' > $out" ];
            };
        in
        {
            # The parent's builder reads ${dep} (the dependency's output path),
            # which forces denix to realize `dep` first and rewrite its store
            # path into the relocatable store before running the parent.
            packages.${system}.default = derivation {
                name = "closure-parent";
                inherit system;
                builder = "/bin/sh";
                PATH = "/usr/bin:/bin"; # impure demo — uses host coreutils
                args = [ "-c" "cat ${dep} > $out; echo 'plus parent' >> $out" ];
            };
        };
}
