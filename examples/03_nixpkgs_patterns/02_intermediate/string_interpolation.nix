# String Interpolation
# Demonstrates ${...} syntax for embedding expressions in strings

{
  # Simple interpolation
  greeting = let name = "World"; in "Hello, ${name}!";

  # Multiple interpolations
  multiple = let
    first = "John";
    last = "Doe";
  in "${first} ${last}";

  # Interpolation with expressions
  withExpr = let x = 21; in "The answer is ${toString (x * 2)}";

  # Nested interpolation
  nested = let
    inner = "nested";
  in "This is ${inner} ${"inter"}polation";
}
