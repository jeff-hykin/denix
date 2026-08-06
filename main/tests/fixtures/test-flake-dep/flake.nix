{
  description = "A dependency flake (no inputs)";
  outputs = { self }: {
    answer = 42;
    lib.double = x: x * 2;
  };
}
