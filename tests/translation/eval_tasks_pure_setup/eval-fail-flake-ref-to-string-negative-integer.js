import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "n", (nixScope) => -1n);
  return nixScope.builtins["seq"](nixScope.n)(
    nixScope.builtins["flakeRefToString"](
      {
        "type": "github",
        "owner": "NixOS",
        "repo": nixScope.n,
        "ref": "23.05",
        "dir": "lib",
      },
    ),
  );
});
