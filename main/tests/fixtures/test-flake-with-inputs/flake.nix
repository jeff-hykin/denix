{
  description = "A test flake with inputs";

  # A local sibling flake input (resolved recursively, no network).
  inputs = {
    dep = {
      url = "path:../test-flake-dep";
    };
  };

  outputs = { self, dep }: {
    # Output that uses self (real Nix exposes sourceInfo attrs, not description)
    greeting = "Hello from ${self.outPath}!";

    # Output that uses the resolved input flake's outputs
    depAnswer = dep.answer;
    depDoubled = dep.lib.double 21;

    # Metadata
    inputCount = builtins.length (builtins.attrNames self.inputs);
  };
}
