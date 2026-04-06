# Complex expression with let
let
  helper = x: x * 2;
  data = [1 2 3 4 5];
in {
  doubled = builtins.map helper data;
  sum = builtins.foldl' builtins.add 0 data;
}
