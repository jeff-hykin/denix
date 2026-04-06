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
    return apply(
      nixScope.concat,
      apply(
        apply(
          nixScope.map,
          createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            operators.add(nixScope.x, "bar")
          )),
        ),
        ["foo", "bla", "xyzzy"],
      ),
    );
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
