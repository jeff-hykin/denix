# Nix Operators
# Demonstrates how Nix operators translate to JavaScript operator functions

{
  # Arithmetic operators
  addition = 5 + 3;
  subtraction = 10 - 4;
  multiplication = 6 * 7;
  division = 15 / 3;  # Integer division: 15 / 3 = 5
  floatDivision = 15.0 / 3.0;  # Float division: 15.0 / 3.0 = 5.0

  # Important: Integer division truncates!
  integerDivisionTruncates = 7 / 2;  # Result: 3 (not 3.5)

  # Comparison operators
  greater = 5 > 3;
  less = 2 < 10;
  greaterEqual = 5 >= 5;
  lessEqual = 3 <= 4;
  equal = 42 == 42;
  notEqual = 1 != 2;

  # Logical operators
  andOp = true && true;
  orOp = false || true;
  notOp = !false;

  # Implication operator (unique to Nix!)
  implies = false -> true;  # false -> true = true

  # String concatenation
  stringConcat = "Hello, " + "World!";

  # List concatenation
  listConcat = [1 2] ++ [3 4];

  # Attribute set merge (right-biased)
  attrMerge = { a = 1; b = 2; } // { b = 3; c = 4; };
  # Result: { a = 1; b = 3; c = 4; } (b is overwritten)

  # Attribute existence check
  hasAttr = { a = 1; } ? a;  # true
  noAttr = { a = 1; } ? b;   # false

  # Precedence demonstration
  precedence = 2 + 3 * 4;  # 14 (multiplication before addition)
}
