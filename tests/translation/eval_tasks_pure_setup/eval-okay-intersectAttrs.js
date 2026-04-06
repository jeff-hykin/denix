import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  nixScope.alphabet = {
    "a": "a",
    "b": "b",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "o",
    "p": "p",
    "q": "q",
    "r": "r",
    "s": "s",
    "t": "t",
    "u": "u",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "z",
  };
  defGetter(nixScope, "foo", (nixScope) =>
    createScope((nixScope) => {
      const obj = {};
      obj.f = nixScope.alphabet.f;
      obj.o = nixScope.alphabet.o;
      obj.b = nixScope.alphabet.b;
      obj.a = nixScope.alphabet.a;
      obj.r = nixScope.alphabet.r;
      obj.z = nixScope.alphabet.z;
      obj.q = nixScope.alphabet.q;
      obj.u = nixScope.alphabet.u;
      obj.x = nixScope.alphabet.x;
      obj.aa = apply(nixScope.throw, "aa");
      return obj;
    }));
  defGetter(
    nixScope,
    "alphabetFail",
    (nixScope) =>
      apply(
        apply(nixScope.builtins["mapAttrs"], nixScope.throw),
        nixScope.alphabet,
      ),
  );
  return [
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        { "a": apply(nixScope.abort, "l1") },
      ),
      { "b": apply(nixScope.abort, "r1") },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        { "a": apply(nixScope.abort, "l2") },
      ),
      { "a": 1n },
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      { "a": 1n },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        { "a": apply(nixScope.abort, "laa") },
      ),
      nixScope.alphabet,
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      { "m": 1n },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        { "m": apply(nixScope.abort, "lam") },
      ),
      nixScope.alphabet,
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      { "n": 1n },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        { "n": apply(nixScope.abort, "lan") },
      ),
      nixScope.alphabet,
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      { "n": 1n, "p": 2n },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        {
          "n": apply(nixScope.abort, "lan2"),
          "p": apply(nixScope.abort, "lap"),
        },
      ),
      nixScope.alphabet,
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      { "n": 1n, "p": 2n },
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        {
          "n": apply(nixScope.abort, "lan2"),
          "p": apply(nixScope.abort, "lap"),
        },
      ),
      nixScope.alphabet,
    ),
    apply(
      apply(nixScope.builtins["intersectAttrs"], nixScope.alphabetFail),
      nixScope.alphabet,
    ),
    operators.equal(
      apply(
        apply(nixScope.builtins["intersectAttrs"], nixScope.alphabet),
        nixScope.foo,
      ),
      apply(
        apply(nixScope.builtins["intersectAttrs"], nixScope.foo),
        nixScope.alphabet,
      ),
    ),
  ];
});
