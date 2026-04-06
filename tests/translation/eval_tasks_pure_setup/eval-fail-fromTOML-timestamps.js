import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default nixScope.builtins["fromTOML"](`
  key = "value"
  bare_key = "value"
  bare-key = "value"
  1234 = "value"

  "127.0.0.1" = "value"
  "character encoding" = "value"
  "ʎǝʞ" = "value"
  'key2' = "value"
  'quoted "value"' = "value"

  name = "Orange"

  physical.color = "orange"
  physical.shape = "round"
  site."google.com" = true

  # This is legal according to the spec, but cpptoml doesn't handle it.
  #a.b.c = 1
  #a.d = 2

  str = "I'm a string. \\"You can quote me\\". Name\\tJos\\u00E9\\nLocation\\tSF."

  int1 = +99
  int2 = 42
  int3 = 0
  int4 = -17
  int5 = 1_000
  int6 = 5_349_221
  int7 = 1_2_3_4_5

  hex1 = 0xDEADBEEF
  hex2 = 0xdeadbeef
  hex3 = 0xdead_beef

  oct1 = 0o01234567
  oct2 = 0o755

  bin1 = 0b11010110

  flt1 = +1.0
  flt2 = 3.1415
  flt3 = -0.01
  flt4 = 5e+22
  flt5 = 1e6
  flt6 = -2E-2
  flt7 = 6.626e-34
  flt8 = 9_224_617.445_991_228_313

  bool1 = true
  bool2 = false

  odt1 = 1979-05-27T07:32:00Z
  odt2 = 1979-05-27T00:32:00-07:00
  odt3 = 1979-05-27T00:32:00.999999-07:00
  odt4 = 1979-05-27 07:32:00Z
  ldt1 = 1979-05-27T07:32:00
  ldt2 = 1979-05-27T00:32:00.999999
  ld1 = 1979-05-27
  lt1 = 07:32:00
  lt2 = 00:32:00.999999

  arr1 = [ 1, 2, 3 ]
  arr2 = [ "red", "yellow", "green" ]
  arr3 = [ [ 1, 2 ], [3, 4, 5] ]
  arr4 = [ "all", 'strings', """are the same""", `);
