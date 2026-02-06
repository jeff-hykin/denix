# Nix Functions
# Demonstrates function definition and application

{
  # Simple function: x: x + 1
  increment = x: x + 1;
  incrementResult = (x: x + 1) 5;  # Call with 5

  # Curried functions: x: y: x + y
  add = x: y: x + y;
  add5 = add 5;  # Partially apply
  add5to3 = add 5 3;  # Fully apply

  # Pattern matching on attribute sets: {a, b}: a + b
  sumAttrs = {a, b}: a + b;
  sumResult = sumAttrs { a = 10; b = 20; };

  # Default arguments: {a ? 0, b ? 1}: a + b
  withDefaults = {a ? 0, b ? 1}: a + b;
  useDefaults = withDefaults {};  # Uses defaults: 0 + 1 = 1
  overrideOne = withDefaults { a = 5; };  # 5 + 1 = 6
  overrideBoth = withDefaults { a = 3; b = 4; };  # 3 + 4 = 7

  # Variadic arguments with ...: {a, ...}: a
  # This ignores extra arguments
  ignoreExtras = {a, ...}: a;
  ignoreResult = ignoreExtras { a = 1; b = 2; c = 3; };  # Returns 1

  # @ syntax captures entire argument: args@{a, b}: args
  captureAll = args@{a, b}: args;
  captureResult = captureAll { a = 1; b = 2; };  # Returns {a=1; b=2;}

  # Higher-order functions: function that returns function
  makeAdder = n: (x: x + n);
  add10 = makeAdder 10;
  result = add10 5;  # 15
}
