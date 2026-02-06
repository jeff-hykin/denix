# Let Expressions
# Demonstrates variable bindings and scope

{
  # Simple let: bind one variable
  simple = let x = 42; in x;

  # Multiple bindings
  multiple = let
    x = 10;
    y = 20;
  in x + y;

  # Bindings can reference earlier bindings
  sequential = let
    x = 5;
    y = x + 3;
    z = y * 2;
  in z;

  # Nested lets create nested scopes
  nested = let
    x = 1;
  in let
    y = x + 1;  # x from outer let
  in let
    z = y + 1;  # y from middle let
  in x + y + z;  # All three in scope

  # Let bindings shadow outer scope
  shadowing = let
    x = 100;
  in let
    x = 200;  # Shadows outer x
  in x;  # Result: 200

  # Let with complex expressions
  complex = let
    list = [1 2 3 4 5];
    doubled = map (x: x * 2) list;
    sum = builtins.foldl' (a: b: a + b) 0 doubled;
  in sum;
}
