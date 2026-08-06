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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-fromTOML.nix";

export default [
  apply(
    nixScope.builtins["fromTOML"],
    mkThunk(
      () => ('# This is a TOML document.\n\ntitle = "TOML Example"\n\n[owner]\nname = "Tom Preston-Werner"\n#dob = 1979-05-27T07:32:00-08:00 # First class dates\n\n[database]\nserver = "192.168.1.1"\nports = [ 8001, 8001, 8002 ]\nconnection_max = 5000\nenabled = true\n\n[servers]\n\n  # Indentation (tabs and/or spaces) is allowed but not required\n  [servers.alpha]\n  ip = "10.0.0.1"\n  dc = "eqdc10"\n\n  [servers.beta]\n  ip = "10.0.0.2"\n  dc = "eqdc10"\n\n[clients]\ndata = [ ["gamma", "delta"], [1, 2] ]\n\n# Line breaks are OK when inside arrays\nhosts = [\n  "alpha",\n  "omega"\n]\n')
    ),
  ),
  apply(
    nixScope.builtins["fromTOML"],
    mkThunk(
      () => ('key = "value"\nbare_key = "value"\nbare-key = "value"\n1234 = "value"\n\n"127.0.0.1" = "value"\n"character encoding" = "value"\n"ʎǝʞ" = "value"\n\'key2\' = "value"\n\'quoted "value"\' = "value"\n\nname = "Orange"\n\nphysical.color = "orange"\nphysical.shape = "round"\nsite."google.com" = true\n\n# This is legal according to the spec, but cpptoml doesn\'t handle it.\n#a.b.c = 1\n#a.d = 2\n\nstr = "I\'m a string. \\"You can quote me\\". Name\\tJos\\u00E9\\nLocation\\tSF."\n\nint1 = +99\nint2 = 42\nint3 = 0\nint4 = -17\nint5 = 1_000\nint6 = 5_349_221\nint7 = 1_2_3_4_5\n\nhex1 = 0xDEADBEEF\nhex2 = 0xdeadbeef\nhex3 = 0xdead_beef\n\noct1 = 0o01234567\noct2 = 0o755\n\nbin1 = 0b11010110\n\nflt1 = +1.0\nflt2 = 3.1415\nflt3 = -0.01\nflt4 = 5e+22\nflt5 = 1e6\nflt6 = -2E-2\nflt7 = 6.626e-34\nflt8 = 9_224_617.445_991_228_313\n\nbool1 = true\nbool2 = false\n\n# FIXME: not supported because Nix doesn\'t have a date/time type.\n#odt1 = 1979-05-27T07:32:00Z\n#odt2 = 1979-05-27T00:32:00-07:00\n#odt3 = 1979-05-27T00:32:00.999999-07:00\n#odt4 = 1979-05-27 07:32:00Z\n#ldt1 = 1979-05-27T07:32:00\n#ldt2 = 1979-05-27T00:32:00.999999\n#ld1 = 1979-05-27\n#lt1 = 07:32:00\n#lt2 = 00:32:00.999999\n\narr1 = [ 1, 2, 3 ]\narr2 = [ "red", "yellow", "green" ]\narr3 = [ [ 1, 2 ], [3, 4, 5] ]\narr4 = [ "all", \'strings\', """are the same""", \'\'\'type\'\'\']\narr5 = [ [ 1, 2 ], ["a", "b", "c"] ]\n\narr7 = [\n  1, 2, 3\n]\n\narr8 = [\n  1,\n  2, # this is ok\n]\n\n[table-1]\nkey1 = "some string"\nkey2 = 123\n\n\n[table-2]\nkey1 = "another string"\nkey2 = 456\n\n[dog."tater.man"]\ntype.name = "pug"\n\n[a.b.c]\n[ d.e.f ]\n[ g .  h  . i ]\n[ j . "ʞ" . \'l\' ]\n[x.y.z.w]\n\nname = { first = "Tom", last = "Preston-Werner" }\npoint = { x = 1, y = 2 }\nanimal = { type.name = "pug" }\n\n[[products]]\nname = "Hammer"\nsku = 738594937\n\n[[products]]\n\n[[products]]\nname = "Nail"\nsku = 284758393\ncolor = "gray"\n\n[[fruit]]\n  name = "apple"\n\n  [fruit.physical]\n    color = "red"\n    shape = "round"\n\n  [[fruit.variety]]\n    name = "red delicious"\n\n  [[fruit.variety]]\n    name = "granny smith"\n\n[[fruit]]\n  name = "banana"\n\n  [[fruit.variety]]\n    name = "plantain"\n')
    ),
  ),
  apply(
    nixScope.builtins["fromTOML"],
    mkThunk(
      () => ('[[package]]\nname = "aho-corasick"\nversion = "0.6.4"\nsource = "registry+https://github.com/rust-lang/crates.io-index"\ndependencies = [\n "memchr 2.0.1 (registry+https://github.com/rust-lang/crates.io-index)",\n]\n\n[[package]]\nname = "ansi_term"\nversion = "0.9.0"\nsource = "registry+https://github.com/rust-lang/crates.io-index"\n\n[[package]]\nname = "atty"\nversion = "0.2.10"\nsource = "registry+https://github.com/rust-lang/crates.io-index"\ndependencies = [\n "libc 0.2.42 (registry+https://github.com/rust-lang/crates.io-index)",\n "termion 1.5.1 (registry+https://github.com/rust-lang/crates.io-index)",\n "winapi 0.3.5 (registry+https://github.com/rust-lang/crates.io-index)",\n]\n\n[metadata]\n"checksum aho-corasick 0.6.4 (registry+https://github.com/rust-lang/crates.io-index)" = "d6531d44de723825aa81398a6415283229725a00fa30713812ab9323faa82fc4"\n"checksum ansi_term 0.11.0 (registry+https://github.com/rust-lang/crates.io-index)" = "ee49baf6cb617b853aa8d93bf420db2383fab46d314482ca2803b40d5fde979b"\n"checksum ansi_term 0.9.0 (registry+https://github.com/rust-lang/crates.io-index)" = "23ac7c30002a5accbf7e8987d0632fa6de155b7c3d39d0067317a391e00a2ef6"\n"checksum arrayvec 0.4.7 (registry+https://github.com/rust-lang/crates.io-index)" = "a1e964f9e24d588183fcb43503abda40d288c8657dfc27311516ce2f05675aef"\n')
    ),
  ),
  apply(
    nixScope.builtins["fromTOML"],
    mkThunk(
      () => ("a = [[{ b = true }]]\nc = [ [ { d = true } ] ]\ne = [[123]]\n")
    ),
  ),
];
