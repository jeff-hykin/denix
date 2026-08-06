{
    description = "PATH-from-dependency demo: a pure consumer uses a tool that only a built dependency provides (no host PATH).";

    inputs = { };

    outputs = { self }:
        let
            system = builtins.currentSystem;

            # A minimal "stdenv-lite": it provides a `greet` tool in $out/bin.
            # Building IT is impure (it bootstraps using host coreutils, exactly
            # like Nix's bootstrap-tools blob seeds the real stdenv), so it
            # declares its own PATH.
            stdenvLite = derivation {
                name = "stdenv-lite";
                inherit system;
                builder = "/bin/sh";
                PATH = "/usr/bin:/bin";
                args = [
                    "-c"
                    ''
                        mkdir -p "$out/bin"
                        cat > "$out/bin/greet" <<'GREET'
                        #!/bin/sh
                        echo "Hello, $1 — brought to you by a dependency-provided tool."
                        GREET
                        chmod +x "$out/bin/greet"
                    ''
                ];
            };
        in
        {
            # The consumer is PURE: it sets PATH to the dependency's bin and
            # nothing else. `greet` resolves only because stdenvLite is on PATH;
            # the host's /usr/bin is NOT available. This is the correct model
            # for everything above the bootstrap.
            packages.${system}.default = derivation {
                name = "greeting";
                inherit system;
                builder = "/bin/sh";
                PATH = "${stdenvLite}/bin";
                args = [ "-c" "greet denix > $out" ];
            };
        };
}
