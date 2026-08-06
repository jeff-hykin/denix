{
  description = "flake B: provides a message + a helper";
  outputs = { self }: {
    message = "built using a value from flake B";
    lib.double = x: x * 2;
  };
}
