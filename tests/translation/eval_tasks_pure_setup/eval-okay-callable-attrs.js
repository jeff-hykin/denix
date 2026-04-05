import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-callable-attrs.nix";
const operators = runtime.operators;

export default (operators.merge(
  {
    "__functor": createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
      createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        operators.and(nixScope.self["foo"], nixScope.x)
      ))
    )),
    "foo": false,
  },
  { "foo": true },
))(true);
