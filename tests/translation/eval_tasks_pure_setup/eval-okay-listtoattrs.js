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
        (
          nixScope,
        ) => [
          apply(apply(nixScope.asi, "a"), "A"),
          apply(apply(nixScope.asi, "b"), "B"),
        ],
      );
      defGetter(
        nixScope,
        "a",
        (nixScope) => apply(nixScope.builtins["listToAttrs"], nixScope.list),
      );
      defGetter(
        nixScope,
        "b",
        (nixScope) =>
          apply(
            nixScope.builtins["listToAttrs"],
            operators.listConcat(nixScope.list, nixScope.list),
          ),
      );
      defGetter(
        nixScope,
        "r",
        (nixScope) =>
          apply(nixScope.builtins["listToAttrs"], [
            apply(apply(nixScope.asi, "result"), [nixScope.a, nixScope.b]),
            apply(
              apply(nixScope.asi, "throw"),
              apply(nixScope.throw, "this should not be thrown"),
            ),
          ]),
      );
      defGetter(
        nixScope,
        "x",
        (nixScope) =>
          apply(nixScope.builtins["listToAttrs"], [
            apply(apply(nixScope.asi, "foo"), "bar"),
            apply(apply(nixScope.asi, "foo"), "bla"),
          ]),
      );
      return operators.add(
        apply(
          nixScope.concat,
          apply(
            apply(
              nixScope.map,
              createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                nixScope.x["a"]
              )),
            ),
            nixScope.r["result"],
          ),
        ),
        nixScope.x["foo"],
      );
    });
  } finally {
    runtime.scopeStack.pop();
  }
})(apply(nixScope.import, new Path(["../source_code/nix_lang/lib.nix"], [])));
