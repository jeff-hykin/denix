# What is the goal of this project? 

This repo is a tool for translating nix code to Javascript.
- `main/runtime.js` implements nix builtins like `derivation` and `operators.add`
- `translator.js` parses nix code using the tree sitter parser, then generates a JS file that imports tools from `main/runtime.js`. The rest of the JS file is more or less designed to be a one-to-one mapping to nix code using the runtime helpers. Its supposed to be human readable, so less verbose is better.

The goal is to be able to build basically any `flake.nix` output while only running javascript.

## Scope

In scope: anything a user could do inside a nix REPL session —
evaluation, fetchers, hashing, path/filesystem builtins, derivations,
actually building a derivation (:b), reading its outputs back,
and detecting cache-hits against an existing store. Tests that validate
that a build produced correct output, or that a rebuild was skipped
because the output was already in the store, are important and
in-scope.

Out of scope (explicitly):
- Parallel build execution / store locking (parallel.sh).
- Garbage collection (gc*.sh, selfref-gc.sh, lang-gc.sh).
- Store-database internals: locks, storage accounting, repair,
optimise-store, db-migration, dump-db, chroot-store, read-only-store.
- Remote builds, SSH/daemon stores, binary caches
(build-remote*.sh, remote-store.sh, legacy-ssh-store.sh,
nix-copy-ssh*, binary-cache.sh, push-to-store*, nix-daemon-untrusting.sh).
- Signing (signing.sh).
- Sandboxing (linux-sandbox.sh, nested-sandboxing.sh,
extra-sandbox-profile.sh, supplementary-groups.sh).
- Flame graphs / profiling.
- The interactive denix REPL as a product surface (an internal
JS-API repl handle is allowed — see below).
- nix CLI UX surface that denix intentionally does not mimic
(help.sh, completions.sh, nix-channel.sh, nix-profile.sh,
nix-collect-garbage-d.sh, formatter*.sh, install-darwin.sh,
repl.sh, debugger.sh).

## Status

Use `run/tests` to check how many of the tests currently pass.
- First we want all "positive" tests to pass. E.g. when building a nix file succeeds, the JS version should also succeed.
- We care about the impure (build) tests the most, but if the pure tests are failing we need to correct them first.