# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.

1. We need to implement the core nix functions in JavaScript and make sure they have 1-to-1 parity with Nix. NOTE: there are some mapping caveats you need to consider such as JS needing to use BigInts to distinguish between nix ints and nix floats. We need to validate that all nix operators and builtin's mimic their Nix counterparts, using abstractions such as BigInt where direct mapping is impossible. Read below ("Builtins Progress Status") to see the status of builtins. These are implemented in `main/runtime.js`. 
2. Once the core functions are implemented, we need to have a translator that translates Nix to JavaScript. This is implemented in `main.js` at the top level. It explains the core ideas of how to translate Nix to JavaScript, including namespace problems and literals. Fill out the TODOs and create integration tests of it translating nix code, and testing if the resulting JS performs the same as the original Nix. See below ("Translator Progress Status") for the status of the translator.
3. Once the translator is implemented, we need to start testing it against the nixpkgs lib. For example curl from github, this repo: git@github.com:nix-community/nixpkgs.lib.git and start testing different library functions. Make sure to have a `./examples` directory with examples of the nix code and the translated JS code to compare.

## 1. Builtins Progress Status

What to do right now: Create a plan for how to implement `fetchurl` and `fetchTarball` in the runtime.js using javascript fetch APIs.

After breaking those down, start work on them. Once they're done, re-assess what needs to be done in runtime.js

## 2. Translator Progress Status (main.js)

### Status: MAJOR ISSUES

Zero examples of translated nix code. Need to run the translator and test the resulting JS against the original Nix.