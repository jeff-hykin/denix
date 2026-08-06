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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-intersectAttrs.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "alphabet",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "a", () => ("a"));
      defGetter(obj, "b", () => ("b"));
      defGetter(obj, "c", () => ("c"));
      defGetter(obj, "d", () => ("d"));
      defGetter(obj, "e", () => ("e"));
      defGetter(obj, "f", () => ("f"));
      defGetter(obj, "g", () => ("g"));
      defGetter(obj, "h", () => ("h"));
      defGetter(obj, "i", () => ("i"));
      defGetter(obj, "j", () => ("j"));
      defGetter(obj, "k", () => ("k"));
      defGetter(obj, "l", () => ("l"));
      defGetter(obj, "m", () => ("m"));
      defGetter(obj, "n", () => ("n"));
      defGetter(obj, "o", () => ("o"));
      defGetter(obj, "p", () => ("p"));
      defGetter(obj, "q", () => ("q"));
      defGetter(obj, "r", () => ("r"));
      defGetter(obj, "s", () => ("s"));
      defGetter(obj, "t", () => ("t"));
      defGetter(obj, "u", () => ("u"));
      defGetter(obj, "v", () => ("v"));
      defGetter(obj, "w", () => ("w"));
      defGetter(obj, "x", () => ("x"));
      defGetter(obj, "y", () => ("y"));
      defGetter(obj, "z", () => ("z"));
      return obj;
    })),
  );
  defGetter(
    nixScope,
    "foo",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "f", () => (nixScope.alphabet.f));
      defGetter(obj, "o", () => (nixScope.alphabet.o));
      defGetter(obj, "b", () => (nixScope.alphabet.b));
      defGetter(obj, "a", () => (nixScope.alphabet.a));
      defGetter(obj, "r", () => (nixScope.alphabet.r));
      defGetter(obj, "z", () => (nixScope.alphabet.z));
      defGetter(obj, "q", () => (nixScope.alphabet.q));
      defGetter(obj, "u", () => (nixScope.alphabet.u));
      defGetter(obj, "x", () => (nixScope.alphabet.x));
      defGetter(
        obj,
        "aa",
        () => (apply(nixScope.throw, mkThunk(() => ("aa")))),
      );
      return obj;
    })),
  );
  defGetter(
    nixScope,
    "alphabetFail",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["mapAttrs"], mkThunk(() => (nixScope.throw))),
      mkThunk(() => (nixScope.alphabet)),
    )),
  );
  return [
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "a",
            () => (apply(nixScope.abort, mkThunk(() => ("l1")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(
          obj,
          "b",
          () => (apply(nixScope.abort, mkThunk(() => ("r1")))),
        );
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "a",
            () => (apply(nixScope.abort, mkThunk(() => ("l2")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => (1n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => (1n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "a",
            () => (apply(nixScope.abort, mkThunk(() => ("laa")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "m", () => (1n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "m",
            () => (apply(nixScope.abort, mkThunk(() => ("lam")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "n", () => (1n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "n",
            () => (apply(nixScope.abort, mkThunk(() => ("lan")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "n", () => (1n));
        defGetter(obj, "p", () => (2n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "n",
            () => (apply(nixScope.abort, mkThunk(() => ("lan2")))),
          );
          defGetter(
            obj,
            "p",
            () => (apply(nixScope.abort, mkThunk(() => ("lap")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "n", () => (1n));
        defGetter(obj, "p", () => (2n));
        return obj;
      }))),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "n",
            () => (apply(nixScope.abort, mkThunk(() => ("lan2")))),
          );
          defGetter(
            obj,
            "p",
            () => (apply(nixScope.abort, mkThunk(() => ("lap")))),
          );
          return obj;
        }))),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    apply(
      apply(
        nixScope.builtins["intersectAttrs"],
        mkThunk(() => (nixScope.alphabetFail)),
      ),
      mkThunk(() => (nixScope.alphabet)),
    ),
    operators.equal(
      apply(
        apply(
          nixScope.builtins["intersectAttrs"],
          mkThunk(() => (nixScope.alphabet)),
        ),
        mkThunk(() => (nixScope.foo)),
      ),
      apply(
        apply(
          nixScope.builtins["intersectAttrs"],
          mkThunk(() => (nixScope.foo)),
        ),
        mkThunk(() => (nixScope.alphabet)),
      ),
    ),
  ];
});
