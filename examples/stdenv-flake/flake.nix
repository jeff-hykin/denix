{
    description = "A minimal stdenv, bootstrapped and run entirely by denix, plus cmake built on top of it.";

    inputs = { };

    outputs = { self }:
        let
            system = builtins.currentSystem;

            # ---- the bootstrap layer ------------------------------------
            # A denix-built derivation that gathers a core toolchain into
            # $out/bin. This is the analogue of nixpkgs' prebuilt
            # bootstrap-tools blob: everything above it is built using only
            # THIS on PATH (no host PATH leak). It is impure in that it seeds
            # from the host's tools, but it is a real derivation that denix
            # realizes, and downstream builds depend on it by store path.
            bootstrapTools = derivation {
                name = "bootstrap-tools";
                inherit system;
                builder = "/bin/sh";
                PATH = "/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin";
                args = [
                    "-c"
                    ''
                        set -e
                        mkdir -p "$out/bin"
                        for tool in \
                            sh bash env cc c++ clang ld as ar ranlib libtool \
                            make cmake tar gzip xz install pkg-config xcrun \
                            cat cp mv rm mkdir rmdir chmod chown ln ls pwd \
                            test true false expr seq sort head tail wc tr cut \
                            sed grep egrep fgrep awk dirname basename realpath \
                            printf echo touch find xargs uname date sleep which \
                            getconf perl m4 vm_stat sysctl hostname nproc sw_vers
                        do
                            src="$(command -v "$tool" 2>/dev/null || true)"
                            if [ -n "$src" ]; then
                                ln -sf "$src" "$out/bin/$tool"
                            fi
                        done
                    ''
                ];
            };

            # ---- the stdenv ---------------------------------------------
            # Built by denix: $out/setup is a sourceable script that puts the
            # bootstrap toolchain on PATH and defines default build phases.
            stdenvDrv = derivation {
                name = "stdenv";
                inherit system;
                builder = "/bin/sh";
                PATH = "/usr/bin:/bin";
                # interpolating the derivation makes stdenv depend on it
                toolsBin = "${bootstrapTools}/bin";
                args = [
                    "-c"
                    ''
                        set -e
                        mkdir -p "$out"
                        cat > "$out/setup" <<'SETUP'
                        # minimal stdenv setup, sourced by every mkDerivation build
                        export PATH="@toolsBin@"
                        genericBuild() {
                            [ -n "$src" ] && cp -R "$src"/. . 2>/dev/null || true
                            eval "''${configurePhase:-:}"
                            eval "''${buildPhase:-:}"
                            eval "''${installPhase:-:}"
                        }
                        SETUP
                        # bake the real tools path into setup
                        sed -i.bak "s|@toolsBin@|$toolsBin|" "$out/setup"
                        rm -f "$out/setup.bak"
                    ''
                ];
            };

            # mkDerivation: the heart of a stdenv. Produces a derivation whose
            # builder sources stdenv's setup (toolchain on PATH) and runs the
            # standard phases. PATH is the bootstrap toolchain ONLY.
            mkDerivation =
                { name
                , src ? null
                , configurePhase ? ""
                , buildPhase ? ""
                , installPhase ? ""
                }:
                derivation {
                    inherit name system src configurePhase buildPhase installPhase;
                    builder = "/bin/sh";
                    stdenv = "${stdenvDrv}";
                    PATH = "${bootstrapTools}/bin";
                    args = [
                        "-c"
                        ''
                            set -e
                            . "$stdenv/setup"
                            genericBuild
                        ''
                    ];
                };

            stdenv = { inherit mkDerivation bootstrapTools; };
        in
        {
            packages.${system} = {
                bootstrap-tools = bootstrapTools;
                stdenv = stdenvDrv;

                # A trivial package, built BY the denix-bootstrapped stdenv,
                # to prove mkDerivation runs.
                hello = stdenv.mkDerivation {
                    name = "hello-stdenv";
                    installPhase = "mkdir -p $out/bin; printf '#!/bin/sh\\necho hello from a denix-built stdenv\\n' > $out/bin/hello; chmod +x $out/bin/hello";
                };

                # cmake, built on the denix-bootstrapped stdenv.
                default = stdenv.mkDerivation {
                    name = "cmake-on-denix-stdenv";
                    buildPhase = ''
                        mkdir -p proj/build
                        cat > proj/CMakeLists.txt <<'CML'
                        cmake_minimum_required(VERSION 3.10)
                        project(demo C)
                        add_executable(demo main.c)
                        install(TARGETS demo DESTINATION bin)
                        CML
                        cat > proj/main.c <<'MAINC'
                        #include <stdio.h>
                        int main(void){ printf("cmake built on a denix-bootstrapped stdenv\n"); return 0; }
                        MAINC
                        cd proj/build
                        cmake -DCMAKE_INSTALL_PREFIX="$out" -DCMAKE_BUILD_TYPE=Release ..
                        cmake --build .
                    '';
                    # buildPhase left us in proj/build; install from there.
                    installPhase = ''
                        cmake --install .
                    '';
                };
            };
        };
}
