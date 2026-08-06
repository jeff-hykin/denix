import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-fromTOML-timestamps.nix";

export default apply(
  nixScope.builtins["fromTOML"],
  mkThunk(
    () => ('key = "value"\nbare_key = "value"\nbare-key = "value"\n1234 = "value"\n\n"127.0.0.1" = "value"\n"character encoding" = "value"\n"ʎǝʞ" = "value"\n\'key2\' = "value"\n\'quoted "value"\' = "value"\n\nname = "Orange"\n\nphysical.color = "orange"\nphysical.shape = "round"\nsite."google.com" = true\n\n# This is legal according to the spec, but cpptoml doesn\'t handle it.\n#a.b.c = 1\n#a.d = 2\n\nstr = "I\'m a string. \\"You can quote me\\". Name\\tJos\\u00E9\\nLocation\\tSF."\n\nint1 = +99\nint2 = 42\nint3 = 0\nint4 = -17\nint5 = 1_000\nint6 = 5_349_221\nint7 = 1_2_3_4_5\n\nhex1 = 0xDEADBEEF\nhex2 = 0xdeadbeef\nhex3 = 0xdead_beef\n\noct1 = 0o01234567\noct2 = 0o755\n\nbin1 = 0b11010110\n\nflt1 = +1.0\nflt2 = 3.1415\nflt3 = -0.01\nflt4 = 5e+22\nflt5 = 1e6\nflt6 = -2E-2\nflt7 = 6.626e-34\nflt8 = 9_224_617.445_991_228_313\n\nbool1 = true\nbool2 = false\n\nodt1 = 1979-05-27T07:32:00Z\nodt2 = 1979-05-27T00:32:00-07:00\nodt3 = 1979-05-27T00:32:00.999999-07:00\nodt4 = 1979-05-27 07:32:00Z\n# milliseconds\nodt5 = 1979-05-27 07:32:00.1Z\nodt6 = 1979-05-27 07:32:00.12Z\nodt7 = 1979-05-27 07:32:00.123Z\n# microseconds\nodt8 = 1979-05-27t07:32:00.1234Z\nodt9 = 1979-05-27t07:32:00.12345Z\nodt10 = 1979-05-27t07:32:00.123456Z\n# nanoseconds\nodt11 = 1979-05-27 07:32:00.1234567Z\nodt12 = 1979-05-27 07:32:00.12345678Z\nodt13 = 1979-05-27 07:32:00.123456789Z\n# no more precision after nanoseconds\nodt14 = 1979-05-27t07:32:00.1234567891Z\n\nldt1 = 1979-05-27T07:32:00\n# milliseconds\nldt2 = 1979-05-27T07:32:00.1\nldt3 = 1979-05-27T07:32:00.12\nldt4 = 1979-05-27T07:32:00.123\n# microseconds\nldt5 = 1979-05-27t00:32:00.1234\nldt6 = 1979-05-27t00:32:00.12345\nldt7 = 1979-05-27t00:32:00.123456\n# nanoseconds\nldt8 = 1979-05-27 00:32:00.1234567\nldt9 = 1979-05-27 00:32:00.12345678\nldt10 = 1979-05-27 00:32:00.123456789\n# no more precision after nanoseconds\nldt11 = 1979-05-27t00:32:00.1234567891\n\nld1 = 1979-05-27\nlt1 = 07:32:00\n# milliseconds\nlt2 = 00:32:00.1\nlt3 = 00:32:00.12\nlt4 = 00:32:00.123\n# microseconds\nlt5 = 00:32:00.1234\nlt6 = 00:32:00.12345\nlt7 = 00:32:00.123456\n# nanoseconds\nlt8 = 00:32:00.1234567\nlt9 = 00:32:00.12345678\nlt10 = 00:32:00.123456789\n# no more precision after nanoseconds\nlt11 = 00:32:00.1234567891\n\narr1 = [ 1, 2, 3 ]\narr2 = [ "red", "yellow", "green" ]\narr3 = [ [ 1, 2 ], [3, 4, 5] ]\narr4 = [ "all", \'strings\', """are the same""", \'\'\'type\'\'\']\narr5 = [ [ 1, 2 ], ["a", "b", "c"] ]\n\narr7 = [\n  1, 2, 3\n]\n\narr8 = [\n  1,\n  2, # this is ok\n]\n\n[table-1]\nkey1 = "some string"\nkey2 = 123\n\n\n[table-2]\nkey1 = "another string"\nkey2 = 456\n\n[dog."tater.man"]\ntype.name = "pug"\n\n[a.b.c]\n[ d.e.f ]\n[ g .  h  . i ]\n[ j . "ʞ" . \'l\' ]\n[x.y.z.w]\n\nname = { first = "Tom", last = "Preston-Werner" }\npoint = { x = 1, y = 2 }\nanimal = { type.name = "pug" }\n\n[[products]]\nname = "Hammer"\nsku = 738594937\n\n[[products]]\n\n[[products]]\nname = "Nail"\nsku = 284758393\ncolor = "gray"\n\n[[fruit]]\n  name = "apple"\n\n  [fruit.physical]\n    color = "red"\n    shape = "round"\n\n  [[fruit.variety]]\n    name = "red delicious"\n\n  [[fruit.variety]]\n    name = "granny smith"\n\n[[fruit]]\n  name = "banana"\n\n  [[fruit.variety]]\n    name = "plantain"\n')
  ),
);
