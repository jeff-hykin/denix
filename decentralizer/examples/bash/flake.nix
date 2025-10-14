{
    description = "GNU Bourne-Again Shell, the de facto standard shell on Linux (for interactive use)";

    inputs = {
        static.url = "path:./static.json";
        static.flake = false;
        libSource.url = "github:divnix/nixpkgs.lib";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
        flakeUtils.url = "github:numtide/flake-utils";
        # makeCallPackageFlake.url = "github:jeff-hykin/denix/6077a2bf165411fd2f75c7bd6517d70ddf804080/?dir=decentralizer/examples/flakes/createCallPackage";
    };
    
    outputs = { self, static, libSource, flakeUtils, nixpkgs, ... }:
        let
            staticData = builtins.fromJSON (builtins.readFile static.outPath);
            lib = libSource.lib;
        in
            flakeUtils.lib.eachSystem staticData.meta.platforms (system:
                let
                    pkgs = nixpkgs.legacyPackages.${system};
                in
                    {
                        packages = {
                            default = (pkgs.callPackage
                                ({
                                    lib,
                                    stdenv,
                                    buildPackages,
                                    fetchurl,
                                    updateAutotoolsGnuConfigScriptsHook,
                                    bison,
                                    util-linux,
                                
                                    interactive ? true,
                                    readline,
                                    withDocs ? null,
                                    forFHSEnv ? false,
                                
                                    pkgsStatic,
                                }:
                                
                                let
                                    upstreamPatches = import ./bash-5.2-patches.nix (
                                        nr: sha256:
                                        fetchurl {
                                            url = "mirror://gnu/bash/bash-5.2-patches/bash52-${nr}";
                                            inherit sha256;
                                        }
                                    );
                                in
                                lib.warnIf (withDocs != null)
                                    ''
                                        bash: `.override { withDocs = true; }` is deprecated, the docs are always included.
                                    ''
                                    stdenv.mkDerivation
                                    rec {
                                        pname = "bash${lib.optionalString interactive "-interactive"}";
                                        version = "5.2${patch_suffix}";
                                        patch_suffix = "p${toString (builtins.length upstreamPatches)}";
                                
                                        src = fetchurl {
                                            url = "mirror://gnu/bash/bash-${lib.removeSuffix patch_suffix version}.tar.gz";
                                            sha256 = "sha256-oTnBZt9/9EccXgczBRZC7lVWwcyKSnjxRVg8XIGrMvs=";
                                        };
                                
                                        hardeningDisable =
                                            [ "format" ]
                                            # bionic libc is super weird and has issues with fortify outside of its own libc, check this comment:
                                            # https://github.com/NixOS/nixpkgs/pull/192630#discussion_r978985593
                                            # or you can check libc/include/sys/cdefs.h in bionic source code
                                            ++ lib.optional (stdenv.hostPlatform.libc == "bionic") "fortify";
                                
                                        outputs = [
                                            "out"
                                            "dev"
                                            "man"
                                            "doc"
                                            "info"
                                        ];
                                
                                        separateDebugInfo = true;
                                
                                        env.NIX_CFLAGS_COMPILE =
                                            ''
                                                -DSYS_BASHRC="/etc/bashrc"
                                                -DSYS_BASH_LOGOUT="/etc/bash_logout"
                                            ''
                                            + lib.optionalString (!forFHSEnv) ''
                                                -DDEFAULT_PATH_VALUE="/no-such-path"
                                                -DSTANDARD_UTILS_PATH="/no-such-path"
                                                -DDEFAULT_LOADABLE_BUILTINS_PATH="${placeholder "out"}/lib/bash:."
                                            ''
                                            + ''
                                                -DNON_INTERACTIVE_LOGIN_SHELLS
                                                -DSSH_SOURCE_BASHRC
                                            '';
                                
                                        patchFlags = [ "-p0" ];
                                
                                        patches = upstreamPatches ++ [
                                            ./pgrp-pipe-5.patch
                                            # Apply parallel build fix pending upstream inclusion:
                                            #   https://savannah.gnu.org/patch/index.php?10373
                                            # Had to fetch manually to workaround -p0 default.
                                            ./parallel.patch
                                            # Fix `pop_var_context: head of shell_variables not a function context`.
                                            ./fix-pop-var-context-error.patch
                                        ];
                                
                                        configureFlags =
                                            [
                                                # At least on Linux bash memory allocator has pathological performance
                                                # in scenarios involving use of larger memory:
                                                #   https://lists.gnu.org/archive/html/bug-bash/2023-08/msg00052.html
                                                # Various distributions default to system allocator. Let's nixpkgs
                                                # do the same.
                                                "--without-bash-malloc"
                                                (if interactive then "--with-installed-readline" else "--disable-readline")
                                            ]
                                            ++ lib.optionals (stdenv.hostPlatform != stdenv.buildPlatform) [
                                                "bash_cv_job_control_missing=nomissing"
                                                "bash_cv_sys_named_pipes=nomissing"
                                                "bash_cv_getcwd_malloc=yes"
                                                # This check cannot be performed when cross compiling. The "yes"
                                                # default is fine for static linking on Linux (weak symbols?) but
                                                # not with BSDs, when it does clash with the regular `getenv`.
                                                "bash_cv_getenv_redef=${
                                                    if !(with stdenv.hostPlatform; isStatic && (isOpenBSD || isFreeBSD)) then "yes" else "no"
                                                }"
                                            ]
                                            ++ lib.optionals stdenv.hostPlatform.isCygwin [
                                                "--without-libintl-prefix"
                                                "--without-libiconv-prefix"
                                                "--with-installed-readline"
                                                "bash_cv_dev_stdin=present"
                                                "bash_cv_dev_fd=standard"
                                                "bash_cv_termcap_lib=libncurses"
                                            ]
                                            ++ lib.optionals (stdenv.hostPlatform.libc == "musl") [
                                                "--disable-nls"
                                            ]
                                            ++ lib.optionals stdenv.hostPlatform.isFreeBSD [
                                                # /dev/fd is optional on FreeBSD. we need it to work when built on a system
                                                # with it and transferred to a system without it! This includes linux cross.
                                                "bash_cv_dev_fd=absent"
                                            ];
                                
                                        strictDeps = true;
                                        # Note: Bison is needed because the patches above modify parse.y.
                                        depsBuildBuild = [ buildPackages.stdenv.cc ];
                                        nativeBuildInputs = [
                                            updateAutotoolsGnuConfigScriptsHook
                                            bison
                                        ] ++ lib.optional stdenv.hostPlatform.isDarwin stdenv.cc.bintools;
                                
                                        buildInputs = lib.optional interactive readline;
                                
                                        enableParallelBuilding = true;
                                
                                        makeFlags = lib.optionals stdenv.hostPlatform.isCygwin [
                                            "LOCAL_LDFLAGS=-Wl,--export-all,--out-implib,libbash.dll.a"
                                            "SHOBJ_LIBS=-lbash"
                                        ];
                                
                                        nativeCheckInputs = [ util-linux ];
                                        doCheck = false; # dependency cycle, needs to be interactive
                                
                                        postInstall = ''
                                            ln -s bash "$out/bin/sh"
                                            rm -f $out/lib/bash/Makefile.inc
                                        '';
                                
                                        postFixup =
                                            if interactive then
                                                ''
                                                    substituteInPlace "$out/bin/bashbug" \
                                                        --replace '#!/bin/sh' "#!$out/bin/bash"
                                                ''
                                            # most space is taken by locale data
                                            else
                                                ''
                                                    rm -rf "$out/share" "$out/bin/bashbug"
                                                '';
                                
                                        passthru = {
                                            shellPath = "/bin/bash";
                                            tests.static = pkgsStatic.bash;
                                        };
                                
                                        meta = staticData.meta;
                                    }
                                )
                                {}
                            );
                        };
                    }
            )
    ;
}