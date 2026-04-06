import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      nixScope.as = createScope((nixScope) => {
        const obj = {};
        if (obj["x"] === undefined) obj["x"] = {};
        if (obj["x"]["y"] === undefined) obj["x"]["y"] = {};
        obj["x"]["y"]["z"] = 123n;
        if (obj["a"] === undefined) obj["a"] = {};
        if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
        obj["a"]["b"]["c"] = 456n;
        return obj;
      });
      nixScope.bs = createScope((nixScope) => {
        const obj = {};
        if (obj["f-o-o"] === undefined) obj["f-o-o"] = {};
        obj["f-o-o"]["bar"] = "foo";
        return obj;
      });
      defGetter(
        nixScope,
        "or",
        (nixScope) =>
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
              operators.or(nixScope.x, nixScope.y)
            ))
          )),
      );
      return [
        nixScope.as["x"]["y"]["z"],
        operators.selectOrDefault(nixScope.as, ["foo"], "foo"),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          nixScope.as["a"]["b"]["c"],
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["a", "b", "c"],
          nixScope.as["x"]["y"]["z"],
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          operators.selectOrDefault(nixScope.bs, ["f-o-o", "bar"], "xyzzy"),
        ),
        operators.selectOrDefault(
          nixScope.as,
          ["x", "y", "bla"],
          operators.selectOrDefault(nixScope.bs, ["bar", "foo"], "xyzzy"),
        ),
        operators.selectOrDefault(
          123n,
          ["bla"],
          operators.selectOrDefault(null, ["foo"], "xyzzy"),
        ),
        apply(apply(apply(nixScope.fold, nixScope.or), []), [
          true,
          false,
          false,
        ]),
      ];
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
