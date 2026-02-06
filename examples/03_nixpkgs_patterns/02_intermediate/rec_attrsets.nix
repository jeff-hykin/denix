# Recursive Attribute Sets
# Demonstrates self-referential attribute sets

{
  # Simple rec: a references itself in same attrset
  simple = rec {
    a = 1;
    b = a + 1;  # References a
  };

  # Mutual references
  mutual = rec {
    x = y + 1;  # Forward reference to y
    y = 2;
    z = x + y;  # References both x and y
  };

  # Nested rec
  nested = rec {
    outer = 10;
    inner = rec {
      a = outer;  # References outer rec's field
      b = a + 1;  # References own field
    };
  };

  # Rec with functions
  withFunctions = rec {
    increment = x: x + 1;
    double = x: x * 2;
    incrementAndDouble = x: double (increment x);
  };

  # Common pattern: self-referencing packages
  package = rec {
    version = "1.0.0";
    name = "myapp";
    fullName = "${name}-${version}";  # References name and version
  };
}
