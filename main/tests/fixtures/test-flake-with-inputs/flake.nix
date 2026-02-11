{
  description = "A test flake with inputs";

  inputs = {
    # For testing, we'll specify a github input (won't actually fetch it in tests)
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixos-unstable";
    };
  };

  outputs = { self, nixpkgs }: {
    # Output that uses self
    greeting = "Hello from ${self.description}!";

    # Output that references input (stub)
    nixpkgsReference = nixpkgs._type or "unknown";

    # Metadata
    inputCount = builtins.length (builtins.attrNames self.inputs);
  };
}
