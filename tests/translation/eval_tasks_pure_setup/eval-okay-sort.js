import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-sort.nix";
const operators = runtime.operators;

export default ((_withAttrs) => {
  const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
  runtime.scopeStack.push(nixScope);
  try {
    return [
      nixScope.sort(nixScope.lessThan)([483n, 249n, 526n, 147n, 42n, 77n]),
      nixScope.sort(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.lessThan(nixScope.y, nixScope.x)
        ))
      )))([483n, 249n, 526n, 147n, 42n, 77n]),
      nixScope.sort(nixScope.lessThan)(["foo", "bar", "xyzzy", "fnord"]),
      nixScope.sort(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.lessThan(nixScope.x["key"], nixScope.y["key"])
        ))
      )))([
        { "key": 1n, "value": "foo" },
        { "key": 2n, "value": "bar" },
        { "key": 1n, "value": "fnord" },
      ]),
      nixScope.sort(createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
          operators.lessThan(nixScope.x["key"], nixScope.y["key"])
        ))
      )))([
        { "key": 1n, "value": "foo" },
        { "key": 2n, "value": "bar" },
        { "key": 1n, "value": "foo2" },
        { "key": 2n, "value": "bar2" },
        { "key": 2n, "value": "bar3" },
        { "key": 2n, "value": "bar4" },
        { "key": 1n, "value": "foo3" },
        { "key": 3n, "value": "baz" },
        { "key": 3n, "value": "baz2" },
        { "key": 1n, "value": "foo4" },
        { "key": 3n, "value": "baz3" },
        { "key": 1n, "value": "foo5" },
        { "key": 1n, "value": "foo6" },
        { "key": 2n, "value": "bar5" },
        { "key": 3n, "value": "baz4" },
        { "key": 1n, "value": "foo7" },
        { "key": 4n, "value": "biz1" },
        { "key": 1n, "value": "foo8" },
      ]),
      nixScope.sort(nixScope.lessThan)([
        [1n, 6n],
        [],
        [2n, 3n],
        [3n],
        [1n, 5n],
        [2n],
        [1n],
        [],
        [1n, 4n],
        [3n],
      ]),
    ];
  } finally {
    runtime.scopeStack.pop();
  }
})(nixScope.builtins);
