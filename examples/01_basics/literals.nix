# Basic Nix Literals
# Demonstrates how Nix's basic data types translate to JavaScript

{
  # Integers become BigInt (42n) to preserve integer division semantics
  myInt = 42;

  # Floats become JavaScript numbers
  myFloat = 3.14;

  # Strings remain strings
  myString = "hello world";

  # Booleans remain booleans
  myTrue = true;
  myFalse = false;

  # Null remains null
  myNull = null;

  # Lists become arrays
  myList = [ 1 2 3 ];

  # Mixed-type lists
  mixedList = [ 1 "hello" 3.14 true ];

  # Nested structures
  nested = {
    inner = {
      value = 99;
    };
  };
}
