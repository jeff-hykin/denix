import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-hashfile.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.paths = [
    new Path(["../source_code/nix_lang/data"], []),
    new Path(["../source_code/nix_lang/binary-data"], []),
  ];
  return nixScope.builtins["concatLists"](
    nixScope.map(createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
      nixScope.map(nixScope.builtins["hashFile"](nixScope.hash))(nixScope.paths)
    )))(["md5", "sha1", "sha256", "sha512"]),
  );
});
