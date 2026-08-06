{
    description = "A CMake-built C program, realized by denix (impure: uses host cmake + compiler).";

    inputs = { };

    outputs = { self }:
        let
            system = builtins.currentSystem;
        in
        {
            # Impure demo, in the same spirit as the homemade cowsay flake: it
            # drives a real CMake configure + build + install using host tools.
            # The builder writes a tiny C project, configures it with CMake,
            # compiles it, and installs the binary into $out/bin.
            packages.${system}.default = derivation {
                name = "cmake-hello-1.0";
                inherit system;
                builder = "/bin/sh";
                # cmake (homebrew), cc/make/xcrun (host) — declared explicitly
                # because denix no longer leaks the host PATH into builders.
                PATH = "/opt/homebrew/bin:/usr/bin:/bin";
                args = [
                    "-c"
                    ''
                        set -e
                        src="$PWD/src"
                        mkdir -p "$src"
                        cd "$src"

                        cat > CMakeLists.txt <<'CMAKELISTS'
                        cmake_minimum_required(VERSION 3.10)
                        project(cmake_hello C)
                        add_executable(cmake-hello main.c)
                        install(TARGETS cmake-hello DESTINATION bin)
                        CMAKELISTS

                        cat > main.c <<'MAINC'
                        #include <stdio.h>
                        int main(void) {
                            printf("Hello from a CMake-built binary, via denix!\n");
                            return 0;
                        }
                        MAINC

                        mkdir -p build
                        cd build
                        cmake -DCMAKE_INSTALL_PREFIX="$out" -DCMAKE_BUILD_TYPE=Release ..
                        cmake --build .
                        cmake --install .
                    ''
                ];
            };
        };
}
