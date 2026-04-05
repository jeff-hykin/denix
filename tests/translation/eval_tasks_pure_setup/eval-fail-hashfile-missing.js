import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-hashfile-missing.nix";

export default /*let*/ createScope((nixScope) => {
  nixScope.paths = [
    new Path(["./this-file-is-definitely-not-there-7392097"], []),
    "/and/neither/is/this/37293620",
  ];
  return nixScope.toString(
    nixScope.builtins["concatLists"](
      nixScope.map(createFunc(/*arg:*/ "hash", null, {}, (nixScope) => (
        nixScope.map(nixScope.builtins["hashFile"](nixScope.hash))(
          nixScope.paths,
        )
      )))(["md5", "sha1", "sha256", "sha512"]),
    ),
  );
});
