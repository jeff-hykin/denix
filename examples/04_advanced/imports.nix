# Import System
# Demonstrates builtins.import for loading external Nix files

{
  # Import a .nix file
  # imported = builtins.import ./config.nix;

  # Import with arguments (if the imported file is a function)
  # configured = (builtins.import ./config.nix) { debug = true; };

  # Import JSON files
  # data = builtins.import ./data.json;

  # Scoped import (with custom scope)
  # withScope = builtins.scopedImport { myVar = 42; } ./file.nix;

  # Note: These examples are commented because they require external files
  # In real usage, imports work like this:
  example = "See import_e2e_test.js for working examples";
}
