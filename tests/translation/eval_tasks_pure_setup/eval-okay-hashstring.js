import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-hashstring.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.strings = ["", "text 1", "text 2"];
  return nixScope.builtins["concatLists"](
    nixScope.map(createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
      nixScope.map(nixScope.builtins["hashString"](nixScope.hash))(
        nixScope.strings,
      )
    )))(["md5", "sha1", "sha256", "sha512"]),
  );
});
