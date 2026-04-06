import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default //
((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return /*let*/ createScope((nixScope) => {
      defGetter(
        nixScope,
        "asi",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              { "name": nixScope.name, "value": nixScope.value }
            ))
          )),
      );
      defGetter(
        nixScope,
        "list",
        (nixScope) => [nixScope.asi("a")("A"), nixScope.asi("b")("B")],
      );
      defGetter(
        nixScope,
        "a",
        (nixScope) => nixScope.builtins["listToAttrs"](nixScope.list),
      );
      defGetter(
        nixScope,
        "b",
        (nixScope) =>
          nixScope.builtins["listToAttrs"](
            operators.listConcat(nixScope.list, nixScope.list),
          ),
      );
      defGetter(
        nixScope,
        "r",
        (nixScope) =>
          nixScope.builtins["listToAttrs"]([
            nixScope.asi("result")([nixScope.a, nixScope.b]),
            nixScope.asi("throw")(nixScope.throw("this should not be thrown")),
          ]),
      );
      defGetter(
        nixScope,
        "x",
        (nixScope) =>
          nixScope.builtins["listToAttrs"]([
            nixScope.asi("foo")("bar"),
            nixScope.asi("foo")("bla"),
          ]),
      );
      return operators.add(
        nixScope.concat(
          nixScope.map(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
            nixScope.x["a"]
          )))(nixScope.r["result"]),
        ),
        nixScope.x["foo"],
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.import(new Path(["../source_code/nix_lang/lib.nix"], [])));
