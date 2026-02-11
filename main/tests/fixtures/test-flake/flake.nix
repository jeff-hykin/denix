{
  description = "A test flake for builtins.getFlake";

  # No inputs for this simple test flake
  inputs = {};

  outputs = { self }: {
    # Simple string output
    testString = "Hello from test flake!";

    # Numeric output
    testNumber = 42;

    # Attribute set output
    testAttrSet = {
      foo = "bar";
      nested = {
        value = 123;
      };
    };

    # Function output
    testFunction = x: x + 1;

    # Access to flake metadata via self
    flakeDescription = self.description;
  };
}
